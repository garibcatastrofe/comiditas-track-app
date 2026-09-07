/* ANIMATION */
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

/* COMPONENTS */
import { TextApp } from "../textApp/TextApp";

/* HOOKS */
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* STORES */
import { useAnnouncement } from "@/content/shared/components/announcement/stores/announcementStore";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

/* UTILS */
import { scheduleOnRN } from "react-native-worklets";

const HIDDEN_Y = -200; // por encima de la pantalla
const VISIBLE_Y = 0;
const VISIBLE_DURATION = 4000; // 4 segundos visible
const ANIM_DURATION = 400; // duración de la animación de entrada/salida

export default function Announcement() {
  const { announcement, setAnnouncement } = useAnnouncement();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(HIDDEN_Y);
  const { theme } = useTheme();

  const COLORS_BG: Record<"ok" | "error" | "warning" | "info", string> = {
    ok: theme.success_bg,
    error: theme.danger_bg,
    warning: theme.warn_bg,
    info: theme.info_bg,
  };

  const COLORS_TINT: Record<"ok" | "error" | "warning" | "info", string> = {
    ok: theme.success,
    error: theme.danger,
    warning: theme.warn,
    info: theme.info,
  };

  useEffect(() => {
    if (!announcement.isActivated) return;

    // Si ya había una animación corriendo (nuevo aviso mientras otro
    // estaba visible), la cancelamos y arrancamos limpio desde arriba.
    cancelAnimation(translateY);
    translateY.value = HIDDEN_Y;

    translateY.value = withSequence(
      withTiming(VISIBLE_Y, {
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
      withDelay(
        VISIBLE_DURATION,
        withTiming(
          HIDDEN_Y,
          { duration: ANIM_DURATION, easing: Easing.in(Easing.cubic) },
          (finished) => {
            "worklet";
            if (finished) {
              // Limpiamos el estado global una vez terminó de esconderse
              scheduleOnRN(setAnnouncement, {
                isActivated: null,
                announceType: null,
                message: null,
              });
            }
          },
        ),
      ),
    );
  }, [
    announcement.isActivated,
    announcement.announceType,
    announcement.message,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Mientras no haya un tipo definido no hace falta pintar nada,
  // pero mantenemos el componente montado para que la animación de
  // salida (translateY -> HIDDEN_Y) siempre pueda completarse.
  const backgroundColor = announcement.announceType
    ? COLORS_BG[announcement.announceType]
    : "transparent";

  const color = announcement.announceType
    ? COLORS_TINT[announcement.announceType]
    : "transparent";

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute top-0 left-0 right-0 z-[9999] px-6 pb-6 border-b-2"
      style={[
        {
          paddingTop: insets.top + 12,
          backgroundColor,
          elevation: 9999,
          borderColor: color,
        },
        animatedStyle,
      ]}
    >
      {announcement.message ? (
        <TextApp
          style={{
            fontFamily: "DMSans_700Bold",
            color,
          }}
          className="text-lg text-center"
        >
          {announcement.message}
        </TextApp>
      ) : null}
    </Animated.View>
  );
}

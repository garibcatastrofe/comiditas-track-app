/* ANIMATION */
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

/* COMPONENTS */
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { Pressable, View } from "react-native";

/* HOOKS */
import { useEffect } from "react";

/* ICONS */
import { X } from "lucide-react-native";

/* STORES */
import { useModal } from "./stores/modalStore";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function Modal() {
  const { modal, setModal } = useModal();
  const { theme } = useTheme();

  const hideModal = () => {
    setModal({
      isActivated: false,
      title: modal.title ?? "",
      body: modal.body,
    });
  };

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(-50);
  const modalOpacity = useSharedValue(0);

  useEffect(() => {
    if (modal.isActivated) {
      // Animación de entrada con rebote
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
      modalOpacity.value = withTiming(1, { duration: 300 }); // Desvanecer entrada
    } else {
      // Animación de salida suave
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(50, { duration: 200 });
      modalOpacity.value = withTiming(0, { duration: 200 }); // Desvanecer salida
    }
  }, [modal.isActivated]);

  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      pointerEvents={modal.isActivated ? "auto" : "none"}
      className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full"
    >
      {/* Fondo oscuro animado */}
      <Animated.View
        className="absolute top-0 left-0 w-full h-full bg-black/50"
        style={overlayStyle}
        pointerEvents={modal.isActivated ? "auto" : "none"}
        onTouchEnd={hideModal}
      />
      <Animated.View
        className="w-[90%] p-6 rounded-2xl"
        style={[
          modalStyle,
          {
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.line,
          },
        ]}
        pointerEvents={modal.isActivated ? "auto" : "none"}
      >
        <View className="flex-row items-center justify-between mb-4">
          <TextApp
            className="text-2xl"
            style={{ fontFamily: "DMSans_700Bold", color: theme.ink }}
          >
            {modal.title}
          </TextApp>
          <Pressable className="p-2" hitSlop={20} onPress={hideModal}>
            <X size={24} color={theme.ink} />
          </Pressable>
        </View>

        <View style={{ maxHeight: 300 }}>{modal.body}</View>
      </Animated.View>
    </View>
  );
}

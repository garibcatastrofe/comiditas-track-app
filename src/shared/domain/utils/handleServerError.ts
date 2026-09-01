import { ClsAppError } from "../entities/errors/ClsAppError";
import { IResponse } from "../interfaces/IResponse";

export function handleServerError(error: unknown): IResponse {
  if (error instanceof ClsAppError) {
    return { ok: false, message: error.message };
  }

  console.error(error);

  return {
    ok: false,
    message: "Error interno: verifique la información e intentelo nuevamente",
  };
}

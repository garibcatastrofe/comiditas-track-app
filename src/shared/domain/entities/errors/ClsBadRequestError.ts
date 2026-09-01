import { ClsAppError } from "./ClsAppError";

// Al igual que este, se pueden crear más clases de Error constumizables, como de no autorizado o no encontrado
export class ClsBadRequestError extends ClsAppError {
  constructor(message: string) {
    super(message, 400);
  }
}

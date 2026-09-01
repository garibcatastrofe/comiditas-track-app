import { ClsBadRequestError } from "@/src/shared/domain/entities/errors/ClsBadRequestError";

export class ClsReportDate {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new ClsBadRequestError("La fecha es requerida");
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(value)) {
      throw new ClsBadRequestError("Formato inválido");
    }
  }
}

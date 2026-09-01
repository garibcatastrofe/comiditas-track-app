import { ClsBadRequestError } from "@/src/shared/domain/entities/errors/ClsBadRequestError";
import { MEAL_STATUS, MealStatusType } from "../../interfaces/MealStatus";

export class ClsReportMealStatus {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new ClsBadRequestError("Favor de seleccionar un tipo de comisión");
    }
    if (!MEAL_STATUS.includes(value as MealStatusType)) {
      throw new ClsBadRequestError(
        "Favor de seleccionar un valor válido de tipo de comisión: excelent, regular, terrible o empty",
      );
    }
  }
}

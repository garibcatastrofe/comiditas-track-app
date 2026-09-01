export const MEAL_STATUS = [
  "excelent",
  "regular",
  "terrible",
  "empty",
] as const;

export type MealStatusType = (typeof MEAL_STATUS)[number];

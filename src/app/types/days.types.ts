import { MealId } from "./meal.types";

export type Day = MealId[];

export type Week = Map<string, Day>;
export type WeekEntries = Array<[string, MealId[]]>;
export type WeekId = string & { _week_id_: never };

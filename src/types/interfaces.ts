export interface IWeek {
  mo: boolean;
  tu: boolean;
  we: boolean;
  th: boolean;
  fr: boolean;
  sa: boolean;
  su: boolean;
}

export interface ITask {
  id: number | null;
  description: string;
  due_date: string | null;
  color: string;
  repeating_date: IWeek | string;
  is_archived: boolean;
  is_favorite: boolean;
}

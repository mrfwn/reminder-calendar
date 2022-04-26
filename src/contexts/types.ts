import { Dispatch, ReactNode, SetStateAction } from "react";

export type CalendarProviderProps = {
    children: ReactNode
}
export enum ColorType {
    Yellow = "#FFFACD",
    Red = "#FF6347",
    Blue = "#87CEFA"
}
export type Reminder = {
    remindeText: string;
    time: string;
    city: string;
    state: string;
    color: string;
    temp?: number,
    feelsLike?: number,
    tempMin?: number,
    tempMax?: number,
    pressure?: number,
    humidity?: number
}
export type Day = {
    weekDayIndex: number;
    validInMonth: boolean;
    indexDay: number;
    reminders: Reminder[];
}
export type Calendar = {
    monthIndex: number;
    monthName: string;
    days: Day[];
}
export type CalendarContextData = {
    calendars: Calendar[];
    currentMonth: number;
    setCurrentMonth: Dispatch<SetStateAction<number>>;
    setCalendar: Dispatch<SetStateAction<Calendar[]>>;
}
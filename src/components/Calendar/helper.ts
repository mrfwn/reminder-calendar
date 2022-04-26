import { startOfMonth, subMonths, getDaysInMonth } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import { Calendar, Day } from '../../contexts/types';
import { MONTHS } from '../../utils/constants';

const startDaysOfCalendar = (monthIndex: number): Day[] => {
    const currentDate = new Date(2022, monthIndex, 1);
    const numberOfDaysLastMonth = getDaysInMonth(subMonths(currentDate, 1))
    const numberOfDaysCurrentMonth = getDaysInMonth(currentDate);
    const firstDayToCurrentMonth = startOfMonth(currentDate).getDay() - 1;
    const lastDayToCurrentMonth = endOfMonth(currentDate).getDay() - 1;

    const daysMonth = [] as Day[];
    let currentWeekDay = 0;
    for (let i = firstDayToCurrentMonth; i >= 0; i--) {
        daysMonth.push({
            weekDayIndex: currentWeekDay,
            validInMonth: false,
            indexDay: numberOfDaysLastMonth - i,
            reminders: [],
        });
        currentWeekDay = ((currentWeekDay + 1) > 6) ? 0 : currentWeekDay + 1;
    }
    for (let i = 1; i <= numberOfDaysCurrentMonth; i++) {
        daysMonth.push({
            weekDayIndex: currentWeekDay,
            validInMonth: true,
            indexDay: i,
            reminders: [],
        });

        currentWeekDay = ((currentWeekDay + 1) > 6) ? 0 : currentWeekDay + 1;
    }
    for (let i = 1; i < 6 - lastDayToCurrentMonth; i++) {
        daysMonth.push({
            weekDayIndex: currentWeekDay,
            validInMonth: false,
            indexDay: i,
            reminders: [],
        });
        currentWeekDay = ((currentWeekDay + 1) > 6) ? 0 : currentWeekDay + 1;
    }
    return daysMonth
}

export const startCalendar = (): Calendar[] => {
    return MONTHS.map((month, index) => {
        return {
            monthIndex: index,
            monthName: month,
            days: startDaysOfCalendar(index)
        }
    })
}
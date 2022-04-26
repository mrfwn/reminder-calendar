import { getMonth } from 'date-fns';
import { createContext } from 'react';
import { usePersistedState } from '../utils/usePersistedState';
import { startCalendar } from '../components/Calendar/helper';
import { Calendar, CalendarContextData, CalendarProviderProps } from './types';

export const CalendarContext = createContext({} as CalendarContextData);

export const CalendarProvider = ({ children }: CalendarProviderProps) => {

    const [calendars, setCalendar] = usePersistedState<Calendar[]>(
        'calendar',
        startCalendar()
    );

    const [currentMonth, setCurrentMonth] = usePersistedState<number>(
        'currentMonth',
        getMonth(new Date())
    );

    return (
        <CalendarContext.Provider value={{
            calendars,
            currentMonth,
            setCurrentMonth,
            setCalendar
        }}>
            {children}
        </CalendarContext.Provider>
    )
}
import { Table, TableContent, TableHead, TableHeadElement } from './styles';
import { useContext } from 'react';
import { WEEK_DAYS } from '../../utils/constants';
import { CalendarContext } from '../../contexts/CalendarContext';
import { Day } from '../Day';
export const Calendar = () => {

    const { currentMonth, calendars } = useContext(CalendarContext);

    return (
        <Table>
            <TableHead>
                {
                    WEEK_DAYS.map((day, index) => {
                        return (
                            <TableHeadElement key={index}>
                                <abbr title={day[0]}>{day}</abbr>
                            </TableHeadElement>
                        )
                    })
                }
            </TableHead>
            <TableContent>
                {calendars[currentMonth].days.map((day) => {
                    return (
                        <Day day={day} />
                    )
                })}
            </TableContent>
        </Table>
    )
}
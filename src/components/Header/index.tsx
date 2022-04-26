import { useCallback, useContext } from "react"
import { CalendarContext } from "../../contexts/CalendarContext"
import { MONTHS } from "../../utils/constants";
import { Container, Content } from "./styles"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
export const Header = () => {
    enum Direction {
        Forward = 'forward',
        Backward = 'backward'
    }

    enum LimitMonth {
        January = 0,
        December = 11
    }
    const { currentMonth, setCurrentMonth } = useContext(CalendarContext);
    const handleCalendar = useCallback((direction: Direction) => {

        setCurrentMonth(currentMonth + (direction === Direction.Forward ? 1 : -1))
    }, [currentMonth, setCurrentMonth, Direction])
    return (
        <Container>
            <Content>
                <button
                    disabled={currentMonth === LimitMonth.January}
                    onClick={() => handleCalendar(Direction.Backward)} >
                    <FaArrowLeft size={24} color='white' />
                </button>
                <h1>{MONTHS[currentMonth]}</h1>
                <button
                    disabled={currentMonth === LimitMonth.December}
                    onClick={() => handleCalendar(Direction.Forward)} >
                    <FaArrowRight size={24} color='white' />
                </button>
            </Content>
        </Container>
    )
}
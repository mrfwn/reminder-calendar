import Modal from 'react-modal';
import { BodyElement, Container, HeadElement, ReminderList, ReminderListElement } from "./styles"
import { Day as DayType, Reminder } from "../../contexts/types"
import { useContext, useState } from 'react';
import { ManagerReminderForm } from '../ManagerReminderForm';
import { CalendarContext } from '../../contexts/CalendarContext';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import moment from 'moment';

export const Day = ({ day }: { day: DayType }) => {
    const checkIfIsWeekendDay = (indexDay: number) => indexDay === 0 || indexDay === 6;
    const [isManagerRemindersModalOpen, setIsManagerRemindersModalOpen] = useState(false);
    const [currentReminder, setCurrentReminder] = useState({} as Reminder);
    const [isEditing, setIsEditing] = useState(false);
    const [currentReminderIndex, setCurrentReminderIndex] = useState(0);
    const { currentMonth, calendars, setCalendar } = useContext(CalendarContext);
    const handleOpenManagerRemindersModal = () => {
        setIsManagerRemindersModalOpen(true);
    }

    const handleDeleteReminder = (currentReminderIndex: number) => {
        calendars[currentMonth].days = calendars[currentMonth].days.map(cDay => {
            if (cDay.indexDay === day.indexDay) {
                cDay.reminders.splice(currentReminderIndex || 0, 1);
                cDay.reminders.sort((a, b) => {
                    const h1 = moment(a.time, 'hh:mm a').toDate().valueOf()
                    const h2 = moment(b.time, 'hh:mm a').toDate().valueOf()
                    return h1 > h2 ? 1 : -1;
                });
            }
            return { ...cDay }
        })
        setCalendar([...calendars]);
    }

    const handleCloseManagerRemindersModal = () => {
        setIsManagerRemindersModalOpen(false);
    }

    const handleEditReminde = (rem: Reminder, index: number) => {
        setCurrentReminderIndex(index);
        setCurrentReminder(rem);
        setIsEditing(true);
    }
    return (
        <>
            <Container
                isValidDay={day.validInMonth}
                isWeekendDay={checkIfIsWeekendDay(day.weekDayIndex)}
                hasReminder={day.reminders.length > 0}
                onClick={handleOpenManagerRemindersModal}
            >
                <span>{day.indexDay}</span>
                <div>
                    {day.reminders.length > 0 && day.reminders.map((rem) => (
                        <div style={{ background: rem.color }}>{rem.remindeText}</div>
                    ))}
                </div>

            </Container>
            <Modal
                isOpen={day.reminders.length > 0 && isManagerRemindersModalOpen}
                onRequestClose={handleCloseManagerRemindersModal}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                {isEditing ?
                    <>
                        <button style={{ background: 'transparent', border: '0' }} onClick={() => setIsEditing(false)}> <FaArrowLeft size={24} color='black' /></button>

                        <ManagerReminderForm
                            title='Update Reminder'
                            handleCloseManagerRemindersModal={handleCloseManagerRemindersModal}
                            dayParam={day.indexDay}
                            monthParam={currentMonth + 1}
                            timeParam={currentReminder.time}
                            colorParam={currentReminder.color}
                            cityParam={currentReminder.city}
                            stateParam={currentReminder.state}
                            remindeParam={currentReminder.remindeText}
                            currentReminderIndex={currentReminderIndex}
                            isUpdate={true}
                        />
                    </>
                    :
                    <>
                        <ReminderList>
                            <h2>Edit Reminder</h2>
                            {day.reminders.map((rem, index) => (
                                <ReminderListElement colorCard={rem.color}>
                                    <HeadElement>
                                        <p>{rem.remindeText}</p>
                                        <div>
                                            <button>
                                                <FaTrashAlt onClick={() => handleDeleteReminder(index)} size={18} color='black' />
                                            </button>
                                            <button onClick={() => handleEditReminde(rem, index)}>
                                                <MdModeEdit size={18} color='black' />
                                            </button>
                                        </div>
                                    </HeadElement>
                                    <BodyElement>
                                        <h2>{`${rem.city}, ${rem.state}`}</h2>
                                        <h5>{`
                                        T: ${rem.temp} C° 
                                        FLT: ${rem.feelsLike} C°`}
                                        </h5>
                                    </BodyElement>
                                </ReminderListElement>
                            ))}
                        </ReminderList>
                    </>
                }


            </Modal>
        </>
    )
}
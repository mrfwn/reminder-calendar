import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { MdClose, MdPostAdd } from "react-icons/md"
import { GrUpdate } from "react-icons/gr";
import { useAlert } from 'react-alert'
import { GroupContainer, ModalContainer } from "./styles"
import { getDaysInMonth, getMonth } from "date-fns";
import { api } from "../../services/api";
import { CalendarContext } from "../../contexts/CalendarContext";
import { ColorType } from "../../contexts/types";

import moment from "moment";
type ReminderModalParams = {
    dayParam?: number,
    monthParam?: number,
    cityParam?: string,
    stateParam?: string,
    remindeParam?: string,
    timeParam?: string,
    handleCloseManagerRemindersModal: () => void,
    title: string,
    isUpdate?: boolean,
    colorParam?: string,
    currentReminderIndex?: number
}
export const ManagerReminderForm = ({ currentReminderIndex, colorParam, isUpdate = false, title, handleCloseManagerRemindersModal, dayParam, monthParam, cityParam, stateParam, remindeParam, timeParam }: ReminderModalParams) => {
    const alert = useAlert();
    const { calendars, setCalendar } = useContext(CalendarContext);
    const [day, setDay] = useState(dayParam ?? 1);
    const [month, setMonth] = useState(monthParam ?? getMonth(new Date()) + 1);
    const [maxDayOfMonth, setMaxDayOfMonth] = useState(getDaysInMonth(new Date()));
    const [city, setCity] = useState(cityParam ?? '');
    const [state, setState] = useState(stateParam ?? '');
    const [remindeText, setRemindeText] = useState(remindeParam ?? '');
    const [time, setTime] = useState(timeParam ?? '');
    const [color, setColor] = useState(colorParam ?? ColorType.Blue);;
    const handleClearModalVariables = useCallback(() => {
        setDay(1);
        setMonth(getMonth(new Date()) + 1);
        setMaxDayOfMonth(getDaysInMonth(new Date()));
        setCity('');
        setState('');
        setRemindeText('');
    }, []);

    const handleCloseManagerReminders = useCallback(() => {
        handleClearModalVariables();
        handleCloseManagerRemindersModal()
    }, [handleClearModalVariables, handleCloseManagerRemindersModal])

    const handleSelectMonthModal = useCallback((selectValue: string) => {
        const [, monthString] = selectValue.split('-');
        setMonth(Number(monthString));
    }, [])

    useEffect(() => {
        setMaxDayOfMonth(getDaysInMonth(new Date(2022, month - 1, 1)));
    }, [month]);


    type WatherInformationType = {
        temp: number,
        feelsLike: number,
        tempMin: number,
        tempMax: number,
        pressure: number,
        humidity: number
    }
    const handleFindCityInformation = useCallback(async (): Promise<WatherInformationType | undefined> => {
        const response = await api.get<{ lat: number, lon: number }[]>(`/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${process.env.REACT_APP_OPEN_WATHER_API_KEY}`)
        if (response.data.length === 0) {
            alert.error('City or state not found');
            return;
        }
        const { lat, lon } = response.data[0];
        const { data } = await api.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPEN_WATHER_API_KEY}`)

        return {
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity
        };

    }, [city, state, alert]);

    const handleWriteReminde = useCallback((value: string) => {
        value.length <= 30 ?
            setRemindeText(value)
            :
            alert.info('The 30 character limit has been reached');
    }, [alert])

    const handleSubmitReminderForm = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        const cityWatherInformation = await handleFindCityInformation();
        if (cityWatherInformation || isUpdate) {
            calendars[month - 1].days = calendars[month - 1].days.map(cDay => {
                if (cDay.validInMonth && cDay.indexDay === day) {
                    if (isUpdate && dayParam === day) {
                        cDay.reminders[currentReminderIndex ?? 0].city = city;
                        cDay.reminders[currentReminderIndex ?? 0].remindeText = remindeText;
                        cDay.reminders[currentReminderIndex ?? 0].time = time;
                        cDay.reminders[currentReminderIndex ?? 0].state = state;
                        cDay.reminders[currentReminderIndex ?? 0].color = color;
                        cDay.reminders[currentReminderIndex ?? 0] = {
                            ...cDay.reminders[currentReminderIndex ?? 0],
                            ...cityWatherInformation
                        }
                    } else {
                        cDay.reminders.push({
                            remindeText,
                            time,
                            city,
                            state,
                            color,
                            ...cityWatherInformation
                        });
                    }





                }

                return { ...cDay }
            })

            calendars[month - 1].days = calendars[month - 1].days.map(cDay => {

                if (isUpdate && cDay.indexDay === dayParam && dayParam !== day) {

                    cDay.reminders.splice(currentReminderIndex || 0, 1);
                }
                cDay.reminders.sort((a, b) => {
                    const h1 = moment(a.time, 'hh:mm a').toDate().valueOf()
                    const h2 = moment(b.time, 'hh:mm a').toDate().valueOf()
                    return h1 > h2 ? 1 : -1;
                });

                return { ...cDay }
            })
            setCalendar([...calendars]);
            if (!isUpdate) {
                alert.success('Reminder successfully inserted');
                handleCloseManagerReminders();
            } else {
                alert.success('Reminder successfully updated');
            }
        }
    }, [city, state, dayParam, color, currentReminderIndex, isUpdate, alert, time, day, month, handleCloseManagerReminders, handleFindCityInformation, remindeText, calendars, setCalendar])
    return (
        <>
            <button className="react-modal-close" onClick={handleCloseManagerRemindersModal}><MdClose size={24} /></button>
            <ModalContainer onSubmit={handleSubmitReminderForm}>
                {!isUpdate && <h2>{title}</h2>}
                <GroupContainer>
                    <h3>Month:</h3>
                    <input
                        type="month"
                        min="2022-01"
                        max="2022-12"
                        onChange={(e) => handleSelectMonthModal(e.target.value)}
                        value={`2022-${month < 10 ? '0' + month : month}`} />
                    <h3>Day:</h3>
                    <input
                        type="number"
                        min={1}
                        max={maxDayOfMonth}
                        value={day}
                        onChange={(e) => setDay(Number(e.target.value))} />
                    <h3>Time:</h3>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </GroupContainer>
                <GroupContainer>
                    <h3>City:</h3>
                    <input
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city} />
                    <h3>State:</h3>
                    <input
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        value={state} />
                    <h3>Color:</h3>
                    <select onChange={(e) => setColor(e.target.value)}>
                        <option value={ColorType.Blue}>Blue</option>
                        <option value={ColorType.Red}>Red</option>
                        <option value={ColorType.Yellow}>Yellow</option>
                    </select>
                </GroupContainer>

                <GroupContainer>
                    <h3>Reminder:</h3>
                    <input
                        type="text"
                        onChange={(e) => handleWriteReminde(e.target.value)}
                        value={remindeText} />
                    <button type='submit' style={{ background: isUpdate ? 'red' : 'green' }}>{isUpdate ? <GrUpdate /> : <MdPostAdd size={24} />}</button>
                </GroupContainer>
            </ModalContainer>
        </>
    )
}
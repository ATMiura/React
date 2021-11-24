import React, {useState, useContext, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {AppContext} from "../context/Context";
import moment from "moment";

export const Form = ({date, editNoteId, note}) => {

    const {notes, setNotes, editMode, setEditMode, addNote} = useContext(AppContext);

    //Addevents fields
    const [eventName, setEventName] = useState(editMode ? note.name : '');
    const [selectValue, setSelectChoose] = useState(editMode ? note.select : 'holidays');
    const [moneyValue, setMoneyValue] = useState(editMode ? note.money : '');
    const [addressValue, setAddressValue] = useState(editMode ? note.address : '');
    const [timeValue, setTimeValue] = useState(editMode ? note.time : '');
    const [messageValue, setNoteTextValue] = useState(editMode ? note.message : '');

    const submitHandler = e => {
        e.preventDefault();

        addNote(date, eventName, selectValue, moneyValue, addressValue, timeValue, messageValue);

        if(editMode) {
            submitEditedNote(e, editNoteId)
        }
    };

    const submitEditedNote = (event, editNoteId) => {
        event.preventDefault();

        const updateNote = notes.map((note) => {
            if (note.id === editNoteId) {
                return {
                    id: note.id,
                    date: moment(date).format('MMMM Do YYYY'),
                    eventName: eventName,
                    selectValue: selectValue,
                    moneyValue: moneyValue,
                    addressValue: addressValue,
                    timeValue: timeValue,
                    messageValue: messageValue,
                };
            } else {
                return note;
            }
        });

        setNotes(updateNote);
        setEditMode(false);
    }

    const Holidays = () => {
        return (
            <>
                <div className="form-group">
                    <label>
                        Сумма денег
                        <input
                            key="money"
                            className="form-control"
                            placeholder="Сумма денег"
                            value={moneyValue}
                            onChange={e => setMoneyValue(e.target.value)}
                        />
                    </label>
                </div>
            </>
        )
    }

    const Events = () => {
        return (
            <>
                <div className="form-group">
                    <label>
                        Адрес
                        <input
                            key="address"
                            className="form-control"
                            placeholder="Адрес"
                            value={addressValue}
                            onChange={e => setAddressValue(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Время
                        <input
                            key="time"
                            type="time"
                            className="form-control"
                            placeholder="Время"
                            value={timeValue}
                            onChange={e => setTimeValue(e.target.value)}
                        />
                    </label>
                </div>
            </>
        )
    }

    const Notes = () => {
        return (
            <>
                <div className="form-group">
                    <label>
                        Текст заметки
                        <textarea
                            key="textarea"
                            className="form-control"
                            placeholder="Текст заметки"
                            value={messageValue}
                            onChange={e => setNoteTextValue(e.target.value)}
                        ></textarea>
                    </label>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="row">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>
                            Название события
                            <input type="text"
                                   className="form-control"
                                   placeholder="Название события"
                                   value={eventName}
                                   onChange={e => setEventName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Тип события
                            <select onChange={e => setSelectChoose(e.target.value)} value={selectValue} className="form-control">
                                <option value="holidays">Праздничные дни</option>
                                <option value="events">Мероприятие</option>
                                <option value="notes">Пометки/другое</option>
                            </select>
                        </label>
                    </div>

                    { selectValue == 'holidays' ? Holidays() : ''}
                    { selectValue == 'events' ? Events() : ''}
                    { selectValue == 'notes' ? Notes() : ''}

                    <div className="form-group">
                        <NavLink className="btn btn-danger mr-3" to="/" onClick={() => setEditMode(false)}>Отмена</NavLink>
                        <input type = "submit" className="btn btn-primary" value="Сохранить" />
                    </div>

                </form>
            </div>
        </>
    )
};
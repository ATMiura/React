import React, {useState, useContext, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import moment from "moment";

export const Addevents = ({notes, setNotes}) => {

    const location = useLocation();

    console.log(location)

    const { date } = location.state;

    const [noteEditMode, setNoteEditMode] = useState('');

    //Addevents fields
    const [eventName, setEventName] = useState('');
    const [select, setSelectChoose] = useState('holidays');
    const [moneyValue, setMoneyValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [noteText, setNoteTextValue] = useState('');

    const addNote = e => {
        e.preventDefault();

        setNotes([
            ...notes,
            {
                id: Math.random().toString(36).substr(2, 9),
                date: moment(date).format('MMMM Do YYYY'),
                eventName: eventName,
                select: select,
                moneyValue: moneyValue,
                addressValue: addressValue,
                timeValue: timeValue,
                noteText: noteText,
            }
        ]);
    };

    const editMode = (event, noteEditId) => {
        event.preventDefault();
        const updatedNotesList = notes.map((note) => {
            if (note.id === noteEditId) {
                return {
                    id: note.id,
                    eventName: eventName,
                    select: select,
                    moneyValue: moneyValue,
                    addressValue: addressValue,
                    timeValue: timeValue,
                    noteText: noteText,
                };
            } else {
                return note;
            }
        });
        setNotes(updatedNotesList);
        setNoteEditMode('');
    };

    const deleteNote = (noteId) => {
        const noteFiltering = notes.filter((note) => note.id !== noteId);
        setNotes(noteFiltering);
    };

    useEffect(() => {
        const json = JSON.stringify(notes);
        localStorage.setItem("notes", json);
    }, [notes]);

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
                            value={noteText}
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
                <div className="col-12 text-center mb-5">
                    <h1>Добавить заметку</h1>
                </div>
            </div>
            <div className="row">
                <form onSubmit={addNote}>
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
                            <select onChange={e => setSelectChoose(e.target.value)} className="form-control">
                                <option value="holidays">Праздничные дни</option>
                                <option value="events">Мероприятие</option>
                                <option value="notes">Пометки/другое</option>
                            </select>
                        </label>
                    </div>

                    { select == 'holidays' ? Holidays() : ''}
                    { select == 'events' ? Events() : ''}
                    { select == 'notes' ? Notes() : ''}

                    <div className="form-group">
                        <NavLink className="btn btn-danger mr-3" to="/">Отмена</NavLink>
                        <input type = "submit" className="btn btn-primary" value="Сохранить" />
                    </div>

                </form>
            </div>
        </>
    )
};
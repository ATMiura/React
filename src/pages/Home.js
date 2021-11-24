import React, {useContext, useEffect, useState} from 'react';
import Calendar from "react-calendar";
import {Link, NavLink} from "react-router-dom";
import Note from "../components/Note/Note";
import {formatDate} from "react-calendar/src/shared/dateFormatter";
import moment from "moment";
import {AppContext} from "../context/Context";
import {Form} from "../components/form";

export const Home = () => {

    const [date, setDate] = useState(new Date());

    const locale = 'ru-RU';
    const changeDate = (e) => {
        setDate(e)
    }

    let formattedClickedDate = moment(date).format('MMMM Do YYYY');

    const {notes, fetchNotes, editNoteId} = useContext(AppContext);

    useEffect(() => {
        fetchNotes()
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>Заметки</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-12">
                    <Calendar
                        onChange={changeDate}
                        value={date}
                    />
                    <Link
                        className="btn btn-primary mt-3"
                        to={{
                            pathname: '/add',
                            state: {date: date},
                        }}
                    >Добавить мероприятие</Link>
                </div>
                <div className="col-md-8 col-12">
                    <ul className="list-group">
                        {notes.map((note) => (
                            formattedClickedDate === note.date ?
                                <Note
                                    key={note.id}
                                    id={note.id}
                                    name={note.eventName}
                                    select={note.selectValue}
                                    money={note.moneyValue}
                                    address={note.addressValue}
                                    time={note.timeValue}
                                    message={note.messageValue}
                                />
                                : null
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
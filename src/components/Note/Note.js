import React, {useContext, useState} from 'react';
import s from './Note.module.css';
import {AppContext} from "../../context/Context";
import {Link} from "react-router-dom";

const Note = (note) => {

    const {setEditNoteId, setEditMode, deleteNote} = useContext(AppContext);

    return (
        <>
            <li className={`${s.note} list-group-item`}>

                <div className={s.note__title}>
                    <strong>{note.name}</strong>
                </div>
                { note.select == 'holidays' ? <div className={s.note__money}> Бюджет: <small>{note.money}</small> </div> : ''}
                { note.select == 'events' ?
                    <>
                        <div className={s.note__address}>
                            Адрес: <small>{note.address}</small>
                        </div>
                        <div className={s.note__time}>
                            Время: <small>{note.time}</small>
                        </div>
                    </>
                    : ''}
                { note.select == 'notes' ? <div className={s.note__message}> {note.message} </div> : ''}

                <div className={s.note__actions}>
                    <div className={s.note__edit}>
                        <Link
                            className={s.note__action}
                            to={{
                                pathname: '/update',
                                state: {note: note},
                            }}
                            onClick={() => setEditMode(true) }
                        ><i className="bi bi-pen"></i></Link>
                    </div>
                    <div className={s.note__remove}>
                        <button className={s.note__action} onClick={() => deleteNote(note.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>

            </li>
        </>
    );
};

export default Note;
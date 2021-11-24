import React, {useEffect, useState} from 'react';
import {AppContext} from "./Context";
import moment from "moment";

const AppState = ({children}) => {

    const [notes, setNotes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editNoteId, setEditNoteId] = useState('');

    useEffect(() => {
        const json = JSON.stringify(notes);
        localStorage.setItem("notes", json);
    }, [notes]);

    const addNote = (date, eventName, selectValue, moneyValue, addressValue, timeValue, messageValue) => {
        setNotes([
            ...notes,
            {
                id: Math.random().toString(36).substr(2, 9),
                date: moment(date).format('MMMM Do YYYY'),
                eventName: eventName,
                selectValue: selectValue,
                moneyValue: moneyValue,
                addressValue: addressValue,
                timeValue: timeValue,
                messageValue: messageValue,
            }
        ]);
    }

    const fetchNotes = () => {
        const json = localStorage.getItem("notes");
        const savedNotes = JSON.parse(json);

        if (savedNotes) {
            setNotes(savedNotes);
        }
    }

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <AppContext.Provider value={{notes, setNotes, addNote, fetchNotes, editNoteId, setEditNoteId, editMode, setEditMode, deleteNote}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppState;
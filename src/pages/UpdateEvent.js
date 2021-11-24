import React from 'react';
import {Form} from "../components/form";
import {useLocation} from "react-router-dom";

const UpdateEvent = () => {

    const location = useLocation();
    const { note } = location.state;

    return (
        <>
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>Обновить заметку "{note.name}"</h1>
                </div>
            </div>
            <Form editNoteId={note.id} note={note} />
        </>
    );
};

export default UpdateEvent;
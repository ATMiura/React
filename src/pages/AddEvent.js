import React from 'react';
import {Form} from "../components/form";
import {useLocation} from "react-router-dom";

const AddEvent = () => {

    const location = useLocation();
    const { date } = location.state;

    return (
        <>
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>Добавить заметку</h1>
                </div>
            </div>
            <Form date={date} />
        </>
    );
};

export default AddEvent;
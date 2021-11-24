import 'react-calendar/dist/Calendar.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import AppState from "./context/AppState";
import {Home} from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import UpdateEvent from "./pages/UpdateEvent";

function App() {

    return (
        <AppState>
            <BrowserRouter>
                <div className="container mt-5">
                    <Switch>
                        <Route path={'/'} exact render={ () => <Home /> }/>
                        <Route path={'/add'} exact render={ () => <AddEvent /> }/>
                        <Route path={'/update'} exact render={ () => <UpdateEvent /> }/>
                    </Switch>
                </div>
            </BrowserRouter>
        </AppState>
    );
}

export default App;

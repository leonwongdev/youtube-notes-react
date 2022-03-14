import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import NoteCreate from "./streams/NoteCreate";
import NoteEdit from "./streams/NoteEdit";
import NoteDelete from "./streams/NoteDelete";
import NoteList from "./streams/NoteList";
import NoteShow from "./streams/NoteShow";
import Header from "./Header";
import history from "../history";
import "../style/app.css";
import SignIn from "./auth/SignIn";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={NoteList}/>
                        <Route
                            path="/streams/new"
                            exact
                            component={NoteCreate}
                        />
                        <Route
                            path="/streams/edit/:id"
                            exact
                            component={NoteEdit}
                        />
                        <Route
                            path="/streams/delete/:id"
                            exact
                            component={NoteDelete}
                        />
                        <Route
                            path="/streams/:id"
                            exact
                            component={NoteShow}
                        />
                        <Route path="/signIn" exact component={SignIn}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;

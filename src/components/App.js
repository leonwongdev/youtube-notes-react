import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import NoteCreate from "./notes/NoteCreate";
import NoteEdit from "./notes/NoteEdit";
import NoteDelete from "./notes/NoteDelete";
import NoteList from "./notes/NoteList";
import NoteShow from "./notes/NoteShow";
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
                            path="/notes/new"
                            exact
                            component={NoteCreate}
                        />
                        <Route
                            path="/notes/edit/:id"
                            exact
                            component={NoteEdit}
                        />
                        <Route
                            path="/notes/delete/:id"
                            exact
                            component={NoteDelete}
                        />
                        <Route
                            path="/notes/:id"
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

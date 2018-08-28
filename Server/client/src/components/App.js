import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import StudentRegistration from './StudentRegistration';
import RegistrationSuccess from './RegistrationSuccess';
import Classes from './admin/Classes';
import ClassEdit from './admin/ClassEdit';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/student-registration" component={StudentRegistration} />
                        <Route exact path="/student-registration/success" component={RegistrationSuccess} />
                        <Route exact path="/admin/classes" component={Classes} />
                        <Route exact path="/admin/class-edit" component={ClassEdit} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }

}

export default connect(null, actions)(App);

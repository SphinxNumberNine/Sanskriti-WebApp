import React, { Component } from 'react';

class RegistrationSuccess extends Component {

    render() {
        return(
            <div>
                <h3>New student registration success!</h3>
                <a href="/dashboard" className="btn red lighten-3">Return To Dashboard</a>
            </div>
        )
    }
}

export default RegistrationSuccess;
import React, {Component} from 'react';
import './App.css';
import {Chat} from './chat/chat';
import {AuthForm} from './auth-form/auth-form';
import {RegistrationForm} from './registration-form/registration-form';

class App extends Component {

    state = {
        isAuthorised: !!localStorage.getItem('x-auth-token'),
        needRegistration: false,
    };

    login = () => {
        this.setState({isAuthorised: true});
    };

    logout = () => {
        this.setState({isAuthorised: false});
    };

    toggleSingForm = () => {
        this.setState({needRegistration: !this.state.needRegistration});
    };


    render() {
        return (
            <div className="layout">
                {
                    this.state.isAuthorised
                        ? <Chat logout={this.logout}/>
                        : (
                            this.state.needRegistration
                            ? <AuthForm login={this.login} switchForm={this.toggleSingForm}/>
                            : <RegistrationForm switchForm={this.toggleSingForm}/>
                        )
                }
            </div>

        );
    }

}


export default App;

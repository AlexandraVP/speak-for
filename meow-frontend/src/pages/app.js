import React, {Component} from 'react';
import {Chat} from './chat/chat';
import {AuthForm} from './auth-form/auth-form';
import {RegistrationForm} from './registration-form/registration-form';
import {Layout} from '../design-system/layout/layout';

class App extends Component {

    state = {
        isAuthorised: !!localStorage.getItem('x-auth-token'),
        needRegistration: false,
    };

    login = async (username, password) => {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username: username, password})
        });
        if(response.status === 403){
            this.setState({authError: true});
        }
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('username', username);
        localStorage.setItem('x-auth-token', token);
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
            <Layout padded={!this.state.isAuthorised}>
                {
                    this.state.isAuthorised
                        ? <Chat logout={this.logout}/>
                        : (
                            this.state.needRegistration
                            ? <AuthForm login={this.login} switchForm={this.toggleSingForm}/>
                            : <RegistrationForm switchForm={this.toggleSingForm} login={this.login}/>
                        )
                }
            </Layout>

        );
    }

}


export default App;

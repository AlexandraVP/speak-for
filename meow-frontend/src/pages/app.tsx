import React, {Component} from 'react';
import {Chat} from './chat/chat';
import {AuthForm} from './auth-form/auth-form';
import {RegistrationForm} from './registration-form/registration-form';
import {Layout} from '../design-system/layout/layout';

interface AppState {
    isAuthorised: boolean;
    needRegistration: boolean;
    authError: boolean;
}

class App extends Component<{},AppState> {

    state = {
        isAuthorised: !!localStorage.getItem('x-auth-token'),
        needRegistration: false,
        authError: false
    };

    login = async (username: string, password: string) => {
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
            <Layout.Page padded={!this.state.isAuthorised}>
                {
                    this.state.isAuthorised
                        ? <Chat logout={this.logout}/>
                        : (
                            this.state.needRegistration
                            ? <AuthForm login={this.login} switchForm={this.toggleSingForm}/>
                            : <RegistrationForm switchForm={this.toggleSingForm} login={this.login}/>
                        )
                }
            </Layout.Page>

        );
    }

}


export default App;

import React, {Component} from 'react';
import './App.css';
import {Chat} from './chat/chat';
import {AuthForm} from './auth-form/auth-form';

class App extends Component {

    state = {
        isAuthorised: !!localStorage.getItem('x-auth-token'),
    };

    login = () => {
        this.setState({isAuthorised: true});
    };

    logout = () => {
      this.setState({isAuthorised: false});
    };

    render() {
        return (
            <div className="layout">
                {this.state.isAuthorised ? <Chat logout={this.logout}/> : <AuthForm login={this.login}/> }
            </div>

        );
    }

}


export default App;

import React, {Component} from 'react';
import './auth-form.css';

export class AuthForm extends Component {

    state = {
        username: '',
        authError: false,
        password: ''
    };

    login = async (event) => {
        event.nativeEvent.preventDefault();
        const username = this.state.username
            .toLowerCase()
            .trim();
        const password = this.state.password;
        if(!username){
            return;
        }
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
        this.props.login();
    };

    updateUsername = (event) => {
        this.setState({username: event.target.value, authError: false});
    };

    updatePassword = (event) => {
        this.setState({password: event.target.value, authError: false});
    };

    render() {
        return (
            <form className='form' onSubmit={this.login}>
                <h2 className='title'>Welcome</h2>
                <div className='logo'/>
                <input className='input' type='text'
                       placeholder='Username' onChange={this.updateUsername} value={this.state.username}/>
                {
                    !!this.state.authError && (
                        <div className='error-container'>
                            <span className='error'>username is taken</span>
                        </div>
                    )
                }
                <input className='password' type='password' name='password'  placeholder='Password'
                       onChange={this.updatePassword} value={this.state.password}/>
                <input className='submit' type='submit' value='LOGIN'/>

                <div className='sign-form'>
                <span className='sign' onClick={this.props.switchForm}>sign up</span>
                <span className='footer'>🐾</span>
                </div>
            </form>
        );
    }
}
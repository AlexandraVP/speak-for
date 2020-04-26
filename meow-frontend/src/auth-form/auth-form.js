import React, {Component} from 'react';
import './auth-form.css';

export class AuthForm extends Component {

    state = {
        username: '',
        authError: false,
    };

    login = (event) => {
        event.nativeEvent.preventDefault();
        const username = this.state.username
            .toLowerCase()
            .trim();
        if(!username){
            return;
        }
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username: username})
        })
            .then(response => {
                if(response.status == 403){
                    throw new Error('Login is already taken!');
                }
                return response.json();
            })
            .then(data => {
                const token = data.token;
                localStorage.setItem('x-auth-token', token);
                this.props.login();
            })
            .catch(error => {
                this.setState({authError: true});
            });
    };

    updateUsername = (event) => {
        this.setState({username: event.target.value, authError: false});
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
                <input className='submit' type='submit' value='LOGIN'/>
                <span className='footer'>🐾</span>
            </form>
        );
    }
}
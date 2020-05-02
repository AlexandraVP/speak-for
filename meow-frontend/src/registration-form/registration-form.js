import React, {Component} from 'react';
import './registration-form.css';

export class RegistrationForm extends Component {

    state = {
        username: '',
        password: '',
        repeatPassword: '',
        error: '',
    };

    register = async () => {
        const username = this.state.username.trim().toLowerCase();
        if (!username) {
            this.setState({
                error: 'Enter Username',
            });
        } else if (!this.state.password) {
            this.setState({
                error: 'Enter Password',
            });
        } else if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                error: 'Passwords don`t match',
            });
        } else {
            const response = await fetch('users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({username, password: this.state.password}),
            });
            if (response.status > 400) {
                this.setState({error: response.status})
            } else {
                this.props.switchForm();
            }
        }
    };


    updateUsername = (event) => {
        const username = event.target.value;
        this.setState({
            username,
            error: '',
        })
    };

    updatePassword = (event) => {
        const password = event.target.value;
        this.setState({
            password,
            error: '',
        })
    };

    updateRepeatPassword = (event) => {
        const repeatPassword = event.target.value;
        this.setState({
            repeatPassword,
            error: '',
        })
    };

    render() {
        return (
            <form className='register-form'>
                <input className='register-input' type='text'
                       placeholder='Username' name='Username'
                       value={this.state.username}
                       onChange={this.updateUsername}/>
                <input className='register-password' type='password'
                       placeholder='Password' name='Password'
                       value={this.state.password}
                       onChange={this.updatePassword}/>
                <input className='repeat-password' type='password'
                       placeholder='Password' name='Password'
                       value={this.state.repeatPassword}
                       onChange={this.updateRepeatPassword}/>
                {
                    !!this.state.error && (
                        <div className='error-container'>
                            <span className='error'>{this.state.error}</span>
                        </div>
                    )
                }
                <div className='option'>
                    <span className='join' onClick={this.register}>Join</span>
                    <span className='or'> or </span>
                    <span className='log-in' onClick={this.props.switchForm}>Log in</span>
                </div>
            </form>
        );
    }
}
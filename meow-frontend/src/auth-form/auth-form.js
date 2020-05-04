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
        this.props.login(username, password);
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
                <span className='not-account'>Don't have an account? </span>
                <span className='sign' onClick={this.props.switchForm}>Sign up</span>
                <span className='footer'>🐾</span>
                </div>
            </form>
        );
    }
}
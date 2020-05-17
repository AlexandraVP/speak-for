import React, {Component} from 'react';
import {Form} from '../../design-system/form/form';
import {Logo} from '../../design-system/logo/logo';
import {Button} from '../../design-system/button/button';
import {Text} from '../../design-system/text/text';
import {Layout} from '../../design-system/layout/layout';

function mask(password){
    return new Array(password.length)
        .fill(0)
        .map(() => '*')
        .join('');
}

function concat(value, masked){
    return value.slice(0, masked.length) + masked.slice(value.length)
}

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
                const username = this.state.username
                    .toLowerCase()
                    .trim();
                this.props.login(username,this.state.password);
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
            password: concat(this.state.password, password),
            error: '',
        })
    };

    updateRepeatPassword = (event) => {
        const repeatPassword = event.target.value;
        this.setState({
            repeatPassword: concat(this.state.repeatPassword, repeatPassword),
            error: '',
        })
    };

    render() {
        return (
            <Form>
                <Logo icon={Logo.ICON.Register}/>
                <Form.Input
                       placeholder="Enter Username"
                       value={this.state.username}
                       onChange={this.updateUsername}
                       name='comment'
                       />
                <Form.Input
                       placeholder="Enter Password"
                       value={mask(this.state.password)}
                       name='credit-card'
                       onChange={this.updatePassword}/>
                <Form.Input
                       placeholder='Confirm Password'
                       value={mask(this.state.repeatPassword)}
                       onChange={this.updateRepeatPassword}/>
                {
                    !!this.state.error && (
                        <Form.Error>{this.state.error}</Form.Error>
                    )
                }
                <Button onClick={this.register}>Get started</Button>
                <Layout.Wrapper>
                    <Text.Disclaimer>Already have an accout?</Text.Disclaimer>
                    <Text.Link onClick={this.props.switchForm}> Log in</Text.Link>
                </Layout.Wrapper>
            </Form>
        );
    }
}
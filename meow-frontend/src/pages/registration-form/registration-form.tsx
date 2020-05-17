import React, {Component} from 'react';
import {Form} from '../../design-system/form/form';
import {Logo} from '../../design-system/logo/logo';
import {Button} from '../../design-system/button/button';
import {Text} from '../../design-system/text/text';
import {Layout} from '../../design-system/layout/layout';

function mask(password: string){
    return new Array(password.length)
        .fill(0)
        .map(() => '*')
        .join('');
}

function concat(value: string, masked: string){
    return value.slice(0, masked.length) + masked.slice(value.length)
}

interface RegistrationFormProps {
    switchForm: () => any;
    login: (username: string, password: string) => any;
}

interface RegistrationFormState {
    username: string;
    password: string;
    repeatPassword: string;
    error: string;
}

export class RegistrationForm extends Component<RegistrationFormProps, RegistrationFormState> {

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
                this.setState({error: response.status.toString()})
            } else {
                const username = this.state.username
                    .toLowerCase()
                    .trim();
                this.props.login(username,this.state.password);
            }
        }
    };


    updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        this.setState({
            username,
            error: '',
        })
    };

    updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        this.setState({
            password: concat(this.state.password, password),
            error: '',
        })
    };

    updateRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const repeatPassword = event.target.value;
        this.setState({
            repeatPassword: concat(this.state.repeatPassword, repeatPassword),
            error: '',
        })
    };

    render() {
        return (
            <Form.Container>
                <Logo.Img icon={Logo.Icon.Register} size={Logo.Size.L}/>
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
                <Button onClick={this.register} type={Button.Type.SOLID}>Get started</Button>
                <Layout.Wrapper>
                    <Text.Disclaimer>Already have an account?</Text.Disclaimer>
                    <Text.Link onClick={this.props.switchForm}> Log in</Text.Link>
                </Layout.Wrapper>
            </Form.Container>
        );
    }
}
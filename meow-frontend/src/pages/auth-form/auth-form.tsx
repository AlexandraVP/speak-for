import React, {Component} from 'react';
import {Form} from "../../design-system/form/form";
import {Logo} from '../../design-system/logo/logo';
import {Button} from '../../design-system/button/button';
import {Text} from '../../design-system/text/text';
import {Layout} from '../../design-system/layout/layout';

interface AuthFormProps {
    login: (login: string, password: string) => any;
    switchForm: () => void;
}

interface AuthFormState {
    username: string;
    authError: boolean;
    password: string;
}

export class AuthForm extends Component<AuthFormProps, AuthFormState> {

    state = {
        username: '',
        authError: false,
        password: ''
    };

    login = async (event: React.MouseEvent | React.FormEvent) => {
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

    updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: event.target.value, authError: false});
    };

    updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value, authError: false});
    };

    render() {
        return (
            <Form.Container onSubmit={this.login}>
                <Logo.Img icon={Logo.Icon.Login} size={Logo.Size.L}/>
                <Form.Input placeholder='Username' onChange={this.updateUsername} value={this.state.username}/>
                {
                    this.state.authError && (
                        <Form.Error>username is taken</Form.Error>
                    )
                }
                <Form.Input type='password' name='password'  placeholder='Password'
                       onChange={this.updatePassword} value={this.state.password}/>
                <Button onClick={this.login} type={Button.Type.SOLID}>LOGIN</Button>
                <Layout.Wrapper>
                    <Text.Disclaimer>Don't have an account?</Text.Disclaimer>
                    <Text.Link onClick={this.props.switchForm}>Sign up</Text.Link>
                </Layout.Wrapper>
            </Form.Container>
        );
    }
}
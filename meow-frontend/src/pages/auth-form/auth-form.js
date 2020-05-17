import React, {Component} from 'react';
import {Form} from "../../design-system/form/form";
import {Logo} from '../../design-system/logo/logo';
import {Button} from '../../design-system/button/button';
import {Text} from '../../design-system/text/text';
import {Layout} from '../../design-system/layout/layout';

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
            <Form onSubmit={this.login}>
                <Logo icon={Logo.ICON.Login}/>
                <Form.Input placeholder='Username' onChange={this.updateUsername} value={this.state.username}/>
                {
                    !!this.state.authError && (
                        <Form.Error>username is taken</Form.Error>
                    )
                }
                <Form.Input type='password' name='password'  placeholder='Password'
                       onChange={this.updatePassword} value={this.state.password}/>
                <Button onClick={this.login}>LOGIN</Button>
                <Layout.Wrapper>
                    <Text.Disclaimer>Don't have an account?</Text.Disclaimer>
                    <Text.Link onClick={this.props.switchForm}>Sign up</Text.Link>
                </Layout.Wrapper>
            </Form>
        );
    }
}
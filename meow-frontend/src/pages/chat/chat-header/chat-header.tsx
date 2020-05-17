import React, {Component} from 'react';
import {Panel} from '../../../design-system/panel/panel';
import {Layout} from '../../../design-system/layout/layout';
import {Logo} from '../../../design-system/logo/logo';
import {Button} from "../../../design-system/button/button";

interface ChatHeaderProps {
    logout: () => any;
}

export class ChatHeader extends Component<ChatHeaderProps, {}> {

    logout = () => {
        fetch('/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': String(localStorage.getItem('x-auth-token')),
            },
        }).then(() => {
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('username');
            this.props.logout();
        });
    };

    render() {
        return (
            <Panel.Block color={Panel.Color.Dark}>
                <Layout.Wrapper>
                    <Layout.Row justify='space-between' align='center' height='40px'>
                        <Logo.Img size={Logo.Size.M} icon={Logo.Icon.Trademark}/>
                        <Button type={Button.Type.BORDER} onClick={this.logout}>Logout</Button>
                    </Layout.Row>
                </Layout.Wrapper>
            </Panel.Block>
        );
    }
}
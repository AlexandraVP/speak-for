import React, {Component} from 'react';
import {Panel} from '../../../design-system/panel/panel';
import {Layout} from '../../../design-system/layout/layout';
import {Logo} from '../../../design-system/logo/logo';
import {Button} from "../../../design-system/button/button";

export class ChatHeader extends Component {

    logout = () => {
        fetch('/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': localStorage.getItem('x-auth-token'),
            },
        }).then(() => {
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('username');
            this.props.logout();
        });
    };

    render() {
        return (
            <Panel.Block scheme={Panel.Scheme.Dark}>
                <Layout.Wrapper>
                    <Layout.Row justify='space-between' align='center' height='40px'>
                        <Logo size={Logo.SIZE.M} icon={Logo.ICON.Trademark}/>
                        <Button type={Button.TYPE.BORDER} onClick={this.logout}>Logout</Button>
                    </Layout.Row>
                </Layout.Wrapper>
            </Panel.Block>
        );
    }
}
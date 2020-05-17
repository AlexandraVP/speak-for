import React, {Component} from 'react';
import {MessageContainer} from './message-container/message-container';
import {MessageForm} from './message-form/message-form';
import {ChatHeader} from './chat-header/chat-header';
import {Panel} from "../../design-system/panel/panel";
import {Layout} from "../../design-system/layout/layout";

export class Chat extends Component {

    state = {
        messages: [],
    };

    appendMessages = (newMessages) => {
        this.setState({
            messages: [...this.state.messages, ...newMessages],
        });
    };

    unshiftMessages = (oldMessages) => {
        this.setState({
            messages: [...oldMessages, ...this.state.messages],
        });
    };

    getOldMessages = async () => {
        const {messages} = this.state;
        if (messages.length < 20 || this.oldMessagesRequestPending) {
            return;
        }
        this.oldMessagesRequestPending = true;
        const until = messages[0].date;
        const response = await fetch(`/messages/before?until=${until}&count=20`, {
            headers: {
                'X-Auth-Token': localStorage.getItem('x-auth-token'),
            },
        });
        const data = await response.json();
        if (data.length) {
            this.unshiftMessages(data);
        }
        setTimeout(() => {
            this.oldMessagesRequestPending = false;
        }, 500)
    };

    updateMessages = async () => {
        const {messages} = this.state;
        const since = messages[messages.length - 1].date;
        const response = await fetch(`/messages/after?since=${since}`, {
            headers: {
                'X-Auth-Token': localStorage.getItem('x-auth-token'),
            },
        });
        const data = await response.json();
        if (data.length) {
            this.appendMessages(data);
        }
        this.timeout = setTimeout(this.updateMessages, 500);
    };

    sendMessage = (text) => {
        fetch('/messages/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': localStorage.getItem('x-auth-token'),
            },
            body: JSON.stringify({text: text}),
        })
    };

    init = async () => {
        const response = await fetch('/messages/new?count=20', {
            headers: {
                'X-Auth-Token': localStorage.getItem('x-auth-token'),
            },
        });
        const messages = await response.json();
        this.setState({messages});
        this.timeout = setTimeout(this.updateMessages, 500);
    };

    componentDidMount() {
        this.init();
    }


    componentWillUnmount() {
        clearTimeout(this.timeout);
    }


    render() {
        return (
            <Panel height='100vh' width='900px'>
                <ChatHeader logout={this.props.logout}/>
                <Layout.Row>
                    <Panel.Block scheme={Panel.Scheme.Light} width='500px' height='calc(100vh - 60px)'/>
                    <Layout.Column width='100%'>
                        <MessageContainer messages={this.state.messages} getOldMessages={this.getOldMessages}/>
                        <MessageForm sendMessage={this.sendMessage}/>
                    </Layout.Column>
                </Layout.Row>
            </Panel>
        );
    }
}
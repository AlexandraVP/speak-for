import React, {Component} from 'react';
import './chat.css';
import { MessageContainer } from './message-container/message-container';
import { MessageForm } from './message-form/message-form';
import { ChatHeader } from './chat-header/chat-header';

export class Chat extends Component{

    state = {
        messages: []
    };

    appendMessages = (newMessages) => {
        this.setState({
            messages: [...this.state.messages, ...newMessages]
        });
    };

    updateMessages = () => {
        const from = this.state.messages.length;
        fetch(`/messages?from=${from}`, {
            headers: {
                'X-Auth-Token': localStorage.getItem('x-auth-token')
            },
        })
            .then(d=>d.json())
            .then(this.appendMessages)
    };

    sendMessage = (text) => {
        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': localStorage.getItem('x-auth-token')
            },
            body: JSON.stringify({text: text})
        })
    };

    componentDidMount() {
        this.inteval = setInterval(this.updateMessages, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.inteval);
    }


    render(){
        return (
            <div className="container">
                <ChatHeader logout={this.props.logout}/>
                <div className="main">
                    <div className="addInfo"/>
                    <div className="chat">
                        <MessageContainer messages={this.state.messages}/>
                        <MessageForm sendMessage={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}
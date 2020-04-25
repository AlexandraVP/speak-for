import React, {Component} from 'react';
import './chat.css';
import {MessageContainer} from './message-container/message-container';
import {MessageForm} from './message-form/message-form';

export class Chat extends Component{

    state = {
        messages: []
    };

    appendMessages = (newMessages) => {
        this.setState({
            messages: [...this.state.messages, ...newMessages] //this.state.messages.concat([message])
        });
    };

    updateMessages = () => {
        const from = this.state.messages.length;
        fetch(`/messages?from=${from}`)
            .then(d=>d.json())
            .then(this.appendMessages)
    };

    sendMessage = (text) => {
        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
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
                <div className="header"/>
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
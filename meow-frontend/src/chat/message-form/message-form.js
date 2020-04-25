import React, {Component} from 'react';
import './message-form.css';

export class MessageForm extends Component {

    state = {
        message: ''
    };

    sendMessage = (event) => {
        event.nativeEvent.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    };

    updateMessage = (event) => {
        this.setState({message: event.target.value});
    };

    render(){
        return (
            <form className="messageForm" onSubmit={this.sendMessage}>
                <textarea className="messageInput" onChange={this.updateMessage} value={this.state.message}/>
                <input className="sendButton" type="submit" value=""/>
            </form>
        );
    }

}

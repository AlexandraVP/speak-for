import React, {Component} from 'react';
import './message-form.css';

export class MessageForm extends Component {

    state = {
        message: ''
    };

    sendMessage = (event) => {
        if(event.nativeEvent){
            event.nativeEvent.preventDefault();
        }
        if(this.state.message.trim().length === 0){
            return;
        }
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    };

    updateMessage = (event) => {
        this.setState({message: event.target.value});
    };

    keyUpHandler = (event) => {
        if (event.keyCode === 13 && event.shiftKey){
            this.sendMessage(event);
        }
    };

    componentDidMount() {
        document.addEventListener('keyup', this.keyUpHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.keyUpHandler);
    }

    render(){
        return (
            <form className="messageForm" onSubmit={this.sendMessage}>
                <textarea className="messageInput" onChange={this.updateMessage} value={this.state.message}
                maxLength='450'/>
                <input className="sendButton" type="submit" value=""/>
            </form>
        );
    }

}

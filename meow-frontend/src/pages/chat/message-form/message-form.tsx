import React, {Component} from 'react';
import {Controls} from "../../../design-system/controls/controls";

interface MessageFormProps {
    sendMessage: (text: string) => any;
}

interface MessageFormState {
    message: string;
}

export class MessageForm extends Component<MessageFormProps, MessageFormState> {

    state = {
        message: ''
    };

    sendMessage = (event: React.SyntheticEvent | Event) => {
        if((event as React.SyntheticEvent).nativeEvent){
            (event as React.SyntheticEvent).nativeEvent.preventDefault();
        }
        if(this.state.message.trim().length === 0){
            return;
        }
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    };

    updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({message: event.target.value});
    };

    keyUpHandler = (event: KeyboardEvent) => {
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
            <Controls.Root onSubmit={this.sendMessage}>
                <Controls.TextEdit onChange={this.updateMessage} value={this.state.message}
                maxLength={450}/>
                <Controls.Submit type="submit" value=""/>
            </Controls.Root>
        );
    }

}

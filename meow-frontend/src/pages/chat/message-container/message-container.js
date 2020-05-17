import React, {Component} from 'react';
import {Message} from "../../../design-system/message/message";

export class MessageContainer extends Component {

    containerRef = React.createRef();

    scrollHeight = null;

    componentDidUpdate(prevProps){
        const containerElement = this.containerRef.current;
        if (prevProps.messages[0] && prevProps.messages[0].index > this.props.messages[0].index){
            containerElement.scrollTop = containerElement.scrollHeight - this.scrollHeight;
        }else if(this.scrollHeight === null || this.scrollHeight - containerElement.offsetHeight - containerElement.scrollTop < 50){
            containerElement.scrollTop = containerElement.scrollHeight;
        }
        this.scrollHeight = containerElement.scrollHeight;
    }

    getOldMessages = () => {
        const containerElement = this.containerRef.current;
        if(containerElement.scrollTop === 0){
            this.props.getOldMessages();
        }
    };

    render(){
        const me = localStorage.getItem('username');
        return (
            <Message.Container ref={this.containerRef}  onWheel={this.getOldMessages}>
                {this.props.messages.map((message, i) => (
                    <Message.Item key={i}
                     align={me === message.author ? Message.POSITION.Right : Message.POSITION.Left}
                    author={message.author}>
                        {message.text}
                    </Message.Item>
                ))}
            </Message.Container>
        )
    }
}
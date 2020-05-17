import React, {Component} from 'react';
import {Message as IMessage} from "../../../core/messages";
import {Message} from "../../../design-system/message/message";

interface MessageContainerProps {
    messages: Array<IMessage>;
    getOldMessages: () => any;
}

export class MessageContainer extends Component<MessageContainerProps, {}> {

    containerRef = React.createRef<HTMLDivElement>();

    scrollHeight:number|null = null;

    componentDidUpdate(prevProps: MessageContainerProps){
        const containerElement = this.containerRef.current;
        if(containerElement == null){
            return;
        }
        if (prevProps.messages[0] && prevProps.messages[0].date > this.props.messages[0].date){
            containerElement.scrollTop = containerElement.scrollHeight - Number(this.scrollHeight);
        }else if(this.scrollHeight === null || this.scrollHeight - containerElement.offsetHeight - containerElement.scrollTop < 50){
            containerElement.scrollTop = containerElement.scrollHeight;
        }
        this.scrollHeight = containerElement.scrollHeight;
    }

    getOldMessages = () => {
        const containerElement = this.containerRef.current;
        if(containerElement != null && containerElement.scrollTop === 0){
            this.props.getOldMessages();
        }
    };

    render(){
        const me = localStorage.getItem('username');
        return (
            <Message.Container ref={this.containerRef}  onWheel={this.getOldMessages}>
                {this.props.messages.map((message, i) => (
                    <Message.Item key={message._id} align={me === message.author ? Message.Position.Right : Message.Position.Left} author={message.author}>
                        {message.text}
                    </Message.Item>
                ))}
            </Message.Container>
        )
    }
}
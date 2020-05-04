import React, {Component} from 'react';
import './message-container.css';

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
            <div ref={this.containerRef} className="messagesContainer" onWheel={this.getOldMessages}>
                {this.props.messages.map((message, i) => (
                    <div key={i} className={me === message.author ? 'right' : ''}>
                        <div className='message-group'>
                            <span className='author'>{message.author}</span>
                            <p className='message'>{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
import React, {Component} from 'react';
import './message-container.css';

export class MessageContainer extends Component {

    containerRef = React.createRef();

    componentDidUpdate(){
        const containerElement = this.containerRef.current;
        containerElement.scrollTop = containerElement.scrollHeight;
    }

    render(){
        const me = localStorage.getItem('username');
        return (
            <div ref={this.containerRef} className="messagesContainer">
                {this.props.messages.map((message, i) => (
                    <div key={i} className={me === message.author ? 'right' : ''}>
                        <p className='message'>{message.text}</p>
                    </div>
                ))}
            </div>
        )
    }
}
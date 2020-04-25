import React from 'react';
import './message-container.css';

export function MessageContainer(props) {
    return (
        <div className="messagesContainer">
           {props.messages.map((message,i) => <p key={i} className='message'>{message}</p>)}
        </div>
    );
}
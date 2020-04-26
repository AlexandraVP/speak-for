import React, {Component} from 'react';
import './chat-header.css';

export class ChatHeader extends Component {

    logout = () => {
      fetch('/auth/logout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'X-Auth-Token': localStorage.getItem('x-auth-token')
          }
      }).then(() => {
          localStorage.removeItem('x-auth-token');
          this.props.logout();
      })
    };

    render(){
        return (
            <div className="header">
                <div className='title-name'>MEOW chat</div>
                <div className='logout' onClick={this.logout}>Logout</div>
            </div>
        );
    }
}
import React, {Component} from 'react';
import './chat-header.css';

export class ChatHeader extends Component {

    logout = () => {
      fetch('/users/logout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'X-Auth-Token': localStorage.getItem('x-auth-token')
          }
      }).then(() => {
          localStorage.removeItem('x-auth-token');
          localStorage.removeItem('username');
          this.props.logout();
      });
    };

    render(){
        return (
            <div className="header">
                <div className='title-name'>

                </div>
                <div className='logout' onClick={this.logout}>Logout</div>
            </div>
        );
    }
}
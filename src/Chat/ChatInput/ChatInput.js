import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
    };
  }

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  render() {
    const { onSendMessage } = this.props;
    return (
      <footer className="ChatInput">
        <input type="text" onChange={(event) => this.handleMessageChange(event)} />
        <button type="button" onClick={() => onSendMessage(this.state.message)}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;

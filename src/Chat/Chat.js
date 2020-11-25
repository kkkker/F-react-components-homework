import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  getAnswerMessageFrom = (text) => {
    return answersData.filter((answer) => {
      return answer.tags.filter((tag) => text.indexOf(tag) >= 0).length > 0;
    });
  };

  handleSendMessage = (text) => {
    let { messages } = this.state;
    messages.push({
      text,
      role: ROLE.CUSTOMER,
    });
    const answerMessage = this.getAnswerMessageFrom(text);
    messages = messages.concat(answerMessage);
    this.setState({
      messages,
    });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onSendMessage={this.handleSendMessage} />
      </main>
    );
  }
}

export default Chat;

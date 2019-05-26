import React, { Component } from "react";
import "../App.css";
import randoms from "../randoms.json";
import _ from "lodash";
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
    this.fromRef = React.createRef();
  }

  getMessageFromForm = () => {
    const message = {};
    message.text = this.messageRef.current.value;
    message.from = this.fromRef.current.value;
    return message;
  };

  clearMessageForm = () => {
    this.messageRef.current.value = "";
  };

  handleSendMessage = event => {
    const message = this.getMessageFromForm();
    this.props.api.createMessage(message).then(json => {
      this.clearMessageForm();
      this.props.callAfterSendMessage();
    });
  };
  populateForEditing = msg => {
    //TODO: don't set these values, setState them.
    this.messageRef.current.value = msg.text;
    this.fromRef.current.value = msg.from;
    this.idRef.current.value = msg.id;
  };

  generateRandomMessage = () => {
    const ws = _.sampleSize(randoms.words, _.sample([6, 12, 24]));
    const text = _.upperFirst(ws.join(" ")) + ".";
    const from = pick(randoms.authors);
    return { text, from };
  };

  handleSendRandomMessage = event => {
    const message = this.generateRandomMessage();
    this.props.api
      .createMessage(message)
      .then(json => this.props.callAfterSendMessage());
  };

  render() {
    return (
      <div className="chat-form-container">
        <div className="chat-form">
          <div className="message-inputs">
            <input
              type="text"
              ref={this.fromRef}
              name="from"
              placeholder="Your name..."
            />
            <input
              type="text"
              ref={this.messageRef}
              name="message"
              placeholder="Your message..."
            />
          </div>
          <div className="form-buttons">
            <button
              className="btn btn-primary"
              onClick={this.handleSendMessage}
            >
              Send
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.handleSendRandomMessage}
            >
              Send Random!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatForm;

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
  }

  clearMessageForm = () => {
    this.messageRef.current.value = "";
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
            <span>{this.props.messageBeingEdited.id}</span>
            <input
              type="text"
              onChange={this.props.formFieldChangeHandler}
              value={this.props.messageBeingEdited.from}
              name="from"
              placeholder="Your name..."
            />
            <input
              type="text"
              onChange={this.props.formFieldChangeHandler}
              value={this.props.messageBeingEdited.text}
              name="text"
              placeholder="Your message..."
            />
          </div>
          <div className="form-buttons">
            <button
              className="btn btn-primary"
              onClick={this.props.handleSendMessage}
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

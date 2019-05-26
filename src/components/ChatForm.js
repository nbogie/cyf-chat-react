import React, { Component } from "react";
import "../App.css";
import randoms from "../randoms.json";
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
    [this.messageRef, this.fromRef].map(ref => (ref.current.value = ""));
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
    const ws = [];
    repeat(6, () => {
      ws.push(pick(randoms.words));
    });
    const text = ws.join(" ");
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
      <div>
        <div className="msg-inputs">
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
        <button className="btn btn-primary" onClick={this.handleSendMessage}>
          Send
        </button>
        <button
          className="btn btn-secondary"
          onClick={this.handleSendRandomMessage}
        >
          Send Random!
        </button>
      </div>
    );
  }
}
function repeat(n, fn) {
  for (let i = 0; i < n; i++) {
    fn();
  }
}
export default ChatForm;

/*
          value={
            this.props.messageBeingEdited
              ? this.props.messageBeingEdited.text
              : null
          }
*/

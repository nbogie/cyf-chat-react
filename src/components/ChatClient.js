import React, { Component } from "react";
import FakeMessages from "../data/FakeMessages.json";
import ChatForm from "./ChatForm.js";
import ChatAPI from "./ChatAPI.js";
import APISelector from "./APISelector.js";
import moment from "moment";

class ChatClient extends Component {
  state = { messages: FakeMessages, messageBeingEdited: null };
  api = new ChatAPI("http://localhost:3001");

  handleChangedAPI = url => {
    this.api.setEndpoint(url);
    this.refreshMessages();
  };

  componentDidMount() {
    this.refreshMessages();
  }

  handleDeleteMessage = messageId => {
    this.api.deleteMessage(messageId).then(res => this.refreshMessages());
  };

  handleEditMessage = message => {
    this.setState({ messageBeingEdited: message });
  };

  refreshMessages = () => {
    this.api
      .getMessages()
      .then(json => this.setState({ messages: json.slice(-3) }));
  };

  render() {
    return (
      <section className="client">
        <h1>CYF Chat Client</h1>
        <APISelector handleChangedAPI={this.handleChangedAPI} />
        <MessageList
          messages={this.state.messages}
          handleDeleteMessage={this.handleDeleteMessage}
          handleEditMessage={this.handleEditMessage}
          refreshMessages={this.refreshMessages}
        />
        <ChatForm
          api={this.api}
          messageBeingEdited={this.state.messageBeingEdited}
          callAfterSendMessage={this.refreshMessages}
        />
      </section>
    );
  }
}

function MessageList(props) {
  return (
    <section className="message-list">
      <h3>Messages</h3>
      <ul>
        {props.messages.map(m => (
          <Message
            key={m.id}
            data={m}
            onDeleteClicked={props.handleDeleteMessage}
            onEditClicked={props.handleEditMessage}
          />
        ))}
      </ul>
      <div class="message-list-controls">
        <button class="refresh" onClick={props.refreshMessages}>
          Refresh Messages
        </button>
      </div>
    </section>
  );
}
function since(timestamp) {
  const n = moment().diff(moment.parseZone(timestamp), "seconds");
  return `${n} second(s) ago`;
}
function Message(props) {
  return (
    <li className="message-li">
      <div>
        {props.data.id}:
        <From from={props.data.from} /> :{" "}
      </div>
      <div className="message-row">
        <span className="message-text">{props.data.text}</span>
        <div className="controls">
          <button onClick={event => props.onEditClicked(props.data)}>
            EDIT
          </button>
          <div className="delete">
            <button
              className="btn btn-warning"
              onClick={event => props.onDeleteClicked(props.data.id)}
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div className="timestamp">{since(props.data.timeSent)}</div>
    </li>
  );
}

function From(props) {
  return <div className="from">{props.from}</div>;
}

export default ChatClient;

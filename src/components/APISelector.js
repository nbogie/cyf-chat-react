import React, { Component } from "react";

class APISelector extends Component {
  startEndpoints = [
    "http://localhost:3001",
    "https://enchanted-principal.glitch.me"
  ];
  state = {
    hidden: false,
    endpoints: this.startEndpoints,
    endpoint: this.startEndpoints[0]
  };

  constructor(props) {
    super(props);
    this.endpointRef = React.createRef();
  }
  handleAddButtonClicked = () => {
    const url = this.endpointRef.current.value;
    this.handleChangeAPI(url);
    this.endpointRef.current.value = "";
  };
  handleSelectionChanged = url => {
    this.handleChangeAPI(url);
  };

  handleChangeAPI = url => {
    this.setState(prev => {
      return {
        endpoint: url,
        endpoints: prev.endpoints.includes(url)
          ? prev.endpoints
          : prev.endpoints.concat(url)
      };
    });
    this.props.handleChangedAPI(url);
  };
  toggleHide = () =>
    this.setState(p => {
      return {
        hidden: !p.hidden
      };
    });
  render() {
    return (
      <div className="api-selector">
        <button onClick={this.toggleHide}>
          {this.state.hidden ? "Show" : "Hide"}
        </button>
        {this.state.hidden ? null : (
          <div>
            <select
              className="hi"
              onChange={event =>
                this.handleSelectionChanged(event.currentTarget.value)
              }
              value={this.state.endpoint}
            >
              {this.state.endpoints.map((url, ix) => (
                <option key={ix} value={url}>
                  {url}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="hi"
              ref={this.endpointRef}
              placeholder="new endpoint..."
            />
            <button
              className="btn btn-secondary"
              onClick={this.handleAddButtonClicked}
            >
              Change Endpoint
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default APISelector;

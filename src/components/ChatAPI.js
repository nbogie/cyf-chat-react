class API {
  constructor(host) {
    this.host = host;
  }

  resolve = path => this.host + path;

  setEndpoint = url => {
    console.log(`api endpoint now ${url}`);
    this.host = url;
  };
  createMessage = msg =>
    fetch(this.resolve("/messages"), {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

  deleteMessage = id =>
    fetch(this.resolve(`/messages/${id}`), {
      method: "DELETE"
    }).then(res => res);

  getMessages = () => fetch(this.resolve(`/messages`)).then(res => res.json());

  getOneMessage = id =>
    fetch(this.resolve(`/messages/${id}`)).then(res => res.json());
}

export default API;

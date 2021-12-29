import React, { ChangeEvent, ChangeEventHandler, Component } from "react";

interface SidePopupPageState {
  popups: PopupInterface[];
  changes: boolean;
}

const sidePopupMessagesReplicant = nodecg.Replicant<PopupInterface[]>(
  "sidePopup.messages",
  {
    defaultValue: [],
  }
);

class SidePopupPage extends Component<{}, SidePopupPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      popups: [],
      changes: false,
    };
    this.reloadMessages = this.reloadMessages.bind(this);
    this.saveMessages = this.saveMessages.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.setMessageText = this.setMessageText.bind(this);
    this.setMessageTime = this.setMessageTime.bind(this);
  }
  componentDidMount() {
    sidePopupMessagesReplicant.on("change", this.setMessages);
  }
  componentWillUnmount() {
    sidePopupMessagesReplicant.removeListener("change", this.setMessages);
  }

  reloadMessages() {
    this.setState({
      popups: sidePopupMessagesReplicant.value || [],
      changes: false,
    });
  }
  saveMessages() {
    sidePopupMessagesReplicant.value = this.state.popups;
    this.setState({
      changes: false,
    });
  }
  setMessages(payload: PopupInterface[] = []) {
    this.setState({
      popups: payload,
    });
  }
  setMessageText(id: PopupInterface["id"]) {
    return (e: ChangeEvent<HTMLTextAreaElement>) => {
      this.setState((prevState) => ({
        popups: prevState.popups.map((popup) => {
          if (popup.id === id) {
            return {
              ...popup,
              markdown: e.target.value,
            };
          }
          return popup;
        }),
        changes: true,
      }));
    };
  }
  setMessageTime(id: PopupInterface["id"]) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      this.setState((prevState) => ({
        popups: prevState.popups.map((popup) => {
          if (popup.id === id) {
            return {
              ...popup,
              time: parseInt(e.target.value, 10),
            };
          }
          return popup;
        }),
        changes: true,
      }));
    };
  }
  addMessage() {
    this.setState((prevState) => ({
      popups: [
        ...prevState.popups,
        {
          id: Date.now(),
          markdown: "",
          time: 30,
        },
      ],
    }));
  }
  removeMessage(id: PopupInterface["id"]) {
    return () => {
      this.setState((prevState) => ({
        popups: prevState.popups.filter((popup) => popup.id !== id),
        changes: true,
      }));
    };
  }

  render() {
    const { changes } = this.state;

    return (
      <div className="p-1">
        <div className="flex gap-2">
          <button
            className="p-2 rounded text-center bg-blue-500"
            onClick={this.reloadMessages}
          >
            Discard Changes / Reload
          </button>
          <button
            className={`p-2 rounded text-center ${
              changes ? "bg-blue-500" : "bg-blue-900"
            }`}
            disabled={!changes}
            onClick={this.saveMessages}
          >
            Save Changes
          </button>
          <button
            className="p-2 rounded text-center bg-blue-500"
            onClick={this.addMessage}
          >
            Add a card
          </button>
        </div>
        {this.state.popups.map((popup) => (
          <section key={popup.id} className="py-1">
            <textarea
              className="w-full text-black"
              value={popup.markdown}
              onChange={this.setMessageText(popup.id)}
            ></textarea>
            <p>
              Show for{" "}
              <input
                type="number"
                value={popup.time}
                className="text-black"
                onChange={this.setMessageTime(popup.id)}
              ></input>{" "}
              seconds
            </p>
            <button
              className="p-2 rounded text-center bg-blue-500"
              onClick={this.removeMessage(popup.id)}
            >
              Remove this card
            </button>
          </section>
        ))}
      </div>
    );
  }
}

export { SidePopupPage };

import React, { Component } from "react";
import { marked } from "marked";

interface SidePopupPageState {
  popups: PopupInterface[];
  popupIndex: number;
  popupId: number;
}

const sidePopupMessagesReplicant =
  nodecg.Replicant<PopupInterface[]>("sidePopup.messages");

class SidePopupPage extends Component<{}, SidePopupPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      popups: [],
      popupIndex: 0,
      popupId: 0,
    };
    this.setMessages = this.setMessages.bind(this);
    this.nextMessage = this.nextMessage.bind(this);
  }
  componentDidMount() {
    sidePopupMessagesReplicant.on("change", this.setMessages);
    this.nextMessage();
  }
  componentWillUnmount() {
    sidePopupMessagesReplicant.removeListener("change", this.setMessages);
  }
  setMessages(payload: PopupInterface[]) {
    this.setState({
      popups: payload,
    });
  }
  nextMessage() {
    if (this.state.popups.length) {
      const { popupIndex, popups } = this.state;
      const newPopupIndex = (popupIndex + 1) % popups.length;
      const newMessage = popups[newPopupIndex];
      this.setState({
        popupIndex: newPopupIndex,
        popupId: newMessage.id,
      });

      setTimeout(this.nextMessage, newMessage.time * 1000);
    } else {
      setTimeout(this.nextMessage, 100);
    }
  }

  render() {
    const queueArray = [
      ...this.state.popups.slice(this.state.popupIndex),
      ...this.state.popups.slice(0, this.state.popupIndex),
    ];
    return (
      <div>
        {queueArray.reverse().map((popup, index, slicedArray) => (
          <div
            key={popup.id}
            id={popup.markdown}
            className={`h-24 p-2 bg-hackaway-grey fixed top-0 left-0 w-4/6 ${
              index === slicedArray.length - 1
                ? "animate-slide-from-left z-20"
                : ""
            }${index === 0 ? "animate-darken z-10" : ""}`}
            style={{
              clipPath: "polygon(0 0, 100% 0, calc(100% - 3rem) 100%, 0 100%)",
            }}
          >
            <div
              className="h-24 w-96 float-left"
              style={{
                shapeOutside: "polygon(0 0, 24rem 0, 21rem 100%, 0 100%)",
              }}
            ></div>
            <p
              className="text-white relative top-1/2 -translate-y-1/2 -translate-x-2.5"
              dangerouslySetInnerHTML={{ __html: marked.parse(popup.markdown) }}
            ></p>
          </div>
        ))}
      </div>
    );
  }
}

export { SidePopupPage };

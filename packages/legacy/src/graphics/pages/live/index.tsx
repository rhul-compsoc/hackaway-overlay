import React, { Component } from "react";

interface LivePageState {
  message: string;
  shown: boolean;
}

class LivePage extends Component<{}, LivePageState> {
  showTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: any) {
    super(props);

    this.state = {
      message: "",
      shown: false,
    };
    this.showMessage = this.showMessage.bind(this);
  }
  componentDidMount() {
    nodecg.listenFor("live.location", this.showMessage);
  }
  componentWillUnmount() {
    nodecg.unlisten("live.location", this.showMessage);
    if (this.showTimeout) clearTimeout(this.showTimeout);
  }
  showMessage(message: string) {
    this.setState({
      message,
      shown: true,
    });

    if (this.showTimeout) clearTimeout(this.showTimeout);
    this.showTimeout = setTimeout(() => {
      this.setState({
        shown: false,
      });
    }, 5000);
  }
  render() {
    return (
      <div>
        <div
          className={`inline-flex bg-red-500 h-8 text-xl text-white items-center ${
            this.state.shown
              ? "animate-slide-from-left-.5"
              : "animate-disappear"
          }`}
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - .6rem) 100%, 0 100%)",
          }}
        >
          <div className="uppercase px-6">live</div>
          <div
            className="bg-hackaway-dark-grey h-full px-6 -mr-4 flex items-center"
            style={{
              clipPath:
                "polygon(.6rem 0, 100% 0, calc(100% - .6rem) 100%, 0 100%)",
            }}
          >
            {this.state.message}
          </div>
          <div
            className="bg-hackaway-orange w-1 pl-4 h-full"
            style={{
              clipPath:
                "polygon(.6rem 0, 100% 0, calc(100% - .6rem) 100%, 0 100%)",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export { LivePage };

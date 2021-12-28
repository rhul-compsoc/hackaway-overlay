import React, { ChangeEvent, Component } from "react";

interface EventsPageState {
  events: string;
}

const eventsReplicant = nodecg.Replicant<string>("events");

class EventsListPage extends Component<{}, EventsPageState> {
  textarea = React.createRef<HTMLTextAreaElement>();
  state = {
    events: "",
  };

  constructor(props: any) {
    super(props);

    this.eventsChange = this.eventsChange.bind(this);
    this.setEvents = this.setEvents.bind(this);
  }

  componentDidMount() {
    eventsReplicant.on("change", (value) => {
      this.setState({
        events: value,
      });
    });
  }

  setEvents() {
    eventsReplicant.value = this.textarea.current?.value;
  }

  eventsChange(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      events: e.target.value,
    });
  }

  render(): React.ReactNode {
    return (
      <div className="p-2">
        <p>
          List of events, formatted as a semi-colon delimited format. Keep IDs
          unique, for event picker to function.
          <br />
          <code>ID;Time;Name;Description</code>
        </p>
        <textarea
          onChange={this.eventsChange}
          ref={this.textarea}
          value={this.state.events}
          className="p-1 w-full rounded text-black"
        />
        <br />
        <button
          className="bg-blue-500 p-2 rounded text-center"
          onClick={this.setEvents}
        >
          Set list of events
        </button>
      </div>
    );
  }
}

export { EventsListPage };

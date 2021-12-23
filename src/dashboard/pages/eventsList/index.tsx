import React, { ChangeEvent, Component } from "react";
import styles from "./index.module.scss";

interface EventsPageState {
  events: string;
}

const eventsReplicant = nodecg.Replicant("events", {
  defaultValue: "08:00;Livestream Begins;Something else",
});

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
      <div>
        <p>
          List of events, formatted as a semi-colon delimited format:
          <br />
          <code>ID;Time;Name;Description</code>
        </p>
        <textarea
          onChange={this.eventsChange}
          ref={this.textarea}
          value={this.state.events}
          className={styles.textarea}
        />
        <br />
        <button onClick={this.setEvents}>Set list of events</button>
      </div>
    );
  }
}

export { EventsListPage };

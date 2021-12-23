import React, { ChangeEvent, Component, FormEvent } from "react";
import { Event } from "../../../class/Event";

interface EventsPageState {
  events: string;
  event: string;
}

const eventsReplicant = nodecg.Replicant("events", {
  defaultValue: "08:00;Livestream Begins;Something else",
});
const eventReplicant = nodecg.Replicant<string>("event");

class EventsListPage extends Component<{}, EventsPageState> {
  state = {
    events: "",
    event: "",
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    eventsReplicant.on("change", (value) => {
      this.setState({
        events: value,
      });
    });

    eventReplicant.on("change", (value) => {
      this.setState({
        event: value,
      });

      const element = document.getElementById(value);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  render(): React.ReactNode {
    const events = Event.parse(this.state.events);

    return (
      <main className="grid gap-3">
        {events.map((event) => (
          <article
            key={event.id}
            id={event.id}
            className={`transition-colors rounded p-3 drop-shadow ${event.id === this.state.event ? 'bg-gray-300' : 'bg-gray-100'}`}
          >
            <div className="text-lg">
              {event.name} <span className="whitespace-nowrap">@ {event.time}</span>
            </div>
            <div>{event.description}</div>
          </article>
        ))}
      </main>
    );
  }
}

export { EventsListPage };

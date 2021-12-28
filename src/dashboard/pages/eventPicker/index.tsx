import React, { Component } from "react";
import { Event } from "../../../class/Event";

interface EventsPageState {
  events: string;
  event: string;
}

const eventsReplicant = nodecg.Replicant<string>("events");
const eventReplicant = nodecg.Replicant<string>("event");

class EventPickerPage extends Component<{}, EventsPageState> {
  state = {
    events: "",
    event: "",
  };

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
    });
  }

  setEvent(id: string) {
    return () => {
      eventReplicant.value = id;
    };
  }

  render(): React.ReactNode {
    const events = Event.parse(this.state.events);

    return (
      <div className="p-2">
        <table className="table-auto">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Time</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="divide-y">
                <td className="p-1">
                  <input
                    type="radio"
                    name="eventPicker"
                    value={event.id}
                    checked={this.state.event === event.id}
                    onChange={this.setEvent(event.id)}
                  />
                </td>
                <td className="p-1">{event.id}</td>
                <td className="p-1">{event.time}</td>
                <td className="p-1">{event.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export { EventPickerPage };

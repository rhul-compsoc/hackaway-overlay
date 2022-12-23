import React from "react";
import { useReplicant, useSpreadsheet } from "use-nodecg";
import { DashboardContainer } from "../../components/DashboardContainer";

const EventPickerPage = () => {
  const [events] = useSpreadsheet("events", "matrix", 4);
  const [currentEventId, setEvent] = useReplicant<number>("event");

  return (
    <DashboardContainer>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, id) => {
            const [time, name] = event;

            return (
              <tr key={id} className="divide-y">
                <td className="p-1">
                  <input
                    type="radio"
                    id={`event_picker_${id}`}
                    name={`event_picker_${id}`}
                    value={id}
                    checked={currentEventId === id}
                    className="p-1"
                    onChange={(x) =>
                      setEvent(parseInt(x.target.value, 10) ?? 0)
                    }
                  />
                  <label className="pl-3" htmlFor={`event_picker_${id}`}>
                    {id + 1}
                  </label>
                </td>
                <td className="p-1">{time}</td>
                <td className="p-1">{name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DashboardContainer>
  );
};

export { EventPickerPage };

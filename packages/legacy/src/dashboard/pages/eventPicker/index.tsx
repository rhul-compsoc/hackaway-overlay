import React, { Component, useState } from "react";
import { EventsListDto } from "../../../types";
import { useReplicant } from "use-nodecg";

const EventPickerPage = () => {
  const [events] = useReplicant<EventsListDto, EventsListDto>("events", []);
  const [event, setEvent] = useReplicant<number, number>("event", 0);

  return (
    <div className="p-2">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {events.map((row, id) => {
            const time = row[0]?.value;
            const name = row[1]?.value;

            return (
              <tr key={id} className="divide-y">
                <td className="p-1">
                  <input
                    type="radio"
                    id={`event_picker_${id}`}
                    name={`event_picker_${id}`}
                    value={id}
                    checked={event === id}
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
    </div>
  );
};

export { EventPickerPage };

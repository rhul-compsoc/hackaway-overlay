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
            <th>Select</th>
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
                    name="eventPicker"
                    value={id}
                    checked={event === id}
                    onChange={(x) =>
                      setEvent(parseInt(x.target.value, 10) ?? 0)
                    }
                  />
                </td>
                <td className="p-1">{id}</td>
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

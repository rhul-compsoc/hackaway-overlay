import classNames from "classnames";
import React from "react";
import { Spreadsheet } from "react-spreadsheet";
import { Cell, Tuple, useSpreadsheet } from "use-nodecg";

const DataSheet = <Length extends number>({
  replicant,
  columns,
}: {
  replicant: string;
  columns: Tuple<string, Length>;
}) => {
  const [events, setEvents, isLatestCopy, addRow, removeRow, save, discard] =
    useSpreadsheet<Length>(replicant, "spreadsheet", columns.length as Length);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={save}
          className={classNames("p-2 rounded text-center bg-blue-500", {
            "bg-blue-900 cursor-not-allowed": isLatestCopy,
          })}
        >
          Save Changes
        </button>
        <button
          onClick={discard}
          className={classNames("p-2 rounded text-center bg-blue-500", {
            "bg-blue-900 cursor-not-allowed": isLatestCopy,
          })}
        >
          Discard Changes
        </button>
        <button
          onClick={addRow}
          className="p-2 rounded text-center bg-blue-500"
        >
          Add Row
        </button>
        <button
          onClick={removeRow}
          className={classNames("p-2 rounded text-center bg-blue-500", {
            "bg-blue-900 cursor-not-allowed": events.length === 0,
          })}
        >
          Remove Row
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <Spreadsheet
          className="min-w-full"
          data={events}
          onChange={(data) => {
            setEvents(data as Tuple<Cell, Length>[]);
          }}
          columnLabels={columns}
        />
      </div>
    </div>
  );
};

export { DataSheet };

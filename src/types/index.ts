import { Matrix } from "react-spreadsheet";

type Cell = { value: string };

type EventDto = [Cell, Cell, Cell];
type EventsListDto = EventDto[];

export { EventsListDto, EventDto };

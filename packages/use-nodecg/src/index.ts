import { useEffect, useMemo, useState } from "react";
import { ReplicantOptions } from "nodecg/types/browser";

/**
 * Subscribe to a NodeCG replicant.
 * Returned data is undefined whilst loading.
 *
 * Pass a second "defaultValue" param to store a temporary value whilst loading
 * if you want to avoid the undefined value.
 *
 * @param name Name of the replicant
 */
function useReplicant<T>(name: string): [T | undefined, (newValue: T) => void];

/**
 * Subscribe to a NodeCG replicant.
 * Returns defaultValue whilst loading.
 *
 * @param name Name of the replicant
 * @param defaultValue The default value the replicant should hold
 * @param opts Optional options
 */
function useReplicant<T>(
  name: string,
  defaultValue?: T,
  opts?: ReplicantOptions<T>
): [T, (newValue: T) => void];
function useReplicant<T>(
  name: string,
  defaultValue?: T,
  opts?: ReplicantOptions<T>
) {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  const replicant = useMemo(() => nodecg.Replicant(name, opts), [name]);

  const onChange = (newValue: T) => {
    setValue(newValue);
  };

  useEffect(() => {
    replicant.on("change", onChange);

    return () => {
      replicant.removeListener("change", onChange);
    };
  });

  const setReplicant = (newValue: T) => {
    replicant.value = newValue;
  };

  return [value, setReplicant];
}

/**
 * Subscribe to a NodeCG replicant.
 * State edits made via this hook are not published until the save function is called.
 * Replicant changes will automatically discard all changes.
 *
 * Pass a second "defaultValue" param to store a temporary value whilst loading
 * if you want to avoid the undefined value.
 *
 * @param name Name of the replicant
 */
function useCachedReplicant<T>(
  name: string
): [
  T | undefined,
  ReturnType<typeof useState<T>>[1],
  boolean,
  () => void,
  () => void
];

/**
 * Subscribe to a NodeCG replicant.
 * State edits made via this hook are not published until the save function is called.
 * Replicant changes will automatically discard all changes.
 *
 * @param name Name of the replicant
 */
function useCachedReplicant<T>(
  name: string,
  defaultValue?: T,
  opts?: ReplicantOptions<T>
): [T, ReturnType<typeof useState<T>>[1], boolean, () => void, () => void];
function useCachedReplicant<T>(
  name: string,
  defaultValue?: T,
  opts?: ReplicantOptions<T>
) {
  const [isLatestCopy, setIsLatestCopy] = useState<boolean>(true);
  const [cachedData, setCachedData] = useState<T | undefined>(defaultValue);
  const [liveData, setLiveData] = useReplicant<T | undefined>(
    name,
    defaultValue,
    opts
  );

  useEffect(() => {
    if (liveData) {
      setCachedData(liveData);
    } else {
      setCachedData(defaultValue);
    }
    setIsLatestCopy(true);
  }, [liveData]);

  return [
    cachedData,
    (data: T) => {
      setIsLatestCopy(false);
      setCachedData(data);
    },
    isLatestCopy,
    () => {
      setLiveData(cachedData);
    },
    () => {
      setCachedData(liveData);
    },
  ];
}

type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type Cell = { value: string };

// Tuple<string, Length>[],
//   Tuple<Cell, Length>[],

function useSpreadsheet<Length extends number>(
  name: string,
  mode: "spreadsheet",
  columns: Length
): [
  Tuple<Cell, Length>[],
  ReturnType<typeof useState<Tuple<Cell, Length>[]>>[1],
  boolean,
  () => void,
  () => void,
  () => void,
  () => void
]
function useSpreadsheet<Length extends number>(
  name: string,
  mode: "matrix",
  columns: Length
): [
  Tuple<string, Length>[],
  ReturnType<typeof useState<Tuple<Cell, Length>[]>>[1],
  boolean,
  () => void,
  () => void,
  () => void,
  () => void
]
function useSpreadsheet<Length extends number>(
  name: string,
  mode: "spreadsheet" | "matrix",
  columns: Length
): [
  Tuple<string | Cell, Length>[],
  ReturnType<typeof useState<Tuple<Cell, Length>[]>>[1],
  boolean,
  () => void,
  () => void,
  () => void,
  () => void
] {
  const [cachedSpreadsheetData, setCachedSpreadsheetData, isLatestCopy, save, discard] =
    useCachedReplicant<Tuple<Cell, Length>[]>(name, []);
    
  const cachedData = cachedSpreadsheetData.map(row => row.map(cell => cell.value) as Tuple<string, Length>);
  const outputData = mode === "spreadsheet" ? cachedSpreadsheetData : cachedData;

  return [
    outputData,
    setCachedSpreadsheetData,
    isLatestCopy,
    () => {
      setCachedSpreadsheetData([
        ...cachedSpreadsheetData,
        new Array<Cell>(columns).fill({ value: "" }) as Tuple<Cell, Length>
      ])
    },
    () => {
      setCachedSpreadsheetData(cachedSpreadsheetData.slice(0, -1));
    },
    save,
    discard,
  ];
}

export { useReplicant, useCachedReplicant, useSpreadsheet };
export type { Cell, Tuple }
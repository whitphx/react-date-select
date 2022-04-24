import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { range } from "./range";
import { compileDateString, parseDateString } from "./date-string";
import { Option, Options } from "./types";

const DEFAULT_MIN_YEAR = 1960;
const DEFAULT_MAX_YEAR = new Date().getFullYear();

function parseSelectValue(value: string): number {
  return parseInt(value);
}
function convertToSelectValue(value: number): string {
  return value.toString();
}

function compileOption(value: string): Option {
  return { value, label: value }; // TODO: Be customizable for localization
}

const monthOptions: Options = range(1, 12).map((i) =>
  compileOption(convertToSelectValue(i))
);
const dayOptions: Options = range(1, 31).map((i) =>
  compileOption(convertToSelectValue(i))
);

interface DateSelectState {
  yearValue: string; // It's of type string because it's <select />'s value.
  monthValue: string; // It's of type string because it's <select />'s value.
  dayValue: string; // It's of type string because it's <select />'s value.
  dateString: string | null;
}

export interface UseDateSelectOptions {
  minYear?: number;
  maxYear?: number;
  defaultYear?: number;
  defaultMonth?: number;
  defaultDay?: number;
}
export interface UseDateSelectInterface {
  yearValue: string;
  monthValue: string;
  dayValue: string;
  yearOptions: Options;
  monthOptions: Options;
  dayOptions: Options;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  onMonthChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  onDayChange: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
  dateValue: string | null;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  setDate: (dateString: string) => void;
}
export const useDateSelect = (
  value: string,
  onChange: (dateString: string) => void,
  opts: UseDateSelectOptions = {}
): UseDateSelectInterface => {
  const [state, setState] = useState<DateSelectState & { changeCount: number }>(
    {
      yearValue: opts.defaultYear ? convertToSelectValue(opts.defaultYear) : "",
      monthValue: opts.defaultMonth
        ? convertToSelectValue(opts.defaultMonth)
        : "",
      dayValue: opts.defaultDay ? convertToSelectValue(opts.defaultDay) : "",
      dateString: null,
      changeCount: 0, // HACK: Use this state as a dependency of the `useEffect` below so that `onChange` is called only when it should be.
    }
  );

  const updateDate = useCallback(
    ({ year, month, day }: { year?: string; month?: string; day?: string }) => {
      setState((curState) => {
        const yearValue = year ?? curState.yearValue;
        const monthValue = month ?? curState.monthValue;
        const dayValue = day ?? curState.dayValue;

        const dateString = compileDateString(
          parseSelectValue(yearValue),
          parseSelectValue(monthValue),
          parseSelectValue(dayValue)
        );

        return {
          yearValue,
          monthValue,
          dayValue,
          dateString,
          changeCount: curState.changeCount + 1, // `updateDate` changes `state.changeCount` so that `onChange` is triggered.
        };
      });
    },
    []
  );

  const setDate = useCallback((dateString: string) => {
    const { year, month, day } = parseDateString(dateString);
    setState((curState) => ({
      yearValue: year,
      monthValue: month,
      dayValue: day,
      dateString,
      changeCount: curState.changeCount, // This method does not update `state.changeCount` so that `onChange` is not triggered.
    }));
  }, []);

  // Sync from the state to the upper component through onChange when necessary.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    onChange(state.dateString || "");
  }, [state.changeCount]);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Sync from the passed value to the state when necessary.
  useEffect(() => {
    if (typeof value !== "string") {
      return;
    }

    const dateValueAsString = state.dateString || "";
    if (dateValueAsString !== value) {
      setDate(value);
    }
  }, [setDate, value]);

  const yearOptions = useMemo(() => {
    const minYear = opts.minYear != null ? opts.minYear : DEFAULT_MIN_YEAR;
    const maxYear = opts.maxYear != null ? opts.maxYear : DEFAULT_MAX_YEAR;
    const raw = range(minYear, maxYear).map((i) => {
      const s = convertToSelectValue(i);
      return { value: s, label: s };
    });
    if (!raw.some((o) => o.value === state.yearValue)) {
      return raw.concat(compileOption(state.yearValue));
    }
    return raw;
  }, [opts.minYear, opts.maxYear, state.yearValue]);

  return {
    yearValue: state.yearValue,
    monthValue: state.monthValue,
    dayValue: state.dayValue,
    yearOptions,
    monthOptions,
    dayOptions,
    onYearChange: useCallback(
      (e: React.ChangeEvent<HTMLSelectElement> | string) => {
        const value = typeof e === "string" ? e : e.target.value;
        updateDate({ year: value });
      },
      [updateDate]
    ),
    onMonthChange: useCallback(
      (e: React.ChangeEvent<HTMLSelectElement> | string) => {
        const value = typeof e === "string" ? e : e.target.value;
        updateDate({ month: value });
      },
      [updateDate]
    ),
    onDayChange: useCallback(
      (e: React.ChangeEvent<HTMLSelectElement> | string) => {
        const value = typeof e === "string" ? e : e.target.value;
        updateDate({ day: value });
      },
      [updateDate]
    ),
    dateValue: state.dateString,
    onDateChange: useCallback(
      (e: React.ChangeEvent<HTMLInputElement> | string) => {
        const value = typeof e === "string" ? e : e.target.value;
        const { year, month, day } = parseDateString(value);
        updateDate({ year, month, day });
      },
      [updateDate]
    ),
    setDate,
  };
};

import { useCallback, useReducer } from "react";
import { compileDateString, parseDateString } from "./date-string";


interface DateSelectState {
  yearValue: string; // It's of type string because it's <select />'s value.
  monthValue: string; // It's of type string because it's <select />'s value.
  dayValue: string; // It's of type string because it's <select />'s value.
  dateString: string | null;
}

interface DateSelectActionBase {
  type: string;
}
interface SetYearAction extends DateSelectActionBase {
  type: "SET_YEAR";
  year: string;
}
interface SetMonthAction extends DateSelectActionBase {
  type: "SET_MONTH";
  month: string;
}
interface SetDayAction extends DateSelectActionBase {
  type: "SET_DAY";
  day: string;
}
interface SetDateAction extends DateSelectActionBase {
  type: "SET_DATE";
  year: string;
  month: string;
  day: string;
}
type DateSelectAction = SetYearAction | SetMonthAction | SetDayAction | SetDateAction;
const dateSelectReducer: React.Reducer<DateSelectState, DateSelectAction> = (
  state,
  action
) => {
  let yearValue: string, monthValue: string, dayValue: string;
  switch (action.type) {
    case "SET_YEAR": {
      yearValue = action.year;
      monthValue = state.monthValue;
      dayValue = state.dayValue;
      break;
    }
    case "SET_MONTH": {
      yearValue = state.yearValue;
      monthValue = action.month;
      dayValue = state.dayValue;
      break;
    }
    case "SET_DAY": {
      yearValue = state.yearValue;
      monthValue = state.monthValue;
      dayValue = action.day;
      break;
    }
    case "SET_DATE": {
      yearValue = action.year;
      monthValue = action.month;
      dayValue = action.day;
    }
  }

  return {
    yearValue,
    monthValue,
    dayValue,
    dateString: compileDateString(
      parseInt(yearValue),
      parseInt(monthValue),
      parseInt(dayValue)
    ),
  };
};


export const useDateSelect = () => {
  const [state, dispatch] = useReducer(dateSelectReducer, {
    yearValue: "",
    monthValue: "",
    dayValue: "",
    dateString: null,
  });

  return {
    state,
    onYearChange: useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch({ type: "SET_YEAR", year: e.target.value }), []),
    onMonthChange: useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch({ type: "SET_MONTH", month: e.target.value }), []),
    onDayChange: useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch({ type: "SET_DAY", day: e.target.value }), []),
    onDateChange: useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { year, month, day } = parseDateString(e.target.value)
      dispatch({ type: "SET_DATE", year, month, day })
    }, [])
  };
};

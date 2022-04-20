import React, { useEffect } from "react";
import { useDateSelect, UseDateSelectInterface } from "./use-date-select";

interface ReactHookFormCompatibleProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  onBlur?: () => void;
}

export interface ChildComponentProps<TRef = any> // eslint-disable-line @typescript-eslint/no-explicit-any
  extends UseDateSelectInterface {
  ref?: React.Ref<TRef>;
}
export interface RenderArgs<TRef = any> // eslint-disable-line @typescript-eslint/no-explicit-any
  extends UseDateSelectInterface {
  ref?: React.Ref<TRef>;
}
export interface DateSelectProps<TRef = any> // eslint-disable-line @typescript-eslint/no-explicit-any
  extends ReactHookFormCompatibleProps {
  component?: React.ComponentType<ChildComponentProps<TRef>>;
  render?: (renderArgs: RenderArgs<TRef>) => React.ReactElement;
  maxYear?: number;
  minYear?: number;
  defaultYear?: number;
  defaultMonth?: number;
  defaultDay?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DateSelect = React.forwardRef<any, DateSelectProps<any>>((props, ref) => {
  // Ref is forwarded, but it is intended to be used with react-hook-form's <Controller /> to focus the input when error occurs.
  // This component is still controlled even if ref is here.

  const {
    onChange,
    value,
    maxYear,
    minYear,
    defaultYear,
    defaultMonth,
    defaultDay,
  } = props;

  const dateSelectProps = useDateSelect(onChange, {
    minYear,
    maxYear,
    defaultYear,
    defaultMonth,
    defaultDay,
  });

  const { setDate, dateValue } = dateSelectProps;
  useEffect(() => {
    if (typeof value !== "string") {
      return;
    }

    const dateValueAsString = dateValue || "";
    if (dateValueAsString !== value) {
      setDate(value);
    }
  }, [setDate, dateValue, value]);

  if (props.component) {
    return React.createElement(props.component, { ref, ...dateSelectProps });
  } else if (props.render) {
    return props.render({ ...dateSelectProps, ref });
  } else {
    throw new Error(`Either render or component must be provided.`);
  }
});
DateSelect.displayName = "DateSelect";

export default DateSelect;

import { useForm, Controller } from "react-hook-form";
import { DateSelect } from "../../lib/presets/vanilla";

type FormData = {
  date: string;
};

function VanillaReactHookFormHideDaySample() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  console.log(watch("date")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="date"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <DateSelect {...field} hideDay />}
      />
      {errors.date && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

export default VanillaReactHookFormHideDaySample;

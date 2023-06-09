import { FormControl, FormLabel, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

interface MuiTextFieldProps {
  label: string;
  inputProps?: any;
  control: any;
  name: string;
  errors: any;
  type: string;
}
const MuiTextField = ({
  label,
  inputProps,
  control,
  name,
  errors,
  type,
}: MuiTextFieldProps) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }: any) => (
          <TextField
            type={type}
            {...field}
            {...addErrorIntoField(errors[name])}
            required
            variant="outlined"
            InputProps={inputProps}
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default MuiTextField;

import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  error?: FieldError;
  label: string;
}

const Input = forwardRef<HTMLInputElement, iInputProps>(
  ({ type, id, error, label, ...rest }, ref) => {
    return (
      <>
        <div className="mb-2 w-full">
          <label className="block  font-semibold mb-2" htmlFor={id}>
            {label}
          </label>
          <input
            className="input-style w-full text-black outline-none"
            required
            type={type}
            id={id}
            ref={ref}
            {...rest}
          />
        </div>
      </>
    );
  }
);

export default Input;

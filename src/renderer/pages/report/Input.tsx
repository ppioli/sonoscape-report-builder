import { HTMLProps } from 'react';
import classNames from 'classnames';
import {
  Control,
  FieldPath,
  FieldPathByValue,
  FieldValues,
  useController,
} from 'react-hook-form';

export interface InputProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPath<TFieldValues>
> extends HTMLProps<HTMLInputElement> {
  control: Control<TFieldValues>;
  name: TPath;
  label?: string;
}
export function Input<
  TFieldValues extends FieldValues,
  TPath extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  type,
  className,
  ref,
  value,
  onChange,
  onBlur,
  ...inputRest
}: InputProps<TFieldValues, TPath>) {
  const {
    field,
    fieldState: { error },
    formState,
  } = useController({
    name,
    control,
  });
  if (ref || value || onChange || onChange) {
    // TODO Use
    throw new Error('Not implemented exception');
  }
  return (
    <div className="form-control">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        {...inputRest}
        {...field}
        type={type ?? 'text'}
        className={classNames(
          'input w-full input-bordered input-md',
          className
        )}
      />
      {error && JSON.stringify(error)}
    </div>
  );
}

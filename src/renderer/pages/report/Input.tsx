import { HTMLProps } from 'react';
import classNames from 'classnames';

export function Input({
  label,
  input,
}: {
  label?: string;
  input: HTMLProps<HTMLInputElement>;
}) {
  const { type, className, ...rest } = input;
  return (
    <div className="form-control">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        {...rest}
        type={type ?? 'text'}
        className={classNames('file-input w-full input-bordered', className)}
      />
    </div>
  );
}

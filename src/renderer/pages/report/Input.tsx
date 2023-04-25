import { HTMLProps } from 'react';
import classNames from 'classnames';

export function Input({
  label,
  input,
}: {
  label?: string;
  input: HTMLProps<HTMLInputElement>;
}) {
  return (
    <div className="form-control">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="text"
        className={classNames(
          'file-input w-full input-bordered',
          input.className
        )}
      />
    </div>
  );
}

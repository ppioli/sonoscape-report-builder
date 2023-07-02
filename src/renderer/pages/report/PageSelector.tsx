import classNames from 'classnames';
import { range } from 'lodash';

export interface PageSelectorProps {
  selectedPage: number;
  onPageChange: (selectedPage: number) => void;
  totalPages: number;
}
export function PageSelector({
  selectedPage,
  totalPages,
  onPageChange,
}: PageSelectorProps) {
  return (
    <div className="join">
      {range(1, totalPages + 1).map((ix) => {
        return (
          <button
            className={classNames('join-item btn', {
              'btn-active': ix === selectedPage,
            })}
            onClick={() => onPageChange(ix)}
          >
            {ix}
          </button>
        );
      })}
      <button className="join-item btn btn-disabled">...</button>
    </div>
  );
}

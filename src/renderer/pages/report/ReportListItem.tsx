import { MouseEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Report } from '../../../main/db/model/Report';

export function ReportListItem({ report }: { report: Report }) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if ((event.target as any).innerHTML == 'PDF') {
      console.log(event);
    } else {
      navigate(`/reports/${report.id}`);
    }
  };
  return (
    <tr
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={handleClick}
      key={report.id}
      className={classNames({
        active,
      })}
    >
      <td>{report.patient?.firstName}</td>
      <td>{report.patient?.lastName}</td>
      <td>{format(report.createdAt, 'dd-MM-yyyy')}</td>
      <td>{report.done ? 'Compleado' : 'Pendiente'}</td>
      <td>
        <Link to={`/reports/${report.id}/pdf`}>
          <button type="button" className="btn btn-primary">
            PDF
          </button>
        </Link>
      </td>
    </tr>
  );
}

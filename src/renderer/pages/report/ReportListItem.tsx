import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Report } from '../../../main/db/model/Report';

export function ReportListItem({ report }: { report: Report }) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  return (
    <tr
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => navigate(`/reports/${report.id}`)}
      key={report.id}
      className={classNames({
        active,
      })}
    >
      <td>{report.patient?.firstName}</td>
      <td>{report.patient?.lastName}</td>
      <td>{format(report.createdAt, 'dd-MM-yyyy')}</td>
      <td>{report.done ? 'Compleado' : 'Pendiente'}</td>
    </tr>
  );
}

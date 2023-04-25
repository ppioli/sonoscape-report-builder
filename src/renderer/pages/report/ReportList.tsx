import { format } from 'date-fns';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Report } from '../../../shared/model/Report';

export function ReportList() {
  const {
    value: reports,
    loading,
    error,
  } = useApi((api) => api.report.list({ pending: true }), []);

  if (!reports) {
    // todo handle error & loading state
    return null;
  }

  return (
    <div>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <ReportListItem key={r.id} report={r} />
          ))}
        </tbody>
      </table>
      <div className="btn-group">
        <button className="btn">1</button>
        <button className="btn btn-active">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
      </div>
    </div>
  );
}

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

import { useApi } from '../../hooks/useApi';
import { ReportListItem } from './ReportListItem';

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

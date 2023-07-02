import { useQuery } from 'react-query';
import { useState } from 'react';
import { makeApiCall } from '../../hooks/useApi';
import { ReportListItem } from './ReportListItem';
import NoContentSvg from '../../../../assets/no-content.svg';
import { PageSelector } from './PageSelector';

export interface ReportListProps {
  pending: boolean;
}

export function ReportList({ pending }: ReportListProps) {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data: page } = useQuery(
    ['reports-list'],
    makeApiCall((api) => api.report.list({}))
  );

  if (!page) {
    // todo handle error & loading state
    return null;
  }

  const reports = page.content;

  return (
    <div className="flex flex-col items-center">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((r) => <ReportListItem key={r.id} report={r} />)
          ) : (
            <tr>
              <td className="p-10" colSpan={1000}>
                <div className="p-3 flex text-center flex-col prose prose-slate w-full mx-auto">
                  <h1 className="mb-2">Nada por aqui...</h1>
                  <h2 className="mt-0">{pending ? 'Ya estas al dia' : ''}</h2>
                </div>
                <img
                  alt="No content"
                  className="mx-auto max-w-xs"
                  src={NoContentSvg}
                />
              </td>
            </tr>
          )}
        </tbody>
        <PageSelector
          onPageChange={setSelectedPage}
          selectedPage={selectedPage}
          totalPages={page.totalPages}
        />
      </table>
    </div>
  );
}

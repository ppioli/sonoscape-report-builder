import { useEffect, useState } from 'react';
import { api } from '../../api';
import { PatientSyncEvent } from '../../../shared/responses/PatientSyncEvent';

export function SyncComponent() {
  const [events, setEvents] = useState<PatientSyncEvent[]>([]);
  useEffect(() => {
    api.patient.syncEvent((event) => {
      console.log(event);
      setEvents((currentEvents) => [...currentEvents, event]);
    });
  }, []);

  const startSync = () => {
    console.log('Api called!');
    api.patient.syncStart();
  };

  return (
    <div>
      <button type="button" onClick={startSync}>
        Start Sync!
      </button>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th />
              <th>Job</th>
              <th>company</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr>
                <td>{event.patientId}</td>
                <td>{event.reportId}</td>
                <td>{event.status}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th />
              <th>Job</th>
              <th>company</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

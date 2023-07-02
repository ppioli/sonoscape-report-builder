import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { api } from '../../api';
import { PatientSyncEvent } from '../../../shared/responses/PatientSyncEvent';
import { Report } from '../../../main/db/model/Report';

export interface SyncPageProps {
  onLoad?: () => void;
  onCompleted?: () => void;
}

export function SyncComponent({ onLoad, onCompleted }: SyncPageProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    api.patient.syncEvent((event) => {
      console.log(event);
      if (onLoad) {
        onLoad();
      }
    });
  }, []);

  const startSync = async () => {
    setLoading(true);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    await api.patient.syncStart();
    setLoading(false);
    if (onCompleted) {
      onCompleted();
    }
  };

  return (
    <div>
      <button
        type="button"
        className={classNames('btn btn-primary')}
        onClick={startSync}
      >
        {loading ? (
          <div>
            Descargando
            <span className="loading loading-spinner loading-xs" />
          </div>
        ) : (
          <div>Descargar</div>
        )}
      </button>
    </div>
  );
}

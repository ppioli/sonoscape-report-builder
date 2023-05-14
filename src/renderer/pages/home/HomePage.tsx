import { ReportList } from '../report/ReportList';
import { SyncComponent } from '../patient/SyncPage';

function Home() {
  return (
    <div className="flex flex-col">
      <div className="prose mb-4">
        <h3 className="mb-0">Reportes pendientes</h3>
        <p>Listado de reportes pendientes</p>
      </div>
      <div>
        <SyncComponent />
      </div>
      <div className="flex-grow justify-items-center">
        <ReportList />
      </div>
    </div>
  );
}

export default Home;

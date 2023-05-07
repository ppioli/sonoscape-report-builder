import { Link } from 'react-router-dom';
import { ReportList } from '../report/ReportList';

function Home() {
  return (
    <div className="flex flex-col">
      <div className="prose mb-4">
        <h3 className="mb-0">Reportes pendientes</h3>
        <p>Listado de reportes pendientes</p>
      </div>
      <div className="flex-grow justify-items-center">
        <ReportList />
      </div>
    </div>
  );
}

export default Home;

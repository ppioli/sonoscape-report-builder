import { Link } from 'react-router-dom';
import { ReportList } from '../report/ReportList';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <article className="prose">
          <h1>Pendientes</h1>
        </article>
        <ReportList />
      </div>
    </div>
  );
}

export default Home;

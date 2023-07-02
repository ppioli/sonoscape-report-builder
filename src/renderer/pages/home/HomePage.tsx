import { useState } from 'react';
import classNames from 'classnames';
import { ReportList } from '../report/ReportList';
import { SyncComponent } from '../patient/SyncPage';

enum HomeTabs {
  Pending,
  All,
}

function Home() {
  const [activeTab, setActiveTab] = useState(HomeTabs.Pending);
  const [hack, setHack] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="tabs">
          <a
            href="#"
            onClick={() => setActiveTab(HomeTabs.Pending)}
            className={classNames('tab tab-lg tab-lifted', {
              'tab-active': activeTab === HomeTabs.Pending,
            })}
          >
            Pendientes
          </a>
          <a
            href="#"
            onClick={() => setActiveTab(HomeTabs.All)}
            className={classNames('tab tab-lg tab-lifted', {
              'tab-active': activeTab === HomeTabs.All,
            })}
          >
            Todos
          </a>
        </div>

        <div>
          <SyncComponent
            onCompleted={() => setHack((h) => h + 1)}
            onLoad={() => setHack((h) => h + 1)}
          />
        </div>
      </div>
      <div
        className={classNames({
          hidden: activeTab !== HomeTabs.Pending,
        })}
      >
        {/* <div className="prose"> */}
        {/*  <h3 className="mb-0">Reportes pendientes</h3> */}
        {/*  <p>Listado de reportes pendientes</p> */}
        {/* </div> */}
        <div className="flex-grow justify-items-center">
          <ReportList hack={hack} pending />
        </div>
      </div>
      <div
        className={classNames({
          hidden: activeTab !== HomeTabs.All,
        })}
      >
        {/* <div className="prose mb-4"> */}
        {/*  <h3 className="mb-0">Reportes</h3> */}
        {/*  <p>Listado de reportes</p> */}
        {/* </div> */}
        <div className="flex-grow justify-items-center">
          <ReportList hack={hack} pending={false} />
        </div>
      </div>
    </div>
  );
}

export default Home;

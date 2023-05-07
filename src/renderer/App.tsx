import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { ConfigPage } from './pages/config/ConfigPage';
import HomePage from './pages/home/HomePage';
import { Layout } from './Layout';
import { PatientPage } from './pages/patient/PatientPage';
import { ReportDetailPage } from './pages/report/ReportDetailPage';
import { ReportListPage } from './pages/report/ReportListPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/reports" element={<ReportListPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ConfigPage } from './pages/config/ConfigPage';
import HomePage from './pages/home/HomePage';
import { Layout } from './Layout';
import { PatientPage } from './pages/patient/PatientPage';
import { ReportDetailPage } from './pages/report/ReportDetailPage';
import { ReportListPage } from './pages/report/ReportListPage';
import { ReportPdfPage } from './pages/pdf/ReportPdfPage';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/reports" element={<ReportListPage />} />
            <Route path="/reports/:id" element={<ReportDetailPage />} />
            <Route path="/reports/:id/pdf" element={<ReportPdfPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

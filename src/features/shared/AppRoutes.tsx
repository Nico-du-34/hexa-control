import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../dashboard/pages/DashboardPage';
import { DatabasePage } from '../database/pages/DatabasePage';
import { FivemPage } from '../fivem/pages/FivemPage';
import { LogsPage } from '../logs/pages/LogsPage';
import { ScreenPage } from '../screen/pages/ScreenPage';
import { ServersPage } from '../servers/pages/ServersPage';
import { SshPage } from '../ssh/pages/SshPage';
import { UfwPage } from '../ufw/pages/UfwPage';

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/servers" element={<ServersPage />} />
      <Route path="/ssh" element={<SshPage />} />
      <Route path="/screen" element={<ScreenPage />} />
      <Route path="/fivem" element={<FivemPage />} />
      <Route path="/ufw" element={<UfwPage />} />
      <Route path="/database" element={<DatabasePage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

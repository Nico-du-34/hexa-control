import { AppLayout } from './components/layout/AppLayout';
import { AppRoutes } from './features/shared/AppRoutes';

export function App(): JSX.Element {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

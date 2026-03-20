import { useHexaStore } from '../../../store/useHexaStore';

export function LogsPage(): JSX.Element {
  const logs = useHexaStore((state) => state.logs);

  return (
    <section>
      <h2>Journal d'activité</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Catégorie</th>
              <th>Action</th>
              <th>Statut</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
                <td>{log.category}</td>
                <td>{log.action}</td>
                <td>{log.status}</td>
                <td>{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

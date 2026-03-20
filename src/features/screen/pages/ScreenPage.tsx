import { useHexaStore } from '../../../store/useHexaStore';

export function ScreenPage(): JSX.Element {
  const sessions = useHexaStore((state) => state.screenSessions);

  return (
    <section>
      <h2>Gestion screen</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Session</th>
              <th>Serveur</th>
              <th>Attachée</th>
              <th>Démarrée</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td>{session.name}</td>
                <td>{session.serverId}</td>
                <td>{session.attached ? 'Oui' : 'Non'}</td>
                <td>{new Date(session.startedAt).toLocaleString()}</td>
                <td><button type="button">Tuer session</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

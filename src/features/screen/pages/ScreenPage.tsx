import { useState } from 'react';
import { useHexaStore } from '../../../store/useHexaStore';

export function ScreenPage(): JSX.Element {
  const sessions = useHexaStore((state) => state.screenSessions);
  const servers = useHexaStore((state) => state.servers);
  const createScreenSession = useHexaStore((state) => state.createScreenSession);
  const killScreenSession = useHexaStore((state) => state.killScreenSession);
  const [serverId, setServerId] = useState(servers[0]?.id ?? '');
  const [name, setName] = useState('maintenance');

  return (
    <section>
      <h2>Gestion screen</h2>
      <div className="inline-form">
        <select value={serverId} onChange={(event) => setServerId(event.target.value)}>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>{server.name}</option>
          ))}
        </select>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nom session" />
        <button type="button" onClick={() => createScreenSession(serverId, name)}>Créer session</button>
      </div>
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
                <td><button type="button" onClick={() => killScreenSession(session.id)}>Tuer session</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

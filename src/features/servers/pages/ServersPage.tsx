import { FormEvent, useState } from 'react';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useHexaStore } from '../../../store/useHexaStore';

export function ServersPage(): JSX.Element {
  const servers = useHexaStore((state) => state.servers);
  const addServer = useHexaStore((state) => state.addServer);
  const [name, setName] = useState('');
  const [host, setHost] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !host) return;

    addServer({
      id: crypto.randomUUID(),
      name,
      host,
      port: 22,
      sshUser: 'root',
      role: 'web',
      online: false,
      latencyMs: 0,
      tags: ['new']
    });
    setName('');
    setHost('');
  };

  return (
    <section>
      <h2>Gestion multi-serveurs</h2>
      <form className="inline-form" onSubmit={onSubmit}>
        <input value={name} placeholder="Nom serveur" onChange={(event) => setName(event.target.value)} />
        <input value={host} placeholder="IP / Host" onChange={(event) => setHost(event.target.value)} />
        <button type="submit">Ajouter</button>
      </form>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Hôte</th>
              <th>Utilisateur SSH</th>
              <th>Rôle</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.id}>
                <td>{server.name}</td>
                <td>{server.host}:{server.port}</td>
                <td>{server.sshUser}</td>
                <td>{server.role}</td>
                <td><StatusBadge status={server.online ? 'online' : 'offline'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

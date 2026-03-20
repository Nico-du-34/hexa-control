import { FormEvent, useState } from 'react';
import { useHexaStore } from '../../../store/useHexaStore';

export function UfwPage(): JSX.Element {
  const rules = useHexaStore((state) => state.ufwRules);
  const servers = useHexaStore((state) => state.servers);
  const addUfwRule = useHexaStore((state) => state.addUfwRule);
  const removeUfwRule = useHexaStore((state) => state.removeUfwRule);

  const [serverId, setServerId] = useState(servers[0]?.id ?? '');
  const [port, setPort] = useState('443');
  const [protocol, setProtocol] = useState<'tcp' | 'udp'>('tcp');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const confirmed = window.confirm(`Confirmer ajout règle UFW allow ${port}/${protocol} ?`);
    if (!confirmed) return;
    addUfwRule({ serverId, action: 'allow', port, protocol, source: 'Anywhere' });
  };

  return (
    <section>
      <h2>Firewall UFW</h2>
      <p className="muted">Toute action sensible est confirmée et journalisée localement.</p>
      <form className="inline-form" onSubmit={onSubmit}>
        <select value={serverId} onChange={(event) => setServerId(event.target.value)}>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>{server.name}</option>
          ))}
        </select>
        <input value={port} onChange={(event) => setPort(event.target.value)} placeholder="Port" />
        <select value={protocol} onChange={(event) => setProtocol(event.target.value as 'tcp' | 'udp')}>
          <option value="tcp">tcp</option>
          <option value="udp">udp</option>
        </select>
        <button type="submit">Ajouter règle</button>
      </form>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Port</th>
              <th>Proto</th>
              <th>Source</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.port}</td>
                <td>{rule.protocol}</td>
                <td>{rule.source}</td>
                <td>{rule.action}</td>
                <td>
                  <button type="button" onClick={() => removeUfwRule(rule.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

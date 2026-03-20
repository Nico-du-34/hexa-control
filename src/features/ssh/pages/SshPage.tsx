import { useMemo, useState } from 'react';
import { commandLibrary } from '../../../services/mockData';
import { runRemoteCommand, testSshConnection } from '../../../services/sshService';
import { useHexaStore } from '../../../store/useHexaStore';

export function SshPage(): JSX.Element {
  const servers = useHexaStore((state) => state.servers);
  const logs = useHexaStore((state) => state.logs);
  const appendLog = useHexaStore((state) => state.appendLog);
  const [selectedServerId, setSelectedServerId] = useState(servers[0]?.id ?? '');
  const [command, setCommand] = useState(commandLibrary[0]);
  const [output, setOutput] = useState('');

  const commandHistory = useMemo(
    () => logs.filter((log) => log.category === 'ssh').slice(0, 6),
    [logs]
  );

  const handleTest = async () => {
    const ok = await testSshConnection(selectedServerId);
    setOutput(ok ? 'Connexion SSH OK (mock backend).' : 'Connexion SSH échouée.');
  };

  const handleRun = async () => {
    const result = await runRemoteCommand(selectedServerId, command);
    setOutput(`${result.stdout}${result.stderr ? `\nERR: ${result.stderr}` : ''}`);
    appendLog({
      id: crypto.randomUUID(),
      category: 'ssh',
      action: 'execute-command',
      status: result.exitCode === 0 ? 'success' : 'error',
      serverId: selectedServerId,
      message: command,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <section>
      <h2>Connexion SSH</h2>
      <div className="inline-form">
        <select value={selectedServerId} onChange={(event) => setSelectedServerId(event.target.value)}>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>{server.name}</option>
          ))}
        </select>
        <button onClick={handleTest} type="button">Tester connexion</button>
      </div>
      <div className="inline-form">
        <select value={command} onChange={(event) => setCommand(event.target.value)}>
          {commandLibrary.map((entry) => (
            <option key={entry} value={entry}>{entry}</option>
          ))}
        </select>
        <button onClick={handleRun} type="button">Exécuter</button>
      </div>
      <pre>{output || 'Aucune sortie.'}</pre>

      <h3>Historique commandes SSH</h3>
      <ul>
        {commandHistory.map((item) => (
          <li key={item.id}>{new Date(item.createdAt).toLocaleString()} — {item.message}</li>
        ))}
      </ul>
    </section>
  );
}

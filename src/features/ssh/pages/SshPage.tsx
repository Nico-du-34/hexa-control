import { useState } from 'react';
import { runRemoteCommand, testSshConnection } from '../../../services/sshService';
import { useHexaStore } from '../../../store/useHexaStore';

export function SshPage(): JSX.Element {
  const servers = useHexaStore((state) => state.servers);
  const appendLog = useHexaStore((state) => state.appendLog);
  const [selectedServerId, setSelectedServerId] = useState(servers[0]?.id ?? '');
  const [command, setCommand] = useState('uptime');
  const [output, setOutput] = useState('');

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
        <input value={command} onChange={(event) => setCommand(event.target.value)} />
        <button onClick={handleRun} type="button">Exécuter</button>
      </div>
      <pre>{output || 'Aucune sortie.'}</pre>
    </section>
  );
}

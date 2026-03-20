import { useEffect } from 'react';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useHexaStore } from '../../../store/useHexaStore';

export function DashboardPage(): JSX.Element {
  const servers = useHexaStore((state) => state.servers);
  const metrics = useHexaStore((state) => state.metrics);
  const refreshMetrics = useHexaStore((state) => state.refreshMetrics);

  useEffect(() => {
    const interval = setInterval(refreshMetrics, 5000);
    return () => clearInterval(interval);
  }, [refreshMetrics]);

  const onlineCount = servers.filter((server) => server.online).length;

  return (
    <section>
      <h2>Global Dashboard</h2>
      <p className="muted">Vue consolidée multi-serveurs, actualisation mock toutes les 5s.</p>
      <div className="inline-form">
        <button type="button" onClick={refreshMetrics}>Rafraîchir maintenant</button>
        <span>{onlineCount}/{servers.length} serveurs en ligne</span>
      </div>
      <div className="grid cards">
        {servers.map((server) => {
          const metric = metrics.find((item) => item.serverId === server.id);
          return (
            <article key={server.id} className="card">
              <div className="card-title-row">
                <h3>{server.name}</h3>
                <StatusBadge status={server.online ? 'online' : 'offline'} />
              </div>
              <p>{server.host}:{server.port} · {server.role}</p>
              <ul>
                <li>CPU: {metric?.cpuPercent ?? '-'}%</li>
                <li>RAM: {metric?.ramPercent ?? '-'}%</li>
                <li>Disk: {metric?.diskPercent ?? '-'}%</li>
                <li>RX/TX: {metric?.networkRxKbps ?? '-'} / {metric?.networkTxKbps ?? '-'} kbps</li>
                <li>Latency: {server.latencyMs} ms</li>
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

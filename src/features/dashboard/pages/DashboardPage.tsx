import { StatusBadge } from '../../../components/common/StatusBadge';
import { useHexaStore } from '../../../store/useHexaStore';

export function DashboardPage(): JSX.Element {
  const servers = useHexaStore((state) => state.servers);
  const metrics = useHexaStore((state) => state.metrics);

  return (
    <section>
      <h2>Global Dashboard</h2>
      <p className="muted">Vue consolidée multi-serveurs (mock temps réel).</p>
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
                <li>Latency: {server.latencyMs} ms</li>
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

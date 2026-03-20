import type {
  ActivityLogItem,
  DbConnectionProfile,
  FivemState,
  MetricSnapshot,
  ScreenSession,
  ServerNode,
  UfwRule
} from '../types/domain';

export const mockServers: ServerNode[] = [
  {
    id: 'srv-1',
    name: 'Paris FiveM #1',
    host: '192.168.50.10',
    port: 22,
    sshUser: 'admin',
    role: 'fivem',
    online: true,
    latencyMs: 24,
    tags: ['production', 'fivem'],
    notes: 'Primary gameplay host'
  },
  {
    id: 'srv-2',
    name: 'DB Replica North',
    host: '192.168.50.21',
    port: 22,
    sshUser: 'root',
    role: 'database',
    online: false,
    latencyMs: 0,
    tags: ['database', 'replica'],
    notes: 'Read replica only'
  }
];

export const mockMetrics: MetricSnapshot[] = [
  {
    serverId: 'srv-1',
    cpuPercent: 42,
    ramPercent: 68,
    diskPercent: 51,
    uptime: '11 days 4h',
    networkRxKbps: 860,
    networkTxKbps: 421,
    updatedAt: new Date().toISOString()
  },
  {
    serverId: 'srv-2',
    cpuPercent: 0,
    ramPercent: 0,
    diskPercent: 0,
    uptime: 'offline',
    networkRxKbps: 0,
    networkTxKbps: 0,
    updatedAt: new Date().toISOString()
  }
];

export const mockLogs: ActivityLogItem[] = [
  {
    id: 'log-1',
    serverId: 'srv-1',
    category: 'ssh',
    action: 'execute-command',
    status: 'success',
    message: 'systemctl restart fivem.service',
    createdAt: new Date().toISOString()
  },
  {
    id: 'log-2',
    serverId: 'srv-1',
    category: 'security',
    action: 'confirm-required',
    status: 'warning',
    message: 'UFW rule change requires explicit confirmation.',
    createdAt: new Date().toISOString()
  }
];

export const mockScreenSessions: ScreenSession[] = [
  {
    id: 'sc-1',
    serverId: 'srv-1',
    name: 'fivem-main',
    attached: false,
    startedAt: '2026-03-20T10:00:00.000Z'
  }
];

export const mockFivemStates: FivemState[] = [
  {
    serverId: 'srv-1',
    artifactsVersion: '7563',
    updateAvailable: true,
    resources: [
      { name: 'essentialmode', enabled: true },
      { name: 'esx_identity', enabled: true },
      { name: 'legacy_garage', enabled: false }
    ]
  }
];

export const mockUfwRules: UfwRule[] = [
  {
    id: 'ufw-1',
    serverId: 'srv-1',
    port: '22',
    protocol: 'tcp',
    source: 'Anywhere',
    action: 'allow'
  },
  {
    id: 'ufw-2',
    serverId: 'srv-1',
    port: '30120',
    protocol: 'udp',
    source: 'Anywhere',
    action: 'allow'
  }
];

export const mockDbProfiles: DbConnectionProfile[] = [
  {
    id: 'db-1',
    serverId: 'srv-2',
    engine: 'mariadb',
    database: 'fivem_prod',
    user: 'hexa_reader',
    host: '192.168.50.21',
    port: 3306
  }
];

export const commandLibrary = ['uptime', 'free -m', 'df -h', 'systemctl status fivem.service'];

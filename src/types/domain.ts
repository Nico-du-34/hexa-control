export type ServerRole = 'fivem' | 'database' | 'web' | 'backup' | 'proxy';

export interface ServerNode {
  id: string;
  name: string;
  host: string;
  port: number;
  sshUser: string;
  role: ServerRole;
  online: boolean;
  latencyMs: number;
  tags: string[];
  notes?: string;
}

export interface MetricSnapshot {
  serverId: string;
  cpuPercent: number;
  ramPercent: number;
  diskPercent: number;
  uptime: string;
  networkRxKbps: number;
  networkTxKbps: number;
  updatedAt: string;
}

export interface ActivityLogItem {
  id: string;
  serverId?: string;
  category: 'ssh' | 'screen' | 'fivem' | 'ufw' | 'database' | 'security';
  action: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  createdAt: string;
}

export interface ScreenSession {
  id: string;
  serverId: string;
  name: string;
  attached: boolean;
  startedAt: string;
}

export interface FivemState {
  serverId: string;
  artifactsVersion: string;
  updateAvailable: boolean;
  resources: { name: string; enabled: boolean }[];
}

export interface UfwRule {
  id: string;
  serverId: string;
  port: string;
  protocol: 'tcp' | 'udp';
  source: string;
  action: 'allow' | 'deny';
}

export interface DbConnectionProfile {
  id: string;
  serverId: string;
  engine: 'mysql' | 'mariadb' | 'postgresql';
  database: string;
  user: string;
  host: string;
  port: number;
}

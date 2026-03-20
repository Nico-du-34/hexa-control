import { create } from 'zustand';
import {
  mockDbProfiles,
  mockFivemStates,
  mockLogs,
  mockMetrics,
  mockScreenSessions,
  mockServers,
  mockUfwRules
} from '../services/mockData';
import type {
  ActivityLogItem,
  DbConnectionProfile,
  FivemState,
  MetricSnapshot,
  ScreenSession,
  ServerNode,
  UfwRule
} from '../types/domain';

interface HexaStore {
  servers: ServerNode[];
  metrics: MetricSnapshot[];
  logs: ActivityLogItem[];
  screenSessions: ScreenSession[];
  fivemStates: FivemState[];
  ufwRules: UfwRule[];
  dbProfiles: DbConnectionProfile[];
  addServer: (server: ServerNode) => void;
  removeServer: (serverId: string) => void;
  appendLog: (log: ActivityLogItem) => void;
  createScreenSession: (serverId: string, name: string) => void;
  killScreenSession: (sessionId: string) => void;
  addUfwRule: (rule: Omit<UfwRule, 'id'>) => void;
  removeUfwRule: (ruleId: string) => void;
  refreshMetrics: () => void;
  applyFivemUpdate: (serverId: string) => void;
}

const rand = (value: number, spread = 8): number => Math.max(0, Math.min(100, Math.round(value + (Math.random() * spread * 2 - spread))));

export const useHexaStore = create<HexaStore>((set) => ({
  servers: mockServers,
  metrics: mockMetrics,
  logs: mockLogs,
  screenSessions: mockScreenSessions,
  fivemStates: mockFivemStates,
  ufwRules: mockUfwRules,
  dbProfiles: mockDbProfiles,
  addServer: (server) =>
    set((state) => ({
      servers: [...state.servers, server],
      logs: [
        {
          id: crypto.randomUUID(),
          category: 'security',
          action: 'server-added',
          status: 'success',
          serverId: server.id,
          message: `Server ${server.name} added to inventory`,
          createdAt: new Date().toISOString()
        },
        ...state.logs
      ]
    })),
  removeServer: (serverId) =>
    set((state) => ({
      servers: state.servers.filter((server) => server.id !== serverId),
      logs: [
        {
          id: crypto.randomUUID(),
          category: 'security',
          action: 'server-removed',
          status: 'warning',
          serverId,
          message: `Server ${serverId} removed after explicit confirmation`,
          createdAt: new Date().toISOString()
        },
        ...state.logs
      ]
    })),
  appendLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
  createScreenSession: (serverId, name) =>
    set((state) => ({
      screenSessions: [
        {
          id: crypto.randomUUID(),
          serverId,
          name,
          attached: false,
          startedAt: new Date().toISOString()
        },
        ...state.screenSessions
      ]
    })),
  killScreenSession: (sessionId) =>
    set((state) => ({
      screenSessions: state.screenSessions.filter((session) => session.id !== sessionId),
      logs: [
        {
          id: crypto.randomUUID(),
          category: 'screen',
          action: 'kill-session',
          status: 'warning',
          message: `screen session ${sessionId} terminated`,
          createdAt: new Date().toISOString()
        },
        ...state.logs
      ]
    })),
  addUfwRule: (rule) =>
    set((state) => ({
      ufwRules: [...state.ufwRules, { ...rule, id: crypto.randomUUID() }],
      logs: [
        {
          id: crypto.randomUUID(),
          category: 'ufw',
          action: 'add-rule',
          status: 'warning',
          serverId: rule.serverId,
          message: `${rule.action} ${rule.port}/${rule.protocol} from ${rule.source}`,
          createdAt: new Date().toISOString()
        },
        ...state.logs
      ]
    })),
  removeUfwRule: (ruleId) =>
    set((state) => ({
      ufwRules: state.ufwRules.filter((rule) => rule.id !== ruleId),
      logs: [
        {
          id: crypto.randomUUID(),
          category: 'ufw',
          action: 'remove-rule',
          status: 'warning',
          message: `UFW rule ${ruleId} removed`,
          createdAt: new Date().toISOString()
        },
        ...state.logs
      ]
    })),
  refreshMetrics: () =>
    set((state) => ({
      metrics: state.metrics.map((metric) => {
        const isOffline = metric.uptime === 'offline';
        return isOffline
          ? metric
          : {
              ...metric,
              cpuPercent: rand(metric.cpuPercent),
              ramPercent: rand(metric.ramPercent, 4),
              diskPercent: rand(metric.diskPercent, 1),
              networkRxKbps: Math.max(0, metric.networkRxKbps + Math.round(Math.random() * 120 - 60)),
              networkTxKbps: Math.max(0, metric.networkTxKbps + Math.round(Math.random() * 90 - 40)),
              updatedAt: new Date().toISOString()
            };
      })
    })),
  applyFivemUpdate: (serverId) =>
    set((state) => ({
      fivemStates: state.fivemStates.map((item) =>
        item.serverId === serverId
          ? {
              ...item,
              artifactsVersion: String(Number(item.artifactsVersion) + 1),
              updateAvailable: false
            }
          : item
      ),
      logs: [
        {
          id: crypto.randomUUID(),
          category: 'fivem',
          action: 'artifact-update',
          status: 'success',
          serverId,
          message: 'Backup created and artifacts updated (mock).',
          createdAt: new Date().toISOString()
        },
        ...state.logs
      ]
    }))
}));

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
  appendLog: (log: ActivityLogItem) => void;
}

export const useHexaStore = create<HexaStore>((set) => ({
  servers: mockServers,
  metrics: mockMetrics,
  logs: mockLogs,
  screenSessions: mockScreenSessions,
  fivemStates: mockFivemStates,
  ufwRules: mockUfwRules,
  dbProfiles: mockDbProfiles,
  addServer: (server) => set((state) => ({ servers: [...state.servers, server] })),
  appendLog: (log) => set((state) => ({ logs: [log, ...state.logs] }))
}));

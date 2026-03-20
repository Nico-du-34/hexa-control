import { invoke } from '@tauri-apps/api/core';

export interface SshCommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export async function testSshConnection(serverId: string): Promise<boolean> {
  return invoke<boolean>('ssh_test_connection', { serverId });
}

export async function runRemoteCommand(serverId: string, command: string): Promise<SshCommandResult> {
  return invoke<SshCommandResult>('ssh_run_command', { serverId, command });
}

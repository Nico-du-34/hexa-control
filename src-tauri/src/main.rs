#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;

#[derive(Serialize)]
struct SshCommandResult {
    stdout: String,
    stderr: String,
    exit_code: i32,
}

#[tauri::command]
fn ssh_test_connection(server_id: String) -> bool {
    !server_id.is_empty()
}

#[tauri::command]
fn ssh_run_command(server_id: String, command: String) -> SshCommandResult {
    if server_id.is_empty() {
        return SshCommandResult {
            stdout: String::new(),
            stderr: "Server not selected".to_string(),
            exit_code: 1,
        };
    }

    SshCommandResult {
        stdout: format!("[MOCK:{}] command executed: {}", server_id, command),
        stderr: String::new(),
        exit_code: 0,
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ssh_test_connection, ssh_run_command])
        .run(tauri::generate_context!())
        .expect("error while running Hexa-Control");
}

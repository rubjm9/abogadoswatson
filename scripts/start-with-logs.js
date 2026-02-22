#!/usr/bin/env node
/**
 * Wrapper para "next start" que escribe logs en archivo y stderr.
 * Útil en hosting (ej. Hostinger) para ver por qué falla el arranque (503).
 * Logs: stderr + archivo en ./logs/server.log (o LOG_FILE)
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || "3000";
const LOG_FILE = process.env.LOG_FILE || path.join(process.cwd(), "logs", "server.log");

function log(msg, alsoStdout = false) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  process.stderr.write(line);
  if (alsoStdout) process.stdout.write(line);
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, line);
  } catch (e) {
    process.stderr.write(`[start-with-logs] No se pudo escribir en ${LOG_FILE}: ${e.message}\n`);
  }
}

log(`PORT=${PORT} NODE_ENV=${process.env.NODE_ENV} cwd=${process.cwd()} LOG_FILE=${LOG_FILE}`);
log("Iniciando next start...");

const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const child = spawn(
  process.execPath,
  [nextBin, "start", "-p", PORT],
  {
    stdio: ["inherit", "pipe", "pipe"],
    env: { ...process.env, PORT },
    cwd: process.cwd(),
  }
);

child.stdout.on("data", (data) => {
  const s = data.toString();
  process.stdout.write(s);
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, s);
  } catch (_) {}
});

child.stderr.on("data", (data) => {
  const s = data.toString();
  process.stderr.write(s);
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, s);
  } catch (_) {}
});

child.on("error", (err) => {
  log(`ERROR al arrancar proceso: ${err.message}`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  log(`Proceso terminado: code=${code} signal=${signal}`);
  process.exit(code !== null ? code : 1);
});

process.on("uncaughtException", (err) => {
  log(`UncaughtException: ${err.stack}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, p) => {
  log(`UnhandledRejection: ${reason}`);
});

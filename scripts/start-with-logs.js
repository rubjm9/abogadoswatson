#!/usr/bin/env node
/**
 * Wrapper para "next start" que escribe logs en archivo y stderr.
 * Útil en hosting (ej. Hostinger) para ver por qué falla el arranque (503).
 * Logs: stderr + ./logs/server.log (o LOG_FILE) + fallback ./startup.log en la raíz del proyecto.
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const PORT = process.env.PORT || "3000";
const LOG_FILE = process.env.LOG_FILE || path.join(cwd, "logs", "server.log");
const FALLBACK_LOG = path.join(cwd, "startup.log");

function writeToFile(filePath, line) {
  try {
    if (filePath.includes("logs")) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.appendFileSync(filePath, line);
  } catch (_) {}
}

function log(msg, alsoStdout = false) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  process.stderr.write(line);
  if (alsoStdout) process.stdout.write(line);
  writeToFile(LOG_FILE, line);
  if (LOG_FILE !== FALLBACK_LOG) writeToFile(FALLBACK_LOG, line);
}

// Crear carpeta logs y primer log al instante (para que exista aunque el proceso falle después)
try {
  fs.mkdirSync(path.join(cwd, "logs"), { recursive: true });
  const firstLine = `[${new Date().toISOString()}] start-with-logs.js iniciado cwd=${cwd} PORT=${PORT} LOG_FILE=${LOG_FILE}\n`;
  fs.writeFileSync(LOG_FILE, firstLine);
  fs.writeFileSync(FALLBACK_LOG, firstLine);
} catch (e) {
  process.stderr.write(`[start-with-logs] No se pudo crear logs: ${e.message}\n`);
}

log(`PORT=${PORT} NODE_ENV=${process.env.NODE_ENV} cwd=${cwd} LOG_FILE=${LOG_FILE}`);
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
  writeToFile(LOG_FILE, s);
  writeToFile(FALLBACK_LOG, s);
});

child.stderr.on("data", (data) => {
  const s = data.toString();
  process.stderr.write(s);
  writeToFile(LOG_FILE, s);
  writeToFile(FALLBACK_LOG, s);
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

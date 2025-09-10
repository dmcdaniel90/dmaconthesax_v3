#!/usr/bin/env node

import { spawn, exec } from 'child_process';
import net from 'net';

const PORT = process.env.PORT || 3001;

/**
 * Check if a port is available
 */
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

/**
 * Kill processes using a specific port
 */
async function killPortProcesses(port) {
  return new Promise((resolve) => {
    
    // Try to find and kill processes using the port
    exec(`lsof -ti:${port}`, (error, stdout) => {
      if (stdout.trim()) {
        const pids = stdout.trim().split('\n');
        console.log(`Found processes using port ${port}: ${pids.join(', ')}`);
        
        // Kill each process
        pids.forEach(pid => {
          exec(`kill -9 ${pid}`, (killError) => {
            if (killError) {
              console.log(`Failed to kill process ${pid}: ${killError.message}`);
            } else {
              console.log(`Killed process ${pid}`);
            }
          });
        });
        
        // Wait a bit for processes to die
        setTimeout(resolve, 2000);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Start the Next.js server
 */
async function startServer() {
  console.log(`Starting server on port ${PORT}...`);
  
  // First, try to kill any existing processes on the port
  await killPortProcesses(PORT);
  
  // Wait a moment for processes to be killed
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if port is available
  const available = await isPortAvailable(PORT);
  if (!available) {
    console.error(`Port ${PORT} is still in use after cleanup attempts`);
    process.exit(1);
  }
  
  console.log(`Port ${PORT} is available, starting server...`);
  
  // Start the Next.js server
  const server = spawn('pnpm', ['start:ci'], {
    stdio: 'inherit',
    env: { ...process.env, PORT }
  });
  
  // Handle server process
  server.on('error', (error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });
  
  server.on('exit', (code) => {
    console.log(`Server exited with code ${code}`);
    process.exit(code);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down server...');
    server.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down server...');
    server.kill('SIGTERM');
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

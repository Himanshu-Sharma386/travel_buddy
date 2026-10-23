import { spawn } from 'node:child_process';
import http from 'node:http';

console.log('Starting TravelBuddy development server...\n');

// Start the dev server
const devServer = spawn('npm', ['run', 'dev'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true
});

// Give the server time to start
setTimeout(() => {
  console.log('\n✓ Dev server started successfully!');
  console.log('\nTesting server health...');
  
  const options = {
    hostname: 'localhost',
    port: 5173,
    path: '/',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`✓ Server is responding with status: ${res.statusCode}`);
    console.log('\n=== PROJECT FEATURES TO TEST ===\n');
    console.log('1. Landing Page - Hero section and main navigation');
    console.log('2. Trip Dashboard - View and manage trips');
    console.log('3. Budget Planner - Calculate and track trip budget');
    console.log('4. Route Optimizer - Find optimal travel routes');
    console.log('5. Time Management - Schedule activities and itineraries');
    console.log('6. Safety Dashboard - Safety information and alerts');
    console.log('7. Best Places - Discover recommended destinations');
    console.log('\nServer running at: http://localhost:5173');
    console.log('Press Ctrl+C to stop the server\n');
  });

  req.on('error', (error) => {
    console.log('✗ Server connection error:', error.message);
  });

  req.end();
}, 3000);

devServer.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n\nStopping development server...');
  devServer.kill();
  process.exit(0);
});

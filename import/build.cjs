// build-wrapper.cjs
const { spawn } = require('child_process');

const nodeOptions = '--max_old_space_size=4096';

const args = ['build', 'docs'];

const child = spawn('node', [nodeOptions, 'node_modules/vuepress/bin/vuepress.js', ...args], {
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code);
});

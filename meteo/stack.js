const pathfs = require("path");
require('dotenv').config()

/** @type {import('@iryu54/stack-monitor').StackFile} */
const stack = (stackMonitor) => {
  stackMonitor.onLaunch((service) => console.log(`▶️ ${service?.label}`));
  stackMonitor.onServiceCrash((service) => console.log(`❌ ${service?.label}`));
  stackMonitor.onServiceRestart((service) => console.log(`🔃 ${service?.label}`));
  stackMonitor.onServiceKill((service) => console.log(`❌ ${service?.label}`));
  return {
    logParsers: [
      stackMonitor.parsers.links,
      stackMonitor.parsers.jsons,
      stackMonitor.parsers.debug
    ],
    services: [
      {
        label: 'Meteo - Front',
        spawnCmd: 'npm',
        spawnArgs: ['run', 'serve'],
        urls: ['http://localhost:4280'],
        rootPath: pathfs.resolve(__dirname, '..'),
        spawnOptions: {
          cwd: pathfs.resolve(__dirname),
          env: {
            PORT: '4280',
            VITE_APP_SERVER_URL: 'http://localhost:4281'
          }
        }
      },
      {
        label: 'Meteo - Serveur',
        spawnCmd: 'npm',
        spawnArgs: ['run', 'serve:server'],
        urls: ['http://localhost:4281'],
        rootPath: pathfs.resolve(__dirname, '..'),
        spawnOptions: {
          cwd: pathfs.resolve(__dirname),
          env: {
            PORT: '4281',
            OPEN_ROUTE_SERVICE: process.env.OPEN_ROUTE_SERVICE
          }
        }
      }
    ]
  }
}

module.exports = stack;

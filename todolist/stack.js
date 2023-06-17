const pathfs = require("path");

/** @type {import('@iryu54/stack-monitor').StackFile} */
const stack = (stackMonitor) => {
  stackMonitor.onLaunch((service) => console.log(`▶️ ${service?.label}`));
  stackMonitor.onServiceCrash((service) => console.log(`❌ ${service?.label}`));
  stackMonitor.onServiceRestart((service) => console.log(`🔃 ${service?.label}`));
  stackMonitor.onServiceKill((service) => console.log(`❌ ${service?.label}`));
  return {
    services: [
      {
        label: "Todolist - Serveur",
        spawnCmd: "npm",
        spawnArgs: ["run", "serve"],
        urls: ["http://localhost:4215"],
        rootPath: pathfs.resolve(__dirname, ".."),
        spawnOptions: {
          cwd: pathfs.resolve(__dirname, "server"),
          env: Object.assign(
            {
              PORT: "4215",
              mongoDbURL: `mongodb://root:123456@localhost:27017/todolist?authSource=admin`,
            },
            process.env
          ),
        },
      },
      {
        label: "Todolist - Front",
        spawnCmd: "npm",
        spawnArgs: ["run", "serve"],
        urls: ["http://localhost:3000"],
        rootPath: pathfs.resolve(__dirname, ".."),
        spawnOptions: {
          cwd: pathfs.resolve(__dirname, "front"),
          env: Object.assign(
            {
              VUE_APP_SERVER_URL: "http://localhost",
              VUE_APP_SERVER_PORT: 4215,
              VUE_APP_FRONT_URL: "http://localhost",
              VUE_APP_FRONT_PORT: 3000,
              VUE_APP_VERSION: "v0.0.0",
            },
            process.env
          ),
        },
      },
    ]
  }
}

module.exports = stack;

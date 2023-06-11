const cp = require('child_process');
const Promise = require('bluebird');
const pathfs = require('path');
const os = require('os');
const forks = [];
module.exports.import = async (conf = {
  paths: ['.']
}) => {
  const paths = conf.paths.map(path => pathfs.resolve(path))
  this.currentFile = '';
  return new Promise((resolve) => {
    this.status = 'import is working';
    const dirs = paths;
    let finish = 0;
    const nbCpus = os.cpus().length;
    const files = []
    for (var i = 0; i < nbCpus; i++) {
      const fork = cp.fork(pathfs.resolve(__dirname, './walkerFork.js'));
      fork.on('message', function (data) {
        // @ts-ignore
        dirs.push(...(data?.dirs || []))
        // @ts-ignore
        files.push(...(data?.files || []))
        forks.push(this);
      });
      forks.push(fork);
    }
    const loop = setInterval(_ => {
      if (dirs.length === 0 || forks.length === 0) return;
      const dir = dirs.pop();
      if (!dir) return;
      const fork = forks.pop();
      if (!fork) return;
      fork.send({ ...conf, dir });
    });
    const finishInterval = setInterval(async _ => {
      if (finish === 5) {
        clearInterval(loop);
        clearInterval(finishInterval);
        forks.forEach(fork => fork.kill('SIGKILL'))
        resolve(files);
      }
      if (dirs.length === 0 && forks.length === os.cpus().length) finish++;
      else finish = 0;
    }, 100);
  });
};
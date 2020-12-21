const process = require('child_process');
const { promisify } = require('util');
const package = require('./package.json');

const exec = promisify(process.exec);

const shell = `
docker build --tag=${package.name}:v${package.version} . &&
docker tag ${package.name}:v${package.version}  qq8282661/${package.name}:v${package.version} &&
docker qq8282661/${package.name}:v${package.version}
`;
console.log(shell);
async function bootstrap() {
  const promisec = exec('docker --help');
  const res = await promisec;
  console.log(res);
}

bootstrap();

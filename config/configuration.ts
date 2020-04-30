import { readFileSync } from 'fs';

export default () => ({
  appId: '2016123456789012',
  privateKey: readFileSync('./hs_alipk.txt', 'ascii'),
});

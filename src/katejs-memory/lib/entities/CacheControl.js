import fs from 'fs';
import path from 'path';

export default class CacheControl {
  // eslint-disable-next-line class-methods-use-this
  save({ data }) {
    fs.writeFileSync(path.join(process.cwd(), 'memory.json'), JSON.stringify(data));
    return { response: { message: 'OK' } };
  }
}

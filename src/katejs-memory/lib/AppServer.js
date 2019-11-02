import { use } from 'katejs';

import { packageName } from './structure';
import CacheControl from './entities/CacheControl';

const AppServer = parent => class Server extends use(parent) {

  constructor(params) {
    super(params);
    this.entities = {
      ...this.entities,
      CacheControl,
    };

    this.publicAccessRules.push({
      entity: 'CacheControl',
      method: 'save',
      access: true,
    });
  }
};
AppServer.package = packageName;
export default AppServer;

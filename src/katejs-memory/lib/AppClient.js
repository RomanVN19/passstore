import { use } from 'katejs/lib/client';

import { packageName } from './structure';
import CacheControl from './forms/CacheControl';

const AppClient = parent => class Client extends use(parent) {
  constructor(params) {
    super(params);

    this.forms = {
      ...this.forms,
      CacheControl,
    };
    this.makeApiLinks({ entities: ['CacheControl'] });
    this.memory = [];
  }

  afterInit() {
    if (super.afterInit) super.afterInit();
    if (this.cacheCollectMode) {
      this.menu.push({
        form: 'CacheControl',
        title: 'Cache control',
      });
    }
  }

  async request(url, params) {
    const response = await super.request(url, params);
    const uri = url.replace(this.baseUrl, '');
    if (uri === '/CacheControl/save') return;
    const { body } = params;
    const auth = this.authorization;
    const memItem = this.memory.find(item => item.uri === uri
      && item.body === body && item.auth === auth);
    if (memItem) {
      memItem.response = response;
    } else {
      this.memory.push({
        uri,
        body,
        auth,
        response,
      });
    }
    return response;
  }
};
AppClient.package = packageName;
export default AppClient;

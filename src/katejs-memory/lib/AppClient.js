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
    // set same device for all to proceed auth
    window.localStorage.setItem('katejs-user-device', 'device-12345');
  }

  afterInit() {
    if (super.afterInit) super.afterInit();
    if (this.memoryCollectMode) {
      this.menu.push({
        form: 'CacheControl',
        title: 'Cache control',
      });
    }
  }

  async request(url, params) {
    const uri = url.replace(this.baseUrl, '');
    const body = JSON.stringify(params.body);
    const auth = this.authorization;
    const memItem = this.memory.find(item => item.uri === uri
      && item.body === body && item.auth === auth);
    
    let response;
    if (this.memoryCollectMode) {
      response = await super.request(url, params);
      if (uri === '/CacheControl/save') return response;
      if (memItem) {
        memItem.response = response;
      } else {
        this.memory.push({
          uri,
          body,
          auth,
          response,
        });
        // eslint-disable-next-line no-console
        console.log(`Added to cache (${this.memory.length})`);
      }
    } else if (memItem) {
      // return saved data
      // eslint-disable-next-line prefer-destructuring
      response = memItem.response;
    } else {
      response = { error: { message: 'No data' } };
    }
    return response;
  }
};
AppClient.package = packageName;
export default AppClient;

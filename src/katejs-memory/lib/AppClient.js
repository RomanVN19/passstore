import { use } from 'katejs/lib/client';

import CacheControl from './forms/CacheControl';

const AppClient = parent => class Client extends use(parent) {
  constructor(params) {
    super(params);

    this.forms = {
      ...this.forms,
      CacheControl,
    };
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

  async request(...args) {
    const response = await super.request(...args)
    console.log(...args);
    console.log(this.authorization);
    console.log(response);
    return response;
  }
};
AppClient.package = 'katejs-cache';
export default AppClient;

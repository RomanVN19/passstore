import { use } from 'katejs/lib/client';
import { AppUser } from 'katejs-modules/lib/client';

import { structures, title, packageName } from './structure';
import env from './front.env.json';

const AppClient = parent => class Client extends use(parent, AppUser) {
  static title = title;

  constructor(params) {
    super(params);
    this.baseUrl = env.apiUrl || '/api';

    this.init({ structures, addToMenu: true });

    this.forms = {
      ...this.forms,
    };

    this.saveAuth = true;
    this.menu.forEach((menuItem) => {
      if (this.forms[menuItem.form].entity) {
        // eslint-disable-next-line no-param-reassign
        menuItem.rule = {
          entity: this.forms[menuItem.form].entity,
          method: 'put',
        };
      }
    });
  }
};
AppClient.package = packageName;
export default AppClient;

import { use } from 'katejs/lib/client';
import { AppUser } from 'katejs-modules/lib/client';

import AccountList from './forms/AccountList';

import { structures, title, packageName } from './structure';
import env from './front.env.json';
import icons from './icons';

const AppClient = parent => class Client extends use(parent, AppUser) {
  static title = title;

  constructor(params) {
    super(params);
    this.baseUrl = env.apiUrl || '/api';

    this.init({ structures, addToMenu: true });

    this.forms = {
      ...this.forms,
      AccountList: AccountList(this.forms.AccountList),
    };

    this.saveAuth = true;
    this.menu.forEach((menuItem) => {
      if (this.forms[menuItem.form].entity && this.forms[menuItem.form].entity !== 'Account') {
        // eslint-disable-next-line no-param-reassign
        menuItem.rule = {
          entity: this.forms[menuItem.form].entity,
          method: 'put',
        };
      }
      if (icons[menuItem.form]) {
        // eslint-disable-next-line no-param-reassign
        menuItem.icon = icons[menuItem.form];
      }
    });

    // Admin <- Role.put
    // PM <- Project.put
    // User <- !Account.put
  }
};
AppClient.package = packageName;
export default AppClient;

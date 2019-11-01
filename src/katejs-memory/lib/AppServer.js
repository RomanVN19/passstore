import { makeEntitiesFromStructures, use } from 'katejs';
import { AppUser } from 'katejs-modules';
import { structures, title, packageName } from './structure';
import Project from './entities/Project';
import Account from './entities/Account';

const AppServer = parent => class Server extends use(parent, AppUser) {
  static title = title;

  constructor(params) {
    super(params);
    makeEntitiesFromStructures(this.entities, structures);
    this.entities = {
      ...this.entities,
      Project: Project(this.entities.Project),
      Account: Account(this.entities.Account),
    };

    this.setAuthParams({ jwtSecret: this.env.jwtSecret || 'default' });
  }
};
AppServer.package = packageName;
export default AppServer;

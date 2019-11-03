
export default Entity => class Account extends Entity {
  async query(args) {
    if (this.app.allow(args, 'Role', 'put')) { // admin
      return super.query(args);
    }
    const where = args.data.where || {};
    if (!where.projectUuid) return { response: [] };

    const { response: project } = await this.app.Project.get({ data: { uuid: where.projectUuid } });
    const roles = project.users
      .filter(row => row.userUuid === args.ctx.state.user.uuid)
      .map(row => row.role.uuid);
    where['$availableFor.roleUuid$'] = { $in: roles };
    // eslint-disable-next-line no-param-reassign
    args.data.where = where;
    return super.query(args);
  }

  async get(args) {
    const { response: item } = await super.get(args);
    if (this.app.allow(args, 'Role', 'put')) { // admin
      return item;
    }

    const { response: project } = await this.app.Project.get({ data: { uuid: item.project.uuid } });
    const userRoles = project.users
      .filter(row => row.userUuid === args.ctx.state.user.uuid)
      .map(row => row.role.uuid);
    const allowed = item.availableFor
      .find(row => userRoles.indexOf(row.role && row.role.uuid) > -1);

    if (!allowed) {
      return { error: { message: 'Forbidden', status: 403 } };
    }
    return { response: item };
  }
};

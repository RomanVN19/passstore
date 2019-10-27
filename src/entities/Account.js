
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
};


export default Entity => class Project extends Entity {
  async query(args) {
    if (!this.app.allow(args, 'Role', 'put')) {
      const where = args.data.where || {};
      where['$users.userUuid$'] = args.ctx.state.user.uuid;
      // eslint-disable-next-line no-param-reassign
      args.data.where = where;
    }
    return super.query(args);
  }
}
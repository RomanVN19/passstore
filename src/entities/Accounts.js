
export default Entity => class Account extends Entity {
  async query(args) {
    if (!this.app.allow(args, 'Role', 'put')) { // no admin
      const where = args.data.where || {};
      if (!where.projectUuid) return { response: [] };
    }
    return super.query(args);
  }
}
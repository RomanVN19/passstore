
export default Form => class AccountItem extends Form {
  constructor(args) {
    super(args);

    this.elements.get('project').value = this.app.currentProject;
  }
};

import { Elements, getElement } from 'katejs/lib/client';
import Fields from 'katejs/lib/fields';

export default Form => class AccountList extends Form {
  constructor(args) {
    super(args);
    this.actions[0].disabled = !this.app.allow('Account', 'put');
    this.elements.unshift({
      type: Elements.GRID,
      elements: [
        {
          type: Elements.LABEL,
          title: 'Select project:',
          style: { textAlign: 'right', marginTop: '30px' },
        },
        {
          ...getElement({ name: 'project', type: Fields.REFERENCE, entity: 'Project' }, this),
          onChange: () => this.projectChange(),
        },
      ],
    });
  }

  projectChange() {
    this.filters = {};
    const project = this.content.project.value;
    this.filters.projectUuid = project.uuid;
    // to use in edit form
    this.app.currentProject = project;
    this.load();
  }
};

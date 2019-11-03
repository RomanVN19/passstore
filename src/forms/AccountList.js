import { Elements, getElement } from 'katejs/lib/client';
import Fields from 'katejs/lib/fields';

export default Form => class AccountList extends Form {
  constructor(args) {
    super(args);
    this.actions[0].disabled = true;
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
          onChange: val => this.projectChange(val),
        },
      ],
    });
    if (this.app.currentProject) {
      this.filters = { projectUuid: this.app.currentProject.uuid };
      this.elements.get('project').value = this.app.currentProject;
      this.actions[0].disabled = false;
    }
  }

  projectChange(project) {
    this.filters = { projectUuid: project && project.uuid };
    if (!project) this.filters = {};
    this.content.__Add.disabled = !project || !this.app.allow('Account', 'put');
    // to use in edit form
    this.app.currentProject = project;
    this.load();
  }
};

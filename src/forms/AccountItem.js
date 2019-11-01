import { Elements } from 'katejs/lib/client';

export default Form => class AccountItem extends Form {
  constructor(args) {
    super(args);

    this.elements.get('project').value = this.app.currentProject;
    if (!this.app.allow('Account', 'put')) {
      // user can only view
      this.actions.forEach((action, index) => {
        if (index === this.actions.length - 1) return;
        // eslint-disable-next-line no-param-reassign
        action.hidden = true;
      });
      // value will be set by id
      this.elements = [
        {
          type: Elements.LABEL,
          tag: 'h3',
          id: 'title',
        },
        {
          type: Elements.LABEL,
          id: 'description',
        },
        {
          type: Elements.GRID,
          elements: [
            {
              type: Elements.LABEL,
              title: 'Uri',
            },
            {
              type: Elements.LABEL,
              id: 'uri',
            },
          ],
        },
        {
          type: Elements.GRID,
          elements: [
            {
              type: Elements.LABEL,
              title: 'Login',
            },
            {
              type: Elements.LABEL,
              id: 'login',
            },
          ],
        },
        {
          type: Elements.GRID,
          elements: [
            {
              type: Elements.LABEL,
              title: 'Password',
            },
            {
              type: Elements.LABEL,
              id: 'password',
            },
          ],
        },
      ];
    }
  }
};

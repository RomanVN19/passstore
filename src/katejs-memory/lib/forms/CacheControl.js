import { Form, Elements } from 'katejs/lib/client';

export default class CacheControl extends Form {
  title = 'Cache control';

  constructor(args) {
    super(args);
    this.elements = [
      {
        type: Elements.BUTTON,
        title: 'Save cache',
        onClick: this.save,
      },
    ];
  }

  save = () => {
    this.app.CacheControl.save(this.app.memory);
  }
}

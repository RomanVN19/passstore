import { Form, Elements } from 'katejs/lib/client';

export default class CacheControl extends Form {
  constructor(args) {
    super(args);
    this.elements = [
      {
        type: Elements.LABEL,
        title: 'Cache control',
      },
    ];
  }
}

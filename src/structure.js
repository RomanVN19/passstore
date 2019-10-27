import Fields from 'katejs/lib/fields';

const ProjectRole = {
  fields: [
    {
      name: 'title',
      type: Fields.STRING,
    },
  ],
};

const Project = {
  fields: [
    {
      name: 'title',
      type: Fields.STRING,
    },
  ],
  tables: [
    {
      name: 'users',
      fields: [
        {
          name: 'user',
          type: Fields.REFERENCE,
          entity: 'User',
        },
        {
          name: 'role',
          type: Fields.REFERENCE,
          entity: 'ProjectRole',
        },
      ],
    },
  ],
};

const Account = {
  fields: [
    {
      name: 'title',
      type: Fields.STRING,
    },
    {
      name: 'project',
      type: Fields.REFERENCE,
      entity: 'Project',
    },
    {
      name: 'description',
      type: Fields.STRING,
    },
    {
      name: 'url',
      type: Fields.STRING,
    },
    {
      name: 'login',
      type: Fields.STRING,
    },
    {
      name: 'password',
      type: Fields.STRING,
    },
  ],
  tables: [
    {
      name: 'availableFor',
      fields: [
        {
          name: 'role',
          type: Fields.REFERENCE,
          entity: 'ProjectRole',
        },
      ],
    },
  ],
};


export const title = 'Passstore';
export const packageName = 'passstore_app';
export const structures = {
  ProjectRole,
  Project,
  Account,
};

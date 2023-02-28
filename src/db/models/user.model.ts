import BaseModel from './base.model';

export default class UserModel extends BaseModel {
  static tableName = 'users';

  static get relationMappings() {
    return {
      pets: {
        modelClass: BaseModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: 'users.id',
          to: 'pets.ownerId',
        },
      },
    };
  }
}

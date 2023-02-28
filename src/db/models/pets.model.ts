import BaseModel from './base.model';
import UserModel from './user.model';

export default class PetsModel extends BaseModel {
  static tableName = 'pets';

  static get relationMappings() {
    return {
      owner: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: 'pets.ownerId',
          to: 'users.id',
        },
      },
    };
  }
}

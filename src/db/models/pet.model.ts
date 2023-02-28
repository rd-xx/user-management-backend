import BaseModel from './base.model';
import UserModel from './user.model';

export default class PetModel extends BaseModel {
  static tableName = 'pets';

  static get relationMappings() {
    return {
      owner: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: 'pets.userId',
          to: 'users.id',
        },
      },
    };
  }
}

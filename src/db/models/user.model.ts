import BaseModel from './base.model';
import PetModel from './pet.model';

export default class UserModel extends BaseModel {
  static tableName = 'users';

  static get relationMappings() {
    return {
      pets: {
        modelClass: PetModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: 'users.id',
          to: 'pets.userId',
        },
      },
    };
  }
}

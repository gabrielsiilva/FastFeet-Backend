import Sequelize, { Model } from 'sequelize';

export default class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.JSON({
          street: Sequelize.STRING,
          number: Sequelize.INTEGER,
          complement: Sequelize.STRING,
          state: Sequelize.STRING,
          city: Sequelize.STRING,
          zip_code: Sequelize.STRING,
        }),
      },
      {
        sequelize,
      }
    );
  }
}

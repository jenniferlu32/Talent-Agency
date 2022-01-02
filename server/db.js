const { Sequelize, Model, STRING } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/talent_agency', { logging: false });

class Client extends Model{};
Client.init({
  name: {
    type: STRING,
  },
}, { sequelize: db, modelName: 'clients', timestamps: false });

class Skill extends Model{};
Skill.init({
  name: {
    type: STRING,
  }
}, { sequelize: db, modelName: 'skills', timestamps: false });

class ClientSkill extends Model{};
ClientSkill.init({}, { sequelize: db, modelName: 'clientSkills', timestamps: false });

Client.belongsToMany(Skill, { through: ClientSkill });
Skill.belongsToMany(Client, { through: ClientSkill });
Client.hasMany(ClientSkill);

const syncAndSeed = async() => {
  try {

    await db.sync({ force: true });

    const [ moe, larry, curly, lucy, ethyl ] = await Promise.all([
      'moe', 'larry', 'curly', 'lucy', 'ethyl'
    ].map(name => Client.create({ name })));

    const [ singing, dancing, acting, juggling, plateSpinning, longDivision ] = await Promise.all([
      'singing', 'dancing', 'acting', 'juggling', 'plate-spinning', 'long division'
    ].map(name => Skill.create({ name })));

    await Promise.all([
    { clientId: moe.id, skillId: singing.id },
    { clientId: larry.id, skillId: dancing.id },
    { clientId: larry.id, skillId: juggling.id },
    { clientId: lucy.id, skillId: juggling.id },
    { clientId: ethyl.id, skillId: plateSpinning.id },
    { clientId: ethyl.id, skillId: acting.id }
  ].map(clientSkill => ClientSkill.create(clientSkill)));

  } catch(err) {
    console.log(err);
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: { Client, Skill, ClientSkill }
}

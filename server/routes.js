const express = require('express');
const { models: { Client, Skill, ClientSkill } } = require('./db');

const router = express.Router();

router.get('/skills', async(req, res, next) => {
  try {
    const skills = await Skill.findAll();
    res.send(skills);
  } catch(err) {
    next(err);
  };
});

router.get('/clients', async(req, res, next) => {
  try {
    const clients = await Client.findAll({
      include: [
        { model: ClientSkill }
      ]
    });
    res.send(clients);
  } catch(err) {
    next(err);
  };
});

router.get('/clientskills', async(req, res, next) => {
  try {
    const clientskills = await ClientSkill.findAll();
    res.send(clientskills);
  } catch(err) {
    next(err);
  };
});

module.exports = router;

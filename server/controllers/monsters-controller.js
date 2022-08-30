const { monstersService } = require('../services')
const { validationResult } = require('express-validator')
const { fetchMonsters, fetchMonsterById, createMonster, modifyMonster, removeMonster } = monstersService

const getAllMonsters = async (req, res, next) => {
      const monsters = await fetchMonsters()
      res.status(200).json(monsters)
      next()
  }

const getMonsterById = async (req, res, next) => {
  const { id } = req.params
    const monster = await fetchMonsterById(id)
    res.status(200).json(monster)
    next()
}

const postMonster = async (req, res, next) => {
  //Reject if validation fails
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  
  const { name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two } = req.body
  const monster = {
    name,
    description,
    type,
    danger_level,
    powers,
    weaknesses,
    image_url_one,
    image_url_two
  }
    await createMonster(monster)
    res.sendStatus(201)
    next()
}

//putMonster can update all info except id
const putMonster = async (req, res, next) => {
  //Reject if validation fails
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  
  const { id } = req.params
  const { name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two } = req.body
  const monster = {
    id,
    name,
    description,
    type,
    danger_level,
    powers,
    weaknesses,
    image_url_one,
    image_url_two
  }
    await modifyMonster(monster)
    res.sendStatus(200)
    next()
}

const deleteMonster = async (req, res, next) => {
  const { id } = req.params
    const deleted = await removeMonster(id)
    res.status(200).json(deleted)
    next()
}

module.exports = {
    getAllMonsters,
    getMonsterById,
    postMonster,
    putMonster,
    deleteMonster
}
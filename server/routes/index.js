const express = require('express')
const passport = require('passport')
const Router = require('express-promise-router')
const { monsters} = require('../controllers')
const { validateGetMonsters, validatePostMonster, validatePutMonster, validateDeleteMonster } = require('./validation')

const router = new Router()

router

    .get('/monsters', monsters.getAllMonsters)
    .get('/monsters/:id', validateGetMonsters, monsters.getMonsterById)
    .post('/monsters', validatePostMonster, passport.authenticate('jwt-admin', {session: false}), monsters.postMonster)
    .put('/monsters/:id', validatePutMonster, passport.authenticate('jwt-admin', {session: false}), monsters.putMonster)
    .delete('/monsters/:id', validateDeleteMonster, passport.authenticate('jwt-admin', {session: false}), monsters.deleteMonster)

module.exports = router
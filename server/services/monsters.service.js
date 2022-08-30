const { fetchMonstersDb, fetchMonsterByIdDb, createMonsterDb, modifyMonsterDb, removeMonsterDb } = require('../db')

const fetchMonsters = async () => {
    return await fetchMonstersDb()
}

const fetchMonsterById = async (id) => {
    return await fetchMonsterByIdDb(id)
}

const createMonster = async (monster) => {
    return await createMonsterDb(monster)
}

const modifyMonster = async (id) => {
    return await modifyMonsterDb(id)
}

const removeMonster = async (id) => {
    return await removeMonsterDb(id)
}

module.exports = {
  fetchMonsters,
  fetchMonsterById,
  createMonster,
  modifyMonster,
  removeMonster
}
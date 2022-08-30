const {pool} = require('../config')

const fetchMonstersDb = async () => {
    const res = await pool.query('SELECT * FROM monsters')
    return res.rows
}
  
const fetchMonsterByIdDb = async (id) => {
    const res = await pool.query('SELECT * FROM monsters WHERE id = $1', [id])
    return res.rows
}

const createMonsterDb = async ({ name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two }) => {
  const text = `INSERT INTO monsters(name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two)
                VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
  const values = [name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two]

    const res = await pool.query(text, values)
    return res.rows
}

const modifyMonsterDb = async ({ id, name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two }) => {
  const text = `UPDATE monsters SET name=$2, description=$3, type=$4, danger_level=$5, powers=$6, weaknesses=$7, image_url_one=$8, image_url_two=$9
    WHERE id = $1 RETURNING *`
  const values = [id, name, description, type, danger_level, powers, weaknesses, image_url_one, image_url_two]

    const res = await pool.query(text, values)
    return res.rows
}

const removeMonsterDb = async (id) => {
    const res = await pool.query('DELETE FROM monsters WHERE id = $1', [id])
    return res.rows
}

  module.exports = {
    fetchMonstersDb, fetchMonsterByIdDb, createMonsterDb, modifyMonsterDb, removeMonsterDb
  }
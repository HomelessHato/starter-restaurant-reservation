const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(tableId) {
  return knex("tables").where({ table_id: tableId }).then((record) => record[0]);
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function update(updatedTable){
  return knex("tables")
  .select("*")
  .where({table_id: updatedTable.table_id})
  .update(updatedTable, "*")
  .then((records) => records[0])
}
module.exports = {
  list,
  create,
  update, 
  read
};

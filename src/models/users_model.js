const users = require('./db/users_db.js')

module.exports = {
  create : (user) =>
    users.create(user),

  getAll : () =>
    users.getAll(),

  getBy : (property, value) =>
    users.getBy(property, value),

  update : (user) =>
    users.update(user),

  destroy : (id) =>
    users.destroy(id),

  doesExistBy : (property, value) => {
    return users.getBy(property, value)
    .then(results => {
      return results.length !== 0
    })
  }

}

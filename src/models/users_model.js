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
  },

  addToCart: (user_id, book_id) =>
    users.addToCart(user_id, book_id),

  getCart: (user_id) =>
    users.getCart(user_id),

  removeFromCart: (user_id, book_id) =>
    users.removeFromCart(user_id, book_id),


}

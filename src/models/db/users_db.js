const { query } = require('./client.js')

module.exports = {
  /**
    CREATE
    */

  create: (user) =>
    query(`INSERT INTO
            users (username, email, encrypted_password, role)
          VALUES  ($1, $2, $3, $4)
          RETURNING *`, [user.username, user.email, user.password, user.role]),

  /**
    READ
   */

  getAll: () =>
   query(`SELECT * FROM users`),


  getBy: (property, value) => {
    if (!property || !value)
      throw new Error('At users#getBy: Did not receive an arg.'+property+value)

    return query(`SELECT * FROM users WHERE ${property} = $1`,[value])
    },

  /**
    UPDATE
   */

  update: (user) => {
    const { id, name, email, encrypted_password, role } = user
    return query(`UPDATE users
      SET username = $1, email = $2, encrypted_password = $3, role = $4
      WHERE id = $5  RETURNING *`,[name, email, encrypted_password, role, id])
  },

  /**
    DESTROY
   */

  destroy: (id) =>
    query(`DELETE FROM users WHERE id=$1`, [id]),

  /**
    CART
   */

  addToCart: (user_id, book_id) =>
    query('INSERT INTO cart (user_id, book_id) VALUES ($1,$2)',[user_id, book_id]),

  getCart: (user_id) =>
    query(`SELECT cart.book_id, books.title, books.price
            FROM cart JOIN books ON cart.book_id=books.id
            WHERE cart.user_id = $1`,[user_id]),

  removeFromCart: (user_id, book_id) =>
    query('DELETE FROM cart WHERE id = (SELECT id FROM cart WHERE user_id = $1 AND book_id = $2 LIMIT 1)', [user_id, book_id])


}

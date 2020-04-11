let sqlMap = {
  article:{
    insert:'INSERT INTO blogcasual(username, title,content) VALUES (?,?,?)',
    insertdraft:'INSERT INTO casualdraftbox(username, title,content) VALUES (?,?,?)',
    selectdraft:'select * from casualdraftbox',
    deletedraft:'DELETE FROM casualdraftbox WHERE id = ?',
    updatedraft:'UPDATE casualdraftbox SET title=?,content=? WHERE id = ?',
  },
  user:{
    queryUsername:'SELECT * FROM users WHERE userName = ?',
  }
}
module.exports = sqlMap

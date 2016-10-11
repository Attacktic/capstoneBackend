var knex = require('../db/knex');

module.exports = {
  appSetUp: function(user_data){
    return knex('users').where('email', user_data.email).update({name:user_data.full_name, pass:user_data.password})
  },
  rpiSetUp: function(user_data){
    return knex.raw(`insert into users (key, email, phone) values('${user_data.key}', '${user_data.email}', $${user_data.phone})`)
  },
  emailLookUp: function(email){
    return knex('users').where('email', email);
  },
  addCamera: function(user_data){
    return knex.raw(`insert into cameras values('${user_data.camkey}', ${user_data.user_id})`)
  },
  getCameras: function(user_id){
    return knex('cameras').where(user_id, user_id)
  }
};

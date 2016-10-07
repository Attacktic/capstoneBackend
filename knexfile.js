require('dotenv').config();
module.exports = {
      development: {
        client: 'pg',
        connection: 'postgres://localhost/temprp'
      },
      production:{
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
      }
}

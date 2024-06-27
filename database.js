// rollcall 

import postgres from 'postgres';
// 
const sql = postgres('postgres://username:password@host,:port/database', {
  host                 : '127.0.0.1',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : 'postgres',            // Name of database to connect to
  username             : 'postgres',            // Username of database user
  password             : 'postgres',            // Password of database user
});

export default sql;
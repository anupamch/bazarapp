import connection from '../bin/db/connection';
export default class Controller{
      db(){
          return connection;
     }
}
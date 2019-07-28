import connection from '../bin/db/models';
export default class Controller{
     get db(){
          return connection;
     }
}
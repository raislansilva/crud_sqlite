import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {}

  public getDB(){
    return this.sqlite.create({
      name:'products.db',
      location:'default',
    });
 
  }

  public createDatabase(){
    return this.getDB()
    .then((db:SQLiteObject) => {
        
      
    }).catch((e) => console.log(e));

  }

  private createTables(db: SQLiteObject){
      db.sqlBatch([
        ['CREATE TABLE IF NOT EXISTS categories(id integer primary key AUTOINCREMENT NOT NULL, name TEXT))'],
        ['CREATE TABLE IF NOT EXISTS products(id integer primary key AUTOINCREMENT NOT NULL,price REAL, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id)']

      ])
      .then(()=> console.log("Tabelas Criadas"))   
      .catch(e => console.error('Erro ao criar a tabela',e));
  }

  private insertDefaultItems(db: SQLiteObject){
     db.executeSql('select COUNT(id) as qtd from categories',)
     .then((data: any)=>{
        if(data.row.item(0).qtd == 0){
           db.sqlBatch([
            ['insert into categories (name) values (?)', ['Hambúrgueres']],
            ['insert into categories (name) values (?)', ['Bebidas']],
            ['insert into categories (name) values (?)', ['Sobremesas']]
           ])
           .then(()=> console.log("Dados inseridos com sucesso"));
        }

     })
     .catch(e => console.error("Erro ao consultar a qtd categorias",e));
  }


}



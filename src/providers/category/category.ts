import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { createNgModuleFactory } from '@angular/core/src/view';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(private dbprovider: DatabaseProvider) {}

  public getAll(){
    return this.dbprovider.getDB()
    .then((db: SQLiteObject)=>{
          
      return db.executeSql("SELECT * FROM categories",[])
      .then((data:any)=>{
         if(data.rows.length > 0){
           let categories: any[] = [];
           for(var i =0;i<data.rows.length;i++){
             var category  = data.rows.item(i);
             categories.push(category);

           }
           return categories;
         }else{
           return [];
         }
      })
      .catch(e => console.log(e))

    })
    .catch(e => console.log(e))

  }

}

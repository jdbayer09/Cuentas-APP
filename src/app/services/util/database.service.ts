import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { environment } from 'src/environments/environment';

const DB_NAME = environment.db_name;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  
  constructor() { 
    
  }

  async initializPlugin() {
    if ((await this.sqlite.checkConnectionsConsistency()).result) {
      this.db = await this.sqlite.retrieveConnection(
        DB_NAME,
        false
      );
    } else {
      this.db = await this.sqlite.createConnection(
        DB_NAME,
        false,
        'no-encryption',
        1,
        false
      );
    }
    await this.db.open();
    const schema = `
      create table if not exists categories
      (
          id INTEGER primary key autoincrement,
          name        TEXT not null,
          icon        TEXT NOT NULL,
          description TEXT,
          isRepeated  BOOLEAN NOT NULL,
          active      BOOLEAN not null,
          createdAt   datetime not null
      );
      
      create table if not exists payment_methods
      (
          id INTEGER primary key autoincrement,
          name        TEXT not null,
          icon        TEXT NOT NULL,
          description TEXT,
          active      BOOLEAN not null,
          createdAt   datetime not null
      );
      
      create table if not exists costs
      (
          id              INTEGER primary key autoincrement,
          name            TEXT not null,
          value           INTEGER NOT NULL,
          category        INTEGER NOT NULL references categories (id),
          paymentMethod   INTEGER NOT NULL references payment_methods (id),
          month           INTEGER NOT NULL,
          year            INTEGER NOT NULL,
          createdAt       datetime not null
      );
      
      create table if not exists payment_the_costs
      (
          id              INTEGER primary key autoincrement,
          value           INTEGER NOT NULL,
          costId          INTEGER NOT NULL references costs (id),
          createdAt       datetime not null
      );

      create table if not exists balances
      (
          id              INTEGER primary key autoincrement,
          name            TEXT not null,
          value           INTEGER NOT NULL,
          month           INTEGER NOT NULL,
          year            INTEGER NOT NULL,
          createdAt       datetime not null
      );
    `;
    await this.db.execute(schema);

    //await this.db.execute('DROP TABLE IF EXISTS categories;');
    //await this.db.execute('DROP TABLE IF EXISTS payment_methods;');
    //await this.db.execute('DROP TABLE IF EXISTS costs;');
    //await this.db.execute('DROP TABLE IF EXISTS payment_the_costs;');
    //await this.db.execute('DROP TABLE IF EXISTS balances;');
    //console.log(await this.db.getTableList());
  }

  executeQuery(query: string): Promise<any> {
    if (!this.db) return Promise.reject('Problemas con la base de datos.');
    return Promise.resolve(this.db.query(query));
  }
}

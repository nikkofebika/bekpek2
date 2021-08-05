import db from '../config/db';

export const deleteItem = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM items WHERE ID IN (8,9,10,11,12,13,14)`,
      [],
      (sqlTx, res) => {
        console.log('success delete items');
        console.log('res', res);
        console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error delete items');
        console.log('error', error.message);
      },
    );
  });
};

export const createTableItems = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))`,
      [],
      (sqlTx, res) => {
        console.log('success create table');
        console.log('res', res);
        console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT * FROM items',
        [],
        (fx, res) => {
          let len = res.rows.length;
          let results = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({id: item.id, name: item.name});
            }
          }
          resolve({success: true, data: results});
        },
        error => {
          console.log('error db getItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const insertAll = () => {
  const datalist = require('../../dataLists.json');
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      datalist.map(name => {
        console.log(name);
        fx.executeSql(
          'INSERT INTO items (name) VALUES (?)',
          [name],
          (fx, res) => {
            console.log('res insertAll', res);
            resolve(res);
          },
          error => {
            console.log('error db getItems', error.message);
            reject(error.message);
          },
        );
      });
    });
  });
};

export const dropTableItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'DROP TABLE items',
        [],
        (fx, res) => {
          console.log('dropTableItems', res);
          resolve(res);
        },
        error => {
          console.log('error db dropTableItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

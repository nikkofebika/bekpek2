import db from '../config/db';
import {getDateNow} from '../utils/general';

export const insertList = name => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO lists (name) VALUES (?)`,
        [name],
        (sqlTx, res) => {
          console.log('res', res);
          console.log(`${name} added successfully`);
          resolve({success: true, data: res});
        },
        error => {
          console.log('error db insert list', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const updateList = data => {
  let dateNow = getDateNow();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE lists SET name=?, updated=? WHERE id=?`,
        [data.name, dateNow, data.id],
        (sqlTx, res) => {
          console.log(`updateList updated successfully`);
          resolve({success: true, data: res});
        },
        error => {
          console.log('error db insert list', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const createTableList = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , updated DATETIME NULL DEFAULT NULL)`,
      [],
      (sqlTx, res) => {
        console.log('success create table');
        console.log('res', res.rows.item(0));
        console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const deleteList = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM lists WHERE id=?`,
        [id],
        (sqlTx, res) => {
          tx.executeSql('DELETE FROM list_items WHERE list_id=' + id);
          resolve({success: true});
        },
        error => {
          console.log('error db delete list');
          reject(error.message);
        },
      );
    });
  });
};
export const getAllList = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT lists.id, lists.created, lists.updated, lists.name as list_name, items.name as item_name FROM lists JOIN list_items li ON li.list_id=lists.id JOIN items ON items.id=li.item_id ORDER BY lists.id DESC`,
        [],
        (sqlTx, res) => {
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            let test = [];
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              // results = [{list_name: item.list_name}];
              // test[item.id] = {
              //   id: item.id,
              //   list_name: item.list_name,
              // }
              // test[item.id]['items'].push(item.item_name);
              // results.push(test);
              results.push(item);
            }
            // console.log('test', test);
            console.log('results', results);

            var o = {};
            var datas = results.reduce(function (r, el) {
              var e = el.id;
              if (!o[e]) {
                o[e] = {
                  id: el.id,
                  list_name: el.list_name,
                  created: el.created,
                  updated: el.updated,
                  items: [],
                };
                r.push(o[e]);
              }
              o[e].items.push(el.item_name);
              return r;
            }, []);

            // console.log('datas', datas);

            resolve(datas);
          }
        },
        error => {
          console.log('error db getAllList', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const getListById = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT lists.id, lists.name as list_name, items.name as item_name FROM lists JOIN list_items li ON li.list_id=lists.id JOIN items ON items.id=li.item_id WHERE lists.id=${id} ORDER BY lists.id DESC`,
        [],
        (sqlTx, res) => {
          let len = res.rows.length;
          console.log('res edit', res);
          console.log('len edit', len);
        },
        error => {
          console.log('error db getListById', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const dropTableLists = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'DROP TABLE lists',
        [],
        (fx, res) => {
          console.log('dropTableLists', res);
          resolve(res);
        },
        error => {
          console.log('error db dropTableLists', error.message);
          reject(error.message);
        },
      );
    });
  });
};

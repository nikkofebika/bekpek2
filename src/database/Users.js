import db from '../config/db';

export const createTableUsers = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), username VARCHAR(50), password VARCHAR(50))`,
      [],
      (sqlTx, res) => {
        // console.log('success create table users');
        // console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const dropTableUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'DROP TABLE users',
        [],
        (fx, res) => {
          console.log('dropTableUsers', res);
          resolve(res);
        },
        error => {
          console.log('error db dropTableUsers', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const insertUser = data => {
  // console.log('datata', data);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT id FROM users WHERE username = ?`,
        [data.username],
        (sqlTx, res) => {
          let len = res.rows.length;
          if (len > 0) {
            resolve({ success: false });
          } else {
            tx.executeSql(
              `INSERT INTO users (name,username,password) VALUES (?,?,?)`,
              [data.name, data.username, data.password],
              (sqlTx, res) => {
                console.log('res', res);
                console.log(`${data.name} added successfully`);
                resolve({ success: true, data: res });
              },
              error => {
                console.log('error db insertUser', error.message);
                reject(error.message);
              },
            );
          }
        },
        error => {
          console.log('error db getUser', error.message);
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
          resolve({ success: true, data: res });
        },
        error => {
          console.log('error db insert list', error.message);
          reject(error.message);
        },
      );
    });
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
          resolve({ success: true });
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

export const getUser = data => {
  // console.log('getUser', data);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [data.username, data.password],
        (sqlTx, res) => {
          let len = res.rows.length;
          const result =
            len > 0
              ? { success: true, data: res.rows.item(0) }
              : { success: false };
          resolve(result);
        },
        error => {
          console.log('error db getUser', error.message);
          reject(error.message);
        },
      );
    });
  });
};

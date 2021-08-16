import db from '../config/db';

export const createTableListItems = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS list_items (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, list_id INTEGER, item_id INTEGER, returned TINYINT(1) NOT NULL DEFAULT 0)`,
      [],
      (sqlTx, res) => {
        // console.log('success create table');
        // console.log('res', res);
        // console.log('sqlTx', sqlTx);
        a;
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const getAllListItems = userId => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT * FROM list_items WHERE user_id = ?',
        [userId],
        (fx, res) => {
          let len = res.rows.length;
          let results = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({
                id: item.id,
                list_id: item.list_id,
                item_id: item.item_id,
              });
            }
          }
          console.log('res getAllListItems', results);
          resolve({ success: true, data: results });
        },
        error => {
          console.log('error db getItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const getListItemByListId = listId => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT list_items.id, items.id as item_id, items.name, list_items.returned FROM list_items JOIN items ON items.id=list_items.item_id WHERE list_id = ?',
        [listId],
        (fx, res) => {
          let len = res.rows.length;
          let results = [];
          let total_returned = 0;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              item.returned === 1 && total_returned++;
              results.push({
                id: item.id,
                item_id: item.item_id,
                name: item.name,
                returned: item.returned,
              });
            }
          }
          resolve({ success: true, data: results, returned: total_returned });
        },
        error => {
          console.log('error db getItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const insertListItems = data => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      data.items.map(item => {
        fx.executeSql(
          'INSERT INTO list_items (user_id, list_id, item_id) VALUES (?,?,?)',
          [data.userId, data.listId, item],
          (fx, res) => {
            console.log('id item', item);
            console.log('res insertListItems', res);
            resolve(res);
          },
          error => {
            console.log('error db insertListItems', error.message);
            reject(error.message);
          },
        );
      });
    });
  });
};
export const updateListItems = data => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql('DELETE FROM list_items WHERE list_id=' + data.listId);
      data.items.map(item => {
        fx.executeSql(
          'INSERT INTO list_items (user_id, list_id, item_id) VALUES (?,?,?)',
          [data.userId, data.listId, item],
          (fx, res) => {
            console.log('res insertListItems', res);
            resolve(res);
          },
          error => {
            console.log('error db insertListItems', error.message);
            reject(error.message);
          },
        );
      });
    });
  });
};
export const deleteListItemByItemId = id => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'DELETE FROM list_items WHERE item_id = ?',
        [id],
        (fx, res) => {
          console.log('res deleteListItemByItemId', res);
          resolve(res);
        },
        error => {
          console.log('error db deleteListItemByItemId', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const updateReturnListItems = (id, status) => {
  return new Promise((resolve, reject) => {
    console.log('idid', id);
    console.log('statusstatus', status);
    db.transaction(fx => {
      fx.executeSql(
        'UPDATE list_items SET returned = ? WHERE id = ?',
        [status, id],
        (fx, res) => {
          console.log('res updateReturnListItems', res);
          resolve({ success: true });
        },
        error => {
          console.log('error db insertListItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const dropTableListItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'DROP TABLE list_items',
        [],
        (fx, res) => {
          console.log('dropTableListItems', res);
          resolve(res);
        },
        error => {
          console.log('error db dropTableListItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

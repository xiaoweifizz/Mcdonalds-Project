const mongodb = require('mongodb');

let MongodbClient = mongodb.MongoClient;

const DB_CONN_STR = 'mongodb://localhost:27017';

const DB_NAME = 'xiaowei';

/**
 * 操作数据库--插入
 * 
 * @param {String} collectionName  集合名
 * @param {Object,Array} data 插入的一条或多条数据
 * @param {Function} callback 回调函数, 接收一个结果参数
 */
function insert(obj) {
    let { collectionName, data, callback } = obj;
    MongodbClient.connect(DB_CONN_STR, (err, client) => {
        if (err) {
            console.log('连接数据库失败');
            return;
        }
        let db = client.db(DB_NAME);
        if (data && data.length) {
            db.collection(collectionName).insertMany(data, (err, result) => {
                callback(err, result);
                client.close();
            });
        } else {
            db.collection(collectionName).insertOne(data, (err, result) => {
                callback(err, result);
                client.close();
            });
        }

    })
}

/**
 * 操作数据库--查询
 * 传入对象, 对象属性如下
 * @param {String} collectionName  集合名
 * @param {Object} condition 查询条件
 * @param {Function} callback 回调函数, 接收一个结果参数
 * @param {[Number]} limit 查询数据数量
 * @param {[Number]} skip 开始查询的索引值
 * @param {[Object]} sort 排序条件
 */
function find(obj) {
    let { collectionName, condition, callback, limit, skip, sort } = obj
    MongodbClient.connect(DB_CONN_STR, (err, client) => {
        if (err) {
            console.log('连接数据库失败');
            return;
        }
        let db = client.db(DB_NAME);
        let temp = db.collection(collectionName).find(condition);
        if (limit !== undefined) {
            temp = temp.limit(limit);
            if (skip !== undefined) {
                temp = temp.skip(skip);
            }
        }
        if (sort !== undefined) {
            temp = temp.sort(sort);
        }
        temp.toArray((err, result) => {
            callback(err, result);
            client.close();
        });

    })
}

/**
 * 操作数据库--更新
 * 
 * @param {String} collectionName  集合名
 * @param {Object} condition  条件
 * @param {Object} data 插入的一条或多条数据
 * @param {Function} callback 回调函数, 接收一个结果参数
 */
function updata(obj) {
    let { collectionName, condition, data, callback } = obj;
    MongodbClient.connect(DB_CONN_STR, (err, client) => {
        if (err) {
            console.log('连接数据库失败');
            return;
        }
        let db = client.db(DB_NAME);
        db.collection(collectionName).update(condition, data, (err, result) => {
            callback(err, result);
            client.close();
        });
    })
}


/**
 * 操作数据库--删除
 * 
 * @param {String} collectionName  集合名
 * @param {Object} condition  条件
 * @param {Function} callback 回调函数, 接收一个结果参数
 */
function remove(obj) {
    let { collectionName, condition, callback } = obj;
    MongodbClient.connect(DB_CONN_STR, (err, client) => {
        if (err) {
            console.log('连接数据库失败');
            return;
        }
        let db = client.db(DB_NAME);
        db.collection(collectionName).remove(condition, (err, result) => {
            callback(err, result);
            client.close();
        });
    })
}

module.exports = { insert, find, updata, remove };
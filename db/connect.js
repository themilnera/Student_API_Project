const dotenv = require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

let _db;

//initialize the db object _db
const initDb = (callback) =>{
    if(_db){
        console.log("Db is already initialized");
        return callback(null); //exits early if db is already initialized
        //was return callback(null, _db);  
        //but since I'm not using _db anyway...

        //you could also use if/else here and not "return"
        //we just don't want to execute the next part unnecessarily
    }
    //MongoClient.connect returns a promise
    MongoClient.connect(process.env.MONGO_URI)
        //so you can use .then and .catch
        .then((client) =>{
            _db = client;
            callback(null);
            //callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
    //promises are inherently async
}; 
//this callback COULD be replaced with async():
// const initDb = async () => {
//     if (_db) {
//         console.log("Db is already initialized");
//         return; // Early exit if the database is already initialized
//     }
//     try {
//         _db = await MongoClient.connect(process.env.MONGO_URI);
//         console.log("Database successfully initialized");
//     } catch (err) {
//         throw new Error(`Database initialization failed: ${err.message}`);
//     }
// };


//using a getter function is a safeguard 
//so that we can only get db object after it's initialized
const getDb = () => {
    if (!_db){
        throw Error("Db not initialized");
    }
    return _db;
};

//export these functions
module.exports = {
    initDb, getDb,
};
const express = require("express");
const cors = require("cors");
const mongodb = require("./db/connect");
const app = express();
const PORT = 3000;

app.use(cors()).use("/", require("./routes"));

//initialize db, callback() called with just the first parameter
//because we're not getting the db object without using getDb()
mongodb.initDb((err) => {
  //if the first (error) parameter of callback() is anything but null
  if(err){
    console.log(err);
  }
  else{
    app.listen(PORT);
    console.log("\x1b[34m%s\x1b[0m", `Connected to DB, listening on ${PORT}`);
  }
});
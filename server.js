const express = require("express");
const cors = require("cors");
const mongodb = require("./db/connect");
const app = express();
const PORT = 3000;
const helmet = require('helmet');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Allow resources from your domain
        imgSrc: ["'self'"], // Allow images from your domain
        scriptSrc: ["'self'"], // Allow scripts from your domain
        styleSrc: ["'self'"], // Allow styles from your domain
      },
    },
  })
);

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
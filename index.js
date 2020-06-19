const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const cors = require('@koa/cors');

app.use(koaBody());
app.use(router.routes());


// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "chats";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertDocuments = function (db, data) {
  const collection = db.collection("msgs");
  // Insert some documents
  collection.insertOne(data, function (err, result) {
    console.log("Inserted success");
  });
};

const findDocuments = function (db) {
  const collection = db.collection("msgs");
  // Find some documents
  return collection.find({}).toArray(function (err, docs) {
    console.log(docs);
    return docs;
  });
};

// Use connect method to connect to the server
client.connect(function (err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const data = {
    type: 2,
    content: "你好，我是蜘蛛侠",
    fromId: "zhizhuxia",
    toId: "me",
    id: 111,
  };

  router.get("/allmsgs", (ctx, next) => {
    ctx.body = findDocuments(db);
  });

  router.post("/addmsg", (ctx, next) => {
    const body = ctx.request.body;
    console.log('ctx.request.body',  ctx.request.body);

    insertDocuments(db, body);
  });
});




app.listen(1234);

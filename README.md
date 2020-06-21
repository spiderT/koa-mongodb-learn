# koa-mongodb-learn

## 1. mongodb 安装配置

### 1. 安装

1. 手动安装  

官网下载包 https://www.mongodb.com/try/download/community  

下载解压安装完后，可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中。  

export PATH=/usr/local/mongodb/bin:$PATH  

2. brew 安装

sudo brew install mongodb  

使用命令mongod -v来查看mongo DB是否安装成功。


### 2. 运行

创建一个数据库存储目录 /data/db  

sudo mkdir -p /data/db  这一步，在mac的catalina系统上会报错，mkdir: /data/db: Read-only file system  

解决方法：不要在根目录创建，随便选择一个目录，然后运行 mongod --dbpath ~/data/db  绑定目录


## 2. CRUD

### 2.1. Inserting Documents

```js
const insertDocuments = function (db, data) {
  const collection = db.collection("msgs");
  // Insert some documents
  collection.insertOne(data, function (err, result) {
    console.log("Inserted success");
  });
};



router.post("/addmsg", (ctx, next) => {
    const body = ctx.request.body;
    console.log('ctx.request.body',  ctx.request.body);

    insertDocuments(db, body);
  });


```

curl post 请求

```text
curl localhost:1234/addmsg -X POST -d '{"type": 2,"content": "你好","fromId": "me","toId": "zhizhuxia","id": 1234}'
```

### 2.2. 
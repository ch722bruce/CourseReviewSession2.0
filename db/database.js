import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "SessionDB";
  const USERS_COLLECTION = "users";
  const SESSIONS_COLLECTION = "sessions";

  console.log("database is running...");
  const connect = async () => {
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connect is running...");
    try {
      await client.connect();
      console.log("Successfully connected to DB: " + URI);
      
      const db = client.db(DB_NAME);
      const collections = await db.listCollections().toArray();
      console.log("Collections:", collections.map(coll => coll.name));
  
      return { client, db };
    } catch (err) {
      console.error("Failed to connect to the database:", err);
      // Explicitly return a rejected promise to ensure the caller handles it
      return Promise.reject(err);
    }
  };
  
  connect().then(connection => {
    if (connection) {
      const { client, db } = connection;
      if (db) {
        console.log(`Database ${DB_NAME} is connected successfully.`);
        client.close();
      }
    }
  }).catch(err => {
    console.error("Error during database connection:", err);
  });

  myDB.findUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      return await collection.findOne(user);
    } finally {
      client.close();
    }
  };

  myDB.deleteUser = async user => {

    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      console.log("NAME: ")
      console.log(user.username)
      await collection.deleteOne({ username: user.username });
    } finally {
      client.close();
    }

  myDB.addUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      await collection.insertOne(user);
    } finally {
      client.close();
    }
  };

  myDB.editUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      await collection.updateOne(
        { username: user.username },
        { $set: { major: user.major, tag: user.tag } },
      );

      // db.student.updateOne({name: "Annu"}, {$set:{age:25}})

      // await collection.insertOne(user);
    } finally {
      client.close();
    }
  };

  myDB.insertSessionEntry = async function (sessionEntry) {
    const { client, db } = await connect();
    const collection = db.collection(SESSIONS_COLLECTION);
    try {
      const result = await collection.insertOne(sessionEntry);
      return result;
    } finally {
      client.close();
    }
  };

  myDB.getSession = async function () {
    const { client, db } = await connect();
    const collection = db.collection(SESSIONS_COLLECTION);
    try {
      return await collection.find({}).toArray();
    } finally {
      client.close();
    }
  };

  myDB.updateSession = async function (id, sessionEntry) {
    const { client, db } = await connect();
    const collection = db.collection(SESSIONS_COLLECTION);
    try {
      return await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: sessionEntry },
        { returnOriginal: false }
      );
    } finally {
      client.close();
    }
  };

  myDB.deleteSession = async function (id) {
    const { client, db } = await connect();
    const collection = db.collection(SESSIONS_COLLECTION);
    try {
      return await collection.deleteOne({ _id: new ObjectId(id) });
    } finally {
      client.close();
    }
  };

  myDB.userJoinSession = async function (sessionID, userID) {
    const { client, db } = await connect();
    const collection = db.collection(SESSIONS_COLLECTION);
    try {
      return await collection.findOneAndUpdate(
        { _id: new ObjectId(sessionID) },
        { $addToSet: { participants: userID } },
        { returnOriginal: false }
      );
    } finally {
      client.close();
    }
  };

  myDB.userLeaveSession = async function (sessionID, userID) {
    const { client, db } = await connect();
    const collection = db.collection(SESSIONS_COLLECTION); 
    try {
      return await collection.findOneAndUpdate(
        { _id: new ObjectId(sessionID) },
        { $pull: { participants: userID } },
        { returnOriginal: false }
      );
    } finally {
      client.close();
    } 
  };

  return myDB;
}

export const myDB = MyMongoDB();

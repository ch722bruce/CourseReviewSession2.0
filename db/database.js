import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "SessionDB";
  const USERS_COLLECTION = "users";
  const SESSIONS_COLLECTION = "sessions";

  const connect = async () => {
    const client = new MongoClient(URI);
    console.log("Connecting to DB..." + URI);
    const db = client.db(DB_NAME);
    return { client, db };
  };

  // myDB.userExists = async (username) => {
  //   const { client, db } = await connect();
  //   const collection = db.collection(USERS_COLLECTION);
  //   try {
  //     const result = await collection.findOne(username);
  //     if (result == undefined) {
  //       return false;
  //     }
  //     return true;
  //   } finally {
  //     client.close();
  //   }
  // };

  myDB.findUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      return await collection.findOne(user);
    } finally {
      client.close();
    }
  };

  myDB.addUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      await collection.insertOne(user);
    } finally {
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyMongoDB();

import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  function connect() {
    const client = new MongoClient(uri);
    const db = client.db("SessionDB");
    return { client, db };
  }
  return myDB;
}

myDB.insertSessionEntry = async function (sessionEntry) {
  return await db.collection("sessions").insertOne(sessionEntry);
};

myDB.getSessions = async function () {
  return await db.collection("sessions").find({}).toArray();
};

myDB.getSession = async function (id) {
  return await db.collection("sessions").findOne({ _id: new ObjectId(id) });
};

myDB.updateSession = async function (id, sessionEntry) {
  return await db
    .collection("sessions")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: sessionEntry },
      { returnDocument: "after" }
    );
};

myDB.deleteSession = async function (id) {
  return await db.collection("sessions").deleteOne({ _id: new ObjectId(id) });
};

myDB.userJoinSession = async (sessionID, userID) => {
  return await db
    .collection("sessions")
    .findOneAndUpdate(
      { _id: new ObjectId(sessionID) },
      { $push: { members: userID } },
      { returnDocument: "after" }
    );
};

myDB.userLeaveSession = async (sessionID, userID) => {
  return await db
    .collection("sessions")
    .findOneAndUpdate(
      { _id: new ObjectId(sessionID) },
      { $pull: { members: userID } },
      { returnDocument: "after" }
    );
};

const myDB = MyMongoDB();

export default myDB;

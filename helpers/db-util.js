import { MongoClient } from 'mongodb'; 

export async function connectDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  return client;
}

export async function inserDocument(client, a_collection, document) {
  const db = client.db("events");
  const collection = db.collection(a_collection);
  const result = await collection.insertOne(document);
  return result;
}

export async function getAllDocuments(client, a_collection, sort) {
  const db = client.db("events");
  const collection = db.collection(a_collection);
  const documents = await collection.find().sort(sort).toArray();
  return documents;
}

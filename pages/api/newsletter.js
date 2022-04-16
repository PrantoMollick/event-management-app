import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return; 
    }

    const client = await MongoClient.connect('mongodb://localhost:27017/')
    const db = client.db('events')
    const collection = db.collection('newsletter');
    await collection.insertOne({ email: userEmail });
    client.close();
    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;

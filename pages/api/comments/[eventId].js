import { MongoClient } from 'mongodb'; 

async function handler(req, res) {
    const eventId = req.query.eventId;
    
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('events');
    const collection = db.collection('comments');

    if (req.method === 'POST') {
        const { email, name, text } = JSON.parse(req.body);
        if (
          !email.includes("@") ||
          !name ||
          name.trim() === "" ||
          !text ||
          text.trim() === ""
        ) {
            res.status(422).json({message: 'invalid input!'});
            return;
        }

        
        const newComment = {
            email, 
            name, 
            text,
            eventId
        };
        
        const result = await collection.insertOne({
            ...newComment
        })
        console.log(result);
        res.status(201).json({ message: 'Added Comment!', comment: newComment});
    }

    if (req.method === 'GET') {
        const documents = await collection.find().sort({_id: -1}).toArray();
        console.log(documents);
        res.status(200).json({ comments: documents });
    }
    client.close();
}

export default handler;
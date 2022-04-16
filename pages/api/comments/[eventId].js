import { MongoClient } from 'mongodb'; 

async function handler(req, res) {
    const eventId = req.query.eventId;
    
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('events');
    

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
        
        const collection = db.collection('comments');
        const result = await collection.insertOne({
            ...newComment
        })
        console.log(result);
        res.status(201).json({ message: 'Added Comment!', comment: newComment});
    }

    if (req.method === 'GET') {
        console.log('worked');
        const dummyList = [
          { id: 'c1', name: "pranto", text: "A first comment!" },
          { id: 'c2', name: "Mollick", text: "A second comment!" },
        ];

        res.status(200).json({ comments: dummyList });
    }
    client.close();
}

export default handler;
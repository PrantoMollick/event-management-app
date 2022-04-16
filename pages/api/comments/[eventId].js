
import {connectDatabase, inserDocument, getAllDocuments} from '../../../helpers/db-util';

async function handler(req, res) {
    const eventId = req.query.eventId;

    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed'});
        return;
    }

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
            client.close();
            return;
        }
        
        const newComment = {
            email, 
            name, 
            text,
            eventId
        };
        
        let result;
        try {
            result = await inserDocument(client, 'comments', newComment);
            newComment._id = result.inserteId;
            res.status(201).json({ message: 'Added Comment!', comment: newComment});
        } catch (error) {
            return res.status(500).json({ message: 'Inserting Comment Failed'});
        }
    }

    if (req.method === 'GET') {
        let documents;
        try {
            documents = await getAllDocuments(client, "comments", { _id: -1 });
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed!'});
            return;
        }
    }
    client.close();
}

export default handler;
import { excuteQuery } from '../../helpers/db';

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    console.log(userEmail);

    try {
      // "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37') ('"+userEmail+"')""
      let sql = `INSERT INTO newsletter (email) VALUES(?)`;
      const result = await excuteQuery(sql, [userEmail]);
      console.log( "ttt",result );

    } catch (error) {
      console.log(error);
      res.status(403).json({ error: "Error occured while creating news letter"})
    }


    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;

import db from '../../lib/db';

export default async function handler(req, res){
    if(req.method == 'POST'){
        const [name, email, password] = req.body;

    try{
        const query = 'INSERT INTO signup (name, email, password) VALUES(?,?,?)';
        const values = [name, email, password];
        const [result] = await db.execute(query, values);
        res.status(200).json({message: "data submitted successfully"});
    }
    catch(err){
            console.log(err);
            res.status(500).json({
                message:'There was an error occured while submitting the data'
            })
    }
}
    else {
        res.status(405).json({ message: 'Method not allowed' });  
      }
}

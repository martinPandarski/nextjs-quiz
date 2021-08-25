// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {MongoClient} from 'mongodb'

export default async function handler(req, res) {
  if(req.method === 'POST'){
    const data = req.body
    const client = await MongoClient.connect('mongodb+srv://marto65481:martok12@cluster0.4jhxq.mongodb.net/quiz?retryWrites=true&w=majority')

    const db = client.db();

    const quizCollection = db.collection('quiz');
    
    const result = await quizCollection.insertOne(data);
    client.close()

    res.status(201).json({message: 'inserted'})
  }
 
}

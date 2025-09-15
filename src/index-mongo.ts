import express from 'express'
import 'dotenv/config'
import {MongoClient} from 'mongodb'

async function startServer() {
const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB)



const app = express()
//explique o que esse middleware faz com que o express faça o perse do body da requisição para json 
app.use(express.json())

// criando uma rota para acesso pelo navegador
app.get('/produtos', async (_req, res) => {
   const produtos = await db.collection('produtos').find().toArray()
    res.json(produtos)
})

// Criando o servidor na porta 8000
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
}

startServer()
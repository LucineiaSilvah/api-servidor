import express from 'express'
import fs from 'fs'
import { readFileSync } from "fs"
import { config } from "dotenv";
import path from 'path'
config();
const app = express()
app.use(express.json())
const baseUrl = process.env.BASE_URL ?? "http://localhost";
const port = process.env.PORT ?? 3000;
const caminho = path.resolve(process.cwd(),'db.json')
const linha = readFileSync(caminho)
const dbJson = JSON.parse(linha.toString())
//users
const users = dbJson.users

app.get('/',(req,res)=>{
	return res.send("hello server")
})


app.get('/api/users',(req,res)=>{

	  return res.json(users)
})

app.post('/api/users', (req, res) => {
	const { nome,email,telefone } = req.body;

	if (!nome) {
			return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
	}
	if (!email) {
			return res.status(400).json({ error: "O campo 'email' é obrigatório." });
	}
	if (!telefone) {
			return res.status(400).json({ error: "O campo 'telefone' é obrigatório." });
	}

	const novoUsuario = { id: users.length + 1, nome,email,telefone };
	users.push(novoUsuario);
	dbJson.users = users;

	fs.writeFileSync(caminho, JSON.stringify(dbJson, null, 2));
	return res.status(201).json(novoUsuario);
});

app.listen(port,()=>{
	console.log(`servidor rodando ${baseUrl}:${port}\n `)

  
	
})

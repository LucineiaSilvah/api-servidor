import express from "express";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
const router = express.Router();

const caminho = path.resolve(process.cwd(), "db.json");
const linha = fs.readFileSync(caminho);
const dbJson = JSON.parse(linha.toString());

const users = dbJson.users;

router.get("/", (req, res) => {
  return res.send("hello server");
});

router.get("/api/users", (req, res) => {
  return res.json(users);
});

router.post("/api/users", (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
  }
  if (!email) {
    return res.status(400).json({ error: "O campo 'email' é obrigatório." });
  }
  if (!telefone) {
    return res.status(400).json({ error: "O campo 'telefone' é obrigatório." });
  }

  const novoUsuario = { id: randomUUID(), nome, email, telefone };
  users.push(novoUsuario);
  dbJson.users = users;

  fs.writeFileSync(caminho, JSON.stringify(dbJson, null, 2));
  return res.status(201).json(novoUsuario);
});

router.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  //converter para numero
  const userId = id;

  // Encontra o índice do usuário
  const userIndex = users.findIndex((user) => user.id === userId);
  //se nao for encontrado na lista
  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }
  //senao remove o user da lista

  const deletedUser = users.splice(userIndex, 1)[0];
  dbJson.users = users;

  // Atualiza o arquivo db.json
  fs.writeFileSync(caminho, JSON.stringify(dbJson, null, 2));

  return res.status(200).json({ message: "Usuário excluído com sucesso.", deletedUser });
});

export default router;

import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})



app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }

        })

    }
    else {
        users = await prisma.user.findMany()
    }



    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {



    await prisma.user.update({

        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })


    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Usuário deletado com sucesso' })
})

app.listen(3000)

/*

OBJETIVOS: 
Criar a API de usuários.

- Criar um usuários
- Listar todos os usuários
- Editar um usuário
- Deletar um usuário
*/


/*

As rotas precisam de duas coisas:

1- Tipo de Rota / Método HTTP
2- Endereço

www.lojadoseuzé.com/produtos
*/


/*
Users
samyrtertuliano4_db_user

*/
import express from "express"
import conectarAoBanco from "./src/config/bdConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


const posts = [
    {
        id: 1,
        description: "Cute cat in the garden",
        img: "https://placekitten.com/300/150",
    },
    {
        id: 2,
        description: "Adorable kitten close-up",
        img: "https://placekitten.com/400/200",
    },
    {
        id: 3,
        description: "Playful cat with toys",
        img: "https://placekitten.com/450/300",
    },
    {
        id: 4,
        description: "Relaxed cat on the sofa",
        img: "https://placekitten.com/350/250",
    },
    {
        id: 5,
        description: "Kitten enjoying the sunshine",
        img: "https://placekitten.com/500/400",
    }
];

const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log("Server listening...");
});

async function getTodosPosts() {
    const db = conexao.db("Tchezery-database")
    const colecao  = db.collection("images-cat")
    return colecao.find().toArray()
}

app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts()
    res.status(200).json(posts);
});

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});


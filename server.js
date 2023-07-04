require('dotenv').config();

const express = require('express');
const app = express();

const { leerFrutas, guardarFrutas } = require('./src/frutasManager');

const PORT = process.env.PORT || 3000;

let DB = [];

app.use(express.json());

app.use((req, res, next)=> {
    DB = leerFrutas();
    next();
});

app.get('/', (req,res)=>{
    res.send(DB);
});

app.get('/:id',(req,res)=>{
    const codigo = parseInt(req.params.id);
    if (typeof(codigo) === 'number'){
        const objeto = DB.find(fruta => fruta.id === codigo)
        if (objeto !== undefined){
            return res.status(200).send(objeto);
        }
    }
    res.status(404).send('No se encontraron coincidencias');
})

app.post('/',(req,res)=>{
    const nuevaFruta = req.body;
    DB.push(nuevaFruta);
    guardarFrutas(DB);
    res.status(201).send('Fruta agregada!');
});

app.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const frutaCambio = req.body;
    if (typeof(id) === 'number'){
        const objeto = DB.find(fruta => fruta.id === id)
        if (objeto !== undefined){
            const index = DB.indexOf(objeto);
            DB.splice(index,1,frutaCambio);
            guardarFrutas(DB);
            return res.status(200).send('Fruta modificada!');
        }
    }
    res.status(404).send('No se encontraron coincidencias');
});

app.delete('/:id',(req,res)=>{
    const codigo = parseInt(req.params.id);
    if (typeof(codigo) === 'number'){
        const objeto = DB.find(fruta => fruta.id === codigo)
        if (objeto !== undefined){
            const index = DB.indexOf(objeto);
            DB.splice(index,1);
            guardarFrutas(DB);
            return res.status(200).send('Fruta eliminada!');
        }
    }
    res.status(404).send('No se encontraron coincidencias');
})

app.get('*', (req,res)=>{
    res.status(404).send('La pagina solicitada no existe');
});

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
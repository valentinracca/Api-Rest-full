const fs = require('fs');
require('dotenv').config();

function guardarFrutas(frutas){
    const datos = JSON.stringify(frutas);
    fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos);
};

function leerFrutas(){
    const frutasString = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf-8');
    const frutitas = JSON.parse(frutasString);
    return frutitas;
};

module.exports = {leerFrutas, guardarFrutas};
import pool from '../config/db.js';

const argumentos = process.argv.slice(2);
//nombre,
const opcion = argumentos[0];
const nombre = argumentos[1];
let rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];


//definir funcion
const agregarMusico = async (nombre,rut,curso,nivel) =>{
    //try{}catch(err){console.log(err)}
    const sql = 'insert into musicos (nombre,rut,curso,nivel) values ($1,$2,$3,$4)';
    const values = [nombre, rut, curso, nivel];

    const response = await pool.query(sql,values);
    console.log(`Musico ${response.rows} agregado a base de datos`);
}
//invocar funcion
//agregarMusico(nombre,rut,curso,nivel);

const mostrarMusicos = async ()=>{
    const sql = 'select * from musicos';

    const response = await pool.query(sql);
    console.log(response.rows);
}

const update = async(nombre, rut, curso, nivel) =>{
    const sql = 'update musicos set nombre = $1, rut = $2, curso = $3, nivel = $4 where rut = $2';
    const values = [nombre,rut,curso,nivel];

    const response = await pool.query(sql,values);
    
    console.log('Musico actualizado', response.rows)
    
}

const deleteMusico = async (rut) => {
    const sql = 'delete from musicos where rut = $1'
    const values = [rut];

    const response = await pool.query(sql,values);
    console.log(`Musico Eliminado con rut: ${rut} eliminado`)
}

const getByRut = async (rut) => {
    const sql = 'select nombre,rut,curso,nivel from musicos where rut = $1'
    const values = [rut];

    const response = await pool.query(sql,values);
    console.log(`Mostrando musico con rut: ${rut} `)
    console.log(response.rows)
}

switch (opcion){
    case 'add':
        agregarMusico(nombre,rut,curso,nivel);
        break;
    case 'update':
        update(nombre,rut,curso,nivel);
        break;
    case 'get':
        mostrarMusicos();
        break;
    case 'delete':
        rut = argumentos[1]
        deleteMusico(rut);
        break;
    case 'getRut':
        rut = argumentos[1]
        getByRut(rut);
        break;
}



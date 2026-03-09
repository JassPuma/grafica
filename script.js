const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGFfRQaF4A5aCiFhEakHHx5jZOGUH3BfnwvQw98TyAtq3wlJe88bELK5cD0Xqp0IH1TeU--jyY5I11/pub?output=csv";

let datos = [];

const ctx = document.getElementById("grafico");

let grafico = new Chart(ctx, {

type: "line",

data: {
labels: [],
datasets: []
},

options:{
responsive:true
}

});

async function cargarDatos(){

const respuesta = await fetch(url);
const texto = await respuesta.text();

let filas = texto.split("\n");

for(let i=1;i<filas.length;i++){

let col = filas[i].split(",");

if(col.length >=5){

datos.push({

fecha: col[0],
modulo: col[1],
temperatura: Number(col[2]),
conductividad: Number(col[3]),
tds: Number(col[4])

})

}

}

actualizarGrafico(2);

}

function actualizarGrafico(modulo){

let fechas=[];
let temp=[];
let cond=[];
let tds=[];

for(let i=0;i<datos.length;i++){

if(datos[i].modulo==modulo){

fechas.push(datos[i].fecha);
temp.push(datos[i].temperatura);
cond.push(datos[i].conductividad);
tds.push(datos[i].tds);

}

}

grafico.data.labels=fechas;

grafico.data.datasets=[

{
label:"Temperatura °C",
data:temp,
borderColor:"red",
fill:false
},

{
label:"Conductividad",
data:cond,
borderColor:"blue",
fill:false
},

{
label:"TDS",
data:tds,
borderColor:"green",
fill:false
}

];

grafico.update();

}

document.getElementById("modulo").addEventListener("change",function(){

actualizarGrafico(this.value);

});

cargarDatos();

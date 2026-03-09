let datos=[]

const ctx=document.getElementById("grafico")

let grafico=new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[]
},

options:{
responsive:true
}

})

fetch("datos.xlsx")

.then(res=>res.arrayBuffer())

.then(data=>{

let libro=XLSX.read(data,{type:"array"})

let hoja=libro.Sheets[libro.SheetNames[0]]

datos=XLSX.utils.sheet_to_json(hoja)

actualizarGrafico(2)

})

function actualizarGrafico(modulo){

let fechas=[]
let temp=[]
let cond=[]
let tds=[]

for(let i=0;i<datos.length;i++){

if(datos[i].modulo==modulo){

fechas.push(datos[i].fecha)

temp.push(datos[i].temperatura)

cond.push(datos[i].conductividad)

tds.push(datos[i].tds)

}

}

grafico.data.labels=fechas

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

]

grafico.update()

}

document.getElementById("modulo").addEventListener("change",function(){

actualizarGrafico(this.value)

})

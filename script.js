let datosExcel=[]

const ctx=document.getElementById("grafico")

let grafico=new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[]
}

})

// LEER EXCEL

document.getElementById("archivoExcel").addEventListener("change",function(e){

let archivo=e.target.files[0]

let lector=new FileReader()

lector.onload=function(e){

let datos=new Uint8Array(e.target.result)

let libro=XLSX.read(datos,{type:"array"})

let hoja=libro.Sheets[libro.SheetNames[0]]

datosExcel=XLSX.utils.sheet_to_json(hoja)

actualizarGrafico(2)

}

lector.readAsArrayBuffer(archivo)

})

function actualizarGrafico(modulo){

let fechas=[]
let temp=[]
let cond=[]
let tds=[]

for(let i=0;i<datosExcel.length;i++){

if(datosExcel[i].modulo==modulo){

fechas.push(datosExcel[i].fecha)

temp.push(datosExcel[i].temperatura)

cond.push(datosExcel[i].conductividad)

tds.push(datosExcel[i].tds)

}

}

grafico.data.labels=fechas

grafico.data.datasets=[

{
label:"Temperatura °C",
data:temp,
borderColor:"red"
},

{
label:"Conductividad",
data:cond,
borderColor:"blue"
},

{
label:"TDS",
data:tds,
borderColor:"green"
}

]

grafico.update()

}

// CAMBIAR MODULO

document.getElementById("modulo").addEventListener("change",function(){

actualizarGrafico(this.value)

})

})

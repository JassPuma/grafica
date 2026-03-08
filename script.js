const fechas = []
let fecha = new Date(2026,0,1)
let fin = new Date(2026,11,31)
while(fecha <= fin){
 let dia = fecha.getDate()
 let mes = fecha.getMonth() + 1
 fechas.push(dia + "/" + mes)
 fecha.setDate(fecha.getDate() + 1)
}
const temperatura = []
const conductividad = []
const tds = []
for(let i=0; i<fechas.length; i++){
 temperatura.push(20 + Math.random()*5)
 conductividad.push(100 + Math.random()*50)
 tds.push(200 + Math.random()*60)
}
const ctx = document.getElementById('grafico')
new Chart(ctx, {
 type: 'line',
 data: {
  labels: fechas,
  datasets: [
   {
    label: "Temperatura °C",
    data: temperatura,
    borderColor: "red",
    fill: false
   },
   {
    label: "Conductividad",
    data: conductividad,
    borderColor: "blue",
    fill: false
   },
   {
    label: "TDS",
    data: tds,
    borderColor: "green",
    fill: false
   }

  ]

 }

})

let tableNum=document.getElementById("tableNum")
let costInput=document.getElementById("costInput")
let showResultTable =document.getElementById("theadResult")
let showResultBody =document.getElementById("tbodyResult")
let tableResult=[]
let everyDayDetalils={}
let dailyArr=[]
let totalCost
var date =new Date()
var tableObj
var dailyObj
let counterCost=0;
if(JSON.parse(localStorage.getItem("Daily details"))!=null){
   dailyArr= JSON.parse(localStorage.getItem("Daily details"))
}else{
    dailyArr=[]
}

$(document).ready(function(){

$("#submitInput").click(function(){
   
   if(checksubmit()){
    let tax=Number(Math.ceil(costInput.value*(0.14))) 
    tableObj={
       id:tableNum.value,
       totalCost:Number(tax+Number(costInput.value)),
       cost :costInput.value,
       tax:tax,
       date:date.toLocaleTimeString()
   }
   tableResult.push(tableObj)
   showResult()
   $("#theadResult").show()
   counterCost+=tableObj.totalCost
   everyDayDetalils={
       dateOfEveryDay:date.toLocaleDateString(),
       tableArr:tableResult,
       totalCost:counterCost
    }
 sessionStorage.setItem("table details",JSON.stringify(everyDayDetalils)) 
   clear()
   }
})
$("#daily").click(function(){
   var x= JSON.parse(sessionStorage.getItem("table details"))
    dailyArr.push(x)
    localStorage.setItem("Daily details",JSON.stringify(dailyArr))
    sessionStorage.removeItem("table details")
    location.href="daily.html"
})
})
function clear()
{
    tableNum.value=''
    costInput.value=''
}
function checksubmit(){
    if(!(tableNum.value=='' || costInput.value=='')){
        
        return true
    }
    else{
        alert("No information entered")
    }
}
function showResult()
{
   let list=''
    for(let i=0;i<tableResult.length;i++){
          list+=`<tr>
              <td >#${tableResult[i].id}</td>
              <td >${tableResult[i].totalCost}</td>
              <td >${date.toLocaleTimeString()}</td>
              </tr>
              `   
    }

    showResultBody.innerHTML=list
}



var listCoins=[];
var moreInfoTime=[];
var checkArr=[];
 
window.onload= function(){
update();
home();
}



$(".home").click(function(){home();});

$(".search").click(function(){
var coin= $("input").val().toLowerCase(); ;
$("input").val("") ;

for(i=0;i<listCoins.length;i++){
if(listCoins[i].symbol===coin){
home();
$(erea ).hide();

setTimeout(
function() 
{
 var diV=$(`h2:contains(${coin})`).parent().parent().parent().parent();
 
$(erea ).html("");
$(diV).css({height:"300px",width:"500px"});
$(erea ).html(diV).show();
$(".Info").on('click',moreInfo);
 $(".checkbox").on('click',checklist);

}, 100);

return; 
}
}

       alert("not found");
       
});

function update(){
    
    var ob=JSON.parse(localStorage.getItem("coins"));
     if(ob){
     for(i=0;i<ob.length;i++){
      checkArr.push(ob[i]);
    }
}
};


function home(){

var url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

const cb=function(xhr){
 erea.innerHTML="";
 $(".chart").html("");
 $(".chart").hide();
 var ob=JSON.parse(xhr.responseText)
 ob=ob.slice(0,100);
 listCoins=ob;
 for(var i=0;i<ob.length;i++){
 var card = document.createElement("div");
 card.classList.add("flip-card");

card.innerHTML =` 
<div class="flip-card-inner">
<div class="flip-card-front">
<div class="checkbox"><input id="${i+"box"}" type="checkbox"/></div>
<div class="x"><h2 style="  text-transform: uppercase;">${ob[i].symbol}</h2><p>${ob[i].id}</p></div>
<div class="Info" ><button class="btnInfo"  id="${i}">MOR INFO</button></div>
</div>
<div class="flip-card-back">
</div>
</div>
</div>`

 erea.appendChild(card);

 var o=JSON.parse(localStorage.getItem("coins"));

checkUpdat();
 }

 $(".Info").on('click',moreInfo);
 $(".checkbox").on('click',checklist);
}
 
 fetch(cb,url);
};



function fetch(cb,url){

$.ajax({type:"get",url:`${url}`})

.done(function (result, status, xhr) {
cb(xhr);
 

})
};


function moreInfo(){

var url="https://api.coingecko.com/api/v3/coins/"; 
var coin =$(this).prev().children("p").html().toLowerCase() ;
url+=coin;

var This= $(this);

const cb =function(xhr){
var str=xhr.responseText;
str=str.replace(/'="https/g,  "='https");
str=str.replace(/'">/g,  "'>");
str=str.replace(/\n\r/s,"");
localStorage.setItem(coin , str);
var ob=JSON.parse(str);
console.log(ob);

$(This).parent().next().html(` <button class="back">> </button><div class="x"><img src="${ob.image.thumb}"><br><strong>${ob.id}</strong></div>,<div class="Info"><strong>USD : $ ${ob.market_data.current_price.usd}</strong><br><strong>ERO : &#8364 ${ob.market_data.current_price.eur}</strong><br><strong>ILS : &#8362 ${ob.market_data.current_price.ils}</strong></div>`)
$(This).parent().parent().toggleClass("rotat");
$(".back").each(function(){
    $(this).click(function(){$(this).parent().parent().removeClass("rotat")});
});

}

if(moreInfoTime.length!=0){
for(i=0;i<moreInfoTime.length;i++){
if(moreInfoTime[i].id===event.target.getAttribute("id")){ 

    var calc=(Date.now()-moreInfoTime[i].time)/10000;

    if(calc<2){

        cashe(coin,This);
        console.log(moreInfoTime);
        return; 
    } 
    else{
        moreInfoTime.splice(i,1);
    }  
}    
}
}
var id=event.target.getAttribute("id");
var time={"id":id,"time":Date.now()}

moreInfoTime.push(time);
console.log(moreInfoTime);

fetch(cb,url);
}

function cashe(coin,This) {
var ob=JSON.parse( localStorage.getItem(coin));  

$(This).parent().next().html(` <button class="back">> </button><div class="x"><img src="${ob.image.thumb}"><br><strong>${ob.id}</strong></div>,<div class="Info"><strong>USD : $ ${ob.market_data.current_price.usd}</strong><br><strong>ERO : &#8364 ${ob.market_data.current_price.eur}</strong><br><strong>ILS : &#8362 ${ob.market_data.current_price.ils}</strong></div>`);
$(This).parent().parent().toggleClass("rotat");
$(".back").each(function(){
    $(this).click(function(){$(this).parent().parent().removeClass("rotat")});
});
}

function checklist(){
var checkbox=$(this).children()
var id=$(checkbox).attr("id")

if($(checkbox).is(":checked")){
  
  if(checkArr.length===5){
    modal(checkbox,id);    
  }

var coin =$(this).next().children("h2").html().toUpperCase();
checkArr.push({"name":coin,"id":id});
var checkStr= JSON.stringify(checkArr);
localStorage.setItem("coins", checkStr);
    
} 
else{

 for(i=0;i<checkArr.length;i++){
   if(checkArr[i].id===id){
    checkArr.splice(i,1);
    var checkStr= JSON.stringify(checkArr);
    localStorage.setItem("coins", checkStr);
   
  }};
    
}  
}

function modal(checkbox,id){
var ul='<ul>';
        
for(i=0;i<checkArr.length;i++){
   ul+=`<label><input type="checkbox" class="modalCheck" id=${checkArr[i].name}>${checkArr[i].name}</label>`;
}

$(erea).append(`<div class="bg-modal">
<div class="content-modal">
<div class="text">
<h2>You can choose maximum 5 coins !</h2>
<h2>Select coin to remove :</h2>
</div>
${ul}
<div class="buttons">
<button class="btn" id="confirm">confirm</button>
<button class="btn" id="cencel">cencel</button>
</div>
</div>
</div>`);


$("#confirm").click(function(){
$(".modalCheck").each(function(){

if($(this).is(":checked")){

var name=$(this).attr("id");
for(i=0;i<checkArr.length;i++){
            
 if(checkArr[i].name===name){
  checkArr.splice(i,1);
  var boxStr= JSON.stringify(checkArr);
  localStorage.setItem("coins", boxStr);
  $(`#${i}box`).prop('checked',false);
  i--;  
}               
}
}
});

if(checkArr.length>5){
$(".bg-modal").remove();
checkbox.prop('checked',false);
for(i=0;i<checkArr.length;i++){
 if(checkArr[i].id===id){
  checkArr.splice(i,1);
  var checkStr= JSON.stringify(checkArr);
  localStorage.setItem("coins", checkStr);
      
}};
   
   return; 
} 


$(".home").trigger("click");
$(".bg-modal").remove(); 
});

$("#cencel").click(function(){
$(".bg-modal").remove();

checkbox.prop('checked',false);
for(i=0;i<checkArr.length;i++){
  if(checkArr[i].id===id){
  checkArr.splice(i,1);
  var checkStr= JSON.stringify(checkArr);
  localStorage.setItem("coins", checkStr);
   
}};
   
   return; 
});
}
 
function checkUpdat(){
var ob=JSON.parse(localStorage.getItem("coins"));
 if(ob){
 for(i=0;i<ob.length;i++){
  var id=ob[i].id;
  $(`#${id}`).attr('checked',true );
 }
}
}

$(".report").on('click',function(){ 
$(".chart").each(function(){
$(this).html("");
});

var ob=JSON.parse(localStorage.getItem("coins"));
console.log(ob);
for(i=0;i<ob.length;i++){
var coin=ob[i].name;
var url=`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=USD`

$(`#${i}`).each(function(){
var v=$(this).attr("id"); 
$(erea).html("");
$(`#${v}`).show();
graf(v,url,coin); 
});
}
});


function graf(v,url,coin){

var dps = [];  

var chart = new CanvasJS.Chart(v,{
title :{
text: coin
},
axisX: {						
title: ""
},
axisY: {
labelFontColor: "red",

prefix: "$",					
title: ""
},
data: [{
type: "line",
dataPoints : dps
}]
});

var xVal = dps.length + 1;
var yVal = 15;	
var updateInterval =2000;

var updateChart = function () {

const cb=function(xhr){
var ob=JSON.parse(xhr.responseText);

yVal = ob[`${coin}`].USD

dps.push({x: xVal,y: yVal});    
xVal++;
chart.render(); 
if (dps.length >  30 )
{
dps.shift();				
}

if(dps[0].y>10){
chart.axisY[0].set("minimum",dps[0].y-20);
}
chart.axisY[0].set("maximum",dps[0].y+20);

chart.render();		
}

fetch(cb,url);
};

updateChart()
setInterval(function(){updateChart()}, updateInterval); 
}


var to2=(n)=>{return n<10 ? "0"+n:n;}
var resultInDate=(dat)=>{
  var yr=dat.getFullYear(),mo=(dat.getMonth()+1),da=dat.getDate(),hr=dat.getHours(),min=dat.getMinutes()
 // mo= mo<=10 ? "0"+mo:mo;
  mo=to2(mo);hr=to2(hr);min=to2(min);da=to2(da);
  var st=yr+"-"+mo+"-"+da +"T"+hr+":"+min;
  console.log(st)
 
  return st;
}
var key=window.location.hash.substring(1);
function setDb(bool){
  database.ref(key).set({
    motorIsOn: bool ? 1:0
 })
update();
}
var on="#11ED00",ont="#918479"
var off="#918479",offt="#22FA6A"
function update(){
  var bool=null;
  var d= database.ref(key+"/motorIsOn")
  d.on("value",(v)=>{bool=v.val()==0? false : true;console.log(v.val())})
  if(bool==null)return;
  var dat=document.getElementById("Data")
  dat.value=bool ? "Motor is On":"Motor is Off"
  dat.style.backgroundColor=bool ? on:off//
  dat.style.color=bool ? ont:offt
  console.log(dat)
}


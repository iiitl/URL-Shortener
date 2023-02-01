var shortlink;
var shorturl=document.getElementById("shorturl");
// console.log(url)
function generate(){
  document.getElementById("text").style.border="0px";
  document.getElementById("error").style.visibility="hidden";
  short();
  dateTime();
}

function dateTime(){
  let currentDate = new Date();
  let date = currentDate.getDate(); +"/"+ (currentDate.getMonth() + 1)+"/"+currentDate.getFullYear();
  let time= currentDate.getHours() + ":" + currentDate.getMinutes();
  document.getElementById("time").textContent="Today at "+time;
}
function short(){
  var textValue=document.getElementById("text").value;
  if(textValue!="undefined")
  var url="https://api.shrtco.de/v2/shorten?url="+textValue;
  else
  var url = "https://api.shrtco.de/v2/shorten?url=";
  
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
    if(data.ok!=false){
      document.getElementById("links").style.visibility="visible"
      shortlink = data.result.short_link;
      // console.log(shortlink)
      console.log(data)
      document.getElementById("ogurl").textContent=document.getElementById("text").value;
      shorturl.textContent=shortlink;
      shorturl.setAttribute("href","https://www."+shortlink)
    }
    else{
      error(data.error_code);
      console.log(data.error_code)
    }
    

  })
}
function error(e){
  document.getElementById("text").style.border="3px red solid";
  // document.getElementById("text").style.color="red";
  document.getElementById("error").style.visibility="visible";
  if(e==1)
  document.getElementById("error").textContent=("No URL given.")
  else if(e==2)
  document.getElementById("error").textContent=("Invalid URL.")
  else if(e==3)
  document.getElementById("error").textContent=("Rate limit reached. Wait a second and try again.")
  else if(e==10)
  document.getElementById("error").textContent=("Disallowed Link.")
  else
  document.getElementById("error").textContent=("Unhandled Error.")
}
function copy(){
  document.getElementById("copy").innerText="Copied"
  navigator.clipboard.writeText(shortlink);
}
function dele(){
  document.getElementById("links").style.visibility="hidden";
}
//   console.log(shortlink)
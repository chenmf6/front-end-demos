var canvas=document.getElementById("mycanvas");
if(canvas && canvas.getContext){
    var ctx=canvas.getContext("2d");
    ctx.fillStyle="#FF0000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

var internalDNDType = 'text';
var mydrag=document.getElementById("mydrag");
mydrag.ondragstart=function(event){
    event.dataTransfer.setData(internalDNDType, event.target.textContent);
    event.effectAllowed="move";
};

var mydrop=document.getElementById("mydrop");
mydrop.ondragenter=function(event){
    if(event.dataTransfer.types.contains(internalDNDType)
        && event.preventDefault)
        event.preventDefault();
}

mydrop.ondragover=function(event){
    event.dataTransfer.dropEffect="copy";
    if(event.preventDefault)
        event.preventDefault();
}

mydrop.ondrop=function(event){
    var data = event.dataTransfer.getData(internalDNDType);
    var li = document.createElement("li");
    li.textContent = data;
    event.target.lastChild.appendChild(li);
}
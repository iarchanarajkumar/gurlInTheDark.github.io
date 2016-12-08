
var canvas;
var ctx;
var x = 75;
var y = 75;
var WIDTH = 900;
var HEIGHT = 600;
var dragme = false;
var timer;
var images=[]
var img = new Image();
var baseImage= new Image();
var arr=[{src:"https://t5.rbxcdn.com/be3b7bac08409949f31cc3fcbea47c53", title:"poop"},{src:"http://rlv.zcache.com/the_original_smiley_face_classic_round_sticker-r8c41697f171a4d97975ffd6ce27b8c3e_v9waf_8byvr_324.jpg", title:"happy"}]
var baseImgLoader = document.getElementById('base');
baseImgLoader.addEventListener('change', handleBaseImage, false);
function urlLoadBase(){
  var strDataURI= document.getElementById('baseImgURLLoader').value
  var img = new Image;
  img.src = strDataURI;
  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
      ctx.drawImage(img,0,0);
  }
    baseImage.src=img.src;
}

function handleBaseImage(e){
  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
          ctx.drawImage(img,0,0);
      }
      img.src = event.target.result;
      baseImage.src=img.src;

  }
  reader.readAsDataURL(e.target.files[0]);
}
function canvasify(i){
  clearInterval(timer);
  if (img.src){
  images.push({img:img.src, x:x-75, y:y-75, width:150, height:150})
}

  x=75;
  y=75;

  img.src=arr[i].src;
  ctx.drawImage(img,10,10, 150, 150);
  return timer=setInterval(function(){displaythis(img)}, 60)
}
function displaythis(img){
  redraw();
  return ctx.drawImage(img,x-75,y-75, 150, 150);
}

function redraw() {
 ctx.clearRect(0, 0, WIDTH, HEIGHT);
 var i = new Image();
 i.src=baseImage.src
 ctx.drawImage(i, 0, 0)
 for (i in images){
   var img = new Image();
   img.src=images[i].img
   ctx.drawImage(img, images[i].x, images[i].y, images[i].width, images[i].height)
 }
}

function myMove(e){
 if (dragme){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
 }
}

function myDown(e){
 if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 +
 canvas.offsetLeft && e.pageY < y + 75 + canvas.offsetTop &&
 e.pageY > y -15 + canvas.offsetTop){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
  dragme = true;
  canvas.onmousemove = myMove;
 }
}

function myUp(){
 dragme = false;
 canvas.onmousemove = null;
}

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;

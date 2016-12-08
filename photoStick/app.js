var canvas;
var ctx;
var x = 60;
var y = 60;
var WIDTH = 900;
var HEIGHT = 600;
var dragme = false;
var timer;
var images = []
var img = new Image();
var baseImage = new Image();
var stickerList = [{
	src: "https://s-media-cache-ak0.pinimg.com/564x/6c/1d/63/6c1d63de581d1d056bf038bb963e0290.jpg",
	title: "embarrassed"
}, {
	src: "http://rlv.zcache.com/the_original_smiley_face_classic_round_sticker-r8c41697f171a4d97975ffd6ce27b8c3e_v9waf_8byvr_324.jpg",
	title: "happy"
}];


function startOver(){
  baseImage.src="";
  images=[];
  img.src="";
}
var baseImgLoader = document.getElementById('baseImgLoader');
baseImgLoader.addEventListener('change', handleBaseImage, false);

function urlLoadBase() {
  var strDataURI= document.getElementById('baseImgURLLoader').value
  if (!strDataURI){
    alert("the URL loader is empty")
    return
  }
   var img = new Image;
   img.src = strDataURI;
   img.onload = function(){
       ctx.drawImage(img,0,0);
   }
     baseImage.src=img.src;
 }

function canvasify(title) {
	clearInterval(timer);
	if (img.src) {
		images.push({
			img: img.src,
			x: x - 15,
			y: y - 15,
			width: 30,
			height: 30
		})
	}
	x = 30;
	y = 30;
	img.src = _.findWhere(stickerList, {
		title: title
	}).src;
	ctx.drawImage(img, 10, 10, 30, 30);
	return timer = setInterval(function() {
		displaythis(img)
	}, 60)
}

function handleBaseImage(e) {
	var reader = new FileReader();
	reader.onload = function(event) {
		var img = new Image();
		img.onload = function() {
			ctx.drawImage(img, 0, 0);
		}
		img.src = event.target.result;
		baseImage.src = img.src;
	}
	reader.readAsDataURL(e.target.files[0]);
}

function displaythis(img) {
	redraw();
	return ctx.drawImage(img, x - 15, y - 15, 30, 30);
}

function redraw() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	var i = new Image();
	i.src = baseImage.src
	ctx.drawImage(i, 0, 0)
	for (i in images) {
		var img = new Image();
		img.src = images[i].img
		ctx.drawImage(img, images[i].x, images[i].y, images[i].width, images[i].height)
	}
}

function myMove(e) {
	if (dragme) {
		x = e.pageX - canvas.offsetLeft;
		y = e.pageY - canvas.offsetTop;
	}
}

function moveDown(e) {
	if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 + canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop && e.pageY > y - 15 + canvas.offsetTop) {
		x = e.pageX - canvas.offsetLeft;
		y = e.pageY - canvas.offsetTop;
		dragme = true;
		canvas.onmousemove = myMove;
	}
}

function moveUp() {
	dragme = false;
	canvas.onmousemove = null;
}

function submitSticker() {
	var title = document.getElementById("stickerTitle");
	var src;
	var stickerURLLoader = document.getElementById("stickerURLLoader");
	var stickerFileLoader = document.getElementById("stickerFileLoader");
	var stickers = document.getElementById("stickers")
	var div = document.createElement("div");
	div.className = "sticker";
	var imgStick = document.createElement("img");
	imgStick.width = 30;
	imgStick.height = 30;
  if(!stickerFileLoader.files.length && !stickerURLLoader.value){
    return 
  }
	if (stickerFileLoader.files.length) {
		var reader = new FileReader();
		if (!title.value) {
			title.value = stickerFileLoader.files[0].name;
		}
		reader.onload = function(e) {
			imgStick.src = e.target.result;
			stickerList.push({
				src: imgStick.src,
				title: title.value
			})

		}
		reader.readAsDataURL(stickerFileLoader.files[0]);
	} else {
		if (!title.value) {
			title.value = stickerURLLoader.value;
		}
		src = stickerURLLoader.value
		stickerList.push({
			src: src,
			title: title.value
		})
		imgStick.src = src
	}
  imgStick.alt=title.value
  imgStick.title=title.value;
	imgStick.addEventListener('click', function() {
		canvasify(title.value)
	})
	document.getElementById("stickers").appendChild(div);
	div.appendChild(imgStick)

}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
};
downloadLnk.addEventListener('click', download, false);

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.onmousedown = moveDown;
canvas.onmouseup = moveUp;

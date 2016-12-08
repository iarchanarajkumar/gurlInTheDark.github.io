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
    src: "http://image.flaticon.com/icons/svg/136/136295.svg",
    title: "embarrassed"
}, {
    src: "http://image.flaticon.com/icons/svg/136/136215.svg",
    title: "happy"
}, {
    src: "http://image.flaticon.com/icons/svg/136/136223.svg",
    title: "headphone"
}, {
    src: "http://image.flaticon.com/icons/svg/136/136272.svg",
    title: "baby"
}, {
    src: "http://image.flaticon.com/icons/svg/136/136411.svg",
    title: "angry"
}, {
    src: "http://image.flaticon.com/icons/svg/136/136364.svg",
    title: "love"
}];
var iconWidth= 100;
var iconHeight= 100;
var stickerWidth= 30;
var stickerHeight= 30;
//reset button
function startOver() {
    baseImage.src = "";
    images = [];
    img.src = "";
}
//event listen for base image loading
var baseImgLoader = document.getElementById('baseImgLoader');
baseImgLoader.addEventListener('change', filebasedLoad, false);

//if url based loading
function urlLoadBase() {
    var strDataURI = document.getElementById('baseImgURLLoader').value
    if (!strDataURI) {
        alert("the URL loader is empty")
        return
    }
    var img = new Image;
    img.src = strDataURI;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
    baseImage.src = img.src;
}
// if file loading
function filebasedLoad(e) {
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
//reset the x & y positions for next icon
function resetPositions(){
	x = 60;
	y = 60;
}

// move the sticker to canvas
function canvasify(title) {
    clearInterval(timer);
    if (img.src) {
        images.push({
            img: img.src,
            x: x,
            y: y,
            width: iconWidth,
            height: iconHeight
        })
    }
    resetPositions()
    img.src = _.findWhere(stickerList, {
        title: title
    }).src;
    ctx.drawImage(img, 10, 10, iconWidth, iconHeight);
    return timer = setInterval(function() {
        displayCanvasIcon(img)
    }, 60)
}


// displays on canvas
function displayCanvasIcon(img) {
    redraw();
    return ctx.drawImage(img, x , y , iconWidth, iconHeight);
}

// everytime the position of the current icon changes, the others get rerendered at the same location
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

// moving the image
function makeMyMove(e) {
    if (dragme) {
        x = e.offsetX - canvas.offsetLeft;
        y = e.offsetY - canvas.offsetTop;
    }
}

function moveDown(e) {
    if (e.offsetX < x + 50 + canvas.offsetLeft && e.offsetX > x - 50 + canvas.offsetLeft && e.offsetY < y + 50 + canvas.offsetTop && e.offsetY > y - 50 + canvas.offsetTop) {
        x = e.offsetX - canvas.offsetLeft;
        y = e.offsetY - canvas.offsetTop;
        dragme = true;
        canvas.onmousemove = makeMyMove;
    }
}

function moveUp() {
    dragme = false;
    canvas.onmousemove = null;
}

// submitting custom stickers
function submitSticker() {
    var title = document.getElementById("stickerTitle");
    var src;
    var stickerURLLoader = document.getElementById("stickerURLLoader");
    var stickerFileLoader = document.getElementById("stickerFileLoader");
    var stickers = document.getElementById("stickers")
    var div = document.createElement("div");
    div.className = "sticker";
    var imgStick = document.createElement("img");
    imgStick.width = stickerWidth;
    imgStick.height = stickerHeight;
    if (!stickerFileLoader.files.length && !stickerURLLoader.value) {
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
    imgStick.alt = title.value
    imgStick.title = title.value;
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

// download feature
function download() {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.type = canvas.toDataURL('image/jpeg');
    this.href = img.type;
};

// init
downloadLnk.addEventListener('click', download, false);

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.onmousedown = moveDown;
canvas.onmouseup = moveUp;

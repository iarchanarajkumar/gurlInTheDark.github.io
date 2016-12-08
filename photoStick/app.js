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


function startOver() {
    baseImage.src = "";
    images = [];
    img.src = "";
}
var baseImgLoader = document.getElementById('baseImgLoader');
baseImgLoader.addEventListener('change', handleBaseImage, false);

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

function canvasify(title) {
    clearInterval(timer);
    if (img.src) {
        images.push({
            img: img.src,
            x: x ,
            y: y ,
            width: 100,
            height: 100
        })
    }
    x = 60;
    y = 60;
    img.src = _.findWhere(stickerList, {
        title: title
    }).src;
    ctx.drawImage(img, 10, 10, 100, 100);
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
    return ctx.drawImage(img, x , y , 100, 100);
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
        x = e.offsetX - canvas.offsetLeft;
        y = e.offsetY - canvas.offsetTop;
    }
}

function moveDown(e) {
    if (e.offsetX < x + 50 + canvas.offsetLeft && e.offsetX > x - 50 + canvas.offsetLeft && e.offsetY < y + 50 + canvas.offsetTop && e.offsetY > y - 50 + canvas.offsetTop) {
        x = e.offsetX - canvas.offsetLeft;
        y = e.offsetY - canvas.offsetTop;
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
    imgStick.width = 100;
    imgStick.height = 100;
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

function download() {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.type = canvas.toDataURL('image/jpeg');
    this.href = img.type;
};
downloadLnk.addEventListener('click', download, false);

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.onmousedown = moveDown;
canvas.onmouseup = moveUp;

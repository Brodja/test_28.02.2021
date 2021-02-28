onload = function () {
    if(localStorage.getItem('story') != null){
        let result = localStorage.getItem('story')
        result = JSON.parse(result)
        deleteStoreArr = result
        for (let i = 0; i < result.length; i++) {
            deleteBlockFoto(result[i].delClass)
        }
    }
    renderTime();
    setInterval('renderTime()', 1000 );
}
var deleteStoreArr = []
const imgField = document.querySelector('.block__row');

function renderTime() {
    let countImg = (document.getElementsByTagName('img').length)
    let nowTime = new Date().toLocaleString().slice(0, -3);
    document.getElementById('countImgPage').innerText = countImg;
    document.getElementById('nowTimePage').innerText = nowTime;
}

imgField.onclick = function (event) {
    if (event.target.attributes.src != undefined) {
        let target = event.target.attributes.src.nodeValue;
        createPopap(target)
        document.querySelector('.close').onclick = function () {
            document.querySelector('.popapBox').remove();
        }
    } else if (event.target.attributes.class.nodeValue == 'delete_img') {
        let path = event.target.parentNode.attributes.class.nodeValue
        let from = path.search(' ');
        let to = path.length;
        path = path.substring(from + 1, to);
        let obj = {
            className: event.target.parentNode.attributes.class.nodeValue,
            fotoPath: event.target.parentNode.children[0].children[0].attributes.src.nodeValue,
            delClass: path
        }
        deleteStoreArr.push(obj)
        let store = JSON.stringify(deleteStoreArr)
        localStorage.setItem('story', store);
        deleteBlockFoto(path)
    }
}

function deleteBlockFoto(path) {
    document.querySelector(`.${path}`).remove();
}

function createPopap(src) {
    var body = document.querySelector('body');
    let box = document.createElement('div');
    box.className = 'popapBox';
    let box_img = document.createElement('div');
    box_img.className = 'boxImg';
    let img = document.createElement('img');
    img.src = src;
    let cancel = document.createElement('div');
    cancel.className = 'close';
    cancel.innerText = 'X';
    box.appendChild(box_img);
    box_img.appendChild(img);
    box_img.appendChild(cancel);
    body.appendChild(box);
}

function closePopap() {
    let close = document.querySelector('.close')
}
function restore() {
    let result = localStorage.getItem('story')
    result = JSON.parse(result)

    for (let i = 0; i < result.length; i++) {
        let blockElement = document.createElement('div')
        blockElement.className = result[i].className
        let blockContent = document.createElement('div')
        blockContent.className = 'block__content'
        let img = document.createElement('img')
        img.src = result[i].fotoPath
        let deleteImg = document.createElement('div')
        deleteImg.className = 'delete_img'
        deleteImg.innerText = 'x'
        blockElement.appendChild(blockContent)
        blockElement.appendChild(deleteImg)
        blockContent.appendChild(img)
        imgField.appendChild(blockElement)
    }
    deleteStoreArr = []
    let store = JSON.stringify(deleteStoreArr)
    localStorage.setItem('story', store);
}

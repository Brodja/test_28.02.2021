onload = function () {
    renderList();
    renderinfo();
    setInterval('renderinfo()', 1000);
}
const url = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json'
var textResp = document.querySelector('#textResp')
var table = document.querySelector('.table')
var infoList = []

async function getResponse(textResp) {
    let response = await fetch(url)
    let content = await response.json()
    let count = 0;
    table.innerHTML += `
    <tr>
            <th>id</th>
            <th>alpha_two_code</th>
            <th>country</th>
            <th>domains</th>
            <th>name</th>
            <th>web_pages</th>
            <th>Сохранить в мой список</th>
        </tr>
        `
    content.forEach(function (item, i, content) {
        if (item.country == textResp) {
            count++;
            table.innerHTML += `
           <tr>
                <td>${count}</td>
                <td>${item.alpha_two_code}</td>
                <td>${item.country}</td>
                <td>${item.domains}</td>
                <td>${item.name}</td>
                <td><a href="${item.web_pages}">${item.web_pages}</a></td>
                <td><input type="checkbox"></td>
                </tr>
           `
        }
    })
    if (count == 0) {
        alert('Error')
    }
}
function send() {
    getResponse(textResp.value)
    saveInfo()
}
function clearTable() {
    table.innerHTML = ''
    textResp.value = ''
}
function renderinfo() {
    let count = 0;
    let inputs = document.getElementsByTagName('INPUT');
    for (let i = 0; i < inputs.length; i++)
        if (inputs[i].type == 'checkbox' && inputs[i].checked)
            count++;
    document.getElementById('countCheckBox').innerText = count;
}

function saveInfo(){
    let listChild = table.childNodes
        var arr = []
    for(let i = 3; i<listChild.length; i+=2){
        let arrT = []
        // console.log(listChild[i].childNodes[0].innerHTML)
        // for(let i = 1; i<7; i++){
        // arrT.push(listChild[i].childNodes[0].children[i])
        // }
        let obj = {
            html: listChild[i].childNodes[0].innerHTML,
            checked: listChild[i].childNodes[0].children[6].firstChild.checked
        }
        arr.push(obj)
    }   

    let store = JSON.stringify(arr)
    localStorage.setItem('listInfo', store);
}
table.onclick = function (event) {
    if(event.target.type == 'checkbox'){
        saveInfo()   
    }
}
function renderList(){
    if(localStorage.getItem('listInfo') != null){
        let result = localStorage.getItem('listInfo')
        result = JSON.parse(result)
        // console.log(result)
        for(let i = 0; i < result.length; i++){
             table.innerHTML += result[i].html
            // let tr = document.createElement('tr');
        }
    }
}
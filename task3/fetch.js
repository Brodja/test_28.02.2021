onload = function () {
    renderList();
    renderinfo();
    // setInterval('renderinfo()', 1000);
}
const url = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json'
var textResp = document.querySelector('#textResp')
var table = document.querySelector('.table')
var infoList = []

async function getResponse(textResp) {
    let response = await fetch(url)
    let content = await response.json()
    let count = 0;
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
    let arr = []
    let store = JSON.stringify(arr)
    localStorage.setItem('listInfo', store)
    renderinfo()
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
    for(let i = 1; i<listChild.length; i+=2){
        let arrT = []
        let obj = {
            coun: listChild[i].childNodes[0].childNodes[3].innerText,
            country: listChild[i].childNodes[0].childNodes[5].innerText,
            dom: listChild[i].childNodes[0].childNodes[7].innerText,
            name: listChild[i].childNodes[0].childNodes[9].innerText,
            link: listChild[i].childNodes[0].childNodes[11].innerText,
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
        renderinfo()
    }
}
function renderList(){
    if(localStorage.getItem('listInfo') != null){
        let result = localStorage.getItem('listInfo')
        result = JSON.parse(result)
        var count = 0
         console.log(result)
        for(let i = 0; i < result.length; i++){
            if(result[i].checked){
                count++
                table.innerHTML += `
                <tr>
                     <td>${count}</td>
                     <td>${result[i].coun}</td>
                     <td>${result[i].country}</td>
                     <td>${result[i].dom}</td>
                     <td>${result[i].name}</td>
                     <td><a href="${result[i].link}">${result[i].link}</a></td>
                     <td><input type="checkbox" checked = "${result[i].checked}"></td>
                     </tr>
                `
            }
            
        }
    }
}
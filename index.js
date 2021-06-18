const url = "https://api-ppw.herokuapp.com/api/116304/users"
let listaPessoas = [] 
let ul = document.querySelector("#listaCadastro") 
let form = document.querySelector("#Formulario") 
let inputName = document.querySelector("#name")
let inputPassword = document.querySelector("#password")
form.addEventListener('submit', cadastro) 

function cadastro(evento) {
    evento.preventDefault() 
    let pessoas = {
        'name': inputName.value,
        'password': inputPassword.value
    }
    let texto = JSON.stringify(pessoas)
    const opcoes = { 
        method: "POST", 
        body: texto, 
        headers: {
            "content-type": "application/json" 
        }
    }
    const requisicao = fetch(url, opcoes) 
    requisicao.then(function (resposta){
        receberUsuarios()
    })
}

function receberUsuarios() {
    const requisicao = fetch(url)
    requisicao.then(function (resposta) {
        const json = resposta.json()
        json.then(function (pessoas) {
            listaPessoas = pessoas
            imprimelistaPessoas()
        })
    })
}receberUsuarios()

function imprimelistaPessoas() {
    ul.textContent = ""
    for (var pessoas of listaPessoas) { 
        var li = document.createElement('li')
        var span = document.createElement('span')
        span.textContent = pessoas.name
        li.appendChild(span)
        var span2 = document.createElement('span')
        span2.textContent = pessoas.password
        li.appendChild(span2)
        var deleta = document.createElement('button')
        deleta.textContent = "Delete"
        deleta.onclick = function (evento){  
            evento.preventDefault()
           deletaUsuario(pessoas._id)
        }
        li.appendChild(deleta)
        ul.appendChild(li)
        console.log(pessoas._id)
    }
}
function deletaUsuario(id){
    const opcao = {
        method: "DELETE"
    }
    const requisicao = fetch(url + "/" + id, opcao) 
    requisicao.then(function (resposta){
        receberUsuarios()
    })
}

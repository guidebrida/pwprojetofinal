const url = "https://projeto-final-ppw.herokuapp.com/api/117188"
let listaPessoas = [] 
let ul = document.querySelector("#listaCadastro") 
let form = document.querySelector("#Formulario") 
let inputName = document.querySelector("#name")
let inputData = document.querySelector("#data")
let inputCpf = document.querySelector("#cpf")
let inputEmail = document.querySelector("#email")
form.addEventListener('submit', cadastro) 

function cadastro(evento) {
    evento.preventDefault() 
    let pessoas = {
        'name': inputName.value,
        'data': inputData.value,
        'cpf' : inputCpf.value,
        'email': inputEmail.value
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
    for (let pessoas of listaPessoas) { 
        let li = document.createElement('li')
        
        let nome = document.createElement('span')
        nome.textContent = pessoas.name
        li.appendChild(nome)

        let data = document.createElement('span')
        data.textContent = pessoas.data
        li.appendChild(data)

        let cpf = document.createElement('span')
        cpf.textContent = pessoas.cpf
        li.appendChild(cpf)

        let email = document.createElement('span')
        email.textContent = pessoas.email
        li.appendChild(email)

        let deleta = document.createElement('button')
        deleta.textContent = ""
        deleta.id = "delete"
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

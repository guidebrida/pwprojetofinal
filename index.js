const url = "https://projeto-final-ppw.herokuapp.com/api/117188"
let listaPessoas = [] 
let ul = document.querySelector("#listaCadastro") 
let form = document.querySelector("#Formulario") 
let inputName = document.querySelector("#name")
let inputImg = document.querySelector("#img")
let inputTitulos = document.querySelector("#Titulos")
let inputJogador = document.querySelector("#Jogador")
form.addEventListener('submit', cadastro) 

function cadastro(evento) {
    evento.preventDefault() 
    let pessoas = {
        'name': inputName.value,
        'img': inputImg.value,
        'Titulos' : inputTitulos.value,
        'Jogador': inputJogador.value
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

        let img = document.createElement('img')
        img.src = pessoas.img
        li.appendChild(img)
        
        let nome = document.createElement('div')
        nome.textContent = pessoas.name
        li.appendChild(nome)
        nome.id = "Nome"

        let titulos = document.createElement('div')
        titulos.textContent = pessoas.Titulos
        li.appendChild(titulos)
        titulos.id = "titulos"

        let jogador = document.createElement('div')
        jogador.textContent = pessoas.Jogador
        li.appendChild(jogador)
        jogador.id = "jogador"

        let deleta = document.createElement('button')
        deleta.textContent = "REBAIXAR"
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

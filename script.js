const nome_ent = document.getElementById("nome_ent")
const cep_ent = document.getElementById("cep_ent")

const salvar_but = document.getElementById("salvar")
const listar_but = document.getElementById("listar")

const resp = document.getElementById("resp")

const vetC = ["logradouro", "complemento", "bairro", "localidade", "uf", "ddd"]

let cep_salvo = JSON.parse(localStorage.getItem("cep_salvo"))
if(cep_salvo == null){
    cep_salvo = []
}
let ind_cep = 0

async function addCEP(dado, nome){

    const novo = document.createElement("div")
    
    const div = document.createElement("div")
    div.innerText = "Nome: " + nome
    novo.appendChild(div)
    for (let index = 0; index < vetC.length; index++) {
        const div = document.createElement("div")
        div.innerText = vetC[index] + ": " + dado[vetC[index]]
        novo.appendChild(div)
    }
  
    resp.appendChild(novo)
}


async function save(){
    const dado = await getCEP()
    const nome = nome_ent.value
 

    const obj = {nome: nome, dado:  JSON.stringify(dado)}
    cep_salvo.push(obj)

    localStorage.clear()
    localStorage.setItem("cep_salvo", JSON.stringify(cep_salvo))
}

function list(){
    console.log(cep_salvo)
    for (; ind_cep < cep_salvo.length; ind_cep++) {
        const a = cep_salvo[ind_cep].dado
        const data = JSON.parse(a)
        addCEP(data, cep_salvo[ind_cep].nome)
    }
}

async function getCEP(){
 return response = (await fetch("https://viacep.com.br/ws/" + cep_ent.value + "/json/")).json();
}



salvar_but.addEventListener("click", save)

listar_but.addEventListener("click", list)
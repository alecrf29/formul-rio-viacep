async function buscaCep(cep) {
    var mensagemDeErro = document.getElementById('erro')
    mensagemDeErro.innerHTML = ""

    try {
        var consultaCep  = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCepConvertido = await consultaCep.json()


        if(consultaCepConvertido.erro) {
            throw Error('CEP não existente.')
        } else {
            console.log(consultaCepConvertido)
        }

        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')
        var bairro = document.getElementById('bairro')

        cidade.value = consultaCepConvertido.localidade
        logradouro.value = consultaCepConvertido.logradouro
        estado.value = consultaCepConvertido.uf
        bairro.value = consultaCepConvertido.bairro

        return consultaCepConvertido

    } catch(erro) {
        mensagemDeErro.innerHTML = `<p>Cep inválido, tente novamente.</p>`
        console.log(erro)
    }

}

const cep = document.getElementById('cep')

cep.addEventListener('focusout', () => buscaCep(cep.value))

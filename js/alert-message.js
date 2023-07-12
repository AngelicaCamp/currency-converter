const curreciesEl = document.querySelector('[data-js="row-secondary"]')


const getErrorMessage = errorType => ({
    'unsupported-code': 'A moeda não existe em nosso banco de dados.',
    'malformed-request': 'A solicitação não segue a estrutura mostrada acima.',
    'invalid-key': 'Sua chave API não é válida.',
    'inactive-account': 'Seu endereço de e-mail não foi confirmado.',
    'quota-reached': 'Sua conta atingiu o número de solicitações permitidas pelo seu plano.'
})[errorType] || 'Não foi possível obter as informações'


const showAlertMensageError = error => {
    const div = document.createElement('div')
    const button = document.createElement('button')

    div.textContent = error
    div.classList.add('alert', 'alert-warning' ,'alert-dismissible' ,'fade' ,'show')
    div.setAttribute('role','alert')
    button.classList.add('btn-close')
    button.setAttribute('type','button')
    button.setAttribute('arial-label','Close')

    button.addEventListener('click', () => {
        div.remove()
    })

    div.appendChild(button)
    curreciesEl.insertAdjacentElement('afterend',div)
    
}
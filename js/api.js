const apiKey = '44675869a7055517b9b35f83'
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}`


const fetchDataApi = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok){
            throw new Error('Sua conexão falhou. Não foi possível obter as informações.')
        }

        const data = await response.json()

        if (fetchDataApi.result === 'error'){
            throw new Error(getErrorMessage(data['error-type']))
        }
        return data

    } catch (err){
        showAlertMensageError(err.message)
    }
}


const getCurrencyCodes = async () => {
    const codes = await fetchDataApi(`${baseURL}/codes`)
    //const codes = await fetchDataApi('./codes.json')
    const {supported_codes:codesPaises} = codes
    return codesPaises
}


const getCountryValues = async (code) => {
    const conversionData = await fetchDataApi(`${baseURL}/latest/${code}`)
    //const conversionData = await fetchDataApi('./countryValue.json')
    const { conversion_rates } = conversionData
    return conversion_rates
}








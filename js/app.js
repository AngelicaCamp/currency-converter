const originCurrency = document.querySelector('[data-js="currency-one"]')
const destinyCurrency = document.querySelector('[data-js="currency-two"]')
const textPrecision = document.querySelector('[data-js="conversion-precision"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const inputValue = document.querySelector('[data-js="currency-one-times"]')

let cotacao = {}

const state = {
  origin: 'USD',
  destiny: 'BRL',
  rate: 1
}

let value = 0

inputValue.addEventListener('input', event => {
  value = event.target.value
  updateConvertedValue()
})


const updateConvertedValue = () => {
  const resultConvert = value * state.rate
  convertedValue.textContent = `${resultConvert.toFixed(2)} ${state.destiny}`
}


const createOptionElement = (code,selectCurrency)=> {
    const option = document.createElement('option')
    option.setAttribute('value', code[0])
    setDefaultOption(code,selectCurrency,option)
    option.textContent = `${code[0]} - ${code[1]} `
    selectCurrency.append(option)
}


const setDefaultOption = (defaultCode,selectCurrency, option) => {
  const isUSD = defaultCode[0] === 'USD' && selectCurrency === originCurrency
  const isBRL = defaultCode[0] === 'BRL' && selectCurrency === destinyCurrency
  option.selected = isUSD || isBRL
}


const populateCurrencyOpts = (codes) => {
  codes.forEach(code => {
    createOptionElement(code,originCurrency)
    createOptionElement(code,destinyCurrency)
  })
}


const fetchDataConversioncotacao = async code => {
  cotacao = await getCountryValues(code)
  state.origin = code
  state.rate = cotacao[state.destiny]
}

const fetchDataCodes = async () => {
  const codes = await getCurrencyCodes()
  populateCurrencyOpts(codes) 
}


const showTextConversionPrecisionX1 = () => {
  const { origin, destiny, rate } = state
  const text = `1 ${origin} = ${rate.toFixed(3)} ${destiny}`
  textPrecision.textContent = text
}


originCurrency.addEventListener('change', async event => {
  const selectCode = event.target.value
  await fetchDataConversioncotacao(selectCode)
  showTextConversionPrecisionX1()
  updateConvertedValue()
})


destinyCurrency.addEventListener('change', event => {
  const selectCode = event.target.value
  state.destiny = selectCode
  state.rate = cotacao[selectCode]
  showTextConversionPrecisionX1()
  updateConvertedValue()
})


const startup = async () => {
  await fetchDataCodes()
  await fetchDataConversioncotacao(state.origin)
  showTextConversionPrecisionX1()
  updateConvertedValue()

}

startup()








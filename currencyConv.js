const axios = require('axios');

const getExchangeRate = (from,to)=>{
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response)=>{
    return response.data.rates[to];
  })
}

const getCountries = (currencyCode)=>{
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=>{
    return response.data.map((names)=>names.name);
  })
}

const convertCurrency = (from,to,amount)=>{
  let total;
  return getExchangeRate(from,to).then((rate)=>{
    total = amount*rate;
    return getCountries(to);
  }).then((countries)=>{
     return `${amount} in ${from} is worth ${total} in ${to}, ${to} is valid in ${countries.join(', ')}` ;
  })
}

convertCurrency('USD','EUR',100).then((status)=>{
  console.log(status);
})

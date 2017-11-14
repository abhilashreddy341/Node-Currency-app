const axios = require('axios');

const getExchangeRate = async(from,to)=>{
  try{
  const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if(rate){
      return rate;
    }
    else{
      throw new Error();
    }
  }
  catch(e){
    throw new Error(`unable to find the exchange rate for ${from} and ${to}`);
  }
}

const getCountries = async(currencyCode)=>{
 try{
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return response.data.map((names)=>names.name);
  }
  catch(e){
    throw new Error(`unable to find countries for the code ${currencyCode}`);
  }
}

const convertCurrency = async (from,to,amount)=>{
 total = await getExchangeRate(from,to) * amount;
 countries = await getCountries(to);
 return `${amount} in ${from} is worth ${total} in ${to}, ${to} is valid in ${countries.join(', ')}`
}

convertCurrency('USD','EUR',100).then((status)=>{
  console.log(status);
})

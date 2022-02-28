const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())
app.get('/',(req,res)=>{
    res.json('hi')
})
app.get('/news',(req,res)=>{
    const options = {
            method: 'GET',
            url: 'https://newsdata.io/api/1/news',
            params: {apikey:process.env.REACT_APP_NEWS_API_KEY,
                    country: 'us', 
                    category: 'world, top', 
                    language: 'en',
                    }
        }
        axios.request(options).then((response) => {
            res.json(response.data['results'])
            // res.json("hello")
               
        }).catch((error)=> {
            console.error(error)
        })
})
app.get('/convert',(req,res)=>{
    console.log(req)
    const toCurrency = req.query.to_currency
    const fromCurrency = req.query.from_currency
    
    console.log('toCurrency', toCurrency)
    console.log('toCurrency', fromCurrency)
    
    const options = {
            method: 'GET',
            url: 'https://www.alphavantage.co/query',
            params: { 
                function: 'CURRENCY_EXCHANGE_RATE', 
                from_currency: fromCurrency,
                to_currency: toCurrency,
                apikey: process.env.REACT_APP_CONVERSION_API_KEY},
        }
        axios.request(options).then((response) => {
            res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            
         }).catch((error)=> {
            console.error(error)
        })
})

app.listen(8000, () => console.log('server is running on port ${PORT}'))

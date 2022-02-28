import { useState } from "react"
import ExchangeRate from "./ExchangeRate" 
import axios from "axios"

const CurrencyConverter = () => {
    const currencies = ['Euro','KRW', 'MXN', 'USD']
    const [choosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('MXN')
    const [choosenSecondaryCurrency, setChoosenSecondaryCurrency] = useState('USD')
    const [amount, setAmout] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)
    console.log(amount)

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            // params: {from_currency: choosenPrimaryCurrency, 
            //     function: 'CURRENCY_EXCHANGE_RATE', 
            //     to_currency: choosenSecondaryCurrency,
            //     apikey: process.env.REACT_APP_CONVERSION_API_KEY},
        }
        axios.request(options).then((response) => {
            console.log(response.data);
            setExchangeRate(response.data)
            setResult(response.data * amount)
            
         }).catch((error)=> {
            console.error(error)
        })
    }
    console.log(exchangeRate)
    console.log(result)
    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency</td>
                            <td>
                                <input type="number" name="currency-amt-1" value={amount} onChange={(e) => setAmout(e.target.value)}/>
                            </td>
                            <td>
                                <select name="currency-opt-1" value={choosenPrimaryCurrency} className="currency-opts" onChange={(e)=>setChoosenPrimaryCurrency(e.target.value)}>
                                   {currencies.map((currency, _index)=> (<option key={_index}>{currency}</option>)
                                   )}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency</td>
                            <td>
                                <input name="currency-amt-2" value={result} disabled={true}/>
                            </td>
                            <td>
                                <select name="currency-opt-2" value={choosenSecondaryCurrency} className="currency-opts"  onChange={(e)=>setChoosenSecondaryCurrency(e.target.value)}>
                                    {currencies.map((currency, _index)=>(<option key={_index}>{currency}</option>)
                                    )}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="convert-btn" onClick={convert}>Convert</button>
            </div>
        

            <ExchangeRate 
                exchangeRate={exchangeRate} 
                choosenPrimaryCurrency={choosenPrimaryCurrency} 
                choosenSecondaryCurrency={choosenSecondaryCurrency}
            />
        </div>
  )
}

export default CurrencyConverter;
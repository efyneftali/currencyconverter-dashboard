const ExchangeRate = ({exchangeRate,choosenPrimaryCurrency,choosenSecondaryCurrency}) => {
  return (
    <div className="exchange-rate">
        <h3>Exchange Rate</h3>
        <h1>{exchangeRate}</h1>
        <p>{choosenPrimaryCurrency} to {choosenSecondaryCurrency}</p>
    </div>
  )
}

export default ExchangeRate;
import React from 'react'
import "./CurrencyConverter.css"

import { useState,useEffect } from 'react'
import axios from 'axios'


const CurrencyConverter = () => {

    const [rates, setRates] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amout, setAmout] = useState(1);
    const [converterAmout, setConverterAmout] = useState(null);

    useEffect(()=>{
        axios.get(
            "https://v6.exchangerate-api.com/v6/33332548d2112393d3992002/latest/USD"
        )
        .then((response)=>{
            setRates(response.data.conversion_rates)
        }).catch((error)=>{
            console.log("Ocorreu um erro:", error)
        })
    },[]);

    useEffect(()=>{

        if(rates){
            const rateFrom = rates[fromCurrency] || 0;
            const rateTo = rates[toCurrency] || 0;
            setConverterAmout(((amout / rateFrom)*rateTo).toFixed(2))
        }
    },[amout,rates,fromCurrency,toCurrency])

    if(!rates){
        return<h1>Carregando...</h1>
    }
  return (
    <div className='converter'>
        <h2>Conversor de Moedas</h2>
        <input type="number" placeholder='Digite o valor...' value={amout} onChange={(e)=> setAmout(e.target.value)}/>
        <span>Selecione as moedas</span>
        <select value={fromCurrency} onChange={(e)=> setFromCurrency(e.target.value)}>
           {Object.keys(rates).map((currency)=>(
            <option value={currency} key={currency}>
                {currency}
            </option>
           ))}
        </select>
        <span> converter para</span>
        <select value={toCurrency} onChange={(e)=> setToCurrency(e.target.value)}>
        {Object.keys(rates).map((currency)=>(
            <option value={currency} key={currency}>
                {currency}
            </option>
           ))}
        </select>
        <h3>{converterAmout}{toCurrency}</h3>
        <p> {amout} {fromCurrency} valem {converterAmout}{toCurrency}</p>
    </div>
  )
}

export default CurrencyConverter
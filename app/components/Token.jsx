import { formatter } from "../../helpers/formatter";
function Token({amount,price,value,symbol,logo_url}){/* bg-slate-300*/ 
    return (
    <div class ="flex flex-wrap flex-col justify-center m-4"> 
        <div class ="self-auto">
            <h4>{symbol + ' '}</h4>
            <img class ="object-scale-down h-8 w-8"src={logo_url}/>
        </div>
        <div>
            <p>Amount: {amount}</p>
            <p>Price: {price}</p>
            <p>Value: {formatter.format(value)}</p>
        </div>
    </div>)
}

export {Token};
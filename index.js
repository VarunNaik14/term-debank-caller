import {getPortfolioFromAddress} from './apiCaller.js';
import {addDataToFile} from './fileCreator.js';


getPortfolioFromAddress('0x741aa7cfb2c7bf2a1e7d4da2e3df6a56ca4131f3')
    .then((data) => {
        data.forEach(function(protocol){
            addDataToFile('debank-leads.txt', protocol.name + '\n');
            console.log(protocol.name);
            let list = protocol.portfolio_item_list;
            for(var key in list ){
                console.log(key + " | " + list[key].stats.net_usd_value + ' | ' + list[key].name + ' | ' + list[key].detail.supply_token_list);

            }

        })
        
    })
    .catch(err => console.log(err));

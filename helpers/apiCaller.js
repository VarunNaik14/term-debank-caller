import axios from "axios";



const getPortfolioFromAddress =  async function(address) {
  let config = {
    method: 'get', 
    url: 'https://pro-openapi.debank.com/v1/user/all_complex_protocol_list',
    headers: {
      'accept': 'application/json',
      'AccessKey': '0ac87ffb582a30a47b4979d8ab704ae7c499929a', 
    },
    params: {
      id: '',
      chain_ids: 'bsc,eth,matic,op,arb,avax,evmos,tlos,nova,boba,celo',
    },
  };

config.params.id = address;
const returnData = (await axios(config)).data;

return returnData;

}

const queryArkham = async function(base_,flow_,limit_,usdGte_,timeLast_){
  const config = {
    method: "get",
    url: "https://api.arkhamintelligence.com/transfers",
    params: {
      base: base_,
      flow: flow_,
      limit: limit_,
      usdGte: usdGte_,
      timeLast: timeLast_,
    },
  }
  const returnData = (await axios(config)).data.transfers;

  return returnData;

}

export {getPortfolioFromAddress,queryArkham};
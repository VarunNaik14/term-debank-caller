'use client'
import * as React from 'react';
import { useState } from 'react';
import {Button,TextField, Autocomplete} from '@mui/material';
/*  method: "get",
  url: "https://api.arkhamintelligence.com/transfers",
  params: {
    base: "aave,compound,notional-finance,morpho,venus",
    flow: "in",
    limit: "9999",
    usdGte:"1000000",
    timeLast:"90d",*/

const protocolSelect = ['aave','compound','notional-finance','morpho','venus'];
const flowSelect = ['in','out','all'];
const tokenSelect = ['usd-coin','staked-ether','wrapped-steth','gho','ethereum','dai','savings-dai']

export default function Page(){

    const [protocols,setProtocols] = useState([]);
    const [flow,setFlow] = useState('all');
    const [transactionvalue,setTransactionValue] = useState(500000);
    const [recency,setRecency] = useState(90);
    const [tokens,setTokens] = useState([]);

  
    return(
        <div> 
            <Autocomplete
                value = {protocolSelect}
                onChange = {(event,newValue) => {
                    setProtocols(newValue);
                }}
                multiple
                id="select-protocol"
                options={protocolSelect}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Protocols"
                    placeholder="Protocols"
                />
                )}
            />
            
            <Autocomplete
                value = {flow}
                onChange = {(event,newValue) => {
                    setFlow(newValue);
                }}
                id="select-flow"
                options={flowSelect}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Flow"
                    placeholder="Flow"
                />
                )}
            />

            <TextField
                id="set-transaction-value"
                label="Transaction Value"
                type="number"
                value = {transactionvalue}
                onChange = {(event)=>{
                    setTransactionValue(event.target.value);
                    
                    
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />

            <TextField
                id="set-recency"
                label="Recency (in days)"
                type="number"
                value = {recency}
                onChange = {(event)=> {
                    setRecency(event.target.value);
                    
                    
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />  

            <Autocomplete
                value = {tokens}
                onChange = {(event,newValue) => {
                    setTokens(newValue);
                }}
                multiple
                id="select-tokens"
                options={tokenSelect}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Tokens"
                    placeholder="Tokens"
                />
                )}
            /> 

            <Button 
              variant="outlined" 
              onClick={() => {
              
                alert(flow);
                
              }}>
              Submit
            </Button>            
        </div>

        
    )
}

//
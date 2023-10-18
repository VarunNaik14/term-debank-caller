'use client'
import { ResultTable } from './components/Table'
import { filterUsersBySearchParams, getSearchParams } from "../firebase";
import Head from 'next/head';
import {useState,useEffect,useMemo} from 'react';
import * as React from 'react';
import {TextField, Autocomplete, Button, Stack} from '@mui/material';




export default function Page() {

  //protocol,supply,borrow values respectivley
  const [autoFillValues,setAutoFillValues] = useState([['loading'],['loading'],['loading']]);
  const[searchValues,setSearchValues] = useState([null,null,null]);


  const [tableData,setTableData] = useState([null,null]);

  useEffect(() => {
    getSearchParams().then((result) => {
     setAutoFillValues([result['all_protocols_used'],result['all_supplied_tokens'],result['all_borrowed_tokens']]);
    });
  }, []);

  const memoizedTable = useMemo(()=>{
    return <ResultTable {...{tableData}}/>
  })

    return (
      <div>
        <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <div class = "flex flex-row pt-10">
          <div class = "mx-0.5">
            <Autocomplete
              value={searchValues[0]}
              onChange={(event, newValue) => {
                const newSearchValues = searchValues.map((value,index) => {
                  if(index == 0){
                    return newValue;
                  }

                  else{
                    return value
                  }
                })
                setSearchValues(newSearchValues);
              }}

              id="protocol-value"
              options={autoFillValues[0]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Protocol" />}
          />
          </div>

          <div class ="mx-0.5">
            <Autocomplete
              value={searchValues[1]}
              onChange={(event, newValue) => {
                const newSearchValues = searchValues.map((value,index) => {
                  if(index == 1){
                    return newValue;
                  }

                  else{
                    return value
                  }
                })
                setSearchValues(newSearchValues);
              }}

              id="supply-token-value"
              options={autoFillValues[1]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Supply Token" />}
            />
          </div>
          
          <div class ="mx-0.5">
            <Autocomplete
              value={searchValues[2]}
              onChange={(event, newValue) => {
                const newSearchValues = searchValues.map((value,index) => {
                  if(index == 2){
                    return newValue;
                  }

                  else{
                    return value
                  }
                })
                setSearchValues(newSearchValues);
              }}

              id="borrow-token-value"
              options={autoFillValues[2]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Borrow Token" />}
            />
          </div>
          <div class = "ml-0.5">
            <Button 
              variant="outlined" 
              onClick={() => {
              
                filterUsersBySearchParams(searchValues).then((filteredusers) =>{
                  const copyOfSearchValues = [...searchValues];
                  setTableData([filteredusers,copyOfSearchValues]);
                })
                
              }}>
              Submit
            </Button>
          </div>
        </div>
       {memoizedTable}
      </div>
    )
  }


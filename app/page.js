'use client'
import { PortfolioResultTable } from './components/PortfolioResultTable';
import { InputFileUpload } from './components/InputFileUpload';
import { filterUsersBySearchParams, getSearchParams, getUnixes } from "../firebase";
import Head from 'next/head';
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Navbar } from './components/NavBar';





export default function Page() {

  console.log(`PortfolioResultTable ${PortfolioResultTable}`);
  console.log(`InputFileUpload ${InputFileUpload}`);
  console.log(`filterUsersBySearchParams ${filterUsersBySearchParams}`);
  console.log(`Head ${Head}`);
  console.log(`useState ${useState}`);
  console.log(`useEffect ${useEffect}`);
  console.log(`TextField ${TextField}`);
  console.log(`Autocomplete ${Autocomplete}`);
  console.log(`Button ${Button}`);
  console.log(`Navbar ${Navbar}`);
  console.log(`getSearchParams ${getSearchParams}`);
  console.log(`getUnixes ${getUnixes}`);
  //protocol,supply,borrow values respectivley
  const [autoFillValues,setAutoFillValues] = useState([['loading...'],['loading...'],['loading...']]);
  const[searchValues,setSearchValues] = useState([[],[],[]]);
  const [runDate,setRunDate] = useState(null);
  const[dateValues,setDateValues] = useState(['loading...']);
  const [dateToUnix,setDateToUnix] = useState({});
  
  const [tableData,setTableData] = useState([null,null]);

  useEffect(() => {
    getUnixes().then((result) =>{
      const unixToDate = result.map(unixTime =>{
        const date = new Date(parseInt(unixTime));
        const dateToDisplay = `${date.toLocaleDateString("en-US")} @ ${date.toLocaleTimeString("en-US")}`;
        setDateToUnix(prevState => ({...prevState, [dateToDisplay]: unixTime}));
        return dateToDisplay;
      })
      setDateValues(unixToDate);
    })
  }, []);



    return (
      <div>
        <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <div>
          <Navbar />
        </div>
        Select a dataset
        <div class ="flex flex-row pt-0.25">

          <div class ="basis-1/2">
            <Autocomplete 
              value = {runDate}
              onChange={(event, newValue) =>{
                setRunDate(newValue);
              }}
              id = "unix-value"
              options = {dateValues}
              renderInput={(params) => <TextField {...params} label="Select Dataset" />}
            />
          </div>
          <Button 
            variant='outlined'
            onClick={() =>{
              if(runDate){
                const unix = dateToUnix[runDate];
                getSearchParams(unix).then((result) => {
                  setAutoFillValues([result['all_protocols_used'],result['all_supplied_tokens'],result['all_borrowed_tokens']]);
                });
              }
            }}
            >
              Submit
          </Button>
        </div>

        <div>
          Or Upload a .csv file of addresses to create a new dataset
          <InputFileUpload />
        </div>

        {(autoFillValues[0][0] != "loading...")&& <div class = "flex flex-row pt-10">
          <div class = "mx-0.5">
            
            <Autocomplete
              multiple
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
              multiple
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
              multiple
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
          <div class = "ml-0.5 pt-0.5">
            <Button 
              variant="outlined" 
              onClick={() => {
                const unix = dateToUnix[runDate];
                filterUsersBySearchParams(searchValues,unix).then((filteredusers) =>{
                  setTableData([filteredusers,searchValues]);
                })
                
              }}>
              Submit
            </Button>
          </div>
        </div>}
        <PortfolioResultTable {...{tableData}}/>
      </div>
    )
  }


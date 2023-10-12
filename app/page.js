'use client'
import { Table } from './components/Table'
import { getSearchParams } from "../firebase";
import { SearchForm } from './components/SearchForm';
import Head from 'next/head';
import {useState,useEffect} from 'react';
import * as React from 'react';
import {TextField, Autocomplete, Button, Stack} from '@mui/material';




export default function Page() {

  const [protocolAutoFill, setProtocolAutoFill] = useState(['loading']);
  const [supplyTokensAutoFill, setSupplyTokensAutoFill] = useState(['loading']);
  const [borrowTokensAutoFill, setBorrowTokensAutoFill] = useState(['loading']);

  const [protocolValue, setProtocolValue] = useState('');
  const [supplyTokenValue, setSupplyTokenValue] = useState('');
  const [borrowTokenValue, setBorrowTokenValue] = useState('');

  useEffect(() => {
    getSearchParams().then((result) => {
      setProtocolAutoFill(result['all_protocols_used']);
      setSupplyTokensAutoFill(result['all_supplied_tokens']);
      setBorrowTokensAutoFill(result['all_borrowed_tokens']);
    });
  }, []);

    return (
      <div>
        <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <div class = "flex flex-row">
          <Autocomplete
            value={protocolValue}
            onChange={(event, newValue) => {
              setProtocolValue(newValue);
            }}

            id="protocol-value"
            options={protocolAutoFill}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Protocol" />}
          />

          <Autocomplete
            value={supplyTokenValue}
            onChange={(event, newValue) => {
              setSupplyTokenValue(newValue);
            }}

            id="supply-token-value"
            options={supplyTokensAutoFill}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Supply Token" />}
          />

          <Autocomplete
            value={borrowTokenValue}
            onChange={(event, newValue) => {
              setBorrowTokenValue(newValue);
            }}

            id="borrow-token-value"
            options={borrowTokensAutoFill}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Borrow Token" />}
          />

          <Button 
            variant="outlined" 
            onClick={() => {
              alert('clicked');
            }}
            >
            Submit
          </Button>
        </div>
        <Table {...{headers: ['yes','yeah','yup']}}/>
      </div>
    )
  }

  /*disableFocusRipple = {true}
  */
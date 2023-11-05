import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { formatter } from '../../helpers/formatter';


const columns = [
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'transactionValue', headerName: 'Transaction(s) Value', width: 130 },
  { field: 'tokens', headerName: 'Tokens', width: 180 },
];




const ArkhamResultTable = function({arkhamData}){
  let rows = [];
  for(const key of Object.keys(arkhamData)){
    rows.push({
      address: arkhamData[key].address,
      transactionValue:formatter.format(arkhamData[key].txValue),
      tokens:arkhamData[key].transactedTokens.toString()})
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export {ArkhamResultTable};
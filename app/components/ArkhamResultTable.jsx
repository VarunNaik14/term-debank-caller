import * as React from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { formatter } from '../../helpers/formatter';







const ArkhamResultTable = function({arkhamData}){

    const columns = [
      { field: 'address', headerName: 'Address', width: 350 },
      { field: 'transactionValue', headerName: 'Transaction(s) Value', width: 200 },
      { field: 'tokens', headerName: 'Tokens', width: 800 },
    ];

    let rows = [];
    for(const key of Object.keys(arkhamData)){
      rows.push({
        id:key,
        address: arkhamData[key].address,
        transactionValue:arkhamData[key].txValue,
        tokens:arkhamData[key].transactedTokens.toString()})
    }


    
    return (
      <div style={{ height: 1200, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[5, 10,50,100]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}

        />
      </div>
    )
}

export {ArkhamResultTable};
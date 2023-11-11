/*
import * as React from 'react';
import { memo } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow, colors} from '@mui/material';
import { formatter } from '../../helpers/formatter';
*/
import * as React from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { formatter } from '../../helpers/formatter';







const PortfolioResultTable = function({tableData}){
    
    const userData = tableData[0];
    const additionalColumns= tableData[1];

    if(tableData[0] != null){

        //fixed columns
        let columns = [
            { id: 'address', label: 'Address', minWidth: 170 },
            {
              id: 'total_supplied_value',
              label: 'Size Lender (All Protocols)',
              minWidth: 170,
              align: 'right',
              format: (value) => formatter.format(value),
            },
            {
              id: 'total_borrowed_value',
              label: 'Size Borrower (All Protocols)',
              minWidth: 170,
              align: 'right',
              format: (value) => formatter.format(value),
            },
          ];

        //adds dynamic columns to column array
        let index = 0;
        for(var parameters of additionalColumns){
            if(index == 0 && parameters.length != 0){
                columns.push({id: parameters.toString(),label:'Protocol(s)',minWidth:170,align:'right'})
            }
            else if(index == 1 && parameters.length != 0){
                columns.push({id: parameter,label:'Supply Token',minWidth:170,align:'right'})
            }
            else if(index == 2 && parameters.length != 0){
                columns.push({id: parameter,label:'Borrow Token',minWidth:170,align:'right'})
            }
        index++;
        }

        let rows = [];
        for(const user of userData){

            let rowData = {id: user.address};
            for(const col of columns){
                switch(col.label) {
                    case 'Size Lender (All Protocols)':
                    case 'Size Borrower (All Protocols)':
                        rowData[col.id] = formatter.format(user[col.id]);
                        break;
                    case 'Address':
                        rowData[col.id] = user[col.id];
                        break;
                    
                    case 'Protocol(s)':
                        rowData[col.id] = col.id;
                        break;
                    case 'Supply Token':
                        rowData[col.id] = `${formatter.format(user.total_supplied_tokens[col.id].value)} of ${col.id}`
                        break;
                    case 'Borrow Token':
                        rowData[col.id] = `${formatter.format(user.total_borrowed_tokens[col.id].value)} of ${col.id}`
                        break;

                }
            }
            rows.push(rowData);
        }

        return (
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                onRowDoubleClick={(params) =>{window.open(`https://debank.com/profile/${params.row.address}`)}}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 100 },
                  },
                }}
                pageSizeOptions={[5, 10,50,100]}
                //checkboxSelection 
                slots={{ toolbar: GridToolbar }}
      
              />
            </div>
          )
    }

    
}

/*
const PortfolioResultTable =  function({tableData}) {
   
    const userData = tableData[0];
    
    const additionalColumns= tableData[1];
 
    if(tableData[0] != null){
        //fixed columns
        let columns = [
            { id: 'address', label: 'Address', minWidth: 170 },
            {
              id: 'total_supplied_value',
              label: 'Size Lender (All Protocols)',
              minWidth: 170,
              align: 'right',
              format: (value) => formatter.format(value),
            },
            {
              id: 'total_borrowed_value',
              label: 'Size Borrower (All Protocols)',
              minWidth: 170,
              align: 'right',
              format: (value) => formatter.format(value),
            },
          ];

        //adds dynamic columns to column array
        let index = 0;
        for(var parameters of additionalColumns){
            if(index == 0 && parameters.length != 0){
                columns.push({id: parameters.toString(),label:'Protocol(s)',minWidth:170,align:'right'})
            }
            else if(index == 1 && parameters.length != 0){
                columns.push({id: parameter,label:'Supply Token',minWidth:170,align:'right'})
            }
            else if(index == 2 && parameters.length != 0){
                columns.push({id: parameter,label:'Borrow Token',minWidth:170,align:'right'})
            }
        index++;
        }

        let rows = [];
        for(const user of userData){

            let rowData = {};
            for(const col of columns){
                switch(col.label) {
                    case 'Size Lender (All Protocols)':
                    case 'Size Borrower (All Protocols)':
                        rowData[col.id] = formatter.format(user[col.id]);
                        break;
                    case 'Address':
                        rowData[col.id] = user[col.id];
                        break;
                    
                    case 'Protocol(s)':
                        rowData[col.id] = col.id;
                        break;
                    case 'Supply Token':
                        rowData[col.id] = `${formatter.format(user.total_supplied_tokens[col.id].value)} of ${col.id}`
                        break;
                    case 'Borrow Token':
                        rowData[col.id] = `${formatter.format(user.total_borrowed_tokens[col.id].value)} of ${col.id}`
                        break;

                }
            }
            rows.push(rowData);
        }


        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.id === 'address'
                                    ? <a href={`https://debank.com/profile/${value}`} 
                                        target="_blank"
                                        > 
                                        {value}
                                    </a>
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        );
    }
}*/

export {PortfolioResultTable} ;
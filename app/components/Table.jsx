import * as React from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow, colors} from '@mui/material';
import { formatter } from '../../helpers/formatter';

/* Columns: address, supply value, borrow value, ...searchParams */



function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}



export default function ResultTable({tableData}) {
   
    const userData = tableData[0];

    const searchValues = tableData[1];
    if(tableData[0] != null){
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


        let index = 0;
        for(var parameter of searchValues){
            if(index == 0 && parameter != null){
                columns.push({id: parameter,label:'Protocol',minWidth:170,align:'right'})
            }
            else if(index == 1 && parameter != null){
                columns.push({id: parameter,label:'Supply Token',minWidth:170,align:'right'})
            }
            else if(index == 2 && parameter != null){
                columns.push({id: parameter,label:'Borrow Token',minWidth:170,align:'right'})
            }
        index++;
        }
        let rows = [];
        for(const user of userData){
            const map = ['protocols_used','total_supplied_tokens','total_borrowed_tokens'];
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
                    
                    case 'Protocol':
                        rowData[col.id] = col.id;
                        break;
                    case 'Supply Token':
                        rowData[col.id] = `${formatter.format(user.total_supplied_tokens[col.id].value)} of ${col.id}`
                        break;
                    case 'Borrow Token':
                        rowData[col.id] = `${formatter.format(user.total_borrowed_tokens[col.id].value)} of ${col.id}`
                        break;

                }
            rows.push(rowData);

            }
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
}

export {ResultTable} ;
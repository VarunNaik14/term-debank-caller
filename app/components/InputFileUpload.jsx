import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { useState } from "react";
import { propagateFirestore } from "../..";
import CheckIcon from '@mui/icons-material/Check';
const InputFileUpload = function() {

  const [addressArray, setAddressArray] = useState([]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      setAddressArray( reader.result.split(','));
    };

  };

  return (
    <div class ="flex flex-row">
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="upload-file">
          <Button variant="contained" component="span">
            Upload
          </Button>
          <input
            id="upload-file"
            hidden
            accept=".csv,.txt"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
      {(addressArray.length >0) && <div>Upload Complete<CheckIcon color="green"/></div>}    
      </Stack>
      <Button
        variant= "contained"
        onClick={()=>{
          if(confirm(`Are you sure you want to create a dataset of the portfolios of ${addressArray.length} addresses?`) == true)
            propagateFirestore(addressArray).then(() => {setAddressArray([])});
        }}>
        Create Dataset 
      </Button>
    </div>

    );
}

export {InputFileUpload}
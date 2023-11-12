import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

const InputFileUpload = function() {


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      console.log( reader.result.split(','));
    };

  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
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
      </Stack>
    </Container>

    );
}

export {InputFileUpload}
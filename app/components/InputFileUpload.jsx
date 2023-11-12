import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const InputFileUpload = function() {
    return (
        
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
        </Button>
    </Stack>
    );
}

export {InputFileUpload}
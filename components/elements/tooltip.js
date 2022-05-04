// Tooltip Component to Render Tooltips Across UI

// Package Imports
import {IconButton, Tooltip, styled, Alert, AlertTitle} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React, {useState} from "react";
import {connect} from "react-redux";

// Local Imports


// Tooltip Component
const MyTooltip = ({ toggleLanguage, text, title }) => {

    const [open, setOpen] = useState(false);

    return (
        <StyledTooltip open={open} onClose={() => setOpen(false)} title={
            <Alert sx={{border: `1px solid #2196F3`}} severity={"info"}>
                <AlertTitle>{title}</AlertTitle>
                {text}
            </Alert>
        }>
            <IconButton onClick={() => setOpen(true)}>
                <InfoIcon style={{ fill: `#2196F3` }}/>
            </IconButton>
        </StyledTooltip>
    )
}

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
    font-size: 14px;
    padding: 0;
    border-radius: 5px;
`);


export default connect((state) => state)(MyTooltip);
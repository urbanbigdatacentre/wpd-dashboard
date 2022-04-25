// Button Element to be used in all cases of button across UI
import React from "react";
import Button from '@mui/material/Button';
import {styled} from "@mui/material";

export default class MyButton extends React.Component {

    render() {
        return (
            <MyButtonStyled variant="contained">
                {this.props.text}
            </MyButtonStyled>
        );
    }
}

const MyButtonStyled = styled(Button)(({theme}) => ({
    width: `max-content`,
    boxShadow: `0px 0px 15px rgba(33, 150, 243, 0.5)`
}))


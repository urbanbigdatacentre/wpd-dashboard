// Button Element to be used in all cases of button across UI
import React from "react";
import Button from '@mui/material/Button';
import {styled} from "@mui/material";

export default class MyButton extends React.Component {



    render() {

        // Set Design Variables depending on type of Button
        const boxShadow = this.props.variant === "outlined" ? `none` : `0px 0px 15px rgba(33, 150, 243, 0.5)`

        return (
            <MyButtonStyled variant={this.props.variant} sx={{boxShadow: boxShadow}} onClick={this.props.onClick}>
                {this.props.text}
            </MyButtonStyled>
        );
    }
}

const MyButtonStyled = styled(Button)(({theme}) => ({
    width: `max-content`
}))


// Button Element to be used in all cases of button across UI
import React from "react";
import Button from '@mui/material/Button';
import {styled} from "@mui/material";

export default class MyButton extends React.Component {

    colorConverter(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 0.5)`

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    render() {

        // Set Design Variables depending on type of Button
        const boxShadow = this.props.variant === "outlined" ? `none` : `0px 0px 15px rgba(33, 150, 243, 0.5)`

        if (!this.props.addMargin) {
            return (
                <MyButtonStyled value={this.props.value} variant={this.props.variant} sx={{boxShadow: boxShadow,
                }} onClick={this.props.onClick}>
                    {this.props.text}
                </MyButtonStyled>
            );
        } else {
            return (
                <MyButtonStyled value={this.props.value} variant={(this.props.preferredLocation) && (this.props.addMargin)  && (!this.props.variant !== 'contained')? this.props.variant : "outlined"} sx={{
                    boxShadow: this.props.color ? ` 0px 0px 15px ${this.colorConverter(this.props.color)}` : `0px 0px 15px rgba(33, 150, 243, 0.)`,
                    backgroundColor: (this.props.preferredLocation) && (this.props.addMargin) ? this.props.color : `rgba(255, 255, 255, 0.8)`,
                    marginRight: this.props.addMargin ? this.props.addMargin : `0px`,
                    border: this.props.color ? `1.5px solid ${this.props.color}`: `1.5px solid #2196F3`,
                    color: (this.props.color) && (!this.props.preferredLocation) ? this.props.color: `none`,
                    '&:hover': {
                        border: this.props.color ? `1.5px solid ${this.props.color}`: `1.5px solid #2196F3`,
                        backgroundColor: (this.props.preferredLocation) && (this.props.addMargin) ? this.props.color : `rgba(255, 255, 255, 0.7)`,
                        boxShadow: 'none',
                    }
                }} onClick={this.props.onClick}>
                    {this.props.text}
                </MyButtonStyled>
            );
        }
    }
}

const MyButtonStyled = styled(Button)(({theme}) => ({
    width: `max-content`
}))


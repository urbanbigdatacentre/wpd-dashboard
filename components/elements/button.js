// Button Element to be used in all cases of button across UI
import React from "react";
import Button from '@mui/material/Button';

export default class MyButton extends React.Component {

    render() {
        return (
            <Button variant="contained">
                {this.props.text}
            </Button>
        );
    }
}


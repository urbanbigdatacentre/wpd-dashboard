
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3',
            backgroundColor: '#fff',
        },
        secondary: {
            main: '#1565C0',
        },
        error: {
            main: red.A400,
        },
        text: {
            primary: '#161616',
            secondary: '#2196F3',
            white: '#fff'
        },
    },
    typography: {
        fontFamily: ['Rubik', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif;' ].join(','),
        color: '#161616',
        weights: {
            heavy: 700,
            regular: 300
        },
        title: {
            fontSize: 60,
            fontWeight: 700
        },
        button: {
            fontWeight: 700
        }
    }
});

export default theme;
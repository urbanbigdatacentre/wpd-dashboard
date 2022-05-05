
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3',
            darkBlue: '#1565C0',
            black: '#161616',
            green: '#66BB6A',
            light: '#fff',
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
        pageTitle: {
            fontSize: 60,
            fontWeight: 700
        },
        title: {
            fontSize: 45,
            fontWeight: 700
        },
        topBlue: {
            fontSize: 20,
            fontWeight: 700,
            color: '#2196F3'
        },
        button: {
            fontWeight: 700
        }
    },
    shape: {
        borderRadius: '5px'
    }
});

export default theme;
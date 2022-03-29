
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3',
            backgroundColor: '#fff',
            textColor: '#161616'
        },
        secondary: {
            main: '#1565C0',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: ['Rubik', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif;' ].join(','),
        title1: {
            fontSize: 60,
            fontWeight: 700
        },
        paragraph1: {
            fontSize: 18,
            fontWeight: 300
        }
    }
});

export default theme;
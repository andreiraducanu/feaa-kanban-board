import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0052CC',
        },
        background: {
            default: '#FFFFFF'
        }
    },
    typography: {
        allVariants: {
            color: '#172B4D'
        },
        button: {
            textTransform: 'none'
        },
    },
});

export default theme;
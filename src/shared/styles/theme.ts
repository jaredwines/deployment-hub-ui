import {createTheme} from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        background: {
            default: '#f8f9fc'
        }
    }
});
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
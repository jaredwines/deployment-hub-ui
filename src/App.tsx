import React, {useCallback, useEffect, useState} from 'react';
import {Provider} from 'react-redux'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import DeploymentForm from "./components/deployment-form/DeploymentForm";
import DevControls from "./components/dev-controls/DevControls";

import store from './store'
import Logs from "./components/logs/Logs";
import './App.scss';
import {darkTheme, lightTheme} from "./shared/styles/theme";
import {Box, IconButton, ThemeProvider, useMediaQuery} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Create a client
const queryClient = new QueryClient()

type Theme = 'light' | 'dark'

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [selectedTheme, setSelectedTheme] = useState<Theme>(prefersDarkMode ? 'dark' : 'light');
    const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme)

    const switchTheme = useCallback(() => {
        let newTheme: Theme = selectedTheme === 'light' ? 'dark' : 'light';
        setSelectedTheme(newTheme);
    },[setSelectedTheme, selectedTheme])

    useEffect(() => {
        setTheme((selectedTheme === 'dark')? darkTheme : lightTheme)
    }, [selectedTheme]);

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={'page'}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.default',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                            }}
                        >
                            {theme.palette.mode} mode
                            <IconButton sx={{ ml: 1 }} onClick={() => switchTheme()} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Box>
                        <DevControls/>
                        <DeploymentForm/>
                        <Logs/>
                    </div>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;

import React, {useCallback, useEffect, useState} from 'react';
import {Provider} from 'react-redux'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import DeploymentForm from "./components/deployment-form/DeploymentForm";
import DevControls from "./components/dev-controls/DevControls";

import store from './store'
import Logs from "./components/logs/Logs";
import './App.scss';
import {darkTheme, lightTheme} from "./shared/styles/theme";
import {ThemeProvider, useMediaQuery} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import ThemeControl from "./components/theme-control/ThemeControl";

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
                        <ThemeControl theme={theme} onClick={switchTheme} />
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

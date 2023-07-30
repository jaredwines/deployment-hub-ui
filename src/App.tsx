import React from 'react';
import { Provider } from 'react-redux'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import DeploymentForm from "./components/deployment-form/DeploymentForm";
import DevControls from "./components/dev-controls/DevControls";

import store from './store'
import Logs from "./components/logs/Logs";

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <div className={'page'}>
                  <DevControls />
                  <DeploymentForm/>
                  <Logs/>
              </div>
          </QueryClientProvider>
      </Provider>
  );
}

export default App;

import React, {useState} from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import DeploymentForm from "./components/deployment-form/DeploymentForm";
import DevControls from "./components/dev-controls/DevControls";

// Create a client
const queryClient = new QueryClient()

function App() {
    const [isDevMode, setIsDevMode] = useState(false)
  return (
      <QueryClientProvider client={queryClient}>
          <div className={'page'}>
              <DevControls onClick={() => setIsDevMode(!isDevMode)} />
              <DeploymentForm isDev={isDevMode}/>
          </div>
      </QueryClientProvider>
  );
}

export default App;

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import DeploymentForm from "./components/deployment-form/DeploymentForm";

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <DeploymentForm/>
      </QueryClientProvider>
  );
}

export default App;

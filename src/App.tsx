import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Switch, Route } from 'wouter';
import './App.css';
import { MainRoutes } from './routes/main-routes';
import { queryClient } from './lib/queryClient';
import Layout from './components/layout';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Switch>
          <Layout>
            {MainRoutes.map((route, index) => (
              <Route {...route} key={index} />
            ))}
          </Layout>
        </Switch>
      </NextUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

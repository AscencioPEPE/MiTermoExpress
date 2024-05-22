import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Switch, Route } from 'wouter';
import './App.css';
import { MainRoutes } from './routes/main-routes';
import { queryClient } from './lib/queryClient';
import Layout from './components/layout';
import { NextUIProvider } from '@nextui-org/react';
import 'react-modern-drawer/dist/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/notfound/not-found';
import { Suspense } from 'react';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Layout>
          <Suspense>
            <Switch>
              {MainRoutes.map((route, index) => (
                <Route {...route} key={index} />
              ))}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="dark"
          />
        </Layout>
      </NextUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

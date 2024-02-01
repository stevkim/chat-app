import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import MessagePage from './containers/MessagePage.tsx'
import RoomSelect from './containers/RoomSelect.tsx'
import './index.css'
import { RouterProvider, createRoute, createRootRoute, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* initialize queryClient for react-query */
const queryClient = new QueryClient();

/* Routes for page routing */
const rootRoute = createRootRoute({
  component: App,
})

const roomSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RoomSelect
})

const messageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/$room`,
  component: MessagePage
})

/* Putting routes together and creating the router */
const routeTree = rootRoute.addChildren([roomSelectRoute, messageRoute]);
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} />
  </QueryClientProvider>
)

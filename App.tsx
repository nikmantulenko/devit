import { Provider as StoreProvider } from 'react-redux'

import Navigation from './Navigation';
import store from './store';

export default function App() {
  return (
      <StoreProvider store={store}>
          <Navigation />
      </StoreProvider>
  );
}
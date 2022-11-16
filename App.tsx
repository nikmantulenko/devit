import { Provider as StoreProvider } from 'react-redux'
import { useFonts } from 'expo-font';

import Navigation from './Navigation';
import store from './store';

export default function App() {
  const [fontsLoaded] = useFonts({
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
      return null
  }

  return (
      <StoreProvider store={store}>
          <Navigation />
      </StoreProvider>
  );
}
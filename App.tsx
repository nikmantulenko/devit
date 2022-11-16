import { Provider as StoreProvider } from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useFonts } from 'expo-font';
import Navigation from './Navigation';
import store from './store';

import globalStyles from './globalStyles';

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
          <SafeAreaProvider>
              <KeyboardAvoidingView
                  style={globalStyles.flex1}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                  <SafeAreaView style={globalStyles.flex1} edges={['top']}>
                      <Navigation />
                  </SafeAreaView>
              </KeyboardAvoidingView>
          </SafeAreaProvider>
      </StoreProvider>
  );
}
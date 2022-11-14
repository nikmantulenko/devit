import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as StoreProvider } from 'react-redux'

import LogIn from './screens/LogIn';
import Register from './screens/Register';
import Profile from './screens/Profile';
import store from './store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <StoreProvider store={store}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="log-in" component={LogIn} options={{ headerShown: false }} />
                  <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                  <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
              </Stack.Navigator>
          </NavigationContainer>
      </StoreProvider>
  );
}
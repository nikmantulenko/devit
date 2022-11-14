import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useRef, RefObject } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogIn from './screens/LogIn';
import Register from './screens/Register';
import Profile from './screens/Profile';
import { selectors } from './store';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const isAuthorized = useSelector(selectors.isAuthorizedSelector)
    const navigationContainerRef: RefObject<NavigationContainerRef<any>> = useRef() as any

    useEffect(function handleAuthorizationChange() {
        if (navigationContainerRef.current == null) {
            throw new Error('unexpected behavior')
        }
        if (isAuthorized === true) {
            navigationContainerRef.current.navigate('profile')
        } else {
            navigationContainerRef.current.navigate('log-in')
        }
    }, [isAuthorized])

    return (
        <NavigationContainer ref={navigationContainerRef}>
            <Stack.Navigator>
                {isAuthorized && (
                    <>
                        <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
                    </>
                )}
                {!isAuthorized && (
                    <>
                        <Stack.Screen name="log-in" component={LogIn} options={{ headerShown: false }} />
                        <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
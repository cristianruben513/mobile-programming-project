import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './signUp';
import { RootStackParamList } from '@/types/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthNavigator() {
    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator initialRouteName="SignUp">
    //             <Stack.Screen name="SignUp" component={SignUp} />
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );
}

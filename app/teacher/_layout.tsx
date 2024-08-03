import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Selection from './selection';
import Grades from './grades';
import Assists from './assists';
import { RootStackParamList } from '@/types/types';

const RootStack = createStackNavigator<RootStackParamList>();

const TeacherRootLayout: React.FC = () => {
    return (
        <RootStack.Navigator initialRouteName="Selection">
            <RootStack.Screen name="Selection" component={Selection} initialParams={{ class_id: 1 }} />
            <RootStack.Screen name="Grades" component={Grades} initialParams={{ class_id: 1 }} />
            <RootStack.Screen name="Assists" component={Assists} initialParams={{ class_id: 1 }} />
        </RootStack.Navigator>
    );
};

export default TeacherRootLayout;

// types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    SignUp: undefined;
    RoleFill: { role: string };
};

export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type RoleFillScreenRouteProp = RouteProp<RootStackParamList, 'RoleFill'>;

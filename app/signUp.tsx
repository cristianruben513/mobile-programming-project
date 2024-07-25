import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short!').required('Required'),
});

interface SignUpProps {
    setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsSignedUp }) => {
    return (
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
        console.log(values);
        // Set the sign-up status to true
        setIsSignedUp(true);
    }}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
            />
            {errors.email && touched.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
            />
            {errors.password && touched.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <Button onPress={() => handleSubmit()} title="Sign Up" />
        </View>
        )}
    </Formik>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
},
input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
},
errorText: {
    color: 'red',
    marginBottom: 12,
},
});

export default SignUp;

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { login, useMyContextController } from '../store'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const hasErrorEmail = () => !email.includes('@')
    const hasErrorPass = () => password.length < 6
    const [controller, dispatch] = useMyContextController()
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin != null) 
        {
            if(userLogin.role == 'admin')
                navigation.navigate('Admin')
            else
                navigation.navigate('Customer')
        }
    }, [userLogin])

    const onSubmit = () => {
        login(dispatch, email, password);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', alignSelf: 'center', color: 'pink', marginBottom: 30 }}>
                Login
            </Text>
            <TextInput placeholder='email' value={email} onChangeText={setEmail}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorEmail()}>
                Sai mail
            </HelperText>
            <TextInput placeholder='password' value={password} onChangeText={setPassword}
                secureTextEntry={showPassword}
                style={{ margin: 10 }}
                right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorPass()}>
                Sai PassWord
            </HelperText>
            <Button mode='contained-tonal' onPress={() => onSubmit()} buttonColor='pink'
                style={{
                    margin: 10,
                    padding: 5
                }}
                labelStyle={{
                    fontSize: 20
                }}
            >
                Đăng nhập
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Don't have an account ?</Text>
                <Button onPress={() => navigation.navigate('Register')}>
                    create new account
                </Button>
            </View>
        </View>
    )
}

export default Login
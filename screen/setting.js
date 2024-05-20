import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useMyContextController, logout } from '../store'
import { Button } from 'react-native-paper';

export default Setting = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    const onSubmit = () => {
        logout(dispatch)
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button mode='contained' onPress={onSubmit}>Đăng xuất</Button>
        </View>
    )
}

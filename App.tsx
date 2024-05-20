import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { MyContextControllerProvider } from './store'
import Login from './screen/login'
import Register from './screen/register'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Router from './screen/router'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'

const initial = () => {
  const USERS = firestore().collection("USERS")
  const admin = {
    name: "admin",
    phone: "09111111",
    address: "Binh Duong",
    email: "huutv@tdmu.edu.vn",
    password: "123456",
    role: "admin"
  }
  USERS.doc(admin.email)
    .onSnapshot(u => {
      if (!u.exists) {
        auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() =>
            USERS.doc(admin.email).set(admin)
              .then(() => console.log("Add new user admin !"))
          )
      }
    })
}

const App = () => {
  useEffect(() => {
    initial();
  }, [])
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}

export default App
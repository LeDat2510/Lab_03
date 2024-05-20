import 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useMyContextController } from '../store'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './login'
import Admin from './admin'
import Customer from './customer'
import Register from './register'
import services from './services'
import { useNavigation } from '@react-navigation/native'
import { Icon, MD3Colors } from 'react-native-paper'
import setting from './setting'
import RouterServices from './RouterServices'
import RouterCustomerServices from './RouterCustomerServices'

const Stack = createStackNavigator();

export default Router = () => {

  return (
    <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Admin' component={Admin} />
      <Stack.Screen name='Customer' component={Customer} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='RouterServices' component={RouterServices} />
      <Stack.Screen name='RouterCustomerServices' component={RouterCustomerServices} />
    </Stack.Navigator>
  )
}

/*
const Tab = createBottomTabNavigator();

const AdminRouter = () => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f5456e'
      }}
    >
      <Tab.Screen name={userLogin ? userLogin.name : "Admin"} component={Admin}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (<Icon
            source="home"
            color={color}
            size={size}
          />
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <Icon source="account-circle" size={30} color='white' />
            </View>
          ),
          headerStyle: {backgroundColor: '#f5456e'},
          headerTintColor: 'white'
        }}
      />
      <Tab.Screen name="Transaction" component={Admin}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color, size }) => (<Icon
            source="cash"
            color={color}
            size={size}
          />
          )
        }}
      />
      <Tab.Screen name="Customer" component={Admin}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color, size }) => (<Icon
            source="account-multiple"
            color={color}
            size={size}
          />
          )
        }}
      />
      <Tab.Screen name="Setting" component={setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (<Icon
            source="cog-outline"
            color={color}
            size={size}
          />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const CustomerRouter = () => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f5456e'
      }}
    >
      <Tab.Screen name={userLogin.name} component={Customer} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (<Icon
            source="home"
            color={color}
            size={size}
          />
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <Icon source="account-circle" size={30} color='white'/>
            </View>
          ),
          headerStyle: {backgroundColor: '#f5456e'},
          headerTintColor: 'white'
        }}
      />
      <Tab.Screen name="Transaction" component={Customer}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color, size }) => (<Icon
            source="cash"
            color={color}
            size={size}
          />
          )
        }}
      />
      <Tab.Screen name="Customer" component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color, size }) => (<Icon
            source="account-multiple"
            color={color}
            size={size}
          />
          )
        }}
      />
      <Tab.Screen name="Setting" component={setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (<Icon
            source="cog-outline"
            color={color}
            size={size}
          />
          )
        }}
      />
    </Tab.Navigator>
  );
};

*/


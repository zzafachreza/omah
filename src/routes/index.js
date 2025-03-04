import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  DestinasiWisata,
  OleholehUMKM,
  SewaTransport,
  SharingPengalaman,
  TambahPengalaman,
  PanduanWisata,
  Detail,
  RekomendasiKuliner,
  Labs


} from '../pages';
import { colors } from '../utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';
import PanduanDetail from '../pages/Menu/panduandetail';



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Splash' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DestinasiWisata"
        component={DestinasiWisata}
        options={{
          headerShown: false,

        }}
      />




      <Stack.Screen
        name="RekomendasiKuliner"
        component={RekomendasiKuliner}
        options={{
          headerShown: false,

        }}
      />



      <Stack.Screen
        name="OleholehUMKM"
        component={OleholehUMKM}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Labs"
        component={Labs}
        options={{
          headerShown: false,

        }}
      />




      <Stack.Screen
        name="SewaTransport"
        component={SewaTransport}
        options={{
          headerShown: false,

        }}
      />




      <Stack.Screen
        name="SharingPengalaman"
        component={SharingPengalaman}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="TambahPengalaman"
        component={TambahPengalaman}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="PanduanWisata"
        component={PanduanWisata}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="PanduanDetail"
        component={PanduanDetail}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />
















    </Stack.Navigator>
  );
}

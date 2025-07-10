import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Drawer from './Drawer/Drawer';
import navigationService from './navigationService';
import ChangePassword from './Screens/ChangePassword';
import LoginScreen from './Screens/LoginScreen';
import Profile from './Screens/Profile';
import ResetPassword from './Screens/ResetPassword';
import Signup from './Screens/Signup';
import VerifyEmail from './Screens/VerifyEmail';
import VerifyNumber from './Screens/VerifyNumber';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import SplashScreen from './Screens/SplashScreen';
import StartScreen from './Screens/StartScreen';
import PostLoadScreen from './Screens/PostLoadScreen';
import CarDirectory from './Screens/CarDirectory';
import Alerts from './Screens/Alerts';
import Menu from './Screens/Menu';
import SelectRoute from './Screens/SelectRoute';
import ViewLeadBoard from './Screens/ViewLeadBoard';
import CreateRoute from './Screens/CreateRoute';
import LoadDetails from './Screens/LoadDetails';
import PostScreen from './Screens/PostScreen';
import ServicesScreen from './Screens/ServicesScreen';
import LoadBoard from './Screens/LoadBoard';
import SelecteArea from './Screens/SelecteArea';
import Help from './Screens/Help';

enableScreens();
const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  console.log('🚀 ~ AppNavigator ~ walkThrough:', walkThrough);
  const role = useSelector(state => state.authReducer.role);
  console.log('🚀 ~ AppNavigator ~ role:', role);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ AppNavigator ~ token:', token);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'WalkThroughScreen'
        : token != null
        ? 'MyDrawer'
        : 'SelecteArea';

    console.log('asdasdfasdf token ================>', firstScreen, token);

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          // initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen name="CarDirectory" component={CarDirectory} />
          <RootNav.Screen name="Alerts" component={Alerts} />
          <RootNav.Screen name="Menu" component={Menu} />
          <RootNav.Screen name="SelecteArea" component={SelecteArea} />
          <RootNav.Screen name="StartScreen" component={StartScreen} />

          <RootNav.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="VerifyEmail" component={VerifyEmail} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="Profile" component={Profile} />
          <RootNav.Screen name="SplashScreen" component={SplashScreen} />
          <RootNav.Screen name="Help" component={Help} />
          <RootNav.Screen name="ViewLeadBoard" component={ViewLeadBoard} />
          <RootNav.Screen name="CreateRoute" component={CreateRoute} />
          <RootNav.Screen name="LoadDetails" component={LoadDetails} />
          <RootNav.Screen name="PostScreen" component={PostScreen} />
          {/* <RootNav.Screen name="PostLoadScreen" component={PostLoadScreen} /> */}
          {/* <RootNav.Screen name="LoadBoard" component={LoadBoard} /> */}
          <RootNav.Screen name="ServicesScreen" component={ServicesScreen} />

          {/* <RootNav.Screen name="PostLoadScreen" component={ca} /> */}
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

// export const TabNavigation = () => {
//   const Tabs = createBottomTabNavigator();
//   return (
//     <Tabs.Navigator
//       // tabBar={(props) => {
//       //   return (
//       //     <LinearGradient
//       //       colors={['red', 'blue']}

//       //       start={[1, 0]}
//       //       end={[0, 0]}
//       //     >
//       //       <BottomTabBar
//       //         {...props}
//       //         style={{ backgroundColor: 'transparent' }}
//       //       />
//       //     </LinearGradient>
//       //   );
//       // }}
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           // backgroundColor:'pink',
//           // backgroundColor: Color.red,
//           // borderTopLeftRadius:15,
//           // borderTopRightRadius:15,
//           // paddingVertical:5
//         },
//         tabBarIcon: ({focused}) => {
//           let iconName;
//           let color = Color.theme2;
//           let size = moderateScale(20, 0.3);
//           let type = Ionicons;

//           // if (route.name === 'HomeScreen') {
//           //   iconName = focused ? 'home' : 'home-outline';

//           //   color = focused ? Color.theme2 : Color.white;
//           //   size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           // } else
//           if (route.name === 'Donation') {
//             iconName = focused ? 'donate' : 'donate';
//             type = FontAwesome5;
//             color = focused ? Color.theme2 : Color.white;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'StoreScreen') {
//             iconName = focused ? 'cart' : 'cart';
//             color = focused ? Color.theme2 : Color.white;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route?.name == 'Campaigns') {
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else {
//             iconName = focused ? 'settings-sharp' : 'settings-outline';
//             color = focused ? Color.theme2 : Color.white;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           }
//           return route.name == 'Campaigns' ? (
//             <View
//               style={{
//                 borderWidth: 5,
//                 borderColor: Color.lightGrey,
//                 height: moderateScale(60, 0.3),
//                 width: moderateScale(60, 0.3),
//                 borderRadius: moderateScale(30, 0.3),
//                 backgroundColor: Color.theme2,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: moderateScale(-30, 0.3),
//               }}>
//               <Icon
//                 name={'search'}
//                 as={Feather}
//                 color={Color.white}
//                 size={size}
//               />
//             </View>
//           ) : (
//             <Icon name={iconName} as={type} color={color} size={size} />
//           );
//         },
//         tabBarShowLabel: false,
//         tabBarBackground: () => (
//           <View style={{flex: 1}}>
//             <LinearGradient
//               start={{x: 0, y: 0}}
//               end={{x: 0, y: 1}}
//               colors={Color.tabBarGradient}
//               style={{height: windowHeight * 0.1}}
//             />
//           </View>
//         ),
//       })}>
//       {/* <Tabs.Screen name={'HomeScreen'} component={HomeScreen} /> */}
//       {/* <Tabs.Screen name={'Donation'} component={Donation} />
//       <Tabs.Screen name={'Campaigns'} component={Campaigns} />
//       {/* <Tabs.Screen name={'BibleCategories'} component={BibleCategories} /> */}
//       {/* <Tabs.Screen name={'StoreScreen'} component={StoreScreen} /> */}
//       <Tabs.Screen name={'Settings'} component={Settings} />
//     </Tabs.Navigator>
//   );
// };

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const firstScreen = 'HomeScreen';
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log('🚀 ~ MyDrawer ~ userRole======================:', userRole);
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={userRole == 'pilot' ? 'SelectRoute' : 'PostLoadScreen'}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '70%',
          // borderTopRightRadius: moderateScale(120, 0.6),
          // borderBottomRightRadius: moderateScale(120, 0.6),
        },
      }}>
      {userRole.toLowerCase() == 'pilot' ? (
       
        <DrawerNavigation.Screen name="SelectRoute" component={SelectRoute} />
        // <DrawerNavigation.Screen
        //   name="PostLoadScreen"
        //   component={PostLoadScreen}
        // />
      ) : (
        <DrawerNavigation.Screen
        name="PostLoadScreen"
        component={PostLoadScreen}
      />
      )}
      <DrawerNavigation.Screen name="Help" component={Help} />
      <DrawerNavigation.Screen name="LoadBoard" component={LoadBoard} />
      <DrawerNavigation.Screen name="CarDirectory" component={CarDirectory} />
      <DrawerNavigation.Screen name="LoadDetails" component={LoadDetails} />
      <DrawerNavigation.Screen name="PostScreen" component={PostScreen} />
      <DrawerNavigation.Screen name="ViewLeadBoard" component={ViewLeadBoard} />

      <DrawerNavigation.Screen
        name="ServicesScreen"
        component={ServicesScreen}
      />
      {/* <DrawerNavigation.Screen name="LoadDetails" component={LoadDetails} />
      <DrawerNavigation.Screen name="LoadDetails" component={LoadDetails} /> */}
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;

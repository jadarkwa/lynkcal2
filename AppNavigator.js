import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import Phase1Screen1Screen from './screens/Phase1Screen1Screen';
import Phase1Screen2Screen from './screens/Phase1Screen2Screen';
import Phase2Screen1Screen from './screens/Phase2Screen1Screen';
import Phase3Screen1Screen from './screens/Phase3Screen1Screen';
import Phase3Screen2Screen from './screens/Phase3Screen2Screen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor, navigation }) {
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background.base,
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerStyle: {
            backgroundColor: theme.colors.background.base,
            borderBottomColor: 'transparent',
          },
          headerTintColor: theme.colors.text.strong,
          headerTitleStyle: theme.typography.headline5,
        })}
      >
        <Stack.Screen
          name="Phase1Screen1Screen"
          component={Phase1Screen1Screen}
          options={({ navigation }) => ({
            title: 'Phase 1 - Screen 1',
          })}
        />
        <Stack.Screen
          name="Phase1Screen2Screen"
          component={Phase1Screen2Screen}
          options={({ navigation }) => ({
            title: 'Phase 1 - Screen 2',
          })}
        />
        <Stack.Screen
          name="Phase2Screen1Screen"
          component={Phase2Screen1Screen}
          options={({ navigation }) => ({
            title: 'Phase 2 - Screen 1',
          })}
        />
        <Stack.Screen
          name="Phase3Screen1Screen"
          component={Phase3Screen1Screen}
          options={({ navigation }) => ({
            title: 'Phase 3 - Screen 1',
          })}
        />
        <Stack.Screen
          name="Phase3Screen2Screen"
          component={Phase3Screen2Screen}
          options={({ navigation }) => ({
            title: 'Phase 3 - Screen 2',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});

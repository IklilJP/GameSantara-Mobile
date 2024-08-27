import './gesture-handler';
import { Button, createTheme, ThemeProvider } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./app/screens/HomeScreen/HomeScreen";
import { color } from "@rneui/base";
import TabNavigator from "./app/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './app/navigation/DrawerNavigator';

const theme = createTheme({
  lightColors: {
    primary: "blue",
  },
  darkColors: {
    primary: "red",
  },
  mode: "dark",
  components: {
    Button: {
      raised: true,
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

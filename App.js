import "./gesture-handler";
import { Button, createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import Toast from "react-native-toast-message";
import { createStore } from "redux";
import { reducers } from "./app/store/store";
import { Provider } from "react-redux";

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

const store = createStore(reducers);
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
          <NavigationContainer>
            <DrawerNavigator/>
          </NavigationContainer>
        <Toast />
      </ThemeProvider></Provider>
    </SafeAreaProvider>
  );
}

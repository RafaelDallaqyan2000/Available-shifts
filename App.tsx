import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationScreens } from './src/navigation/NavigationScreens';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationScreens />
    </SafeAreaProvider>
  );
}

export default App;

import { ThemeProvider } from './src/contexts/ThemeContexts';
import AppNavigator from './src/navigation/AppNavigator';


export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
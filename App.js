import { ThemeProvider } from './src/contexts/ThemeContexts';
import TheDrawer, { AppNavigator } from './src/navigation/AppNavigator'

export default function App() {
  return (
    <ThemeProvider>
      <TheDrawer />
    </ThemeProvider>
  );
}
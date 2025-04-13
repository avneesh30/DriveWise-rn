import React from 'react';
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';

const Stack = createNativeStackNavigator();

// function HomeScreen() {
//   return (
//     <Box flex={1} bgColor={config.tokens.colors.backgroundLight0}>
//         <Text color={config.tokens.colors.textDark900} textAlign='center' >Welcome to DriveWise!</Text>
//     </Box>
//   );
// }

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
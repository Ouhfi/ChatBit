import { Stack, Redirect } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="inbox"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="stats"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="conversation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  // Validate all required fields before creating the account.
  const handleCreateAccount = () => {
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    // Basic email format validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please create a password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!confirmPassword) {
      setError('Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Backend/API integration will be added here later.
    console.log('Create account pressed');
    console.log('Full name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);

    // For now, return to the login screen after successful validation.
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Back button: returns the user to the login screen. */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace('/login')}
        accessibilityRole="button"
        accessibilityLabel="Go back to login"
      >
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      <View style={styles.header}>
        <View style={styles.brand}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.logo}>ChatBit</Text>
        </View>

        <Text style={styles.subtitle}>Support, instantly.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Create your account</Text>

        <Text style={styles.description}>
          Join ChatBit and connect with support, instantly.
        </Text>

        <Text style={styles.label}>Full name</Text>

        <View style={styles.input}>
          <Text style={styles.inputIcon}>♙</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Your full name"
            placeholderTextColor="#697382"
            value={fullName}
            onChangeText={(value) => {
              setFullName(value);
              setError('');
            }}
            autoCapitalize="words"
          />
        </View>

        <Text style={styles.label}>Email</Text>

        <View style={styles.input}>
          <Text style={styles.inputIcon}>✉</Text>

          <TextInput
            style={styles.textInput}
            placeholder="you@company.com"
            placeholderTextColor="#697382"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setError('');
            }}
          />
        </View>

        <Text style={styles.label}>Password</Text>

        <View style={styles.input}>
          <Text style={styles.inputIcon}>♙</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Create a password"
            placeholderTextColor="#697382"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setError('');
            }}
          />

          <Text style={styles.eye}>◉</Text>
        </View>

        <Text style={styles.label}>Confirm password</Text>

        <View style={styles.input}>
          <Text style={styles.inputIcon}>♙</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor="#697382"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              setError('');
            }}
          />

          <Text style={styles.eye}>◉</Text>
        </View>

        {/* Show validation feedback without changing the existing layout. */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <Pressable
          style={styles.createButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createButtonText}>
            Create account
          </Text>
        </Pressable>

        <View style={styles.loginAccount}>
          <Text style={styles.accountText}>
            Already have an account?{' '}
          </Text>

          <Pressable onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#082e95',
  },

  // Keeps the back button independent from the existing layout.
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  backArrow: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '400',
    lineHeight: 30,
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    width: 78,
    height: 138,
    marginRight: 10,
    borderRadius: 70,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: '700',
  },

  subtitle: {
    color: 'rgb(245, 246, 246)',
    fontSize: 20,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    minHeight: '67%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111111',
  },

  description: {
    fontSize: 13,
    color: '#5F6368',
    marginTop: 6,
  },

  label: {
    fontSize: 12,
    color: '#3F4650',
    marginTop: 16,
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  inputIcon: {
    fontSize: 16,
    color: '#68727F',
    marginRight: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 12,
    color: '#111111',
    paddingVertical: 0,
  },

  eye: {
    marginLeft: 'auto',
    fontSize: 15,
    color: '#68727F',
  },

  errorText: {
    fontSize: 11,
    color: '#D93025',
    marginTop: 8,
  },

  createButton: {
    height: 48,
    backgroundColor: '#0757EA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  loginAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  accountText: {
    fontSize: 11,
    color: '#4F5661',
  },

  loginText: {
    fontSize: 11,
    color: '#0757EA',
  },
});
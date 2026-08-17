import { useEffect, useRef, useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  /*
   * Configure Google Sign-In.
   *
   * This Web Client ID comes from:
   * Google Cloud Console → Google Auth Platform → Clients
   */
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '179676495402-d433e6ddqhsijcnr33ffkprp3k553huo.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  /*
   * Login entrance animation.
   */
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-12)).current;

  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(cardTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    logoOpacity,
    logoTranslateY,
    subtitleOpacity,
    cardOpacity,
    cardTranslateY,
  ]);

  /*
   * Normal email/password validation.
   */
  const handleSignIn = () => {
    setEmailError('');
    setPasswordError('');
    setGoogleError('');

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        setEmailError('Please enter a valid email address.');
        isValid = false;
      }
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
      console.log('login from is valid');
      console.log('Email:',email.trim());
      
      router.replace('/inbox');
    // Backend authentication will be connected here later.
  };

  /*
   * Google Sign-In.
   */
  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) {
      return;
    }

    setGoogleError('');
    setIsGoogleLoading(true);

    try {
      /*
       * Check whether Google Play Services are available.
       * This is especially important on Android.
       */
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      /*
       * Open Google's account selector.
       */
      const response = await GoogleSignin.signIn();

      console.log('Google Sign-In response:', response);

      /*
       * At this stage Google authentication succeeded.
       *
       * Later we can send the Google ID token to your backend
       * to create/login the ChatBit user.
       */
      console.log('Google authentication successful');

      router.replace('/inbox');
    } catch (error: any) {
      console.log('Google Sign-In error:', error);

      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        // User closed the Google account selector.
        return;
      }

      if (error?.code === statusCodes.IN_PROGRESS) {
        setGoogleError('Google sign-in is already in progress.');
        return;
      }

      if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setGoogleError(
          'Google Play Services are not available on this device.',
        );
        return;
      }

      setGoogleError(
        'Unable to sign in with Google. Please try again.',
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.brand,
            {
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }],
            },
          ]}
        >
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.logo}>ChatBit</Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
            },
          ]}
        >
          Support, instantly.
        </Animated.Text>
      </View>

      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslateY }],
          },
        ]}
      >
        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.description}>
          Connect with support and get help, instantly.
        </Text>

        {/* EMAIL */}

        <Text style={styles.label}>Email</Text>

        <View
          style={[
            styles.input,
            emailError ? styles.inputError : null,
          ]}
        >
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

              if (emailError) {
                setEmailError('');
              }
            }}
          />
        </View>

        {emailError ? (
          <Text style={styles.errorText}>
            {emailError}
          </Text>
        ) : null}

        {/* PASSWORD */}

        <Text style={styles.label}>Password</Text>

        <View
          style={[
            styles.input,
            passwordError ? styles.inputError : null,
          ]}
        >
          <Text style={styles.inputIcon}>♙</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#697382"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);

              if (passwordError) {
                setPasswordError('');
              }
            }}
          />

          <Text style={styles.eye}>◉</Text>
        </View>

        {passwordError ? (
          <Text style={styles.errorText}>
            {passwordError}
          </Text>
        ) : null}

        <Pressable
          onPress={() => {
            console.log('Forgot password pressed');
          }}
        >
          <Text style={styles.forgotPassword}>
            Forgot password?
          </Text>
        </Pressable>

        {/* NORMAL SIGN IN */}

        <Pressable
          style={styles.signInButton}
          onPress={handleSignIn}
        >
          <Text style={styles.signInText}>
            Sign in
          </Text>
        </Pressable>

        {/* DIVIDER */}

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />

          <Text style={styles.or}>or</Text>

          <View style={styles.divider} />
        </View>

        {/* GOOGLE SIGN IN */}

        <Pressable
          style={[
            styles.googleButton,
            isGoogleLoading ? styles.googleButtonDisabled : null,
          ]}
          onPress={handleGoogleSignIn}
          disabled={isGoogleLoading}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
        >
          <GoogleLogo />

          <Text style={styles.googleText}>
            {isGoogleLoading
              ? 'Connecting...'
              : 'Continue with Google'}
          </Text>
        </Pressable>

        {googleError ? (
          <Text style={styles.googleErrorText}>
            {googleError}
          </Text>
        ) : null}

        {/* CREATE ACCOUNT */}

        <View style={styles.createAccount}>
          <Text style={styles.accountText}>
            Don't have an account?{' '}
          </Text>

          <Pressable
            onPress={() => router.push('/register')}
          >
            <Text style={styles.createText}>
              Create one
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

/*
 * Google logo.
 */
function GoogleLogo() {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 48 48"
    >
      <Path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.7 30.47 0 24 0 14.61 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.1 17.74 9.5 24 9.5z"
      />

      <Path
        fill="#34A853"
        d="M46.5 24.5c0-1.63-.15-3.2-.43-4.71H24v9.02h12.65c-.54 2.91-2.16 5.37-4.6 7.03l7.19 5.58C43.44 37.25 46.5 31.5 46.5 24.5z"
      />

      <Path
        fill="#FBBC05"
        d="M10.54 28.59A14.4 14.4 0 0 1 9.5 24c0-1.59.36-3.13 1.04-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.98-6.19z"
      />

      <Path
        fill="#EA4335"
        d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-7.19-5.58c-2 1.34-4.55 2.13-8.7 2.13-6.26 0-11.57-3.6-13.46-9.91l-7.98 6.19C6.51 42.62 14.61 48 24 48z"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#082e95',
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
    minHeight: '58%',
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
    marginTop: 24,
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

  inputError: {
    borderColor: '#DC2626',
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
    color: '#DC2626',
    marginTop: 5,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#064FEA',
    fontSize: 11,
    marginTop: 12,
  },

  signInButton: {
    height: 48,
    backgroundColor: '#0757EA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  signInText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  or: {
    fontSize: 12,
    color: '#697382',
    marginHorizontal: 12,
  },

  googleButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleButtonDisabled: {
    opacity: 0.6,
  },

  googleText: {
    fontSize: 12,
    color: '#202124',
    marginLeft: 10,
  },

  googleErrorText: {
    fontSize: 11,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 7,
  },

  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },

  accountText: {
    fontSize: 11,
    color: '#4F5661',
  },

  createText: {
    fontSize: 11,
    color: '#0757EA',
  },
});
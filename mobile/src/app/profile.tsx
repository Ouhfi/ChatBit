import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import Svg, {
  Circle,
  Path,
  Rect,
} from 'react-native-svg';

export default function ProfileScreen() {
  const router = useRouter();

  const [editVisible, setEditVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);

  const [name, setName] = useState('Housame');
  const [email, setEmail] = useState('OrdUrana@company.com');
  const [selectedLanguage, setSelectedLanguage] =
    useState('English');

  /*
   * =========================================================
   * SETTINGS ITEM
   * =========================================================
   */

  const renderSettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    danger = false,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    danger?: boolean;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.settingItem,
          pressed && styles.settingItemPressed,
        ]}
      >
        <View
          style={[
            styles.settingIconBox,
            danger && styles.settingIconBoxDanger,
          ]}
        >
          {icon}
        </View>

        <View style={styles.settingContent}>
          <Text
            style={[
              styles.settingTitle,
              danger && styles.settingTitleDanger,
            ]}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.settingSubtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {!danger ? (
          <Text style={styles.arrow}>›</Text>
        ) : null}
      </Pressable>
    );
  };

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  const goToInbox = () => {
    router.replace('/inbox');
  };

  const goToChats = () => {
    router.replace('/chat');
  };

  /*
   * =========================================================
   * WEBSITE
   * =========================================================
   */

  const openOrdUranaWebsite = async () => {
    try {
      await Linking.openURL('https://ordurana.com/');
    } catch (error) {
      console.log(
        'Unable to open OrdUrana website:',
        error,
      );
    }
  };

  /*
   * =========================================================
   * EDIT PROFILE
   * =========================================================
   */

  const openEditProfile = () => {
    setEditVisible(true);
  };

  const saveProfile = () => {
    setEditVisible(false);

    Alert.alert(
      'Profile updated',
      'Your profile information has been updated successfully.',
    );
  };

  /*
   * =========================================================
   * LANGUAGE
   * =========================================================
   */

  const openLanguage = () => {
    setLanguageVisible(true);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setLanguageVisible(false);
  };

  /*
   * =========================================================
   * ACCOUNT ACTIONS
   * =========================================================
   */

  const openPersonalInformation = () => {
    setEditVisible(true);
  };

  const openSecurity = () => {
    Alert.alert(
      'Security',
      'Password and account security settings are available here.',
      [
        {
          text: 'OK',
          style: 'default',
        },
      ],
    );
  };

  const openNotifications = () => {
    Alert.alert(
      'Notifications',
      'Your notification preferences are ready to be configured.',
      [
        {
          text: 'OK',
          style: 'default',
        },
      ],
    );
  };

  /*
   * =========================================================
   * SUPPORT / PRIVACY
   * =========================================================
   */

  const openHelpSupport = () => {
    Alert.alert(
      'Help & support',
      'How can we help you?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Contact support',
          onPress: () => {
            Linking.openURL(
              'mailto:support@ordurana.com',
            ).catch(() => {
              Alert.alert(
                'Error',
                'Unable to open your email application.',
              );
            });
          },
        },
      ],
    );
  };

  const openPrivacyPolicy = async () => {
    try {
      await Linking.openURL(
        'https://ordurana.com/privacy',
      );
    } catch (error) {
      Alert.alert(
        'Privacy policy',
        'Unable to open the privacy policy.',
      );
    }
  };

  /*
   * =========================================================
   * LOG OUT
   * =========================================================
   *
   * 1. User presses Log out
   * 2. Confirmation appears
   * 3. Cancel = stay on Profile
   * 4. Log out = replace current route with /login
   *
   */

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => {
            router.replace('/login');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  /*
   * =========================================================
   * SCREEN
   * =========================================================
   */

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <View style={styles.header}>

          <View>
            <Text style={styles.pageTitle}>
              Profile
            </Text>

            <Text style={styles.pageSubtitle}>
              Manage your account and preferences
            </Text>
          </View>

          <View style={styles.headerAvatar}>
            <Image
              source={require('../../assets/images/ProfilMan.png')}
              style={styles.headerAvatarImage}
              resizeMode="cover"
            />

            <View style={styles.onlineDot} />
          </View>

        </View>

        {/* ===================================================
            PROFILE CARD
        =================================================== */}

        <View style={styles.profileCard}>

          <View style={styles.profileAvatarWrapper}>

            <Image
              source={require('../../assets/images/ProfilMan.png')}
              style={styles.profileAvatar}
              resizeMode="cover"
            />

            <View style={styles.profileOnlineDot} />

          </View>

          <View style={styles.profileInfo}>

            <Text style={styles.profileName}>
              {name}
            </Text>

            <Pressable
              onPress={openOrdUranaWebsite}
              hitSlop={8}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    styles.profileEmail,
                    pressed &&
                      styles.profileEmailPressed,
                  ]}
                >
                  {email}
                </Text>
              )}
            </Pressable>

            <View style={styles.statusBadge}>

              <View style={styles.statusBadgeDot} />

              <Text style={styles.statusBadgeText}>
                Online
              </Text>

            </View>

          </View>

          {/* EDIT */}

          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed &&
                styles.editButtonPressed,
            ]}
            onPress={openEditProfile}
          >
            <Text style={styles.editButtonText}>
              Edit
            </Text>
          </Pressable>

        </View>

        {/* ===================================================
            ACCOUNT
        =================================================== */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.settingsCard}>

          {/* PERSONAL INFORMATION */}

          {renderSettingItem({
            title: 'Personal information',
            subtitle:
              'Name, email and phone number',
            onPress:
              openPersonalInformation,
            icon: (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <Circle
                  cx="12"
                  cy="8"
                  r="3.2"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  fill="none"
                />

                <Path
                  d="M5.5 19C5.5 15.8 8.2 13.5 12 13.5C15.8 13.5 18.5 15.8 18.5 19"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
            ),
          })}

          <View style={styles.divider} />

          {/* SECURITY */}

          {renderSettingItem({
            title: 'Security',
            subtitle:
              'Password and account security',
            onPress: openSecurity,
            icon: (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <Rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  fill="none"
                />

                <Path
                  d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <Circle
                  cx="12"
                  cy="15"
                  r="1.2"
                  fill="#1458E8"
                />
              </Svg>
            ),
          })}

          <View style={styles.divider} />

          {/* NOTIFICATIONS */}

          {renderSettingItem({
            title: 'Notifications',
            subtitle:
              'Messages and notification preferences',
            onPress: openNotifications,
            icon: (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M18 9.5C18 6.2 15.8 4 12 4C8.2 4 6 6.2 6 9.5V14L4.5 16.5H19.5L18 14V9.5Z"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                <Path
                  d="M9.5 19C10.1 19.7 11 20 12 20C13 20 13.9 19.7 14.5 19"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </Svg>
            ),
          })}

        </View>

        {/* ===================================================
            PREFERENCES
        =================================================== */}

        <Text style={styles.sectionTitle}>
          Preferences
        </Text>

        <View style={styles.settingsCard}>

          {/* LANGUAGE */}

          {renderSettingItem({
            title: 'Language',
            subtitle: selectedLanguage,
            onPress: openLanguage,
            icon: (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <Circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  fill="none"
                />

                <Path
                  d="M3.5 12H20.5"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <Path
                  d="M12 3.5C14.2 5.8 15.3 8.6 15.3 12C15.3 15.4 14.2 18.2 12 20.5C9.8 18.2 8.7 15.4 8.7 12C8.7 8.6 9.8 5.8 12 3.5Z"
                  stroke="#1458E8"
                  strokeWidth="1.5"
                  fill="none"
                />
              </Svg>
            ),
          })}

        </View>

        {/* ===================================================
            SUPPORT & PRIVACY
        =================================================== */}

        <Text style={styles.sectionTitle}>
          Support & Privacy
        </Text>

        <View style={styles.settingsCard}>

          {/* HELP & SUPPORT */}

          {renderSettingItem({
            title: 'Help & support',
            subtitle:
              'Get help or contact our support team',
            onPress: openHelpSupport,
            icon: (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <Circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  fill="none"
                />

                <Path
                  d="M9.5 9.2C9.7 7.9 10.7 7 12 7C13.5 7 14.5 8 14.5 9.3C14.5 10.4 13.8 11.1 12.8 11.8C12.2 12.2 12 12.7 12 13.4"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />

                <Circle
                  cx="12"
                  cy="16.5"
                  r="1"
                  fill="#1458E8"
                />
              </Svg>
            ),
          })}

          <View style={styles.divider} />

          {/* PRIVACY POLICY */}

          {renderSettingItem({
            title: 'Privacy policy',
            subtitle:
              'Read our privacy policy',
            onPress: openPrivacyPolicy,
            icon: (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M6 4.5H18C18.6 4.5 19 4.9 19 5.5V18.5C19 19.1 18.6 19.5 18 19.5H6C5.4 19.5 5 19.1 5 18.5V5.5C5 4.9 5.4 4.5 6 4.5Z"
                  stroke="#1458E8"
                  strokeWidth="1.8"
                  fill="none"
                />

                <Path
                  d="M8 8H16"
                  stroke="#1458E8"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <Path
                  d="M8 11.5H16"
                  stroke="#1458E8"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <Path
                  d="M8 15H13"
                  stroke="#1458E8"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </Svg>
            ),
          })}

        </View>

        {/* ===================================================
            LOG OUT
        =================================================== */}

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed &&
              styles.logoutButtonPressed,
          ]}
          onPress={handleLogout}
          android_ripple={{
            color: '#FFD7D7',
          }}
        >

          <Svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
          >
            <Path
              d="M10 5H6.5C5.7 5 5 5.7 5 6.5V17.5C5 18.3 5.7 19 6.5 19H10"
              stroke="#E53935"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            <Path
              d="M13 8L17 12L13 16"
              stroke="#E53935"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <Path
              d="M17 12H9"
              stroke="#E53935"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </Svg>

          <Text style={styles.logoutText}>
            Log out
          </Text>

        </Pressable>

        <View style={styles.bottomSpace} />

      </ScrollView>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <View style={styles.bottomNav}>

        {/* INBOX */}

        <Pressable
          style={styles.navItem}
          onPress={goToInbox}
        >
          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >
            <Rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2.5"
              fill="#FFFFFF"
              stroke="#344054"
              strokeWidth="1.7"
            />

            <Path
              d="M4 7.5L12 13L20 7.5"
              stroke="#344054"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>

          <Text style={styles.navText}>
            Inbox
          </Text>
        </Pressable>

        {/* CHATS */}

        <Pressable
          style={styles.navItem}
          onPress={goToChats}
        >
          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >
            <Path
              d="M5 5.5H19C20.1 5.5 21 6.4 21 7.5V15.5C21 16.6 20.1 17.5 19 17.5H11L7 20V17.5H5C3.9 17.5 3 16.6 3 15.5V7.5C3 6.4 3.9 5.5 5 5.5Z"
              stroke="#344054"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            <Circle
              cx="8"
              cy="11.5"
              r="1"
              fill="#344054"
            />

            <Circle
              cx="12"
              cy="11.5"
              r="1"
              fill="#344054"
            />

            <Circle
              cx="16"
              cy="11.5"
              r="1"
              fill="#344054"
            />
          </Svg>

          <Text style={styles.navText}>
            Chats
          </Text>
        </Pressable>

        {/* PROFILE */}

        <Pressable
          style={styles.navItem}
          onPress={() => {}}
        >
          <View style={styles.activeProfileIcon}>
            <Svg
              width={25}
              height={25}
              viewBox="0 0 24 24"
            >
              <Circle
                cx="12"
                cy="8"
                r="3.2"
                stroke="#1458E8"
                strokeWidth="1.8"
                fill="none"
              />

              <Path
                d="M5.5 19C5.5 15.8 8.2 13.5 12 13.5C15.8 13.5 18.5 15.8 18.5 19"
                stroke="#1458E8"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          </View>

          <Text style={styles.navTextActive}>
            Profile
          </Text>
        </Pressable>

      </View>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setEditVisible(false)
        }
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              Edit profile
            </Text>

            <Text style={styles.modalLabel}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.modalInput}
              placeholder="Name"
              placeholderTextColor="#98A2B3"
            />

            <Text style={styles.modalLabel}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.modalInput}
              placeholder="Email"
              placeholderTextColor="#98A2B3"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>

              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setEditVisible(false)
                }
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={saveProfile}
              >
                <Text style={styles.saveButtonText}>
                  Save
                </Text>
              </Pressable>

            </View>

          </View>

        </View>
      </Modal>

      {/* =====================================================
          LANGUAGE MODAL
      ===================================================== */}

      <Modal
        visible={languageVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setLanguageVisible(false)
        }
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              Language
            </Text>

            <Pressable
              style={styles.languageOption}
              onPress={() =>
                selectLanguage('English')
              }
            >
              <Text style={styles.languageText}>
                English
              </Text>

              {selectedLanguage ===
                'English' && (
                <Text style={styles.checkMark}>
                  ✓
                </Text>
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() =>
                selectLanguage('Français')
              }
            >
              <Text style={styles.languageText}>
                Français
              </Text>

              {selectedLanguage ===
                'Français' && (
                <Text style={styles.checkMark}>
                  ✓
                </Text>
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() =>
                selectLanguage('العربية')
              }
            >
              <Text style={styles.languageText}>
                العربية
              </Text>

              {selectedLanguage ===
                'العربية' && (
                <Text style={styles.checkMark}>
                  ✓
                </Text>
              )}
            </Pressable>

            <Pressable
              style={styles.languageCancel}
              onPress={() =>
                setLanguageVisible(false)
              }
            >
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </Pressable>

          </View>

        </View>
      </Modal>

    </View>
  );
}

/* ===========================================================
   STYLES
=========================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 20,
  },

  bottomSpace: {
    height: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  pageTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    color: '#101828',
  },

  pageSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#667085',
    marginTop: 4,
  },

  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'relative',
  },

  headerAvatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  onlineDot: {
    position: 'absolute',
    right: -1,
    bottom: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF1F5',
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  profileAvatarWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    position: 'relative',
  },

  profileAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },

  profileOnlineDot: {
    position: 'absolute',
    right: -1,
    bottom: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },

  profileName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#101828',
    marginBottom: 2,
  },

  profileEmail: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 7,
    textDecorationLine: 'underline',
  },

  profileEmailPressed: {
    color: '#1458E8',
    opacity: 0.7,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EAF8EE',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  statusBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 5,
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },

  editButton: {
    height: 38,
    paddingHorizontal: 15,
    borderRadius: 11,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonPressed: {
    opacity: 0.7,
  },

  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1458E8',
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 11,
  },

  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF1F5',
    overflow: 'hidden',
    marginBottom: 24,
  },

  settingItem: {
    minHeight: 72,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  settingItemPressed: {
    backgroundColor: '#F8FAFC',
  },

  settingIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingIconBoxDanger: {
    backgroundColor: '#FFF0F0',
  },

  settingContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#101828',
  },

  settingTitleDanger: {
    color: '#E53935',
  },

  settingSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: '#667085',
    marginTop: 2,
  },

  arrow: {
    fontSize: 27,
    lineHeight: 27,
    fontWeight: '300',
    color: '#98A2B3',
    marginRight: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F5',
    marginLeft: 68,
  },

  logoutButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#FFD7D7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    overflow: 'hidden',
  },

  logoutButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E53935',
    marginLeft: 9,
  },

  bottomNav: {
    height: 82,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 8,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  activeProfileIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#344054',
  },

  navTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1458E8',
  },

  /* ========================================================
     MODALS
  ======================================================== */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#101828',
    marginBottom: 20,
  },

  modalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#344054',
    marginBottom: 7,
  },

  modalInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CDD4DC',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#101828',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F2F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#344054',
  },

  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1458E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  languageOption: {
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  languageText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#101828',
  },

  checkMark: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1458E8',
  },

  languageCancel: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F2F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
});

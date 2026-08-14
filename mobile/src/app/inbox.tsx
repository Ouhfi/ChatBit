import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Svg, {
  Circle,
  Path,
  Rect,
} from 'react-native-svg';

export default function InboxScreen() {
  return (
    <View style={styles.container}>

      {/* =====================================================
          HEADER
      ===================================================== */}
      <View style={styles.header}>

        {/* ChatBit Logo */}
        <Image
          source={require('../../assets/images/ChatBitLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Header Right */}
        <View style={styles.headerRight}>

          {/* Notification */}
          <View style={styles.notification}>
            <Text style={styles.bell}>♧</Text>
            <View style={styles.notificationDot} />
          </View>

          {/* Profile */}
          <View style={styles.avatar}>
            <Image
              source={require('../../assets/images/ProfilMan.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />

            {/* Online status */}
            <View style={styles.onlineDot} />
          </View>

        </View>
      </View>


      {/* =====================================================
          MAIN CONTENT - SCROLLABLE
      ===================================================== */}
      <View style={styles.content}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* =================================================
              INBOX TITLE
          ================================================= */}
          <Text style={styles.title}>
            Inbox
          </Text>


          {/* =================================================
              SEARCH + FILTER
          ================================================= */}
          <View style={styles.searchRow}>

            {/* Search */}
            <View style={styles.searchContainer}>

              <Text style={styles.searchIcon}>
                ⌕
              </Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Search conversations..."
                placeholderTextColor="#8A94A6"
                autoCapitalize="none"
                autoCorrect={false}
              />

            </View>


            {/* Filter */}
            <View style={styles.filterButton}>

              <View style={styles.filterLine}>
                <View style={styles.filterSmallDot} />
              </View>

              <View style={styles.filterLine}>
                <View style={styles.filterLargeDot} />
              </View>

              <View style={styles.filterLine}>
                <View style={styles.filterSmallDot} />
              </View>

            </View>

          </View>


          {/* =================================================
              FILTER TABS
          ================================================= */}
          <View style={styles.tabs}>

            {/* All */}
            <View style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>
                All
              </Text>
            </View>


            {/* Pending */}
            <View style={styles.tab}>

              <Text style={styles.tabText}>
                Pending
              </Text>

              <View style={styles.pendingBadge}>
                <Text style={styles.badgeText}>
                  5
                </Text>
              </View>

            </View>


            {/* Ongoing */}
            <View style={styles.tab}>

              <Text style={styles.tabText}>
                Ongoing
              </Text>

              <View style={styles.ongoingBadge}>
                <Text style={styles.badgeText}>
                  3
                </Text>
              </View>

            </View>

          </View>


          {/* =================================================
              PENDING
          ================================================= */}
          <Text style={styles.sectionTitle}>
            Pending (4)
          </Text>


          {/* =================================================
              AHMED CARD
          ================================================= */}
          <View style={styles.conversationCard}>

            {/* Orange status */}
            <View style={styles.pendingDot} />

            {/* Ahmed image */}
            <View style={styles.cardAvatar}>
              <Image
                source={require('../../assets/images/ProfilMan.png')}
                style={styles.cardAvatarImage}
                resizeMode="cover"
              />
            </View>

            {/* Information */}
            <View style={styles.cardContent}>

              <View style={styles.cardTopRow}>

                <Text
                  style={styles.personName}
                  numberOfLines={1}
                >
                  Housame Es-safy
                </Text>

                <Text style={styles.time}>
                  2m ago
                </Text>

              </View>

              <Text style={styles.subject}>
                Order delivery problem
              </Text>

              <Text
                style={styles.preview}
                numberOfLines={2}
              >
                Where is my order? I haven't received
                any update.
              </Text>

            </View>

            {/* Unread */}
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                2
              </Text>
            </View>

          </View>


          {/* =================================================
              OLIVIA BENNETT
          ================================================= */}
          <View style={styles.conversationCard}>

            {/* Orange status */}
            <View style={styles.pendingDot} />

            {/* Sara image */}
            <View style={styles.cardAvatar}>
              <Image
                source={require('../../assets/images/ProfilGril.png')}
                style={styles.cardAvatarImage}
                resizeMode="cover"
              />
            </View>

            {/* Information */}
            <View style={styles.cardContent}>

              <View style={styles.cardTopRow}>

                <Text
                  style={styles.personName}
                  numberOfLines={1}
                >
                  Olivia Bennett
                </Text>

                <Text style={styles.time}>
                  15m ago
                </Text>

              </View>

              <Text style={styles.subject}>
                Refund request
              </Text>

              <Text
                style={styles.preview}
                numberOfLines={2}
              >
                I would like to request a refund for
                my last order.
              </Text>

            </View>

            {/* Unread */}
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                3
              </Text>
            </View>

          </View>


          {/* =================================================
              ONGOING
          ================================================= */}
          <Text style={styles.sectionTitleOngoing}>
            Ongoing (3)
          </Text>


          {/* =================================================
              LIAM CARTER
          ================================================= */}
          <View style={styles.conversationCard}>

            {/* Green status */}
            <View style={styles.ongoingDot} />

            {/* Liam Carter image */}
            <View style={styles.cardAvatar}>
              <Image
                source={require('../../assets/images/Profilliam.png')}
                style={styles.cardAvatarImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.cardContent}>

              <View style={styles.cardTopRow}>

                <Text
                  style={styles.personName}
                  numberOfLines={1}
                >
                  Liam Carter
                </Text>

                <Text style={styles.time}>
                  18m ago
                </Text>

              </View>

              <Text style={styles.subject}>
                Payment issue
              </Text>

              <Text
                style={styles.preview}
                numberOfLines={2}
              >
                The payment failed but the amount
                was deducted.
              </Text>

            </View>

          </View>


          {/* =================================================
              EMILY MORGAN
          ================================================= */}
          <View style={styles.conversationCard}>

            {/* Green status */}
            <View style={styles.ongoingDot} />

            {/* Emily Morgan image */}
            <View style={styles.cardAvatar}>
              <Image
                source={require('../../assets/images/Emily Morgan.png')}
                style={styles.cardAvatarImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.cardContent}>

              <View style={styles.cardTopRow}>

                <Text
                  style={styles.personName}
                  numberOfLines={1}
                >
                  Emily Morgan
                </Text>

                <Text style={styles.time}>
                  1h ago
                </Text>

              </View>

              <Text style={styles.subject}>
                Product exchange
              </Text>

              <Text
                style={styles.preview}
                numberOfLines={2}
              >
                I want to exchange my product for
                a different size.
              </Text>

            </View>

          </View>


          {/* Extra space so last card can scroll above nav */}
          <View style={styles.bottomScrollSpace} />

        </ScrollView>

      </View>


      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}
      <View style={styles.bottomNav}>

        {/* INBOX */}
        <View style={styles.navItem}>

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
              fill="#1458E8"
            />

            <Path
              d="M4 7.5L12 13L20 7.5"
              stroke="#FFFFFF"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>

          <Text style={styles.navTextActive}>
            Inbox
          </Text>

        </View>


        {/* CHATS */}
        <View style={styles.navItem}>

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

        </View>


        {/* STATS */}
        <View style={styles.navItem}>

          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >
            <Path
              d="M4 19V10"
              stroke="#344054"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <Path
              d="M10 19V5"
              stroke="#344054"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <Path
              d="M16 19V12"
              stroke="#344054"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <Path
              d="M21 19H3"
              stroke="#344054"
              strokeWidth="1.7"
              strokeLinecap="round"
            />

            <Path
              d="M14 9L17 6L20 8"
              stroke="#344054"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>

          <Text style={styles.navText}>
            Stats
          </Text>

        </View>


        {/* PROFILE */}
        <View style={styles.navItem}>

          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >
            <Circle
              cx="12"
              cy="8"
              r="3.2"
              stroke="#344054"
              strokeWidth="1.7"
              fill="none"
            />

            <Path
              d="M5.5 19C5.5 15.8 8.2 13.5 12 13.5C15.8 13.5 18.5 15.8 18.5 19"
              stroke="#344054"
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>

          <Text style={styles.navText}>
            Profile
          </Text>

        </View>

      </View>

    </View>
  );
}


/* ===========================================================
   STYLES
=========================================================== */

const styles = StyleSheet.create({

  /* =========================================================
     CONTAINER
  ========================================================= */

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  /* =========================================================
     HEADER
  ========================================================= */

  header: {
    height: 90,
    paddingHorizontal: 24,
    paddingTop: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    width: 145,
    height: 48,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },


  /* =========================================================
     NOTIFICATION
  ========================================================= */

  notification: {
    width: 32,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  bell: {
    fontSize: 25,
    color: '#111827',
  },

  notificationDot: {
    position: 'absolute',

    top: 7,
    right: 2,

    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: '#F59E0B',
  },


  /* =========================================================
     PROFILE
  ========================================================= */

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#E5E7EB',

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  avatarImage: {
    width: '100%',
    height: '100%',

    borderRadius: 21,
  },

  onlineDot: {
    position: 'absolute',

    right: -1,
    bottom: 1,

    width: 11,
    height: 11,

    borderRadius: 6,

    backgroundColor: '#22C55E',

    borderWidth: 2,
    borderColor: '#FFFFFF',
  },


  /* =========================================================
     CONTENT
  ========================================================= */

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollContent: {
    paddingTop: 22,
    paddingBottom: 20,
  },

  bottomScrollSpace: {
    height: 20,
  },

  title: {
    fontSize: 34,
    lineHeight: 40,

    fontWeight: '700',

    color: '#111827',

    marginBottom: 22,
  },


  /* =========================================================
     SEARCH
  ========================================================= */

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,

    marginBottom: 18,
  },

  searchContainer: {
    flex: 1,

    height: 56,

    borderRadius: 15,

    borderWidth: 1,
    borderColor: '#E5EAF0',

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,
  },

  searchIcon: {
    fontSize: 29,

    color: '#344054',

    width: 30,

    marginRight: 8,

    textAlign: 'center',
  },

  searchInput: {
    flex: 1,

    height: 54,

    fontSize: 16,

    color: '#111827',

    paddingVertical: 0,
  },


  /* =========================================================
     FILTER BUTTON
  ========================================================= */

  filterButton: {
    width: 56,
    height: 56,

    borderRadius: 15,

    borderWidth: 1,
    borderColor: '#E5EAF0',

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 10,
  },

  filterLine: {
    width: 23,
    height: 7,

    borderTopWidth: 2,
    borderColor: '#344054',

    position: 'relative',
  },

  filterSmallDot: {
    position: 'absolute',

    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor: '#FFFFFF',

    borderWidth: 1.5,
    borderColor: '#344054',

    top: -5,
    left: 4,
  },

  filterLargeDot: {
    position: 'absolute',

    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor: '#FFFFFF',

    borderWidth: 1.5,
    borderColor: '#344054',

    top: -5,
    right: 3,
  },


  /* =========================================================
     TABS
  ========================================================= */

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,

    marginBottom: 27,
  },

  tab: {
    height: 48,

    paddingHorizontal: 20,

    borderRadius: 25,

    backgroundColor: '#F0F2F6',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 9,
  },

  activeTab: {
    backgroundColor: '#1458E8',

    paddingHorizontal: 24,
  },

  tabText: {
    fontSize: 16,

    fontWeight: '500',

    color: '#344054',
  },

  activeTabText: {
    color: '#FFFFFF',

    fontWeight: '600',
  },


  /* =========================================================
     BADGES
  ========================================================= */

  pendingBadge: {
    width: 23,
    height: 23,

    borderRadius: 12,

    backgroundColor: '#F59E0B',

    alignItems: 'center',
    justifyContent: 'center',
  },

  ongoingBadge: {
    width: 23,
    height: 23,

    borderRadius: 12,

    backgroundColor: '#22C55E',

    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    fontSize: 13,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  /* =========================================================
     SECTION TITLES
  ========================================================= */

  sectionTitle: {
    fontSize: 18,

    fontWeight: '500',

    color: '#344054',

    marginBottom: 14,
  },

  sectionTitleOngoing: {
    fontSize: 18,

    fontWeight: '500',

    color: '#344054',

    marginTop: 7,
    marginBottom: 14,
  },


  /* =========================================================
     CONVERSATION CARD
  ========================================================= */

  conversationCard: {
    minHeight: 126,

    borderRadius: 17,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#EEF1F5',

    marginBottom: 12,

    paddingVertical: 18,
    paddingHorizontal: 14,

    flexDirection: 'row',

    position: 'relative',
  },


  /* =========================================================
     STATUS DOT
  ========================================================= */

  pendingDot: {
    width: 9,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#F59E0B',

    position: 'absolute',

    left: 4,
    top: 48,
  },

  ongoingDot: {
    width: 9,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#22C55E',

    position: 'absolute',

    left: 4,
    top: 48,
  },


  /* =========================================================
     CARD AVATAR
  ========================================================= */

  cardAvatar: {
    width: 68,
    height: 68,

    borderRadius: 34,

    backgroundColor: '#E9EDF2',

    marginLeft: 14,
    marginRight: 14,

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
  },

  cardAvatarImage: {
    width: '100%',
    height: '100%',

    borderRadius: 34,
  },

  placeholderLetter: {
    fontSize: 24,

    fontWeight: '600',

    color: '#667085',
  },


  /* =========================================================
     CARD CONTENT
  ========================================================= */

  cardContent: {
    flex: 1,

    minWidth: 0,

    paddingTop: 1,
  },

  cardTopRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 5,

    paddingRight: 2,
  },

  personName: {
    flex: 1,

    fontSize: 18,

    fontWeight: '600',

    color: '#101828',

    marginRight: 8,
  },

  time: {
    fontSize: 13,

    fontWeight: '400',

    color: '#667085',
  },

  subject: {
    fontSize: 16,

    fontWeight: '600',

    color: '#101828',

    marginBottom: 5,
  },

  preview: {
    fontSize: 14,

    lineHeight: 20,

    color: '#667085',

    paddingRight: 2,
  },


  /* =========================================================
     UNREAD
  ========================================================= */

  unreadBadge: {
    position: 'absolute',

    right: 11,
    bottom: 17,

    width: 27,
    height: 27,

    borderRadius: 14,

    backgroundColor: '#1458E8',

    alignItems: 'center',
    justifyContent: 'center',
  },

  unreadText: {
    fontSize: 14,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  /* =========================================================
     BOTTOM NAVIGATION
  ========================================================= */

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

});


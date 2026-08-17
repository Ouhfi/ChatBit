import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';

import Svg, {
  Circle,
  Path,
  Rect,
} from 'react-native-svg';

export default function StatsScreen() {
  const router = useRouter();
  const pathname = usePathname();

  /*
   * =========================================================
   * ACTIVE NAVIGATION
   * =========================================================
   */

  const isInboxActive =
    pathname === '/inbox' ||
    pathname === '/';

  const isChatActive =
    pathname === '/chat';

  const isStatsActive =
    pathname === '/stats';

  const isProfileActive =
    pathname === '/profile';

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  const openInbox = () => {
    router.push('/inbox');
  };

  const openChat = () => {
    router.push('/chat');
  };

  const openStats = () => {
    router.push('/stats');
  };

  const openProfile = () => {
    router.push('/profile');
  };

  /*
   * =========================================================
   * STAT DATA
   * =========================================================
   */

  const weeklyData = [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: 27 },
    { day: 'Wed', value: 22 },
    { day: 'Thu', value: 34 },
    { day: 'Fri', value: 29 },
    { day: 'Sat', value: 21 },
    { day: 'Sun', value: 26 },
  ];

  const maxValue = Math.max(
    ...weeklyData.map((item) => item.value),
  );

  /*
   * =========================================================
   * SCREEN
   * =========================================================
   */

  return (
    <View style={styles.container}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        <Image
          source={require('../../assets/images/ChatBitLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Pressable
          style={styles.avatar}
          onPress={openProfile}
        >
          <Image
            source={require('../../assets/images/ProfilMan.png')}
            style={styles.avatarImage}
            resizeMode="cover"
          />

          <View style={styles.onlineDot} />
        </Pressable>

      </View>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* TITLE */}

        <View style={styles.titleSection}>

          <View>
            <Text style={styles.title}>
              Statistics
            </Text>

            <Text style={styles.subtitle}>
              Track your support performance
            </Text>
          </View>

          <View style={styles.periodBadge}>
            <Text style={styles.periodBadgeText}>
              This week
            </Text>
          </View>

        </View>

        {/* ===================================================
            OVERVIEW CARDS
        =================================================== */}

        <View style={styles.overviewGrid}>

          {/* TOTAL CONVERSATIONS */}

          <View style={styles.statCard}>

            <View style={styles.statCardTop}>

              <View
                style={[
                  styles.statIcon,
                  styles.statIconBlue,
                ]}
              >
                <Svg
                  width={21}
                  height={21}
                  viewBox="0 0 24 24"
                >
                  <Path
                    d="M5 5.5H19C20.1 5.5 21 6.4 21 7.5V15.5C21 16.6 20.1 17.5 19 17.5H11L7 20V17.5H5C3.9 17.5 3 16.6 3 15.5V7.5C3 6.4 3.9 5.5 5 5.5Z"
                    stroke="#1458E8"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  <Circle
                    cx="8"
                    cy="11.5"
                    r="1"
                    fill="#1458E8"
                  />

                  <Circle
                    cx="12"
                    cy="11.5"
                    r="1"
                    fill="#1458E8"
                  />

                  <Circle
                    cx="16"
                    cy="11.5"
                    r="1"
                    fill="#1458E8"
                  />
                </Svg>
              </View>

              <Text style={styles.growthText}>
                +12%
              </Text>

            </View>

            <Text style={styles.statValue}>
              184
            </Text>

            <Text style={styles.statLabel}>
              Total conversations
            </Text>

          </View>

          {/* RESOLVED */}

          <View style={styles.statCard}>

            <View style={styles.statCardTop}>

              <View
                style={[
                  styles.statIcon,
                  styles.statIconGreen,
                ]}
              >
                <Svg
                  width={21}
                  height={21}
                  viewBox="0 0 24 24"
                >
                  <Path
                    d="M5 12.5L9.5 17L19 7"
                    stroke="#16A34A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              </View>

              <Text style={styles.growthTextGreen}>
                +8%
              </Text>

            </View>

            <Text style={styles.statValue}>
              142
            </Text>

            <Text style={styles.statLabel}>
              Resolved
            </Text>

          </View>

          {/* PENDING */}

          <View style={styles.statCard}>

            <View style={styles.statCardTop}>

              <View
                style={[
                  styles.statIcon,
                  styles.statIconOrange,
                ]}
              >
                <Svg
                  width={21}
                  height={21}
                  viewBox="0 0 24 24"
                >
                  <Circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    stroke="#F59E0B"
                    strokeWidth="1.8"
                    fill="none"
                  />

                  <Path
                    d="M12 7.5V12L15 14"
                    stroke="#F59E0B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>

              <Text style={styles.neutralText}>
                6
              </Text>

            </View>

            <Text style={styles.statValue}>
              27
            </Text>

            <Text style={styles.statLabel}>
              Pending
            </Text>

          </View>

          {/* RESPONSE TIME */}

          <View style={styles.statCard}>

            <View style={styles.statCardTop}>

              <View
                style={[
                  styles.statIcon,
                  styles.statIconPurple,
                ]}
              >
                <Svg
                  width={21}
                  height={21}
                  viewBox="0 0 24 24"
                >
                  <Circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    stroke="#7C3AED"
                    strokeWidth="1.8"
                    fill="none"
                  />

                  <Path
                    d="M12 7V12L15 14"
                    stroke="#7C3AED"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>

              <Text style={styles.growthTextGreen}>
                -14%
              </Text>

            </View>

            <Text style={styles.statValue}>
              4m
            </Text>

            <Text style={styles.statLabel}>
              Avg. response time
            </Text>

          </View>

        </View>

        {/* ===================================================
            WEEKLY ACTIVITY
        =================================================== */}

        <View style={styles.sectionHeader}>

          <View>
            <Text style={styles.sectionTitle}>
              Weekly activity
            </Text>

            <Text style={styles.sectionSubtitle}>
              Conversations handled
            </Text>
          </View>

          <Text style={styles.totalSmall}>
            177
          </Text>

        </View>

        <View style={styles.chartCard}>

          {/* CHART HEADER */}

          <View style={styles.chartHeader}>

            <View>
              <Text style={styles.chartMainValue}>
                177
              </Text>

              <Text style={styles.chartMainLabel}>
                conversations
              </Text>
            </View>

            <View style={styles.chartLegend}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>
                Activity
              </Text>
            </View>

          </View>

          {/* CHART */}

          <View style={styles.chartArea}>

            {/* GRID */}

            <View style={styles.gridLineOne} />
            <View style={styles.gridLineTwo} />
            <View style={styles.gridLineThree} />
            <View style={styles.gridLineFour} />

            {/* BARS */}

            <View style={styles.barsContainer}>

              {weeklyData.map((item) => {

                const height =
                  (item.value / maxValue) * 125;

                const isHighest =
                  item.value === maxValue;

                return (
                  <View
                    key={item.day}
                    style={styles.barColumn}
                  >

                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor:
                            isHighest
                              ? '#1458E8'
                              : '#CFE0FF',
                        },
                      ]}
                    />

                    <Text
                      style={styles.dayLabel}
                    >
                      {item.day}
                    </Text>

                  </View>
                );
              })}

            </View>

          </View>

        </View>

        {/* ===================================================
            PERFORMANCE
        =================================================== */}

        <Text style={styles.sectionTitleStandalone}>
          Performance
        </Text>

        <View style={styles.performanceCard}>

          {/* SATISFACTION */}

          <View style={styles.performanceRow}>

            <View
              style={[
                styles.performanceIcon,
                styles.performanceBlue,
              ]}
            >
              <Text style={styles.performanceEmoji}>
                ★
              </Text>
            </View>

            <View style={styles.performanceContent}>

              <Text style={styles.performanceTitle}>
                Customer satisfaction
              </Text>

              <Text style={styles.performanceSubtitle}>
                Based on recent conversations
              </Text>

            </View>

            <Text style={styles.performanceValue}>
              94%
            </Text>

          </View>

          <View style={styles.performanceDivider} />

          {/* RESOLUTION RATE */}

          <View style={styles.performanceRow}>

            <View
              style={[
                styles.performanceIcon,
                styles.performanceGreen,
              ]}
            >
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M5 12.5L9.5 17L19 7"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>

            <View style={styles.performanceContent}>

              <Text style={styles.performanceTitle}>
                Resolution rate
              </Text>

              <Text style={styles.performanceSubtitle}>
                Conversations successfully resolved
              </Text>

            </View>

            <Text style={styles.performanceValue}>
              77%
            </Text>

          </View>

          <View style={styles.performanceDivider} />

          {/* RESPONSE */}

          <View style={styles.performanceRow}>

            <View
              style={[
                styles.performanceIcon,
                styles.performancePurple,
              ]}
            >
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <Circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="#7C3AED"
                  strokeWidth="1.8"
                  fill="none"
                />

                <Path
                  d="M12 7.5V12L15 14"
                  stroke="#7C3AED"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </Svg>
            </View>

            <View style={styles.performanceContent}>

              <Text style={styles.performanceTitle}>
                Average response
              </Text>

              <Text style={styles.performanceSubtitle}>
                Time to first response
              </Text>

            </View>

            <Text style={styles.performanceValue}>
              4m 12s
            </Text>

          </View>

        </View>

        {/* ===================================================
            RECENT ACTIVITY
        =================================================== */}

        <Text style={styles.sectionTitleStandalone}>
          Recent activity
        </Text>

        <View style={styles.activityCard}>

          <View style={styles.activityRow}>

            <View
              style={[
                styles.activityDot,
                styles.activityDotBlue,
              ]}
            />

            <View style={styles.activityContent}>

              <Text style={styles.activityTitle}>
                Conversation resolved
              </Text>

              <Text style={styles.activitySubtitle}>
                Order delivery problem
              </Text>

            </View>

            <Text style={styles.activityTime}>
              8m
            </Text>

          </View>

          <View style={styles.activityDivider} />

          <View style={styles.activityRow}>

            <View
              style={[
                styles.activityDot,
                styles.activityDotGreen,
              ]}
            />

            <View style={styles.activityContent}>

              <Text style={styles.activityTitle}>
                Customer replied
              </Text>

              <Text style={styles.activitySubtitle}>
                Refund request
              </Text>

            </View>

            <Text style={styles.activityTime}>
              21m
            </Text>

          </View>

          <View style={styles.activityDivider} />

          <View style={styles.activityRow}>

            <View
              style={[
                styles.activityDot,
                styles.activityDotOrange,
              ]}
            />

            <View style={styles.activityContent}>

              <Text style={styles.activityTitle}>
                New conversation
              </Text>

              <Text style={styles.activitySubtitle}>
                Payment issue
              </Text>

            </View>

            <Text style={styles.activityTime}>
              35m
            </Text>

          </View>

        </View>

        <View style={styles.bottomSpace} />

      </ScrollView>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <View style={styles.bottomNav}>

        {/* INBOX */}

        <Pressable
          style={styles.navItem}
          onPress={openInbox}
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
              fill={
                isInboxActive
                  ? '#1458E8'
                  : 'none'
              }
              stroke={
                isInboxActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth={
                isInboxActive
                  ? 0
                  : 1.7
              }
            />

            <Path
              d="M4 7.5L12 13L20 7.5"
              stroke={
                isInboxActive
                  ? '#FFFFFF'
                  : '#344054'
              }
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

          </Svg>

          <Text
            style={
              isInboxActive
                ? styles.navTextActive
                : styles.navText
            }
          >
            Inbox
          </Text>

        </Pressable>

        {/* CHAT */}

        <Pressable
          style={styles.navItem}
          onPress={openChat}
        >

          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >

            <Path
              d="M5 5.5H19C20.1 5.5 21 6.4 21 7.5V15.5C21 16.6 20.1 17.5 19 17.5H11L7 20V17.5H5C3.9 17.5 3 16.6 3 15.5V7.5C3 6.4 3.9 5.5 5 5.5Z"
              stroke={
                isChatActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            <Circle
              cx="8"
              cy="11.5"
              r="1"
              fill={
                isChatActive
                  ? '#1458E8'
                  : '#344054'
              }
            />

            <Circle
              cx="12"
              cy="11.5"
              r="1"
              fill={
                isChatActive
                  ? '#1458E8'
                  : '#344054'
              }
            />

            <Circle
              cx="16"
              cy="11.5"
              r="1"
              fill={
                isChatActive
                  ? '#1458E8'
                  : '#344054'
              }
            />

          </Svg>

          <Text
            style={
              isChatActive
                ? styles.navTextActive
                : styles.navText
            }
          >
            Chats
          </Text>

        </Pressable>

        {/* STATS */}

        <Pressable
          style={styles.navItem}
          onPress={openStats}
        >

          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >

            <Path
              d="M4 19V10"
              stroke={
                isStatsActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="2"
              strokeLinecap="round"
            />

            <Path
              d="M10 19V5"
              stroke={
                isStatsActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="2"
              strokeLinecap="round"
            />

            <Path
              d="M16 19V12"
              stroke={
                isStatsActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="2"
              strokeLinecap="round"
            />

            <Path
              d="M21 19H3"
              stroke={
                isStatsActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="1.7"
              strokeLinecap="round"
            />

            <Path
              d="M14 9L17 6L20 8"
              stroke={
                isStatsActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

          </Svg>

          <Text
            style={
              isStatsActive
                ? styles.navTextActive
                : styles.navText
            }
          >
            Stats
          </Text>

        </Pressable>

        {/* PROFILE */}

        <Pressable
          style={styles.navItem}
          onPress={openProfile}
        >

          <Svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
          >

            <Circle
              cx="12"
              cy="8"
              r="3.2"
              stroke={
                isProfileActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="1.7"
              fill="none"
            />

            <Path
              d="M5.5 19C5.5 15.8 8.2 13.5 12 13.5C15.8 13.5 18.5 15.8 18.5 19"
              stroke={
                isProfileActive
                  ? '#1458E8'
                  : '#344054'
              }
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
            />

          </Svg>

          <Text
            style={
              isProfileActive
                ? styles.navTextActive
                : styles.navText
            }
          >
            Profile
          </Text>

        </Pressable>

      </View>

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
    backgroundColor: '#FFFFFF',
  },

  logo: {
    width: 145,
    height: 48,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    position: 'relative',
  },

  avatarImage: {
    width: 42,
    height: 42,
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
     SCROLL
  ========================================================= */

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },

  bottomSpace: {
    height: 20,
  },

  /* =========================================================
     TITLE
  ========================================================= */

  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#667085',
    marginTop: 4,
  },

  periodBadge: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginTop: 4,
  },

  periodBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1458E8',
  },

  /* =========================================================
     OVERVIEW
  ========================================================= */

  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  statCard: {
    width: '48.2%',
    minHeight: 145,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF1F5',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
  },

  statCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statIconBlue: {
    backgroundColor: '#EAF1FF',
  },

  statIconGreen: {
    backgroundColor: '#EAF8EE',
  },

  statIconOrange: {
    backgroundColor: '#FFF5E6',
  },

  statIconPurple: {
    backgroundColor: '#F1EBFF',
  },

  growthText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1458E8',
  },

  growthTextGreen: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },

  neutralText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F59E0B',
  },

  statValue: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '700',
    color: '#101828',
  },

  statLabel: {
    fontSize: 12,
    lineHeight: 17,
    color: '#667085',
    marginTop: 3,
  },

  /* =========================================================
     SECTION HEADER
  ========================================================= */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '600',
    color: '#101828',
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#667085',
    marginTop: 2,
  },

  totalSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1458E8',
  },

  /* =========================================================
     CHART
  ========================================================= */

  chartCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF1F5',
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  chartMainValue: {
    fontSize: 25,
    fontWeight: '700',
    color: '#101828',
  },

  chartMainLabel: {
    fontSize: 12,
    color: '#667085',
    marginTop: 1,
  },

  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1458E8',
    marginRight: 6,
  },

  legendText: {
    fontSize: 11,
    color: '#667085',
  },

  chartArea: {
    height: 190,
    marginTop: 18,
    position: 'relative',
  },

  gridLineOne: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 5,
    height: 1,
    backgroundColor: '#EEF1F5',
  },

  gridLineTwo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 47,
    height: 1,
    backgroundColor: '#EEF1F5',
  },

  gridLineThree: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 89,
    height: 1,
    backgroundColor: '#EEF1F5',
  },

  gridLineFour: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 131,
    height: 1,
    backgroundColor: '#EEF1F5',
  },

  barsContainer: {
    position: 'absolute',
    left: 4,
    right: 4,
    bottom: 0,
    height: 160,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },

  barColumn: {
    height: 160,
    width: 27,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bar: {
    width: 18,
    borderRadius: 9,
    marginBottom: 10,
  },

  dayLabel: {
    fontSize: 11,
    color: '#98A2B3',
  },

  /* =========================================================
     PERFORMANCE
  ========================================================= */

  sectionTitleStandalone: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 12,
  },

  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF1F5',
    paddingHorizontal: 15,
    marginBottom: 28,
  },

  performanceRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
  },

  performanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  performanceBlue: {
    backgroundColor: '#EAF1FF',
  },

  performanceGreen: {
    backgroundColor: '#EAF8EE',
  },

  performancePurple: {
    backgroundColor: '#F1EBFF',
  },

  performanceEmoji: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1458E8',
  },

  performanceContent: {
    flex: 1,
    minWidth: 0,
  },

  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },

  performanceSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: '#667085',
    marginTop: 2,
  },

  performanceValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#101828',
    marginLeft: 8,
  },

  performanceDivider: {
    height: 1,
    backgroundColor: '#EEF1F5',
    marginLeft: 52,
  },

  /* =========================================================
     RECENT ACTIVITY
  ========================================================= */

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF1F5',
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  activityRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },

  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 13,
  },

  activityDotBlue: {
    backgroundColor: '#1458E8',
  },

  activityDotGreen: {
    backgroundColor: '#22C55E',
  },

  activityDotOrange: {
    backgroundColor: '#F59E0B',
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },

  activitySubtitle: {
    fontSize: 11,
    color: '#667085',
    marginTop: 3,
  },

  activityTime: {
    fontSize: 11,
    color: '#98A2B3',
    marginLeft: 8,
  },

  activityDivider: {
    height: 1,
    backgroundColor: '#EEF1F5',
    marginLeft: 23,
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
import { useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Svg, {
  Circle,
  Path,
  Rect,
} from 'react-native-svg';

type ConversationStatus = 'in_progress' | 'closed';

type Conversation = {
  id: number;
  subject: string;
  preview: string;
  time: string;
  status: ConversationStatus;
  statusLabel: string;
  statusColor: string;
  statusBackground: string;
};

const conversations: Conversation[] = [
  {
    id: 1,
    subject: 'Order delivery problem',
    preview:
      "We're checking your order now. We will update you shortly.",
    time: '5m ago',
    status: 'in_progress',
    statusLabel: 'In progress',
    statusColor: '#173B73',
    statusBackground: '#E7EEFF',
  },
  {
    id: 2,
    subject: 'Payment issue',
    preview:
      'Your payment has been successfully processed.',
    time: 'Yesterday',
    status: 'in_progress',
    statusLabel: 'In progress',
    statusColor: '#173B73',
    statusBackground: '#E7EEFF',
  },
  {
    id: 3,
    subject: 'Refund request',
    preview:
      'Your refund was approved and will be processed within 2-3 business days.',
    time: '2d ago',
    status: 'closed',
    statusLabel: 'Closed',
    statusColor: '#344054',
    statusBackground: '#E9EDF3',
  },
];

export default function ChatScreen() {
  const router = useRouter();

  const openConversation = (conversation: Conversation) => {
    router.push({
      pathname: '/conversation',
      params: {
        conversationId: String(conversation.id),
        subject: conversation.subject,
      },
    });
  };

  const goToInbox = () => {
    router.replace('/inbox');
  };

  const goToChats = () => {
    // Already on Chats.
  };

  const goToProfile = () => {
    router.replace('/profile');
  };

  const startNewConversation = () => {
    router.push('/conversation');
  };

  return (
    <View style={styles.container}>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <View style={styles.header}>

          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>
              Hello,Housame <Text style={styles.wave}>👋</Text>
            </Text>

            <Text style={styles.subtitle}>
              How can we help you today?
            </Text>
          </View>

          {/* PROFILE IMAGE */}

          <Pressable
            style={styles.profileButton}
            onPress={goToProfile}
          >
            <Image
              source={require('../../assets/images/ProfilMan.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />

            <View style={styles.profileOnlineDot} />
          </Pressable>

        </View>

        {/* ===================================================
            START NEW CONVERSATION
        =================================================== */}

        <Pressable
          style={({ pressed }) => [
            styles.newConversationCard,
            pressed && styles.pressed,
          ]}
          onPress={startNewConversation}
        >

          {/* CHAT ICON */}

          <View style={styles.newConversationIconContainer}>
            <Svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <Path
                d="M5 4.5H19C20.1 4.5 21 5.4 21 6.5V16C21 17.1 20.1 18 19 18H11L6 21V18H5C3.9 18 3 17.1 3 16V6.5C3 5.4 3.9 4.5 5 4.5Z"
                stroke="#FFFFFF"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              <Path
                d="M7.5 9H16.5"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              <Path
                d="M7.5 12.5H13.5"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </Svg>
          </View>

          {/* TEXT */}

          <View style={styles.newConversationText}>
            <Text style={styles.newConversationTitle}>
              Start a new conversation
            </Text>

            <Text style={styles.newConversationSubtitle}>
              We usually reply in a few minutes
            </Text>
          </View>

          {/* ARROW */}

          <View style={styles.arrowContainer}>
            <Svg
              width={25}
              height={25}
              viewBox="0 0 24 24"
            >
              <Path
                d="M9 5L16 12L9 19"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>

        </Pressable>

        {/* ===================================================
            MY CONVERSATIONS
        =================================================== */}

        <Text style={styles.sectionTitle}>
          My conversations
        </Text>

        {/* ===================================================
            CONVERSATION LIST
        =================================================== */}

        <View style={styles.conversationList}>

          {conversations.map((conversation) => (
            <Pressable
              key={conversation.id}
              onPress={() =>
                openConversation(conversation)
              }
              style={({ pressed }) => [
                styles.conversationCard,
                pressed && styles.conversationCardPressed,
              ]}
            >

              {/* STATUS DOT */}

              <View
                style={[
                  styles.statusDot,
                  conversation.status === 'in_progress'
                    ? styles.statusDotGreen
                    : styles.statusDotClosed,
                ]}
              />

              {/* CARD CONTENT */}

              <View style={styles.cardContent}>

                {/* TOP ROW */}

                <View style={styles.cardTopRow}>

                  <Text
                    style={styles.conversationTitle}
                    numberOfLines={1}
                  >
                    {conversation.subject}
                  </Text>

                  <Text style={styles.conversationTime}>
                    {conversation.time}
                  </Text>

                </View>

                {/* PREVIEW */}

                <Text
                  style={styles.conversationPreview}
                  numberOfLines={3}
                >
                  {conversation.preview}
                </Text>

                {/* STATUS */}

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        conversation.statusBackground,
                    },
                  ]}
                >

                  {conversation.status === 'closed' ? (
                    <View style={styles.closedIcon}>
                      <Text style={styles.closedIconText}>
                        •
                      </Text>
                    </View>
                  ) : null}

                  <Text
                    style={[
                      styles.statusBadgeText,
                      {
                        color:
                          conversation.statusColor,
                      },
                    ]}
                  >
                    {conversation.statusLabel}
                  </Text>

                </View>

              </View>

            </Pressable>
          ))}

        </View>

        {/* SPACE ABOVE NAV */}

        <View style={styles.bottomSpace} />

      </ScrollView>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <View style={styles.bottomNavigation}>

        {/* ===================================================
            INBOX
        =================================================== */}

        <Pressable
          style={styles.navItem}
          onPress={goToInbox}
        >

          <Svg
            width={26}
            height={26}
            viewBox="0 0 24 24"
          >
            <Rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2.5"
              fill="none"
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

        {/* ===================================================
            CHATS - ACTIVE
        =================================================== */}

        <Pressable
          style={styles.navItem}
          onPress={goToChats}
        >

          <Svg
            width={27}
            height={27}
            viewBox="0 0 24 24"
          >
            <Path
              d="M5 5.5H19C20.1 5.5 21 6.4 21 7.5V15.5C21 16.6 20.1 17.5 19 17.5H11L7 20V17.5H5C3.9 17.5 3 16.6 3 15.5V7.5C3 6.4 3.9 5.5 5 5.5Z"
              fill="#1458E8"
              stroke="#1458E8"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <Circle
              cx="8"
              cy="11.5"
              r="1"
              fill="#FFFFFF"
            />

            <Circle
              cx="12"
              cy="11.5"
              r="1"
              fill="#FFFFFF"
            />

            <Circle
              cx="16"
              cy="11.5"
              r="1"
              fill="#FFFFFF"
            />
          </Svg>

          <Text style={styles.navTextActive}>
            Chats
          </Text>

        </Pressable>

        {/* ===================================================
            PROFILE
        =================================================== */}

        <Pressable
          style={styles.navItem}
          onPress={goToProfile}
        >

          <Svg
            width={26}
            height={26}
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

        </Pressable>

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
    backgroundColor: '#F8FAFD',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
  },

  /* =========================================================
     HEADER
  ========================================================= */

  header: {
    width: '100%',
    minHeight: 118,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTextContainer: {
    flex: 1,
    paddingRight: 12,
  },

  greeting: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '700',
    color: '#101828',
    letterSpacing: -0.5,
  },

  wave: {
    fontSize: 28,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    color: '#475467',
  },

  /* =========================================================
     PROFILE
  ========================================================= */

  profileButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },

  profileOnlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  /* =========================================================
     NEW CONVERSATION
  ========================================================= */

  newConversationCard: {
    width: '100%',
    minHeight: 94,
    borderRadius: 15,
    backgroundColor: '#1458E8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,

    shadowColor: '#1458E8',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 6,
  },

  newConversationIconContainer: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  newConversationText: {
    flex: 1,
  },

  newConversationTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  newConversationSubtitle: {
    marginTop: 3,
    fontSize: 13.5,
    lineHeight: 19,
    color: '#DCE8FF',
  },

  arrowContainer: {
    width: 28,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  pressed: {
    opacity: 0.88,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  /* =========================================================
     SECTION TITLE
  ========================================================= */

  sectionTitle: {
    marginTop: 38,
    marginBottom: 20,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '600',
    color: '#101828',
  },

  /* =========================================================
     CONVERSATIONS
  ========================================================= */

  conversationList: {
    width: '100%',
  },

  conversationCard: {
    width: '100%',
    minHeight: 142,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 10,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 49,
    paddingRight: 15,

    borderWidth: 1,
    borderColor: '#EEF1F5',

    shadowColor: '#101828',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.045,
    shadowRadius: 8,
    elevation: 2,

    position: 'relative',
  },

  conversationCardPressed: {
    opacity: 0.75,
    transform: [
      {
        scale: 0.995,
      },
    ],
  },

  /* =========================================================
     STATUS DOT
  ========================================================= */

  statusDot: {
    position: 'absolute',
    left: 20,
    top: 26,
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  statusDotGreen: {
    backgroundColor: '#16A34A',
  },

  statusDotClosed: {
    backgroundColor: '#AAB2BF',
  },

  /* =========================================================
     CARD CONTENT
  ========================================================= */

  cardContent: {
    flex: 1,
    minWidth: 0,
  },

  cardTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  conversationTitle: {
    flex: 1,
    fontSize: 16.5,
    lineHeight: 22,
    fontWeight: '600',
    color: '#101828',
    marginRight: 10,
  },

  conversationTime: {
    fontSize: 12.5,
    lineHeight: 20,
    fontWeight: '400',
    color: '#475467',
  },

  conversationPreview: {
    marginTop: 7,
    paddingRight: 5,
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: '400',
    color: '#475467',
  },

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 9,
    minHeight: 24,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadgeText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
  },

  closedIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667085',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },

  closedIconText: {
    color: '#FFFFFF',
    fontSize: 9,
    lineHeight: 10,
    fontWeight: '700',
    marginTop: -1,
  },

  /* =========================================================
     BOTTOM SPACE
  ========================================================= */

  bottomSpace: {
    height: 28,
  },

  /* =========================================================
     BOTTOM NAVIGATION
  ========================================================= */

  bottomNavigation: {
    height: 88,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF2',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 20,
    paddingTop: 7,
    paddingBottom: 8,
  },

  navItem: {
    flex: 1,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  navText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    color: '#344054',
  },

  navTextActive: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    color: '#1458E8',
  },
});
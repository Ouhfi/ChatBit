import { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import Svg, {
  Circle,
  Path,
  Rect,
} from 'react-native-svg';

type ConversationStatus = 'pending' | 'ongoing';

type Conversation = {
  id: number;
  status: ConversationStatus;
  name: string;
  time: string;
  subject: string;
  preview: string;
  image: ImageSourcePropType;
  imageKey: string;
  unread?: number;
};

const conversations: Conversation[] = [
  {
    id: 1,
    status: 'pending',
    name: 'Housame Es-safy',
    time: '2m ago',
    subject: 'Order delivery problem',
    preview: "Where is my order? I haven't received any update.",
    image: require('../../assets/images/ProfilMan.png'),
    imageKey: 'ProfilMan.png',
    unread: 2,
  },
  {
    id: 2,
    status: 'pending',
    name: 'Olivia Bennett',
    time: '15m ago',
    subject: 'Refund request',
    preview: 'I would like to request a refund for my last order.',
    image: require('../../assets/images/ProfilGril.png'),
    imageKey: 'ProfilGril.png',
    unread: 3,
  },
  {
    id: 3,
    status: 'ongoing',
    name: 'Liam Carter',
    time: '18m ago',
    subject: 'Payment issue',
    preview: 'The payment failed but the amount was deducted.',
    image: require('../../assets/images/Profilliam.png'),
    imageKey: 'Profilliam.png',
    unread: 1,
  },
  {
    id: 4,
    status: 'ongoing',
    name: 'Emily Morgan',
    time: '1h ago',
    subject: 'Product exchange',
    preview: 'I want to exchange my product for a different size.',
    image: require('../../assets/images/Emily Morgan.png'),
    imageKey: 'Emily Morgan.png',
    unread: 2,
  },
];

export default function InboxScreen() {
  const router = useRouter();
  const pathname = usePathname();

  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'ongoing'
  >('all');

  const isInboxActive = pathname === '/inbox';
  const isChatActive = pathname === '/chat';
  const isStatsActive = pathname === '/stats';
  const isProfileActive = pathname === '/profile';

  const pendingCount = conversations.filter(
    (conversation) => conversation.status === 'pending',
  ).length;

  const ongoingCount = conversations.filter(
    (conversation) => conversation.status === 'ongoing',
  ).length;

  const filteredConversations = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const matchesTab =
        activeTab === 'all' ||
        conversation.status === activeTab;

      const matchesSearch =
        query.length === 0 ||
        conversation.name.toLowerCase().includes(query) ||
        conversation.subject.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [searchText, activeTab]);

  const pendingConversations = filteredConversations.filter(
    (conversation) => conversation.status === 'pending',
  );

  const ongoingConversations = filteredConversations.filter(
    (conversation) => conversation.status === 'ongoing',
  );

  const openConversation = (conversation: Conversation) => {
    router.push({
      pathname: '/conversation',
      params: {
        conversationId: String(conversation.id),
        name: conversation.name,
        subject: conversation.subject,
        imageKey: conversation.imageKey,
        status: conversation.status,
      },
    });
  };

  const openInbox = () => {
    if (pathname !== '/inbox') {
      router.replace('/inbox');
    }
  };

  const openChats = () => {
    if (pathname !== '/chat') {
      router.replace('/chat');
    }
  };

  const openStats = () => {
    if (pathname !== '/stats') {
      router.replace('/stats');
    }
  };

  const openProfile = () => {
    if (pathname !== '/profile') {
      router.replace('/profile');
    }
  };

  const cycleFilter = () => {
    if (activeTab === 'all') {
      setActiveTab('pending');
    } else if (activeTab === 'pending') {
      setActiveTab('ongoing');
    } else {
      setActiveTab('all');
    }
  };

  const renderConversationCard = (
    conversation: Conversation,
  ) => {
    const isPending = conversation.status === 'pending';

    return (
      <Pressable
        key={conversation.id}
        onPress={() => openConversation(conversation)}
        style={({ pressed }) => [
          styles.conversationCard,
          pressed && styles.conversationCardPressed,
        ]}
      >
        <View
          style={
            isPending
              ? styles.pendingDot
              : styles.ongoingDot
          }
        />

        <View style={styles.cardAvatar}>
          <Image
            source={conversation.image}
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
              {conversation.name}
            </Text>

            <Text style={styles.time}>
              {conversation.time}
            </Text>
          </View>

          <Text
            style={styles.subject}
            numberOfLines={1}
          >
            {conversation.subject}
          </Text>

          <Text
            style={styles.preview}
            numberOfLines={2}
          >
            {conversation.preview}
          </Text>
        </View>

        {conversation.unread && conversation.unread > 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {conversation.unread}
            </Text>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/ChatBitLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.headerRight}>
          <Pressable
            style={styles.notification}
            onPress={() => {}}
          >
            <Text style={styles.bell}>♧</Text>

            <View style={styles.notificationDot} />
          </Pressable>

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
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            Inbox
          </Text>

          {/* SEARCH */}
          <View style={styles.searchRow}>
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
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            {/* FILTER */}
            <Pressable
              style={[
                styles.filterButton,
                activeTab !== 'all' &&
                  styles.filterButtonActive,
              ]}
              onPress={cycleFilter}
            >
              <View style={styles.filterLine}>
                <View style={styles.filterSmallDot} />
              </View>

              <View style={styles.filterLine}>
                <View style={styles.filterLargeDot} />
              </View>

              <View style={styles.filterLine}>
                <View style={styles.filterSmallDot} />
              </View>
            </Pressable>
          </View>

          {/* TABS */}
          <View style={styles.tabs}>
            <Pressable
              onPress={() => setActiveTab('all')}
              style={[
                styles.tab,
                activeTab === 'all' &&
                  styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'all' &&
                    styles.activeTabText,
                ]}
              >
                All
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab('pending')}
              style={[
                styles.tab,
                activeTab === 'pending' &&
                  styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'pending' &&
                    styles.activeTabText,
                ]}
              >
                Pending
              </Text>

              <View style={styles.pendingBadge}>
                <Text style={styles.badgeText}>
                  {pendingCount}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab('ongoing')}
              style={[
                styles.tab,
                activeTab === 'ongoing' &&
                  styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'ongoing' &&
                    styles.activeTabText,
                ]}
              >
                Ongoing
              </Text>

              <View style={styles.ongoingBadge}>
                <Text style={styles.badgeText}>
                  {ongoingCount}
                </Text>
              </View>
            </Pressable>
          </View>

          {/* EMPTY */}
          {filteredConversations.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                No conversations found
              </Text>

              <Text style={styles.emptyText}>
                Try another name or conversation.
              </Text>
            </View>
          )}

          {/* PENDING */}
          {pendingConversations.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>
                Pending ({pendingConversations.length})
              </Text>

              {pendingConversations.map(
                renderConversationCard,
              )}
            </View>
          )}

          {/* ONGOING */}
          {ongoingConversations.length > 0 && (
            <View>
              <Text style={styles.sectionTitleOngoing}>
                Ongoing ({ongoingConversations.length})
              </Text>

              {ongoingConversations.map(
                renderConversationCard,
              )}
            </View>
          )}

          <View style={styles.bottomScrollSpace} />
        </ScrollView>
      </View>

      {/* BOTTOM NAVIGATION */}
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
                isInboxActive ? 0 : 1.7
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

        {/* CHATS */}
        <Pressable
          style={styles.navItem}
          onPress={openChats}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

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

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
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
    borderColor: '#CDD4DC',
    backgroundColor: '#E5EAF0',
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

  filterButton: {
    width: 56,
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CDD4DC',
    backgroundColor: '#E5EAF0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  filterButtonActive: {
    backgroundColor: '#E8F0FF',
    borderColor: '#1458E8',
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

  conversationCardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }],
  },

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

  cardContent: {
    flex: 1,
    minWidth: 0,
    paddingTop: 1,
    paddingRight: 28,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
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
  },

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

  emptyState: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
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


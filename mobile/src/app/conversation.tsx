import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Svg, {
  Circle,
  Path,
} from 'react-native-svg';

/* =========================================================
   TYPES
========================================================= */

type ConversationStatus =
  | 'pending'
  | 'ongoing'
  | 'closed';

type ConversationData = {
  id: string;
  name: string;
  subject: string;
  status: ConversationStatus;
  image: ImageSourcePropType;
};

type Message = {
  id: number;
  type: 'incoming' | 'outgoing';
  text: string;
  time: string;
};

/* =========================================================
   CONVERSATIONS
========================================================= */

const conversations: Record<
  string,
  ConversationData
> = {
  '1': {
    id: '1',
    name: 'Housame Es-safy',
    subject: 'Order delivery problem',
    status: 'pending',
    image: require('../../assets/images/ProfilMan.png'),
  },

  '2': {
    id: '2',
    name: 'Olivia Bennett',
    subject: 'Refund request',
    status: 'pending',
    image: require('../../assets/images/ProfilGril.png'),
  },

  '3': {
    id: '3',
    name: 'Liam Carter',
    subject: 'Payment issue',
    status: 'ongoing',
    image: require('../../assets/images/Profilliam.png'),
  },

  '4': {
    id: '4',
    name: 'Emily Morgan',
    subject: 'Product exchange',
    status: 'ongoing',
    image: require('../../assets/images/Emily Morgan.png'),
  },
};

/* =========================================================
   MESSAGES PER CONVERSATION
========================================================= */

const messagesByConversation: Record<
  string,
  Message[]
> = {
  '1': [
    {
      id: 1,
      type: 'incoming',
      text: 'Hi, I have a problem with my order.',
      time: '10:30 AM',
    },
    {
      id: 2,
      type: 'outgoing',
      text:
        "Hi Housame! I'd be happy to help.\nCould you share your order number?",
      time: '10:31 AM',
    },
    {
      id: 3,
      type: 'incoming',
      text: "Sure, it's #SOQ-48291.",
      time: '10:32 AM',
    },
    {
      id: 4,
      type: 'outgoing',
      text:
        'Thanks! Let me check that for you real quick.',
      time: '10:33 AM',
    },
  ],

  '2': [
    {
      id: 1,
      type: 'incoming',
      text:
        'Hi, I would like to request a refund for my last order.',
      time: '11:05 AM',
    },
    {
      id: 2,
      type: 'outgoing',
      text:
        'Hi Olivia! Of course. Could you please share your order number?',
      time: '11:06 AM',
    },
    {
      id: 3,
      type: 'incoming',
      text:
        "Sure, it's #REF-23981.",
      time: '11:07 AM',
    },
    {
      id: 4,
      type: 'outgoing',
      text:
        "Thank you. I'll check the refund details for you.",
      time: '11:08 AM',
    },
  ],

  '3': [
    {
      id: 1,
      type: 'incoming',
      text:
        'My payment failed but the amount was deducted from my account.',
      time: '10:15 AM',
    },
    {
      id: 2,
      type: 'outgoing',
      text:
        "I'm sorry about that. Let me check the payment status for you.",
      time: '10:17 AM',
    },
    {
      id: 3,
      type: 'incoming',
      text:
        'Thank you. I just want to make sure I was not charged twice.',
      time: '10:18 AM',
    },
    {
      id: 4,
      type: 'outgoing',
      text:
        "I'll verify the transaction and get back to you shortly.",
      time: '10:19 AM',
    },
  ],

  '4': [
    {
      id: 1,
      type: 'incoming',
      text:
        'Hello, I want to exchange my product for a different size.',
      time: '9:40 AM',
    },
    {
      id: 2,
      type: 'outgoing',
      text:
        'Sure! I can help you with the exchange. What size would you like?',
      time: '9:42 AM',
    },
    {
      id: 3,
      type: 'incoming',
      text:
        'I would like to exchange it for size M.',
      time: '9:43 AM',
    },
    {
      id: 4,
      type: 'outgoing',
      text:
        "Perfect. I'll check the availability of size M for you.",
      time: '9:44 AM',
    },
  ],
};

/* =========================================================
   SCREEN
========================================================= */

export default function ChatScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    conversationId?: string;
    name?: string;
    subject?: string;
    imageKey?: string;
    status?: string;
  }>();

  /* =======================================================
     CONVERSATION ID
  ======================================================= */

  const conversationId = String(
    params.conversationId ?? '1',
  );

  /* =======================================================
     GET CONVERSATION
  ======================================================= */

  const conversation = useMemo(() => {
    return (
      conversations[conversationId] ??
      conversations['1']
    );
  }, [conversationId]);

  /* =======================================================
     DISPLAY DATA
  ======================================================= */

  const displayName =
    params.name || conversation.name;

  const displaySubject =
    params.subject || conversation.subject;

  const displayImage =
    conversation.image;

  /* =======================================================
     INITIAL MESSAGES
  ======================================================= */

  const initialMessages = useMemo(() => {
    return (
      messagesByConversation[conversationId] ??
      messagesByConversation['1']
    );
  }, [conversationId]);

  /* =======================================================
     STATE
  ======================================================= */

  const [message, setMessage] =
    useState('');

  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>(
      conversation.status,
    );

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = () => {
    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      return;
    }

    const now = new Date();

    const time =
      now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });

    const newMessage: Message = {
      id: Date.now(),
      type: 'outgoing',
      text: trimmedMessage,
      time,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newMessage,
    ]);

    setMessage('');
  };

  /* =======================================================
     CLOSE CONVERSATION
  ======================================================= */

  const closeConversation = () => {
    setConversationStatus('closed');
  };

  /* =======================================================
     BACK TO INBOX
  ======================================================= */

  const goBackToInbox = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/inbox');
    }
  };

  /* =======================================================
     STATUS
  ======================================================= */

  const statusLabel =
    conversationStatus === 'closed'
      ? 'Closed'
      : conversationStatus === 'ongoing'
        ? 'In progress'
        : 'Pending';

  const statusStyle =
    conversationStatus === 'closed'
      ? styles.statusButtonClosed
      : styles.statusButton;

  const statusTextStyle =
    conversationStatus === 'closed'
      ? styles.statusTextClosed
      : styles.statusText;

  /* =======================================================
     RENDER MESSAGE
  ======================================================= */

  const renderMessage = (
    item: Message,
  ) => {
    const isOutgoing =
      item.type === 'outgoing';

    return (
      <View
        key={item.id}
        style={
          isOutgoing
            ? styles.outgoingMessage
            : styles.incomingMessage
        }
      >
        <Text
          style={
            isOutgoing
              ? styles.outgoingText
              : styles.incomingText
          }
        >
          {item.text}
        </Text>

        <View
          style={
            isOutgoing
              ? styles.messageMeta
              : styles.incomingMeta
          }
        >
          <Text
            style={
              isOutgoing
                ? styles.outgoingTime
                : styles.incomingTime
            }
          >
            {item.time}
          </Text>

          {isOutgoing ? (
            <Text style={styles.checkMarks}>
              ✓✓
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  /* =======================================================
     SCREEN
  ======================================================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          {/* BACK TO INBOX */}

          <Pressable
            style={styles.backButton}
            onPress={goBackToInbox}
            hitSlop={10}
          >
            <Svg
              width={25}
              height={25}
              viewBox="0 0 24 24"
            >
              <Path
                d="M15 18L9 12L15 6"
                stroke="#111827"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </Pressable>

          {/* USER */}

          <View style={styles.userInfo}>

            <View style={styles.chatAvatar}>
              <Image
                source={displayImage}
                style={styles.chatAvatarImage}
                resizeMode="cover"
              />

              {conversationStatus !==
              'closed' ? (
                <View
                  style={
                    styles.chatOnlineDot
                  }
                />
              ) : null}
            </View>

            <View style={styles.userText}>

              <Text
                style={styles.userName}
                numberOfLines={1}
              >
                {displayName}
              </Text>

              <Text style={styles.userStatus}>
                {conversationStatus ===
                'closed'
                  ? 'Offline'
                  : 'Online'}
              </Text>

            </View>
          </View>

          {/* MORE */}

          <Pressable
            style={styles.moreButton}
            onPress={() => {}}
            hitSlop={10}
          >
            <View style={styles.moreDot} />
            <View style={styles.moreDot} />
            <View style={styles.moreDot} />
          </Pressable>

        </View>

        {/* =================================================
            SUBJECT + STATUS
        ================================================= */}

        <View style={styles.subjectContainer}>

          <Text
            style={styles.subjectTitle}
            numberOfLines={2}
          >
            {displaySubject}
          </Text>

          <Pressable
            style={statusStyle}
            onPress={() => {
              if (
                conversationStatus ===
                'closed'
              ) {
                return;
              }

              setConversationStatus(
                conversationStatus ===
                  'pending'
                  ? 'ongoing'
                  : 'pending',
              );
            }}
          >
            <Text
              style={statusTextStyle}
            >
              {statusLabel}
            </Text>

            {conversationStatus !==
            'closed' ? (
              <Svg
                width={17}
                height={17}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M7 10L12 15L17 10"
                  stroke="#C87916"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            ) : null}
          </Pressable>

        </View>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={
            styles.messagesContent
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* TODAY */}

          <View
            style={styles.todayContainer}
          >
            <Text style={styles.todayText}>
              Today
            </Text>
          </View>

          {/* CHAT MESSAGES */}

          {messages.map(renderMessage)}

          {/* TYPING */}

          {conversationStatus !==
          'closed' ? (
            <View
              style={styles.typingRow}
            >

              <View
                style={styles.typingAvatar}
              >
                <Image
                  source={displayImage}
                  style={
                    styles.typingAvatarImage
                  }
                  resizeMode="cover"
                />
              </View>

              <View
                style={styles.typingBubble}
              >

                <View
                  style={styles.typingDots}
                >
                  <View
                    style={styles.typingDot}
                  />
                  <View
                    style={styles.typingDot}
                  />
                  <View
                    style={styles.typingDot}
                  />
                </View>

                <Text
                  style={styles.typingText}
                >
                  {displayName} is typing...
                </Text>

              </View>

            </View>
          ) : null}

        </ScrollView>

        {/* =================================================
            MESSAGE INPUT
        ================================================= */}

        {conversationStatus !==
        'closed' ? (
          <View style={styles.inputArea}>

            {/* ATTACHMENT */}

            <Pressable
              style={styles.attachButton}
              onPress={() => {}}
            >
              <Svg
                width={23}
                height={23}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M20.5 11.5L12 20C9.8 22.2 6.2 22.2 4 20C1.8 17.8 1.8 14.2 4 12L12.5 3.5C14.2 1.8 17 1.8 18.7 3.5C20.4 5.2 20.4 8 18.7 9.7L10.2 18.2C9.1 19.3 7.4 19.3 6.3 18.2C5.2 17.1 5.2 15.4 6.3 14.3L14.5 6.1"
                  stroke="#344054"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </Pressable>

            {/* TEXT INPUT */}

            <TextInput
              value={message}
              onChangeText={setMessage}
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="#8A94A6"
              multiline
              textAlignVertical="center"
            />

            {/* SEND */}

            <Pressable
              style={[
                styles.sendButton,
                !message.trim() &&
                  styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M21 3L10 14"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <Path
                  d="M21 3L14 21L10 14L3 10L21 3Z"
                  stroke="#FFFFFF"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </Pressable>

          </View>
        ) : (
          <View
            style={styles.closedMessage}
          >
            <Text
              style={
                styles.closedMessageText
              }
            >
              This conversation is closed.
            </Text>
          </View>
        )}

        {/* =================================================
            CLOSE CONVERSATION
        ================================================= */}

        {conversationStatus !==
        'closed' ? (
          <Pressable
            style={styles.closeButton}
            onPress={closeConversation}
          >

            <Svg
              width={21}
              height={21}
              viewBox="0 0 24 24"
            >
              <Path
                d="M7 10V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V10"
                stroke="#DC2626"
                strokeWidth={1.8}
                strokeLinecap="round"
                fill="none"
              />

              <Path
                d="M5 10H19V21H5V10Z"
                stroke="#DC2626"
                strokeWidth={1.8}
                strokeLinejoin="round"
                fill="none"
              />

              <Circle
                cx="12"
                cy="15.5"
                r="1"
                fill="#DC2626"
              />
            </Svg>

            <Text
              style={styles.closeText}
            >
              Close conversation
            </Text>

          </Pressable>
        ) : null}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===========================================================
   STYLES
=========================================================== */

const styles = StyleSheet.create({
  /* =========================================================
     GENERAL
  ========================================================= */

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },

  /* =========================================================
     HEADER
  ========================================================= */

  header: {
    height: 82,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },

  backButton: {
    width: 38,
    height: 45,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E9EDF2',
    position: 'relative',
    overflow: 'visible',
  },

  chatAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },

  chatOnlineDot: {
    position: 'absolute',
    right: -1,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  userText: {
    marginLeft: 13,
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 3,
  },

  userStatus: {
    fontSize: 15,
    color: '#667085',
  },

  moreButton: {
    width: 32,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

  moreDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#101828',
  },

  /* =========================================================
     SUBJECT
  ========================================================= */

  subjectContainer: {
    minHeight: 76,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  subjectTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#101828',
    marginRight: 10,
  },

  statusButton: {
    height: 40,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: '#FFF2D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusButtonClosed: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C87916',
    marginRight: 3,
  },

  statusTextClosed: {
    fontSize: 15,
    fontWeight: '600',
    color: '#667085',
  },

  /* =========================================================
     MESSAGES
  ========================================================= */

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 18,
  },

  todayContainer: {
    alignSelf: 'center',
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: '#EEF1F5',
    marginBottom: 22,
  },

  todayText: {
    fontSize: 14,
    color: '#475467',
    fontWeight: '500',
  },

  /* =========================================================
     INCOMING MESSAGE
  ========================================================= */

  incomingMessage: {
    alignSelf: 'flex-start',
    width: '84%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEF1F5',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },

  incomingText: {
    fontSize: 16,
    lineHeight: 25,
    color: '#101828',
  },

  incomingMeta: {
    alignItems: 'flex-end',
    marginTop: 9,
  },

  incomingTime: {
    fontSize: 12,
    color: '#667085',
  },

  /* =========================================================
     OUTGOING MESSAGE
  ========================================================= */

  outgoingMessage: {
    alignSelf: 'flex-end',
    width: '76%',
    backgroundColor: '#1458E8',
    borderRadius: 17,
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 12,
    marginBottom: 20,
  },

  outgoingText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#FFFFFF',
  },

  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 7,
  },

  outgoingTime: {
    fontSize: 12,
    color: '#FFFFFF',
    marginRight: 6,
  },

  checkMarks: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* =========================================================
     TYPING
  ========================================================= */

  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 3,
  },

  typingAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    marginRight: 9,
  },

  typingAvatarImage: {
    width: '100%',
    height: '100%',
  },

  typingBubble: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF1F5',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },

  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 11,
    gap: 4,
  },

  typingDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1458E8',
  },

  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#475467',
  },

  /* =========================================================
     INPUT
  ========================================================= */

  inputArea: {
    minHeight: 74,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 7,
  },

  attachButton: {
    width: 48,
    height: 54,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E5EAF0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  messageInput: {
    flex: 1,
    minHeight: 54,
    maxHeight: 96,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E5EAF0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#101828',
  },

  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1458E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.45,
  },

  /* =========================================================
     CLOSED
  ========================================================= */

  closedMessage: {
    minHeight: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closedMessageText: {
    fontSize: 15,
    color: '#667085',
  },

  /* =========================================================
     CLOSE CONVERSATION
  ========================================================= */

  closeButton: {
    height: 64,
    marginHorizontal: 16,
    marginTop: 7,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#FFE0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 9,
  },
});
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import FeedCard from './components/ui/FeedCard';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { colors } from './design-tokens';

const mockFeedData = [
  {
    id: '1',
    merchantName: 'Blue Bottle Coffee',
    timestamp: '10 minutes ago',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likeCount: 12
  },
  {
    id: '2',
    merchantName: 'Shake Shack',
    timestamp: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    likeCount: 8
  },
];

const SHOW_ONBOARDING = true;

const FeedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>FoodFeed</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {mockFeedData.map((item) => (
          <FeedCard
            key={item.id}
            merchantName={item.merchantName}
            timestamp={item.timestamp}
            imageUrl={item.imageUrl}
            likeCount={item.likeCount}
            onPress={() => console.log(`Pressed ${item.merchantName}`)}
            onLike={() => console.log(`Liked ${item.merchantName}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  return SHOW_ONBOARDING ? <OnboardingScreen /> : <FeedScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  }
});

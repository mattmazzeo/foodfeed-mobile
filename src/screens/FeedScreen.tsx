import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import FeedCard from '../components/ui/FeedCard';
import { feedApi, FeedItem, mockFeedItems } from '../services/api';
import { colors, spacing, typography } from '../design-tokens';

export const FeedScreen: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async (cursor?: string, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (!refresh && !cursor) {
        setLoading(true);
      }

      
      setTimeout(() => {
        setFeedItems(mockFeedItems);
        setHasMore(false);
        setNextCursor(undefined);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load feed. Pull down to refresh.');
      console.error('Error fetching feed:', err);
    } finally {
      if (refresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [feedItems]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleRefresh = useCallback(() => {
    fetchFeed(undefined, true);
  }, [fetchFeed]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && nextCursor) {
      fetchFeed(nextCursor);
    }
  }, [loading, hasMore, nextCursor, fetchFeed]);

  const handleLike = useCallback(async (id: string) => {
    try {
      
      setFeedItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, like_count: item.like_count + 1 } : item
        )
      );
    } catch (err) {
      console.error('Error liking feed item:', err);
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: FeedItem }) => {
    const getRelativeTime = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      
      return date.toLocaleDateString();
    };

    return (
      <FeedCard
        merchantName={item.merchant_name}
        timestamp={getRelativeTime(item.transaction_date)}
        imageUrl={item.photo_url || 'https://via.placeholder.com/400x200?text=No+Image'}
        likeCount={item.like_count}
        onLike={() => handleLike(item.id)}
        onPress={() => console.log('Navigate to detail view for', item.id)}
      />
    );
  }, [handleLike]);

  const renderFooter = useCallback(() => {
    if (!loading || refreshing) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }, [loading, refreshing]);

  const renderEmpty = useCallback(() => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error || "No transactions yet. Link your bank account to see your food experiences."}
        </Text>
      </View>
    );
  }, [loading, error]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>FoodFeed</Text>
      </View>
      
      <FlatList
        data={feedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    flexGrow: 1,
  },
  footerLoader: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.darkGray,
    textAlign: 'center',
  },
});

export default FeedScreen;

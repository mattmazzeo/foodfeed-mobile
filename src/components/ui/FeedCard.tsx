import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../design-tokens';

interface FeedCardProps {
  merchantName: string;
  timestamp: string;
  imageUrl: string;
  onPress?: () => void;
  onLike?: () => void;
  likeCount?: number;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  merchantName,
  timestamp,
  imageUrl,
  onPress,
  onLike,
  likeCount = 0,
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.card}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.merchantName}>{merchantName}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            onPress={onLike}
            style={styles.actionButton}
          >
            <Text style={styles.emoji}>❤️</Text>
            <Text style={styles.likeCount}>{likeCount}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.marginLeft]}>
            <Text style={styles.emoji}>😋</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.marginLeft]}>
            <Text style={styles.emoji}>🔥</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 192
  },
  content: {
    padding: 16
  },
  merchantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text
  },
  timestamp: {
    fontSize: 14,
    color: colors.darkGray
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 18,
    marginRight: 4,
    color: colors.primary
  },
  likeCount: {
    color: colors.darkGray
  },
  marginLeft: {
    marginLeft: 16
  }
});

export default FeedCard;

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import PlaidLinkButton from '../components/plaid/PlaidLink';
import { colors, spacing, typography } from '../design-tokens';

export const OnboardingScreen: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handlePlaidSuccess = (publicToken: string, metadata: any) => {
    console.log('Plaid Link Success:', publicToken, metadata);
    
    
    setIsConnected(true);
    Alert.alert(
      'Account Connected!',
      'Your bank account has been successfully linked. Your transactions will start appearing in your feed soon.',
      [{ text: 'OK' }]
    );
  };

  const handlePlaidExit = (exit: any) => {
    console.log('Plaid Link Exit:', exit);
    if (exit.error) {
      Alert.alert('Error', 'There was an issue connecting your account. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/foodfeed-logo.png')} 
          style={styles.logo}
          onError={() => console.log('Logo image not found')}
        />
        
        <Text style={styles.title}>Welcome to FoodFeed</Text>
        
        <Text style={styles.description}>
          Connect your bank account to automatically share your food experiences with friends.
        </Text>
        
        {isConnected ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              🎉 Account successfully connected!
            </Text>
            <Text style={styles.infoText}>
              Your food transactions will start appearing in your feed within 24 hours.
            </Text>
          </View>
        ) : (
          <PlaidLinkButton 
            onSuccess={handlePlaidSuccess}
            onExit={handlePlaidExit}
          />
        )}
        
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            Your privacy is important to us. We only share merchant information, not transaction amounts.
            You can hide any transaction at any time.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.xl,
    backgroundColor: colors.lightGray,
    borderRadius: 60,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  successContainer: {
    backgroundColor: colors.success + '20', // 20% opacity
    padding: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.lg,
    width: '100%',
  },
  successText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.fontSize.md,
    color: colors.text,
    textAlign: 'center',
  },
  privacyContainer: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    width: '100%',
  },
  privacyText: {
    fontSize: typography.fontSize.sm,
    color: colors.darkGray,
    textAlign: 'center',
  },
});

export default OnboardingScreen;

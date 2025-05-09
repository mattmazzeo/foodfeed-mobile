import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { open } from 'react-native-plaid-link-sdk';
import type { LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';
import { colors, typography, spacing } from '../../design-tokens';

interface PlaidLinkProps {
  onSuccess: (publicToken: string, metadata: any) => void;
  onExit?: (exit: LinkExit) => void;
}

export const PlaidLinkButton: React.FC<PlaidLinkProps> = ({ 
  onSuccess,
  onExit = () => {}
}) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateLinkToken = useCallback(async () => {
    setLoading(true);
    try {
      
      setTimeout(() => {
        setLinkToken('mock-link-token-for-sandbox-testing');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating link token:', error);
      Alert.alert('Error', 'Failed to connect to Plaid. Please try again.');
      setLoading(false);
    }
  }, []);

  const handleOpenLink = useCallback(async () => {
    if (!linkToken) return;
    
    try {
      
      await open({
        onSuccess: (success) => {
          onSuccess(success.publicToken, success.metadata);
        },
        onExit: (exit) => {
          if (onExit) {
            onExit(exit);
          }
        }
      });
    } catch (error) {
      console.error('Error opening Plaid Link:', error);
      Alert.alert('Error', 'Failed to open Plaid Link. Please try again.');
    }
  }, [linkToken, onSuccess, onExit]);

  return (
    <View style={styles.container}>
      {linkToken ? (
        <TouchableOpacity 
          style={styles.button}
          onPress={handleOpenLink}
        >
          <Text style={styles.buttonText}>Connect Your Bank</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={generateLinkToken}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Connecting...' : 'Link Your Bank Account'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.lightGray,
  },
  buttonText: {
    color: 'white',
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
});

export default PlaidLinkButton;

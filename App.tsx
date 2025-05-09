import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from './src/screens/OnboardingScreen';
import FeedScreen from './src/screens/FeedScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';

const SHOW_ONBOARDING = false;

export default function App() {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  
  const handleTransactionSelect = (id: string) => {
    setSelectedTransactionId(id);
  };
  
  const handleCloseDetail = () => {
    setSelectedTransactionId(null);
  };
  
  if (selectedTransactionId) {
    return (
      <TransactionDetailScreen 
        transactionId={selectedTransactionId} 
        onClose={handleCloseDetail} 
      />
    );
  }
  
  return SHOW_ONBOARDING ? <OnboardingScreen /> : <FeedScreen onTransactionSelect={handleTransactionSelect} />;
}

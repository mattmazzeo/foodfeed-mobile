import React from 'react';
import { FeedCard } from '../../components/ui/FeedCard';

export default {
  title: 'Components/FeedCard',
  component: FeedCard,
};

export const Default = {
  args: {
    merchantName: 'Blue Bottle Coffee',
    timestamp: '10 minutes ago',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likeCount: 12,
  },
};

export const NoLikes = {
  args: {
    merchantName: 'Shake Shack',
    timestamp: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    likeCount: 0,
  },
};

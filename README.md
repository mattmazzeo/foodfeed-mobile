# FoodFeed Mobile App

A mobile-first social feed that auto-posts food & drink transactions from linked payment accounts, turning passive spend data into visually rich shareable moments.

## Tech Stack

- React Native with Expo
- TypeScript
- NativeWind/Tailwind CSS for styling
- Storybook for component development

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
   ```
   git clone https://github.com/FoodFeedApp/foodfeed-mobile.git
   cd foodfeed-mobile
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm start
   # or
   yarn start
   ```

4. Open the app in your simulator or device using Expo Go

## Project Structure

- `/src/components` - Reusable UI components
- `/src/design-tokens.ts` - Design system tokens
- `/.storybook` - Storybook configuration

## Features

- Feed of restaurant transactions
- Quick reactions (❤️😋🔥)
- Profile with top restaurants
- Transaction privacy controls

## Development

### Storybook

Run Storybook to develop and test components in isolation:

```
npm run storybook
# or
yarn storybook
```

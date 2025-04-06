# GitHub User Search App

## Project Overview

This is a React Native mobile application that allows users to search for GitHub profiles, view user details, followers, and following lists. The app provides a simple, intuitive interface to explore GitHub user information.

## Features

### 1. User Search
- Search for GitHub users by username
- Handles cases where:
  * User is found
  * User is not found
  * Search input is empty

### 2. User Profile View
When a user is found, the app displays:
- Avatar
- Username
- Name
- Bio/Description
- Follower count
- Following count

### 3. Followers and Following Lists
- Navigate to followers list by tapping follower count
- Navigate to following list by tapping following count
- Each user in these lists can be tapped to view their profile

### 4. Navigation
- Back button functionality in all screens
- Smooth navigation between different views

## Bonus Features Implemented
- Pull to refresh in followers and following lists
- Error handling with informative messages
- Responsive design

## Tech Stack
- React Native
- TypeScript
- Expo
- React Navigation
- Tailwind CSS (via twrnc)
- GitHub API

## Project Structure
```
src/
├── components/
│   ├── TopBar.tsx         # Reusable top navigation bar
│   └── UserListItem.tsx   # Reusable user list item component
├── screens/
│   ├── SearchScreen.tsx    # Main search screen
│   ├── UserProfileScreen.tsx  # User profile details screen
│   ├── FollowersScreen.tsx    # User followers list screen
│   └── FollowingScreen.tsx    # Users being followed list screen
└── navigation/
    └── types.ts           # Navigation type definitions
```

## Time Tracking
**Total Development Time:** 

*Breakdown:*
- Project Setup: 
- UI Design: 
- API Integration: 
- Error Handling: 
- Testing: 

## Getting Started

### Prerequisites
- Node.js
- npm or Yarn
- Expo CLI
- Android Studio / Xcode (for simulator)

### Installation
1. Clone the repository
2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```
3. Run the app
   ```
   expo start
   ```
4. install expo go in android device and scan the bar code in terminal from expo go app in your device.

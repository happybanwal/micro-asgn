export type RootStackParamList = {
    Search: undefined;
    UserProfile: {
      username: string;
    };
    Followers: {
      username: string;
      title?: string;
    };
    Following: {
      username: string;
      title?: string;
    };
  };
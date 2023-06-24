import { ApiResponse } from './api';

export type reactType = 'CRAZY' | 'REGRETFUL' | 'WELLDONE' | 'comment';

export type TEmojiInfo = {
  selected: reactType | null;
  CRAZY: number;
  REGRETFUL: number;
  WELLDONE: number;
  comment: number;
};

export type TChallengeFeed = {
  isMine: boolean;
  userInfo: {
    imgUrl: string;
    nickname: string;
    currentCharge: number;
  };
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  emojiInfo: TEmojiInfo;
};

export type TMyFeed = {
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  challengeInfo: {
    imgUrl: string;
    title: string;
  };
  emojiInfo: {
    selected: reactType | null;
    CRAZY: number;
    REGRETFUL: number;
    WELLDONE: number;
    comment: number;
  };
};

export type TChallengeRoomFeedListResult = {
  result: {
    total: number;
    limit: number;
    current: number;
    lastRecordId: number;
    challengeFeedList: TChallengeFeed[];
  };
};

export type TMyRoomFeedListResult = {
  result: {
    total: number;
    limit: number;
    current: number;
    myFeedList: TMyFeed[];
  };
};

export type TAchievementResult = {
  result: {
    goalCharge: number;
    currentCharge: number;
    percent: number;
    dueDay: number;
  };
};

export type TChallengeListResult = {
  result: {
    challengeId: number;
    title: string;
    imgUrl: string;
    active: boolean;
  }[];
};

export type ChallengeRoomFeedListRequest = {
  challengeId: number;
  offsetRecordId: number;
};

export type MyRoomFeedListRequest = {
  offset: number;
};

export type ChallengeAchievementRequest = {
  challengeId: number;
};

export type ChallengeRoomFeedListResponse = ApiResponse &
  TChallengeRoomFeedListResult;

export type MyRoomFeedListResponse = ApiResponse & TMyRoomFeedListResult;

export type ChallengeAchievementResponse = ApiResponse & TAchievementResult;

export type ChallengeListResponse = ApiResponse & TChallengeListResult;

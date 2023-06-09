import { ApiResponse } from '@/shared/types/api';

export type ChallengeStatus = {
  PROCEEDING: number;
  SUCCESS: number;
  COMPLETED: number;
};
export type Status = keyof ChallengeStatus;

export const StatusMap: Record<Status, string> = {
  PROCEEDING: '참가중',
  SUCCESS: '성공',
  COMPLETED: '완료',
};

export type Social = {
  id: string;
  platform: string;
};

export type Profile = {
  nickname: string;
  email: string;
  imgUrl: string;
};

export type ImageInfo = {
  image?: File;
  imageUrl: string;
};

export type User = {
  social: Social;
  profile: Profile;
  notification: boolean;
  userChallengeResult: ChallengeStatus;
};

export type GetUserInfoType = {
  id: number;
  nickname: string;
  email: string;
  imgUrl: string;
  platform: string;
  role: string;
  score: number;
};

export type UserUpdateRequest = {
  nickName: string;
  profileImage?: ImageInfo;
};

export type UserResponse = ApiResponse<User>;

export type GetUserInfoResponse = ApiResponse<GetUserInfoType>;

export type UserChallenge = {
  challengeId: number;
  title: string;
  imgUrl: string;
  active: boolean;
  duration: {
    period: number;
    startAt: string;
    endAt: string;
  };
  availableCount: number;
  participantCount: number;
  status: Status;
  statusTag: string[];
  categories: string[];
  keywords: string[];
};

export type UserChallengeListResult = ApiResponse<{
  participatedChallenges: UserChallenge[];
}>;

import { ReactElement } from 'react';

import { shallow } from 'zustand/shallow';

import { ChallengeRoomFeedList, MyRoomFeedList } from '@/features/feed';
import { Spacing } from '@/shared/components';
import { ChallengeAchievementContainer } from '@/shared/components/challenge-achievement/ChallengeAchievementContainer';
import { ChallengeCategories } from '@/shared/components/challenge-category/ChallengeCategories';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import { useRoom } from '@/shared/store/room';

export default function MyPoorRoom() {
  const challengeId = useRoom((state) => state.challengeId, shallow);

  const isMyRoom = !challengeId;

  return (
    <div className="bg-gray-10">
      <Spacing height={86} />
      <div className="fixed top-0 z-10 w-full bg-white">
        <ChallengeCategories />
        {!isMyRoom && <ChallengeAchievementContainer />}
      </div>
      {isMyRoom ? <MyRoomFeedList /> : <ChallengeRoomFeedList />}
    </div>
  );
}

MyPoorRoom.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};

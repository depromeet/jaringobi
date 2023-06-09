import { ReactElement, Suspense, useState } from 'react';

import { IconCar, IconClothes, IconRice } from '@/public/svgs';
import ChallengeFilterSheet from '@/shared/components/bottom-sheet/ChallengeFilter.Sheet';
import { ChipGroup } from '@/shared/components/chip';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import SearchChallengeList from '@/shared/components/search-challenge';
import { Toggle } from '@/shared/components/toggle';
import { categoryMap } from '@/shared/constants/challenge';
import { useHandleBack } from '@/shared/hooks';
import { SortedType } from '@/shared/types/challenge';

function Search() {
  useHandleBack();
  const [category, setCategory] = useState<keyof typeof categoryMap>('전체'); // ['전체', '식비', '문화생활', '취미'
  const [showOnlyActiveRoom, setShowOnlyActiveRoom] = useState(true);
  const [sortedType, setSortedType] = useState<SortedType>('인원순');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSortedTypeChange = (sortedType: SortedType) => {
    setSortedType(sortedType);
  };

  return (
    <div className="px-5">
      <header className="mb-2.5 flex h-12 items-center justify-between">
        <h2 className="font-title-medium-md">거지방 탐색</h2>
      </header>
      <ChipGroup
        onChange={setCategory as (value: string) => void}
        initialChips="전체"
        className="mb-4"
      >
        <ChipGroup.Chip value="전체" className="inline-block shrink-0">
          전체
        </ChipGroup.Chip>
        <ChipGroup.Chip value="식비">
          <IconRice className="mr-1 h-6 w-6" />
          <span>식비</span>
        </ChipGroup.Chip>
        <ChipGroup.Chip value="문화생활">
          <IconCar className="mr-1 h-6 w-6" />
          <span>문화생활</span>
        </ChipGroup.Chip>
        <ChipGroup.Chip value="취미">
          <IconClothes className="mr-1 h-6 w-6" />
          취미
        </ChipGroup.Chip>
      </ChipGroup>
      <div className="flex justify-between">
        <div className="flex items-start gap-x-1 pb-7">
          <span className="font-body-regular-sm text-gray-70">
            모집 중인 방만 보기
          </span>
          <Toggle
            checked={showOnlyActiveRoom}
            onClick={() => setShowOnlyActiveRoom((prev) => !prev)}
          />
        </div>
        <ChallengeFilterSheet
          isSheetOpen={isBottomSheetOpen}
          setIsSheetOpen={setIsBottomSheetOpen}
          sortedBy={sortedType}
          handleSortedTypeChange={handleSortedTypeChange}
        />
      </div>
      <Suspense>
        <SearchChallengeList
          category={category}
          sortedType={sortedType}
          filter={showOnlyActiveRoom ? '' : 'all'}
        />
      </Suspense>
    </div>
  );
}
Search.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};

export default Search;

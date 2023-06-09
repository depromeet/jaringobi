import React, { Fragment, Suspense } from 'react';

import { IconArrowLeft } from '@/public/svgs';
import SpendingForm from '@/shared/components/form/SpendingForm';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function CostPage() {
  return (
    <div className="flex flex-col overflow-y-auto">
      <header className="border-b-gray20 flex h-12 items-center justify-center border-b-[1px] px-5">
        <IconArrowLeft className="absolute left-4 h-6 w-6" />
        <h1>지출 추가</h1>
      </header>
      <main className="px-5 pt-6">
        <div className="pb-4">
          <div className="mb-2 flex gap-x-1">
            <h4>거지방</h4>
            <p className="text-primary-dark">*</p>
          </div>
          <Suspense fallback={<>..</>}>
            <SpendingForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

CostPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};

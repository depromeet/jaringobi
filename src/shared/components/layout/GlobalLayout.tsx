import type { ReactNode } from 'react';

import ApplyingFont from '../font/ApplyingFont';

type GlobalLayoutProps = {
  children: ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <ApplyingFont>
      <div className="mx-auto my-0 w-full max-w-[600px]">{children}</div>
    </ApplyingFont>
  );
}

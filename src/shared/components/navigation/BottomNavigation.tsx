/* eslint-disable no-use-before-define */
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IconAddSquare, IconChat, IconSearch, IconUser } from '@/public/svgs';

export default function BottomNavigation() {
  const router = useRouter();
  const currentUrl = router.asPath;

  const getIconStyle = ({
    conditionalUrl,
    currentUrl,
  }: {
    conditionalUrl: string;
    currentUrl: string;
  }) => {
    return currentUrl.includes(conditionalUrl)
      ? 'stroke-primary fill-primary'
      : 'stroke-gray-50 fill-gray-50';
  };

  const getTextStyle = ({
    conditionalUrl,
    currentUrl,
  }: {
    conditionalUrl: string;
    currentUrl: string;
  }) => {
    return currentUrl.includes(conditionalUrl)
      ? 'text-primary'
      : 'text-gray-50';
  };

  return (
    <div className="fixed bottom-0 flex h-bottom-nav w-screen items-center justify-around bg-white">
      <button type="button">
        <Link className="flex flex-col items-center" href="/search">
          <IconSearch
            className={`h-[24px] w-[24px] ${getIconStyle({
              conditionalUrl: 'search',
              currentUrl,
            })} `}
          />
          <p
            className={`font-caption-medium-sm ${getTextStyle({
              conditionalUrl: 'search',
              currentUrl,
            })}`}
          >
            탐색
          </p>
        </Link>
      </button>
      <button type="button">
        <Link className="flex flex-col items-center" href="/my-poor-room">
          <IconChat
            className={`h-[24px] w-[24px] ${getIconStyle({
              conditionalUrl: 'my-poor-room',
              currentUrl,
            })} `}
          />
          <p
            className={`font-caption-medium-sm ${getTextStyle({
              conditionalUrl: 'my-poor-room',
              currentUrl,
            })}`}
          >
            내 거지방
          </p>
        </Link>
      </button>
      <button type="button">
        <Link className="flex flex-col items-center" href="/add-spending">
          <IconAddSquare
            className={`h-[24px] w-[24px] ${getIconStyle({
              conditionalUrl: 'add-spending',
              currentUrl,
            })} `}
          />
          <p
            className={`font-caption-medium-sm ${getTextStyle({
              conditionalUrl: 'add-spending',
              currentUrl,
            })}`}
          >
            지출 추가
          </p>
        </Link>
      </button>
      {/* <button type="button">
        <Link className="flex flex-col items-center" href="/jaringobi">
          <IconNote
            className={`h-[24px] w-[24px] ${getIconStyle({
              conditionalUrl: 'jaringobi',
              currentUrl,
            })} `}
          />
          <p
            className={`font-caption-medium-sm ${getTextStyle({
              conditionalUrl: 'jaringobi',
              currentUrl,
            })}`}
          >
            자린고비
          </p>
        </Link>
      </button> */}
      <button type="button">
        <Link className="flex flex-col items-center" href="/my-page">
          <IconUser
            className={`h-[24px] w-[24px] ${getIconStyle({
              conditionalUrl: 'my-page',
              currentUrl,
            })} `}
          />
          <p
            className={`font-caption-medium-sm ${getTextStyle({
              conditionalUrl: 'my-page',
              currentUrl,
            })}`}
          >
            마이페이지
          </p>
        </Link>
      </button>
    </div>
  );
}

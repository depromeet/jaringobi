import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { authKakao, oauthRequestToKakao } from '@/service/auth';

export interface State {
  code: string;
}

export default function RedirectedKakao() {
  const router = useRouter();
  useEffect(() => {
    async function test() {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const kakao = await oauthRequestToKakao(code);
        const login = await authKakao({
          idToken: kakao.id_token,
          accessToken: kakao.access_token,
        });
        if (login) {
          router.push('/search');
        }
      }
    }

    test();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-500 border-gray-300" />
    </div>
  );
}

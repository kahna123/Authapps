'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StationLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const roleId = sessionStorage.getItem('roleId');
    if (roleId === '6') {
      setIsAuthorized(true);
    } else {
      router.push('/');
    }
  }, [router]);

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const roleId = sessionStorage.getItem('roleId');
    if (roleId === '5') {
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

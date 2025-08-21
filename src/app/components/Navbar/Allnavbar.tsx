'use client'

import NavbarMain from './NavbarMain';
import NavbarHome from './NavbarHome';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Allnavbar = () => {

  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const path = usePathname()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/check-login', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setIsLogin(data.isLogin);
      } catch (err) {
        console.error('Error checking login:', err);
        setIsLogin(false);
      }
    };

    checkLogin();
  }, []);
 
  if (isLogin === null) {
    return null; // أو يمكنك عرض لودر
  }
  if (path ==='/login' || path ==='/signUp' ) return ''
  return isLogin ? <NavbarMain /> : <NavbarHome />;
};

export default Allnavbar;

'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

type CustomLinkProps = NextLinkProps & {
  children: React.ReactNode;
  href: string;
  target?: string;
} & HTMLAttributes<HTMLAnchorElement>;

const Link: FC<CustomLinkProps> = ({ children, href, ...rest }) => {
  const router = useRouter();

  const handleMouseEnter = () => {
    router.prefetch(href); // ✅ prefetch يدوي
  };

  return (
    <NextLink href={href} onMouseEnter={handleMouseEnter} {...rest}>
        {children}
    </NextLink>
  );
};

export default Link;

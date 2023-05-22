import Link from 'next/link';
import React from 'react';

export default function Dropdown(props) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

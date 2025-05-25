
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const GiftIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.056a.5.5 0 01-.16 1.043l-.357.13a3.375 3.375 0 01-1.575.41L5.25 15.75m0 0A2.25 2.25 0 013 13.5m0 0V3.75A2.25 2.25 0 015.25 1.5h5.25A2.25 2.25 0 0112.75 3.75m0 0v2.625c0 .621.504 1.125 1.125 1.125H16.5A2.25 2.25 0 0118.75 9.75v2.625c0 .621-.504 1.125-1.125 1.125H13.5A2.25 2.25 0 0111.25 12V3.75m9 6.75A2.25 2.25 0 0121 13.5v2.25c0 .621-.504 1.125-1.125 1.125H16.5A2.25 2.25 0 0114.25 15.75V13.5A2.25 2.25 0 0116.5 11.25h3.75z" />
  </svg>
);
    
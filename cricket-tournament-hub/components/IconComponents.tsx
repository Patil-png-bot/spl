
import React from 'react';

export const CricketBatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.68,7.76L12.35,5.43L14.47,3.31L16.8,5.64L20.32,2.12L21.88,3.68L18.36,7.2L20.69,9.53L18.57,11.65L16.24,9.32L7.76,17.8L5.64,15.68L4.22,17.1L5.64,18.51L4.22,19.93L2.81,18.51L2.1,19.22L3.51,20.63L2.1,22.05L3.51,23.46L9.17,17.8L11,19.66L9.59,21.07L11,22.49L12.41,21.07L13.83,22.49L15.24,21.07L14.68,7.76Z" />
  </svg>
);

export const CricketBallIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.28 19.08,16.32 17.65,17.65C16.32,19.08 14.28,20 12,20V4M4,12A8,8 0 0,1 12,4V20A8,8 0 0,1 4,12Z" />
  </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
  </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" transform="rotate(0)"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19V9a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h6M9 11h6M12 21v-2M9 7V5a3 3 0 013-3h0a3 3 0 013 3v2"/>
        <path d="M5 10V9a2 2 0 012-2h10a2 2 0 012 2v1"/>
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);


import React from 'react';
import type { Team } from '../types';
import { CricketBatIcon, CricketBallIcon } from './IconComponents';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Batsman':
        return <CricketBatIcon className="h-4 w-4 text-blue-400" />;
      case 'Bowler':
        return <CricketBallIcon className="h-4 w-4 text-red-400" />;
      case 'All-Rounder':
        return <div className="flex items-center"><CricketBatIcon className="h-4 w-4 text-blue-400" /><CricketBallIcon className="h-4 w-4 text-red-400" /></div>;
      case 'Wicket-Keeper':
        return <span className="text-yellow-400 font-bold">WK</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className={`p-4 flex items-center space-x-4 border-b-4 ${team.logoColor.replace('bg-', 'border-')}`}>
        <div className={`w-16 h-16 rounded-full ${team.logoColor} flex items-center justify-center`}>
          <span className="text-3xl font-bold text-white">{team.name.charAt(0)}</span>
        </div>
        <h2 className="text-2xl font-bold text-white flex-1">{team.name}</h2>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Player Roster</h3>
        <ul className="space-y-3">
          {team.players.map(player => (
            <li key={player.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
              <span className="text-gray-200">{player.name}</span>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                {getRoleIcon(player.role)}
                <span>{player.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

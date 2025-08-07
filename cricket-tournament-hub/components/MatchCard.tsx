
import React, { useState } from 'react';
import type { Match, Team, Player } from '../types';
import { CalendarIcon, ChevronDownIcon } from './IconComponents';

interface MatchCardProps {
  match: Match;
  team1: Team;
  team2: Team;
}

const PlayerList: React.FC<{ players: Player[] }> = ({ players }) => (
    <ul className="space-y-2">
        {players.slice(0, 11).map((player, index) => (
            <li key={player.id} className="text-sm text-gray-300 bg-gray-700/30 px-3 py-2 rounded-md flex items-center">
                <span className="text-gray-500 mr-2 font-mono">{String(index + 1).padStart(2, '0')}</span>
                <span>{player.name.replace(/ \(.+\)$/, '').trim()}</span>
            </li>
        ))}
    </ul>
);


export const MatchCard: React.FC<MatchCardProps> = ({ match, team1, team2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(match.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Team 1 */}
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full ${team1.logoColor} flex items-center justify-center`}>
              <span className="text-2xl font-bold text-white">{team1.name.charAt(0)}</span>
            </div>
            <span className="text-xl font-semibold">{team1.name}</span>
          </div>

          {/* VS */}
          <div className="text-2xl font-bold text-red-500">VS</div>

          {/* Team 2 */}
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">{team2.name}</span>
            <div className={`w-12 h-12 rounded-full ${team2.logoColor} flex items-center justify-center`}>
              <span className="text-2xl font-bold text-white">{team2.name.charAt(0)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-700 pt-4 flex justify-center items-center space-x-4 text-gray-400">
            <CalendarIcon className="w-5 h-5" />
            <span>{formattedDate}</span>
            <span className="text-gray-600">|</span>
            <span>{match.venue}</span>
        </div>
      </div>
      
      {/* Collapsible Section for Playing XI */}
      <div className="border-t border-gray-700 bg-gray-800/50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center p-4 text-left text-gray-300 hover:bg-gray-700/50 focus:outline-none transition-colors"
        >
          <span className="font-semibold">View Playing XI</span>
          <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <div className="p-6 pt-0 animate-fade-in-down">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h4 className="font-bold text-lg mb-3 text-white border-b-2 border-gray-700 pb-2">{team1.name}</h4>
                <PlayerList players={team1.players} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-white border-b-2 border-gray-700 pb-2">{team2.name}</h4>
                <PlayerList players={team2.players} />
              </div>
            </div>
          </div>
        )}
      </div>
       <style>{`
          @keyframes fade-in-down {
              from {
                  opacity: 0;
                  transform: translateY(-10px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          .animate-fade-in-down {
              animation: fade-in-down 0.3s ease-out;
          }
      `}</style>
    </div>
  );
};

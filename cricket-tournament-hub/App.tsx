
import React, { useState, useCallback } from 'react';
import { TEAMS, MATCH_SCHEDULE } from './constants';
import type { AppView, Team, Match } from './types';
import { Header } from './components/Header';
import { TeamCard } from './components/TeamCard';
import { MatchCard } from './components/MatchCard';
import { InsightsView } from './components/InsightsView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('teams');

  const getTeamById = useCallback((id: number): Team | undefined => {
    return TEAMS.find(team => team.id === id);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'teams':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAMS.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        );
      case 'schedule':
        const matchesByDay = MATCH_SCHEDULE.reduce<Record<string, Match[]>>((acc, match) => {
          const day = new Date(match.date).toLocaleDateString('en-US', { day: 'numeric' });
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push(match);
          return acc;
        }, {});

        const sortedDays = Object.keys(matchesByDay).sort((a, b) => parseInt(a) - parseInt(b));

        return (
          <div className="space-y-6">
            {sortedDays.map((day, index) => {
              const matchesOnDay = matchesByDay[day];
              const date = new Date(matchesOnDay[0].date);
              const formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <React.Fragment key={day}>
                  <div className={`bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-500 ${index > 0 ? 'mt-8' : ''}`}>
                    <h3 className="text-xl font-bold text-white mb-4">Day {index + 1} - {formattedDate}</h3>
                  </div>
                  {matchesOnDay.map(match => {
                    const team1 = getTeamById(match.team1Id);
                    const team2 = getTeamById(match.team2Id);
                    if (!team1 || !team2) return null;
                    return <MatchCard key={match.id} match={match} team1={team1} team2={team2} />;
                  })}
                </React.Fragment>
              );
            })}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 p-6 mt-8">
              <h3 className="text-2xl font-bold text-center text-yellow-400 mb-4 tracking-wide">Knockout Stages</h3>
              <div className="flex flex-col items-center text-center text-gray-300 space-y-3">
                <div className="w-full max-w-md bg-gray-700/50 p-4 rounded-lg">
                  <p className="font-semibold text-lg text-white">Qualifier 1</p>
                  <p className="text-sm">4th September 2025 - TBD vs TBD</p>
                </div>
                <div className="w-full max-w-md bg-gray-700/50 p-4 rounded-lg">
                  <p className="font-semibold text-lg text-white">Qualifier 2</p>
                  <p className="text-sm">4th September 2025 - TBD vs TBD</p>
                </div>
                <div className="w-full max-w-md bg-yellow-500/20 p-4 rounded-lg border-2 border-yellow-500">
                  <p className="font-bold text-xl text-yellow-300">Final</p>
                  <p className="text-sm text-yellow-200">4th September 2025 - Winner Q1 vs Winner Q2</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'insights':
        return <InsightsView teams={TEAMS} matches={MATCH_SCHEDULE} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Shiste Premier League &copy; 2025. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

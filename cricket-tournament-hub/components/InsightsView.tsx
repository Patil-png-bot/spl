
import React, { useState, useCallback } from 'react';
import { generateTournamentInsights } from '../services/geminiService';
import type { Team, Match } from '../types';

interface InsightsViewProps {
    teams: Team[];
    matches: Match[];
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <span className="text-gray-300">Generating Analysis...</span>
    </div>
);


export const InsightsView: React.FC<InsightsViewProps> = ({ teams, matches }) => {
    const [insights, setInsights] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setInsights('');
        try {
            const result = await generateTournamentInsights(teams, matches);
            setInsights(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [teams, matches]);
    
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">AI-Powered Tournament Analysis</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Click the button below to get an AI-generated analysis of the tournament. The AI will identify key teams, exciting matchups, and make bold predictions!
            </p>

            <button
                onClick={handleGenerateInsights}
                disabled={isLoading}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
                {isLoading ? 'Generating...' : 'Generate Tournament Insights'}
            </button>

            <div className="mt-8 text-left">
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">{`Error: ${error}`}</p>}
                {insights && (
                    <div className="bg-gray-900/50 p-6 rounded-lg whitespace-pre-wrap animate-fade-in">
                        <h3 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">Analyst's Report</h3>
                        <p className="text-gray-300 leading-relaxed">{insights}</p>
                    </div>
                )}
            </div>
             <style>{`
                @keyframes animate-fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: animate-fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

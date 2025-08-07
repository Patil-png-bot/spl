
export type PlayerRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';

export interface Player {
  id: number;
  name: string;
  role: PlayerRole;
}

export interface Team {
  id: number;
  name: string;
  logoColor: string;
  players: Player[];
}

export interface Match {
  id: number;
  team1Id: number;
  team2Id: number;
  date: string;
  venue: string;
}

export type AppView = 'teams' | 'schedule' | 'insights';

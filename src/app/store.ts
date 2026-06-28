import { useState, useEffect } from 'react';
import { InspirationCard, drawCard } from './data';
import type { Environment } from '../utils/environment';

export interface UserPull {
  pullId: string;
  cardId: string;
  pulledAt: number; // timestamp
}

export interface UserVisit {
  visitId: string;
  cardId: string;
  visitedAt: number;
  weather: string; // weather tag at time of visit
  thought: string;
}

const PULLS_KEY = 'outspire_pulls';
const VISITS_KEY = 'outspire_visits';

// Daily pull limit per PRD: 10 times/day
const DAILY_LIMIT = 10;

export function useAppStore() {
  const [pulls, setPulls] = useState<UserPull[]>(() => {
    try {
      const item = localStorage.getItem(PULLS_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  const [visits, setVisits] = useState<UserVisit[]>(() => {
    try {
      const item = localStorage.getItem(VISITS_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(PULLS_KEY, JSON.stringify(pulls));
  }, [pulls]);

  useEffect(() => {
    localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
  }, [visits]);

  // Derived state
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const todayPulls = pulls.filter(p => p.pulledAt >= startOfToday);
  const pullsLeft = Math.max(0, DAILY_LIMIT - todayPulls.length);

  // Actions
  const doPull = (env: Environment) => {
    if (pullsLeft <= 0) return null;
    const card = drawCard(env);
    const newPull: UserPull = {
      pullId: Math.random().toString(36).substr(2, 9),
      cardId: card.id,
      pulledAt: Date.now(),
    };
    setPulls(prev => [...prev, newPull]);
    return card;
  };

  const markVisited = (cardId: string, thought: string, weather: string) => {
    const newVisit: UserVisit = {
      visitId: Math.random().toString(36).substr(2, 9),
      cardId,
      visitedAt: Date.now(),
      weather,
      thought,
    };
    setVisits(prev => [...prev, newVisit]);
  };

  return {
    pulls,
    todayPulls,
    pullsLeft,
    visits,
    doPull,
    markVisited,
  };
}

import { Platform } from 'react-native';
import Constants from 'expo-constants';

export interface Transaction {
  id: number;
  tinkTransactionId: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  category: string | null;
}

function defaultBaseUrl(): string {
  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  if (host) return `http://${host}:8080`;
  if (Platform.OS === 'android') return 'http://10.0.2.2:8080';
  return 'http://localhost:8080';
}

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? defaultBaseUrl()).replace(/\/$/, '');

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_BASE_URL}/transactions`);

  if (!response.ok) {
    throw new Error(`Failed to load transactions (${response.status})`);
  }

  return response.json();
}

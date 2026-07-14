import { Languages } from "../constants/constants";

export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string; 
    amount: string;
    type: TransactionType;
    category: string;
    description: string;
    date: Date;
    userId?: string;
    receiptImageURI?: string;
}

export type RequestTransaction = Omit<Transaction, 'id' | 'date' | 'userId'>;

export interface FinanceContextType {
    transactions: Transaction[];
    loading: boolean;
    addTransaction: (
        data: Omit<Transaction, "id" | "timestamp" | "date"> 
    ) => Promise<Transaction>;
    fetchTransactions: () => Promise<void>; 
}

export interface LocaleContextType {
    lng:Languages;
    currency: string;
}


export interface AuthContextType {
    userId: string | null;
    loading: boolean;
}

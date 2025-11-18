import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  where,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import { Transaction, TransactionType, FinanceContextType } from "../types";

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error(
      "useFinance повинен бути використаний всередині FinanceProvider"
    );
  }
  return context;
};

const transformDoc = (
  doc: QueryDocumentSnapshot<DocumentData>
): Transaction => {
  const data = doc.data();

  const date = data.date instanceof Timestamp ? data.date.toDate() : new Date();

  return {
    id: doc.id,
    amount: data.amount,
    type: data.type as TransactionType,
    category: data.category,
    description: data.description,
    date: date,
    receiptImageURI: data.receiptImageURI || undefined,
  };
};

export const FinanceProvider: React.FC<{
  children: React.ReactNode;
  userId: string;
}> = ({ children, userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const transactionsCollection = collection(db, "transactions");
      const q = query(
        transactionsCollection,
        where("userId", "==", userId),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);

      const fetchedTransactions: Transaction[] =
        querySnapshot.docs.map(transformDoc);

      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Помилка завантаження транзакцій: ", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addTransaction = useCallback(
    async (
      data: Omit<Transaction, "id" | "timestamp" | "date">
    ): Promise<Transaction> => {
      try {
        const transactionData = {
          ...data,
          date: serverTimestamp(),
          userId: userId,
        };

        const docRef = await addDoc(
          collection(db, "transactions"),
          transactionData
        );

        const newTransaction: Transaction = {
          ...data,
          id: docRef.id,
          date: new Date(),
        };

        setTransactions((prev) => [newTransaction, ...prev]);

        return newTransaction;
      } catch (error) {
        console.error("Error: ", error);
        throw new Error("Can't add transaction");
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const contextValue: FinanceContextType = {
    transactions,
    loading,
    addTransaction,
    fetchTransactions,
  };

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
};

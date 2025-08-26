// react custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

// const API_URL = "http://10.0.2.2:5001/api";
// const API_URL = "https://react-native-wallet-api-ityq.onrender.com/api";

export const useTransactions = (user_id) => {
  const [transactions, setTransactions] = useState([]);

  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // useCallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${user_id}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [user_id]);
  // The array [user_id] is a dependency array used in React hooks like useCallback and useEffect.
  // It tells React to re-create (or re-run) the function or effect whenever the value of user_id changes.
  // This ensures that the latest value of user_id is always used inside the function or effect.

  // useCallback is used for performance reasons, it will memoize the function
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/summary/${user_id}`
      );
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [user_id]);

  // useCallback is used for performance reasons, it will memoize the function
  const loadData = useCallback(async () => {
    if (!user_id) return;

    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, user_id]);

  const deleteTransaction = async (transaction_id) => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/${transaction_id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh the data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};

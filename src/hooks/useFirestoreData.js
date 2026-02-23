import { useState, useEffect } from "react";
import { getFirestoreData } from "../services/firestore";

export const useFirestoreData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getFirestoreData((data) => {
      setData(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { data, loading };
};

const { useEffect, useState } = require("react");

const useSubCollection = (ref, gameId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const collectionData = snapshot?.docs?.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setData(collectionData);
      },
      () => setError(true)
    );

    setLoading(false);
    return () => unsubscribe();
  }, []);

  return [data, loading, error];
};

export { useSubCollection };

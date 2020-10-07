// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from "../../firebase";

export default (req, res) => {
  const createTestRecord = async () => {
    const firestore = firebase.firestore();

    try {
      await firestore.collection("test").add({
        test: "test",
      });
    } catch (error) {
      res.statusCode = 503;
      res.json({ error: error });
    }
  };

  createTestRecord();

  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

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
      console.log("error with test", error);
      res.statusCode = 503;
      res.json({ error: error });
    }
  };

  try {
    createTestRecord();
  } catch (error) {
    console.log("error with  2", error);
    res.statusCode = 503;
    res.json({ error: error });
    return;
  }

  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

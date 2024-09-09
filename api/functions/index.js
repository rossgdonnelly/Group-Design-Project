
const { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} = require( "firebase/auth");
const { initializeApp } = require("firebase/app");

const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express');
const cors = require('cors');
// const Deals = require('./config')
const firebase = require('firebase-admin');
var https = require("https");
var fs = require("fs");

const firebaseConfig = {
    apiKey: "AIzaSyBtXHroQDrYy6QSsZ_X-Pmdczr94lUfAfQ",
    authDomain: "freebee-87a76.firebaseapp.com",
    projectId: "freebee-87a76",
    storageBucket: "freebee-87a76.appspot.com",
    messagingSenderId: "92952853682",
    appId: "1:92952853682:web:7a3a75e23de1bfcad71dab",
    measurementId: "G-89CB0YQG8G"
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()



const Deals = db.collection("deals");
const Users = db.collection("users");

const app = express();
const PORT = 3000;

const auth = firebase.auth();
const app2 = initializeApp(firebaseConfig);
const auth2 = getAuth(app2);

//app.use(express.json())
app.use(cors())

app.get("/api/deals/get", async (req, res) => {
    const snapshot = await Deals.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });

//For post requests, use json format in boody of request

app.post("/api/deals/create", async (req, res) => {
  const data = req.body;
  const result = await Deals.add({
    "createdAt": firebase.firestore.Timestamp.now(),
    data
  });
  res.send(
    {
      msg: "Deals Added",
      dealId: result.id
    });
});

app.post("/api/deals/linkToUser", async (req, res) => {
  const userID = req.body.userId;
  const dealID = req.body.dealId;
  const userRef = Users.doc(userID);
  const userDoc = await userRef.get();
  let userData = userDoc.data();
  console.log("dealID is: " + dealID);
  if (userData.posts.indexOf(dealID)==-1) {
    userData["posts"].push(dealID);
    Users.doc(userID).set(userData);
  } else {
    res.send("Deal link failed (User database side)");
  }

  res.send({ msg: "Deals linked" });
});


  //To update include the id of item you want to update, then all oother changes after.
//   Sample body: 
//   {
//     "id" :"NVBegfAXzPndzBAbO0Nc",
//     "name" : "tom"
//   }
app.post("/api/deals/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await Deals.doc(id).update(data);
  res.send({ msg: "Updated" });
});

//Gets all deals sorted from most recent to leasr
app.get("/api/deals/get/sorted/time", async (req, res) => {
  const snapshot = await Deals.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  let sortable = [];
  for (var deal in list) {
    if (list[deal].hasOwnProperty("createdAt")) {
      sortable.push([list[deal], list[deal].createdAt.seconds]);
    }
  }
  sortable.sort(function(a, b) {
    return a[1] - b[1];
  });

  res.send(sortable.reverse());
});


//   Sample body: 
//   {
//     "id" :"kOPlewFM2alWFmpc3UkP",
//   }

app.post("/api/deals/delete", async (req, res) => {
  const id = req.body.id;
  await Deals.doc(id).delete();
  res.send({ msg: "Deleted" });
});

//registers users too firebase auth database.
//Sends user info if successful, creates a document for user in users database
app.post('/api/auth/register', async(req, res) => {
  // try {
  const {email, username, password} = req.body;
  createUserWithEmailAndPassword(auth2, email, password)
  .then(async (userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid);
    await Users.doc(user.uid).set({
      "favourites": []
    });
    res.send(user)
  })
  .catch((error) => {
    res.send(error);
  });
})

//Keeps the current user which is logged in
app.use((req, res, next) => {
  var user = auth.currentUser;
  res.locals.currentUser = user;
  next();
})

//Send the data of user if logged in  
app.post('/api/auth/login', async(req, res) => {
  console.log("request: ",req)
  const {email, password} = req.body;
  signInWithEmailAndPassword(auth2, email, password)
  .then((userCredential) => {
    console.log("cre: ",userCredential)
  var user = userCredential.user;
  res.send(user)
  })
  .catch((error) => {
    console.log(error)
  res.send(error)
  });
})

//POST to add a deal to a users favourites, include userID and dealID
app.post('/api/users/favourites/add', async(req, res) => {
  const userID = req.body.userId;
  const dealID = req.body.dealId;
  const userRef = Users.doc(userID);
  const dealRef = Deals.doc(dealID);
  const dealDoc = await dealRef.get();
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    res.send('No such user!');
  } else {
    if (!dealDoc.exists) {
      res.send('No such deal!');
      return;
    }
    let userData = userDoc.data();
    if (userData.favourites.indexOf(dealID)==-1) {
      userData["favourites"].push(dealID);
      Users.doc(userID).set(userData);
      res.send("Deal added to favourites");
    } else {
      res.send("Deal is already favourited");
    }
  }
})

//POST to delete a deal to a users favourites, include userID and dealID
app.post('/api/users/favourites/delete', async(req, res) => {
  const userID = req.body.userId;
  const dealID = req.body.dealId;
  const userRef = Users.doc(userID);
  const dealRef = Deals.doc(dealID);
  const dealDoc = await dealRef.get();
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    res.send('No such user!');
  } else {
    if (!dealDoc.exists) {
      res.send('No such deal!');
      return;
    }
    let userData = userDoc.data();
    let index = userData.favourites.indexOf(dealID);
    console.log(index);
    // console.log(userData);
    if (index!==-1) {
      userData["favourites"].splice(index, index);
      Users.doc(userID).set(userData);
      res.send("Deal deleted from favourites");
    } else {
      res.send("Deal is not favourited");
    }
  }
})


app.get("/api/users/get", async (req, res) => {
  const snapshot = await Users.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

//Get a single user by id
app.get("/api/users/get/:id", async (req, res) => {
  const id = req.params.id;
  const snapshot = await Users.doc(id).get();
  const list = snapshot.data();
  res.send(list);
});

//Gets all deals sectioned into each category
app.get("/api/deals/get/sorted/categories", async (req, res) => {
  const snapshot = await Deals.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  let result = new Object();
  result.Food = [];
  result.Events = [];
  result.Items = [];
  result.Others = [];

  for (var deal in list) {
    if (list[deal].data.hasOwnProperty("Category")) {
      data = list[deal].data;
      currentCategory = data.Category;
      console.log("current category is: " + currentCategory);
      if (currentCategory==="Food") {
        result.Food.push(list[deal]);
      } else if (currentCategory==="Events") {
        result.Events.push(list[deal]);
      } else if (currentCategory==="Items") {
        result.Items.push(list[deal]);
      } else if (currentCategory==="Others") {
        result.Others.push(list[deal]);
      }

    }
  }

  res.send(result);
});


exports.app = functions.https.onRequest(app);

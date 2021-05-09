//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCPXMYK3wdDFVZZzhmq8tCCAB9E0qFsINc",
      authDomain: "letscatchat.firebaseapp.com",
      databaseURL: "https://letscatchat-default-rtdb.firebaseio.com",
      projectId: "letscatchat",
      storageBucket: "letscatchat.appspot.com",
      messagingSenderId: "336051386403",
      appId: "1:336051386403:web:7d3409a149719a98df1996"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            Like:0
      });
      document.getElementById("msg").value = "";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";

}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);

                        name = message_data["name"];
                        like = message_data["Like"];
                        message = message_data["message"];


                        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";


                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }

            });
      });
}
getData();

function updateLike(message_id) {
      console.log(message_id + "clicked on liked button")
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            Like: updated_likes
      });
}
const API_URL = 'http://ruppinmobile.tempdomain.co.il/site03/';
import * as firebase from 'firebase';
import * as Crypto from 'expo-crypto'
import * as geolib from 'geolib'

const Divide_Rating = 100
const Max_Rating=5

export const getPlaces = async (lat, long, range) => {
  const results = await fetch(API_URL + 'api/place').then((x) => x.json());
  if (results.length == 0) {
    return null
  }
  else {
    for (let i = 0; i < results.length; i++) {
      results[i].distance = geolib.getDistance(
        { latitude: lat, longitude: long },
        { latitude: results[i].Latitude, longitude: results[i].Longitude })
    }
    for (let i = 0; i < results.length; i++) {
      if (results[i].distance > range * 1000) {
        results.splice(i, 1);
        i--;
      }
    }
    const places = results.map(
      ({
        Place_ID,
        Name,
        Address,
        Area,
        Latitude,
        Longitude,
        About,
        Photo,
        Logo,
        Likes,
        distance,
      }) => ({
        key: String(Place_ID),
        title: Name,
        description: Address,
        area: Area,
        latitude: Latitude,
        longitude: Longitude,
        releaseDate: About,
        backdrop: Photo,
        poster: Logo,
        distance: distance,
        rating: parseInt(Likes / Divide_Rating) > Max_Rating ? Max_Rating : parseInt(Likes / Divide_Rating),
      })
    );
    return places;
  }
};
export const registerUserSQL = async (user) => {
  let returnedObj = null;
  await fetch(API_URL + 'api/user/',
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "User_ID": 0,
        "Username": user.Username,
        "Email": user.Email,
        "Gender": user.Gender,
        "Interested": user.Interested,
        "Photo": user.Photo,
        "Latitude": user.Latitude,
        "Longitude": user.Longitude,
        "Token": user.Token,
        "Range": user.Range,
        "Birth": user.Birth,
        "About": user.About,
        "BirthdayString": user.BirthdayString
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != null) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const registerUserFire = async (user) => {
  const pass = await encryption(user.Email);
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.Email, pass)
    .then(userCredentials => {
      return userCredentials.user.updateProfile({
        displayName: user.Username
      });
    })
    .catch(error => console.log(error.message));
}
//     // Method For Upload Photo
export const imageUpload = async (imgUri, picName) => {
  let url;
  let urlAPI = API_URL + 'uploadpicture';
  let dataI = new FormData();
  dataI.append('picture', {
    uri: imgUri,
    name: picName + '.jpg',
    type: 'image/jpg'
  });
  const config = {
    method: 'POST',
    body: dataI,
  };

  await fetch(urlAPI, config)
    .then((res) => {
      console.log('res.status= ', res.status);
      if (res.status == 201) {
        return res.json();
      }
      else {
        console.log('error uploading with status= ', res.status);
        return "err";
      }
    })
    .then((responseData) => {
      if (responseData != "err") {
        let picNameWOExt = picName.substring(0, picName.indexOf("."));
        let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt), responseData.indexOf(".jpg") + 4);
        url = 'http://185.60.170.14/plesk-site-preview/' + imageNameWithGUID.split('http://')[1].replace(' ', '%20');
        console.log("img uploaded successfully!");
      }
      else {
        console.log('error uploading ...');
        alert('error uploading');
      }
    })
    .catch(err => {
      alert('err upload= ' + err);
    });
  return url;
}

export const authentication = async (email) => {
  let returnedObj = null;

  await fetch(API_URL + `api/values/`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "User_ID": 0,
        "Username": "",
        "Email": email,
        "Gender": "",
        "Interested": "",
        "Photo": "",
        "Latitude": "",
        "Longitude": "",
        "Token": "",
        "Range": "",
        "Birth": "",
        "About": "",
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != 'NO') {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
async function encryption(pass) {
  const temp = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    pass
  );
  return temp;
}
export const getMatches = async (user) => {
  let returnedObj = null;
  await fetch(API_URL + 'api/getMatches/',
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "Me": `${user.User_ID}`,
        "Partner": "",
        "Partner_Like": ""
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `No matches for user with id= ${user.User_ID}`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const getUserByID = async (user) => {
  let returnedObj = null;
  await fetch(API_URL + `api/user/${user.Partner}`,
    {
      method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `user witn id ${user.Partner} was not found!!!`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const getLastMessages = async (id) => {
  let returnedObj = null;
  await fetch(API_URL + `api/message/${id}`,
    {
      method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `messages witn id ${id} was not found!!!`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const putUser = async (user) => {
  let returnedObj = null;
  await fetch(API_URL + `api/user`,
    {
      method: 'PUT', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "User_ID": user.User_ID,
        "Username": user.Username,
        "Email": user.Email,
        "Gender": user.Gender,
        "Interested": user.Interested,
        "Photo": user.Photo,
        "Latitude": user.Latitude,
        "Longitude": user.Longitude,
        "Token": user.Token,
        "Range": user.Range,
        "Birth": user.Birth,
        "About": user.About,
        "BirthdayString": user.BirthdayString
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `user with id = ${user.User_ID} exsits but could not be modified!!!`
        && data != `user with id = ${user.User_ID} was not found to update!!!`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}

export const updateUserCurrentPlaces = async (place_id, user_id) => {
  let returnedObj = null;
  await fetch(API_URL + `api/UsersPlace`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "Place_ID": place_id,
        "User_ID": user_id
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `No Users In Place`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const match2Insert = async (Me, Partner) => {
  let returnedObj = null;
  await fetch(API_URL + `api/match/`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "Me": Me,
        "Partner": Partner
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `match with id = ${Me}  does'nt created in DB!!!`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}

export const Reject2Insert = async (Me, Partner) => {
  let returnedObj = null;
  await fetch(API_URL + `api/Rejected/`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "Me": Me,
        "Partner": Partner
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `Reject with id = ${Me}  does'nt created in DB!!!`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}

export const currentPlace = async (id) => {
  let returnedObj = null;
  await fetch(API_URL + `api/usersinplaces/${id}`,
    {
      method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `error`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const messagesBetween = async (id1, id2) => {
  let returnedObj = null;
  await fetch(API_URL + `api/getMessages`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "id1": id1,
        "id2": id2
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `No Messages`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
export const sendMsg = async (from, to, txt) => {
  let returnedObj = null;
  await fetch(API_URL + `api/message/`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "From_User": from,
        "To_User": to,
        "Text": txt
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `message from id = ${from}  does'nt created in DB!!!`) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}

export const checkIfUserClicked = async (place_id, user_id) => {
  let returnedObj = null;
  await fetch(API_URL + `api/like/`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "Place_ID": place_id,
        "User_ID": user_id
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data) {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}

export const insertLike = async (place_id, user_id) => {
  let returnedObj = null;
  await fetch(API_URL + `api/InsertLike`,
    {
      method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "Place_ID": place_id,
        "User_ID": user_id
      })
    }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data!="cannot insert like") {
        returnedObj = data;
      }
      else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
}
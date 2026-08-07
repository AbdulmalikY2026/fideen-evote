import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

window.vote = async function () {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    let candidate = document.querySelector('input[name="candidate"]:checked');

    if(name === ""){
        alert("Please enter your full name.");
        return;
    }

    if(email === ""){
        alert("Please enter your Gmail.");
        return;
    }

    if(!candidate){
        alert("Please select a candidate.");
        return;
    }

    try{

        const q = query(
            collection(db,"votes"),
            where("email","==",email)
        );

        const snapshot = await getDocs(q);

        if(!snapshot.empty){
            alert("❌ This Gmail has already voted.");
            return;
        }

        await addDoc(collection(db,"votes"),{
            name:name,
            email:email,
            candidate:candidate.value,
            votedAt:new Date()
        });

        document.getElementById("result").innerHTML =
        "✅ Your vote has been submitted successfully.";

        document.getElementById("voteForm").reset();

        alert("🎉 Thank you for voting!");

    }catch(error){

        alert(error.message);

    }

}

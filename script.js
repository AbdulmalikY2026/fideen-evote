import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

window.vote = async function () {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    let candidate =
    document.querySelector('input[name="candidate"]:checked');

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

        await addDoc(collection(db,"votes"),{

            name:name,

            email:email,

            candidate:candidate.value,

            votedAt:new Date()

        });

        document.getElementById("result").innerHTML =
        "✅ Your vote has been submitted successfully.";

        alert("Thank you for voting!");

    }catch(error){

        alert(error.message);

    }

}

function createPoll(){

    let title = document.getElementById("pollTitle").value;

    let candidates =
        document.getElementById("candidateList")
        .value
        .split("\n")
        .filter(c => c.trim() !== "");

    localStorage.setItem("pollTitle", title);
    localStorage.setItem("candidates",
        JSON.stringify(candidates));

    alert("✅ Election Created Successfully!");

}

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc
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
            name: name,
            email: email,
            candidate: candidate.value,
            votedAt: new Date()
        });

        alert("✅ Thank you for voting!");

        document.getElementById("voteForm").reset();
        document.getElementById("result").innerHTML =
        "Your vote has been submitted successfully.";

    }catch(error){

        alert(error.message);

    }

}

// ===============================
// CREATE ELECTION
// ===============================

window.createPoll = async function(){

    let title = document.getElementById("pollTitle").value.trim();

    let candidates = document.getElementById("candidateList")
        .value
        .split("\n")
        .map(c => c.trim())
        .filter(c => c !== "");

    await setDoc(doc(db, "elections", "current"), {
        title: title,
        candidates: candidates
    });

    document.getElementById("message").innerHTML =
    "✅ Election Created Successfully!";
              }


// ===============================
// LOAD ELECTION
// ===============================

function loadElection(){

    let title = localStorage.getItem("pollTitle");

    let candidates =
        JSON.parse(localStorage.getItem("candidates")) || [];

    let titleElement =
        document.getElementById("voteTitle");

    let container =
        document.getElementById("candidateContainer");

    if(!titleElement || !container) return;

    titleElement.innerHTML = title || "No Active Election";

    container.innerHTML = "";

    candidates.forEach(function(candidate){

        container.innerHTML += `
        <label style="display:block;margin:12px 0;">
            <input type="radio"
                   name="candidate"
                   value="${candidate}">
            ${candidate}
        </label>
        `;

    });

}


// ===============================
// PAGE LOAD
// ===============================

window.onload = function(){

    loadElection();

}

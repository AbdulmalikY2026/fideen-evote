import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadResults(){

    const snapshot = await getDocs(collection(db,"votes"));

    let html = "";

    let totals = {};

    snapshot.forEach((doc)=>{

        let vote = doc.data();

        totals[vote.candidate] = (totals[vote.candidate] || 0) + 1;

        html += `
        <div style="border:1px solid #ddd;padding:15px;margin:10px 0;border-radius:10px;">
            <h3>${vote.name}</h3>
            <p><strong>Email:</strong> ${vote.email}</p>
            <p><strong>Voted For:</strong> ${vote.candidate}</p>
        </div>
        `;

    });

    html += "<hr><h2>Vote Totals</h2>";

    for(let candidate in totals){

        html += `
        <div style="padding:10px;background:#f5f5f5;margin:8px 0;border-radius:8px;">
            <strong>${candidate}</strong>: ${totals[candidate]} Vote(s)
        </div>
        `;

    }

    document.getElementById("results").innerHTML = html;

}

loadResults();

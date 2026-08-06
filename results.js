import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadResults(){

    const snapshot = await getDocs(collection(db,"votes"));

    let results = {};

    snapshot.forEach((doc)=>{

        let vote = doc.data();

        if(results[vote.candidate]){
            results[vote.candidate]++;
        }else{
            results[vote.candidate]=1;
        }

    });

    let html="";

    for(let candidate in results){

        html += `
        <div style="margin:15px 0;padding:15px;border:1px solid #ccc;border-radius:10px;">
            <h3>${candidate}</h3>
            <h2>${results[candidate]} Vote(s)</h2>
        </div>
        `;

    }

    document.getElementById("results").innerHTML = html;

}

loadResults();

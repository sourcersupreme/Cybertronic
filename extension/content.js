function getEmailText() {
    return document.body.innerText;
}

async function checkPhishing() {
    let text = getEmailText();

    let res = await fetch("http://YOUR_SERVER_IP:5000/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: text})
    });

    let data = await res.json();

    alert("⚠️ Email Status: " + data.prediction + " (" + data.confidence + "%)");
}

checkPhishing();

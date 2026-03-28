function scanEmail() {
    console.log("Scanning started...");

    let text = getEmailContent();
    console.log("Extracted text:", text);

    if (text.length > 0) {
        fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text: text})
        })
        .then(res => res.json())
        .then(data => {
    console.log("API Response:", data);
    showResult(data.prediction, data.confidence);
})
        .catch(err => console.error("API Error:", err));
    } else {
        console.log("No email content found");
    }
}

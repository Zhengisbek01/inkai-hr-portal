import { useState } from "react";

const uid = () => Math.random().toString(36).slice(2,9);

const getCSS = (theme) => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800;900&display=swap');
.themebtn{background:none;border:none;cursor:pointer;color:#4B5563;font-size:14px;padding:3px;flex-shrink:0;transition:color .15s}
.themebtn:hover{color:#F5A623}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#0F1117;color:#F9FAFB;min-height:100vh}
.lw{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#0F1117 0%,#1a1f35 50%,#0F1117 100%)}
.lcard{width:100%;max-width:460px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:38px 34px;backdrop-filter:blur(20px)}
.llogo{text-align:center;margin-bottom:26px}
.lstep{font-size:11px;font-weight:600;color:#0E6EC4;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.ltitle{font-family:'Manrope',sans-serif;font-size:19px;font-weight:800;color:#fff;margin-bottom:4px}
.lsub{font-size:12.5px;color:#6B7280;margin-bottom:18px}
.lg{margin-bottom:13px}
.ll{font-size:10.5px;font-weight:600;color:#6B7280;margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:.5px}
.linput{width:100%;padding:11px 13px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;font-size:13.5px;color:#fff;font-family:'Inter',sans-serif;outline:none;transition:all .2s}
.linput::placeholder{color:#374151}
.linput:focus{border-color:#0E6EC4;background:rgba(14,110,196,.08);box-shadow:0 0 0 3px rgba(14,110,196,.15)}
.linput.err{border-color:#EF4444}
.lerr{font-size:11px;color:#F87171;margin-top:4px}
.lbtn{width:100%;padding:13px;background:linear-gradient(135deg,#0E6EC4,#0A5BA3);border:none;border-radius:10px;font-size:14px;font-weight:700;color:#fff;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;margin-top:6px;box-shadow:0 4px 20px rgba(14,110,196,.4)}
.lbtn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(14,110,196,.5)}
.lbtn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.dots{display:flex;gap:6px;justify-content:center;margin-bottom:22px}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.12);transition:all .3s}
.dot.act{background:#0E6EC4;width:22px;border-radius:4px}
.demo-btn{display:flex;align-items:center;gap:9px;width:100%;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:9px;margin-bottom:6px;cursor:pointer;transition:all .15s;text-align:left}
.demo-btn:hover{background:rgba(14,110,196,.1);border-color:rgba(14,110,196,.3)}
.demo-ava{width:33px;height:33px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.demo-name{font-size:12.5px;font-weight:600;color:#E5E7EB;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.demo-pos{font-size:11px;color:#4B5563}
.drb{font-size:9.5px;font-weight:600;padding:2px 7px;border-radius:99px;flex-shrink:0}
.app{display:flex;min-height:100vh;background:#0F1117}
.sidebar{width:248px;background:#13151C;border-right:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:20;transition:width .25s ease}
.sidebar.coll{width:62px}
.sbh{padding:15px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:9px;overflow:hidden;white-space:nowrap;min-height:63px}
.sbbrand{display:flex;align-items:center;gap:9px;flex:1;overflow:hidden}
.sbicon{width:33px;height:33px;background:linear-gradient(135deg,#0E6EC4,#0A5BA3);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.sbtext h2{font-family:'Manrope',sans-serif;font-size:14px;font-weight:800;color:#fff}
.sbtext span{font-size:9.5px;color:#6B7280;display:block;margin-top:1px}
.sidebar.coll .sbtext{display:none}
.sbtog{background:rgba(255,255,255,.07);border:none;cursor:pointer;width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#6B7280;font-size:10px;flex-shrink:0;transition:all .15s}
.sbtog:hover{background:rgba(255,255,255,.12);color:#fff}
.sbnav{flex:1;padding:9px 7px;overflow:hidden}
.ni{display:flex;align-items:center;gap:9px;padding:9px 10px;cursor:pointer;font-size:12.5px;font-weight:500;color:#6B7280;border-radius:9px;transition:all .15s;white-space:nowrap;overflow:hidden;margin-bottom:2px;position:relative}
.ni:hover{color:#E5E7EB;background:rgba(255,255,255,.06)}
.ni.active{color:#fff;background:rgba(14,110,196,.2);box-shadow:inset 0 0 0 1px rgba(14,110,196,.3)}
.ni-icon{font-size:15px;width:21px;text-align:center;flex-shrink:0}
.ni-label{transition:opacity .2s}
.sidebar.coll .ni-label{opacity:0;width:0;pointer-events:none}
.sidebar.coll .ni{padding:9px;justify-content:center}
.sidebar.coll .sbh{justify-content:center}
.sidebar.coll .sbbrand{flex:0}
.nibadge{position:absolute;right:9px;top:50%;transform:translateY(-50%);background:#EF4444;color:#fff;font-size:9px;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center}
.sidebar.coll .nibadge{right:1px;top:3px;transform:none}
.sbuser{padding:11px 9px;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:9px;overflow:hidden;white-space:nowrap}
.ava{width:33px;height:33px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 0 0 2px rgba(14,110,196,.4)}
.uinfo{overflow:hidden;flex:1}
.uname{font-size:11.5px;font-weight:600;color:#E5E7EB;overflow:hidden;text-overflow:ellipsis}
.urole{font-size:10px;color:#6B7280}
.sidebar.coll .uinfo{display:none}
.logoutbtn{background:none;border:none;cursor:pointer;color:#4B5563;font-size:15px;padding:3px;flex-shrink:0;transition:color .15s}
.logoutbtn:hover{color:#F87171}
.ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:15;backdrop-filter:blur(4px)}
.ov.show{display:block}
.main{margin-left:248px;flex:1;padding:26px 28px;min-height:100vh;transition:margin-left .25s ease}
.main.coll{margin-left:62px}
.mobbar{display:none;align-items:center;gap:11px;margin-bottom:18px}
.hbg{background:#13151C;border:1px solid rgba(255,255,255,.1);cursor:pointer;width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex-shrink:0}
.ph{margin-bottom:20px}
.ph h1{font-family:'Manrope',sans-serif;font-size:20px;font-weight:800;color:#fff}
.ph p{font-size:12.5px;color:#6B7280;margin-top:3px}
.card{background:#13151C;border-radius:14px;border:1px solid rgba(255,255,255,.07);padding:18px;margin-bottom:14px}
.ct{font-family:'Manrope',sans-serif;font-size:13.5px;font-weight:700;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:7px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px}
.sc{background:#13151C;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:15px 11px;text-align:center;cursor:pointer;transition:all .2s}
.sc:hover{border-color:rgba(14,110,196,.4);transform:translateY(-2px)}
.sv{font-family:'Manrope',sans-serif;font-size:22px;font-weight:800}
.sl{font-size:11px;color:#6B7280;margin-top:3px}
.pb{background:rgba(255,255,255,.07);border-radius:99px;height:6px;overflow:hidden}
.pf{height:100%;border-radius:99px;transition:width .8s}
.btn{padding:8px 15px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'Inter',sans-serif}
.bp{background:linear-gradient(135deg,#0E6EC4,#0A5BA3);color:#fff;box-shadow:0 2px 10px rgba(14,110,196,.3)}
.bp:hover{box-shadow:0 4px 16px rgba(14,110,196,.5);transform:translateY(-1px)}
.bp:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.bo{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#D1D5DB}
.bo:hover{background:rgba(255,255,255,.1);color:#fff}
.bd{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#F87171}
.bd:hover{background:rgba(239,68,68,.18)}
.bg2{background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25);color:#34D399}
.bg2:hover{background:rgba(16,185,129,.18)}
.bsm{padding:5px 10px;font-size:11.5px}
.bi{width:29px;height:29px;padding:0;display:inline-flex;align-items:center;justify-content:center;border-radius:7px}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:99px;font-size:10.5px;font-weight:600}
.bg{background:rgba(16,185,129,.15);color:#34D399;border:1px solid rgba(16,185,129,.2)}
.bb{background:rgba(14,110,196,.15);color:#7BBFEF;border:1px solid rgba(14,110,196,.2)}
.bo2{background:rgba(245,158,11,.12);color:#FCD34D;border:1px solid rgba(245,158,11,.2)}
.bgr{background:rgba(255,255,255,.06);color:#9CA3AF;border:1px solid rgba(255,255,255,.08)}
.br{background:rgba(239,68,68,.12);color:#F87171;border:1px solid rgba(239,68,68,.2)}
.bpnk{background:rgba(236,72,153,.12);color:#F472B6;border:1px solid rgba(236,72,153,.2)}
.sr{display:flex;align-items:center;gap:9px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.sr:last-child{border-bottom:none}
.st{flex:1;font-size:13px;color:#D1D5DB}
.sbs{display:flex;gap:4px}
.sb2{width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);font-size:11.5px;font-weight:600;cursor:pointer;color:#6B7280;transition:all .15s;display:flex;align-items:center;justify-content:center}
.sb2:hover{border-color:#0E6EC4;color:#7BBFEF}
.sb2.sel{background:#0E6EC4;border-color:#0E6EC4;color:#fff;box-shadow:0 2px 8px rgba(14,110,196,.4)}
.rs{display:flex;gap:4px}
.star{font-size:21px;cursor:pointer;filter:grayscale(1);opacity:.2;transition:all .1s}
.star.on{filter:none;opacity:1}
.ir{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.ir:last-child{border-bottom:none}
.div{height:1px;background:rgba(255,255,255,.06);margin:14px 0}
.emp{text-align:center;padding:34px 20px;color:#4B5563}
.emp .ei{font-size:32px;margin-bottom:7px}
.wb{background:linear-gradient(135deg,#1e1b4b 0%,#1e1035 50%,#0f172a 100%);border-radius:16px;padding:20px 22px;margin-bottom:16px;border:1px solid rgba(14,110,196,.25);position:relative;overflow:hidden}
.wb::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:radial-gradient(circle,rgba(14,110,196,.2),transparent 70%);pointer-events:none}
.tabs{display:flex;gap:3px;margin-bottom:14px;background:rgba(255,255,255,.04);padding:3px;border-radius:9px;width:fit-content;border:1px solid rgba(255,255,255,.06)}
.tb{padding:6px 13px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;border:none;background:transparent;color:#6B7280;transition:all .15s}
.tb.act{background:rgba(14,110,196,.25);color:#7BBFEF;font-weight:600;border:1px solid rgba(14,110,196,.3)}
.lc{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid rgba(255,255,255,.07);border-radius:11px;background:rgba(255,255,255,.02);margin-bottom:7px;cursor:pointer;transition:all .15s}
.lc:hover{border-color:rgba(14,110,196,.3);background:rgba(14,110,196,.06)}
.lci{font-size:22px;width:42px;height:42px;background:rgba(255,255,255,.06);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sbl{display:grid;grid-template-columns:258px 1fr;gap:14px;align-items:start}
.sbp{background:#13151C;border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:14px;position:sticky;top:20px}
.spt{font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:9px}
.qtb{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.02);font-size:12px;font-weight:500;color:#D1D5DB;cursor:pointer;margin-bottom:5px;transition:all .15s;text-align:left}
.qtb:hover{border-color:rgba(14,110,196,.4);background:rgba(14,110,196,.08);color:#7BBFEF}
.qc{background:#13151C;border:1.5px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;margin-bottom:9px;transition:all .2s;cursor:pointer}
.qc:hover{border-color:rgba(14,110,196,.25)}
.qc.foc{border-color:rgba(14,110,196,.5);box-shadow:0 0 0 3px rgba(14,110,196,.1)}
.qh{display:flex;align-items:center;gap:7px;margin-bottom:10px}
.qnum{width:21px;height:21px;background:linear-gradient(135deg,#0E6EC4,#0A5BA3);color:#fff;border-radius:5px;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.qtag{font-size:9.5px;color:#6B7280;background:rgba(255,255,255,.05);padding:2px 7px;border-radius:99px}
.qa{margin-left:auto;display:flex;gap:4px}
.dh{cursor:grab;color:#374151;font-size:13px}
.qi2{width:100%;padding:8px 11px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;color:#fff;background:rgba(255,255,255,.04);outline:none;transition:all .15s}
.qi2:focus{border-color:#0E6EC4}
.qi2::placeholder{color:#374151}
.qi2.hint{font-size:11.5px;color:#4B5563;background:rgba(255,255,255,.02)}
.optrow{display:flex;align-items:center;gap:7px;margin-top:7px}
.optbullet{width:13px;height:13px;border:2px solid #374151;border-radius:50%;flex-shrink:0}
.optbullet.sq{border-radius:3px}
.optinp{flex:1;padding:6px 9px;border:1.5px solid rgba(255,255,255,.07);border-radius:7px;font-size:12px;font-family:'Inter',sans-serif;color:#E5E7EB;background:rgba(255,255,255,.03);outline:none;transition:border-color .15s}
.optinp:focus{border-color:#0E6EC4}
.optinp::placeholder{color:#374151}
.optdel{background:none;border:none;cursor:pointer;color:#374151;font-size:16px;padding:0 2px;transition:color .15s;line-height:1}
.optdel:hover{color:#EF4444}
.addoptbtn{margin-top:7px;background:none;border:none;cursor:pointer;font-size:12px;color:#0E6EC4;font-weight:500;padding:3px 0;display:flex;align-items:center;gap:4px}
.scaleprev{display:flex;gap:4px;margin-top:8px;flex-wrap:wrap}
.scalebtn{width:32px;height:32px;border-radius:7px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);font-size:11.5px;font-weight:600;color:#6B7280;display:flex;align-items:center;justify-content:center}
.svrinp{width:100%;padding:9px 12px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-family:'Inter',sans-serif;color:#fff;background:rgba(255,255,255,.04);outline:none;transition:all .15s;margin-bottom:8px}
.svrinp:focus{border-color:#0E6EC4}
.svrinp::placeholder{color:#374151}
.svrinp.big{font-family:'Manrope',sans-serif;font-size:17px;font-weight:700}
.mlov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px)}
.ml{background:#13151C;border:1px solid rgba(255,255,255,.1);border-radius:17px;width:100%;max-width:540px;max-height:88vh;overflow-y:auto;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.5)}
.mlh{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
.mlclose{background:rgba(255,255,255,.07);border:none;cursor:pointer;width:28px;height:28px;border-radius:7px;font-size:15px;display:flex;align-items:center;justify-content:center;color:#9CA3AF;flex-shrink:0}
.mlclose:hover{background:rgba(255,255,255,.12);color:#fff}
.news-card{background:#13151C;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px 18px 18px 20px;margin-bottom:12px;transition:all .2s;position:relative;overflow:hidden}
.news-card:hover{border-color:rgba(14,110,196,.2)}
.news-card.pinned{border-color:rgba(245,158,11,.25);background:rgba(245,158,11,.03)}
.ncstrip{position:absolute;top:0;left:0;bottom:0;width:4px;border-radius:14px 0 0 14px}
.ncicon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.nctitle{font-family:'Manrope',sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1.3}
.ncby{font-size:11px;color:#4B5563;margin-top:3px}
.ncbody{font-size:12.5px;color:#9CA3AF;line-height:1.7;padding-left:48px;margin-top:2px}
.nf-btn{padding:5px 11px;border-radius:99px;font-size:11.5px;font-weight:500;cursor:pointer;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#6B7280;transition:all .15s}
.nf-btn:hover{color:#D1D5DB;border-color:rgba(255,255,255,.15)}
.nf-btn.sel{color:#fff;border-color:rgba(14,110,196,.5);background:rgba(14,110,196,.15)}
.pinbtn{background:none;border:none;cursor:pointer;font-size:13px;color:#6B7280;padding:2px;transition:color .15s;line-height:1}
.pinbtn:hover{color:#FCD34D}
.pinbtn.on{color:#FCD34D}
.emprow{display:flex;align-items:center;gap:11px;padding:12px 13px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.02);margin-bottom:7px;transition:all .15s}
.emprow:hover{border-color:rgba(14,110,196,.2)}
.empava{width:37px;height:37px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.empinfo{flex:1;min-width:0}
.empname{font-size:13px;font-weight:600;color:#E5E7EB;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.empmeta{font-size:11px;color:#4B5563;margin-top:2px}
.taskrow{display:flex;align-items:center;gap:8px;padding:9px;border:1px solid rgba(255,255,255,.06);border-radius:9px;background:rgba(255,255,255,.02);margin-bottom:6px}
.taskdrag{cursor:grab;color:#374151;font-size:12px}
.taskbody{flex:1;min-width:0}
.taskt{font-size:12.5px;font-weight:500;color:#E5E7EB;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.taskd{font-size:10.5px;color:#4B5563;margin-top:1px}
.wpill{font-size:10px;font-weight:600;padding:2px 7px;border-radius:99px;background:rgba(14,110,196,.12);color:#7BBFEF;flex-shrink:0}
.ta{width:100%;padding:9px 11px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-size:12.5px;font-family:'Inter',sans-serif;resize:vertical;min-height:75px;outline:none;background:rgba(255,255,255,.04);color:#E5E7EB}
.ta:focus{border-color:#0E6EC4}
.ta::placeholder{color:#374151}
.inp{width:100%;padding:9px 11px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-size:12.5px;font-family:'Inter',sans-serif;outline:none;background:rgba(255,255,255,.04);color:#E5E7EB;transition:border-color .15s}
.inp:focus{border-color:#0E6EC4}
.inp::placeholder{color:#374151}
select.inp{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%236B7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center}
@media(max-width:900px){.sidebar{transform:translateX(-100%);width:248px!important}.sidebar.mob-open{transform:translateX(0)}.ov.show{display:block}.main{margin-left:0!important;padding:14px}.mobbar{display:flex}.g3{grid-template-columns:1fr 1fr}.sbl{grid-template-columns:1fr}.sbp{position:static}}
@media(max-width:560px){.g2,.g3{grid-template-columns:1fr}.wb{flex-direction:column;gap:9px}}
${theme==="light"?`
/* ── LIGHT THEME ── */
body{background:#F8FAFE!important;color:#1A3A5C!important}
.app{background:#F8FAFE!important}
.sidebar{background:#fff!important;border-right:1px solid #E2F0FC!important}
.sbh{border-bottom-color:#E2F0FC!important}
.sbtext h2{color:#1A3A5C!important}
.sbtext span{color:#6B8BAA!important}
.sbtog{background:rgba(14,110,196,.08)!important;color:#6B8BAA!important}
.sbtog:hover{background:rgba(14,110,196,.15)!important;color:#0E6EC4!important}
.sbnav{}
.ni{color:#6B8BAA!important}
.ni:hover{color:#0E6EC4!important;background:#EFF7FF!important}
.ni.active{color:#0E6EC4!important;background:#EFF7FF!important;box-shadow:inset 0 0 0 1px rgba(14,110,196,.2)!important}
.nibadge{background:#F5A623!important}
.sbuser{border-top-color:#E2F0FC!important}
.uname{color:#1A3A5C!important}
.urole{color:#6B8BAA!important}
.logoutbtn{color:#8BA8C0!important}
.logoutbtn:hover{color:#DC2626!important}
.themebtn{color:#8BA8C0!important}
.themebtn:hover{color:#F5A623!important}
.main{background:#F8FAFE!important}
.ph h1{color:#1A3A5C!important}
.ph p{color:#6B8BAA!important}
.card{background:#fff!important;border-color:#E2F0FC!important}
.ct{color:#1A3A5C!important}
.sc{background:#fff!important;border-color:#E2F0FC!important}
.sc:hover{border-color:#0E6EC4!important}
.sl{color:#6B8BAA!important}
.pb{background:#E2F0FC!important}
.btn.bo{background:#fff!important;border-color:#C8E0F5!important;color:#1A3A5C!important}
.btn.bo:hover{background:#EFF7FF!important;border-color:#0E6EC4!important;color:#0E6EC4!important}
.badge.bgr{background:#EFF7FF!important;color:#6B8BAA!important;border-color:#C8E0F5!important}
.sr{border-bottom-color:#E8F3FC!important}
.st{color:#374151!important}
.sb2{border-color:#C8E0F5!important;background:#F8FAFE!important;color:#6B8BAA!important}
.sb2:hover{border-color:#0E6EC4!important;color:#0E6EC4!important;background:#EFF7FF!important}
.ir{border-bottom-color:#E8F3FC!important}
.div{background:#E2F0FC!important}
.emp{color:#8BA8C0!important}
.wb{background:linear-gradient(135deg,#EFF7FF,#DCF0FF)!important;border-color:#C8E0F5!important}
.tabs{background:rgba(14,110,196,.06)!important;border-color:#C8E0F5!important}
.tb{color:#6B8BAA!important}
.tb.act{background:#fff!important;color:#0E6EC4!important;border-color:rgba(14,110,196,.2)!important}
.lc{background:#fff!important;border-color:#E2F0FC!important}
.lc:hover{border-color:rgba(14,110,196,.3)!important;background:#EFF7FF!important}
.lci{background:#EFF7FF!important}
.sbl .sbp{background:#fff!important;border-color:#E2F0FC!important}
.qtb{background:#fff!important;border-color:#E2F0FC!important;color:#374151!important}
.qtb:hover{border-color:rgba(14,110,196,.4)!important;background:#EFF7FF!important;color:#0E6EC4!important}
.qc{background:#fff!important;border-color:#E2F0FC!important}
.qc.foc{border-color:#0E6EC4!important;box-shadow:0 0 0 3px rgba(14,110,196,.1)!important}
.qi2{border-color:#C8E0F5!important;background:#F8FAFE!important;color:#1A3A5C!important}
.optinp{border-color:#C8E0F5!important;background:#F8FAFE!important;color:#374151!important}
.svrinp{border-color:#C8E0F5!important;background:#F8FAFE!important;color:#1A3A5C!important}
.ml{background:#fff!important;border-color:#C8E0F5!important}
.mlclose{background:#EFF7FF!important;color:#6B8BAA!important}
.news-card{background:#fff!important;border-color:#E2F0FC!important}
.news-card.pinned{background:#FFFBEB!important;border-color:#FCD34D!important}
.nctitle{color:#1A3A5C!important}
.ncby{color:#6B8BAA!important}
.ncbody{color:#374151!important}
.nf-btn{background:#fff!important;border-color:#C8E0F5!important;color:#6B8BAA!important}
.nf-btn.sel{background:#EFF7FF!important;border-color:rgba(14,110,196,.4)!important;color:#0E6EC4!important}
.pinbtn{color:#C8E0F5!important}
.pinbtn.on{color:#F5A623!important}
.emprow{background:#fff!important;border-color:#E2F0FC!important}
.empname{color:#1A3A5C!important}
.empmeta{color:#8BA8C0!important}
.taskrow{background:#F8FAFE!important;border-color:#E2F0FC!important}
.wpill{background:rgba(14,110,196,.08)!important;color:#0E6EC4!important}
.ta{border-color:#C8E0F5!important;background:#F8FAFE!important;color:#374151!important}
.ta:focus{border-color:#0E6EC4!important}
.inp{border-color:#C8E0F5!important;background:#F8FAFE!important;color:#1A3A5C!important}
select.inp{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%230E6EC4' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")!important}
.hbg{background:#fff!important;border-color:#C8E0F5!important;color:#0E6EC4!important}
.lw{background:linear-gradient(135deg,#F8FAFE,#EFF7FF,#F8FAFE)!important}
.lcard{background:#fff!important;border-color:#C8E0F5!important}
.llogo p{color:#6B8BAA!important}
.ll{color:#6B8BAA!important}
.linput{background:#F8FAFE!important;border-color:#C8E0F5!important;color:#1A3A5C!important}
.linput:focus{border-color:#0E6EC4!important;background:#EFF7FF!important}
.linput::placeholder{color:#8BA8C0!important}
.demo-btn{background:#F8FAFE!important;border-color:#E2F0FC!important}
.demo-btn:hover{background:#EFF7FF!important;border-color:rgba(14,110,196,.3)!important}
.demo-name{color:#1A3A5C!important}
.demo-pos{color:#6B8BAA!important}
`:""}` ;


const getInitials = n => n.trim().split(" ").map(w=>w[0]||"").slice(0,2).join("").toUpperCase()||"?";
const avatarGrad  = n => {
  const g=["linear-gradient(135deg,#0E6EC4,#0A5BA3)","linear-gradient(135deg,#EC4899,#F43F5E)","linear-gradient(135deg,#0EA5E9,#0E6EC4)","linear-gradient(135deg,#10B981,#0EA5E9)","linear-gradient(135deg,#F59E0B,#EF4444)","linear-gradient(135deg,#0A5BA3,#EC4899)"];
  let h=0; for(let c of n) h=(h*31+c.charCodeAt(0))%g.length; return g[h];
};
const daysSince = d => Math.max(0,Math.floor((Date.now()-new Date(d))/(86400000)));
const fmtDate   = d => new Date(d).toLocaleDateString("ru-RU",{day:"numeric",month:"long"});
const newQ_empty = t => ({id:uid(),type:t,text:"",required:true,options:(t==="radio"||t==="checkbox")?["Вариант 1","Вариант 2"]:[]});


const ADAPT_TEMPLATES = [
  {id:"t1",week:1,title:"Знакомство с командой",desc:"Встречи с коллегами из отдела"},
  {id:"t2",week:1,title:"Оформление документов",desc:"Трудовой договор и НДА"},
  {id:"t3",week:1,title:"Настройка рабочего места",desc:"Оборудование и доступы"},
  {id:"t4",week:2,title:"Онбординг с руководителем",desc:"Цели на испытательный срок"},
  {id:"t5",week:2,title:"Изучение продукта",desc:"Погружение в продукт компании"},
  {id:"t6",week:3,title:"Первая задача в проекте",desc:"Реальная задача под наставничеством"},
  {id:"t7",week:4,title:"Обратная связь — 30 дней",desc:"Встреча с HR, итоги месяца"},
  {id:"t8",week:6,title:"Промежуточная оценка",desc:"Прогресс на середине срока"},
  {id:"t9",week:12,title:"Итоговая оценка",desc:"Финал испытательного срока"},
];

const DEV_Q = [
  /* ── Коммуникация (30) ── */
  {id:1,  cat:"Коммуникация", text:"Я легко нахожу общий язык с новыми людьми"},
  {id:2,  cat:"Коммуникация", text:"Я чётко формулирую мысли устно и письменно"},
  {id:3,  cat:"Коммуникация", text:"Я умею слушать собеседника, не перебивая его"},
  {id:4,  cat:"Коммуникация", text:"Мне удаётся убедительно аргументировать свою точку зрения"},
  {id:5,  cat:"Коммуникация", text:"Я даю чёткую и полезную обратную связь коллегам"},
  {id:6,  cat:"Коммуникация", text:"Я умею адаптировать стиль общения под разную аудиторию"},
  {id:7,  cat:"Коммуникация", text:"Я задаю уточняющие вопросы, прежде чем приступить к задаче"},
  {id:8,  cat:"Коммуникация", text:"Я умею сообщать плохие новости тактично и конструктивно"},
  {id:9,  cat:"Коммуникация", text:"Мои письма и сообщения понятны с первого прочтения"},
  {id:10, cat:"Коммуникация", text:"Я умею вести переговоры и находить компромисс"},
  {id:11, cat:"Коммуникация", text:"Я комфортно выступаю перед группой людей"},
  {id:12, cat:"Коммуникация", text:"Я слежу за невербальными сигналами собеседника"},
  {id:13, cat:"Коммуникация", text:"Мне удаётся удерживать внимание аудитории во время презентаций"},
  {id:14, cat:"Коммуникация", text:"Я умею отстаивать позицию, сохраняя уважение к оппоненту"},
  {id:15, cat:"Коммуникация", text:"Я регулярно информирую команду о ходе своей работы"},
  {id:16, cat:"Коммуникация", text:"Я умею перефразировать услышанное, чтобы убедиться в понимании"},
  {id:17, cat:"Коммуникация", text:"Я избегаю профессионального жаргона в разговоре с непрофессионалами"},
  {id:18, cat:"Коммуникация", text:"Я умею вовремя сказать «нет», не разрушая отношений"},
  {id:19, cat:"Коммуникация", text:"Я привлекаю нужных людей в разговор своевременно"},
  {id:20, cat:"Коммуникация", text:"Моё мнение воспринимается коллегами с доверием"},
  {id:21, cat:"Коммуникация", text:"Я умею структурировать сложную информацию для передачи другим"},
  {id:22, cat:"Коммуникация", text:"Я активно использую различные каналы коммуникации по ситуации"},
  {id:23, cat:"Коммуникация", text:"Я умею деэскалировать конфликт в разговоре"},
  {id:24, cat:"Коммуникация", text:"Я получаю позитивную обратную связь о своём стиле общения"},
  {id:25, cat:"Коммуникация", text:"Я замечаю, когда собеседник не понял меня, и перефразирую"},
  {id:26, cat:"Коммуникация", text:"Мои аргументы подкреплены фактами и примерами"},
  {id:27, cat:"Коммуникация", text:"Я умею вовлечь молчаливых участников в общую дискуссию"},
  {id:28, cat:"Коммуникация", text:"Я соблюдаю договорённости о формате и сроках коммуникации"},
  {id:29, cat:"Коммуникация", text:"Я умею кратко резюмировать итоги встречи"},
  {id:30, cat:"Коммуникация", text:"Я создаю атмосферу, в которой люди не боятся высказываться"},

  /* ── Управление временем (30) ── */
  {id:31, cat:"Управление временем", text:"Я расставляю приоритеты и выполняю задачи в срок"},
  {id:32, cat:"Управление временем", text:"Я планирую свой рабочий день заранее"},
  {id:33, cat:"Управление временем", text:"Я редко откладываю дела на последний момент"},
  {id:34, cat:"Управление временем", text:"Я выдерживаю сроки даже при высокой загрузке"},
  {id:35, cat:"Управление временем", text:"Я умею говорить «нет» задачам, которые не являются приоритетными"},
  {id:36, cat:"Управление временем", text:"Мне комфортно работать в условиях неопределённости"},
  {id:37, cat:"Управление временем", text:"Я использую инструменты планирования (списки, календари, трекеры)"},
  {id:38, cat:"Управление временем", text:"Я умею оценивать реальное время, необходимое для выполнения задачи"},
  {id:39, cat:"Управление временем", text:"Я не позволяю незапланированным задачам сорвать мой план"},
  {id:40, cat:"Управление временем", text:"Я группирую похожие задачи для более эффективной работы"},
  {id:41, cat:"Управление временем", text:"Я умею работать в режиме глубокой концентрации без отвлечений"},
  {id:42, cat:"Управление временем", text:"Я заблаговременно сообщаю о рисках срыва сроков"},
  {id:43, cat:"Управление временем", text:"Я умею делегировать задачи, которые не должен делать сам"},
  {id:44, cat:"Управление временем", text:"Я отслеживаю прогресс по ключевым задачам на протяжении дня"},
  {id:45, cat:"Управление временем", text:"Я эффективно использую промежутки между встречами"},
  {id:46, cat:"Управление временем", text:"Я умею выделить 20% задач, дающих 80% результата"},
  {id:47, cat:"Управление временем", text:"Я завершаю начатые задачи прежде, чем браться за новые"},
  {id:48, cat:"Управление временем", text:"Я минимизирую время на совещания без чёткой повестки"},
  {id:49, cat:"Управление временем", text:"Я умею быстро восстанавливать фокус после отвлечений"},
  {id:50, cat:"Управление временем", text:"Я регулярно анализирую, куда уходит моё рабочее время"},
  {id:51, cat:"Управление временем", text:"Я защищаю время для стратегических задач от текучки"},
  {id:52, cat:"Управление временем", text:"Я умею работать с несколькими параллельными задачами без потери качества"},
  {id:53, cat:"Управление временем", text:"Я чётко разграничиваю рабочее и личное время"},
  {id:54, cat:"Управление временем", text:"Я умею быстро переключаться при изменении приоритетов"},
  {id:55, cat:"Управление временем", text:"Я заранее готовлюсь к встречам, чтобы не тратить время впустую"},
  {id:56, cat:"Управление временем", text:"Я умею сократить объём работы, не теряя её ценности"},
  {id:57, cat:"Управление временем", text:"Я не позволяю перфекционизму задерживать выполнение задач"},
  {id:58, cat:"Управление временем", text:"Я умею работать в условиях сжатых сроков без потери качества"},
  {id:59, cat:"Управление временем", text:"Я соблюдаю баланс между скоростью и тщательностью выполнения"},
  {id:60, cat:"Управление временем", text:"Я регулярно делаю паузы для восстановления продуктивности"},

  /* ── Аналитика (30) ── */
  {id:61, cat:"Аналитика", text:"Я умею разбивать сложную задачу на простые шаги"},
  {id:62, cat:"Аналитика", text:"Я принимаю решения, опираясь на данные"},
  {id:63, cat:"Аналитика", text:"Я умею находить первопричину проблемы, а не устранять симптомы"},
  {id:64, cat:"Аналитика", text:"Мне легко работать с числами и таблицами"},
  {id:65, cat:"Аналитика", text:"Я могу оценить риски до принятия решения"},
  {id:66, cat:"Аналитика", text:"Я формулирую гипотезы и проверяю их, прежде чем делать выводы"},
  {id:67, cat:"Аналитика", text:"Я умею критически оценивать поступающую информацию"},
  {id:68, cat:"Аналитика", text:"Я умею видеть связи между разрозненными фактами"},
  {id:69, cat:"Аналитика", text:"Я строю логические цепочки рассуждений без пробелов"},
  {id:70, cat:"Аналитика", text:"Я умею работать с неполными или противоречивыми данными"},
  {id:71, cat:"Аналитика", text:"Я умею выделять ключевые показатели из большого массива информации"},
  {id:72, cat:"Аналитика", text:"Я использую структурированные методы решения проблем"},
  {id:73, cat:"Аналитика", text:"Я умею прогнозировать последствия своих решений"},
  {id:74, cat:"Аналитика", text:"Я делаю выводы, основанные на фактах, а не на ощущениях"},
  {id:75, cat:"Аналитика", text:"Я умею сравнивать альтернативы по чётким критериям"},
  {id:76, cat:"Аналитика", text:"Я умею выявлять скрытые допущения в аргументах"},
  {id:77, cat:"Аналитика", text:"Я умею применять системное мышление при анализе ситуации"},
  {id:78, cat:"Аналитика", text:"Я задаю вопрос «почему?» несколько раз, чтобы добраться до сути"},
  {id:79, cat:"Аналитика", text:"Я умею строить визуальные схемы для анализа сложных процессов"},
  {id:80, cat:"Аналитика", text:"Я отличаю корреляцию от причинно-следственной связи"},
  {id:81, cat:"Аналитика", text:"Я умею предлагать несколько вариантов решения проблемы"},
  {id:82, cat:"Аналитика", text:"Я умею оценивать решения по критериям эффективности и затрат"},
  {id:83, cat:"Аналитика", text:"Я умею собирать нужную информацию быстро и точно"},
  {id:84, cat:"Аналитика", text:"Я умею учиться на ошибках и корректировать свои модели"},
  {id:85, cat:"Аналитика", text:"Я умею разграничивать факты, мнения и предположения"},
  {id:86, cat:"Аналитика", text:"Я умею проводить простой анализ данных без специальных инструментов"},
  {id:87, cat:"Аналитика", text:"Я умею задавать правильные вопросы, чтобы сформулировать проблему"},
  {id:88, cat:"Аналитика", text:"Я умею обосновывать свои решения для других"},
  {id:89, cat:"Аналитика", text:"Я умею оценивать качество источников информации"},
  {id:90, cat:"Аналитика", text:"Я проверяю свои выводы на логическую последовательность"},

  /* ── Лидерство (30) ── */
  {id:91,  cat:"Лидерство", text:"Я активно делюсь знаниями и помогаю коллегам"},
  {id:92,  cat:"Лидерство", text:"Я беру ответственность за результат команды"},
  {id:93,  cat:"Лидерство", text:"Я умею мотивировать людей вокруг себя"},
  {id:94,  cat:"Лидерство", text:"Я готов брать инициативу, не дожидаясь указаний"},
  {id:95,  cat:"Лидерство", text:"Я умею разрешать конфликты внутри команды"},
  {id:96,  cat:"Лидерство", text:"Мне доверяют, когда я берусь за новый проект или задачу"},
  {id:97,  cat:"Лидерство", text:"Я умею формулировать ясное видение и доносить его до команды"},
  {id:98,  cat:"Лидерство", text:"Я умею делегировать задачи и доверять их выполнение другим"},
  {id:99,  cat:"Лидерство", text:"Я создаю условия для роста и развития коллег"},
  {id:100, cat:"Лидерство", text:"Я умею принимать трудные решения под давлением"},
  {id:101, cat:"Лидерство", text:"Я умею вдохновлять команду в периоды изменений"},
  {id:102, cat:"Лидерство", text:"Я умею признавать и исправлять свои ошибки публично"},
  {id:103, cat:"Лидерство", text:"Я умею выявлять и развивать таланты в своей команде"},
  {id:104, cat:"Лидерство", text:"Я умею выстраивать доверие внутри рабочих групп"},
  {id:105, cat:"Лидерство", text:"Я умею вести команду через неопределённость"},
  {id:106, cat:"Лидерство", text:"Я умею давать честную и развивающую обратную связь"},
  {id:107, cat:"Лидерство", text:"Я умею ставить чёткие и измеримые цели для команды"},
  {id:108, cat:"Лидерство", text:"Я умею поддерживать высокий моральный дух в сложные периоды"},
  {id:109, cat:"Лидерство", text:"Я умею выстраивать коалиции и привлекать союзников"},
  {id:110, cat:"Лидерство", text:"Я умею балансировать между требовательностью и поддержкой"},
  {id:111, cat:"Лидерство", text:"Я умею принимать чужие точки зрения при выработке решений"},
  {id:112, cat:"Лидерство", text:"Я умею отстаивать интересы команды перед руководством"},
  {id:113, cat:"Лидерство", text:"Я умею распознавать демотивацию и своевременно реагировать"},
  {id:114, cat:"Лидерство", text:"Я создаю среду, где люди не боятся высказывать идеи"},
  {id:115, cat:"Лидерство", text:"Я умею эффективно проводить встречи и фасилитировать дискуссии"},
  {id:116, cat:"Лидерство", text:"Я умею формулировать приоритеты для всей команды"},
  {id:117, cat:"Лидерство", text:"Я умею работать с разными стилями работы в одной команде"},
  {id:118, cat:"Лидерство", text:"Я умею принимать непопулярные, но верные решения"},
  {id:119, cat:"Лидерство", text:"Я умею создавать культуру ответственности без страха"},
  {id:120, cat:"Лидерство", text:"Я служу примером для коллег в профессиональном поведении"},

  /* ── Гибкость (30) ── */
  {id:121, cat:"Гибкость", text:"Мне легко адаптироваться к изменениям"},
  {id:122, cat:"Гибкость", text:"Я воспринимаю критику как возможность для роста"},
  {id:123, cat:"Гибкость", text:"Я быстро осваиваю новые инструменты и процессы"},
  {id:124, cat:"Гибкость", text:"Я сохраняю спокойствие и продуктивность в стрессовых ситуациях"},
  {id:125, cat:"Гибкость", text:"Я открыт к экспериментам и нестандартным подходам"},
  {id:126, cat:"Гибкость", text:"Я легко переключаюсь между задачами при изменении приоритетов"},
  {id:127, cat:"Гибкость", text:"Я умею работать эффективно при неполноте информации"},
  {id:128, cat:"Гибкость", text:"Я не теряю мотивацию при неудачах и откатах"},
  {id:129, cat:"Гибкость", text:"Я с готовностью пробую новые методы работы"},
  {id:130, cat:"Гибкость", text:"Я умею менять стратегию при изменении условий"},
  {id:131, cat:"Гибкость", text:"Я сохраняю эффективность при смене задач в течение дня"},
  {id:132, cat:"Гибкость", text:"Я умею отказываться от неэффективных привычек"},
  {id:133, cat:"Гибкость", text:"Я умею работать в разных форматах: удалённо, в офисе, в поле"},
  {id:134, cat:"Гибкость", text:"Я воспринимаю изменения как возможность, а не угрозу"},
  {id:135, cat:"Гибкость", text:"Я умею сохранять ясность мышления в условиях хаоса"},
  {id:136, cat:"Гибкость", text:"Я умею быстро переосмыслить задачу при новых вводных"},
  {id:137, cat:"Гибкость", text:"Я легко принимаю разные культурные и рабочие стили"},
  {id:138, cat:"Гибкость", text:"Я умею удерживать несколько сценариев развития событий одновременно"},
  {id:139, cat:"Гибкость", text:"Я продолжаю двигаться вперёд, даже если идеальных условий нет"},
  {id:140, cat:"Гибкость", text:"Я умею извлекать уроки из опыта и применять их быстро"},
  {id:141, cat:"Гибкость", text:"Я умею работать с людьми разных характеров и стилей"},
  {id:142, cat:"Гибкость", text:"Я умею сохранять продуктивность при смене руководителя или команды"},
  {id:143, cat:"Гибкость", text:"Я открыт к обратной связи от коллег любого уровня"},
  {id:144, cat:"Гибкость", text:"Я умею находить баланс между гибкостью и дисциплиной"},
  {id:145, cat:"Гибкость", text:"Я умею быстро восстанавливаться после неудач"},
  {id:146, cat:"Гибкость", text:"Я принимаю ошибки как часть процесса, а не как провал"},
  {id:147, cat:"Гибкость", text:"Я умею действовать при отсутствии чётких инструкций"},
  {id:148, cat:"Гибкость", text:"Я умею переосмыслить роль и обязанности при реструктуризации"},
  {id:149, cat:"Гибкость", text:"Я сохраняю позитивный настрой при длительной неопределённости"},
  {id:150, cat:"Гибкость", text:"Я умею находить возможности там, где другие видят только проблемы"},
];

function Login({onLogin,employees}) {
  const [mode,setMode]=useState("demo");
  const [step,setStep]=useState(0);
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  const [pos,setPos]=useState("");
  const [dept,setDept]=useState("");
  const [errs,setErrs]=useState({});
  const allAcc=[...DEMO_ACCOUNTS,...employees];
  const fmtPh=v=>{const d=v.replace(/\D/g,"");if(!d.length)return"";let r="+7";if(d.length>1)r+=" ("+d.slice(1,4);if(d.length>4)r+=") "+d.slice(4,7);if(d.length>7)r+="-"+d.slice(7,9);if(d.length>9)r+="-"+d.slice(9,11);return r;};
  const onPh=e=>{setPhone(fmtPh(e.target.value.replace(/\D/g,"").slice(0,11)));if(errs.phone)setErrs(x=>({...x,phone:""}));};
  const valPh=()=>{if(phone.replace(/\D/g,"").length<11){setErrs(x=>({...x,phone:"Введите корректный номер"}));return false;}return true;};
  const valProf=()=>{const e={};if(!name.trim())e.name="Введите ФИО";if(!pos.trim())e.pos="Введите должность";if(!dept)e.dept="Выберите отдел";setErrs(e);return!Object.keys(e).length;};
  const submit=()=>{if(valProf())onLogin({id:uid(),role:"employee",name:name.trim(),pos:pos.trim(),dept,phone,joinDate:new Date().toISOString().slice(0,10),adaptTasks:[],adaptDone:false},true);};
  const roleBg={admin:"linear-gradient(135deg,#EF4444,#F97316)",hr:"linear-gradient(135deg,#6366F1,#8B5CF6)",employee:"linear-gradient(135deg,#10B981,#0EA5E9)"};
  const roleLabel={admin:"Администратор",hr:"HR-менеджер",employee:"Сотрудник"};
  const roleColor={admin:"#FCA5A5",hr:"#A5B4FC",employee:"#6EE7B7"};
  const roleBorder={admin:"rgba(239,68,68,.3)",hr:"rgba(99,102,241,.3)",employee:"rgba(16,185,129,.3)"};
  return (
    <div className="lw">
      <div className="lcard">
        <div className="llogo">
          <div className="llogo-icon">🏢</div>
          <h1>HR Portal</h1>
          <p>Платформа развития сотрудников</p>
        </div>
        {mode==="demo"?(
          <div>
            <div className="ltitle" style={{marginBottom:4}}>Выберите аккаунт</div>
            <div className="lsub">Демо-режим для быстрого входа</div>
            {allAcc.map(a=>(
              <button key={a.id} className="demo-btn" onClick={()=>onLogin(a,false)}>
                <div className="demo-ava" style={{background:avatarGrad(a.name)}}>{getInitials(a.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="demo-name">{a.name}</div>
                  <div className="demo-pos">{a.pos} · {a.dept}</div>
                </div>
                <span className="drb" style={{background:roleBg[a.role]+"33",color:roleColor[a.role],border:`1px solid ${roleBorder[a.role]}`}}>{roleLabel[a.role]}</span>
              </button>
            ))}
            <div style={{marginTop:12}}>
              <button className="btn bo" style={{width:"100%"}} onClick={()=>setMode("new")}>+ Зарегистрироваться</button>
            </div>
          </div>
        ):(
          <div>
            <div className="dots">{[0,1].map(i=><div key={i} className={`dot ${step===i?"act":""}`}/>)}</div>
            {step===0?(
              <div>
                <div className="lstep">Шаг 1 из 2</div>
                <div className="ltitle">Вход в систему</div>
                <div className="lsub">Введите ваш рабочий номер телефона</div>
                <div className="lg">
                  <label className="ll">Номер телефона</label>
                  <input className={`linput ${errs.phone?"err":""}`} type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={onPh} onKeyDown={e=>e.key==="Enter"&&valPh()&&setStep(1)}/>
                  {errs.phone&&<div className="lerr">⚠ {errs.phone}</div>}
                </div>
                <button className="lbtn" onClick={()=>valPh()&&setStep(1)} disabled={!phone}>Продолжить →</button>
                <button className="btn bo" style={{width:"100%",marginTop:9}} onClick={()=>setMode("demo")}>← К выбору аккаунта</button>
              </div>
            ):(
              <div>
                <div className="lstep">Шаг 2 из 2</div>
                <div className="ltitle">Ваш профиль</div>
                <div className="lsub">Заполните информацию о себе</div>
                <div style={{textAlign:"center",marginBottom:16}}>
                  <div style={{width:54,height:54,borderRadius:"50%",background:name?avatarGrad(name):"rgba(255,255,255,.1)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:"#fff",boxShadow:"0 0 0 3px rgba(99,102,241,.3)"}}>
                    {name?getInitials(name):"?"}
                  </div>
                </div>
                {[{k:"name",ph:"Иванов Иван Иванович",lb:"ФИО",val:name,set:setName},{k:"pos",ph:"Должность",lb:"Должность",val:pos,set:setPos}].map(f=>(
                  <div className="lg" key={f.k}>
                    <label className="ll">{f.lb}</label>
                    <input className={`linput ${errs[f.k]?"err":""}`} placeholder={f.ph} value={f.val} onChange={e=>{f.set(e.target.value);if(errs[f.k])setErrs(x=>({...x,[f.k]:""}));}} onKeyDown={e=>e.key==="Enter"&&submit()}/>
                    {errs[f.k]&&<div className="lerr">⚠ {errs[f.k]}</div>}
                  </div>
                ))}
                <div className="lg">
                  <label className="ll">Отдел</label>
                  <select className={`linput ${errs.dept?"err":""}`} value={dept} onChange={e=>{setDept(e.target.value);if(errs.dept)setErrs(x=>({...x,dept:""}));}}>
                    <option value="" disabled>Выберите отдел</option>
                    {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                  {errs.dept&&<div className="lerr">⚠ {errs.dept}</div>}
                </div>
                <div style={{display:"flex",gap:8,marginTop:7}}>
                  <button className="btn bo" style={{flex:1,padding:11}} onClick={()=>setStep(0)}>← Назад</button>
                  <button className="lbtn" style={{flex:2,marginTop:0}} onClick={submit} disabled={!name||!pos||!dept}>Войти →</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NewsModule({user,news,setNews}) {
  const [filter,setFilter]=useState("all");
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({cat:"hire",title:"",body:""});
  const canWrite=user.role==="hr"||user.role==="admin";
  const catMap=Object.fromEntries(NEWS_CATS.map(c=>[c.id,c]));
  const filtered=filter==="all"?news:news.filter(n=>n.cat===filter);
  const sorted=[...filtered].sort((a,b)=>{if(a.pinned&&!b.pinned)return -1;if(!a.pinned&&b.pinned)return 1;return new Date(b.date)-new Date(a.date);});
  const publish=()=>{
    if(!form.title.trim()||!form.body.trim())return;
    setNews(ns=>[{id:uid(),cat:form.cat,title:form.title.trim(),body:form.body.trim(),author:user.name,date:new Date().toISOString().slice(0,10),pinned:false},...ns]);
    setForm({cat:"hire",title:"",body:""});setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:9}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <button className={`nf-btn ${filter==="all"?"sel":""}`} onClick={()=>setFilter("all")}>Все</button>
          {NEWS_CATS.map(c=><button key={c.id} className={`nf-btn ${filter===c.id?"sel":""}`} onClick={()=>setFilter(c.id)}>{c.icon} {c.label}</button>)}
        </div>
        {canWrite&&<button className="btn bp" onClick={()=>setShowForm(true)}>+ Новость</button>}
      </div>
      {showForm&&(
        <div className="card" style={{border:"1px solid rgba(99,102,241,.3)",marginBottom:16}}>
          <div className="ct">📢 Создать новость</div>
          <div style={{marginBottom:11}}>
            <label style={{fontSize:10.5,color:"#6B7280",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>Категория</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {NEWS_CATS.map(c=>(
                <button key={c.id} onClick={()=>setForm(f=>({...f,cat:c.id}))} style={{padding:"5px 11px",borderRadius:99,fontSize:11.5,fontWeight:500,cursor:"pointer",border:`1px solid ${form.cat===c.id?c.color+"66":"rgba(255,255,255,.08)"}`,background:form.cat===c.id?c.color+"18":"rgba(255,255,255,.03)",color:form.cat===c.id?c.color:"#6B7280",transition:"all .15s"}}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>
          <input className="inp" style={{marginBottom:8}} placeholder="Заголовок..." value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <textarea className="ta" placeholder="Текст новости..." value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))} style={{minHeight:90}}/>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:11}}>
            <button className="btn bo" onClick={()=>setShowForm(false)}>Отмена</button>
            <button className="btn bp" onClick={publish} disabled={!form.title.trim()||!form.body.trim()}>Опубликовать</button>
          </div>
        </div>
      )}
      {sorted.length===0&&<div className="card"><div className="emp"><div className="ei">📰</div><div style={{fontWeight:600,color:"#6B7280"}}>Нет новостей</div></div></div>}
      {sorted.map(n=>{
        const cat=catMap[n.cat]||{color:"#6B7280",icon:"📢",label:"Другое"};
        return (
          <div className={`news-card ${n.pinned?"pinned":""}`} key={n.id}>
            <div className="ncstrip" style={{background:cat.color}}/>
            <div style={{display:"flex",alignItems:"flex-start",gap:11,marginBottom:8}}>
              <div className="ncicon" style={{background:cat.color+"18",border:`1px solid ${cat.color}33`}}>{cat.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="nctitle">{n.title}</div>
                <div className="ncby">{n.author} · {fmtDate(n.date)} · <span style={{color:cat.color}}>{cat.label}</span>{n.pinned&&<span style={{color:"#FCD34D",marginLeft:5}}>📌 Закреплено</span>}</div>
              </div>
              {canWrite&&(
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  <button className={`pinbtn ${n.pinned?"on":""}`} onClick={()=>setNews(ns=>ns.map(x=>x.id===n.id?{...x,pinned:!x.pinned}:x))} title={n.pinned?"Открепить":"Закрепить"}>📌</button>
                  <button className="btn bd bi bsm" onClick={()=>setNews(ns=>ns.filter(x=>x.id!==n.id))}>✕</button>
                </div>
              )}
            </div>
            <div className="ncbody">{n.body}</div>
          </div>
        );
      })}
    </div>
  );
}


function HRModule({user,employees,setEmployees,setNews}) {
  const [view,setView]=useState("list");
  const [selEmp,setSelEmp]=useState(null);
  const [planTasks,setPlanTasks]=useState([]);
  const [ctitle,setCtitle]=useState("");
  const [cdesc,setCdesc]=useState("");
  const [cweek,setCweek]=useState(1);
  const [tab,setTab]=useState("plan");
  const [searchQ,setSearchQ]=useState("");
  const filtered=employees.filter(e=>(e.name+e.pos+e.dept).toLowerCase().includes(searchQ.toLowerCase()));

  const openAssign=emp=>{
    setSelEmp(emp);
    setPlanTasks(emp.adaptTasks.length?[...emp.adaptTasks]:ADAPT_TEMPLATES.map(t=>({...t,id:uid(),done:false})));
    setView("assign");
  };
  const openProfile=emp=>{setSelEmp(emp);setView("profile");};
  const addCustom=()=>{
    if(!ctitle.trim())return;
    setPlanTasks(ts=>[...ts,{id:uid(),week:cweek,title:ctitle.trim(),desc:cdesc.trim()||"Задача добавлена HR-менеджером",done:false}]);
    setCtitle("");setCdesc("");setCweek(1);
  };
  const saveAdapt=()=>{
    setEmployees(es=>es.map(e=>e.id===selEmp.id?{...e,adaptTasks:planTasks}:e));
    setNews(ns=>[{id:uid(),cat:"announce",title:`Назначен план адаптации: ${selEmp.name.split(" ")[1]||selEmp.name}`,body:`HR-менеджер ${user.name} назначил план адаптации (${planTasks.length} задач) сотруднику ${selEmp.name}, ${selEmp.pos}.`,author:user.name,date:new Date().toISOString().slice(0,10),pinned:false},...ns]);
    setView("list");
  };

  if(view==="assign"&&selEmp) return (
    <div>
      <button className="btn bo" style={{marginBottom:14}} onClick={()=>setView("list")}>← Назад</button>
      <div className="card" style={{border:"1px solid rgba(99,102,241,.3)",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div className="empava" style={{background:avatarGrad(selEmp.name),width:44,height:44,fontSize:14}}>{getInitials(selEmp.name)}</div>
          <div>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:16,fontWeight:800,color:"#fff"}}>{selEmp.name}</div>
            <div style={{fontSize:12,color:"#6B7280"}}>{selEmp.pos} · {selEmp.dept} · {daysSince(selEmp.joinDate)} дн.</div>
          </div>
        </div>
      </div>
      <div className="tabs">
        {[["plan","Текущий план"],["add","Добавить задачи"]].map(([id,lb])=>(
          <button key={id} className={`tb ${tab===id?"act":""}`} onClick={()=>setTab(id)}>{lb}</button>
        ))}
      </div>
      {tab==="plan"&&(
        <div className="card">
          <div className="ct">✅ Задачи плана ({planTasks.length})</div>
          {planTasks.length===0&&<div className="emp"><div className="ei">📋</div><div style={{color:"#4B5563",fontWeight:600}}>Задачи не добавлены</div></div>}
          {[...new Set(planTasks.map(t=>t.week))].sort((a,b)=>a-b).map(w=>(
            <div key={w} style={{marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:"#4B5563",textTransform:"uppercase",letterSpacing:1.2,marginBottom:4}}>Неделя {w}</div>
              {planTasks.filter(t=>t.week===w).map(t=>(
                <div className="taskrow" key={t.id}>
                  <span className="taskdrag">⠿</span>
                  <div className="taskbody"><div className="taskt">{t.title}</div><div className="taskd">{t.desc}</div></div>
                  <span className="wpill">нед.{t.week}</span>
                  <button className="btn bd bi bsm" onClick={()=>setPlanTasks(ts=>ts.filter(x=>x.id!==t.id))}>✕</button>
                </div>
              ))}
            </div>
          ))}
          <div className="div"/>
          <div style={{display:"flex",gap:9,justifyContent:"flex-end"}}>
            <button className="btn bo" onClick={()=>setPlanTasks(ADAPT_TEMPLATES.map(t=>({...t,id:uid(),done:false})))}>Сбросить</button>
            <button className="btn bp" onClick={saveAdapt}>💾 Назначить</button>
          </div>
        </div>
      )}
      {tab==="add"&&(
        <div className="card">
          <div className="ct">➕ Своя задача</div>
          <div style={{display:"grid",gap:8,marginBottom:14}}>
            <input className="inp" placeholder="Название задачи *" value={ctitle} onChange={e=>setCtitle(e.target.value)}/>
            <textarea className="ta" placeholder="Описание" value={cdesc} onChange={e=>setCdesc(e.target.value)} style={{minHeight:64}}/>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <label style={{fontSize:12,color:"#6B7280",whiteSpace:"nowrap"}}>Неделя:</label>
              <input type="number" min="1" max="12" className="inp" value={cweek} onChange={e=>setCweek(+e.target.value)} style={{width:65}}/>
              <button className="btn bg2" style={{flex:1}} onClick={addCustom} disabled={!ctitle.trim()}>+ В план</button>
            </div>
          </div>
          <div className="div"/>
          <div className="ct" style={{marginBottom:9}}>📋 Шаблоны</div>
          {ADAPT_TEMPLATES.map(t=>(
            <div key={t.id} className="taskrow">
              <div className="taskbody"><div className="taskt">{t.title}</div><div className="taskd">{t.desc}</div></div>
              <span className="wpill">нед.{t.week}</span>
              <button className={`btn bsm ${planTasks.find(x=>x.title===t.title)?"bg2":"bo"}`} onClick={()=>{if(!planTasks.find(x=>x.title===t.title))setPlanTasks(ts=>[...ts,{...t,id:uid(),done:false}]);}}>
                {planTasks.find(x=>x.title===t.title)?"✓":"+ В план"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if(view==="profile"&&selEmp) return (
    <div>
      <button className="btn bo" style={{marginBottom:14}} onClick={()=>setView("list")}>← Назад</button>
      <div className="card">
        <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:16}}>
          <div style={{width:54,height:54,borderRadius:"50%",background:avatarGrad(selEmp.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:"#fff"}}>{getInitials(selEmp.name)}</div>
          <div>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:17,fontWeight:800,color:"#fff"}}>{selEmp.name}</div>
            <div style={{fontSize:12.5,color:"#6B7280"}}>{selEmp.pos} · {selEmp.dept}</div>
            <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
              <span className="badge bb">📱 {selEmp.phone}</span>
              <span className="badge bgr">📅 {daysSince(selEmp.joinDate)} дней</span>
              {selEmp.adaptTasks.length>0?<span className="badge bg">✅ Адаптация назначена</span>:<span className="badge bo2">⏳ Без плана</span>}
            </div>
          </div>
        </div>
        <div className="div"/>
        <div className="ct">📋 Задачи адаптации</div>
        {selEmp.adaptTasks.length===0?
          <div style={{fontSize:12.5,color:"#4B5563",padding:"8px 0"}}>Адаптация не назначена</div>:
          selEmp.adaptTasks.map(t=>(
            <div className="ir" key={t.id} style={{gap:9}}>
              <div style={{width:17,height:17,borderRadius:"50%",border:`2px solid ${t.done?"#6366F1":"rgba(255,255,255,.12)"}`,background:t.done?"#6366F1":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",flexShrink:0}}>{t.done?"✓":""}</div>
              <div style={{flex:1,fontSize:12.5,color:t.done?"#4B5563":"#E5E7EB",textDecoration:t.done?"line-through":"none"}}>{t.title}</div>
              <span className="wpill">нед.{t.week}</span>
            </div>
          ))
        }
        <div style={{marginTop:14}}><button className="btn bp" onClick={()=>openAssign(selEmp)}>✏️ Редактировать план</button></div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        <input className="inp" style={{flex:1,minWidth:180}} placeholder="🔍 Поиск сотрудника..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
        <div style={{fontSize:12.5,color:"#6B7280",alignSelf:"center",flexShrink:0}}>{filtered.length} сотр.</div>
      </div>
      {filtered.length===0&&<div className="card"><div className="emp"><div className="ei">👥</div><div style={{fontWeight:600,color:"#6B7280"}}>Не найдено</div></div></div>}
      {filtered.map(e=>{
        const pct=e.adaptTasks.length?Math.round(e.adaptTasks.filter(t=>t.done).length/e.adaptTasks.length*100):null;
        return (
          <div className="emprow" key={e.id}>
            <div className="empava" style={{background:avatarGrad(e.name)}}>{getInitials(e.name)}</div>
            <div className="empinfo">
              <div className="empname">{e.name}</div>
              <div className="empmeta">{e.pos} · {e.dept} · {daysSince(e.joinDate)} дн.</div>
              {e.adaptTasks.length>0&&(
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                  <div className="pb" style={{flex:1,height:3}}><div className="pf" style={{width:`${pct}%`,background:"linear-gradient(90deg,#6366F1,#8B5CF6)"}}/></div>
                  <span style={{fontSize:10,color:"#6B7280"}}>{pct}%</span>
                </div>
              )}
            </div>
            {e.adaptTasks.length===0?<span className="badge bo2">Без плана</span>:<span className="badge bg">{pct}%</span>}
            <button className="btn bp bsm" onClick={()=>openAssign(e)}>📋</button>
            <button className="btn bo bsm" onClick={()=>openProfile(e)}>👁</button>
          </div>
        );
      })}
    </div>
  );
}

function AdminModule({employees,setEmployees,news,setNews}) {
  const [tab,setTab]=useState("emp");
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({name:"",pos:"",dept:"",phone:"",role:"employee"});
  const [fe,setFe]=useState({});
  const val=()=>{const e={};if(!form.name.trim())e.name="Введите ФИО";if(!form.pos.trim())e.pos="Введите должность";if(!form.dept)e.dept="Выберите отдел";if(!form.phone.trim())e.phone="Введите телефон";setFe(e);return!Object.keys(e).length;};
  const addUser=()=>{
    if(!val())return;
    const nu={id:uid(),role:form.role,name:form.name.trim(),pos:form.pos.trim(),dept:form.dept,phone:form.phone.trim(),joinDate:new Date().toISOString().slice(0,10),adaptTasks:[],adaptDone:false};
    if(form.role==="employee")setEmployees(es=>[...es,nu]);
    setNews(ns=>[{id:uid(),cat:"hire",title:`Добро пожаловать, ${form.name.split(" ")[1]||form.name}!`,body:`Новый ${form.role==="hr"?"HR-менеджер":"сотрудник"}: ${form.name}, ${form.pos}, ${form.dept}.`,author:"Система",date:new Date().toISOString().slice(0,10),pinned:false},...ns]);
    setForm({name:"",pos:"",dept:"",phone:"",role:"employee"});setShowAdd(false);
  };
  const allU=[...DEMO_ACCOUNTS,...employees];
  const stats=[{l:"Пользователей",v:allU.length,c:"#A5B4FC"},{l:"HR",v:allU.filter(u=>u.role==="hr").length,c:"#60A5FA"},{l:"Сотрудников",v:employees.length,c:"#34D399"},{l:"Без адаптации",v:employees.filter(e=>!e.adaptTasks.length).length,c:"#FCD34D"},{l:"Новостей",v:news.length,c:"#F472B6"},{l:"Администраторов",v:allU.filter(u=>u.role==="admin").length,c:"#F87171"}];
  const roleLabel={admin:"Админ",hr:"HR",employee:"Сотрудник"};
  const roleBadge={admin:"br",hr:"bb",employee:"bg"};
  const listMap={emp:employees,hr:DEMO_ACCOUNTS.filter(a=>a.role==="hr"),admin:DEMO_ACCOUNTS.filter(a=>a.role==="admin")};
  return (
    <div>
      <div className="g3" style={{marginBottom:16}}>{stats.map(s=><div key={s.l} className="sc" style={{cursor:"default"}}><div className="sv" style={{color:s.c}}>{s.v}</div><div className="sl">{s.l}</div></div>)}</div>
      <div className="tabs">
        {[["emp","Сотрудники"],["hr","HR"],["admin","Администраторы"],["news","Новости"]].map(([id,lb])=>(
          <button key={id} className={`tb ${tab===id?"act":""}`} onClick={()=>setTab(id)}>{lb}</button>
        ))}
      </div>
      {tab!=="news"&&(
        <div>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
            <button className="btn bp" onClick={()=>setShowAdd(true)}>+ Добавить</button>
          </div>
          {showAdd&&(
            <div className="card" style={{border:"1px solid rgba(99,102,241,.3)",marginBottom:14}}>
              <div className="ct">➕ Новый пользователь</div>
              <div className="g2" style={{gap:9,marginBottom:10}}>
                {[{k:"name",ph:"ФИО"},{k:"pos",ph:"Должность"},{k:"phone",ph:"Телефон"}].map(f=>(
                  <div key={f.k}>
                    <input className={`inp ${fe[f.k]?"":""}`} placeholder={f.ph} value={form[f.k]} onChange={e=>setForm(x=>({...x,[f.k]:e.target.value}))} style={{border:fe[f.k]?"1.5px solid #EF4444":undefined}}/>
                    {fe[f.k]&&<div style={{fontSize:10.5,color:"#F87171",marginTop:2}}>⚠ {fe[f.k]}</div>}
                  </div>
                ))}
                <div>
                  <select className="inp" value={form.dept} onChange={e=>setForm(x=>({...x,dept:e.target.value}))} style={{border:fe.dept?"1.5px solid #EF4444":undefined}}>
                    <option value="" disabled>Отдел</option>
                    {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                  {fe.dept&&<div style={{fontSize:10.5,color:"#F87171",marginTop:2}}>⚠ {fe.dept}</div>}
                </div>
              </div>
              <div style={{display:"flex",gap:7,marginBottom:12}}>
                {[["employee","👤","Сотрудник"],["hr","🧑‍💼","HR"],["admin","⚙️","Администратор"]].map(([r,ico,lb])=>(
                  <button key={r} onClick={()=>setForm(x=>({...x,role:r}))} style={{flex:1,padding:"8px 4px",borderRadius:8,border:`1.5px solid ${form.role===r?"rgba(99,102,241,.5)":"rgba(255,255,255,.08)"}`,background:form.role===r?"rgba(99,102,241,.15)":"rgba(255,255,255,.03)",cursor:"pointer",fontSize:11,fontWeight:600,color:form.role===r?"#A5B4FC":"#6B7280",transition:"all .15s"}}>
                    <div style={{fontSize:19,marginBottom:2}}>{ico}</div>{lb}
                  </button>
                ))}
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                <button className="btn bo" onClick={()=>setShowAdd(false)}>Отмена</button>
                <button className="btn bp" onClick={addUser}>Создать</button>
              </div>
            </div>
          )}
          {(listMap[tab]||[]).map(e=>(
            <div className="emprow" key={e.id}>
              <div className="empava" style={{background:avatarGrad(e.name)}}>{getInitials(e.name)}</div>
              <div className="empinfo">
                <div className="empname">{e.name}</div>
                <div className="empmeta">{e.pos} · {e.dept} · {e.phone}</div>
              </div>
              <span className={`badge ${roleBadge[e.role]||"bgr"}`}>{roleLabel[e.role]||e.role}</span>
              {e.role==="employee"&&<button className="btn bd bi bsm" onClick={()=>setEmployees(es=>es.filter(x=>x.id!==e.id))} title="Удалить">✕</button>}
            </div>
          ))}
        </div>
      )}
      {tab==="news"&&(
        <div>
          {news.map(n=>{
            const cat=NEWS_CATS.find(c=>c.id===n.cat)||{color:"#6B7280",icon:"📢",label:"Другое"};
            return (
              <div className="emprow" key={n.id}>
                <div style={{fontSize:20,width:38,height:38,background:cat.color+"18",border:`1px solid ${cat.color}33`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{cat.icon}</div>
                <div className="empinfo">
                  <div className="empname">{n.title}</div>
                  <div className="empmeta">{n.author} · {fmtDate(n.date)} · {cat.label}</div>
                </div>
                {n.pinned&&<span className="badge bo2">📌</span>}
                <button className="btn bd bi bsm" onClick={()=>setNews(ns=>ns.filter(x=>x.id!==n.id))}>✕</button>
              </div>
            );
          })}
          {news.length===0&&<div className="card"><div className="emp"><div className="ei">📰</div><div style={{color:"#4B5563",fontWeight:600}}>Нет новостей</div></div></div>}
        </div>
      )}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   REPORTS MODULE
══════════════════════════════════════════════════════════ */

function ReportsModule({user,employees}) {
  const [section,setSection]=useState("adapt");
  const [empFilter,setEmpFilter]=useState("all");
  const [deptFilter,setDeptFilter]=useState("all");

  const depts=[...new Set(employees.map(e=>e.dept))].sort();
  const empList=employees.filter(e=>{
    if(deptFilter!=="all"&&e.dept!==deptFilter)return false;
    return true;
  });

  /* ── mock data for employees without real data ── */
  const mockAnnual=(id)=>{
    const seed=id.charCodeAt(id.length-1)%5;
    return {
      res:3+seed%3, com:2+(seed+1)%4, val:3+(seed+2)%3, dev:4+(seed)%2,
      submitted: seed>1
    };
  };
  const mockDev=(id)=>{
    const seed=id.charCodeAt(id.length-1);
    const cats=["Коммуникация","Управление временем","Аналитика","Лидерство","Гибкость"];
    return cats.map((cat,i)=>({cat, score:2.5+(((seed+i)*7)%25)/10}));
  };
  const mockLearn=(id)=>{
    const seed=id.charCodeAt(id.length-1)%4;
    return {done:seed, total:LEARN_DATA.length};
  };
  const mockSocial=(id)=>{
    const seed=id.charCodeAt(id.length-1)%10;
    return {score: 3.0 + seed/5, submitted: seed>4};
  };

  /* ── stat helpers ── */
  const pct=(a,b)=>b?Math.round(a/b*100):0;
  const avg=(arr)=>arr.length?arr.reduce((s,v)=>s+v,0)/arr.length:0;
  const col=(v,lo=3,hi=4)=>v>=hi?"#22C55E":v>=lo?"#F59E0B":"#EF4444";
  const colPct=(v)=>v>=75?"#22C55E":v>=50?"#F59E0B":"#EF4444";

  const sections=[
    {id:"adapt",     label:"Адаптация",       icon:"🌱"},
    {id:"annual",    label:"Годовая оценка",   icon:"📊"},
    {id:"dev",       label:"Зоны развития",    icon:"🎯"},
    {id:"learning",  label:"Обучение",         icon:"📚"},
    {id:"social",    label:"Соц. стабильность",icon:"🤝"},
  ];

  /* ───────────────── STYLES ───────────────── */
  const S={
    wrap:{marginBottom:18},
    filtersRow:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16,alignItems:"center"},
    filterSel:{padding:"6px 11px",borderRadius:8,fontSize:12,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"inherit",cursor:"pointer",outline:"none"},
    summaryGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:16},
    sumCard:{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"14px 12px",textAlign:"center"},
    sumVal:{fontFamily:"Manrope,sans-serif",fontSize:26,fontWeight:800,lineHeight:1},
    sumLbl:{fontSize:10.5,color:"#6B7280",marginTop:4},
    tableWrap:{overflowX:"auto"},
    table:{width:"100%",borderCollapse:"collapse",fontSize:12.5},
    th:{padding:"9px 10px",textAlign:"left",fontSize:10.5,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:.6,borderBottom:"1px solid rgba(255,255,255,.07)",whiteSpace:"nowrap"},
    td:{padding:"10px 10px",borderBottom:"1px solid rgba(255,255,255,.05)",verticalAlign:"middle"},
    empCell:{display:"flex",alignItems:"center",gap:9},
    empAva:{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",flexShrink:0},
    empName:{fontSize:13,fontWeight:500,color:"inherit",display:"block"},
    empDept:{fontSize:10.5,color:"#6B7280"},
    bar:{display:"flex",alignItems:"center",gap:7},
    barWrap:{flex:1,background:"rgba(255,255,255,.07)",borderRadius:99,height:5,overflow:"hidden",minWidth:60},
    barFill:{height:"100%",borderRadius:99,transition:"width .6s"},
    barNum:{fontSize:11,fontWeight:600,minWidth:28,textAlign:"right"},
    badge:{display:"inline-flex",alignItems:"center",padding:"2px 8px",borderRadius:99,fontSize:10.5,fontWeight:600},
    sectionTabs:{display:"flex",gap:3,flexWrap:"wrap",marginBottom:18,background:"rgba(255,255,255,.04)",padding:4,borderRadius:10,border:"1px solid rgba(255,255,255,.06)"},
    secTab:{padding:"7px 12px",borderRadius:7,fontSize:12,fontWeight:500,cursor:"pointer",border:"none",background:"transparent",color:"#6B7280",transition:"all .15s",whiteSpace:"nowrap"},
    secTabAct:{background:"rgba(14,110,196,.25)",color:"#7BBFEF",fontWeight:600,border:"1px solid rgba(14,110,196,.3)"},
    sectionCard:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:18,marginBottom:14},
    secTitle:{fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:"inherit",marginBottom:14,display:"flex",alignItems:"center",gap:7},
    ratingDots:{display:"flex",gap:3},
    dot:{width:8,height:8,borderRadius:50},
  };

  /* ═══════════════ ADAPT SECTION ═══════════════ */
  const AdaptReport=()=>{
    const withPlan=empList.filter(e=>e.adaptTasks.length>0);
    const noPlan=empList.filter(e=>e.adaptTasks.length===0);
    const done=withPlan.filter(e=>e.adaptTasks.every(t=>t.done));
    const inProg=withPlan.filter(e=>e.adaptTasks.some(t=>t.done)&&!e.adaptTasks.every(t=>t.done));
    const notStarted=withPlan.filter(e=>!e.adaptTasks.some(t=>t.done));
    const avgPct=withPlan.length?Math.round(avg(withPlan.map(e=>pct(e.adaptTasks.filter(t=>t.done).length,e.adaptTasks.length)))):0;
    return (
      <div>
        <div style={S.summaryGrid}>
          {[{v:empList.length,l:"Всего",c:"#7BBFEF"},{v:withPlan.length,l:"С планом",c:"#22C55E"},{v:noPlan.length,l:"Без плана",c:"#F59E0B"},{v:done.length,l:"Завершили",c:"#22C55E"},{v:inProg.length,l:"В процессе",c:"#7BBFEF"},{v:avgPct+"%",l:"Средний прогресс",c:"#F59E0B"}].map(s=>(
            <div key={s.l} style={S.sumCard}><div style={{...S.sumVal,color:s.c}}>{s.v}</div><div style={S.sumLbl}>{s.l}</div></div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>📋 Прогресс адаптации по сотрудникам</div>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead>
                <tr>{["Сотрудник","Отдел","Статус","Прогресс","Дней в компании","Задач выполнено"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {empList.map(e=>{
                  const tasks=e.adaptTasks;
                  const doneTasks=tasks.filter(t=>t.done).length;
                  const p=pct(doneTasks,tasks.length);
                  let status,statusColor;
                  if(!tasks.length){status="Без плана";statusColor="rgba(245,158,11,.15)";}
                  else if(tasks.every(t=>t.done)){status="✓ Завершено";statusColor="rgba(34,197,94,.15)";}
                  else if(tasks.some(t=>t.done)){status="В процессе";statusColor="rgba(14,110,196,.15)";}
                  else{status="Не начато";statusColor="rgba(239,68,68,.15)";}
                  return (
                    <tr key={e.id}>
                      <td style={S.td}>
                        <div style={S.empCell}>
                          <div style={{...S.empAva,background:avatarGrad(e.name)}}>{getInitials(e.name)}</div>
                          <div><span style={S.empName}>{e.name}</span><span style={S.empDept}>{e.pos}</span></div>
                        </div>
                      </td>
                      <td style={S.td}><span style={{fontSize:12,color:"#9CA3AF"}}>{e.dept}</span></td>
                      <td style={S.td}><span style={{...S.badge,background:statusColor}}>{status}</span></td>
                      <td style={S.td}>
                        {tasks.length>0?(
                          <div style={S.bar}>
                            <div style={S.barWrap}><div style={{...S.barFill,width:p+"%",background:colPct(p)}}/></div>
                            <span style={{...S.barNum,color:colPct(p)}}>{p}%</span>
                          </div>
                        ):<span style={{color:"#6B7280",fontSize:11}}>—</span>}
                      </td>
                      <td style={{...S.td,textAlign:"center"}}><span style={{fontSize:13,fontWeight:600,color:"#7BBFEF"}}>{daysSince(e.joinDate)}</span></td>
                      <td style={{...S.td,textAlign:"center"}}><span style={{fontSize:13,fontWeight:600}}>{tasks.length?`${doneTasks}/${tasks.length}`:"—"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>📊 Сводка по отделам</div>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead><tr>{["Отдел","Сотрудников","С планом","Ср. прогресс","Завершили"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {depts.map(dept=>{
                  const de=empList.filter(e=>e.dept===dept);
                  const dp=de.filter(e=>e.adaptTasks.length>0);
                  const avgP=dp.length?Math.round(avg(dp.map(e=>pct(e.adaptTasks.filter(t=>t.done).length,e.adaptTasks.length)))):0;
                  const dDone=dp.filter(e=>e.adaptTasks.length&&e.adaptTasks.every(t=>t.done)).length;
                  return (
                    <tr key={dept}>
                      <td style={S.td}><span style={{fontWeight:500}}>{dept}</span></td>
                      <td style={{...S.td,textAlign:"center"}}>{de.length}</td>
                      <td style={{...S.td,textAlign:"center"}}>{dp.length}</td>
                      <td style={S.td}><div style={S.bar}><div style={S.barWrap}><div style={{...S.barFill,width:avgP+"%",background:colPct(avgP)}}/></div><span style={{...S.barNum,color:colPct(avgP)}}>{avgP}%</span></div></td>
                      <td style={{...S.td,textAlign:"center"}}><span style={{color:"#22C55E",fontWeight:600}}>{dDone}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════ ANNUAL SECTION ═══════════════ */
  const AnnualReport=()=>{
    const data=empList.map(e=>{const a=mockAnnual(e.id);const total=ANN_CATS.reduce((s,c)=>s+((a[c.id]||0)*c.w/5),0);return{...e,ann:a,total};});
    const submitted=data.filter(d=>d.ann.submitted);
    const avgTotal=submitted.length?Math.round(avg(submitted.map(d=>d.total))):0;
    const cats=ANN_CATS.map(cat=>{
      const vals=submitted.map(d=>d.ann[cat.id]||0);
      return{...cat,avg:vals.length?Math.round(avg(vals)*10)/10:0};
    });
    const desc={1:"Ниже",2:"Почти",3:"Соответствует",4:"Превышает",5:"Исключительно"};
    return (
      <div>
        <div style={S.summaryGrid}>
          {[{v:empList.length,l:"Всего",c:"#7BBFEF"},{v:submitted.length,l:"Сдали оценку",c:"#22C55E"},{v:empList.length-submitted.length,l:"Ожидают",c:"#F59E0B"},{v:avgTotal,l:"Ср. балл / 100",c:"#F59E0B"},{v:pct(submitted.length,empList.length)+"%",l:"Охват",c:"#22C55E"}].map(s=>(
            <div key={s.l} style={S.sumCard}><div style={{...S.sumVal,color:s.c}}>{s.v}</div><div style={S.sumLbl}>{s.l}</div></div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>📈 Средние оценки по критериям</div>
          {cats.map(cat=>(
            <div key={cat.id} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,marginBottom:5}}>
                <span style={{fontWeight:500}}>{cat.label}<span style={{fontSize:10,color:"#6B7280",marginLeft:6}}>вес {cat.w}%</span></span>
                <span style={{fontWeight:700,color:col(cat.avg,3,4)}}>{cat.avg}/5 — {desc[Math.round(cat.avg)]||"—"}</span>
              </div>
              <div style={S.barWrap}><div style={{...S.barFill,width:cat.avg*20+"%",background:col(cat.avg,3,4)}}/></div>
            </div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>👥 Индивидуальные оценки</div>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead><tr>{["Сотрудник","Результаты","Компетенции","Ценности","Развитие","Итог","Статус"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {data.map(d=>(
                  <tr key={d.id}>
                    <td style={S.td}><div style={S.empCell}><div style={{...S.empAva,background:avatarGrad(d.name)}}>{getInitials(d.name)}</div><div><span style={S.empName}>{d.name}</span><span style={S.empDept}>{d.dept}</span></div></div></td>
                    {ANN_CATS.map(cat=>(
                      <td key={cat.id} style={{...S.td,textAlign:"center"}}>
                        {d.ann.submitted?(
                          <div>
                            <div style={{display:"flex",justifyContent:"center",gap:2}}>
                              {[1,2,3,4,5].map(s=><span key={s} style={{fontSize:10,opacity:s<=(d.ann[cat.id]||0)?1:.15}}>⭐</span>)}
                            </div>
                            <div style={{fontSize:10,color:col(d.ann[cat.id]||0,3,4),marginTop:1}}>{d.ann[cat.id]||0}/5</div>
                          </div>
                        ):<span style={{color:"#6B7280",fontSize:11}}>—</span>}
                      </td>
                    ))}
                    <td style={{...S.td,textAlign:"center"}}>
                      {d.ann.submitted?<span style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:800,color:d.total>=75?"#22C55E":d.total>=50?"#F59E0B":"#EF4444"}}>{Math.round(d.total)}</span>:<span style={{color:"#6B7280"}}>—</span>}
                    </td>
                    <td style={S.td}><span style={{...S.badge,background:d.ann.submitted?"rgba(34,197,94,.15)":"rgba(245,158,11,.15)"}}>{d.ann.submitted?"✓ Сдано":"Ожидание"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════ DEV SECTION ═══════════════ */
  const DevReport=()=>{
    const data=empList.map(e=>{const scores=mockDev(e.id);const avg2=scores.reduce((s,c)=>s+c.score,0)/scores.length;return{...e,scores,avg:Math.round(avg2*10)/10};});
    const cats=["Коммуникация","Управление временем","Аналитика","Лидерство","Гибкость"];
    const catAvgs=cats.map(cat=>{const vals=data.map(d=>d.scores.find(s=>s.cat===cat)?.score||0);return{cat,avg:Math.round(avg(vals)*10)/10};});
    const strongest=catAvgs.reduce((a,b)=>b.avg>a.avg?b:a);
    const weakest=catAvgs.reduce((a,b)=>b.avg<a.avg?b:a);
    return (
      <div>
        <div style={S.summaryGrid}>
          {[{v:empList.length,l:"Прошли тест",c:"#22C55E"},{v:Math.round(avg(data.map(d=>d.avg))*10)/10+"/5",l:"Средний балл",c:"#7BBFEF"},{v:strongest.cat,l:"Сильная сторона",c:"#22C55E"},{v:weakest.cat,l:"Зона роста",c:"#F59E0B"}].map((s,i)=>(
            <div key={i} style={S.sumCard}><div style={{...S.sumVal,fontSize:i>=2?15:26,color:s.c}}>{s.v}</div><div style={S.sumLbl}>{s.l}</div></div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>📊 Средние баллы по компетенциям</div>
          {catAvgs.map(c=>(
            <div key={c.cat} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,marginBottom:5}}>
                <span style={{fontWeight:500}}>{c.cat}</span>
                <span style={{fontWeight:700,color:col(c.avg,3,4)}}>{c.avg}/5</span>
              </div>
              <div style={S.barWrap}><div style={{...S.barFill,width:c.avg*20+"%",background:col(c.avg,3,4)}}/></div>
            </div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>👥 Профиль каждого сотрудника</div>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead><tr>{["Сотрудник","Ком.","Врем.","Анал.","Лид.","Гиб.","Итог","Зона роста"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {data.map(d=>{
                  const worst=d.scores.reduce((a,b)=>b.score<a.score?b:a);
                  return (
                    <tr key={d.id}>
                      <td style={S.td}><div style={S.empCell}><div style={{...S.empAva,background:avatarGrad(d.name)}}>{getInitials(d.name)}</div><div><span style={S.empName}>{d.name}</span><span style={S.empDept}>{d.dept}</span></div></div></td>
                      {d.scores.map(s=>(
                        <td key={s.cat} style={{...S.td,textAlign:"center"}}>
                          <span style={{fontSize:13,fontWeight:600,color:col(s.score,3,4)}}>{s.score}</span>
                        </td>
                      ))}
                      <td style={{...S.td,textAlign:"center"}}><span style={{fontSize:14,fontWeight:700,color:col(d.avg,3,4)}}>{d.avg}</span></td>
                      <td style={S.td}><span style={{...S.badge,background:"rgba(239,68,68,.12)",color:"#F87171"}}>{worst.cat}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════ LEARNING SECTION ═══════════════ */
  const LearningReport=()=>{
    const data=empList.map(e=>{const l=mockLearn(e.id);return{...e,learn:l,pct:pct(l.done,l.total)};});
    const avgDone=Math.round(avg(data.map(d=>d.learn.done)));
    const full=data.filter(d=>d.learn.done===d.learn.total);
    const none=data.filter(d=>d.learn.done===0);
    const moduleSummary=LEARN_DATA.map((mod,i)=>{
      const completed=data.filter(d=>d.learn.done>i).length;
      return{...mod,completed,pct:pct(completed,data.length)};
    });
    return (
      <div>
        <div style={S.summaryGrid}>
          {[{v:empList.length,l:"Всего",c:"#7BBFEF"},{v:full.length,l:"Прошли всё",c:"#22C55E"},{v:none.length,l:"Не начинали",c:"#EF4444"},{v:avgDone+"/"+LEARN_DATA.length,l:"Ср. модулей",c:"#F59E0B"},{v:pct(full.length,empList.length)+"%",l:"Охват (100%)",c:"#22C55E"}].map(s=>(
            <div key={s.l} style={S.sumCard}><div style={{...S.sumVal,color:s.c}}>{s.v}</div><div style={S.sumLbl}>{s.l}</div></div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>📚 Прохождение модулей</div>
          {moduleSummary.map(mod=>(
            <div key={mod.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <div style={{fontSize:20,width:36,height:36,background:"rgba(255,255,255,.06)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{mod.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,marginBottom:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{mod.title}</div>
                <div style={{...S.bar}}>
                  <div style={S.barWrap}><div style={{...S.barFill,width:mod.pct+"%",background:colPct(mod.pct)}}/></div>
                  <span style={{...S.barNum,color:colPct(mod.pct)}}>{mod.pct}%</span>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:12,fontWeight:600,color:"#22C55E"}}>{mod.completed}/{data.length}</div>
                <div style={{fontSize:10,color:"#6B7280"}}>{mod.month}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>👥 Обучение по сотрудникам</div>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead><tr>{["Сотрудник","Отдел","Пройдено","Прогресс","Статус"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {data.map(d=>(
                  <tr key={d.id}>
                    <td style={S.td}><div style={S.empCell}><div style={{...S.empAva,background:avatarGrad(d.name)}}>{getInitials(d.name)}</div><div><span style={S.empName}>{d.name}</span><span style={S.empDept}>{d.pos}</span></div></div></td>
                    <td style={{...S.td}}><span style={{fontSize:12,color:"#9CA3AF"}}>{d.dept}</span></td>
                    <td style={{...S.td,textAlign:"center"}}><span style={{fontWeight:600,color:"#7BBFEF"}}>{d.learn.done}/{d.learn.total}</span></td>
                    <td style={S.td}><div style={S.bar}><div style={S.barWrap}><div style={{...S.barFill,width:d.pct+"%",background:colPct(d.pct)}}/></div><span style={{...S.barNum,color:colPct(d.pct)}}>{d.pct}%</span></div></td>
                    <td style={S.td}><span style={{...S.badge,background:d.pct===100?"rgba(34,197,94,.15)":d.pct>0?"rgba(14,110,196,.15)":"rgba(239,68,68,.12)",color:d.pct===100?"#22C55E":d.pct>0?"#7BBFEF":"#F87171"}}>{d.pct===100?"✓ Завершено":d.pct>0?"В процессе":"Не начато"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════ SOCIAL SECTION ═══════════════ */
  const SocialReport=()=>{
    const data=empList.map(e=>{const s=mockSocial(e.id);return{...e,soc:s};});
    const submitted=data.filter(d=>d.soc.submitted);
    const avgScore=submitted.length?Math.round(avg(submitted.map(d=>d.soc.score))*10)/10:0;
    const high=submitted.filter(d=>d.soc.score>=4).length;
    const med=submitted.filter(d=>d.soc.score>=3&&d.soc.score<4).length;
    const low=submitted.filter(d=>d.soc.score<3).length;
    const blocksData=[
      {l:"Командная включённость",ids:[1,2]},
      {l:"Признание и рост",ids:[3,4]},
      {l:"Баланс и нагрузка",ids:[5,6]},
      {l:"Псих. безопасность",ids:[7,8]},
    ].map((b,i)=>{
      const mockBlockScore=avgScore-0.3+(i*0.15)%0.8;
      return{...b,score:Math.round(mockBlockScore*10)/10};
    });
    return (
      <div>
        <div style={S.summaryGrid}>
          {[{v:empList.length,l:"Всего",c:"#7BBFEF"},{v:submitted.length,l:"Ответили",c:"#22C55E"},{v:pct(submitted.length,empList.length)+"%",l:"Охват",c:"#22C55E"},{v:avgScore+"/5",l:"Ср. индекс",c:col(avgScore,3,4)},{v:high,l:"Высокая стаб.",c:"#22C55E"},{v:low,l:"Тревожных",c:"#EF4444"}].map(s=>(
            <div key={s.l} style={S.sumCard}><div style={{...S.sumVal,color:s.c,fontSize:s.l==="Высокая стаб."||s.l==="Тревожных"?22:26}}>{s.v}</div><div style={S.sumLbl}>{s.l}</div></div>
          ))}
        </div>
        <div style={{display:"flex",gap:12,marginBottom:14,flexWrap:"wrap"}}>
          <div style={{...S.sectionCard,flex:1,minWidth:200,marginBottom:0}}>
            <div style={S.secTitle}>📊 Распределение</div>
            {[{l:"Высокая (≥4)",v:high,c:"#22C55E"},{l:"Средняя (3–4)",v:med,c:"#F59E0B"},{l:"Низкая (<3)",v:low,c:"#EF4444"}].map(s=>(
              <div key={s.l} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:s.c,fontWeight:500}}>{s.l}</span>
                  <span style={{fontWeight:600,color:s.c}}>{s.v} чел.</span>
                </div>
                <div style={S.barWrap}><div style={{...S.barFill,width:pct(s.v,submitted.length||1)+"%",background:s.c}}/></div>
              </div>
            ))}
          </div>
          <div style={{...S.sectionCard,flex:1,minWidth:200,marginBottom:0}}>
            <div style={S.secTitle}>🔍 По блокам</div>
            {blocksData.map(b=>(
              <div key={b.l} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{fontWeight:500,fontSize:11.5}}>{b.l}</span>
                  <span style={{fontWeight:600,color:col(b.score,3,4)}}>{b.score}/5</span>
                </div>
                <div style={S.barWrap}><div style={{...S.barFill,width:b.score*20+"%",background:col(b.score,3,4)}}/></div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.sectionCard}>
          <div style={S.secTitle}>👥 Индивидуальные результаты</div>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead><tr>{["Сотрудник","Отдел","Индекс","Балл / 100","Статус","Уровень"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {data.map(d=>(
                  <tr key={d.id}>
                    <td style={S.td}><div style={S.empCell}><div style={{...S.empAva,background:avatarGrad(d.name)}}>{getInitials(d.name)}</div><div><span style={S.empName}>{d.name}</span><span style={S.empDept}>{d.dept}</span></div></div></td>
                    <td style={S.td}><span style={{fontSize:12,color:"#9CA3AF"}}>{d.dept}</span></td>
                    <td style={{...S.td,textAlign:"center"}}>{d.soc.submitted?<span style={{fontSize:14,fontWeight:700,color:col(d.soc.score,3,4)}}>{d.soc.score}/5</span>:<span style={{color:"#6B7280"}}>—</span>}</td>
                    <td style={{...S.td,textAlign:"center"}}>{d.soc.submitted?<span style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:800,color:col(d.soc.score,3,4)}}>{Math.round(d.soc.score*20)}</span>:<span style={{color:"#6B7280"}}>—</span>}</td>
                    <td style={S.td}><span style={{...S.badge,background:d.soc.submitted?"rgba(34,197,94,.15)":"rgba(245,158,11,.15)"}}>{d.soc.submitted?"✓ Пройдено":"Не заполнено"}</span></td>
                    <td style={S.td}>{d.soc.submitted?<span style={{...S.badge,background:d.soc.score>=4?"rgba(34,197,94,.12)":d.soc.score>=3?"rgba(245,158,11,.12)":"rgba(239,68,68,.12)",color:col(d.soc.score,3,4)}}>{d.soc.score>=4?"Высокая":d.soc.score>=3?"Средняя":"Требует внимания"}</span>:<span style={{color:"#6B7280",fontSize:11}}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Filters */}
      <div style={S.filtersRow}>
        <select style={S.filterSel} value={deptFilter} onChange={e=>setDeptFilter(e.target.value)}>
          <option value="all">Все отделы</option>
          {depts.map(d=><option key={d} value={d}>{d}</option>)}
        </select>
        <span style={{fontSize:12,color:"#6B7280",marginLeft:4}}>{empList.length} сотрудник(ов)</span>
      </div>

      {/* Section tabs */}
      <div style={S.sectionTabs}>
        {sections.map(s=>(
          <button key={s.id} style={{...S.secTab,...(section===s.id?S.secTabAct:{})}} onClick={()=>setSection(s.id)}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {section==="adapt"    && <AdaptReport/>}
      {section==="annual"   && <AnnualReport/>}
      {section==="dev"      && <DevReport/>}
      {section==="learning" && <LearningReport/>}
      {section==="social"   && <SocialReport/>}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   KNOWLEDGE BASE DATA
══════════════════════════════════════════════════════════ */

const KB_SECTIONS = [
  {id:"company",  label:"О компании",          icon:"🏢", color:"#7BBFEF"},
  {id:"work",     label:"Рабочие процессы",     icon:"⚙️", color:"#34D399"},
  {id:"rules",    label:"Правила и этика",      icon:"📋", color:"#F59E0B"},
  {id:"hr",       label:"HR-процедуры",         icon:"🧑‍💼", color:"#F472B6"},
  {id:"safety",   label:"Безопасность",         icon:"🔒", color:"#A78BFA"},
];

const KB_ARTICLES = [
  /* ── О компании ── */
  {id:"kb1", section:"company", title:"История и миссия Inkai",
   type:"text",
   content:"Inkai — казахстанская горнодобывающая компания, основанная в 1996 году. Мы являемся одним из крупнейших мировых производителей природного урана.\n\n**Наша миссия** — обеспечение мировой энергетики безопасным и устойчивым топливом.\n\n**Ключевые ценности:**\n• Безопасность — приоритет №1 во всём, что мы делаем\n• Ответственность — перед людьми, обществом и природой\n• Развитие — постоянное совершенствование процессов и людей\n• Честность — открытость и прозрачность в работе"},

  {id:"kb2", section:"company", title:"Структура компании",
   type:"text",
   content:"Inkai имеет трёхуровневую организационную структуру:\n\n**Уровень 1 — Руководство:**\nГенеральный директор, Совет директоров, Финансовый директор\n\n**Уровень 2 — Функциональные блоки:**\n• Производственный блок\n• Финансы и экономика\n• HR и организационное развитие\n• Технологии и ИТ\n• Юридический и комплаенс\n\n**Уровень 3 — Отделы:**\nКаждый функциональный блок делится на отделы. Ваш непосредственный руководитель — глава вашего отдела."},

  {id:"kb3", section:"company", title:"Офис и инфраструктура",
   type:"photo",
   photos:[
     {url:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", caption:"Главный офис"},
     {url:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", caption:"Переговорные комнаты"},
     {url:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80", caption:"Зона отдыха"},
     {url:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80", caption:"Столовая"},
   ],
   content:"Наш офис расположен в центре Алматы. На территории работают:\n• Столовая (завтрак 8:00–9:30, обед 12:00–14:00)\n• Комнаты для переговоров (бронирование через Outlook)\n• Зоны отдыха на каждом этаже\n• Парковка (пропуск оформляется через АХО)"},

  {id:"kb4", section:"company", title:"Проверьте знания о компании",
   type:"quiz",
   questions:[
     {id:"q1", text:"В каком году основана компания Inkai?",
      options:["1990","1996","2001","2005"], answer:1},
     {id:"q2", text:"Какой приоритет №1 в ценностях компании?",
      options:["Прибыль","Развитие","Безопасность","Инновации"], answer:2},
     {id:"q3", text:"Сколько уровней в организационной структуре?",
      options:["2","3","4","5"], answer:1},
   ]},

  /* ── Рабочие процессы ── */
  {id:"kb5", section:"work", title:"Рабочий день и график",
   type:"text",
   content:"**Стандартный рабочий день:**\n08:30 — 17:30 (понедельник–пятница)\nПерерыв на обед: 12:00–13:00\n\n**Гибкий график:**\nВозможен сдвиг на ±1 час по согласованию с руководителем\n\n**Удалённая работа:**\nМаксимум 3 дня в неделю из дома (с 1 июля 2026 по новой политике). Обязательное присутствие по вторникам и четвергам.\n\n**Отработка часов:**\nУчёт рабочего времени ведётся в системе 1С. Опоздания более 15 минут фиксируются HR."},

  {id:"kb6", section:"work", title:"Инструменты и системы",
   type:"text",
   content:"**Обязательные инструменты:**\n• **Корпоративная почта** — Outlook (login@inkai.kz)\n• **Мессенджер** — Microsoft Teams (для звонков и чатов)\n• **Задачи и проекты** — Jira / Confluence\n• **Документооборот** — 1С:Документооборот\n• **HR-система** — данный портал (Inkai HR Portal)\n\n**Доступы:**\nВсе доступы настраивает ИТ-отдел в течение первых 3 рабочих дней. Если что-то не работает — обращайтесь через систему обращений или напрямую в helpdesk@inkai.kz\n\n**Пароли:**\nМинимум 8 символов, смена каждые 90 дней. Никогда не передавайте пароль коллегам."},

  {id:"kb7", section:"work", title:"Совещания и коммуникации",
   type:"text",
   content:"**Правила совещаний:**\n• Приходить вовремя — встречи начинаются ровно в назначенное время\n• Готовиться заранее — читать повестку до встречи\n• Краткость — каждый пункт имеет тайм-слот\n• Фиксировать итоги — ответственный делает summary в Teams\n\n**Каналы коммуникации:**\n\n| Тип | Канал |\n|-----|-------|\n| Срочные вопросы | Звонок в Teams |\n| Рабочие задачи | Jira |\n| Общение с командой | Teams-чат отдела |\n| Официальные письма | Outlook |\n| Обращения в HR | Данный портал |\n\n**Ответы на письма:**\nСтандарт — в течение 24 часов в рабочие дни."},

  {id:"kb8", section:"work", title:"Проверьте знания о рабочих процессах",
   type:"quiz",
   questions:[
     {id:"q1", text:"Сколько дней в неделю максимум можно работать из дома?",
      options:["1","2","3","4"], answer:2},
     {id:"q2", text:"Какой мессенджер используется для корпоративного общения?",
      options:["WhatsApp","Telegram","Microsoft Teams","Slack"], answer:2},
     {id:"q3", text:"В течение скольких часов нужно отвечать на рабочие письма?",
      options:["4","12","24","48"], answer:2},
   ]},

  /* ── Правила и этика ── */
  {id:"kb9", section:"rules", title:"Кодекс деловой этики",
   type:"text",
   content:"Кодекс деловой этики Inkai — основа наших взаимоотношений внутри компании и с внешними партнёрами.\n\n**Основные принципы:**\n\n**1. Уважение**\nМы уважаем каждого сотрудника вне зависимости от должности, пола, национальности и возраста. Дискриминация в любой форме недопустима.\n\n**2. Конфиденциальность**\nНе разглашать коммерческую тайну, персональные данные сотрудников и клиентов. Подписанный вами НДА действует и после увольнения.\n\n**3. Конфликт интересов**\nНеобходимо сообщать руководителю и HR, если у вас есть личная заинтересованность в деловом решении компании.\n\n**4. Подарки и взятки**\nПолучение или предложение подарков стоимостью более 5 000 тенге от деловых партнёров запрещено.\n\n**5. Использование ресурсов**\nКорпоративные оборудование и время используются только для рабочих целей."},

  {id:"kb10", section:"rules", title:"Дресс-код и поведение в офисе",
   type:"text",
   content:"**Дресс-код:**\nДеловой стиль в дни встреч с клиентами и партнёрами. В остальные дни — smart casual.\n\nЗапрещено: спортивная одежда, открытые майки, пляжная обувь.\n\n**Правила в офисе:**\n• Чистота на рабочем месте — стол должен быть чистым в конце дня\n• Переговорные комнаты — убирать после себя, удалять встречи из календаря при отмене\n• Кухня — мыть посуду после использования\n• Телефонные разговоры — не говорить по личным делам громко в open space\n• Парковка — не занимать места для гостей\n\n**Курение:**\nТолько в специально отведённых зонах вне здания."},

  {id:"kb11", section:"rules", title:"Документ: Кодекс этики (полная версия)",
   type:"doc",
   docTitle:"Кодекс деловой этики Inkai v2.3",
   docDesc:"Полный текст кодекса, включая приложения и примеры ситуаций",
   docSize:"2.4 МБ",
   docIcon:"📄",
   content:"Документ содержит полный текст Кодекса деловой этики, утверждённого советом директоров 15 января 2026 года. Обязателен к прочтению для всех сотрудников."},

  /* ── HR-процедуры ── */
  {id:"kb12", section:"hr", title:"Оформление отпуска",
   type:"text",
   content:"**Ежегодный оплачиваемый отпуск:**\nДоступен после 6 месяцев работы. Продолжительность — 24 рабочих дня.\n\n**Порядок оформления:**\n1. Обсудите даты с руководителем (минимум за 2 недели)\n2. Создайте заявление в 1С:Документооборот\n3. Получите подпись руководителя\n4. HR согласует и внесёт в кадровую систему\n5. Вы получите уведомление на почту\n\n**Дополнительные отпуска:**\n• По рождению ребёнка — 3 дня\n• По бракосочетанию — 3 дня\n• По смерти близкого родственника — 3 дня\n\n**Отпуск авансом:**\nВозможен по согласованию с HR и руководителем."},

  {id:"kb13", section:"hr", title:"Больничный и нетрудоспособность",
   type:"text",
   content:"**При заболевании:**\n1. Уведомите руководителя до 9:00 в день болезни (SMS или Teams)\n2. Обратитесь в поликлинику и получите электронный больничный лист\n3. По выходу — предоставьте лист нетрудоспособности в HR\n\n**Оплата:**\n• До 5 дней — 80% от среднедневного заработка\n• 6–10 дней — 100%\n• Свыше 10 дней — по законодательству РК\n\n**Удалённая работа при лёгком недомогании:**\nПо согласованию с руководителем можно работать из дома без оформления больничного.\n\n**Важно:** Электронные листы нетрудоспособности передаются в HR автоматически через ЭЦСП."},

  {id:"kb14", section:"hr", title:"Компенсации и льготы",
   type:"text",
   content:"**Компенсационный пакет:**\n\n💰 **Заработная плата:**\nВыплачивается 2 раза в месяц: аванс 20-го числа (40%), основная часть 5-го числа (60%)\n\n🏥 **Медицинское страхование:**\nДМС покрывает амбулаторное и стационарное лечение. Полис выдаётся в HR на 1-й неделе работы.\n\n🍽️ **Питание:**\nСубсидированная столовая — скидка 50% для сотрудников.\n\n📚 **Обучение:**\nКомпания оплачивает профессиональное обучение, связанное с должностными обязанностями.\n\n🚌 **Корпоративный транспорт:**\nМаршруты из ключевых точек города. Расписание у HR.\n\n🏋️ **Спорт:**\nКорпоративный абонемент в фитнес-клуб (50% оплачивает компания)."},

  {id:"kb15", section:"hr", title:"Проверьте знания HR-процедур",
   type:"quiz",
   questions:[
     {id:"q1", text:"Через сколько месяцев работы доступен ежегодный отпуск?",
      options:["3","6","9","12"], answer:1},
     {id:"q2", text:"Сколько дней ежегодного отпуска положено сотруднику?",
      options:["18","21","24","28"], answer:2},
     {id:"q3", text:"До какого времени нужно уведомить руководителя при болезни?",
      options:["До 8:00","До 9:00","До 10:00","До 12:00"], answer:1},
   ]},

  /* ── Безопасность ── */
  {id:"kb16", section:"safety", title:"Информационная безопасность",
   type:"text",
   content:"**Базовые правила ИБ:**\n\n🔐 **Пароли:**\n• Минимум 8 символов (буквы + цифры + спецсимволы)\n• Уникальный пароль для каждой системы\n• Смена каждые 90 дней\n• Никому не сообщать, включая ИТ-поддержку\n\n🖥️ **Рабочее место:**\n• Блокировать экран при уходе (Win+L)\n• Не оставлять документы на принтере\n• Чистый стол — документы в ящик или шредер\n\n📧 **Электронная почта:**\n• Не открывать вложения от неизвестных отправителей\n• Не переходить по подозрительным ссылкам\n• Подозрительные письма — forward в security@inkai.kz\n\n☁️ **Данные:**\n• Рабочие файлы только на корпоративных дисках (SharePoint)\n• Личные USB-носители — только с разрешения ИТ\n• Запрет на личные облачные хранилища для рабочих документов"},

  {id:"kb17", section:"safety", title:"Охрана труда и пожарная безопасность",
   type:"text",
   content:"**При пожаре:**\n1. Нажмите ручной пожарный извещатель\n2. Сообщите о пожаре по телефону 101\n3. Немедленно покиньте здание через ближайший выход\n4. Не пользуйтесь лифтом\n5. Соберитесь на точке сбора — парковка у главного входа\n\n**Аптечка:**\nНаходится у администратора каждого этажа.\n\n**Ответственные за безопасность:**\nИнженер по охране труда — Сейтов Нурлан Мухтарович\nТелефон: +7 (727) 000-00-99\n\n**Инструктаж:**\nОбязательный вводный инструктаж проводится HR в 1-й день работы. Повторный — раз в год."},

  {id:"kb18", section:"safety", title:"Фотографии: план эвакуации",
   type:"photo",
   photos:[
     {url:"https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&q=80", caption:"Пути эвакуации"},
     {url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", caption:"Точка сбора"},
   ],
   content:"Планы эвакуации размещены у лифтов и лестничных клеток на каждом этаже. Ознакомьтесь с ближайшим к вам выходом."},

  {id:"kb19", section:"safety", title:"Проверьте знания по безопасности",
   type:"quiz",
   questions:[
     {id:"q1", text:"Что нужно нажать при обнаружении пожара?",
      options:["Кнопку вызова охраны","Ручной пожарный извещатель","Тревожную кнопку у директора","Кнопку аварийной остановки лифта"], answer:1},
     {id:"q2", text:"Где находится точка сбора при эвакуации?",
      options:["Внутри здания у лифта","В подвале","На парковке у главного входа","На крыше"], answer:2},
     {id:"q3", text:"Как часто нужно менять пароль от корпоративных систем?",
      options:["Раз в 30 дней","Раз в 60 дней","Раз в 90 дней","Раз в год"], answer:2},
   ]},
];

/* ══════════════════════════════════════════════════════════
   ADAPT MODULE  — план + база знаний
══════════════════════════════════════════════════════════ */

function AdaptModule({user,employees,setEmployees}) {
  const emp    = employees.find(e=>e.id===user.id)||{...user,adaptTasks:[]};
  const tasks  = emp.adaptTasks||[];
  const toggle = id=>setEmployees(es=>es.map(e=>e.id===user.id?{...e,adaptTasks:e.adaptTasks.map(t=>t.id===id?{...t,done:!t.done}:t)}:e));
  const done   = tasks.filter(t=>t.done).length;
  const pct    = tasks.length?Math.round(done/tasks.length*100):0;
  const byW    = tasks.reduce((a,t)=>{if(!a[t.week])a[t.week]=[];a[t.week].push(t);return a},{});
  const firstName = user.name.split(" ")[1]||user.name.split(" ")[0];

  const [mainTab,setMainTab] = useState("plan");   // "plan" | "kb"
  const [kbSec,setKbSec]     = useState("company");
  const [openArt,setOpenArt] = useState(null);     // article id
  const [lightbox,setLightbox]= useState(null);
  const [quizAnswers,setQuizAnswers] = useState({}); // {articleId: {qId: idx}}
  const [quizDone,setQuizDone]       = useState({}); // {articleId: bool}

  const sectionArticles = KB_ARTICLES.filter(a=>a.section===kbSec);
  const article         = KB_ARTICLES.find(a=>a.id===openArt);

  /* ── quiz helpers ── */
  const answerQ=(artId,qId,idx)=>{
    if(quizDone[artId]) return;
    setQuizAnswers(prev=>({...prev,[artId]:{...(prev[artId]||{}),[qId]:idx}}));
  };
  const submitQuiz=(art)=>{
    setQuizDone(prev=>({...prev,[art.id]:true}));
  };
  const quizScore=(art)=>{
    const ans=quizAnswers[art.id]||{};
    return art.questions.filter(q=>ans[q.id]===q.answer).length;
  };

  /* ── type icon ── */
  const typeIcon={text:"📄",doc:"📎",photo:"🖼️",quiz:"✅"};
  const typeLabel={text:"Статья",doc:"Документ",photo:"Фото",quiz:"Тест"};

  /* ─────────── ARTICLE READER ─────────── */
  if(openArt&&article) return (
    <div>
      {lightbox&&(
        <div onClick={()=>setLightbox(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20,cursor:"zoom-out"}}>
          <img src={lightbox} alt="" style={{maxWidth:"100%",maxHeight:"90vh",borderRadius:10,objectFit:"contain"}}/>
          <button onClick={()=>setLightbox(null)} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,.12)",border:"none",color:"#fff",width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
      )}
      <button className="btn bo" style={{marginBottom:14}} onClick={()=>setOpenArt(null)}>← Назад</button>

      {/* Article header */}
      <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:20,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:22}}>{typeIcon[article.type]}</span>
          <div>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:16,fontWeight:800}}>{article.title}</div>
            <div style={{fontSize:11,color:"#6B7280",marginTop:2}}>
              {KB_SECTIONS.find(s=>s.id===article.section)?.label} · {typeLabel[article.type]}
            </div>
          </div>
        </div>

        {/* TEXT */}
        {article.type==="text"&&(
          <div style={{fontSize:13.5,lineHeight:1.85,color:"inherit"}}>
            {article.content.split("\n").map((line,i)=>{
              if(!line.trim()) return <div key={i} style={{height:8}}/>;
              if(line.startsWith("**")&&line.endsWith("**")) return <div key={i} style={{fontWeight:700,fontSize:14,marginTop:12,marginBottom:4,color:"inherit"}}>{line.slice(2,-2)}</div>;
              if(line.startsWith("• ")) return <div key={i} style={{paddingLeft:14,marginBottom:3,display:"flex",gap:7}}><span style={{color:"#0E6EC4",flexShrink:0}}>•</span><span>{line.slice(2)}</span></div>;
              if(line.startsWith("| ")) return null;
              if(/^\d+\./.test(line)) return <div key={i} style={{paddingLeft:14,marginBottom:3,display:"flex",gap:7}}><span style={{color:"#0E6EC4",fontWeight:600,flexShrink:0}}>{line.match(/^\d+/)[0]}.</span><span>{line.replace(/^\d+\.\s*/,"")}</span></div>;
              return <div key={i} style={{marginBottom:3}}>{line}</div>;
            })}
          </div>
        )}

        {/* DOC */}
        {article.type==="doc"&&(
          <div>
            <div style={{fontSize:13,lineHeight:1.7,color:"#9CA3AF",marginBottom:14}}>{article.content}</div>
            <div style={{display:"flex",alignItems:"center",gap:13,padding:14,background:"rgba(14,110,196,.08)",border:"1px solid rgba(14,110,196,.2)",borderRadius:11}}>
              <div style={{width:46,height:46,borderRadius:10,background:"rgba(14,110,196,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{article.docIcon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5,fontWeight:600}}>{article.docTitle}</div>
                <div style={{fontSize:11.5,color:"#6B7280",marginTop:2}}>{article.docDesc} · {article.docSize}</div>
              </div>
              <button style={{padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:"linear-gradient(135deg,#0E6EC4,#0A5BA3)",color:"#fff",border:"none",whiteSpace:"nowrap"}}>
                📥 Скачать
              </button>
            </div>
          </div>
        )}

        {/* PHOTO */}
        {article.type==="photo"&&(
          <div>
            <div style={{fontSize:13,lineHeight:1.7,color:"#9CA3AF",marginBottom:14}}>{article.content}</div>
            <div style={{display:"grid",gridTemplateColumns:article.photos.length===1?"1fr":"1fr 1fr",gap:8}}>
              {article.photos.map((ph,i)=>(
                <div key={i} style={{borderRadius:10,overflow:"hidden",cursor:"zoom-in",position:"relative"}} onClick={()=>setLightbox(ph.url)}>
                  <img src={ph.url} alt={ph.caption} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",display:"block"}}/>
                  {ph.caption&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,.55)",padding:"5px 10px",fontSize:11,color:"#fff"}}>{ph.caption}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUIZ */}
        {article.type==="quiz"&&(()=>{
          const ans=quizAnswers[article.id]||{};
          const done2=quizDone[article.id];
          const score=done2?quizScore(article):null;
          return (
            <div>
              {done2&&(
                <div style={{padding:14,background:score===article.questions.length?"rgba(34,197,94,.1)":score>=Math.ceil(article.questions.length/2)?"rgba(245,158,11,.1)":"rgba(239,68,68,.1)",border:`1px solid ${score===article.questions.length?"rgba(34,197,94,.25)":score>=Math.ceil(article.questions.length/2)?"rgba(245,158,11,.25)":"rgba(239,68,68,.25)"}`,borderRadius:10,marginBottom:16,textAlign:"center"}}>
                  <div style={{fontSize:28,marginBottom:4}}>{score===article.questions.length?"🎉":score>=Math.ceil(article.questions.length/2)?"👍":"📚"}</div>
                  <div style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700}}>{score} из {article.questions.length} правильно</div>
                  <div style={{fontSize:12,color:"#6B7280",marginTop:2}}>{score===article.questions.length?"Отлично! Все ответы верны.":score>=Math.ceil(article.questions.length/2)?"Хороший результат!":"Рекомендуем перечитать материал."}</div>
                </div>
              )}
              {article.questions.map((q,qi)=>{
                const selected=ans[q.id];
                const correct=done2&&q.answer;
                return (
                  <div key={q.id} style={{marginBottom:18}}>
                    <div style={{fontSize:13.5,fontWeight:600,marginBottom:9}}>{qi+1}. {q.text}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:7}}>
                      {q.options.map((opt,oi)=>{
                        let bg="rgba(255,255,255,.04)";
                        let border="rgba(255,255,255,.1)";
                        let color="inherit";
                        if(!done2&&selected===oi){bg="rgba(14,110,196,.12)";border="rgba(14,110,196,.4)";color="#7BBFEF";}
                        if(done2&&oi===q.answer){bg="rgba(34,197,94,.1)";border="rgba(34,197,94,.35)";color="#22C55E";}
                        if(done2&&selected===oi&&oi!==q.answer){bg="rgba(239,68,68,.1)";border="rgba(239,68,68,.35)";color="#F87171";}
                        return (
                          <button key={oi} onClick={()=>answerQ(article.id,q.id,oi)} style={{textAlign:"left",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${border}`,background:bg,color,fontSize:13,cursor:done2?"default":"pointer",transition:"all .15s",display:"flex",alignItems:"center",gap:9}}>
                            <span style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0,background:selected===oi||done2&&oi===q.answer?bg:"transparent"}}>
                              {done2&&oi===q.answer?"✓":done2&&selected===oi&&oi!==q.answer?"✕":String.fromCharCode(65+oi)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {!done2&&(
                <button onClick={()=>submitQuiz(article)} disabled={Object.keys(ans).length<article.questions.length} style={{padding:"10px 20px",borderRadius:9,fontSize:13,fontWeight:600,cursor:Object.keys(ans).length<article.questions.length?"not-allowed":"pointer",background:"linear-gradient(135deg,#0E6EC4,#0A5BA3)",color:"#fff",border:"none",opacity:Object.keys(ans).length<article.questions.length?0.45:1,marginTop:4}}>
                  Проверить ответы
                </button>
              )}
              {done2&&<button onClick={()=>{setQuizAnswers(p=>({...p,[article.id]:{}}));setQuizDone(p=>({...p,[article.id]:false}));}} style={{padding:"8px 16px",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"inherit",marginTop:4}}>Пройти снова</button>}
            </div>
          );
        })()}
      </div>
    </div>
  );

  /* ─────────── MAIN LAYOUT ─────────── */
  return (
    <div>
      {/* Welcome banner */}
      <div className="wb" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,marginBottom:3}}>Привет, {firstName}! 👋</div>
          <div style={{fontSize:12,color:"#A5B4FC"}}>{user.pos} · {user.dept}</div>
          <div style={{marginTop:7,display:"flex",gap:5,flexWrap:"wrap"}}>
            <span className="badge bb">📱 {user.phone}</span>
            <span className="badge bgr">📅 {daysSince(user.joinDate)} дней</span>
          </div>
        </div>
        <div style={{textAlign:"right",position:"relative",zIndex:1}}>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:34,fontWeight:900,color:"#A5B4FC",lineHeight:1}}>{daysSince(user.joinDate)}</div>
          <div style={{fontSize:10,color:"#6B7280"}}>дней в компании</div>
        </div>
      </div>

      {/* Main tabs */}
      <div className="tabs" style={{marginBottom:16}}>
        <button className={`tb ${mainTab==="plan"?"act":""}`} onClick={()=>setMainTab("plan")}>✅ Мой план</button>
        <button className={`tb ${mainTab==="kb"?"act":""}`} onClick={()=>setMainTab("kb")}>📚 База знаний</button>
      </div>

      {/* ═══ TAB: PLAN ═══ */}
      {mainTab==="plan"&&(
        tasks.length===0?(
          <div className="card"><div className="emp"><div className="ei">⏳</div><div style={{fontWeight:600,color:"#6B7280"}}>HR ещё не назначил план адаптации</div><div style={{fontSize:12,color:"#4B5563",marginTop:4}}>Обратитесь к вашему HR-менеджеру</div></div></div>
        ):(
          <>
            <div className="g3" style={{marginBottom:13}}>
              {[{v:done,l:"Выполнено",c:"#34D399"},{v:tasks.length-done,l:"Осталось",c:"#60A5FA"},{v:pct+"%",l:"Прогресс",c:"#7BBFEF"}].map(s=>(
                <div key={s.l} className="sc" style={{cursor:"default"}}><div className="sv" style={{color:s.c}}>{s.v}</div><div className="sl">{s.l}</div></div>
              ))}
            </div>
            <div className="card" style={{marginBottom:12}}>
              <div className="ct">📈 Прогресс адаптации</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:"#6B7280"}}>{done} из {tasks.length}</span>
                <span style={{fontSize:12,fontWeight:700,color:"#7BBFEF"}}>{pct}%</span>
              </div>
              <div className="pb"><div className="pf" style={{width:`${pct}%`,background:"linear-gradient(90deg,#0E6EC4,#0A5BA3,#F5A623)"}}/></div>
            </div>
            <div className="card">
              <div className="ct">✅ Мой план</div>
              {Object.keys(byW).sort((a,b)=>a-b).map(w=>(
                <div key={w} style={{marginBottom:13}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#4B5563",textTransform:"uppercase",letterSpacing:1.2,marginBottom:5}}>Неделя {w}</div>
                  {byW[w].map(t=>(
                    <div className="ir" key={t.id} style={{gap:9}}>
                      <div onClick={()=>toggle(t.id)} style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${t.done?"#0E6EC4":"rgba(255,255,255,.15)"}`,background:t.done?"linear-gradient(135deg,#0E6EC4,#0A5BA3)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,fontSize:9,color:"#fff",transition:"all .2s",boxShadow:t.done?"0 2px 8px rgba(14,110,196,.4)":"none"}}>{t.done?"✓":""}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:500,textDecoration:t.done?"line-through":"none",color:t.done?"#4B5563":"inherit"}}>{t.title}</div>
                        <div style={{fontSize:10.5,color:"#374151",marginTop:1}}>{t.desc}</div>
                      </div>
                      <span className={`badge ${t.done?"bg":"bgr"}`}>{t.done?"Готово":"Ожидает"}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )
      )}

      {/* ═══ TAB: KB ═══ */}
      {mainTab==="kb"&&(
        <div>
          {/* Section selector */}
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
            {KB_SECTIONS.map(sec=>(
              <button key={sec.id} onClick={()=>setKbSec(sec.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:99,fontSize:12.5,fontWeight:500,cursor:"pointer",border:`1.5px solid ${kbSec===sec.id?sec.color+"88":"rgba(255,255,255,.08)"}`,background:kbSec===sec.id?sec.color+"18":"rgba(255,255,255,.03)",color:kbSec===sec.id?sec.color:"#6B7280",transition:"all .15s"}}>
                <span>{sec.icon}</span> {sec.label}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
            {sectionArticles.map(art=>{
              const sec=KB_SECTIONS.find(s=>s.id===art.section);
              const isDone=art.type==="quiz"&&quizDone[art.id];
              const score=isDone?quizScore(art):null;
              return (
                <div key={art.id} onClick={()=>setOpenArt(art.id)}
                  style={{background:"rgba(255,255,255,.03)",border:`1px solid ${isDone?"rgba(34,197,94,.25)":"rgba(255,255,255,.07)"}`,borderRadius:13,padding:16,cursor:"pointer",transition:"all .2s",position:"relative"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=sec?.color+"66"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=isDone?"rgba(34,197,94,.25)":"rgba(255,255,255,.07)"}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                    <div style={{width:38,height:38,borderRadius:9,background:(sec?.color||"#6B7280")+"18",border:`1px solid ${sec?.color||"#6B7280"}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{typeIcon[art.type]}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,lineHeight:1.3,marginBottom:3}}>{art.title}</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{fontSize:10,fontWeight:600,padding:"1px 7px",borderRadius:99,background:(sec?.color||"#6B7280")+"18",color:sec?.color||"#6B7280",border:`1px solid ${sec?.color||"#6B7280"}33`}}>{typeLabel[art.type]}</span>
                        {isDone&&<span style={{fontSize:10,fontWeight:600,padding:"1px 7px",borderRadius:99,background:"rgba(34,197,94,.12)",color:"#22C55E",border:"1px solid rgba(34,197,94,.25)"}}>✓ {score}/{art.questions?.length}</span>}
                      </div>
                    </div>
                  </div>
                  {art.type==="text"&&<div style={{fontSize:12,color:"#6B7280",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{art.content.replace(/\*\*/g,"").slice(0,120)}…</div>}
                  {art.type==="doc"&&<div style={{fontSize:12,color:"#6B7280"}}>{art.docTitle} · {art.docSize}</div>}
                  {art.type==="photo"&&<div style={{fontSize:12,color:"#6B7280"}}>{art.photos.length} фото</div>}
                  {art.type==="quiz"&&<div style={{fontSize:12,color:"#6B7280"}}>{art.questions.length} вопроса</div>}
                  <div style={{position:"absolute",top:12,right:12,fontSize:12,color:"#374151"}}>→</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function AnnualModule() {
  const [rats,setRats]=useState({});const [sub,setSub]=useState(false);const [tab,setTab]=useState("self");
  const total=ANN_CATS.reduce((s,c)=>s+((rats[c.id]||0)*c.w/5),0);
  const desc={1:"Ниже ожиданий",2:"Почти соответствует",3:"Соответствует",4:"Превышает",5:"Исключительно"};
  if(sub)return(<div className="card" style={{textAlign:"center",padding:"42px 20px"}}><div style={{fontSize:46,marginBottom:12}}>🎉</div><div style={{fontFamily:"Manrope,sans-serif",fontSize:19,fontWeight:800,color:"#fff",marginBottom:7}}>Оценка отправлена!</div><div style={{display:"inline-block",background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.3)",borderRadius:13,padding:"14px 28px",marginTop:6}}><div style={{fontSize:11,color:"#6B7280"}}>Итоговый балл</div><div style={{fontFamily:"Manrope,sans-serif",fontSize:36,fontWeight:900,background:"linear-gradient(135deg,#6366F1,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{total.toFixed(0)}<span style={{fontSize:14,WebkitTextFillColor:"#6B7280"}}>/100</span></div></div><div style={{marginTop:18}}><button className="btn bo" onClick={()=>setSub(false)}>Назад</button></div></div>);
  return(<div><div className="tabs">{[["self","Самооценка"],["mgr","Оценка руководителя"]].map(([id,lb])=><button key={id} className={`tb ${tab===id?"act":""}`} onClick={()=>setTab(id)}>{lb}</button>)}</div>{tab==="self"?(<div className="card"><div className="ct">⭐ Критерии оценки</div>{ANN_CATS.map(cat=>(<div key={cat.id} style={{marginBottom:19}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><div><div style={{fontWeight:600,fontSize:13,color:"#E5E7EB"}}>{cat.label}</div><div style={{fontSize:10.5,color:"#4B5563"}}>Вес: {cat.w}%</div></div>{rats[cat.id]&&<span className="badge bb">{desc[rats[cat.id]]}</span>}</div><div className="rs">{[1,2,3,4,5].map(s=><span key={s} className={`star ${s<=(rats[cat.id]||0)?"on":""}`} onClick={()=>setRats(r=>({...r,[cat.id]:s}))}>⭐</span>)}</div></div>))}<div className="div"/><textarea className="ta" placeholder="Ключевые достижения за год..."/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}><span style={{fontSize:12,color:"#4B5563"}}>Срок: <strong style={{color:"#F87171"}}>30 июня 2026</strong></span><button className="btn bp" disabled={Object.keys(rats).length<ANN_CATS.length} onClick={()=>setSub(true)} style={{opacity:Object.keys(rats).length<ANN_CATS.length?0.4:1}}>Отправить</button></div></div>):(<div className="card"><div className="emp"><div className="ei">⏳</div><div style={{fontWeight:600,color:"#6B7280"}}>Ожидание оценки руководителя</div></div></div>)}</div>);
}


function DevModule() {
  const CATS = ["Коммуникация","Управление временем","Аналитика","Лидерство","Гибкость"];
  const CAT_META = {
    "Коммуникация":       {icon:"💬", color:"#7BBFEF", desc:"Навыки общения, аргументации, активного слушания и обратной связи"},
    "Управление временем":{icon:"⏰", color:"#F59E0B", desc:"Планирование, приоритизация, концентрация и соблюдение сроков"},
    "Аналитика":          {icon:"🔍", color:"#A78BFA", desc:"Критическое мышление, работа с данными и решение проблем"},
    "Лидерство":          {icon:"🏆", color:"#F472B6", desc:"Влияние, мотивация, делегирование и развитие команды"},
    "Гибкость":           {icon:"🌊", color:"#34D399", desc:"Адаптивность, стрессоустойчивость и открытость к изменениям"},
  };
  const col  = v => v>=4?"#34D399":v>=3?"#FCD34D":"#F87171";
  const grad = v => v>=4?"linear-gradient(90deg,#059669,#34D399)":v>=3?"linear-gradient(90deg,#D97706,#FCD34D)":"linear-gradient(90deg,#DC2626,#F87171)";

  // state
  const [phase,   setPhase]    = useState("select");  // "select" | "test" | "result"
  const [selCat,  setSelCat]   = useState(null);
  const [ans,     setAns]      = useState({});
  // history: { cat: {avg, score, date} }
  const [history, setHistory]  = useState({});

  const catQuestions = selCat ? DEV_Q.filter(q=>q.cat===selCat) : [];
  const answered     = catQuestions.filter(q=>ans[q.id]!==undefined).length;
  const allDone      = selCat && answered === catQuestions.length;

  const submitTest = () => {
    const qs  = catQuestions;
    const avg = Math.round(qs.reduce((s,q)=>s+(ans[q.id]||0),0)/qs.length*10)/10;
    setHistory(h=>({...h,[selCat]:{avg, answered, date:new Date().toLocaleDateString("ru-RU")}}));
    setPhase("result");
  };

  const startCat = cat => { setSelCat(cat); setAns({}); setPhase("test"); };
  const backToSelect = () => { setPhase("select"); setSelCat(null); setAns({}); };

  /* ── RESULT ── */
  if(phase==="result"&&selCat) {
    const meta = CAT_META[selCat];
    const qs   = catQuestions;
    const avg  = history[selCat]?.avg||0;
    const byScore = [...qs].sort((a,b)=>(ans[a.id]||0)-(ans[b.id]||0));
    const weak = byScore.slice(0,5);
    const strong = byScore.slice(-5).reverse();
    return (
      <div>
        <button className="btn bo" style={{marginBottom:14}} onClick={backToSelect}>← К списку компетенций</button>
        <div className="card" style={{textAlign:"center",padding:"22px 18px",marginBottom:14,border:`1px solid ${meta.color}44`}}>
          <div style={{fontSize:36,marginBottom:6}}>{meta.icon}</div>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,marginBottom:4}}>{selCat}</div>
          <div style={{display:"inline-block",background:col(avg)+"18",border:`1px solid ${col(avg)}44`,borderRadius:12,padding:"12px 28px",margin:"10px 0"}}>
            <div style={{fontSize:11,color:"#6B7280"}}>Средний балл</div>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:42,fontWeight:900,color:col(avg),lineHeight:1}}>{avg}</div>
            <div style={{fontSize:11.5,color:"#6B7280",marginTop:2}}>из 5 · {qs.length} вопросов</div>
          </div>
          <div style={{fontSize:13,fontWeight:600,color:col(avg)}}>
            {avg>=4?"Отличный результат — вы на высоком уровне":avg>=3?"Хороший уровень — есть точки роста":"Требует развития — рекомендуем сфокусироваться"}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          <div className="card">
            <div className="ct">🔥 5 зон роста</div>
            {weak.map(q=>(
              <div key={q.id} style={{padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:12,fontWeight:700,color:"#F87171",width:18,textAlign:"center",flexShrink:0}}>{ans[q.id]}</span>
                <span style={{fontSize:11.5,color:"#E5E7EB",lineHeight:1.4}}>{q.text}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ct">💪 5 сильных сторон</div>
            {strong.map(q=>(
              <div key={q.id} style={{padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:12,fontWeight:700,color:"#34D399",width:18,textAlign:"center",flexShrink:0}}>{ans[q.id]}</span>
                <span style={{fontSize:11.5,color:"#E5E7EB",lineHeight:1.4}}>{q.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:9}}>
          <button className="btn bo" onClick={()=>{setAns({});setPhase("test");}}>Пройти повторно</button>
          <button className="btn bp" onClick={backToSelect}>К другим компетенциям</button>
        </div>
      </div>
    );
  }

  /* ── TEST ── */
  if(phase==="test"&&selCat) {
    const meta = CAT_META[selCat];
    const pct  = Math.round(answered/catQuestions.length*100);
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
          <button className="btn bo" onClick={backToSelect}>← Назад</button>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700}}>{meta.icon} {selCat}</div>
            <div style={{fontSize:11.5,color:"#6B7280"}}>{answered} из {catQuestions.length} вопросов</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:18,fontWeight:700,color:meta.color}}>{pct}%</div>
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <div className="pb"><div className="pf" style={{width:`${pct}%`,background:meta.color}}/></div>
        </div>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:10,padding:"9px 13px",marginBottom:14,fontSize:12,color:"#6B7280"}}>
          Оцените каждое утверждение: <strong style={{color:"#E5E7EB"}}>1</strong> — совсем не про меня, <strong style={{color:"#E5E7EB"}}>5</strong> — абсолютно про меня
        </div>
        <div className="card">
          {catQuestions.map((q,i)=>(
            <div key={q.id} className="sr">
              <div className="st">
                <span style={{fontSize:10,color:"#4B5563",display:"block",marginBottom:2}}>#{i+1}</span>
                {q.text}
              </div>
              <div className="sbs">
                {[1,2,3,4,5].map(v=>(
                  <button key={v} className={`sb2 ${ans[q.id]===v?"sel":""}`} onClick={()=>setAns(a=>({...a,[q.id]:v}))}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14,flexWrap:"wrap",gap:10}}>
          <span style={{fontSize:12.5,color:"#6B7280"}}>Отвечено: {answered}/{catQuestions.length}</span>
          <button className="btn bp" disabled={!allDone} onClick={submitTest} style={{opacity:allDone?1:0.4,padding:"10px 24px"}}>
            Завершить тест →
          </button>
        </div>
      </div>
    );
  }

  /* ── SELECT ── */
  const overallDone = Object.keys(history).length;
  return (
    <div>
      {overallDone>0&&(
        <div className="card" style={{marginBottom:16}}>
          <div className="ct">📊 Пройденные компетенции</div>
          {CATS.filter(c=>history[c]).map(c=>{
            const h=history[c]; const meta=CAT_META[c];
            return (
              <div key={c} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,marginBottom:4}}>
                  <span style={{fontWeight:500}}>{meta.icon} {c}</span>
                  <span style={{fontWeight:700,color:col(h.avg)}}>{h.avg}/5 · {h.date}</span>
                </div>
                <div className="pb"><div className="pf" style={{width:`${h.avg*20}%`,background:col(h.avg)}}/></div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{display:"grid",gap:12}}>
        {CATS.map(cat=>{
          const meta=CAT_META[cat]; const done=!!history[cat];
          return (
            <div key={cat} onClick={()=>startCat(cat)} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",border:`1.5px solid ${done?meta.color+"55":"rgba(255,255,255,.07)"}`,borderRadius:13,background:done?meta.color+"08":"rgba(255,255,255,.02)",cursor:"pointer",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=meta.color+"88";e.currentTarget.style.background=meta.color+"12";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=done?meta.color+"55":"rgba(255,255,255,.07)";e.currentTarget.style.background=done?meta.color+"08":"rgba(255,255,255,.02)";}}>
              <div style={{width:50,height:50,borderRadius:12,background:meta.color+"18",border:`1px solid ${meta.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{meta.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700,marginBottom:3}}>{cat}</div>
                <div style={{fontSize:12,color:"#6B7280",marginBottom:done?6:0}}>{meta.desc}</div>
                {done&&(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{flex:1,maxWidth:120}}><div className="pb"><div className="pf" style={{width:`${history[cat].avg*20}%`,background:meta.color,height:4}}/></div></div>
                    <span style={{fontSize:12,fontWeight:700,color:meta.color}}>{history[cat].avg}/5</span>
                  </div>
                )}
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:13,fontWeight:700,color:"#6B7280"}}>30</div>
                <div style={{fontSize:10.5,color:"#4B5563"}}>вопросов</div>
                {done?<div style={{fontSize:10.5,color:meta.color,marginTop:3}}>✓ Пройдено</div>:<div style={{fontSize:10.5,color:"#4B5563",marginTop:3}}>→ Начать</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SOC_Q = [
  {id:1,text:"Я чувствую себя частью команды"},
  {id:2,text:"У меня есть коллеги, которым я доверяю"},
  {id:3,text:"Моя работа ценится руководством"},
  {id:4,text:"Я понимаю перспективы своего роста"},
  {id:5,text:"Мой уровень нагрузки комфортен"},
  {id:6,text:"Я доволен балансом работы и жизни"},
  {id:7,text:"В компании есть психологическая безопасность"},
  {id:8,text:"Я готов рекомендовать компанию как работодателя"},
];

const ANN_CATS = [
  {id:"res",label:"Достижение результатов",w:40},
  {id:"com",label:"Компетенции",w:30},
  {id:"val",label:"Ценности компании",w:20},
  {id:"dev",label:"Развитие и обучение",w:10},
];

const Q_TYPES = [
  {type:"text",    label:"Текстовый ответ",      icon:"✏️", hint:"Свободный ответ"},
  {type:"radio",   label:"Один вариант",          icon:"🔘", hint:"Выбор одного"},
  {type:"checkbox",label:"Несколько вариантов",   icon:"☑️", hint:"Выбор нескольких"},
  {type:"scale",   label:"Шкала 1–5",             icon:"📏", hint:"Оценочная шкала"},
  {type:"nps",     label:"NPS (0–10)",            icon:"📈", hint:"Net Promoter Score"},
  {type:"yesno",   label:"Да / Нет",              icon:"✅", hint:"Бинарный вопрос"},
];

const NEWS_CATS = [
  {id:"hire",     label:"Новый сотрудник",      icon:"🧑‍💼", color:"#34D399"},
  {id:"transfer", label:"Перевод",              icon:"🔄",   color:"#60A5FA"},
  {id:"event",    label:"Мероприятие",          icon:"🎉",   color:"#F472B6"},
  {id:"policy",   label:"Политики/процедуры",  icon:"📋",   color:"#FBBF24"},
  {id:"announce", label:"Объявление",           icon:"📢",   color:"#A78BFA"},
];

const DEPTS = ["Разработка","Продукт","Маркетинг","HR","Финансы","Операции","Продажи","Дизайн","Юридический","Другое"];

const DEMO_ACCOUNTS = [
  {id:"adm1",role:"admin",  name:"Суперов Админ Иванович",   pos:"Системный администратор", dept:"HR", phone:"+7 (999) 000-00-01"},
  {id:"hr1", role:"hr",     name:"Соколова Мария Петровна",  pos:"HR Business Partner",     dept:"HR", phone:"+7 (999) 000-00-02"},
  {id:"hr2", role:"hr",     name:"Кузнецова Анна Сергеевна", pos:"HR Manager",              dept:"HR", phone:"+7 (999) 000-00-03"},
];

const INIT_EMPLOYEES = [
  {id:"e1",role:"employee",name:"Петров Алексей Иванович",   pos:"Менеджер по продукту", dept:"Продукт",   phone:"+7 (999) 100-00-01",joinDate:"2026-04-22",adaptTasks:[],adaptDone:false},
  {id:"e2",role:"employee",name:"Новикова Елена Юрьевна",    pos:"Frontend-разработчик",  dept:"Разработка",phone:"+7 (999) 100-00-02",joinDate:"2026-05-15",adaptTasks:[],adaptDone:false},
  {id:"e3",role:"employee",name:"Смирнов Дмитрий Олегович",  pos:"Маркетолог",            dept:"Маркетинг", phone:"+7 (999) 100-00-03",joinDate:"2026-06-01",adaptTasks:[],adaptDone:false},
];

const INIT_NEWS = [
  {id:"n1",cat:"hire",    title:"Добро пожаловать, Алексей Петров!", body:"В нашей команде новый Менеджер по продукту. Алексей ранее работал в Яндексе.",               author:"Соколова Мария Петровна",  date:"2026-04-22",pinned:true,  images:[]},
  {id:"n2",cat:"event",   title:"Тимбилдинг — 28 июня 2026",         body:"Приглашаем на летний тимбилдинг! Квест, барбекю, командные игры. Парк Горького.",           author:"Кузнецова Анна Сергеевна", date:"2026-06-05",pinned:false, images:[]},
  {id:"n3",cat:"policy",  title:"Обновление политики удалённой работы",body:"С 1 июля — максимум 3 дня в неделю из дома. Полный текст во внутренней базе знаний.",     author:"Соколова Мария Петровна",  date:"2026-06-03",pinned:false, images:[]},
  {id:"n4",cat:"transfer",title:"Иванова Светлана — переход в Продукт",body:"С 15 июня Светлана переходит из Маркетинга на позицию Product Analyst. Желаем успехов!",  author:"Соколова Мария Петровна",  date:"2026-06-01",pinned:false, images:[]},
];

const TICKET_CATS = [
  {id:"hr",       label:"HR-вопрос",             icon:"🧑‍💼", color:"#7BBFEF"},
  {id:"salary",   label:"Зарплата и выплаты",    icon:"💰",   color:"#34D399"},
  {id:"vacation", label:"Отпуск / больничный",   icon:"🏖️",  color:"#60A5FA"},
  {id:"equipment",label:"Оборудование/доступы",  icon:"💻",   color:"#A78BFA"},
  {id:"conflict", label:"Конфликтная ситуация",  icon:"⚡",   color:"#F472B6"},
  {id:"other",    label:"Другое",                icon:"📌",   color:"#FBBF24"},
];

const TICKET_PRIORITIES = [
  {id:"low",    label:"Низкий",  color:"#6B7280"},
  {id:"medium", label:"Средний", color:"#F59E0B"},
  {id:"high",   label:"Высокий", color:"#EF4444"},
];

const TICKET_STATUSES = [
  {id:"new",         label:"Новое",    color:"#7BBFEF", bg:"rgba(14,110,196,.15)"},
  {id:"in_progress", label:"В работе", color:"#F59E0B", bg:"rgba(245,158,11,.15)"},
  {id:"resolved",    label:"Решено",   color:"#22C55E", bg:"rgba(34,197,94,.15)"},
  {id:"closed",      label:"Закрыто",  color:"#6B7280", bg:"rgba(107,114,128,.12)"},
];

const INIT_TICKETS = [
  {id:"tk1",cat:"vacation",priority:"medium",subject:"Когда можно взять ежегодный отпуск?",body:"Хотел бы уточнить, с какой даты мне будет доступен ежегодный оплачиваемый отпуск и каков порядок его оформления.",authorId:"e1",authorName:"Петров Алексей Иванович",status:"in_progress",isAnonymous:false,createdAt:"2026-06-02",messages:[{id:"m1",from:"Соколова Мария Петровна",role:"hr",text:"Здравствуйте, Алексей! После 6 месяцев работы вам будет доступен отпуск. Ваша дата — 22 октября 2026. Заявление подаётся за 2 недели.",createdAt:"2026-06-03"}]},
  {id:"tk2",cat:"equipment",priority:"high",subject:"Нет доступа к корпоративной почте",body:"После смены компьютера не могу войти в корпоративную почту. Пробовал сбросить пароль — не помогает.",authorId:"e2",authorName:"Новикова Елена Юрьевна",status:"new",isAnonymous:false,createdAt:"2026-06-04",messages:[]},
  {id:"tk3",cat:"conflict",priority:"high",subject:"Анонимное обращение",body:"В нашем отделе систематически нарушаются договорённости по рабочим задачам. Прошу обратить внимание.",authorId:"e3",authorName:"Анонимно",status:"new",isAnonymous:true,createdAt:"2026-06-05",messages:[]},
  {id:"tk4",cat:"salary",priority:"low",subject:"Вопрос по расчётному листу",body:"В апрельском расчётном листе не вижу доплаты за переработку. Прошу проверить.",authorId:"e1",authorName:"Петров Алексей Иванович",status:"resolved",isAnonymous:false,createdAt:"2026-05-28",messages:[{id:"m2",from:"Кузнецова Анна Сергеевна",role:"hr",text:"Проверили расчёт — доплата была включена в строку 'Надбавки'. В следующем листе добавим отдельную строку для ясности.",createdAt:"2026-05-30"}]},
];




/* ══════════════════════════════════════════════════════════
   LEARNING MODULE — Нормативные документы
══════════════════════════════════════════════════════════ */

const LEARN_CATS = [
  {id:"all",     label:"Все документы",      icon:"📚"},
  {id:"safety",  label:"Охрана труда и ТБ",  icon:"🦺", color:"#EF4444"},
  {id:"hr",      label:"HR и кадровые",      icon:"🧑‍💼", color:"#7BBFEF"},
  {id:"ethics",  label:"Этика и поведение",  icon:"⚖️",  color:"#A78BFA"},
  {id:"info",    label:"Информационная безопасность", icon:"🔒", color:"#F59E0B"},
  {id:"quality", label:"Качество и процессы",icon:"✅",  color:"#22C55E"},
  {id:"finance", label:"Финансы и комплаенс",icon:"💰",  color:"#34D399"},
];

const INIT_DOCS = [
  {
    id:"d1", cat:"safety",
    title:"Инструкция по охране труда",
    docNum:"ИОТ-001-2026", version:"3.2", date:"2026-01-15",
    mandatory:true, daysToComplete:3,
    desc:"Основные требования по охране труда для всех сотрудников офиса. Обязателен к изучению в первые 3 дня работы.",
    docSize:"1.8 МБ", docType:"PDF",
    quiz:[
      {id:"q1", text:"Куда звонить при несчастном случае на производстве?",
       options:["Руководителю отдела","В скорую помощь 103 и охране труда","В бухгалтерию","На ресепшн"], answer:1},
      {id:"q2", text:"Что нужно сделать при обнаружении задымления в офисе?",
       options:["Продолжать работу","Позвонить коллегам","Нажать пожарный извещатель и покинуть здание","Открыть окна"], answer:2},
      {id:"q3", text:"Как часто проводится обязательный повторный инструктаж?",
       options:["Раз в полгода","Раз в год","Раз в 2 года","Только при приёме на работу"], answer:1},
      {id:"q4", text:"Где находится аптечка первой помощи?",
       options:["В кабинете директора","У администратора каждого этажа","В столовой","В серверной"], answer:1},
    ],
  },
  {
    id:"d2", cat:"info",
    title:"Политика информационной безопасности",
    docNum:"ПИБ-002-2026", version:"2.1", date:"2026-02-01",
    mandatory:true, daysToComplete:5,
    desc:"Правила обращения с корпоративными данными, паролями и информационными системами.",
    docSize:"2.4 МБ", docType:"PDF",
    quiz:[
      {id:"q1", text:"Минимальная длина корпоративного пароля?",
       options:["6 символов","8 символов","10 символов","12 символов"], answer:1},
      {id:"q2", text:"Как часто нужно менять пароль?",
       options:["Каждые 30 дней","Каждые 60 дней","Каждые 90 дней","Раз в год"], answer:2},
      {id:"q3", text:"Что делать с подозрительным письмом?",
       options:["Открыть и проверить","Переслать коллегам","Переслать на security@и не открывать вложения","Удалить и забыть"], answer:2},
      {id:"q4", text:"Можно ли хранить рабочие файлы на личном Google Drive?",
       options:["Да, это удобно","Только небольшие файлы","Нет, только корпоративные хранилища","По согласованию с IT"], answer:2},
    ],
  },
  {
    id:"d3", cat:"ethics",
    title:"Кодекс деловой этики",
    docNum:"КДЭ-003-2025", version:"1.5", date:"2025-09-10",
    mandatory:true, daysToComplete:7,
    desc:"Нормы поведения, принципы честности и ответственности, конфликт интересов.",
    docSize:"0.9 МБ", docType:"PDF",
    quiz:[
      {id:"q1", text:"Максимальная стоимость подарка от делового партнёра?",
       options:["1 000 тенге","5 000 тенге","10 000 тенге","Любой стоимости"], answer:1},
      {id:"q2", text:"Что такое конфликт интересов?",
       options:["Спор с коллегой","Личная заинтересованность в деловом решении компании","Разногласие с руководителем","Конкуренция между отделами"], answer:1},
      {id:"q3", text:"Что запрещено использовать в личных целях?",
       options:["Личный телефон","Корпоративное оборудование и рабочее время","Знания, полученные на работе","Корпоративный Wi-Fi"], answer:1},
    ],
  },
  {
    id:"d4", cat:"hr",
    title:"Положение о персонале",
    docNum:"ПП-004-2026", version:"4.0", date:"2026-01-01",
    mandatory:true, daysToComplete:7,
    desc:"Порядок приёма, увольнения, оплаты труда, отпусков и социальных гарантий.",
    docSize:"3.1 МБ", docType:"PDF",
    quiz:[
      {id:"q1", text:"Через сколько месяцев работы сотрудник имеет право на ежегодный отпуск?",
       options:["3 месяца","6 месяцев","9 месяцев","12 месяцев"], answer:1},
      {id:"q2", text:"Сколько рабочих дней составляет ежегодный оплачиваемый отпуск?",
       options:["18","21","24","28"], answer:2},
      {id:"q3", text:"До какого времени нужно сообщить об отсутствии по болезни?",
       options:["До 8:00","До 9:00","До 10:00","До обеда"], answer:1},
      {id:"q4", text:"Как часто выплачивается заработная плата?",
       options:["Раз в месяц","2 раза в месяц","Еженедельно","По договорённости"], answer:1},
    ],
  },
  {
    id:"d5", cat:"quality",
    title:"Стандарт управления качеством ISO 9001",
    docNum:"ISO-005-2025", version:"2.0", date:"2025-11-20",
    mandatory:false, daysToComplete:14,
    desc:"Требования к системе менеджмента качества, процессный подход, документирование.",
    docSize:"4.2 МБ", docType:"PDF",
    quiz:[
      {id:"q1", text:"На чём основан процессный подход ISO 9001?",
       options:["На иерархии управления","На цикле PDCA (Plan-Do-Check-Act)","На финансовых показателях","На количестве сотрудников"], answer:1},
      {id:"q2", text:"Как часто проводится внутренний аудит по ISO 9001?",
       options:["Ежемесячно","Раз в квартал","Не реже одного раза в год","Только при сертификации"], answer:2},
      {id:"q3", text:"Что такое корректирующее действие?",
       options:["Штраф за нарушение","Действие для устранения причины несоответствия","Предупреждение сотруднику","Изменение плана производства"], answer:1},
    ],
  },
  {
    id:"d6", cat:"finance",
    title:"Антикоррупционная политика",
    docNum:"АКП-006-2026", version:"1.3", date:"2026-03-01",
    mandatory:true, daysToComplete:5,
    desc:"Запрет взяток, правила деловых отношений, процедуры сообщения о нарушениях.",
    docSize:"1.1 МБ", docType:"PDF",
    quiz:[
      {id:"q1", text:"Что нужно делать при получении предложения о взятке?",
       options:["Принять и никому не говорить","Отказаться и сообщить руководству и комплаенс-офицеру","Отказаться и забыть об этом","Спросить совета у коллег"], answer:1},
      {id:"q2", text:"Распространяется ли антикоррупционная политика на подрядчиков?",
       options:["Нет, только на сотрудников","Да, на всех деловых партнёров","Только на иностранных партнёров","Только на крупные контракты"], answer:1},
      {id:"q3", text:"Куда сообщить о подозрении в коррупции анонимно?",
       options:["Директору","На горячую линию комплаенс","В полицию","Коллегам"], answer:1},
    ],
  },
];

function LearnModule({user}) {
  const isStaff = user.role==="hr"||user.role==="admin";

  // State lifted: in real app would come from App; here we manage locally
  const [docs,setDocs]       = useState(INIT_DOCS);
  const [progress,setProgress] = useState({}); // {docId: {read:bool, quizDone:bool, score:int, attempts:int}}
  const [catFilter,setCatFilter] = useState("all");
  const [view,setView]       = useState("list"); // "list"|"read"|"quiz"|"add"
  const [selId,setSelId]     = useState(null);
  const [quizAns,setQuizAns] = useState({});
  const [quizResult,setQuizResult] = useState(null); // {score, total, passed}

  // HR form for adding new doc
  const [form,setForm] = useState({
    title:"", cat:"safety", docNum:"", version:"1.0",
    date: new Date().toISOString().slice(0,10),
    mandatory:true, daysToComplete:7,
    desc:"", docSize:"", docType:"PDF",
    quiz:[],
  });
  const [formErr,setFormErr] = useState({});
  const [newQ,setNewQ]       = useState({text:"", options:["","","",""], answer:0});

  const sel = docs.find(d=>d.id===selId);
  const prog = (id) => progress[id]||{read:false,quizDone:false,score:0,attempts:0};
  const catInfo = (id) => LEARN_CATS.find(c=>c.id===id)||LEARN_CATS[0];

  const filteredDocs = catFilter==="all" ? docs : docs.filter(d=>d.cat===catFilter);

  // Stats
  const mandatory = docs.filter(d=>d.mandatory);
  const mandatoryDone = mandatory.filter(d=>prog(d.id).quizDone).length;
  const totalDone = docs.filter(d=>prog(d.id).quizDone).length;

  // Deadline hint
  const deadlineLabel = (doc) => {
    if(!doc.mandatory) return null;
    if(prog(doc.id).quizDone) return null;
    return `Срок: ${doc.daysToComplete} раб. дней`;
  };

  /* ── Quiz submit ── */
  const submitQuiz = () => {
    const q = sel.quiz;
    const correct = q.filter((_q,i) => quizAns[_q.id] === _q.answer).length;
    const passed  = correct / q.length >= 0.7;
    const prevProg = prog(sel.id);
    setProgress(p=>({...p,[sel.id]:{
      read: true, quizDone: passed || prevProg.quizDone,
      score: Math.max(prevProg.score||0, Math.round(correct/q.length*100)),
      attempts: (prevProg.attempts||0)+1,
    }}));
    setQuizResult({score:correct, total:q.length, passed, pct:Math.round(correct/q.length*100)});
  };

  /* ── Add doc (HR/Admin) ── */
  const validateDoc = () => {
    const e={};
    if(!form.title.trim())  e.title="Введите название";
    if(!form.docNum.trim()) e.docNum="Введите номер документа";
    if(!form.desc.trim())   e.desc="Добавьте описание";
    if(form.quiz.length<2)  e.quiz="Добавьте минимум 2 вопроса теста";
    setFormErr(e); return !Object.keys(e).length;
  };
  const addDoc = () => {
    if(!validateDoc()) return;
    const d={...form, id:"d"+uid(), date: form.date||new Date().toISOString().slice(0,10)};
    setDocs(ds=>[d,...ds]);
    setForm({title:"",cat:"safety",docNum:"",version:"1.0",date:new Date().toISOString().slice(0,10),mandatory:true,daysToComplete:7,desc:"",docSize:"",docType:"PDF",quiz:[]});
    setView("list");
  };
  const addQuizQ = () => {
    if(!newQ.text.trim()||newQ.options.some(o=>!o.trim())) return;
    setForm(f=>({...f,quiz:[...f.quiz,{id:"q"+(f.quiz.length+1),...newQ}]}));
    setNewQ({text:"",options:["","","",""],answer:0});
  };

  /* ══════════ VIEW: ADD DOCUMENT (HR/Admin) ══════════ */
  if(view==="add") return (
    <div>
      <button className="btn bo" style={{marginBottom:14}} onClick={()=>setView("list")}>← Назад</button>
      <div className="card" style={{border:"1px solid rgba(14,110,196,.3)"}}>
        <div style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700,marginBottom:16}}>📄 Добавить нормативный документ</div>

        <div style={{display:"grid",gap:10,marginBottom:14}}>
          <div>
            <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Название документа *</label>
            <input className="inp" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Инструкция по охране труда"/>
            {formErr.title&&<div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {formErr.title}</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            <div>
              <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Номер документа *</label>
              <input className="inp" value={form.docNum} onChange={e=>setForm(f=>({...f,docNum:e.target.value}))} placeholder="ИОТ-001-2026"/>
              {formErr.docNum&&<div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {formErr.docNum}</div>}
            </div>
            <div>
              <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Версия</label>
              <input className="inp" value={form.version} onChange={e=>setForm(f=>({...f,version:e.target.value}))} placeholder="1.0"/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            <div>
              <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Дата утверждения</label>
              <input type="date" className="inp" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
            </div>
            <div>
              <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Категория</label>
              <select className="inp" value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))}>
                {LEARN_CATS.filter(c=>c.id!=="all").map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Описание *</label>
            <textarea className="ta" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Краткое описание содержания документа..." style={{minHeight:72}}/>
            {formErr.desc&&<div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {formErr.desc}</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
            <div>
              <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Размер файла</label>
              <input className="inp" value={form.docSize} onChange={e=>setForm(f=>({...f,docSize:e.target.value}))} placeholder="2.4 МБ"/>
            </div>
            <div>
              <label style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Срок изучения (дней)</label>
              <input type="number" min="1" max="30" className="inp" value={form.daysToComplete} onChange={e=>setForm(f=>({...f,daysToComplete:+e.target.value}))}/>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",paddingBottom:2}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                <div onClick={()=>setForm(f=>({...f,mandatory:!f.mandatory}))} style={{width:34,height:19,borderRadius:99,background:form.mandatory?"#0E6EC4":"rgba(255,255,255,.1)",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                  <div style={{position:"absolute",top:2.5,left:form.mandatory?16:2.5,width:14,height:14,background:"#fff",borderRadius:"50%",transition:"left .2s"}}/>
                </div>
                <span style={{fontSize:12,fontWeight:600,color:form.mandatory?"#7BBFEF":"#6B7280"}}>Обязательный</span>
              </label>
            </div>
          </div>
        </div>

        {/* Загрузка файла */}
        <div style={{padding:"12px 16px",background:"rgba(14,110,196,.06)",border:"1.5px dashed rgba(14,110,196,.3)",borderRadius:10,marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:9,background:"rgba(14,110,196,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📎</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:"#7BBFEF"}}>Прикрепить документ</div>
            <div style={{fontSize:11,color:"#4B5563",marginTop:1}}>PDF, DOCX, XLSX — будет доступен сотрудникам для скачивания</div>
          </div>
          <button style={{padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:"rgba(14,110,196,.15)",border:"1px solid rgba(14,110,196,.3)",color:"#7BBFEF"}}>Выбрать файл</button>
        </div>

        {/* Тест */}
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"inherit",marginBottom:10,display:"flex",alignItems:"center",gap:7}}>
            ✅ Контрольный тест
            <span style={{fontSize:11,color:"#6B7280",fontWeight:400}}>Порог прохождения 70%</span>
            {formErr.quiz&&<span style={{fontSize:11,color:"#F87171"}}>⚠ {formErr.quiz}</span>}
          </div>

          {form.quiz.map((q,qi)=>(
            <div key={q.id} style={{padding:"10px 13px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                <span style={{fontSize:12.5,fontWeight:600,color:"#E5E7EB",flex:1}}>{qi+1}. {q.text}</span>
                <button onClick={()=>setForm(f=>({...f,quiz:f.quiz.filter((_,i)=>i!==qi)}))} style={{background:"none",border:"none",cursor:"pointer",color:"#4B5563",fontSize:14,marginLeft:8}}>✕</button>
              </div>
              {q.options.map((opt,oi)=>(
                <div key={oi} style={{display:"flex",alignItems:"center",gap:7,padding:"3px 0"}}>
                  <div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${oi===q.answer?"#22C55E":"#374151"}`,background:oi===q.answer?"#22C55E":"transparent",flexShrink:0}}/>
                  <span style={{fontSize:12,color:oi===q.answer?"#22C55E":"#9CA3AF"}}>{opt}</span>
                  {oi===q.answer&&<span style={{fontSize:10,color:"#22C55E"}}>✓ правильный</span>}
                </div>
              ))}
            </div>
          ))}

          {/* Добавить вопрос */}
          <div style={{padding:"12px 14px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:10}}>
            <div style={{fontSize:12,fontWeight:600,color:"#6B7280",marginBottom:8}}>Новый вопрос:</div>
            <input className="inp" style={{marginBottom:8}} placeholder="Текст вопроса..." value={newQ.text} onChange={e=>setNewQ(q=>({...q,text:e.target.value}))}/>
            {newQ.options.map((opt,oi)=>(
              <div key={oi} style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
                <button onClick={()=>setNewQ(q=>({...q,answer:oi}))} style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${newQ.answer===oi?"#22C55E":"#374151"}`,background:newQ.answer===oi?"#22C55E":"transparent",flexShrink:0,cursor:"pointer"}}/>
                <input className="inp" style={{flex:1,padding:"6px 10px"}} placeholder={`Вариант ${oi+1}`} value={opt} onChange={e=>setNewQ(q=>({...q,options:q.options.map((o,i)=>i===oi?e.target.value:o)}))}/>
              </div>
            ))}
            <div style={{fontSize:11,color:"#4B5563",marginBottom:9}}>Нажмите на кружок слева от варианта, чтобы отметить его правильным</div>
            <button className="btn bg2 bsm" onClick={addQuizQ} disabled={!newQ.text.trim()||newQ.options.some(o=>!o.trim())}>+ Добавить вопрос</button>
          </div>
        </div>

        <div className="div"/>
        <div style={{display:"flex",gap:9,justifyContent:"flex-end"}}>
          <button className="btn bo" onClick={()=>setView("list")}>Отмена</button>
          <button className="btn bp" onClick={addDoc}>💾 Сохранить документ</button>
        </div>
      </div>
    </div>
  );

  /* ══════════ VIEW: QUIZ ══════════ */
  if(view==="quiz"&&sel) {
    if(quizResult) return (
      <div>
        <div className="card" style={{textAlign:"center",padding:"28px 20px",marginBottom:14}}>
          <div style={{fontSize:44,marginBottom:10}}>{quizResult.passed?"🎉":quizResult.pct>=50?"📚":"❌"}</div>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,marginBottom:4}}>
            {quizResult.passed?"Тест пройден!":quizResult.pct>=50?"Почти! Попробуйте ещё раз":"Нужно повторить материал"}
          </div>
          <div style={{display:"inline-block",background:quizResult.passed?"rgba(34,197,94,.1)":"rgba(239,68,68,.1)",border:`1px solid ${quizResult.passed?"rgba(34,197,94,.3)":"rgba(239,68,68,.3)"}`,borderRadius:12,padding:"14px 28px",margin:"12px 0"}}>
            <div style={{fontSize:11,color:"#6B7280"}}>Результат</div>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:36,fontWeight:900,color:quizResult.passed?"#22C55E":"#EF4444",lineHeight:1}}>
              {quizResult.pct}%
            </div>
            <div style={{fontSize:12.5,color:"#6B7280",marginTop:2}}>{quizResult.score} из {quizResult.total} правильно · порог 70%</div>
          </div>
          <div style={{display:"flex",gap:9,justifyContent:"center",marginTop:4}}>
            <button className="btn bo" onClick={()=>setView("read")}>← К документу</button>
            {!quizResult.passed&&<button className="btn bp" onClick={()=>{setQuizAns({});setQuizResult(null);}}>Попробовать снова</button>}
            {quizResult.passed&&<button className="btn bp" onClick={()=>{setQuizResult(null);setView("list");}}>К библиотеке</button>}
          </div>
        </div>
        {/* Разбор ответов */}
        <div className="card">
          <div className="ct">📋 Разбор ответов</div>
          {sel.quiz.map((q,i)=>{
            const userAns=quizAns[q.id];
            const correct=userAns===q.answer;
            return (
              <div key={q.id} style={{marginBottom:14,paddingBottom:14,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:7,display:"flex",alignItems:"center",gap:7}}>
                  <span style={{fontSize:15}}>{correct?"✅":"❌"}</span>
                  {i+1}. {q.text}
                </div>
                {q.options.map((opt,oi)=>{
                  let bg="transparent"; let color="#6B7280"; let fw=400;
                  if(oi===q.answer){bg="rgba(34,197,94,.1)";color="#22C55E";fw=600;}
                  if(oi===userAns&&!correct){bg="rgba(239,68,68,.1)";color="#EF4444";}
                  return <div key={oi} style={{padding:"5px 10px",borderRadius:7,background:bg,color,fontWeight:fw,fontSize:12.5,marginBottom:3}}>{oi===q.answer?"✓ ":oi===userAns?"✗ ":""}{opt}</div>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
          <button className="btn bo" onClick={()=>{setView("read");setQuizAns({});}}>← К документу</button>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,flex:1}}>{sel.title} — Тест</div>
          <span style={{fontSize:11.5,color:"#6B7280"}}>Порог: 70% · {sel.quiz.length} вопросов</span>
        </div>
        <div style={{background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12.5,color:"#FCD34D"}}>
          ⚠ Тест можно пройти несколько раз. Засчитывается лучший результат.
        </div>
        <div className="card">
          {sel.quiz.map((q,i)=>{
            const selected=quizAns[q.id];
            return (
              <div key={q.id} style={{marginBottom:20,paddingBottom:20,borderBottom:i<sel.quiz.length-1?"1px solid rgba(255,255,255,.05)":"none"}}>
                <div style={{fontSize:13.5,fontWeight:600,marginBottom:10}}>{i+1}. {q.text}</div>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {q.options.map((opt,oi)=>{
                    const isSel=selected===oi;
                    return (
                      <button key={oi} onClick={()=>setQuizAns(a=>({...a,[q.id]:oi}))} style={{textAlign:"left",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${isSel?"rgba(14,110,196,.5)":"rgba(255,255,255,.08)"}`,background:isSel?"rgba(14,110,196,.12)":"rgba(255,255,255,.03)",color:isSel?"#7BBFEF":"inherit",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .15s"}}>
                        <span style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isSel?"rgba(14,110,196,.5)":"rgba(255,255,255,.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",flexShrink:0,background:isSel?"rgba(14,110,196,.4)":"transparent"}}>
                          {String.fromCharCode(65+oi)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button className="btn bp" onClick={submitQuiz} disabled={Object.keys(quizAns).length<sel.quiz.length} style={{opacity:Object.keys(quizAns).length<sel.quiz.length?0.4:1,marginTop:4}}>
            Сдать тест ({Object.keys(quizAns).length}/{sel.quiz.length})
          </button>
        </div>
      </div>
    );
  }

  /* ══════════ VIEW: READ DOCUMENT ══════════ */
  if(view==="read"&&sel) {
    const cat=catInfo(sel.cat);
    const p=prog(sel.id);
    return (
      <div>
        <button className="btn bo" style={{marginBottom:14}} onClick={()=>{setView("list");setQuizAns({});setQuizResult(null);}}>← К библиотеке</button>
        {/* Header */}
        <div style={{background:`rgba(${cat.color?"14,110,196":"99,102,241"},.06)`,border:`1px solid rgba(14,110,196,.2)`,borderRadius:14,padding:18,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10,flexWrap:"wrap"}}>
            <div style={{width:46,height:46,borderRadius:11,background:`${cat.color||"#0E6EC4"}18`,border:`1px solid ${cat.color||"#0E6EC4"}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Manrope,sans-serif",fontSize:16,fontWeight:800,lineHeight:1.3,marginBottom:5}}>{sel.title}</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                <span style={{fontSize:11,color:"#6B7280",background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:99}}>{sel.docNum}</span>
                <span style={{fontSize:11,color:"#6B7280",background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:99}}>v{sel.version}</span>
                <span style={{fontSize:11,color:"#6B7280",background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:99}}>📅 {sel.date}</span>
                {sel.mandatory&&<span style={{fontSize:11,color:"#F59E0B",background:"rgba(245,158,11,.12)",padding:"2px 8px",borderRadius:99,border:"1px solid rgba(245,158,11,.2)"}}>⚠ Обязательный</span>}
                {p.quizDone&&<span style={{fontSize:11,color:"#22C55E",background:"rgba(34,197,94,.12)",padding:"2px 8px",borderRadius:99,border:"1px solid rgba(34,197,94,.2)"}}>✓ Пройден · {p.score}%</span>}
              </div>
            </div>
          </div>
          <div style={{fontSize:13,color:"#9CA3AF",lineHeight:1.7}}>{sel.desc}</div>
        </div>

        {/* Download card */}
        <div style={{display:"flex",alignItems:"center",gap:13,padding:"14px 16px",background:"rgba(14,110,196,.08)",border:"1px solid rgba(14,110,196,.2)",borderRadius:11,marginBottom:14}}>
          <div style={{width:46,height:46,borderRadius:10,background:"rgba(14,110,196,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📄</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13.5,fontWeight:600}}>{sel.title}</div>
            <div style={{fontSize:11.5,color:"#6B7280",marginTop:2}}>{sel.docType}{sel.docSize?` · ${sel.docSize}`:""} · {sel.docNum}</div>
          </div>
          <button onClick={()=>setProgress(p=>({...p,[sel.id]:{...prog(sel.id),read:true}}))} style={{padding:"9px 16px",borderRadius:9,fontSize:12.5,fontWeight:600,cursor:"pointer",background:"linear-gradient(135deg,#0E6EC4,#0A5BA3)",color:"#fff",border:"none",whiteSpace:"nowrap",boxShadow:"0 2px 10px rgba(14,110,196,.3)"}}>
            📥 Скачать документ
          </button>
        </div>

        {/* Progress indicator */}
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14,padding:"10px 14px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10}}>
          {[{done:p.read,label:"Документ загружен",num:1},{done:p.quizDone,label:"Тест пройден",num:2}].map(step=>(
            <div key={step.num} style={{display:"flex",alignItems:"center",gap:7,flex:1}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:step.done?"rgba(34,197,94,.2)":"rgba(255,255,255,.08)",border:`2px solid ${step.done?"#22C55E":"rgba(255,255,255,.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:step.done?"#22C55E":"#6B7280",fontWeight:700,flexShrink:0}}>
                {step.done?"✓":step.num}
              </div>
              <span style={{fontSize:12,color:step.done?"#22C55E":"#6B7280"}}>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Start quiz */}
        {!p.quizDone?(
          <div style={{textAlign:"center",padding:"18px 0"}}>
            <div style={{fontSize:13,color:"#6B7280",marginBottom:12}}>
              Ознакомьтесь с документом и пройдите тест ({sel.quiz.length} вопросов)
            </div>
            <button onClick={()=>{setQuizAns({});setQuizResult(null);setView("quiz");}} style={{padding:"11px 28px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",background:"linear-gradient(135deg,#0E6EC4,#0A5BA3)",color:"#fff",border:"none",boxShadow:"0 3px 12px rgba(14,110,196,.4)"}}>
              ✅ Пройти тест на знание
            </button>
            {p.attempts>0&&<div style={{fontSize:11.5,color:"#6B7280",marginTop:8}}>Попыток: {p.attempts} · Лучший результат: {p.score}%</div>}
          </div>
        ):(
          <div style={{padding:"14px 16px",background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",borderRadius:10,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:24}}>🎉</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5,fontWeight:600,color:"#22C55E"}}>Документ изучен и тест пройден</div>
              <div style={{fontSize:12,color:"#6B7280",marginTop:1}}>Результат: {p.score}% · Попыток: {p.attempts}</div>
            </div>
            <button onClick={()=>{setQuizAns({});setQuizResult(null);setView("quiz");}} style={{padding:"7px 14px",borderRadius:8,fontSize:12,cursor:"pointer",background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",color:"#22C55E",fontWeight:600}}>
              Пройти снова
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ══════════ VIEW: LIST ══════════ */
  const mandatoryPending = docs.filter(d=>d.mandatory&&!prog(d.id).quizDone);
  return (
    <div>
      {/* Обязательные к прочтению */}
      {!isStaff&&mandatoryPending.length>0&&(
        <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:22,flexShrink:0}}>⚠️</span>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:"#F87171"}}>Обязательных документов не изучено: {mandatoryPending.length}</div>
            <div style={{fontSize:11.5,color:"#6B7280",marginTop:1}}>Ознакомьтесь и пройдите тест в установленные сроки</div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:16}}>
        {(isStaff?[
          {v:docs.length,              l:"Всего документов",    c:"#7BBFEF"},
          {v:docs.filter(d=>d.mandatory).length, l:"Обязательных", c:"#F87171"},
          {v:docs.filter(d=>!d.mandatory).length,l:"Рекомендованных",c:"#6B7280"},
        ]:[
          {v:docs.length,   l:"Всего",             c:"#7BBFEF"},
          {v:mandatory.length,      l:"Обязательных",     c:"#F87171"},
          {v:mandatoryDone, l:"Пройдено (обяз.)",  c:"#22C55E"},
          {v:totalDone,     l:"Пройдено всего",    c:"#34D399"},
        ]).map(s=>(
          <div key={s.l} className="sc" style={{cursor:"default"}}>
            <div className="sv" style={{color:s.c}}>{s.v}</div>
            <div className="sl">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>
          {LEARN_CATS.map(cat=>(
            <button key={cat.id} onClick={()=>setCatFilter(cat.id)} style={{padding:"5px 11px",borderRadius:99,fontSize:12,fontWeight:500,cursor:"pointer",border:`1.5px solid ${catFilter===cat.id?(cat.color||"#0E6EC4")+"88":"rgba(255,255,255,.08)"}`,background:catFilter===cat.id?(cat.color||"#0E6EC4")+"18":"rgba(255,255,255,.03)",color:catFilter===cat.id?(cat.color||"#0E6EC4"):"#6B7280",transition:"all .15s"}}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
        {isStaff&&<button className="btn bp" onClick={()=>setView("add")}>+ Добавить документ</button>}
      </div>

      {/* Document list */}
      {filteredDocs.length===0&&(
        <div className="card"><div className="emp"><div className="ei">📭</div><div style={{fontWeight:600,color:"#6B7280"}}>Нет документов в этой категории</div></div></div>
      )}

      {filteredDocs.map(doc=>{
        const cat=catInfo(doc.cat);
        const p=prog(doc.id);
        const dl=deadlineLabel(doc);
        return (
          <div key={doc.id} onClick={()=>{setSelId(doc.id);setQuizAns({});setQuizResult(null);setView("read");}}
            style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",border:`1px solid ${p.quizDone?"rgba(34,197,94,.2)":doc.mandatory&&!p.quizDone?"rgba(239,68,68,.15)":"rgba(255,255,255,.07)"}`,borderRadius:12,background:p.quizDone?"rgba(34,197,94,.04)":"rgba(255,255,255,.02)",marginBottom:8,cursor:"pointer",transition:"all .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=p.quizDone?"rgba(34,197,94,.4)":"rgba(14,110,196,.35)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=p.quizDone?"rgba(34,197,94,.2)":doc.mandatory&&!p.quizDone?"rgba(239,68,68,.15)":"rgba(255,255,255,.07)"}>
            {/* Category icon */}
            <div style={{width:42,height:42,borderRadius:10,background:(cat.color||"#0E6EC4")+"18",border:`1px solid ${cat.color||"#0E6EC4"}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat.icon}</div>
            {/* Info */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13.5,fontWeight:600,marginBottom:4,display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
                {doc.title}
                {doc.mandatory&&<span style={{fontSize:10,fontWeight:600,background:"rgba(239,68,68,.12)",color:"#F87171",padding:"1px 7px",borderRadius:99,border:"1px solid rgba(239,68,68,.2)"}}>Обязательный</span>}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:11,color:"#6B7280"}}>{doc.docNum} · v{doc.version} · {doc.date}</span>
                {doc.docSize&&<span style={{fontSize:11,color:"#4B5563"}}>{doc.docType} {doc.docSize}</span>}
                {dl&&<span style={{fontSize:10.5,color:"#F59E0B"}}>⏱ {dl}</span>}
                {p.attempts>0&&!p.quizDone&&<span style={{fontSize:10.5,color:"#6B7280"}}>Попыток: {p.attempts}</span>}
              </div>
            </div>
            {/* Status */}
            {p.quizDone?(
              <span style={{fontSize:11,fontWeight:600,color:"#22C55E",background:"rgba(34,197,94,.12)",padding:"4px 10px",borderRadius:99,border:"1px solid rgba(34,197,94,.2)",flexShrink:0}}>✓ {p.score}%</span>
            ):p.read?(
              <span style={{fontSize:11,fontWeight:600,color:"#F59E0B",background:"rgba(245,158,11,.12)",padding:"4px 10px",borderRadius:99,border:"1px solid rgba(245,158,11,.2)",flexShrink:0}}>Пройти тест</span>
            ):(
              <span style={{fontSize:11,fontWeight:600,color:"#6B7280",background:"rgba(255,255,255,.06)",padding:"4px 10px",borderRadius:99,border:"1px solid rgba(255,255,255,.08)",flexShrink:0}}>Открыть</span>
            )}
            <span style={{fontSize:13,color:"#374151",flexShrink:0}}>→</span>
          </div>
        );
      })}
    </div>
  );
}


function SocialModule() {
  const [ans,setAns]=useState({});const [sub,setSub]=useState(false);
  const all=SOC_Q.every(q=>ans[q.id]);
  const avg=all?SOC_Q.reduce((s,q)=>s+ans[q.id],0)/SOC_Q.length:null;
  const col=v=>v>=4?"#34D399":v>=3?"#FCD34D":"#F87171";
  const grad=v=>v>=4?"linear-gradient(135deg,#059669,#34D399)":v>=3?"linear-gradient(135deg,#D97706,#FCD34D)":"linear-gradient(135deg,#DC2626,#F87171)";
  const blocks=[{l:"Командная включённость",ids:[1,2]},{l:"Признание и рост",ids:[3,4]},{l:"Баланс и нагрузка",ids:[5,6]},{l:"Псих. безопасность",ids:[7,8]}];
  if(sub&&avg!==null)return(<div><div className="card" style={{textAlign:"center",padding:"36px 20px"}}><div style={{fontSize:42,marginBottom:10}}>{avg>=4?"😊":avg>=3?"😐":"😟"}</div><div style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,color:"#fff"}}>Оценка завершена</div><div style={{display:"inline-block",marginTop:13,padding:"13px 26px",background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.25)",borderRadius:12}}><div style={{fontSize:11,color:"#6B7280"}}>Индекс стабильности</div><div style={{fontFamily:"Manrope,sans-serif",fontSize:38,fontWeight:900,background:grad(avg),WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{Math.round(avg*20)}<span style={{fontSize:13,WebkitTextFillColor:"#6B7280"}}>/100</span></div><div style={{fontSize:12.5,fontWeight:600,color:col(avg),marginTop:2}}>{avg>=4?"Высокая стабильность":avg>=3?"Средняя":"Требует внимания"}</div></div></div><div className="card"><div className="ct">📊 По блокам</div>{blocks.map(b=>{const sc=b.ids.reduce((s,id)=>s+(ans[id]||0),0)/b.ids.length;return(<div key={b.l} style={{marginBottom:11}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,marginBottom:4}}><span style={{fontWeight:500,color:"#E5E7EB"}}>{b.l}</span><span style={{fontWeight:700,color:col(sc)}}>{sc.toFixed(1)}/5</span></div><div className="pb"><div className="pf" style={{width:`${sc*20}%`,background:grad(sc)}}/></div></div>);})}</div><button className="btn bo" onClick={()=>{setAns({});setSub(false);}}>Снова</button></div>);
  return(<div><div className="card" style={{background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.2)",marginBottom:12}}><div style={{display:"flex",gap:9,alignItems:"flex-start"}}><span style={{fontSize:19}}>🔒</span><div><div style={{fontWeight:700,fontSize:12.5,color:"#FCD34D"}}>Анонимный опрос</div><div style={{fontSize:11.5,color:"#78716C",marginTop:2}}>Ваши ответы анонимны.</div></div></div></div><div className="card"><div className="ct">🤝 Оценка стабильности</div>{SOC_Q.map(q=>(<div className="sr" key={q.id}><div className="st">{q.text}</div><div className="sbs">{[1,2,3,4,5].map(v=><button key={v} className={`sb2 ${ans[q.id]===v?"sel":""}`} onClick={()=>setAns(a=>({...a,[q.id]:v}))}>{v}</button>)}</div></div>))}<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:13}}><span style={{fontSize:12,color:"#4B5563"}}>{Object.keys(ans).length}/{SOC_Q.length}</span><button className="btn bp" disabled={!all} onClick={()=>setSub(true)} style={{opacity:all?1:0.4}}>Результат</button></div></div></div>);
}

/* ══════════════════════════════════════════════════════════
   TICKETS MODULE — Обращения
══════════════════════════════════════════════════════════ */


function TicketsModule({user,tickets,setTickets}) {
  const isStaff = user.role==="hr"||user.role==="admin";
  const [view,setView]   = useState("list");  // "list"|"detail"|"new"
  const [selId,setSelId] = useState(null);
  const [statusF,setStatusF] = useState("all");
  const [catF,setCatF]   = useState("all");
  const [reply,setReply] = useState("");
  const [newStatus,setNewStatus] = useState("");
  const [form,setForm]   = useState({cat:"hr",priority:"medium",subject:"",body:"",isAnonymous:false});
  const [ferr,setFerr]   = useState({});

  const catMap      = Object.fromEntries(TICKET_CATS.map(c=>[c.id,c]));
  const priorityMap = Object.fromEntries(TICKET_PRIORITIES.map(p=>[p.id,p]));
  const statusMap   = Object.fromEntries(TICKET_STATUSES.map(s=>[s.id,s]));

  // filter list
  const myTickets = isStaff ? tickets : tickets.filter(t=>t.authorId===user.id);
  const filtered  = myTickets.filter(t=>{
    if(statusF!=="all"&&t.status!==statusF) return false;
    if(catF!=="all"&&t.cat!==catF)          return false;
    return true;
  }).sort((a,b)=>{
    const pOrd={high:0,medium:1,low:2};
    if(a.status==="new"&&b.status!=="new")  return -1;
    if(b.status==="new"&&a.status!=="new")  return 1;
    return (pOrd[a.priority]||1)-(pOrd[b.priority]||1);
  });

  const sel = tickets.find(t=>t.id===selId);

  const newCount = (isStaff?tickets:myTickets).filter(t=>t.status==="new").length;

  /* ── helpers ── */
  const submitNew=()=>{
    const e={};
    if(!form.subject.trim()) e.subject="Введите тему обращения";
    if(!form.body.trim())    e.body="Опишите проблему";
    if(Object.keys(e).length){setFerr(e);return;}
    const t={
      id:"tk"+uid(),
      cat:form.cat,
      priority:form.priority,
      subject:form.subject.trim(),
      body:form.body.trim(),
      authorId:user.id,
      authorName:form.isAnonymous?"Анонимно":user.name,
      status:"new",
      isAnonymous:form.isAnonymous,
      createdAt:new Date().toISOString().slice(0,10),
      messages:[],
    };
    setTickets(ts=>[t,...ts]);
    setForm({cat:"hr",priority:"medium",subject:"",body:"",isAnonymous:false});
    setFerr({});
    setView("list");
  };

  const sendReply=()=>{
    if(!reply.trim()) return;
    const msg={id:"m"+uid(),from:user.name,role:user.role,text:reply.trim(),createdAt:new Date().toISOString().slice(0,10)};
    setTickets(ts=>ts.map(t=>t.id===selId?{...t,messages:[...t.messages,msg]}:t));
    setReply("");
  };

  const changeStatus=st=>{
    setTickets(ts=>ts.map(t=>t.id===selId?{...t,status:st}:t));
  };

  /* ── shared styles ── */
  const card={background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:18,marginBottom:12};
  const inp={width:"100%",padding:"9px 12px",border:"1.5px solid rgba(255,255,255,.08)",borderRadius:9,fontSize:13,fontFamily:"Inter,sans-serif",background:"rgba(255,255,255,.04)",color:"inherit",outline:"none"};
  const inpErr={...inp,borderColor:"#EF4444"};
  const btnPrimary={padding:"9px 18px",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#0E6EC4,#0A5BA3)",color:"#fff",boxShadow:"0 2px 10px rgba(14,110,196,.3)"};
  const btnOutline={padding:"9px 16px",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"inherit"};
  const badgeStyle=(st)=>({display:"inline-flex",alignItems:"center",padding:"3px 9px",borderRadius:99,fontSize:11,fontWeight:600,background:statusMap[st]?.bg||"rgba(0,0,0,.1)",color:statusMap[st]?.color||"#9CA3AF"});
  const priBadge=(p)=>({display:"inline-flex",alignItems:"center",padding:"2px 8px",borderRadius:99,fontSize:10.5,fontWeight:600,background:priorityMap[p]?.color+"22"||"#0002",color:priorityMap[p]?.color||"#9CA3AF",border:`1px solid ${priorityMap[p]?.color||"#9CA3AF"}44`});
  const label={fontSize:10.5,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5};

  /* ══════════════ NEW TICKET FORM ══════════════ */
  if(view==="new") return (
    <div>
      <button style={{...btnOutline,marginBottom:16}} onClick={()=>setView("list")}>← Назад</button>
      <div style={card}>
        <div style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:7}}>
          ✉️ Новое обращение
        </div>

        {/* Category */}
        <div style={{marginBottom:14}}>
          <label style={label}>Категория</label>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {TICKET_CATS.map(c=>(
              <button key={c.id} onClick={()=>setForm(f=>({...f,cat:c.id}))} style={{padding:"6px 12px",borderRadius:99,fontSize:12,fontWeight:500,cursor:"pointer",border:`1px solid ${form.cat===c.id?c.color+"66":"rgba(255,255,255,.08)"}`,background:form.cat===c.id?c.color+"18":"rgba(255,255,255,.03)",color:form.cat===c.id?c.color:"#6B7280",transition:"all .15s"}}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div style={{marginBottom:14}}>
          <label style={label}>Приоритет</label>
          <div style={{display:"flex",gap:7}}>
            {TICKET_PRIORITIES.map(p=>(
              <button key={p.id} onClick={()=>setForm(f=>({...f,priority:p.id}))} style={{flex:1,padding:"7px 4px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",border:`1.5px solid ${form.priority===p.id?p.color+"88":"rgba(255,255,255,.08)"}`,background:form.priority===p.id?p.color+"18":"rgba(255,255,255,.03)",color:form.priority===p.id?p.color:"#6B7280",transition:"all .15s"}}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div style={{marginBottom:12}}>
          <label style={label}>Тема обращения *</label>
          <input style={ferr.subject?inpErr:inp} placeholder="Кратко опишите суть вопроса" value={form.subject} onChange={e=>{setForm(f=>({...f,subject:e.target.value}));setFerr(fe=>({...fe,subject:""}));}}/>
          {ferr.subject&&<div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {ferr.subject}</div>}
        </div>

        {/* Body */}
        <div style={{marginBottom:14}}>
          <label style={label}>Описание *</label>
          <textarea style={{...ferr.body?inpErr:inp,resize:"vertical",minHeight:100}} placeholder="Подробно опишите вашу ситуацию или вопрос..." value={form.body} onChange={e=>{setForm(f=>({...f,body:e.target.value}));setFerr(fe=>({...fe,body:""}));}}/>
          {ferr.body&&<div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {ferr.body}</div>}
        </div>

        {/* Anonymous */}
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,marginBottom:16}}>
          <div onClick={()=>setForm(f=>({...f,isAnonymous:!f.isAnonymous}))} style={{width:34,height:19,borderRadius:99,background:form.isAnonymous?"#F59E0B":"rgba(255,255,255,.1)",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
            <div style={{position:"absolute",top:2.5,left:form.isAnonymous?16:2.5,width:14,height:14,background:"#fff",borderRadius:"50%",transition:"left .2s"}}/>
          </div>
          <div>
            <div style={{fontSize:12.5,fontWeight:600,color:"#FCD34D"}}>Анонимное обращение</div>
            <div style={{fontSize:11,color:"#78716C",marginTop:1}}>Ваше имя не будет видно HR при рассмотрении</div>
          </div>
        </div>

        <div style={{display:"flex",gap:9,justifyContent:"flex-end"}}>
          <button style={btnOutline} onClick={()=>setView("list")}>Отмена</button>
          <button style={btnPrimary} onClick={submitNew}>📨 Отправить обращение</button>
        </div>
      </div>
    </div>
  );

  /* ══════════════ TICKET DETAIL ══════════════ */
  if(view==="detail"&&sel) {
    const cat=catMap[sel.cat]||{color:"#6B7280",icon:"📌"};
    const pri=priorityMap[sel.priority]||{label:"—",color:"#6B7280"};
    return (
      <div>
        <button style={{...btnOutline,marginBottom:16}} onClick={()=>setView("list")}>← К списку</button>

        {/* Header card */}
        <div style={{...card,borderColor:cat.color+"44",background:`${cat.color}08`}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
            <div style={{width:42,height:42,borderRadius:11,background:cat.color+"18",border:`1px solid ${cat.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"Manrope,sans-serif",fontSize:16,fontWeight:800,marginBottom:5,lineHeight:1.3}}>{sel.subject}</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                <span style={badgeStyle(sel.status)}>{statusMap[sel.status]?.label||sel.status}</span>
                <span style={priBadge(sel.priority)}>↑ {pri.label}</span>
                <span style={{fontSize:11,color:"#6B7280"}}>{cat.label}</span>
                <span style={{fontSize:11,color:"#6B7280"}}>📅 {fmtDate(sel.createdAt)}</span>
                {sel.isAnonymous&&<span style={{fontSize:11,color:"#FCD34D",background:"rgba(245,158,11,.1)",padding:"1px 7px",borderRadius:99,border:"1px solid rgba(245,158,11,.2)"}}>🔒 Анонимно</span>}
              </div>
            </div>
            {/* Status change for staff */}
            {isStaff&&(
              <select value={sel.status} onChange={e=>changeStatus(e.target.value)} style={{padding:"6px 10px",borderRadius:8,fontSize:12,fontWeight:600,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"inherit",cursor:"pointer",outline:"none"}}>
                {TICKET_STATUSES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            )}
          </div>
          {!sel.isAnonymous&&(
            <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:avatarGrad(sel.authorName),display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",flexShrink:0}}>{getInitials(sel.authorName)}</div>
              <div style={{fontSize:12.5,fontWeight:500}}>{sel.authorName}</div>
            </div>
          )}
        </div>

        {/* Original message */}
        <div style={card}>
          <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:.6,marginBottom:8}}>Обращение</div>
          <div style={{fontSize:13.5,lineHeight:1.7,color:"inherit"}}>{sel.body}</div>
        </div>

        {/* Messages thread */}
        {sel.messages.length>0&&(
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>Переписка</div>
            {sel.messages.map(msg=>{
              const isHR=msg.role==="hr"||msg.role==="admin";
              return (
                <div key={msg.id} style={{display:"flex",gap:10,marginBottom:12,flexDirection:isHR?"row":"row-reverse"}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:isHR?"linear-gradient(135deg,#0E6EC4,#0A5BA3)":avatarGrad(msg.from),display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {isHR?"HR":getInitials(msg.from)}
                  </div>
                  <div style={{flex:1,maxWidth:"80%"}}>
                    <div style={{fontSize:11,color:"#6B7280",marginBottom:4,textAlign:isHR?"left":"right"}}>
                      {msg.from} · {fmtDate(msg.createdAt)}
                    </div>
                    <div style={{background:isHR?"rgba(14,110,196,.12)":"rgba(255,255,255,.06)",border:`1px solid ${isHR?"rgba(14,110,196,.25)":"rgba(255,255,255,.1)"}`,borderRadius:isHR?"4px 12px 12px 12px":"12px 4px 12px 12px",padding:"10px 14px",fontSize:13,lineHeight:1.6}}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reply box */}
        {sel.status!=="closed"&&(
          <div style={card}>
            <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:.6,marginBottom:9}}>
              {isStaff?"Ответить сотруднику":"Добавить комментарий"}
            </div>
            <textarea style={{...inp,resize:"vertical",minHeight:80,marginBottom:10}} placeholder={isStaff?"Напишите ответ сотруднику...":"Добавьте уточнение к обращению..."} value={reply} onChange={e=>setReply(e.target.value)}/>
            <div style={{display:"flex",justifyContent:"flex-end",gap:9}}>
              {isStaff&&sel.status==="in_progress"&&(
                <button style={{...btnOutline,background:"rgba(34,197,94,.1)",borderColor:"rgba(34,197,94,.25)",color:"#22C55E"}} onClick={()=>{changeStatus("resolved");if(reply.trim())sendReply();}}>
                  ✓ Отметить решённым
                </button>
              )}
              {isStaff&&sel.status==="new"&&(
                <button style={{...btnOutline,background:"rgba(245,158,11,.1)",borderColor:"rgba(245,158,11,.25)",color:"#F59E0B"}} onClick={()=>changeStatus("in_progress")}>
                  ▶ Взять в работу
                </button>
              )}
              <button style={{\...btnPrimary,opacity:reply.trim()?1:0.45,cursor:reply.trim()?"pointer":"not-allowed"}} onClick={sendReply} disabled={!reply.trim()} >
                Отправить
              </button>
            </div>
          </div>
        )}
        {sel.status==="closed"&&(
          <div style={{padding:"12px 16px",background:"rgba(107,114,128,.1)",border:"1px solid rgba(107,114,128,.2)",borderRadius:10,fontSize:12.5,color:"#6B7280",textAlign:"center"}}>
            Обращение закрыто
          </div>
        )}
      </div>
    );
  }

  /* ══════════════ LIST ══════════════ */
  const stats = isStaff ? [
    {v:tickets.filter(t=>t.status==="new").length,        l:"Новых",      c:"#7BBFEF"},
    {v:tickets.filter(t=>t.status==="in_progress").length,l:"В работе",   c:"#F59E0B"},
    {v:tickets.filter(t=>t.status==="resolved").length,   l:"Решено",     c:"#22C55E"},
    {v:tickets.filter(t=>t.priority==="high").length,     l:"Высокий приоритет",c:"#EF4444"},
  ] : [
    {v:myTickets.length,                                         l:"Всего",      c:"#7BBFEF"},
    {v:myTickets.filter(t=>t.status==="new").length,             l:"Ожидают",    c:"#F59E0B"},
    {v:myTickets.filter(t=>t.status==="in_progress").length,     l:"В работе",   c:"#7BBFEF"},
    {v:myTickets.filter(t=>t.status==="resolved").length,        l:"Решено",     c:"#22C55E"},
  ];

  return (
    <div>
      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:16}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:13,padding:"14px 10px",textAlign:"center"}}>
            <div style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
            <div style={{fontSize:11,color:"#6B7280",marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{padding:"6px 10px",borderRadius:8,fontSize:12,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"inherit",cursor:"pointer",outline:"none"}}>
          <option value="all">Все статусы</option>
          {TICKET_STATUSES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <select value={catF} onChange={e=>setCatF(e.target.value)} style={{padding:"6px 10px",borderRadius:8,fontSize:12,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"inherit",cursor:"pointer",outline:"none"}}>
          <option value="all">Все категории</option>
          {TICKET_CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
        </select>
        <div style={{flex:1}}/>
        {!isStaff&&(
          <button style={btnPrimary} onClick={()=>setView("new")}>+ Новое обращение</button>
        )}
      </div>

      {/* Tickets list */}
      {filtered.length===0&&(
        <div style={card}><div style={{textAlign:"center",padding:"32px 20px",color:"#4B5563"}}>
          <div style={{fontSize:32,marginBottom:8}}>📭</div>
          <div style={{fontWeight:600}}>Нет обращений</div>
          {!isStaff&&<div style={{fontSize:12.5,marginTop:4}}>Нажмите «+ Новое обращение» чтобы создать</div>}
        </div></div>
      )}

      {filtered.map(t=>{
        const cat=catMap[t.cat]||{color:"#6B7280",icon:"📌",label:"Другое"};
        const pri=priorityMap[t.priority]||{};
        const unanswered=isStaff&&t.messages.length===0&&t.status==="new";
        return (
          <div key={t.id} onClick={()=>{setSelId(t.id);setView("detail");}} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 15px",border:`1px solid ${unanswered?"rgba(14,110,196,.3)":"rgba(255,255,255,.07)"}`,borderRadius:12,background:unanswered?"rgba(14,110,196,.05)":"rgba(255,255,255,.02)",marginBottom:8,cursor:"pointer",transition:"all .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(14,110,196,.4)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=unanswered?"rgba(14,110,196,.3)":"rgba(255,255,255,.07)"}>
            <div style={{width:38,height:38,borderRadius:10,background:cat.color+"18",border:`1px solid ${cat.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{cat.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontSize:13.5,fontWeight:600,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.subject}</span>
                {unanswered&&<span style={{fontSize:10,fontWeight:700,background:"rgba(14,110,196,.2)",color:"#7BBFEF",padding:"2px 7px",borderRadius:99,border:"1px solid rgba(14,110,196,.3)",flexShrink:0}}>Ожидает ответа</span>}
              </div>
              <div style={{fontSize:11.5,color:"#6B7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:6}}>{t.body}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                <span style={badgeStyle(t.status)}>{statusMap[t.status]?.label||t.status}</span>
                <span style={priBadge(t.priority)}>{pri.label}</span>
                <span style={{fontSize:10.5,color:"#6B7280"}}>{cat.label}</span>
                {isStaff&&!t.isAnonymous&&<span style={{fontSize:10.5,color:"#6B7280"}}>· {t.authorName}</span>}
                {t.isAnonymous&&<span style={{fontSize:10.5,color:"#FCD34D"}}>🔒 Анонимно</span>}
                <span style={{fontSize:10.5,color:"#4B5563",marginLeft:"auto"}}>{fmtDate(t.createdAt)}</span>
                {t.messages.length>0&&<span style={{fontSize:10.5,color:"#6B7280"}}>💬 {t.messages.length}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROFILE MODULE
══════════════════════════════════════════════════════════ */

function ProfileModule({user, setUser, employees, setEmployees}) {
  const [tab, setTab]     = useState("info");   // "info" | "password"
  const [edit, setEdit]   = useState(false);
  const [form, setForm]   = useState({
    name:  user.name,
    pos:   user.pos,
    dept:  user.dept,
    phone: user.phone,
  });
  const [ferr, setFerr]   = useState({});
  const [saved, setSaved] = useState(false);

  // Password form
  const [pwd, setPwd]     = useState({current:"", newPwd:"", confirm:""});
  const [perr, setPerr]   = useState({});
  const [pSaved, setPSaved] = useState(false);
  const [showPwd, setShowPwd] = useState({current:false, newPwd:false, confirm:false});

  const roleLabel = {admin:"Администратор", hr:"HR-менеджер", employee:"Сотрудник"};
  const roleBg    = {admin:"linear-gradient(135deg,#EF4444,#F97316)", hr:"linear-gradient(135deg,#0E6EC4,#0A5BA3)", employee:"linear-gradient(135deg,#22C55E,#0EA5E9)"};

  const validateInfo = () => {
    const e = {};
    if(!form.name.trim())  e.name  = "Введите ФИО";
    if(!form.pos.trim())   e.pos   = "Введите должность";
    if(!form.phone.trim()) e.phone = "Введите телефон";
    setFerr(e);
    return !Object.keys(e).length;
  };

  const saveInfo = () => {
    if(!validateInfo()) return;
    const updated = {...user, name:form.name.trim(), pos:form.pos.trim(), dept:form.dept, phone:form.phone.trim()};
    setUser(updated);
    // update in employees list if employee role
    if(user.role === "employee") {
      setEmployees(es => es.map(e => e.id === user.id ? {...e, ...updated} : e));
    }
    setEdit(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const validatePwd = () => {
    const e = {};
    if(!pwd.current.trim())         e.current = "Введите текущий пароль";
    if(pwd.newPwd.length < 8)       e.newPwd  = "Минимум 8 символов";
    if(pwd.newPwd !== pwd.confirm)  e.confirm = "Пароли не совпадают";
    if(pwd.newPwd === pwd.current && pwd.current) e.newPwd = "Новый пароль должен отличаться";
    setPerr(e);
    return !Object.keys(e).length;
  };

  const savePwd = () => {
    if(!validatePwd()) return;
    setPwd({current:"", newPwd:"", confirm:""});
    setPerr({});
    setPSaved(true);
    setTimeout(() => setPSaved(false), 3000);
  };

  const fmtPhone = v => {
    const d = v.replace(/\D/g,"").slice(0,11);
    if(!d.length) return "";
    let r = "+7";
    if(d.length > 1) r += " (" + d.slice(1,4);
    if(d.length > 4) r += ") " + d.slice(4,7);
    if(d.length > 7) r += "-" + d.slice(7,9);
    if(d.length > 9) r += "-" + d.slice(9,11);
    return r;
  };

  const inp   = {width:"100%",padding:"10px 12px",border:"1.5px solid rgba(255,255,255,.08)",borderRadius:9,fontSize:13,fontFamily:"Inter,sans-serif",background:"rgba(255,255,255,.04)",color:"inherit",outline:"none",transition:"border-color .15s"};
  const inpF  = {...inp, borderColor:"#0E6EC4"};
  const inpE  = {...inp, borderColor:"#EF4444"};
  const lbl   = {fontSize:10.5,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5};
  const pwdWrap = {position:"relative"};
  const eyeBtn  = {position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#6B7280",fontSize:15,padding:0,lineHeight:1};

  const strengthScore = p => {
    let s = 0;
    if(p.length >= 8)  s++;
    if(p.length >= 12) s++;
    if(/[A-Z]/.test(p)) s++;
    if(/[0-9]/.test(p)) s++;
    if(/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strength = strengthScore(pwd.newPwd);
  const strengthLabel = ["","Очень слабый","Слабый","Средний","Сильный","Надёжный"][strength] || "";
  const strengthColor = ["","#EF4444","#F97316","#F59E0B","#22C55E","#22C55E"][strength] || "#6B7280";

  return (
    <div>
      {/* Profile header */}
      <div style={{background:"linear-gradient(135deg,rgba(14,110,196,.15),rgba(14,110,196,.05))",border:"1px solid rgba(14,110,196,.2)",borderRadius:16,padding:22,marginBottom:18,display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
        <div style={{width:70,height:70,borderRadius:"50%",background:avatarGrad(user.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",boxShadow:"0 0 0 3px rgba(14,110,196,.3)",flexShrink:0}}>
          {getInitials(user.name)}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:20,fontWeight:800,marginBottom:4}}>{user.name}</div>
          <div style={{fontSize:13,color:"#9CA3AF",marginBottom:8}}>{user.pos} · {user.dept}</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <span className="badge bb">📱 {user.phone}</span>
            <span style={{display:"inline-flex",alignItems:"center",padding:"2px 10px",borderRadius:99,fontSize:11,fontWeight:600,background:roleBg[user.role]+"33",color:user.role==="admin"?"#FCA5A5":user.role==="hr"?"#7BBFEF":"#6EE7B7"}}>{roleLabel[user.role]}</span>
            <span className="badge bgr">📅 {daysSince(user.joinDate)} дней в компании</span>
          </div>
        </div>
        {saved && (
          <div style={{padding:"8px 14px",background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.25)",borderRadius:9,fontSize:12.5,fontWeight:600,color:"#22C55E",flexShrink:0}}>
            ✓ Данные сохранены
          </div>
        )}
        {pSaved && (
          <div style={{padding:"8px 14px",background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.25)",borderRadius:9,fontSize:12.5,fontWeight:600,color:"#22C55E",flexShrink:0}}>
            ✓ Пароль изменён
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{marginBottom:18}}>
        <button className={`tb ${tab==="info"?"act":""}`}    onClick={()=>{setTab("info");setEdit(false);}}>👤 Личные данные</button>
        <button className={`tb ${tab==="password"?"act":""}`} onClick={()=>setTab("password")}>🔐 Смена пароля</button>
      </div>

      {/* ══ TAB: INFO ══ */}
      {tab==="info" && (
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div className="ct" style={{marginBottom:0}}>Личная информация</div>
            {!edit
              ? <button className="btn bo" onClick={()=>setEdit(true)}>✏️ Редактировать</button>
              : <div style={{display:"flex",gap:8}}>
                  <button className="btn bo" onClick={()=>{setEdit(false);setForm({name:user.name,pos:user.pos,dept:user.dept,phone:user.phone});setFerr({});}}>Отмена</button>
                  <button className="btn bp" onClick={saveInfo}>💾 Сохранить</button>
                </div>
            }
          </div>

          {edit ? (
            <div style={{display:"grid",gap:14}}>
              <div>
                <label style={lbl}>ФИО *</label>
                <input style={ferr.name?inpE:inpF} value={form.name} onChange={e=>{setForm(f=>({...f,name:e.target.value}));setFerr(er=>({...er,name:""}));}}
                  placeholder="Иванов Иван Иванович"/>
                {ferr.name && <div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {ferr.name}</div>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  <label style={lbl}>Должность *</label>
                  <input style={ferr.pos?inpE:inpF} value={form.pos} onChange={e=>{setForm(f=>({...f,pos:e.target.value}));setFerr(er=>({...er,pos:""}));}}
                    placeholder="Менеджер по продукту"/>
                  {ferr.pos && <div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {ferr.pos}</div>}
                </div>
                <div>
                  <label style={lbl}>Отдел</label>
                  <select style={inpF} value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))}>
                    {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={lbl}>Номер телефона *</label>
                <input style={ferr.phone?inpE:inpF} type="tel" value={form.phone}
                  onChange={e=>{setForm(f=>({...f,phone:fmtPhone(e.target.value)}));setFerr(er=>({...er,phone:""}));}}
                  placeholder="+7 (___) ___-__-__"/>
                {ferr.phone && <div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {ferr.phone}</div>}
              </div>
            </div>
          ) : (
            <div>
              {[
                {icon:"👤", label:"ФИО",         val:user.name},
                {icon:"💼", label:"Должность",    val:user.pos},
                {icon:"🏢", label:"Отдел",        val:user.dept},
                {icon:"📱", label:"Телефон",       val:user.phone},
                {icon:"📅", label:"Дата выхода",   val:fmtDate(user.joinDate)},
                {icon:"🎭", label:"Роль",          val:roleLabel[user.role]},
              ].map(row=>(
                <div key={row.label} className="ir" style={{gap:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                    <div style={{width:32,height:32,borderRadius:8,background:"rgba(14,110,196,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{row.icon}</div>
                    <div>
                      <div style={{fontSize:10.5,color:"#6B7280",textTransform:"uppercase",letterSpacing:.5,fontWeight:600,marginBottom:1}}>{row.label}</div>
                      <div style={{fontSize:13.5,fontWeight:500}}>{row.val}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: PASSWORD ══ */}
      {tab==="password" && (
        <div className="card">
          <div className="ct" style={{marginBottom:18}}>🔐 Изменение пароля</div>

          <div style={{background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,padding:"11px 14px",marginBottom:18,fontSize:12.5,color:"#FCD34D"}}>
            ⚠ Пароль должен содержать минимум 8 символов. Рекомендуем использовать буквы, цифры и спецсимволы.
          </div>

          <div style={{display:"grid",gap:14,maxWidth:480}}>
            {/* Current password */}
            <div>
              <label style={lbl}>Текущий пароль *</label>
              <div style={pwdWrap}>
                <input style={{...(perr.current?inpE:inp),paddingRight:38}} type={showPwd.current?"text":"password"} value={pwd.current}
                  onChange={e=>{setPwd(p=>({...p,current:e.target.value}));setPerr(er=>({...er,current:""}));}}
                  placeholder="Введите текущий пароль"/>
                <button style={eyeBtn} onClick={()=>setShowPwd(s=>({...s,current:!s.current}))}>{showPwd.current?"🙈":"👁"}</button>
              </div>
              {perr.current && <div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {perr.current}</div>}
            </div>

            <div className="div"/>

            {/* New password */}
            <div>
              <label style={lbl}>Новый пароль *</label>
              <div style={pwdWrap}>
                <input style={{...(perr.newPwd?inpE:inp),paddingRight:38}} type={showPwd.newPwd?"text":"password"} value={pwd.newPwd}
                  onChange={e=>{setPwd(p=>({...p,newPwd:e.target.value}));setPerr(er=>({...er,newPwd:""}));}}
                  placeholder="Минимум 8 символов"/>
                <button style={eyeBtn} onClick={()=>setShowPwd(s=>({...s,newPwd:!s.newPwd}))}>{showPwd.newPwd?"🙈":"👁"}</button>
              </div>
              {perr.newPwd && <div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {perr.newPwd}</div>}
              {/* Strength bar */}
              {pwd.newPwd && (
                <div style={{marginTop:8}}>
                  <div style={{display:"flex",gap:4,marginBottom:4}}>
                    {[1,2,3,4,5].map(i=>(
                      <div key={i} style={{flex:1,height:3,borderRadius:99,background:i<=strength?strengthColor:"rgba(255,255,255,.08)",transition:"background .2s"}}/>
                    ))}
                  </div>
                  <div style={{fontSize:11,color:strengthColor,fontWeight:600}}>{strengthLabel}</div>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label style={lbl}>Подтверждение пароля *</label>
              <div style={pwdWrap}>
                <input style={{...(perr.confirm?inpE:inp),paddingRight:38}} type={showPwd.confirm?"text":"password"} value={pwd.confirm}
                  onChange={e=>{setPwd(p=>({...p,confirm:e.target.value}));setPerr(er=>({...er,confirm:""}));}}
                  placeholder="Повторите новый пароль"/>
                <button style={eyeBtn} onClick={()=>setShowPwd(s=>({...s,confirm:!s.confirm}))}>{showPwd.confirm?"🙈":"👁"}</button>
              </div>
              {perr.confirm && <div style={{fontSize:11,color:"#F87171",marginTop:3}}>⚠ {perr.confirm}</div>}
              {pwd.confirm && pwd.newPwd && pwd.confirm===pwd.newPwd && (
                <div style={{fontSize:11,color:"#22C55E",marginTop:3}}>✓ Пароли совпадают</div>
              )}
            </div>

            <div style={{paddingTop:4}}>
              <button className="btn bp" onClick={savePwd} style={{padding:"11px 24px"}}>
                🔐 Сменить пароль
              </button>
            </div>

            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#6B7280",marginBottom:7}}>Требования к паролю:</div>
              {[
                {rule:"Минимум 8 символов",      ok:pwd.newPwd.length>=8},
                {rule:"Заглавные буквы (A–Z)",   ok:/[A-Z]/.test(pwd.newPwd)},
                {rule:"Цифры (0–9)",              ok:/[0-9]/.test(pwd.newPwd)},
                {rule:"Спецсимволы (!@#$...)",   ok:/[^A-Za-z0-9]/.test(pwd.newPwd)},
              ].map(r=>(
                <div key={r.rule} style={{display:"flex",alignItems:"center",gap:7,padding:"3px 0",fontSize:12}}>
                  <span style={{fontSize:11,color:pwd.newPwd?(r.ok?"#22C55E":"#EF4444"):"#374151"}}>{pwd.newPwd?(r.ok?"✓":"✕"):"○"}</span>
                  <span style={{color:pwd.newPwd?(r.ok?"#22C55E":"#6B7280"):"#4B5563"}}>{r.rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SurveysModule({user}) {
  const [list,setList]=useState([
    {id:uid(),title:"Опрос удовлетворённости",description:"Ежеквартальный",status:"published",questions:[{id:uid(),type:"scale",text:"Насколько вы довольны атмосферой?",required:true,options:[]},{id:uid(),type:"text",text:"Что можно улучшить?",required:false,options:[]}]},
    {id:"soc-survey",title:"Социальная стабильность — II кв. 2026",description:"Анонимный опрос психологического климата",status:"published",isAnonymous:true,questions:[
      {id:uid(),type:"scale",text:"Я чувствую себя частью команды",required:true,options:[]},
      {id:uid(),type:"scale",text:"У меня есть коллеги, которым я доверяю",required:true,options:[]},
      {id:uid(),type:"scale",text:"Моя работа ценится руководством",required:true,options:[]},
      {id:uid(),type:"scale",text:"Я понимаю перспективы своего роста",required:true,options:[]},
      {id:uid(),type:"scale",text:"Мой уровень нагрузки комфортен",required:true,options:[]},
      {id:uid(),type:"scale",text:"Я доволен балансом работы и жизни",required:true,options:[]},
      {id:uid(),type:"scale",text:"В компании есть психологическая безопасность",required:true,options:[]},
      {id:uid(),type:"nps",text:"Насколько вы готовы рекомендовать компанию как работодателя?",required:true,options:[]},
    ]},
  ]);
  const [edit,setEdit]=useState(null);const [foc,setFoc]=useState(null);const [prev,setPrev]=useState(null);
  const canEdit=user.role==="hr"||user.role==="admin";
  const cur=list.find(s=>s.id===edit);
  const upd=p=>setList(ss=>ss.map(s=>s.id===edit?{...s,...p}:s));
  const updQ=q=>upd({questions:cur.questions.map(x=>x.id===q.id?q:x)});
  const delQ=id=>upd({questions:cur.questions.filter(q=>q.id!==id)});
  const dupQ=q=>{const i=cur.questions.findIndex(x=>x.id===q.id);const c={...q,id:uid()};const n=[...cur.questions];n.splice(i+1,0,c);upd({questions:n});};
  const addQ=t=>{const q=newQ(t);upd({questions:[...cur.questions,q]});setFoc(q.id);};
  const [pans,setPans]=useState({});const [pdone,setPdone]=useState(false);
  if(prev){
    if(pdone)return(<div className="mlov"><div className="ml" style={{textAlign:"center",padding:42}}><div style={{fontSize:46,marginBottom:12}}>🎉</div><div style={{fontFamily:"Manrope,sans-serif",fontSize:19,fontWeight:800,color:"#fff",marginBottom:7}}>Спасибо!</div><button className="btn bo" onClick={()=>{setPrev(null);setPdone(false);setPans({});}}>Закрыть</button></div></div>);
    return(<div className="mlov" onClick={()=>setPrev(null)}><div className="ml" onClick={e=>e.stopPropagation()}><div className="mlh"><div><div style={{fontFamily:"Manrope,sans-serif",fontSize:16,fontWeight:800,color:"#fff"}}>{prev.title||"Без названия"}</div>{prev.description&&<div style={{fontSize:12,color:"#6B7280",marginTop:2}}>{prev.description}</div>}</div><button className="mlclose" onClick={()=>setPrev(null)}>✕</button></div>{prev.questions.map((q,i)=>(<div key={q.id} style={{marginBottom:15}}><div style={{fontWeight:600,fontSize:13,color:"#E5E7EB",marginBottom:7}}>{i+1}. {q.text||"(без текста)"}{q.required&&<span style={{color:"#F87171",marginLeft:3}}>*</span>}</div>{q.type==="text"&&<textarea className="ta" value={pans[q.id]||""} onChange={e=>setPans(a=>({...a,[q.id]:e.target.value}))} style={{minHeight:60}}/>}{(q.type==="radio"||q.type==="yesno")&&(q.type==="yesno"?["Да","Нет"]:q.options).map(o=>(<label key={o} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",cursor:"pointer",color:"#D1D5DB",fontSize:12.5}}><input type="radio" name={q.id} checked={pans[q.id]===o} onChange={()=>setPans(a=>({...a,[q.id]:o}))}/>{o}</label>))}{q.type==="checkbox"&&q.options.map(o=>{const s=pans[q.id]||[];return(<label key={o} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",cursor:"pointer",color:"#D1D5DB",fontSize:12.5}}><input type="checkbox" checked={s.includes(o)} onChange={()=>setPans(a=>{const c=a[q.id]||[];return{...a,[q.id]:c.includes(o)?c.filter(x=>x!==o):[...c,o]};})}/>{o}</label>);})} {q.type==="scale"&&<div className="sbs">{[1,2,3,4,5].map(v=><button key={v} className={`sb2 ${pans[q.id]===v?"sel":""}`} onClick={()=>setPans(a=>({...a,[q.id]:v}))}>{v}</button>)}</div>}{q.type==="nps"&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{[0,1,2,3,4,5,6,7,8,9,10].map(v=><button key={v} className={`sb2 ${pans[q.id]===v?"sel":""}`} style={{width:34}} onClick={()=>setPans(a=>({...a,[q.id]:v}))}>{v}</button>)}</div>}</div>))}<div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><button className="btn bp" onClick={()=>setPdone(true)}>Отправить</button></div></div></div>);
  }
  if(edit&&cur) return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:13,flexWrap:"wrap"}}>
        <button className="btn bo" onClick={()=>setEdit(null)}>← Список</button>
        <button className="btn bo" onClick={()=>setPrev(cur)}>👁 Превью</button>
        {canEdit&&<button className="btn bp" style={{marginLeft:"auto"}} onClick={()=>{upd({status:"published"});setEdit(null);}}>{cur.status==="published"?"✓ Опубликован":"Опубликовать"}</button>}
      </div>
      {canEdit?(
        <div>
          <div className="card" style={{marginBottom:13}}>
            <input className="svrinp big" placeholder="Название опроса..." value={cur.title} onChange={e=>upd({title:e.target.value})}/>
            <input className="svrinp" placeholder="Описание..." value={cur.description} onChange={e=>upd({description:e.target.value})} style={{marginBottom:0}}/>
          </div>
          <div className="sbl">
            <div className="sbp">
              <div className="spt">Добавить вопрос</div>
              {Q_TYPES.map(qt=>(<button key={qt.type} className="qtb" onClick={()=>addQ(qt.type)}><span style={{fontSize:14,width:18}}>{qt.icon}</span><div><div style={{fontWeight:600,fontSize:11.5}}>{qt.label}</div><div style={{fontSize:10,color:"#4B5563"}}>{qt.hint}</div></div></button>))}
              <div className="div"/>
              <div className="spt">Статистика</div>
              {[["Вопросов",cur.questions.length],["Обязательных",cur.questions.filter(q=>q.required).length]].map(([k,v])=>(<div className="ir" key={k} style={{padding:"5px 0"}}><span style={{fontSize:11.5,color:"#6B7280"}}>{k}</span><span style={{fontSize:11.5,fontWeight:700,color:"#E5E7EB"}}>{v}</span></div>))}
            </div>
            <div>
              {cur.questions.length===0&&<div className="card"><div className="emp"><div className="ei">💡</div><div style={{fontWeight:600,color:"#6B7280"}}>Добавьте первый вопрос</div></div></div>}
              {cur.questions.map((q,i)=>{
                const uo=(idx,v)=>updQ({...q,options:q.options.map((o,j)=>j===idx?v:o)});
                const ro=idx=>updQ({...q,options:q.options.filter((_,j)=>j!==idx)});
                const tl=Q_TYPES.find(t=>t.type===q.type)?.label||q.type;
                return(<div key={q.id} className={`qc ${foc===q.id?"foc":""}`} onClick={()=>setFoc(q.id)}><div className="qh"><span className="dh">⠿</span><div className="qnum">{i+1}</div><span className="qtag">{tl}</span><div className="qa"><button className="btn bo bsm bi" onClick={e=>{e.stopPropagation();dupQ(q);}}>⧉</button><button className="btn bd bsm bi" onClick={e=>{e.stopPropagation();delQ(q.id);}}>✕</button></div></div><input className="qi2" placeholder="Текст вопроса..." value={q.text} onChange={e=>updQ({...q,text:e.target.value})} onClick={e=>e.stopPropagation()}/>{(q.type==="radio"||q.type==="checkbox")&&(<div>{q.options.map((o,oi)=>(<div className="optrow" key={oi}><div className={`optbullet ${q.type==="checkbox"?"sq":""}`}/><input className="optinp" value={o} onChange={e=>uo(oi,e.target.value)}/><button className="optdel" onClick={()=>ro(oi)}>×</button></div>))}<button className="addoptbtn" onClick={()=>updQ({...q,options:[...q.options,`Вариант ${q.options.length+1}`]})}>+ Добавить</button></div>)}{q.type==="scale"&&<div className="scaleprev">{[1,2,3,4,5].map(v=><div key={v} className="scalebtn">{v}</div>)}</div>}{q.type==="nps"&&<div className="scaleprev">{[0,1,2,3,4,5,6,7,8,9,10].map(v=><div key={v} className="scalebtn">{v}</div>)}</div>}{q.type==="yesno"&&<div style={{display:"flex",gap:6,marginTop:7}}>{["Да","Нет"].map(v=><div key={v} style={{padding:"5px 14px",border:"1px solid rgba(255,255,255,.08)",borderRadius:7,fontSize:12,color:"#6B7280",background:"rgba(255,255,255,.03)"}}>{v}</div>)}</div>}{q.type==="text"&&<input className="qi2 hint" placeholder="Поле ответа..." disabled style={{marginTop:6}}/>}<div style={{display:"flex",alignItems:"center",gap:7,marginTop:10}}><div onClick={e=>{e.stopPropagation();updQ({...q,required:!q.required});}} style={{width:32,height:18,borderRadius:99,background:q.required?"#6366F1":"rgba(255,255,255,.1)",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}><div style={{position:"absolute",top:2,left:q.required?15:2,width:14,height:14,background:"#fff",borderRadius:"50%",transition:"left .2s"}}/></div><span style={{fontSize:11,color:"#4B5563"}}>Обязательный</span></div></div>);
              })}
            </div>
          </div>
        </div>
      ):(<div className="card"><div className="emp"><div className="ei">🔒</div><div style={{fontWeight:600,color:"#6B7280"}}>Только HR редактирует опросы</div></div></div>)}
    </div>
  );
  return(<div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}><div style={{fontSize:12.5,color:"#6B7280"}}>Опросов: <strong style={{color:"#E5E7EB"}}>{list.length}</strong></div>{canEdit&&<button className="btn bp" onClick={()=>{const s={id:uid(),title:"",description:"",status:"draft",questions:[]};setList(ss=>[...ss,s]);setEdit(s.id);}}>+ Новый</button>}</div>{list.length===0&&<div className="card"><div className="emp"><div className="ei">📝</div><div style={{fontWeight:600,color:"#6B7280"}}>Нет опросов</div></div></div>}{list.map(s=>(<div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",border:"1px solid rgba(255,255,255,.06)",borderRadius:11,background:"rgba(255,255,255,.02)",marginBottom:7,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(99,102,241,.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.06)"}><div style={{fontSize:20,width:36,height:36,background:"rgba(99,102,241,.12)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>📝</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title||"Без названия"}</div><div style={{fontSize:11,color:"#4B5563",marginTop:2}}>{s.questions.length} вопр. · {s.description}</div></div><span className={`badge ${s.status==="published"?"bg":"bgr"}`}>{s.status==="published"?"Опубликован":"Черновик"}</span><button className="btn bo bsm" onClick={()=>setPrev(s)}>👁</button>{canEdit&&<button className="btn bp bsm" onClick={()=>setEdit(s.id)}>Открыть</button>}{canEdit&&<button className="btn bd bi bsm" onClick={()=>setList(ls=>ls.filter(x=>x.id!==s.id))}>✕</button>}</div>))}</div>);
}

function Dashboard({user,go,employees,news}) {
  const firstName=user.name.split(" ")[1]||user.name.split(" ")[0];
  const pinned=news.filter(n=>n.pinned).length;
  const empNoAdapt=employees.filter(e=>!e.adaptTasks.length).length;
  const empInAdapt=employees.filter(e=>e.adaptTasks.length&&e.adaptTasks.some(t=>!t.done)).length;
  const empDone=employees.filter(e=>e.adaptTasks.length&&e.adaptTasks.every(t=>t.done)).length;
  const [newsFilter,setNewsFilter]=useState("all");
  const roleBg={admin:"linear-gradient(135deg,#EF4444,#F97316)",hr:"linear-gradient(135deg,#0E6EC4,#0A5BA3)",employee:"linear-gradient(135deg,#10B981,#0EA5E9)"};
  const roleLabel={admin:"Администратор",hr:"HR-менеджер",employee:"Сотрудник"};

  const empModules=[
    {icon:"🌱",label:"Адаптация",    mod:"adaptation", c:"#22C55E"},
    {icon:"📊",label:"Оценка",       mod:"annual",      c:"#7BBFEF"},
    {icon:"🎯",label:"Развитие",     mod:"development", c:"#A78BFA"},
    {icon:"📚",label:"Обучение",     mod:"learning",    c:"#F59E0B"},
    {icon:"🤝",label:"Стабильность", mod:"social",      c:"#F472B6"},
    {icon:"📝",label:"Опросы",       mod:"surveys",     c:"#34D399"},
  ];

  const hrModules=[
    {icon:"👥",label:"Сотрудники",   mod:user.role==="admin"?"admin":"hr", c:"#7BBFEF", badge:empNoAdapt},
    {icon:"📈",label:"Отчётность",   mod:"reports",    c:"#F59E0B"},
    {icon:"📝",label:"Опросы",       mod:"surveys",    c:"#34D399"},
    ...(user.role==="admin"?[{icon:"⚙️",label:"Управление",mod:"admin",c:"#F87171"}]:[]),
  ];

  const catMap=Object.fromEntries(NEWS_CATS.map(c=>[c.id,c]));
  const filteredNews=newsFilter==="all"?news:news.filter(n=>n.cat===newsFilter);
  const sortedNews=[...filteredNews].sort((a,b)=>{if(a.pinned&&!b.pinned)return -1;if(!a.pinned&&b.pinned)return 1;return new Date(b.date)-new Date(a.date);});
  const canWrite=user.role==="hr"||user.role==="admin";

  return (
    <div>
      {/* ── Profile banner ── */}
      <div className="wb" style={{display:"flex",gap:12,alignItems:"center",marginBottom:14}}>
        <div style={{width:46,height:46,borderRadius:"50%",background:avatarGrad(user.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"#fff",flexShrink:0,boxShadow:"0 0 0 3px rgba(14,110,196,.35)",position:"relative",zIndex:1}}>{getInitials(user.name)}</div>
        <div style={{flex:1,position:"relative",zIndex:1,minWidth:0}}>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:"clamp(14px,3vw,17px)",fontWeight:800,color:"#fff"}}>{user.role==="admin"?"Панель администратора 🛡️":user.role==="hr"?`Добро пожаловать, ${firstName}! 🧑‍💼`:`Привет, ${firstName}! 👋`}</div>
          <div style={{fontSize:12,color:"#A5B4FC",marginTop:2}}>{user.pos} · {user.dept}</div>
          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
            <span className="badge bb" style={{fontSize:10}}>📱 {user.phone}</span>
            <span className={`badge ${user.role==="admin"?"br":user.role==="hr"?"bb":"bg"}`} style={{fontSize:10}}>{roleLabel[user.role]}</span>
          </div>
        </div>
      </div>

      {/* ── Quick-access modules grid ── */}
      {user.role==="employee"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
          {empModules.map(s=>(
            <div key={s.mod} onClick={()=>go(s.mod)}
              style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"12px 6px",textAlign:"center",cursor:"pointer",transition:"all .18s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.borderColor=s.c+"55";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}>
              <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:11,fontWeight:600,color:s.c}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {(user.role==="hr"||user.role==="admin")&&(
        <div>
          {/* stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
            {[{v:employees.length,l:"Сотрудников",c:"#34D399"},{v:empNoAdapt,l:"Без плана",c:"#FCD34D"},{v:news.length,l:"Новостей",c:"#7BBFEF"}].map(s=>(
              <div key={s.l} className="sc" style={{cursor:"default",padding:"12px 8px"}}>
                <div className="sv" style={{color:s.c,fontSize:20}}>{s.v}</div>
                <div className="sl">{s.l}</div>
              </div>
            ))}
          </div>
          {/* hr quick modules */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
            {hrModules.map(s=>(
              <div key={s.mod+s.label} onClick={()=>go(s.mod)}
                style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"13px 12px",cursor:"pointer",transition:"all .18s",display:"flex",alignItems:"center",gap:10,position:"relative"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.borderColor=s.c+"55";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}>
                <span style={{fontSize:20}}>{s.icon}</span>
                <span style={{fontSize:12.5,fontWeight:600,color:s.c}}>{s.label}</span>
                {s.badge>0&&<div style={{position:"absolute",top:8,right:8,background:"#EF4444",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 5px",borderRadius:99}}>{s.badge}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── News feed ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,gap:8,flexWrap:"wrap"}}>
        <div style={{fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
          📰 Новости
          {pinned>0&&<span style={{background:"#F5A623",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:99,marginLeft:2}}>{pinned} 📌</span>}
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
          {canWrite&&<button className="btn bp bsm" style={{padding:"5px 11px",fontSize:11}} onClick={()=>go("news")}>+ Написать</button>}
          <button style={{padding:"4px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:"1px solid rgba(255,255,255,.1)",background:newsFilter==="all"?"rgba(14,110,196,.25)":"rgba(255,255,255,.04)",color:newsFilter==="all"?"#7BBFEF":"#6B7280",transition:"all .15s"}} onClick={()=>setNewsFilter("all")}>Все</button>
          {NEWS_CATS.map(c=>(
            <button key={c.id} style={{padding:"4px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:`1px solid ${newsFilter===c.id?c.color+"66":"rgba(255,255,255,.08)"}`,background:newsFilter===c.id?c.color+"18":"rgba(255,255,255,.04)",color:newsFilter===c.id?c.color:"#6B7280",transition:"all .15s"}} onClick={()=>setNewsFilter(newsFilter===c.id?"all":c.id)}>{c.icon}</button>
          ))}
        </div>
      </div>

      {sortedNews.length===0&&(
        <div className="card"><div className="emp"><div className="ei">📰</div><div style={{fontWeight:600,color:"#6B7280"}}>Нет новостей</div></div></div>
      )}

      {sortedNews.map(n=>{
        const cat=catMap[n.cat]||{color:"#6B7280",icon:"📢",label:"Другое"};
        const imgs=(n.images||[]);
        return (
          <div key={n.id} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${n.pinned?"rgba(245,158,11,.3)":"rgba(255,255,255,.07)"}`,borderRadius:14,padding:"14px 14px 14px 16px",marginBottom:10,position:"relative",overflow:"hidden",transition:"border-color .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=n.pinned?"rgba(245,158,11,.5)":cat.color+"44"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=n.pinned?"rgba(245,158,11,.3)":"rgba(255,255,255,.07)"}>
            {/* color strip */}
            <div style={{position:"absolute",top:0,left:0,bottom:0,width:3,background:cat.color,borderRadius:"14px 0 0 14px"}}/>
            {/* header */}
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6}}>
              <div style={{width:34,height:34,borderRadius:9,background:cat.color+"18",border:`1px solid ${cat.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{cat.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"Manrope,sans-serif",fontSize:13.5,fontWeight:700,color:"inherit",lineHeight:1.3}}>{n.title}{n.pinned&&<span style={{color:"#FCD34D",marginLeft:6,fontSize:12}}>📌</span>}</div>
                <div style={{fontSize:11,color:"#4B5563",marginTop:3}}>{n.author} · {fmtDate(n.date)} · <span style={{color:cat.color}}>{cat.label}</span></div>
              </div>
            </div>
            {/* body */}
            <div style={{fontSize:12.5,color:"#9CA3AF",lineHeight:1.65,paddingLeft:44}}>{n.body}</div>
            {/* images */}
            {imgs.length===1&&<div style={{paddingLeft:44,marginTop:8}}><img src={imgs[0].url} alt="" style={{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:9,border:"1px solid rgba(255,255,255,.08)"}}/></div>}
            {imgs.length>=2&&(
              <div style={{paddingLeft:44,display:"grid",gridTemplateColumns:imgs.length===2?"1fr 1fr":"1fr 1fr",gap:5,marginTop:8}}>
                {imgs.slice(0,imgs.length===2?2:imgs.length===3?3:4).map((img,i)=>(
                  <div key={img.id} style={{position:"relative",aspectRatio:"4/3",borderRadius:8,overflow:"hidden",border:"1px solid rgba(255,255,255,.08)"}}>
                    <img src={img.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",filter:(i===3&&imgs.length>4)?"brightness(.35)":"none"}}/>
                    {i===3&&imgs.length>4&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Manrope,sans-serif",fontSize:20,fontWeight:800,color:"#fff"}}>+{imgs.length-4}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {news.length>0&&sortedNews.length>0&&(
        <button className="btn bo" style={{width:"100%",marginTop:4,fontSize:12}} onClick={()=>go("news")}>
          Открыть полную ленту новостей →
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [theme,setTheme]=useState(()=>typeof window!=="undefined"&&window.localStorage?localStorage.getItem("inkai_theme")||"dark":"dark");
  const toggleTheme=()=>{const t=theme==="dark"?"light":"dark";setTheme(t);try{localStorage.setItem("inkai_theme",t);}catch(e){}};
  const [user,setUser]=useState(null);
  const [employees,setEmployees]=useState(INIT_EMPLOYEES);
  const [news,setNews]=useState(INIT_NEWS);
  const [tickets,setTickets]=useState(INIT_TICKETS);
  const [mod,setMod]=useState("home");
  const [open,setOpen]=useState(true);
  const [mob,setMob]=useState(false);
  const isMob=()=>typeof window!=="undefined"&&window.innerWidth<=900;
  const toggle=()=>isMob()?setMob(o=>!o):setOpen(o=>!o);
  const nav=id=>{setMod(id);setMob(false);};
  const login=(acc,isNew)=>{setUser(acc);if(isNew)setEmployees(es=>[...es,acc]);};

  if(!user)return(<><style>{getCSS(theme)}</style><Login onLogin={login} employees={employees} theme={theme} toggleTheme={toggleTheme}/></>);

  const initials=getInitials(user.name);
  const pinned=news.filter(n=>n.pinned).length;
  const empNoAdapt=employees.filter(e=>!e.adaptTasks.length).length;

  const empNav=[
    {id:"home",label:"Главная",icon:"🏠"},
    {id:"news",label:"Новости",icon:"📰",badge:pinned},
    {id:"adaptation",label:"Адаптация",icon:"🌱"},
    {id:"annual",label:"Годовая оценка",icon:"📊"},
    {id:"development",label:"Зоны развития",icon:"🎯"},
    {id:"learning",label:"Обучение",icon:"📚"},
    {id:"tickets",label:"Обращения",icon:"📨",badge:tickets.filter(t=>t.authorId===user.id&&t.status==="in_progress").length||0},
    {id:"surveys",label:"Опросы",icon:"📝"},
    {id:"profile",label:"Мой профиль",icon:"👤"},
  ];
  const hrNav=[
    {id:"home",label:"Главная",icon:"🏠"},
    {id:"news",label:"Новости",icon:"📰",badge:pinned},
    {id:"hr",label:"Сотрудники",icon:"👥",badge:empNoAdapt},
    {id:"reports",label:"Отчётность",icon:"📈"},
    {id:"tickets",label:"Обращения",icon:"📨",badge:tickets.filter(t=>t.status==="new"&&t.messages.length===0).length||0},
    {id:"surveys",label:"Опросники",icon:"📝"},
    {id:"profile",label:"Мой профиль",icon:"👤"},
  ];
  const adminNav=[
    {id:"home",label:"Главная",icon:"🏠"},
    {id:"news",label:"Новости",icon:"📰"},
    {id:"admin",label:"Управление",icon:"⚙️"},
    {id:"hr",label:"HR-модуль",icon:"👥"},
    {id:"reports",label:"Отчётность",icon:"📈"},
    {id:"tickets",label:"Обращения",icon:"📨",badge:tickets.filter(t=>t.status==="new"&&t.messages.length===0).length||0},
    {id:"surveys",label:"Опросы",icon:"📝"},
    {id:"profile",label:"Мой профиль",icon:"👤"},
  ];
  const navItems=user.role==="admin"?adminNav:user.role==="hr"?hrNav:empNav;

  const pageTitles={
    home:{h:"Главная",s:user.role==="admin"?"Панель управления":user.role==="hr"?"Кабинет HR":"Ваш HR-портал"},
    news:{h:"Новости компании",s:"Важные события, переводы и объявления"},
    adaptation:{h:"Адаптация",s:"Программа испытательного срока"},
    annual:{h:"Годовая оценка",s:"Оценка эффективности 2026"},
    development:{h:"Зоны развития",s:"Тест на компетенции"},
    learning:{h:"Обучение",s:"Ежемесячные модули по политикам"},
    profile:{h:"Мой профиль",s:"Личные данные и настройки"},
    tickets:{h:"Обращения",s:user.role==="hr"||user.role==="admin"?"Входящие обращения сотрудников":"Мои обращения в HR"},
    surveys:{h:"Опросники",s:"Опросы для сотрудников"},
    reports:{h:"Отчётность",s:"Аналитика по всем HR-модулям"},
    hr:{h:"Управление сотрудниками",s:"Назначение адаптации и профили"},
    admin:{h:"Администрирование",s:"Управление пользователями и системой"},
  };

  const roleBg={admin:"linear-gradient(135deg,#EF4444,#F97316)",hr:"linear-gradient(135deg,#6366F1,#8B5CF6)",employee:"linear-gradient(135deg,#10B981,#0EA5E9)"};
  const roleLabel={admin:"Администратор",hr:"HR-менеджер",employee:"Сотрудник"};
  const sbCls=`sidebar ${!open&&!isMob()?"coll":""} ${mob?"mob-open":""}`;
  const mainCls=`main ${!open&&!isMob()?"coll":""}`;

  return (
    <>
      <style>{getCSS(theme)}</style>
      <div className="app">
        <div className={`ov ${mob?"show":""}`} onClick={()=>setMob(false)}/>
        <aside className={sbCls}>
          <div className="sbh">
            <div className="sbbrand">
              <div style={{background:theme==="dark"?"#0E6EC4":"transparent",borderRadius:9,padding:theme==="dark"?"5px 10px":"0",display:"flex",alignItems:"center",transition:"all .3s",flexShrink:0}}><img src={theme==="dark"?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlYAAADqCAYAAABgMgs4AACyqklEQVR42uydd7wlRZn+v1XV3SfcMDnAkHNWoiKCJBVBUVGi5BxFd3V13f1t0tU1rRIk56iYExgRUYFVREHJeWBynpvOOd1d7++Pqj7h3hmYgTuJqcfP8Q73hNunu7rqqfd93ueFgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPURKpyCVYuJZ1wj3SZjq002YSjPmb5ogJf+95hw3gMCAgICAgICVopUnfp12eujF8k1D8yQ6SLyrIh8/t6ZssXHr5FwdgICAgICAt54CJGTVYBxZ90gm42Bw9/+Js5+35vROXQZSIEaMDuHW370OHf94REe+2qIXgUEBAQEBARiFbBMTDn9Knnv23fj1A/uzua9UMqEMZEg0kCpMinQ8ATrkelw24//yF+fe4lZi/uYfd0p4XoEBAQEBAQEYhWw0T/dITtuOI7jDtqH/XeqMAYoAxEWTQOFAtGkDUUcRyAgQF3Dj++byR33/Y0/zljE9IuODdckICAgICAgYP3FNp+4Sf7t7pflCRGZJSILRKQuImlaF5GG2LRfJBsSkYaITUVqdZEsF0lFJBOpef3Vf98zW7b49LeD/iogICAgICBg/cRnvvuU/H2pyBwRmS0ii0VkSESG8lREchHb9pBcRFKxkkomDckklUxE+lIrizJHyB6ui3zy+4/KVh//ViBYAQEBAQEB6xhC2mklMfnc24R0iLftsStnHrEre4yF8RpEQT2HKHIntV4foqtURkvbKVYWAXIsOSCIvwSWmIgs16QCjQgeeB5uuPNP/Orhp+nacGNe/s/9wrUKCAgICAgIeONgg7Mul3d97tty40OL5GUR6ReXypM0lWxwUKx12b2aj1ql4mGlI2qVNV+Ty5D0S036JJWG5Jl/UypSy0Tmi8hNf+2X7S68MkSvAgICAgIC1gGEKMgKYNxZN8i0XjjiHXtx2mHbMwYoZVA2FmpLIAKiKqiY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":"data:image/png;base64,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"} alt="Inkai"  style={{height:theme==="dark"?"32px":"36px",width:"auto",objectFit:"contain",flexShrink:0,display:"block"}}/></div>
            </div>
            <button className="sbtog" onClick={toggle}>{open&&!isMob()?"◀":"▶"}</button>
          </div>
          <nav className="sbnav">
            {navItems.map(item=>(
              <div key={item.id+item.label} className={`ni ${mod===item.id?"active":""}`} onClick={()=>nav(item.id)}>
                <span className="ni-icon">{item.icon}</span>
                <span className="ni-label">{item.label}</span>
                {item.badge>0&&<span className="nibadge">{item.badge}</span>}
              </div>
            ))}
          </nav>
          <div className="sbuser">
            <div className="ava" style={{background:roleBg[user.role]}}>{initials}</div>
            <div className="uinfo" style={{cursor:"pointer"}} onClick={()=>nav("profile")}>
              <div className="uname">{user.name.split(" ").slice(0,2).join(" ")}</div>
              <div className="urole">{roleLabel[user.role]}</div>
            </div>
            <button className="themebtn" onClick={toggleTheme} title={theme==="dark"?"Светлая тема":"Тёмная тема"}>{theme==="dark"?"☀":"🌙"}</button><button className="logoutbtn" onClick={()=>{setUser(null);setMod("home");}} title="Выйти">↩</button>
          </div>
        </aside>
        <main className={mainCls}>
          <div className="mobbar">
            <button className="hbg" onClick={()=>setMob(o=>!o)}>☰</button>
            <div style={{background:theme==="dark"?"#0E6EC4":"transparent",borderRadius:7,padding:theme==="dark"?"4px 8px":"0",display:"flex",alignItems:"center",transition:"all .3s"}}><img src={theme==="dark"?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlYAAADqCAYAAABgMgs4AACyqklEQVR42uydd7wlRZn+v1XV3SfcMDnAkHNWoiKCJBVBUVGi5BxFd3V13f1t0tU1rRIk56iYExgRUYFVREHJeWBynpvOOd1d7++Pqj7h3hmYgTuJqcfP8Q73hNunu7rqqfd93ueFgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPURKpyCVYuJZ1wj3SZjq002YSjPmb5ogJf+95hw3gMCAgICAgICVopUnfp12eujF8k1D8yQ6SLyrIh8/t6ZssXHr5FwdgICAgICAt54CJGTVYBxZ90gm42Bw9/+Js5+35vROXQZSIEaMDuHW370OHf94REe+2qIXgUEBAQEBARiFbBMTDn9Knnv23fj1A/uzua9UMqEMZEg0kCpMinQ8ATrkelw24//yF+fe4lZi/uYfd0p4XoEBAQEBAQEYhWw0T/dITtuOI7jDtqH/XeqMAYoAxEWTQOFAtGkDUUcRyAgQF3Dj++byR33/Y0/zljE9IuODdckICAgICAgYP3FNp+4Sf7t7pflCRGZJSILRKQuImlaF5GG2LRfJBsSkYaITUVqdZEsF0lFJBOpef3Vf98zW7b49LeD/iogICAgICBg/cRnvvuU/H2pyBwRmS0ii0VkSESG8lREchHb9pBcRFKxkkomDckklUxE+lIrizJHyB6ui3zy+4/KVh//ViBYAQEBAQEB6xhC2mklMfnc24R0iLftsStnHrEre4yF8RpEQT2HKHIntV4foqtURkvbKVYWAXIsOSCIvwSWmIgs16QCjQgeeB5uuPNP/Orhp+nacGNe/s/9wrUKCAgICAgIeONgg7Mul3d97tty40OL5GUR6ReXypM0lWxwUKx12b2aj1ql4mGlI2qVNV+Ty5D0S036JJWG5Jl/UypSy0Tmi8hNf+2X7S68MkSvAgICAgIC1gGEKMgKYNxZN8i0XjjiHXtx2mHbMwYoZVA2FmpLIAKiKqiY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":"data:image/png;base64,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"} alt="Inkai"  style={{height:theme==="dark"?"26px":"28px",width:"auto",objectFit:"contain"}}/></div>
          </div>
          <div className="ph">
            <h1>{pageTitles[mod]?.h}</h1>
            <p>{pageTitles[mod]?.s}</p>
          </div>
          {mod==="home"       &&<Dashboard user={user} go={setMod} employees={employees} news={news}/>}
          {mod==="news"       &&<NewsModule user={user} news={news} setNews={setNews}/>}
          {mod==="adaptation" &&<AdaptModule user={user} employees={employees} setEmployees={setEmployees}/>}
          {mod==="annual"     &&<AnnualModule/>}
          {mod==="development"&&<DevModule/>}
          {mod==="learning"   &&<LearnModule user={user}/>}
          {mod==="tickets"    &&<TicketsModule user={user} tickets={tickets} setTickets={setTickets}/>}
          {mod==="surveys"    &&<SurveysModule user={user}/>}
          {mod==="profile"    &&<ProfileModule user={user} setUser={setUser} employees={employees} setEmployees={setEmployees}/>}
          {mod==="hr"         &&<HRModule user={user} employees={employees} setEmployees={setEmployees} setNews={setNews}/>}
          {mod==="admin"      &&<AdminModule employees={employees} setEmployees={setEmployees} news={news} setNews={setNews}/>}
          {mod==="reports"    &&<ReportsModule user={user} employees={employees}/>}
        </main>
      </div>
    </>
  );
}

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
              <button style={btnPrimary} onClick={sendReply} disabled={!reply.trim()} style={{...btnPrimary,opacity:reply.trim()?1:.45,cursor:reply.trim()?"pointer":"not-allowed"}}>
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
              <div style={{background:theme==="dark"?"#0E6EC4":"transparent",borderRadius:9,padding:theme==="dark"?"5px 10px":"0",display:"flex",alignItems:"center",transition:"all .3s",flexShrink:0}}><img src={theme==="dark"?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="} alt="Inkai" alt="Inkai" style={{height:theme==="dark"?"32px":"36px",width:"auto",objectFit:"contain",flexShrink:0,display:"block"}}/></div>
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
            <div style={{background:theme==="dark"?"#0E6EC4":"transparent",borderRadius:7,padding:theme==="dark"?"4px 8px":"0",display:"flex",alignItems:"center",transition:"all .3s"}}><img src={theme==="dark"?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="} alt="Inkai" alt="Inkai" style={{height:theme==="dark"?"26px":"28px",width:"auto",objectFit:"contain"}}/></div>
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

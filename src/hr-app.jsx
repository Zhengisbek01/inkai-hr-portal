import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import jsQR from "jsqr";

const uid = () => Math.random().toString(36).slice(2,9);

const getCSS = (theme) => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=Golos+Text:wght@400;500;600;700&family=PT+Serif:wght@400;700&display=swap');
.themebtn{background:none;border:none;cursor:pointer;color:#4B5563;font-size:14px;padding:3px;flex-shrink:0;transition:color .15s}
.themebtn:hover{color:#F5A623}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#111315;color:#F9FAFB;min-height:100vh}
.lw{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#111315 0%,#1D2126 50%,#111315 100%)}
.lcard{width:100%;max-width:460px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:38px 34px;backdrop-filter:blur(20px)}
.llogo{text-align:center;margin-bottom:26px}
.lstep{font-size:11px;font-weight:600;color:#E8590C;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.ltitle{font-family:'Manrope',sans-serif;font-size:19px;font-weight:800;color:#fff;margin-bottom:4px}
.lsub{font-size:12.5px;color:#6B7280;margin-bottom:18px}
.lg{margin-bottom:13px}
.ll{font-size:10.5px;font-weight:600;color:#6B7280;margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:.5px}
.linput{width:100%;padding:11px 13px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;font-size:13.5px;color:#fff;font-family:'Inter',sans-serif;outline:none;transition:all .2s}
.linput::placeholder{color:#374151}
.linput:focus{border-color:#E8590C;background:rgba(232,89,12,.08);box-shadow:0 0 0 3px rgba(232,89,12,.15)}
.linput.err{border-color:#EF4444}
.lerr{font-size:11px;color:#F87171;margin-top:4px}
.lbtn{width:100%;padding:13px;background:linear-gradient(135deg,#E8590C,#C2410C);border:none;border-radius:10px;font-size:14px;font-weight:700;color:#fff;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;margin-top:6px;box-shadow:0 4px 20px rgba(232,89,12,.4)}
.lbtn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(232,89,12,.5)}
.lbtn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.dots{display:flex;gap:6px;justify-content:center;margin-bottom:22px}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.12);transition:all .3s}
.dot.act{background:#E8590C;width:22px;border-radius:4px}
.demo-btn{display:flex;align-items:center;gap:9px;width:100%;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:9px;margin-bottom:6px;cursor:pointer;transition:all .15s;text-align:left}
.demo-btn:hover{background:rgba(232,89,12,.1);border-color:rgba(232,89,12,.3)}
.demo-ava{width:33px;height:33px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.demo-name{font-size:12.5px;font-weight:600;color:#E5E7EB;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.demo-pos{font-size:11px;color:#4B5563}
.drb{font-size:9.5px;font-weight:600;padding:2px 7px;border-radius:99px;flex-shrink:0}
.app{display:flex;min-height:100vh;background:#111315}
.sidebar{width:248px;background:#181B1F;border-right:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:20;transition:width .25s ease}
.sidebar.coll{width:62px}
.sbh{padding:15px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:9px;overflow:hidden;white-space:nowrap;min-height:63px}
.sbbrand{display:flex;align-items:center;gap:9px;flex:1;overflow:hidden}
.sbicon{width:33px;height:33px;background:linear-gradient(135deg,#E8590C,#C2410C);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.sbtext h2{font-family:'Manrope',sans-serif;font-size:14px;font-weight:800;color:#fff}
.sbtext span{font-size:9.5px;color:#6B7280;display:block;margin-top:1px}
.sidebar.coll .sbtext{display:none}
.sbtog{background:rgba(255,255,255,.07);border:none;cursor:pointer;width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#6B7280;font-size:10px;flex-shrink:0;transition:all .15s}
.sbtog:hover{background:rgba(255,255,255,.12);color:#fff}
.sbnav{flex:1;padding:9px 7px;overflow:hidden}
.ni{display:flex;align-items:center;gap:9px;padding:9px 10px;cursor:pointer;font-size:12.5px;font-weight:500;color:#6B7280;border-radius:9px;transition:all .15s;white-space:nowrap;overflow:hidden;margin-bottom:2px;position:relative}
.ni:hover{color:#E5E7EB;background:rgba(255,255,255,.06)}
.ni.active{color:#fff;background:rgba(232,89,12,.2);box-shadow:inset 0 0 0 1px rgba(232,89,12,.3)}
.ni-icon{font-size:15px;width:21px;text-align:center;flex-shrink:0}
.ni-label{transition:opacity .2s}
.sidebar.coll .ni-label{opacity:0;width:0;pointer-events:none}
.sidebar.coll .ni{padding:9px;justify-content:center}
.sidebar.coll .sbh{justify-content:center}
.sidebar.coll .sbbrand{flex:0}
.nibadge{position:absolute;right:9px;top:50%;transform:translateY(-50%);background:#EF4444;color:#fff;font-size:9px;font-weight:700;padding:1px 5px;border-radius:99px;min-width:16px;text-align:center}
.sidebar.coll .nibadge{right:1px;top:3px;transform:none}
.sbuser{padding:11px 9px;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:9px;overflow:hidden;white-space:nowrap}
.ava{width:33px;height:33px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 0 0 2px rgba(232,89,12,.4)}
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
.hbg{background:#181B1F;border:1px solid rgba(255,255,255,.1);cursor:pointer;width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex-shrink:0}
.ph{margin-bottom:20px}
.ph h1{font-family:'Manrope',sans-serif;font-size:20px;font-weight:800;color:#fff}
.ph p{font-size:12.5px;color:#6B7280;margin-top:3px}
.card{background:#181B1F;border-radius:14px;border:1px solid rgba(255,255,255,.07);padding:18px;margin-bottom:14px}
.ct{font-family:'Manrope',sans-serif;font-size:13.5px;font-weight:700;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:7px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px}
.sc{background:#181B1F;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:15px 11px;text-align:center;cursor:pointer;transition:all .2s}
.sc:hover{border-color:rgba(232,89,12,.4);transform:translateY(-2px)}
.sv{font-family:'Manrope',sans-serif;font-size:22px;font-weight:800}
.sl{font-size:11px;color:#6B7280;margin-top:3px}
.pb{background:rgba(255,255,255,.07);border-radius:99px;height:6px;overflow:hidden}
.pf{height:100%;border-radius:99px;transition:width .8s}
.btn{padding:8px 15px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'Inter',sans-serif}
.bp{background:linear-gradient(135deg,#E8590C,#C2410C);color:#fff;box-shadow:0 2px 10px rgba(232,89,12,.3)}
.bp:hover{box-shadow:0 4px 16px rgba(232,89,12,.5);transform:translateY(-1px)}
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
.bb{background:rgba(232,89,12,.15);color:#FF9A4D;border:1px solid rgba(232,89,12,.2)}
.bo2{background:rgba(245,158,11,.12);color:#FCD34D;border:1px solid rgba(245,158,11,.2)}
.bgr{background:rgba(255,255,255,.06);color:#9CA3AF;border:1px solid rgba(255,255,255,.08)}
.br{background:rgba(239,68,68,.12);color:#F87171;border:1px solid rgba(239,68,68,.2)}
.bpnk{background:rgba(236,72,153,.12);color:#F472B6;border:1px solid rgba(236,72,153,.2)}
.sr{display:flex;align-items:center;gap:9px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.sr:last-child{border-bottom:none}
.st{flex:1;font-size:13px;color:#D1D5DB}
.sbs{display:flex;gap:4px}
.sb2{width:30px;height:30px;border-radius:7px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);font-size:11.5px;font-weight:600;cursor:pointer;color:#6B7280;transition:all .15s;display:flex;align-items:center;justify-content:center}
.sb2:hover{border-color:#E8590C;color:#FF9A4D}
.sb2.sel{background:#E8590C;border-color:#E8590C;color:#fff;box-shadow:0 2px 8px rgba(232,89,12,.4)}
.rs{display:flex;gap:4px}
.star{font-size:21px;cursor:pointer;filter:grayscale(1);opacity:.2;transition:all .1s}
.star.on{filter:none;opacity:1}
.ir{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.ir:last-child{border-bottom:none}
.div{height:1px;background:rgba(255,255,255,.06);margin:14px 0}
.emp{text-align:center;padding:34px 20px;color:#4B5563}
.emp .ei{font-size:32px;margin-bottom:7px}
.wb{background:linear-gradient(135deg,#2E1F15 0%,#1D2126 60%,#181B1F 100%);border-radius:16px;padding:20px 22px;margin-bottom:16px;border:1px solid rgba(232,89,12,.25);position:relative;overflow:hidden}
.wb::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:radial-gradient(circle,rgba(232,89,12,.2),transparent 70%);pointer-events:none}
.tabs{display:flex;gap:3px;margin-bottom:14px;background:rgba(255,255,255,.04);padding:3px;border-radius:9px;width:fit-content;border:1px solid rgba(255,255,255,.06)}
.tb{padding:6px 13px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;border:none;background:transparent;color:#6B7280;transition:all .15s}
.tb.act{background:rgba(232,89,12,.25);color:#FF9A4D;font-weight:600;border:1px solid rgba(232,89,12,.3)}
.lc{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid rgba(255,255,255,.07);border-radius:11px;background:rgba(255,255,255,.02);margin-bottom:7px;cursor:pointer;transition:all .15s}
.lc:hover{border-color:rgba(232,89,12,.3);background:rgba(232,89,12,.06)}
.lci{font-size:22px;width:42px;height:42px;background:rgba(255,255,255,.06);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sbl{display:grid;grid-template-columns:258px 1fr;gap:14px;align-items:start}
.sbp{background:#181B1F;border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:14px;position:sticky;top:20px}
.spt{font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:9px}
.qtb{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.02);font-size:12px;font-weight:500;color:#D1D5DB;cursor:pointer;margin-bottom:5px;transition:all .15s;text-align:left}
.qtb:hover{border-color:rgba(232,89,12,.4);background:rgba(232,89,12,.08);color:#FF9A4D}
.qc{background:#181B1F;border:1.5px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;margin-bottom:9px;transition:all .2s;cursor:pointer}
.qc:hover{border-color:rgba(232,89,12,.25)}
.qc.foc{border-color:rgba(232,89,12,.5);box-shadow:0 0 0 3px rgba(232,89,12,.1)}
.qh{display:flex;align-items:center;gap:7px;margin-bottom:10px}
.qnum{width:21px;height:21px;background:linear-gradient(135deg,#E8590C,#C2410C);color:#fff;border-radius:5px;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.qtag{font-size:9.5px;color:#6B7280;background:rgba(255,255,255,.05);padding:2px 7px;border-radius:99px}
.qa{margin-left:auto;display:flex;gap:4px}
.dh{cursor:grab;color:#374151;font-size:13px}
.qi2{width:100%;padding:8px 11px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;color:#fff;background:rgba(255,255,255,.04);outline:none;transition:all .15s}
.qi2:focus{border-color:#E8590C}
.qi2::placeholder{color:#374151}
.qi2.hint{font-size:11.5px;color:#4B5563;background:rgba(255,255,255,.02)}
.optrow{display:flex;align-items:center;gap:7px;margin-top:7px}
.optbullet{width:13px;height:13px;border:2px solid #374151;border-radius:50%;flex-shrink:0}
.optbullet.sq{border-radius:3px}
.optinp{flex:1;padding:6px 9px;border:1.5px solid rgba(255,255,255,.07);border-radius:7px;font-size:12px;font-family:'Inter',sans-serif;color:#E5E7EB;background:rgba(255,255,255,.03);outline:none;transition:border-color .15s}
.optinp:focus{border-color:#E8590C}
.optinp::placeholder{color:#374151}
.optdel{background:none;border:none;cursor:pointer;color:#374151;font-size:16px;padding:0 2px;transition:color .15s;line-height:1}
.optdel:hover{color:#EF4444}
.addoptbtn{margin-top:7px;background:none;border:none;cursor:pointer;font-size:12px;color:#E8590C;font-weight:500;padding:3px 0;display:flex;align-items:center;gap:4px}
.scaleprev{display:flex;gap:4px;margin-top:8px;flex-wrap:wrap}
.scalebtn{width:32px;height:32px;border-radius:7px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);font-size:11.5px;font-weight:600;color:#6B7280;display:flex;align-items:center;justify-content:center}
.svrinp{width:100%;padding:9px 12px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-family:'Inter',sans-serif;color:#fff;background:rgba(255,255,255,.04);outline:none;transition:all .15s;margin-bottom:8px}
.svrinp:focus{border-color:#E8590C}
.svrinp::placeholder{color:#374151}
.svrinp.big{font-family:'Manrope',sans-serif;font-size:17px;font-weight:700}
.mlov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px)}
.ml{background:#181B1F;border:1px solid rgba(255,255,255,.1);border-radius:17px;width:100%;max-width:540px;max-height:88vh;overflow-y:auto;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.5)}
.mlh{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
.mlclose{background:rgba(255,255,255,.07);border:none;cursor:pointer;width:28px;height:28px;border-radius:7px;font-size:15px;display:flex;align-items:center;justify-content:center;color:#9CA3AF;flex-shrink:0}
.mlclose:hover{background:rgba(255,255,255,.12);color:#fff}
.news-card{background:#181B1F;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px 18px 18px 20px;margin-bottom:12px;transition:all .2s;position:relative;overflow:hidden}
.news-card:hover{border-color:rgba(232,89,12,.2)}
.news-card.pinned{border-color:rgba(245,158,11,.25);background:rgba(245,158,11,.03)}
.ncstrip{position:absolute;top:0;left:0;bottom:0;width:4px;border-radius:14px 0 0 14px}
.ncicon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.nctitle{font-family:'Manrope',sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1.3}
.ncby{font-size:11px;color:#4B5563;margin-top:3px}
.ncbody{font-size:12.5px;color:#9CA3AF;line-height:1.7;padding-left:48px;margin-top:2px}
.nf-btn{padding:5px 11px;border-radius:99px;font-size:11.5px;font-weight:500;cursor:pointer;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#6B7280;transition:all .15s}
.nf-btn:hover{color:#D1D5DB;border-color:rgba(255,255,255,.15)}
.nf-btn.sel{color:#fff;border-color:rgba(232,89,12,.5);background:rgba(232,89,12,.15)}
.pinbtn{background:none;border:none;cursor:pointer;font-size:13px;color:#6B7280;padding:2px;transition:color .15s;line-height:1}
.pinbtn:hover{color:#FCD34D}
.pinbtn.on{color:#FCD34D}
.emprow{display:flex;align-items:center;gap:11px;padding:12px 13px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.02);margin-bottom:7px;transition:all .15s}
.emprow:hover{border-color:rgba(232,89,12,.2)}
.empava{width:37px;height:37px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.empinfo{flex:1;min-width:0}
.empname{font-size:13px;font-weight:600;color:#E5E7EB;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.empmeta{font-size:11px;color:#4B5563;margin-top:2px}
.taskrow{display:flex;align-items:center;gap:8px;padding:9px;border:1px solid rgba(255,255,255,.06);border-radius:9px;background:rgba(255,255,255,.02);margin-bottom:6px}
.taskdrag{cursor:grab;color:#374151;font-size:12px}
.taskbody{flex:1;min-width:0}
.taskt{font-size:12.5px;font-weight:500;color:#E5E7EB;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.taskd{font-size:10.5px;color:#4B5563;margin-top:1px}
.wpill{font-size:10px;font-weight:600;padding:2px 7px;border-radius:99px;background:rgba(232,89,12,.12);color:#FF9A4D;flex-shrink:0}
.ta{width:100%;padding:9px 11px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-size:12.5px;font-family:'Inter',sans-serif;resize:vertical;min-height:75px;outline:none;background:rgba(255,255,255,.04);color:#E5E7EB}
.ta:focus{border-color:#E8590C}
.ta::placeholder{color:#374151}
.inp{width:100%;padding:9px 11px;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;font-size:12.5px;font-family:'Inter',sans-serif;outline:none;background:rgba(255,255,255,.04);color:#E5E7EB;transition:border-color .15s}
.inp:focus{border-color:#E8590C}
.inp::placeholder{color:#374151}
select.inp{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%236B7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center}
@media(max-width:900px){.sidebar{transform:translateX(-100%);width:248px!important}.sidebar.mob-open{transform:translateX(0)}.ov.show{display:block}.main{margin-left:0!important;padding:14px}.mobbar{display:flex}.g3{grid-template-columns:1fr 1fr}.sbl{grid-template-columns:1fr}.sbp{position:static}}
@media(max-width:560px){.g2,.g3{grid-template-columns:1fr}.wb{flex-direction:column;gap:9px}}
${theme!=="c"?`
/* ── LIGHT THEME ── */
body{background:#FAFAF9!important;color:#18181B!important}
.app{background:#FAFAF9!important}
.sidebar{background:#fff!important;border-right:1px solid #E7E5E4!important}
.sbh{border-bottom-color:#E7E5E4!important}
.sbtext h2{color:#18181B!important}
.sbtext span{color:#57534E!important}
.sbtog{background:rgba(232,89,12,.08)!important;color:#57534E!important}
.sbtog:hover{background:rgba(232,89,12,.15)!important;color:#E8590C!important}
.sbnav{}
.ni{color:#57534E!important}
.ni:hover{color:#E8590C!important;background:#FFF1E6!important}
.ni.active{color:#E8590C!important;background:#FFF1E6!important;box-shadow:inset 0 0 0 1px rgba(232,89,12,.2)!important}
.nibadge{background:#F5A623!important}
.sbuser{border-top-color:#E7E5E4!important}
.uname{color:#18181B!important}
.urole{color:#57534E!important}
.logoutbtn{color:#A8A29E!important}
.logoutbtn:hover{color:#DC2626!important}
.themebtn{color:#A8A29E!important}
.themebtn:hover{color:#F5A623!important}
.main{background:#FAFAF9!important}
.ph h1{color:#18181B!important}
.ph p{color:#57534E!important}
.card{background:#fff!important;border-color:#E7E5E4!important}
.ct{color:#18181B!important}
.sc{background:#fff!important;border-color:#E7E5E4!important}
.sc:hover{border-color:#E8590C!important}
.sl{color:#57534E!important}
.pb{background:#E7E5E4!important}
.btn.bo{background:#fff!important;border-color:#E7E5E4!important;color:#18181B!important}
.btn.bo:hover{background:#FFF1E6!important;border-color:#E8590C!important;color:#E8590C!important}
.badge.bgr{background:#FFF1E6!important;color:#57534E!important;border-color:#E7E5E4!important}
.sr{border-bottom-color:#F0EEEC!important}
.st{color:#374151!important}
.sb2{border-color:#E7E5E4!important;background:#FAFAF9!important;color:#57534E!important}
.sb2:hover{border-color:#E8590C!important;color:#E8590C!important;background:#FFF1E6!important}
.ir{border-bottom-color:#F0EEEC!important}
.div{background:#E7E5E4!important}
.emp{color:#A8A29E!important}
.wb{background:linear-gradient(135deg,#FFF1E6,#FFE4CC)!important;border-color:#E7E5E4!important}
.tabs{background:rgba(232,89,12,.06)!important;border-color:#E7E5E4!important}
.tb{color:#57534E!important}
.tb.act{background:#fff!important;color:#E8590C!important;border-color:rgba(232,89,12,.2)!important}
.lc{background:#fff!important;border-color:#E7E5E4!important}
.lc:hover{border-color:rgba(232,89,12,.3)!important;background:#FFF1E6!important}
.lci{background:#FFF1E6!important}
.sbl .sbp{background:#fff!important;border-color:#E7E5E4!important}
.qtb{background:#fff!important;border-color:#E7E5E4!important;color:#374151!important}
.qtb:hover{border-color:rgba(232,89,12,.4)!important;background:#FFF1E6!important;color:#E8590C!important}
.qc{background:#fff!important;border-color:#E7E5E4!important}
.qc.foc{border-color:#E8590C!important;box-shadow:0 0 0 3px rgba(232,89,12,.1)!important}
.qi2{border-color:#E7E5E4!important;background:#FAFAF9!important;color:#18181B!important}
.optinp{border-color:#E7E5E4!important;background:#FAFAF9!important;color:#374151!important}
.svrinp{border-color:#E7E5E4!important;background:#FAFAF9!important;color:#18181B!important}
.ml{background:#fff!important;border-color:#E7E5E4!important}
.mlclose{background:#FFF1E6!important;color:#57534E!important}
.news-card{background:#fff!important;border-color:#E7E5E4!important}
.news-card.pinned{background:#FFFBEB!important;border-color:#FCD34D!important}
.nctitle{color:#18181B!important}
.ncby{color:#57534E!important}
.ncbody{color:#374151!important}
.nf-btn{background:#fff!important;border-color:#E7E5E4!important;color:#57534E!important}
.nf-btn.sel{background:#FFF1E6!important;border-color:rgba(232,89,12,.4)!important;color:#E8590C!important}
.pinbtn{color:#E7E5E4!important}
.pinbtn.on{color:#F5A623!important}
.emprow{background:#fff!important;border-color:#E7E5E4!important}
.empname{color:#18181B!important}
.empmeta{color:#A8A29E!important}
.taskrow{background:#FAFAF9!important;border-color:#E7E5E4!important}
.wpill{background:rgba(232,89,12,.08)!important;color:#E8590C!important}
.ta{border-color:#E7E5E4!important;background:#FAFAF9!important;color:#374151!important}
.ta:focus{border-color:#E8590C!important}
.inp{border-color:#E7E5E4!important;background:#FAFAF9!important;color:#18181B!important}
select.inp{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%230E6EC4' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")!important}
.hbg{background:#fff!important;border-color:#E7E5E4!important;color:#E8590C!important}
.lw{background:linear-gradient(135deg,#FAFAF9,#FFF1E6,#FAFAF9)!important}
.lcard{background:#fff!important;border-color:#E7E5E4!important}
.llogo p{color:#57534E!important}
.ll{color:#57534E!important}
.linput{background:#FAFAF9!important;border-color:#E7E5E4!important;color:#18181B!important}
.linput:focus{border-color:#E8590C!important;background:#FFF1E6!important}
.linput::placeholder{color:#A8A29E!important}
.demo-btn{background:#FAFAF9!important;border-color:#E7E5E4!important}
.demo-btn:hover{background:#FFF1E6!important;border-color:rgba(232,89,12,.3)!important}
.demo-name{color:#18181B!important}
.demo-pos{color:#57534E!important}
`:""}
/* ── МКА: переменные тем ── */
:root{--tx:#F3F4F6;--tx2:#9CA3AF;--bd:rgba(255,255,255,.09);--sf:#181B1F;--sf2:rgba(255,255,255,.04);--ac:#FF7A1A;--ac2:#FF9A4D;--acbg:rgba(255,122,26,.14);
--ok:#34D399;--okbg:rgba(16,185,129,.14);--wn:#FCD34D;--wnbg:rgba(245,158,11,.14);--er:#F87171;--erbg:rgba(239,68,68,.14);--in:#93C5FD;--inbg:rgba(59,130,246,.15)}
${theme!=="c"?`:root{--tx:#18181B;--tx2:#57534E;--bd:#E7E5E4;--sf:#FFFFFF;--sf2:#FAFAF9;--ac:#C2410C;--ac2:#9A3412;--acbg:#FFF1E6;
--ok:#11643F;--okbg:#E3F5EC;--wn:#9A5B00;--wnbg:#FFF4DB;--er:#B42318;--erbg:#FDECEA;--in:#1D4ED8;--inbg:#E8EFFD}`:""}
${theme==="a"?`:root{--tx:#0F172A;--tx2:#5B6B7E;--bd:#E2E8F0;--sf2:#F7F9FB;--ac2:#B23A0A}`:""}
body{font-family:${theme==="a"?"'Inter'":theme==="b"?"'IBM Plex Sans','Inter'":"'Golos Text','Inter'"},sans-serif}
.sbnav{overflow-y:auto!important;overflow-x:hidden}
.main{min-width:0}
/* ── Меню, вариант 1: строгие линейные иконки ── */
.sbnav{padding:10px 12px!important}
.ni{gap:11px!important;padding:9px 12px!important;font-size:13.5px!important;border-radius:8px!important}
.ni-icon{width:20px!important;display:flex!important;align-items:center;justify-content:center;font-size:0!important;color:#7C8796}
.ni.active .ni-icon{color:currentColor}
.nibadge{position:static!important;transform:none!important;margin-left:auto;min-width:20px;height:20px;padding:0 6px!important;box-sizing:border-box;border-radius:6px!important;background:rgba(255,255,255,.12)!important;color:#FFFFFF!important;font-size:11px!important;display:inline-flex;align-items:center;justify-content:center}
.ni.active .nibadge{background:rgba(255,255,255,.22)!important}
.sidebar.coll .nibadge{position:absolute!important;top:2px;right:2px;min-width:16px;height:16px;font-size:9.5px!important;padding:0 4px!important}
.themebtn,.logoutbtn{display:flex!important;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px!important;font-size:0!important}
.themebtn:hover,.logoutbtn:hover{background:rgba(127,127,127,.15)!important}
.sbnav::-webkit-scrollbar{width:4px}.sbnav::-webkit-scrollbar-thumb{background:rgba(127,127,127,.3);border-radius:4px}
.langbtn{border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-size:11px;font-weight:700;padding:5px 9px;border-radius:7px;cursor:pointer;font-family:'Inter',sans-serif}
.langbtn.on{background:var(--ac);border-color:var(--ac);color:#fff}
.ord-row{display:grid;grid-template-columns:110px 96px minmax(0,1fr) 150px 150px 100px;gap:12px;padding:12px 16px;align-items:center;font-size:13px;color:var(--tx);border-bottom:1px solid var(--bd);cursor:pointer}
.ord-row:last-child{border-bottom:none}.ord-row:hover{background:var(--sf2)}
.ord-head{font-size:11px!important;font-weight:700;color:var(--tx2)!important;text-transform:uppercase;letter-spacing:.4px;background:var(--sf2);cursor:default}
.pol-row{display:grid;grid-template-columns:minmax(0,1fr) 120px 80px 100px 100px;gap:12px;padding:12px 16px;align-items:center;font-size:13px;color:var(--tx);border-bottom:1px solid var(--bd);cursor:pointer}
.pol-row:last-child{border-bottom:none}.pol-row:hover{background:var(--sf2)}
.en-row{display:grid;grid-template-columns:minmax(0,1.5fr) 120px minmax(0,1fr) 150px 150px 130px;gap:10px;padding:11px 16px;align-items:center;font-size:13px;color:var(--tx);border-bottom:1px solid var(--bd);cursor:pointer}
.en-row:last-child{border-bottom:none}.en-row:hover{background:var(--sf2)}
.vac-row{display:grid;grid-template-columns:minmax(0,1.8fr) 140px 60px 180px 120px 150px;gap:10px;padding:11px 16px;align-items:center;font-size:13px;color:var(--tx);border-bottom:1px solid var(--bd);cursor:pointer}
.vac-row:last-child{border-bottom:none}.vac-row:hover{background:var(--sf2)}
.lg-row{display:grid;grid-template-columns:130px 140px 150px minmax(0,1fr) minmax(0,1.4fr) 60px;gap:10px;padding:10px 16px;align-items:center;font-size:12.5px;color:var(--tx);border-bottom:1px solid var(--bd)}
.lg-row:last-child{border-bottom:none}
@media(max-width:900px){.en-row,.vac-row,.lg-row{grid-template-columns:minmax(0,1fr) 140px}.en-row>span:nth-child(n+3):not(:nth-child(5)),.vac-row>span:nth-child(n+2):not(:nth-child(4)),.lg-row>span:nth-child(n+3):not(:nth-child(5)){display:none}}
.tm-row{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr) 80px 80px 70px 150px;gap:10px;padding:11px 16px;align-items:center;font-size:13px;color:var(--tx);border-bottom:1px solid var(--bd)}
.tm-row:last-child{border-bottom:none}.tm-row.tm-head{font-size:11px;font-weight:700;color:var(--tx2);text-transform:uppercase;background:var(--sf2)}
.tm-row.tm8{grid-template-columns:minmax(0,2fr) repeat(7,minmax(0,1fr))}
.tsheet{border-collapse:collapse;font-size:11.5px;color:var(--tx);min-width:100%}
.tsheet th,.tsheet td{border:1px solid var(--bd);text-align:center;padding:4px 2px;min-width:30px}
.tsheet th{font-size:11px;font-weight:700;background:var(--sf2);color:var(--tx2)}.tsheet th span{font-weight:500;font-size:9.5px}
.tsheet .nm{text-align:left;padding:4px 10px;min-width:150px;white-space:nowrap;position:sticky;left:0;background:var(--sf);z-index:1}
.tsheet td{cursor:pointer;font-weight:700;position:relative}.tsheet td i{color:var(--wn);font-style:normal;position:absolute;top:-2px;right:2px}
.tsheet .off{background:var(--sf2)}.tsheet .now{box-shadow:inset 0 0 0 2px var(--ac)}.tsheet .tot{cursor:default;background:var(--sf2)}
.tsheet .c-ok{color:var(--ok)}.tsheet .c-err{color:var(--er);background:var(--erbg)}.tsheet .c-warn{color:var(--wn);background:var(--wnbg)}.tsheet .c-info{color:var(--in);background:var(--inbg)}.tsheet .c-ac{color:var(--ac2);background:var(--acbg)}.tsheet .c-gr{color:var(--tx2)}
@media print{body.noprint *{display:none!important}body.noprint:after{content:"Печать недоступна: документ только для ознакомления";display:block;padding:40px;font:16px Arial}}
@media(max-width:1100px){.ord-grid,.ord-grid3{grid-template-columns:1fr!important}.ord-row{grid-template-columns:90px 86px minmax(0,1fr) 130px}.ord-row>span:nth-child(5),.ord-row>span:nth-child(6){display:none}}
@media(max-width:700px){.ord-3{grid-template-columns:1fr!important}.pol-row{grid-template-columns:minmax(0,1fr) 90px}.pol-row>span:nth-child(2),.pol-row>span:nth-child(3),.pol-row>span:nth-child(4){display:none}.tm-row{grid-template-columns:minmax(0,1fr) 70px 70px}.tm-row>span:nth-child(2),.tm-row>span:nth-child(5),.tm-row>span:nth-child(6){display:none}.ph-lang{display:none}}
${theme!=="c"?`
/* ── Светлые темы: правка инлайн-цветов старых модулей ── */
.wb{background:linear-gradient(135deg,#1F2937 0%,#2E1F15 100%)!important;border-color:transparent!important}
.main .card [style^="color: rgb(255, 255, 255)"]:not([style*="background"]),.main .card [style*="; color: rgb(255, 255, 255)"]:not([style*="background"]),
.main .ml [style^="color: rgb(255, 255, 255)"]:not([style*="background"]),.main .ml [style*="; color: rgb(255, 255, 255)"]:not([style*="background"]),
.main [style*="color: rgb(249, 250, 251)"],.main [style*="color: rgb(243, 244, 246)"]{color:var(--tx)!important}
.main [style*="color: rgb(229, 231, 235)"]:not(.wb *),.main [style*="color: rgb(209, 213, 219)"]:not(.wb *){color:#3F3F46!important}
.main [style*="color: rgb(156, 163, 175)"]:not(.wb *),.main [style*="color: rgb(107, 114, 128)"]{color:var(--tx2)!important}
.main [style*="color: rgb(252, 211, 77)"]:not(.wb *){color:#9A5B00!important}
.main [style*="color: rgb(52, 211, 153)"]:not(.wb *),.main [style*="color: rgb(110, 231, 183)"]:not(.wb *){color:#047857!important}
.main [style*="color: rgb(248, 113, 113)"]:not(.wb *),.main [style*="color: rgb(252, 165, 165)"]:not(.wb *){color:#B91C1C!important}
.main [style*="color: rgb(255, 154, 77)"]:not(.wb *){color:#C2410C!important}
.main [style*="color: rgb(165, 180, 252)"]:not(.wb *){color:#4338CA!important}
.main [style*="color: rgb(244, 114, 182)"]{color:#BE185D!important}
.main [style*="color: rgb(167, 139, 250)"]{color:#6D28D9!important}
.main [style*="color: rgb(96, 165, 250)"]{color:#1D4ED8!important}
.main [style*="background: rgba(255, 255, 255, 0.0"],.main [style*="background: rgba(255, 255, 255, 0.1"]{background:#F5F5F4!important}
.main [style*="border: 1px solid rgba(255, 255, 255"],.main [style*="border: 1.5px solid rgba(255, 255, 255"]{border-color:var(--bd)!important}
.badge.bg{background:#E3F5EC!important;color:#11643F!important;border-color:#C6EBD8!important}
.badge.bb{background:#FFF1E6!important;color:#9A3412!important;border-color:#FED7B5!important}
.badge.bo2{background:#FFF4DB!important;color:#9A5B00!important;border-color:#FDE3A7!important}
.badge.br{background:#FDECEA!important;color:#B42318!important;border-color:#F8C9C3!important}
.badge.bpnk{background:#FCE7F3!important;color:#BE185D!important;border-color:#F9C6E1!important}
.btn.bd{background:#FDECEA!important;color:#B42318!important;border-color:#F8C9C3!important}
.btn.bg2{background:#E3F5EC!important;color:#11643F!important;border-color:#C6EBD8!important}
.tb.act{color:var(--ac2)!important}
select.inp{background-repeat:no-repeat!important;background-position:right 11px center!important}
.ni{color:#3F3F46!important}
.ni-icon{color:#78716C}
.ni.active{color:#18181B!important;background:#F1F0EF!important;box-shadow:none!important;font-weight:600}
.ni:hover{color:#18181B!important;background:#F5F5F4!important}
.ni.active .ni-icon{color:#18181B}
.nibadge{background:#EDEBEA!important;color:#3F3F46!important}
.ni.active .nibadge{background:#E2DFDC!important}
.nf-btn.sel{color:var(--ac2)!important}
.lcard h1,.llogo h1{color:var(--tx)!important}
.ltitle{color:var(--tx)!important}
`:""}
${theme==="a"?`
/* ── Вариант A: тёмно-синий сайдбар ── */
body,.app,.main{background:#F3F6F9!important}
.sidebar{background:#0F2A44!important;border-right:none!important}
.sbh{border-bottom-color:rgba(255,255,255,.1)!important}
.sbtext h2{color:#FFFFFF!important}.sbtext span{color:#B6C6D8!important}
.sbtog{background:rgba(255,255,255,.1)!important;color:#C9D6E4!important}
.ni{color:#C9D6E4!important}
.ni:hover{color:#FFFFFF!important;background:rgba(255,255,255,.08)!important}
.ni.active{color:#FFFFFF!important;background:#1B4470!important;font-weight:600}
.ni-icon{color:#9FB3C8!important}.ni:hover .ni-icon,.ni.active .ni-icon{color:#FFFFFF!important}
.nibadge{background:rgba(255,255,255,.12)!important;color:#FFFFFF!important}.ni.active .nibadge{background:rgba(255,255,255,.22)!important}
.sbuser{border-top-color:rgba(255,255,255,.1)!important}
.uname{color:#FFFFFF!important}.urole{color:#B6C6D8!important}
.logoutbtn,.themebtn{color:#C9D6E4!important}
.card,.sc,.news-card,.emprow,.lc,.qc{border-color:#E2E8F0!important}
.ph h1{color:#0F172A!important}.ph p{color:#5B6B7E!important}
.wb{background:linear-gradient(135deg,#0F2A44 0%,#1B4470 100%)!important}
.lw{background:#F3F6F9!important}
`:""}
${theme==="c"?`
.wb{background:linear-gradient(135deg,#2E1F15 0%,#1D2126 60%,#181B1F 100%)!important;border-color:rgba(255,122,26,.25)!important}
.ni{color:#A1A1AA!important}.ni-icon{color:#71717A}
.ni.active{background:#24282D!important;color:#FFFFFF!important;box-shadow:none!important;font-weight:600}
.ni:hover{background:#1D2126!important;color:#E4E4E7!important}
.ni.active .ni-icon{color:#FFFFFF}
.bp,.lbtn{background:linear-gradient(135deg,#FF7A1A,#E5650F)!important}
`:""}
` ;


const getInitials = n => n.trim().split(" ").map(w=>w[0]||"").slice(0,2).join("").toUpperCase()||"?";
const avatarGrad  = n => {
  const g=["linear-gradient(135deg,#E8590C,#C2410C)","linear-gradient(135deg,#EC4899,#F43F5E)","linear-gradient(135deg,#0EA5E9,#E8590C)","linear-gradient(135deg,#10B981,#0EA5E9)","linear-gradient(135deg,#F59E0B,#EF4444)","linear-gradient(135deg,#C2410C,#EC4899)"];
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

function NewsModule({user,news,setNews}) {
  const [filter,setFilter]=useState("all");
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({cat:"hire",title:"",body:"",images:[]});
  const [lightboxImg,setLightboxImg]=useState(null);
  const canWrite=user.role==="hr"||user.role==="admin";
  const catMap=Object.fromEntries(NEWS_CATS.map(c=>[c.id,c]));
  const filtered=filter==="all"?news:news.filter(n=>n.cat===filter);
  const sorted=[...filtered].sort((a,b)=>{if(a.pinned&&!b.pinned)return -1;if(!a.pinned&&b.pinned)return 1;return new Date(b.date)-new Date(a.date);});

  const handleImages=e=>{
    const files=Array.from(e.target.files);
    const readers=files.map(file=>new Promise(res=>{
      const r=new FileReader();
      r.onload=ev=>res({id:uid(),url:ev.target.result,name:file.name});
      r.readAsDataURL(file);
    }));
    Promise.all(readers).then(imgs=>setForm(f=>({...f,images:[...f.images,...imgs].slice(0,6)})));
    e.target.value="";
  };
  const removeImg=id=>setForm(f=>({...f,images:f.images.filter(i=>i.id!==id)}));

  const publish=()=>{
    if(!form.title.trim()||!form.body.trim())return;
    setNews(ns=>[{id:uid(),cat:form.cat,title:form.title.trim(),body:form.body.trim(),images:form.images,author:user.name,date:new Date().toISOString().slice(0,10),pinned:false},...ns]);
    setForm({cat:"hire",title:"",body:"",images:[]});setShowForm(false);
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
          {/* Photo upload */}
          <div style={{marginTop:10,marginBottom:10}}>
            <div style={{fontSize:10.5,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>Фотографии (до 6)</div>
            {form.images.length>0&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(80px,1fr))",gap:7,marginBottom:9}}>
                {form.images.map(img=>(
                  <div key={img.id} style={{position:"relative",aspectRatio:"1",borderRadius:8,overflow:"hidden",border:"1px solid rgba(255,255,255,.1)"}}>
                    <img src={img.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <button onClick={()=>removeImg(img.id)} style={{position:"absolute",top:3,right:3,background:"rgba(0,0,0,.7)",border:"none",color:"#fff",width:18,height:18,borderRadius:"50%",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                  </div>
                ))}
                {form.images.length<6&&(
                  <label style={{aspectRatio:"1",borderRadius:8,border:"1.5px dashed rgba(232,89,12,.4)",background:"rgba(232,89,12,.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,color:"#E8590C"}}>
                    +<input type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleImages}/>
                  </label>
                )}
              </div>
            )}
            {form.images.length===0&&(
              <label style={{display:"flex",alignItems:"center",gap:11,padding:"12px 14px",border:"1.5px dashed rgba(232,89,12,.3)",borderRadius:10,background:"rgba(232,89,12,.04)",cursor:"pointer"}}>
                <div style={{width:38,height:38,borderRadius:9,background:"rgba(232,89,12,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🖼️</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"#FF9A4D"}}>Прикрепить фото</div>
                  <div style={{fontSize:11,color:"#4B5563",marginTop:2}}>JPG, PNG, WEBP · до 6 изображений</div>
                </div>
                <input type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleImages}/>
              </label>
            )}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:11}}>
            <button className="btn bo" onClick={()=>{setShowForm(false);setForm({cat:"hire",title:"",body:"",images:[]});}}>Отмена</button>
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
            <div className="ncbody" style={{marginBottom:(n.images&&n.images.length>0)?10:0}}>{n.body}</div>
            {/* Image grid */}
            {n.images&&n.images.length>0&&(
              <div style={{paddingLeft:48}}>
                {n.images.length===1&&<img src={n.images[0].url} alt="" onClick={()=>setLightboxImg(n.images[0].url)} style={{width:"100%",maxHeight:280,objectFit:"cover",borderRadius:9,cursor:"zoom-in",border:"1px solid rgba(255,255,255,.08)"}}/>}
                {n.images.length===2&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>{n.images.map(img=><img key={img.id} src={img.url} alt="" onClick={()=>setLightboxImg(img.url)} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",borderRadius:8,cursor:"zoom-in"}}/>)}</div>}
                {n.images.length>=3&&(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    {n.images.slice(0,3).map(img=><img key={img.id} src={img.url} alt="" onClick={()=>setLightboxImg(img.url)} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",borderRadius:8,cursor:"zoom-in"}}/>)}
                    {n.images.length>3&&(
                      <div style={{position:"relative",aspectRatio:"4/3",cursor:"pointer",borderRadius:8,overflow:"hidden"}} onClick={()=>setLightboxImg(n.images[3].url)}>
                        <img src={n.images[3].url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.4)"}}/>
                        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"#fff"}}>+{n.images.length-3}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {/* Lightbox */}
      {lightboxImg&&(
        <div onClick={()=>setLightboxImg(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20,cursor:"zoom-out"}}>
          <img src={lightboxImg} alt="" style={{maxWidth:"100%",maxHeight:"90vh",borderRadius:10,objectFit:"contain"}}/>
          <button onClick={()=>setLightboxImg(null)} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,.12)",border:"none",color:"#fff",width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
      )}
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
    secTabAct:{background:"rgba(232,89,12,.25)",color:"#FF9A4D",fontWeight:600,border:"1px solid rgba(232,89,12,.3)"},
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
          {[{v:empList.length,l:"Всего",c:"#FF9A4D"},{v:withPlan.length,l:"С планом",c:"#22C55E"},{v:noPlan.length,l:"Без плана",c:"#F59E0B"},{v:done.length,l:"Завершили",c:"#22C55E"},{v:inProg.length,l:"В процессе",c:"#FF9A4D"},{v:avgPct+"%",l:"Средний прогресс",c:"#F59E0B"}].map(s=>(
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
                  else if(tasks.some(t=>t.done)){status="В процессе";statusColor="rgba(232,89,12,.15)";}
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
                      <td style={{...S.td,textAlign:"center"}}><span style={{fontSize:13,fontWeight:600,color:"#FF9A4D"}}>{daysSince(e.joinDate)}</span></td>
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
          {[{v:empList.length,l:"Всего",c:"#FF9A4D"},{v:submitted.length,l:"Сдали оценку",c:"#22C55E"},{v:empList.length-submitted.length,l:"Ожидают",c:"#F59E0B"},{v:avgTotal,l:"Ср. балл / 100",c:"#F59E0B"},{v:pct(submitted.length,empList.length)+"%",l:"Охват",c:"#22C55E"}].map(s=>(
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
          {[{v:empList.length,l:"Прошли тест",c:"#22C55E"},{v:Math.round(avg(data.map(d=>d.avg))*10)/10+"/5",l:"Средний балл",c:"#FF9A4D"},{v:strongest.cat,l:"Сильная сторона",c:"#22C55E"},{v:weakest.cat,l:"Зона роста",c:"#F59E0B"}].map((s,i)=>(
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
          {[{v:empList.length,l:"Всего",c:"#FF9A4D"},{v:full.length,l:"Прошли всё",c:"#22C55E"},{v:none.length,l:"Не начинали",c:"#EF4444"},{v:avgDone+"/"+LEARN_DATA.length,l:"Ср. модулей",c:"#F59E0B"},{v:pct(full.length,empList.length)+"%",l:"Охват (100%)",c:"#22C55E"}].map(s=>(
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
                    <td style={{...S.td,textAlign:"center"}}><span style={{fontWeight:600,color:"#FF9A4D"}}>{d.learn.done}/{d.learn.total}</span></td>
                    <td style={S.td}><div style={S.bar}><div style={S.barWrap}><div style={{...S.barFill,width:d.pct+"%",background:colPct(d.pct)}}/></div><span style={{...S.barNum,color:colPct(d.pct)}}>{d.pct}%</span></div></td>
                    <td style={S.td}><span style={{...S.badge,background:d.pct===100?"rgba(34,197,94,.15)":d.pct>0?"rgba(232,89,12,.15)":"rgba(239,68,68,.12)",color:d.pct===100?"#22C55E":d.pct>0?"#FF9A4D":"#F87171"}}>{d.pct===100?"✓ Завершено":d.pct>0?"В процессе":"Не начато"}</span></td>
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
          {[{v:empList.length,l:"Всего",c:"#FF9A4D"},{v:submitted.length,l:"Ответили",c:"#22C55E"},{v:pct(submitted.length,empList.length)+"%",l:"Охват",c:"#22C55E"},{v:avgScore+"/5",l:"Ср. индекс",c:col(avgScore,3,4)},{v:high,l:"Высокая стаб.",c:"#22C55E"},{v:low,l:"Тревожных",c:"#EF4444"}].map(s=>(
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
  {id:"company",  label:"О компании",          icon:"🏢", color:"#FF9A4D"},
  {id:"work",     label:"Рабочие процессы",     icon:"⚙️", color:"#34D399"},
  {id:"rules",    label:"Правила и этика",      icon:"📋", color:"#F59E0B"},
  {id:"hr",       label:"HR-процедуры",         icon:"🧑‍💼", color:"#F472B6"},
  {id:"safety",   label:"Безопасность",         icon:"🔒", color:"#A78BFA"},
];

const KB_ARTICLES = [
  /* ── О компании ── */
  {id:"kb1", section:"company", title:"О компании МКА Инжиниринг",
   type:"text",
   content:"ТОО «МКА Инжиниринг» — поставщик промышленных химических реагентов для предприятий Казахстана. Компания импортирует реагенты из Китая и Узбекистана и обеспечивает ими золотодобывающие предприятия и водоканалы.\n\n**Наша задача** — надёжные и безопасные поставки реагентов точно в срок.\n\n**Ключевые ценности:**\n• Безопасность — приоритет №1 во всём, что мы делаем\n• Ответственность — перед людьми, обществом и природой\n• Развитие — постоянное совершенствование процессов и людей\n• Честность — открытость и прозрачность в работе"},

  {id:"kb2", section:"company", title:"Структура компании",
   type:"text",
   content:"Структура ТОО «МКА Инжиниринг»:\n\n**Руководство:**\nДиректор и HR\n\n**Подразделения:**\n• Продажи — работа с клиентами и тендерами\n• Закупки и ВЭД — поставщики, импорт, таможня\n• Логистика и склад — доставка и хранение реагентов\n• Бухгалтерия — финансы и расчёты\n\nВаш непосредственный руководитель — руководитель вашего подразделения."},

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
     {id:"q1", text:"Чем занимается ТОО «МКА Инжиниринг»?",
      options:["Добыча золота","Поставки промышленных химических реагентов","Строительство","IT-услуги"], answer:1},
     {id:"q2", text:"Какой приоритет №1 в ценностях компании?",
      options:["Прибыль","Развитие","Безопасность","Инновации"], answer:2},
     {id:"q3", text:"Сколько подразделений, кроме руководства, в компании?",
      options:["2","3","4","5"], answer:2},
   ]},

  /* ── Рабочие процессы ── */
  {id:"kb5", section:"work", title:"Рабочий день и график",
   type:"text",
   content:"**Стандартный рабочий день:**\n08:30 — 17:30 (понедельник–пятница)\nПерерыв на обед: 12:00–13:00\n\n**Гибкий график:**\nВозможен сдвиг на ±1 час по согласованию с руководителем\n\n**Удалённая работа:**\nМаксимум 3 дня в неделю из дома (с 1 июля 2026 по новой политике). Обязательное присутствие по вторникам и четвергам.\n\n**Отработка часов:**\nУчёт рабочего времени ведётся в разделе «Учёт времени» по QR-коду на входе. Опоздание фиксируется после 5 минут."},

  {id:"kb6", section:"work", title:"Инструменты и системы",
   type:"text",
   content:"**Обязательные инструменты:**\n• **Корпоративная почта** — Outlook (login@mka.kz)\n• **Мессенджер** — Microsoft Teams (для звонков и чатов)\n• **Задачи и проекты** — Jira / Confluence\n• **Документооборот** — 1С:Документооборот\n• **HR-система** — данный портал (HR-портал МКА)\n\n**Доступы:**\nВсе доступы настраивает ИТ-отдел в течение первых 3 рабочих дней. Если что-то не работает — обращайтесь через систему обращений или напрямую в support@mka.kz\n\n**Пароли:**\nМинимум 8 символов, смена каждые 90 дней. Никогда не передавайте пароль коллегам."},

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
   content:"Кодекс деловой этики ТОО «МКА Инжиниринг» — основа наших взаимоотношений внутри компании и с внешними партнёрами.\n\n**Основные принципы:**\n\n**1. Уважение**\nМы уважаем каждого сотрудника вне зависимости от должности, пола, национальности и возраста. Дискриминация в любой форме недопустима.\n\n**2. Конфиденциальность**\nНе разглашать коммерческую тайну, персональные данные сотрудников и клиентов. Подписанный вами НДА действует и после увольнения.\n\n**3. Конфликт интересов**\nНеобходимо сообщать руководителю и HR, если у вас есть личная заинтересованность в деловом решении компании.\n\n**4. Подарки и взятки**\nПолучение или предложение подарков стоимостью более 5 000 тенге от деловых партнёров запрещено.\n\n**5. Использование ресурсов**\nКорпоративные оборудование и время используются только для рабочих целей."},

  {id:"kb10", section:"rules", title:"Дресс-код и поведение в офисе",
   type:"text",
   content:"**Дресс-код:**\nДеловой стиль в дни встреч с клиентами и партнёрами. В остальные дни — smart casual.\n\nЗапрещено: спортивная одежда, открытые майки, пляжная обувь.\n\n**Правила в офисе:**\n• Чистота на рабочем месте — стол должен быть чистым в конце дня\n• Переговорные комнаты — убирать после себя, удалять встречи из календаря при отмене\n• Кухня — мыть посуду после использования\n• Телефонные разговоры — не говорить по личным делам громко в open space\n• Парковка — не занимать места для гостей\n\n**Курение:**\nТолько в специально отведённых зонах вне здания."},

  {id:"kb11", section:"rules", title:"Документ: Кодекс этики (полная версия)",
   type:"doc",
   docTitle:"Кодекс деловой этики ТОО «МКА Инжиниринг»",
   docDesc:"Полный текст кодекса, включая приложения и примеры ситуаций",
   docSize:"2.4 МБ",
   docIcon:"📄",
   content:"Документ содержит полный текст Кодекса деловой этики, утверждённого приказом директора. Обязателен к прочтению для всех сотрудников."},

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
              if(line.startsWith("• ")) return <div key={i} style={{paddingLeft:14,marginBottom:3,display:"flex",gap:7}}><span style={{color:"#E8590C",flexShrink:0}}>•</span><span>{line.slice(2)}</span></div>;
              if(line.startsWith("| ")) return null;
              if(/^\d+\./.test(line)) return <div key={i} style={{paddingLeft:14,marginBottom:3,display:"flex",gap:7}}><span style={{color:"#E8590C",fontWeight:600,flexShrink:0}}>{line.match(/^\d+/)[0]}.</span><span>{line.replace(/^\d+\.\s*/,"")}</span></div>;
              return <div key={i} style={{marginBottom:3}}>{line}</div>;
            })}
          </div>
        )}

        {/* DOC */}
        {article.type==="doc"&&(
          <div>
            <div style={{fontSize:13,lineHeight:1.7,color:"#9CA3AF",marginBottom:14}}>{article.content}</div>
            <div style={{display:"flex",alignItems:"center",gap:13,padding:14,background:"rgba(232,89,12,.08)",border:"1px solid rgba(232,89,12,.2)",borderRadius:11}}>
              <div style={{width:46,height:46,borderRadius:10,background:"rgba(232,89,12,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{article.docIcon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5,fontWeight:600}}>{article.docTitle}</div>
                <div style={{fontSize:11.5,color:"#6B7280",marginTop:2}}>{article.docDesc} · {article.docSize}</div>
              </div>
              <button style={{padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:"linear-gradient(135deg,#E8590C,#C2410C)",color:"#fff",border:"none",whiteSpace:"nowrap"}}>
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
                        if(!done2&&selected===oi){bg="rgba(232,89,12,.12)";border="rgba(232,89,12,.4)";color="#FF9A4D";}
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
                <button onClick={()=>submitQuiz(article)} disabled={Object.keys(ans).length<article.questions.length} style={{padding:"10px 20px",borderRadius:9,fontSize:13,fontWeight:600,cursor:Object.keys(ans).length<article.questions.length?"not-allowed":"pointer",background:"linear-gradient(135deg,#E8590C,#C2410C)",color:"#fff",border:"none",opacity:Object.keys(ans).length<article.questions.length?0.45:1,marginTop:4}}>
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
              {[{v:done,l:"Выполнено",c:"#34D399"},{v:tasks.length-done,l:"Осталось",c:"#60A5FA"},{v:pct+"%",l:"Прогресс",c:"#FF9A4D"}].map(s=>(
                <div key={s.l} className="sc" style={{cursor:"default"}}><div className="sv" style={{color:s.c}}>{s.v}</div><div className="sl">{s.l}</div></div>
              ))}
            </div>
            <div className="card" style={{marginBottom:12}}>
              <div className="ct">📈 Прогресс адаптации</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:"#6B7280"}}>{done} из {tasks.length}</span>
                <span style={{fontSize:12,fontWeight:700,color:"#FF9A4D"}}>{pct}%</span>
              </div>
              <div className="pb"><div className="pf" style={{width:`${pct}%`,background:"linear-gradient(90deg,#E8590C,#C2410C,#F5A623)"}}/></div>
            </div>
            <div className="card">
              <div className="ct">✅ Мой план</div>
              {Object.keys(byW).sort((a,b)=>a-b).map(w=>(
                <div key={w} style={{marginBottom:13}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#4B5563",textTransform:"uppercase",letterSpacing:1.2,marginBottom:5}}>Неделя {w}</div>
                  {byW[w].map(t=>(
                    <div className="ir" key={t.id} style={{gap:9}}>
                      <div onClick={()=>toggle(t.id)} style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${t.done?"#E8590C":"rgba(255,255,255,.15)"}`,background:t.done?"linear-gradient(135deg,#E8590C,#C2410C)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,fontSize:9,color:"#fff",transition:"all .2s",boxShadow:t.done?"0 2px 8px rgba(232,89,12,.4)":"none"}}>{t.done?"✓":""}</div>
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
    "Коммуникация":       {icon:"💬", color:"#FF9A4D", desc:"Навыки общения, аргументации, активного слушания и обратной связи"},
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

const DEPTS = ["Руководство","Продажи","Закупки и ВЭД","Логистика и склад","Бухгалтерия"];

const DEMO_ACCOUNTS = [
  {id:"adm1",joinDate:"2024-01-15",adaptTasks:[],adaptDone:false,role:"admin",   name:"Оспанов Данияр Ерланович",    pos:"Системный администратор", dept:"Руководство", phone:"+7 (700) 000-00-01"},
  {id:"dir1",joinDate:"2023-03-01",adaptTasks:[],adaptDone:false,role:"director",name:"Ахметов Марат Серикович",     pos:"Директор",                dept:"Руководство", phone:"+7 (700) 000-00-02"},
  {id:"hr1",joinDate:"2024-05-20",adaptTasks:[],adaptDone:false, role:"hr",      name:"Жумабаева Айгерим Нурлановна",pos:"HR-менеджер",             dept:"Руководство", phone:"+7 (700) 000-00-03"},
];

const INIT_EMPLOYEES = [
  {id:"e1",role:"employee",name:"Сериков Арман Талгатович",   pos:"Менеджер по продажам",       dept:"Продажи",          phone:"+7 (701) 100-00-01",joinDate:"2026-09-21",adaptTasks:[],adaptDone:false},
  {id:"e2",role:"employee",name:"Нурланов Ерлан Асхатович",   pos:"Заведующий складом",         dept:"Логистика и склад",phone:"+7 (701) 100-00-02",joinDate:"2025-03-10",adaptTasks:[],adaptDone:false},
  {id:"e3",role:"employee",name:"Ким Виктория Олеговна",      pos:"Специалист по ВЭД",          dept:"Закупки и ВЭД",    phone:"+7 (701) 100-00-03",joinDate:"2024-11-04",adaptTasks:[],adaptDone:false},
  {id:"e4",role:"employee",name:"Сарсенова Динара Болатовна", pos:"Менеджер по продажам",       dept:"Продажи",          phone:"+7 (701) 100-00-04",joinDate:"2026-10-12",adaptTasks:[],adaptDone:false},
  {id:"e5",role:"employee",name:"Абдрахманов Тимур Маратович",pos:"Бухгалтер",                  dept:"Бухгалтерия",      phone:"+7 (701) 100-00-05",joinDate:"2023-06-01",adaptTasks:[],adaptDone:false},
];

const INIT_NEWS = [
  {id:"n1",cat:"hire",    title:"Добро пожаловать, Динара Сарсенова!", body:"В отдел продаж вышла новый менеджер по продажам. Помогите коллеге быстрее освоиться!", author:"Жумабаева Айгерим Нурлановна", date:"2026-10-12",pinned:true, images:[]},
  {id:"n2",cat:"policy",  title:"Новый регламент хранения химических реагентов", body:"Регламент направлен директору на подпись. После подписания ознакомьтесь с ним в разделе «Приказы».", author:"Жумабаева Айгерим Нурлановна", date:"2026-10-22",pinned:false, images:[]},
  {id:"n3",cat:"event",   title:"Учёт рабочего времени по QR-коду", body:"С ноября приход и уход отмечаются кодом на планшете у входа. Раздел «Учёт времени» → «Отметиться».", author:"Жумабаева Айгерим Нурлановна", date:"2026-10-20",pinned:false, images:[]},
];

const TICKET_CATS = [
  {id:"hr",       label:"HR-вопрос",             icon:"🧑‍💼", color:"#FF9A4D"},
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
  {id:"new",         label:"Новое",    color:"#FF9A4D", bg:"rgba(232,89,12,.15)"},
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
  {id:"hr",      label:"HR и кадровые",      icon:"🧑‍💼", color:"#FF9A4D"},
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

  const sel = docs.find(d=>d.id===selId) || null;
  const prog = (id) => progress[id]||{read:false,quizDone:false,score:0,attempts:0};

  // Reset view when unmounting
  const goToList = () => { setView("list"); setSelId(null); setQuizAns({}); setQuizResult(null); };
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
      <div className="card" style={{border:"1px solid rgba(232,89,12,.3)"}}>
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
                <div onClick={()=>setForm(f=>({...f,mandatory:!f.mandatory}))} style={{width:34,height:19,borderRadius:99,background:form.mandatory?"#E8590C":"rgba(255,255,255,.1)",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                  <div style={{position:"absolute",top:2.5,left:form.mandatory?16:2.5,width:14,height:14,background:"#fff",borderRadius:"50%",transition:"left .2s"}}/>
                </div>
                <span style={{fontSize:12,fontWeight:600,color:form.mandatory?"#FF9A4D":"#6B7280"}}>Обязательный</span>
              </label>
            </div>
          </div>
        </div>

        {/* Загрузка файла */}
        <div style={{padding:"12px 16px",background:"rgba(232,89,12,.06)",border:"1.5px dashed rgba(232,89,12,.3)",borderRadius:10,marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:9,background:"rgba(232,89,12,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📎</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:"#FF9A4D"}}>Прикрепить документ</div>
            <div style={{fontSize:11,color:"#4B5563",marginTop:1}}>PDF, DOCX, XLSX — будет доступен сотрудникам для скачивания</div>
          </div>
          <button style={{padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:"rgba(232,89,12,.15)",border:"1px solid rgba(232,89,12,.3)",color:"#FF9A4D"}}>Выбрать файл</button>
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
  if(view==="quiz") {
    if(!sel) { setTimeout(()=>goToList(), 0); return null; }
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
                      <button key={oi} onClick={()=>setQuizAns(a=>({...a,[q.id]:oi}))} style={{textAlign:"left",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${isSel?"rgba(232,89,12,.5)":"rgba(255,255,255,.08)"}`,background:isSel?"rgba(232,89,12,.12)":"rgba(255,255,255,.03)",color:isSel?"#FF9A4D":"inherit",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .15s"}}>
                        <span style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isSel?"rgba(232,89,12,.5)":"rgba(255,255,255,.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",flexShrink:0,background:isSel?"rgba(232,89,12,.4)":"transparent"}}>
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
  if(view==="read") {
    if(!sel) { setTimeout(()=>goToList(), 0); return null; }
    const cat=catInfo(sel.cat);
    const p=prog(sel.id);
    return (
      <div>
        <button className="btn bo" style={{marginBottom:14}} onClick={goToList}>← К библиотеке</button>
        {/* Header */}
        <div style={{background:`rgba(${cat.color?"14,110,196":"99,102,241"},.06)`,border:`1px solid rgba(232,89,12,.2)`,borderRadius:14,padding:18,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10,flexWrap:"wrap"}}>
            <div style={{width:46,height:46,borderRadius:11,background:`${cat.color||"#E8590C"}18`,border:`1px solid ${cat.color||"#E8590C"}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat.icon}</div>
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
        <div style={{display:"flex",alignItems:"center",gap:13,padding:"14px 16px",background:"rgba(232,89,12,.08)",border:"1px solid rgba(232,89,12,.2)",borderRadius:11,marginBottom:14}}>
          <div style={{width:46,height:46,borderRadius:10,background:"rgba(232,89,12,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📄</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13.5,fontWeight:600}}>{sel.title}</div>
            <div style={{fontSize:11.5,color:"#6B7280",marginTop:2}}>{sel.docType}{sel.docSize?` · ${sel.docSize}`:""} · {sel.docNum}</div>
          </div>
          <button onClick={()=>setProgress(p=>({...p,[sel.id]:{...prog(sel.id),read:true}}))} style={{padding:"9px 16px",borderRadius:9,fontSize:12.5,fontWeight:600,cursor:"pointer",background:"linear-gradient(135deg,#E8590C,#C2410C)",color:"#fff",border:"none",whiteSpace:"nowrap",boxShadow:"0 2px 10px rgba(232,89,12,.3)"}}>
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
            <button onClick={()=>{setQuizAns({});setQuizResult(null);setView("quiz");}} style={{padding:"11px 28px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",background:"linear-gradient(135deg,#E8590C,#C2410C)",color:"#fff",border:"none",boxShadow:"0 3px 12px rgba(232,89,12,.4)"}}>
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
          {v:docs.length,              l:"Всего документов",    c:"#FF9A4D"},
          {v:docs.filter(d=>d.mandatory).length, l:"Обязательных", c:"#F87171"},
          {v:docs.filter(d=>!d.mandatory).length,l:"Рекомендованных",c:"#6B7280"},
        ]:[
          {v:docs.length,   l:"Всего",             c:"#FF9A4D"},
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
            <button key={cat.id} onClick={()=>setCatFilter(cat.id)} style={{padding:"5px 11px",borderRadius:99,fontSize:12,fontWeight:500,cursor:"pointer",border:`1.5px solid ${catFilter===cat.id?(cat.color||"#E8590C")+"88":"rgba(255,255,255,.08)"}`,background:catFilter===cat.id?(cat.color||"#E8590C")+"18":"rgba(255,255,255,.03)",color:catFilter===cat.id?(cat.color||"#E8590C"):"#6B7280",transition:"all .15s"}}>
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
            onMouseEnter={e=>e.currentTarget.style.borderColor=p.quizDone?"rgba(34,197,94,.4)":"rgba(232,89,12,.35)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=p.quizDone?"rgba(34,197,94,.2)":doc.mandatory&&!p.quizDone?"rgba(239,68,68,.15)":"rgba(255,255,255,.07)"}>
            {/* Category icon */}
            <div style={{width:42,height:42,borderRadius:10,background:(cat.color||"#E8590C")+"18",border:`1px solid ${cat.color||"#E8590C"}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat.icon}</div>
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
  const btnPrimary={padding:"9px 18px",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#E8590C,#C2410C)",color:"#fff",boxShadow:"0 2px 10px rgba(232,89,12,.3)"};
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
                  <div style={{width:32,height:32,borderRadius:"50%",background:isHR?"linear-gradient(135deg,#E8590C,#C2410C)":avatarGrad(msg.from),display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {isHR?"HR":getInitials(msg.from)}
                  </div>
                  <div style={{flex:1,maxWidth:"80%"}}>
                    <div style={{fontSize:11,color:"#6B7280",marginBottom:4,textAlign:isHR?"left":"right"}}>
                      {msg.from} · {fmtDate(msg.createdAt)}
                    </div>
                    <div style={{background:isHR?"rgba(232,89,12,.12)":"rgba(255,255,255,.06)",border:`1px solid ${isHR?"rgba(232,89,12,.25)":"rgba(255,255,255,.1)"}`,borderRadius:isHR?"4px 12px 12px 12px":"12px 4px 12px 12px",padding:"10px 14px",fontSize:13,lineHeight:1.6}}>
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
              <button style={{...btnPrimary,opacity:reply.trim()?1:0.45,cursor:reply.trim()?"pointer":"not-allowed"}} onClick={sendReply} disabled={!reply.trim()} >
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
    {v:tickets.filter(t=>t.status==="new").length,        l:"Новых",      c:"#FF9A4D"},
    {v:tickets.filter(t=>t.status==="in_progress").length,l:"В работе",   c:"#F59E0B"},
    {v:tickets.filter(t=>t.status==="resolved").length,   l:"Решено",     c:"#22C55E"},
    {v:tickets.filter(t=>t.priority==="high").length,     l:"Высокий приоритет",c:"#EF4444"},
  ] : [
    {v:myTickets.length,                                         l:"Всего",      c:"#FF9A4D"},
    {v:myTickets.filter(t=>t.status==="new").length,             l:"Ожидают",    c:"#F59E0B"},
    {v:myTickets.filter(t=>t.status==="in_progress").length,     l:"В работе",   c:"#FF9A4D"},
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
          <div key={t.id} onClick={()=>{setSelId(t.id);setView("detail");}} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 15px",border:`1px solid ${unanswered?"rgba(232,89,12,.3)":"rgba(255,255,255,.07)"}`,borderRadius:12,background:unanswered?"rgba(232,89,12,.05)":"rgba(255,255,255,.02)",marginBottom:8,cursor:"pointer",transition:"all .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(232,89,12,.4)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=unanswered?"rgba(232,89,12,.3)":"rgba(255,255,255,.07)"}>
            <div style={{width:38,height:38,borderRadius:10,background:cat.color+"18",border:`1px solid ${cat.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{cat.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontSize:13.5,fontWeight:600,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.subject}</span>
                {unanswered&&<span style={{fontSize:10,fontWeight:700,background:"rgba(232,89,12,.2)",color:"#FF9A4D",padding:"2px 7px",borderRadius:99,border:"1px solid rgba(232,89,12,.3)",flexShrink:0}}>Ожидает ответа</span>}
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
  const roleBg    = {admin:"linear-gradient(135deg,#EF4444,#F97316)", hr:"linear-gradient(135deg,#E8590C,#C2410C)", employee:"linear-gradient(135deg,#22C55E,#0EA5E9)"};

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
  const inpF  = {...inp, borderColor:"#E8590C"};
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
      <div style={{background:"linear-gradient(135deg,rgba(232,89,12,.15),rgba(232,89,12,.05))",border:"1px solid rgba(232,89,12,.2)",borderRadius:16,padding:22,marginBottom:18,display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
        <div style={{width:70,height:70,borderRadius:"50%",background:avatarGrad(user.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",boxShadow:"0 0 0 3px rgba(232,89,12,.3)",flexShrink:0}}>
          {getInitials(user.name)}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"Manrope,sans-serif",fontSize:20,fontWeight:800,marginBottom:4}}>{user.name}</div>
          <div style={{fontSize:13,color:"#9CA3AF",marginBottom:8}}>{user.pos} · {user.dept}</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <span className="badge bb">📱 {user.phone}</span>
            <span style={{display:"inline-flex",alignItems:"center",padding:"2px 10px",borderRadius:99,fontSize:11,fontWeight:600,background:roleBg[user.role]+"33",color:user.role==="admin"?"#FCA5A5":user.role==="hr"?"#FF9A4D":"#6EE7B7"}}>{roleLabel[user.role]}</span>
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
                    <div style={{width:32,height:32,borderRadius:8,background:"rgba(232,89,12,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{row.icon}</div>
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
  const roleBg={admin:"linear-gradient(135deg,#EF4444,#F97316)",hr:"linear-gradient(135deg,#E8590C,#C2410C)",employee:"linear-gradient(135deg,#10B981,#0EA5E9)"};
  const roleLabel={admin:"Администратор",hr:"HR-менеджер",employee:"Сотрудник",director:"Директор"};

  const empModules=[
    {icon:"🌱",label:"Адаптация",    mod:"adaptation", c:"#22C55E"},
    {icon:"📊",label:"Оценка",       mod:"annual",      c:"#FF9A4D"},
    {icon:"🎯",label:"Развитие",     mod:"development", c:"#A78BFA"},
    {icon:"📚",label:"Обучение",     mod:"learning",    c:"#F59E0B"},
    {icon:"🤝",label:"Стабильность", mod:"social",      c:"#F472B6"},
    {icon:"📝",label:"Опросы",       mod:"surveys",     c:"#34D399"},
  ];

  const hrModules=[
    {icon:"👥",label:"Сотрудники",   mod:user.role==="admin"?"admin":"hr", c:"#FF9A4D", badge:empNoAdapt},
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
        <div style={{width:46,height:46,borderRadius:"50%",background:avatarGrad(user.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"#fff",flexShrink:0,boxShadow:"0 0 0 3px rgba(232,89,12,.35)",position:"relative",zIndex:1}}>{getInitials(user.name)}</div>
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
            {[{v:employees.length,l:"Сотрудников",c:"#34D399"},{v:empNoAdapt,l:"Без плана",c:"#FCD34D"},{v:news.length,l:"Новостей",c:"#FF9A4D"}].map(s=>(
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
          <button style={{padding:"4px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:"1px solid rgba(255,255,255,.1)",background:newsFilter==="all"?"rgba(232,89,12,.25)":"rgba(255,255,255,.04)",color:newsFilter==="all"?"#FF9A4D":"#6B7280",transition:"all .15s"}} onClick={()=>setNewsFilter("all")}>Все</button>
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

const MKA_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAYFBMVEX///////7+///+//7//v///v7+/v/+/v7+/v39/v7//f7+/f7+/f3+/P3+/Pv9/f39/fz9/P38/Pz8+/v28/Hr4dvdyr7znWebm5v9Zg51Zlw7OTcXFxcICAgDAwMAAAA2tJiSAAAisklEQVR42o19i6Kzqq4utSC2eErrbfjby3j/tzz5koBoHXNt157jby1iyD2BZBvv/cn7iv6xvrjO9NVZix9D8DXdMT79kctsP9EkPjbR4//ku5ERVR7XYmzN76EJHd+zaYb67LfXKU9e2dMOuvRi46N+clEBqmubxuZHYtf1XRdpiF4+xtj1fffAU6f9S3VlNFE4W8YFA8z/rZMabzHQ6Yr4wpqCo7+hXPMGYXFFnKyKAOkSXKYf5IoZUoIyFgA6XZqxadKzQGV9A0CsS1AmoJw5wJwjstjdcvzBwKiw9eM0z8vyLK5lmedpHBinl76PPNNFAKz5FXiJII2nBngrkSsHJIHDvAEiogAdCqgzSBUNLdgl6seEOYJteb5e78/v/vq8XwToPA28BkKkKwmyUsXWOm2BLAeu4gFg5DpjpKCldXmsfjLndIvA6wU4gk1BI3BerxWDGWSCkoDsGUZ+9gwOUlxk6QrhgIyZFzfrCUwKGRCdYNIJ+upKxJtkAtDNy+vNoL0AwzxN4zgMPa5hGMdpAtEFzA8NACJ918m7CRPu7P/nZUVQRQ2EDLNKqyE4VYAM/944ZTyF7vNJ+BnNH1fHDAAgP2+CEWiMUF8ihecCkFigzanYJN4/pwc8C3BCqJUP51oBD7J2Aq+fCLrfzy+9cx57kd5x+uHrHy7+RBgdbvhxmOYnrebz+3rOhMauq7Z4qgt94b7pvGHMVamGAs+13DgF54m2w0wo+RBGlP0B2r+/LoJTBjHGP5/nPAKL7pSFLqsTpyJpd2CaYiWhdhsN7ISH0/jQM3h40WthvifgMiRAGbhwAAcSCyZ00k+j8Cwv7LUARL8h8Tfq7PpvApCk68L3g0AdWKqJX1yrNzvP4L2BPHDdmAlKxKyKyxj+W1VDxu7PeFPWeJcglngypPsStdsEZJVhCbogt6dxq4SPnfEC3jK1YCx+M8HWMzzuRtf93rR0Xdv7HV89AWmqNPIHi1IQiRe7aLcItFm7uZpxQpYwFiS2pTUuES5sSWBMCh4BNCp0jLjr/XZvrwcEagjMe0sjbmk8kXpkEJ8TkGgLNlM4muJ5u/KgKb2YA31E6BuWN12Y+MIoAXSmam930j52N8fma3u7Eb0Fxh9w7sQzEZ1XKx1E9R5wo7OFlTWCLlfMH1iT06xM3eecwRuBmHtrtyZ7C2E2+e39xrROWGRavGiyvt6uLGTUtQdSrH6Gy3KiSyDVx+gD5whxf4i0/tbK46R/ROX/l01w19udVoTF/UwXEraXIJH09heATljfyDfCoBVxKXV5yCq09m2UFYO6g4BnCHkO3gYxRGDHzur8DnpeZTEhgZwBg7EtkbpiEMeKWPHNU/pYF7QN55LM8aQAHqtFlS2Q9wX09SZOGbzS59J/r2yD7F6T4ZeVHT1hEZP0pplJWN5zNJ1rDu1wdh39xuXNyGaVWHtIx+f9C/SNvHhjbi0vwx7b96wV4qEaJiwOCYmgy0IK58vA7R1ls8FEyYGEv/H5y9NcsPIJ2DttncfiMbNRNaU9Osm0RMGG5AVLJXnumczjTmnbrfFdncRvuTEEH9jvDXn7Yeq62zq89QdLT4KT3I+08mI511t149kqYZ5phfAUdtxxIXcrrLjzYOfEtGSXCT6Z4cJrJvTxmMhPXFrWqtmJh1VMcFwzPMbuMBPoHzJ7I9FjvND6wd4rhAqgooitrPFH3kMQ60HwgQYgL3FNe1NFbv1fWqok1SrbOxTSi2/MiaRwRqFQ58twZGM2DMej4v+fTTlVb+b3Ct9A6LOJNVr3DV9bfFqdovNuEYleJCwgc2QZfAOHdWkpi+WY1bMxoXwrw/f7JCnDWknLrmp0fWMbtgAmU8AiZDdeKbFAowOgQtt7xes2j+X3lXAo3vKpYESTFPXXJfQl8e2Z/e73Us9nBGVUNaaIG8yO1JFdk1UKWg6dbmBEokyfcJhSESv+1sla127UhmH4fgk+8MpY3UIRBaS4T/64PJfEu6ZcAdInvojaNrgQRhxMu3xeb8hytQYbFwnV4PKDxiHLn6gdo/jrAR/YL0PfMHiu0APpy2knCaVKLPmeqc837K0CeWh6wqFomzTwqiHuWbFRbwMlsh8j+efPQeAzt4Qkc6DzXH7cbSFs/5Jul6yYb82NIRxIlkkau2OtmvzZkOGPfhD4eoEPzpqrCqtlN66HS/DENUwr0Crc2Raqrs1KpK1bprK8L0Z/LrS7xUBjdo6wY+8eOB9NJPj66lbXSJoVuYqCh9dkUpsCiRayGMssRYrU7D6eNP7uboyEERzPgrKRDiKpsRqXZz1OBm5mnrjwo+y5nC+MA11OcgQqJnr95dLZMlxwLQtLWEWF2J+CFUGTbWH3fjozvbPCdhtSlbo5KANO79dnBnxg4PqAJ+o/BSIzg814av3OYdrIuSFZJm1zgdYlpDxWSJIUr6aPP7jOQ0AWth9jdVs17zlslF/hlqk829IpshvirpQtREcQShCObPWWX2LDRyz8KnfoqYMBP88eT40kv/VKOzhLvg5rYNWsaLdZTx2H4Dz0EtxeGSLTzBCO1cB46Q6kOPMl0pts4UhABti3m98Eplv/LynfSxJoDbhLj46Rb7MiC18uJJvaG1k94na4TpPpclzZXEuroAbwDnkiboUAV7cDVQb8c57LZrvUqo9ry8R4TBrHnEpv2GkguPEI2pv5YTYkbTjEOzBlaflF7j5zSOwiEZgZ8OdGiuPYr/eX7EgRmCYTGHkm0dbBS4CS06BNkcQip6EMX+iHtmGC9c+PEDkBdTJZs8XAGwMdCPwcEwNevtz68EUjb/Yhoy3Mkk0/ujUtUH2Tm9mQiUyS3G3EfYPBABMCz+KHHBiBz5aKMxZxmktSbAvDkikcoiDUlip2kxAkaFf6uHsFo8BE7uM6UYDqzdrBiAQvDhra3INQ5LxXFHlxtsiPboI48YrbbxTYjbRFwmVCf9uQvp4qwc8a54nB0cda8QFJgoHuqi3UKxk7byvCcNBgjlxqa76USSy8G1M6hGxXq0I0TvARBQLLyKmVyOCwIXbOa2o8GS/hcSDwlyWYNMwVGbRby39v9zYR57ZeLUk54e6+3skh+G1zJd4kYtzL27YuNOgNRL54IiFbvBxUwA1QLmKD+ByglNrbvTJlUrJK9sdU5Q/wItacJX1XfYfEII+T+6ezWDwZnEabXaw+QDKZhr5zmVXMarDihcHncWQhx/IaEmq2d6umqYYpf+/ZZFyaajNqhL6voHkaM+xul0kHM0EZLp/SnrAWO4mFLxBobvCCNtlw08IFNtP27i2252IgbI91MAyba0S6xCIYHMrbpCiutrDKLb1zPI8sBjGFx4aZ0JyZVxMCB1rNTXcT0u7CUEXiZGj8fBEYPZF+HYiVKSYmJNX5gs+GBKzLv+hv//7dThC1nH1mi/cwiQvDJvWKNMz0IncCrFrdr1X/75+mxOk/0jtwbMh3ox+Vr4jNfv7dKl/hFl8jrKMEaympbtjKVmoyW3piYA7EFJjzvlFhjSfx9MSFz8E/kuY0yd+M8HcUgdcWAA5J3PrbxNSDKvi59+nuPQF4k1sTlnZnHq50DIhNPqVYpDt5fj9Vevwm6wmF7mcUxlNCoTqMtW7AkZfwIeLzW3wAgH1aOV76Q18wAbs4pA1t46uMwYZfj0dJO/0kN6hWP+qmihIUns63JLTERDfTlGISGlrz6CaKT/rC3WK1fyIrDPFhBN59Q8RkAKEeSPqIxjfj2urnX6ZX41cSY4fjLiSulBPPckfgQ2RvXUO/9aZRlY6RAm42QmdGIXwGuF3iQxpJZ7XRDs9fMtQY8P8qxIOKQZuUKDEMoDbsMdD/2sAAOgbwakiFEIAOE7g7s30LX37imNVYcrpusgKnAewVX01IKSbdpblB5mcEUN3Wo4aO+TwdGRHSCbYOgsGm9l3slDiVvOFu/cM/cHICJDaJxCfBIHjOXbGu20lcDheyx8KTswJGIKX0MOt2lxMurITZOg5VYUnMKiIQAmD2ygAi/GI9BGQQ4QCm4eDOmPaIBycRECTSm6ZlYqfdNWU60K0yTcWe/pS4NbMb5Ijey2LSC6qFxJFCZ0CtDI5gECx89/28zEYnb4ygIM7PBYxqdgDS6hhngXeZmBnvTeFQidjSp5+foW4MC/WtaYqY3DFaRz8hOgl+dRYQCoPuEBH+QTHYm/H9C2wLE/YAmu69ft/ILDOJXQJQ7AfWh9iQVXpza0qfFFO0IjrMmgwMQG7XDFsLJlZsiZgIoKAwOWL4sYHdYSG5VQDmDWwLOcDVN3iVr1cCsLIliYEzRCjXO6bqPVjtLKGmo+XR5M7wQhiVgtPWmXXLnCQdChiZDXqrCYEZ8OxA4d/XYFjw4bMJiQVAwmy8G5EAWjmvhddXkNhBWY6gGCcirkYMSI5ZW5c5ruXU6o1wqbrsioxaDuXw80Sq8HehSEUyC8afIcMEx42zdZwvk2cZQHLCTVvfyfSBBe+mf3Jc2jOA5lzRD0LJfuKnCROs40ijmDUMbdjMNWJOxMp58MGUcmcXGXw7CY2R240iORIMk9y4kZ0W45XEzIPkW0BrgueHn39N9ZDMf0nif7qPRga2FS3MKrBvr4qaSvUAfoap/lFkqt5aI34H7hc5/qW3PqqU9gDZWEsnI9VWBYC/iQkxGwc2BYBM4laNQ46j1e6tOQx+nuyGZckYFK62AVrv6dSHhDJMqFkUjdriiP2kJ1hwVEOmlgQAvp6/SxQfBfSgsOD3yUJiqw0P8sJyUuRe5cnYVkAr3gw8gjPxUau8lBgz4sAEhOSCtYHu00uMiWCwFxYcoEUkD96uPPhaIPI9MA9NA/ZYVik2IUlxyqzJNvX9PEjon/wEVYItqHpJNoUZsmnzgYDgVdgKJhQAGaMrQ9hrdc8Azq/PJJqQ70xvupOFZFXUqm87DWTbDZHvSeWxNWpa9ZnYQ6T75TZ/m5gQWWs9oxeFJwvL4+oM4JvIT9gmzfYzGbDg73NiAF1pi62Gz8QtvaDifmehT2r6378GeheQynXzyQPcmDtSmiUTiiUx8fnLdi5NaK+FmhkIpN5cPIdhWMsyspA4syWxI1kgffXSkIeJCV2mjiHDEUOV4oNbxcqH0HXPXhMzIuuo7NFwQsMML8Agzh5wei1I/B4nTpjUbbjZC5hjHlcpFlPHiTtfM3wf3b60zO3krdSS2GAKw1VIh2tYqlSYYkhpgsCmZoI9XTDkTM8/RGYQhaRzEE11XQHsn7+zbmKABd/jWCjqxIPhEnj3AocH7pGzzw0UP5kWK87QNSXb2ytO16RYc1xpLIl2RjdLCdk6JjF7CrO49U3i1DbrwRFUNRFn9TyzYFcAyEJimkQJYpUZ+W3OQsqbaMrbeVKLUWaEBRPgTlGFddqk4OX0zHWR9SDe+p7zUmwCUGwxDZtZ5AOrUwA77hU1Axhjzx4H6ckhdsmBmTgaTKHC9+mDNKbYqwX/q+mQXGGf7UiyizRlWEmMcEqydoyj+RDA7PPG8ZWMwB15yQGbw8Akoy4+YuyiXLz5eWW112wSuFiPIK33NQULW0PHrpkzGUDAokzYELdCBgoAbc1Cwpkn1gwd6EE/P2CGVYtk19nE8vhjQE7duUq8CKMxiI831TMMILn8BHTSMkJiC5Ptk3NKGATVOiyuE2ofYpAVkOnj4zKw4uRwUISULK6GsGYoLvEDN54/zmvLQyIXvPUU1a785G2RmvjAF0ICvMEBjAKEORKSy4N+4yUDlaxqrKZ2WzZRNa+vPMo8mxzOI3A/+9LsiPUtAOwFwMZB4Tft2Rc8CD2JdyO4pw8CYLeJi3l/RZZMwoL5uovE/CQDuvR4ph+KS6RUzN353tDlG3p/c9u4C4a11+/TCCsYPvOH5En2qMFPrGigBYFKxSCbOtd65fEMoISws7ibTcNHUEiSDdxisuzTrNdTExw3iTQ4o8hpn6vJmhoA1h0+P7E1N7RF/hMk7gRA1n5k7eRfX5AYMxIGcTB6BZDZ8Tn4LufvOdcgSnSVkUVt2ZXdqPJaASSmMq6Tz5evo7JD4kHOXUPRGLB/n0iMwBLuO6TYKgY7FmjPrNAV0dw1iZHv+77DYetOGbt0IMrcoQLIPMifv0b90CyRAew8FE3sVcUxgJF+TKdoY9/RO2PGIFTOL4Z0D/rhMf70qJbQxzuJhDrEljQnjem78QvAsQBQMRjNaXNIu+G/AmAn0issqBjEdQNn31aaKYAOW/b8wPaaEDlqMUDSCH9eGcDEgyZzr1yT/IGifsCjfdK35fMEWxCA8/R9PT/5kBOrmnl/LZ/FFOdejoakq8CgfQiAw/P36PoIBmkIvoAFWUgPhwKDcqSYVc3BhRWoWWMn789r2ZL4yQB+Xs/v60XiSH5CXF78hUQFevNoJIVSumMewIXT0VzlyY5o5sNpMPCTALxkRY0lT8PB1fOOo+nkkDmfpDL9eDRyHJA8tGfdPjicy+QNSvDK8McFbhZFHQpTRwCa+oBb85YPZ934+MlfjB3D6nkeDoIrs54I+nMeBpBNHQOozgLd9T15QY+4Xo80oWMn6aGzhw41Vg96QezYf6Jxj/umegkmbzdVlLKsc95E9vzD/bEZ2MZ4gfc0vzVqynkF0bN84MVYPduwq75KKYBWcx3z3ML9aPMpDfVIGZNuA+9F2G5axjUnbS6yYZ/vOJWeJ5mF7G5lh3Vm0xNTJRq0fZQKF65L63VbBbq1f9Q9CUv/gl4jZGLsXRfRwVDkqiyoaNEqNKrDm8jPoRk7+cFJjQp9IUvfJeERN/4j52gkJsEXGMrIA+TsPq7H2Vn657QymNaogd2jHUlf0xrlXuRt46ify7FBMqXg52HiWFd+6ZxbR3VGUpUnUgA4lsVI43PgtQZN0/sp6TO2ReO8LHPPSmUeunmZJwMd8jA9fiCPfKL5poleS3+mGbc6ZvtJxvJKeexIrrPxdG9eSP3OA+bG9POo+Bh0RvmuPoWE6ljMBe4RRHoQs6uGACVe0FsINGf6RKqph8c6Pd/PhTTek/jBPJ/0+/MJHflWFbnQz8/3MrDFobukHUEp83ouOOA2/xLS5zemx7nLB9jy9WYN+1rEDoldhWbpyP56U6XA3XPkcRb4cLaRXkAWn/NH5NjMv+wnvLjSgl6wMGz0Z+EaiYk1ere8UVo1v8HOOlaE7/kh8cDCGUBUGlAMPfH6n3CJl5eeBo42ZjWo2xAXxefqcI70+qbv+V8zklqHOD0pmjQLXCTCFEuUYhCIB10IGl5FD6amLws8NbKMC4mSeUKeegXwl4OrAYuMT/I06Ql5u2G1DN+Oua7THWNNHiEmh8LA/FqJtnCIRF6R7f1M7xuEDo84JAwylJ3vyJeaMV5V7WvhseKXAFqwBKcIGINjR4/gSRIIjlF7P76zP46jx6JlzCb9NulOMqZZ5HpyVDznuYkffc87uYkH8Qe+M8FDEz5f+uD7SQt76hfEMc/Fxwwgv4fITgASrn3vGG8STfdMHQoyXnKIXhOYL+FLxirOVizpYgwSGCWAfgcg1Ce/YMgALnMB4CIYfPhEYgYwMgbn94QZ5fkuxzYjx3E4kUk8WHdqjTmwtSWJSTcZwb0AOAqJSem+FMA7AxjkBYyTdGUSQ/8BwPsWwIeQWBg/kdjynteUg07Ph/kZ6tfkOSq/IFQiuQCvj8vsGcCHVeqA4cH48++WBwVAlhQ8OAFpMpYehEZIPChSnDFIwQRB2feNiig2/qGm1dAF3QrTtMXIoZEcQJqBAxgm5sE+zT2yUjCrmtkASLLDwQBSsKTBcU4cQC993AIoPChKYPqVUapmZO0d74U9UP2gAOK8QqeRINkrAu05Ly9RfR8F8CPx3QuyM3/zIMdTpHUXcu2RmHpA3y0zmIei4pcCCObBHwXQy6jl+ZoFQEkEwcfvbXPKNW2cjlMaRzFSZAKITpHovSDipDWgeoZLIFHo+kSYNRPx8Qf0GkguHuAKsgrLKLNMpH6fbATNMjNMmIT/wIbMizlFlNrRjGMPITGd6JLka+k2VW03NKYbMPnwf2PyVHFWi76ex0kdAJC4xjH25NIaI1su9CBMvzoLqAc10dZB5rJZasSBILcuzchCAsME7pYcv9cUsEfCBzSWX8Xj6y/wRvnsykOOQjasx8Cc8AQhDeI8xgdO2jt/j9iy6Tprmkenh60IxMhOW9CD1XxuLHZczkP3kI8gmYUPtHxGiXfIbx5ffKzC+uKgd09sOflJeJNdyBjDvsQr0LD3PDQDaXK0LbDbOo0Ur/H2DR+otYCr2c7ickmkhXdEBn8mJQMhjr5LMqxZ8fUEJoTno7q635yQDEWVp4ls1elaehO/y22u5fD2qGhHz3Be8l32eV7s80Rx7mfdz+6lPj8fqiD+e0o6mr3qVk5ytrtTrOBpjqtThkCq29YT1K6EL/zHefBixolnhAR73iOClhaWSKffKu86PXgkCWbvnGvbelvoqUwk/m/cvr79Ln64ZAoEW56lrPeBSpAZPQjOik7227XUwCiR5eybJtjiiopw3b+Vwwk5NRv8etQ5rrW1bgvvJWxOmcZ9mRdHPJ1GI28c3iI+tFGZhNmQaxo6Pj+qGagNVxd8lsLu0NqydDJs6ihbmyt0rC0LXri0td4yd73+w1akl2OgXToGjs2cnMz5LLwd3Iv6CF8nhdssVM79J2PxGdxmX+EV1tr1r8LGM2rUWQ9Dx5DzfU71Bdqm4MxVLoRg3eY4Otruv6slw1F9cTwqZbb7Qp10JOkk55UlBbroOdo+FC1b9Gm2Js9uFeR0UPtb4UgFipVGNPbwvLrdVIeHuiy6DrtCcMssIRzIhxBGv1axpVqbxisKC11obYkEY/eAxrL8a8VLc4DVkz61cqwNddnkxHH+YKk9n2Htv6pPgtNCCNbjmjy2OZdRp9Y4IZ8rx9aW6romFSBtiWlW/LuvIohie1Ma9vTiJsgp4EdaDdf8GB0TAxkyMCBYoeP0yiWzsEutF9IrSIbauGPCVAfkQ7MtB+Y6UlZNsg8bz191/pEpF4vjl9Jzx2xqXaa3rILlxKgO2yqazOjOf1XP+6NihF2zlugPRUp32eQkerk4TohYmwpDmQNkOxB+xzVo3ZMLoWArlOVEhyohkwxssxGQTaHH3sZUa8VTgZsRmQatdSgVJGdj6rAmllROlq5vjwXTbWqS4jfKiiKHlIKL4JXmcqD8rNaxkMe8eD7l7eOmT4bZFDp0UhWTiLyyqv1uwBK2vkzYLSVsarLaPzveePFHicCj1pP08tLy/OBax9cRkn+FyLmGDJioyzfUJ/9/cFM2pWztd2V+ASf8ZSHwr57xjrsOR/zCFMODyD1222yCMBj/VbP23wCG4P1x/4HidqpNQaUcYwXUC+p6N+ooqDeTS8mBbDiGYMM+xkP7VpR4yLmsXIZ4lmYAbl1D/WVnklFpUrVuvEegg1WIFgyZ3KmqIHGQkwexQyEoZ0Nm5BlWG2KsP1Ii5YeL52outWQh15rvO7FsKt71EMHISrjbFEBveiNo0vyhx0Khktb6/SrV7Rj1uWq/HoA+t5t6R921D9sDTy6bxNrtasFnYSoUNHc6SW3rq9gR6ctUVkzhAbBsOndxqGIvu3YIX650w/9cAVqz7Xmz9vLItepIfy3MWd0GeuusOAt2E0ak6thOotPAZ/f3Xt1aoGaKtki7MMl+9YqIeyUjmTUPLAKN+kQCEyJS+1MoNojgX3dRljOs8bO0B9k2nbikeKGgJKhI8UywsqXScq3upo405gnsBfBBgKViPW3mrrCcuW6sXnWpHC4iXwImp4DQfLcVCZuqv73wlG5krTWm2fesc/NBhS/VP3drya0aYMf+oDtt+YdPCWiNu0AYi7DHZQj45HjR8uPixKpDRZxYLmpxVJ2S9qIWpdJAQnqdIMuMwlj1EcKukYE4x6StslUyJ0g+d9EQCGdT6MMq7XxpCHRKIporqUPcaMm/9Tr3OgF8WlHfSXhlUvFomYHYVMxf1j4fDCHJ8qVzRbH9tsDZF77fQTVgYqGdP14j5w/5AHzcI+Dh7LbhQYLXEQOzmLjg9p0q6DlyIcHFnfaNS05wuzULtZaUmu9oKRy0fUEeDBvazH/aw+DkK9tqVO383llwOz1gbYaQT2tK/6QSNaXeWbtNHfgrx0a7N/eZVz6KPHbHZeZ8sPi0N0d2xaHsIj3RUyh0CUMoSd14yTynTNsQSWA04zb6CCvVYL4iMp3gHe44k7v2uFRdXZUNEosIJ/i1fMd46dfzQpoaJys73bZIXfbwRAFmYNnmw6zuOBLVkmueWRedqLTxoZXdTdz0vzHqmdbi1linWko6Cg0Lkzl2RQOFOvdATWrvkhtEWa1tXSmS3XGLQyS9sA16CnFHjG8fNrFbFjsuGDDntXeIZT0ANfPmvDKQyB0Y653T951ZcCXStCeeDZeYuE8mk35jv5yvDmZrz5t9O5fw1XzAcPqkN36WDl7gmV/sfnTx/+BB2+9uKvq9E3LwjKnhkz2oVc/SbqLf9CPch6s29wUz8/OXkVnI89q/y/uDjEKp+1hzdNF0M9A3pH5jRgLplQMvynjBb5vetfsa+rT0Xg9HT7J0nrvnM8scsTpXNvCp4FPbXZF5pQYr4ogEUZcJkXqr9bENG/15Me68SwbEVR8Es28qciEI+1l705mJtLa22oz2y1VoC1tqMp9rXybO+E/EJ885mohufCAHkrl12PJt2flFXH6TGgBYUYyXLcenhnxAImOAW0z6lRnPfk1XhUOBDGh728/87CAtCLlZYLdWwRslhimCAuf/R1e+fLoEyX005Jv0NS9uqhq1E/F/JzN910dp0qngcRNH7pDYqYQ6f7QjcHArsk5rMiLqNbDWroZQXkSo96926uQjSLXbmNzr2pyh1ZbBAzb+BDxp9MmnGey5IOrFl1lDs81fpowd/Xdaw6GSTjF1cRTcTXjfa2EYuadzu8tHwuviw0DaMpiRntukSpfO2q8dxgp39KzW2CX/yhTcc9kyT9nFlbucvjKIRDHAmNrFGo/ToARp9+ADqkQ9o21ssZbUGZV7sUqfUytVqN+NNVzRA9ysqY+071Vt8uCbe33qASo9cxVGIDJBubkGaQQsqzDa4/Qj6+tjCgNcjrbPB7abNyuTN7NWdlVFCwF7VR0cXB1zm9K3tEfGASKAwE2LuaOyXLN0Ugb06BesMpLBk+xowUXnY0/SyzZO6tNmj9MGUOr2lEKLfu2ZqzD244yW2V+HRj/cBFqaGXNr6A8tA8QNnf8Pod1C4hKJ3cbIn7ca052Lpj3AIvfM/QgIjB7zQNPxOR8VWXA+V2BDy29GpjJG/9AWXdUWE9UmK2/X6NCI1ncrzOdvr6QlJ1zy1RZqTSn2RstnaUjdHx6khIQ8uR01SD3h1Js6vVt+K3aFTnrQo8kYKUmftiSsLZy+9Lt2tGk4i9itdAMDJg6UdsropQw2fD7T709uOu7Zy9DaqmDXyI8dXMnwsZarcqp2a07jvtEfule4dl+GJOaPrQP3whb2+8BcS1d07Ce/y5bojGCc+OJk3f+0GC5nENaw035LOqdkWt4B8mrQTsXGtSUY29xW/quv/OfDeCXqM4/mM5l516reeVMsqwHbwEXj7sJhTTVaX1bEFJwgqdlzutHCkMWs80ohYYIPndiZLkZ/pChkm9Ccv72LNYsRhO/WvLop5Xc9++q20pO8btE8fef/OG5c/j82sIfN7Ys95jXToW+9FJ2Z7FcC0u5WJI3owqZ1kcniF+VQrtZ79WLtVhfui9FIN1db8a1ldufO3PjcJOAN+nYlR7o+VtVixpt8++zWnRgOuk55YfECqOosrG4PoSsouMmAFgl695e7hXxdPA4Av1Irf12VSXSym75VYZvUafz5rKjfgbKfv/7/K2FmGH58GTUAAAAASUVORK5CYII=";

/* ═════════════════════ МКА ИНЖИНИРИНГ · ОБЩЕЕ ═════════════════════ */
const COMPANY = { name: "ТОО «МКА Инжиниринг»", short: "МКА Инжиниринг", city: "г. Алматы" };

const pad2 = n => String(n).padStart(2, "0");
const isoDay = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const todayISO = () => isoDay(new Date());
const ruDate = iso => { if (!iso) return "—"; const [y, m, d] = iso.slice(0, 10).split("-"); return `${d}.${m}.${y}`; };
const ruDT = iso => { if (!iso) return "—"; const d = new Date(iso); return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}, ${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
const hhmm = d => `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
const addWorkDays = (iso, n) => { const d = new Date(iso); let k = 0; while (k < n) { d.setDate(d.getDate() + 1); const w = d.getDay(); if (w !== 0 && w !== 6) k++; } return d.toISOString(); };
const MONTHS_RU = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const MONTHS_RU_GEN = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const DOW_RU = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];

const loadLS = (key, init) => { try { const s = localStorage.getItem(key); if (s) return JSON.parse(s); } catch (e) {} return typeof init === "function" ? init() : init; };
const useStored = (key, init) => {
  const [v, setV] = useState(() => loadLS(key, init));
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }, [key, v]);
  return [v, setV];
};

const downloadCSV = (name, rows) => {
  const csv = "﻿" + rows.map(r => r.map(c => { const s = String(c ?? ""); return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(";")).join("\r\n");
  const b = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
};
const escHTML = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const allPeople = employees => [...DEMO_ACCOUNTS, ...employees];
const personOf = (people, id) => people.find(p => p.id === id) || { id, name: "Сотрудник", pos: "", dept: "" };
const shortName = n => { const p = (n || "").split(" "); return p.length >= 2 ? `${p[0]} ${p[1][0]}.${p[2] ? " " + p[2][0] + "." : ""}` : n; };
const isStaffRole = r => r === "hr" || r === "admin";

/* ── Языки ── */
const I18N = {
  ru: {
    home: "Главная", news: "Новости", adaptation: "Адаптация", annual: "Годовая оценка", development: "Зоны развития",
    learning: "Обучение", orders: "Приказы", time: "Учёт времени", policies: "Положения и правила", tickets: "Обращения",
    surveys: "Опросники", profile: "Мой профиль", hr: "Сотрудники", reports: "Отчётность", admin: "Управление",
    hrmod: "HR-модуль", sign: "На подпись", journal: "Журнал приказов",
    role_admin: "Администратор", role_hr: "HR-менеджер", role_employee: "Сотрудник", role_director: "Директор",
    logout: "Выйти", theme: "Оформление", lang: "Язык",
    th_a: "Промышленный", th_b: "Светлый", th_c: "Тёмный",
    pick_acc: "Выберите аккаунт", demo: "Демо-режим для быстрого входа", register: "+ Зарегистрироваться",
    tagline: "HR-портал сотрудников",
    s_home_admin: "Панель управления", s_home_hr: "Кабинет HR", s_home_dir: "Кабинет директора", s_home_emp: "Ваш HR-портал",
    s_news: "Важные события, переводы и объявления", s_adaptation: "Программа испытательного срока", s_annual: "Оценка эффективности 2026",
    s_development: "Тест на компетенции", s_learning: "Нормативные документы компании", s_profile: "Личные данные и настройки",
    s_tickets_hr: "Входящие обращения сотрудников", s_tickets: "Мои обращения в HR", s_surveys: "Опросы для сотрудников",
    s_reports: "Аналитика по всем HR-модулям", s_hr: "Назначение адаптации и профили", s_admin: "Управление пользователями и системой",
    s_orders_hr: "Создание, подписание, ознакомление и учёт по 4 журналам", s_orders_dir: "Журнал приказов компании", s_orders: "Приказы для ознакомления",
    s_sign: "Приказы, ожидающие вашей подписи", s_time_hr: "Отметки по QR, табель и заявки", s_time: "Мои отметки, табель и заявки",
    s_policies_hr: "Внутренние HR-документы: версии и ознакомление", s_policies: "Документы компании для ознакомления",
    vacancies: "Вакансии", enbek: "Enbek · ЕСУТД", s_vacancies: "Заявки на вакансии и публикация на Enbek.kz", s_enbek: "Трудовые договоры в ЕСУТД, сверка и журнал обмена",
  },
  kz: {
    home: "Басты бет", news: "Жаңалықтар", adaptation: "Бейімделу", annual: "Жылдық бағалау", development: "Даму аймақтары",
    learning: "Оқыту", orders: "Бұйрықтар", time: "Уақыт есебі", policies: "Ережелер мен қағидалар", tickets: "Өтініштер",
    surveys: "Сауалнамалар", profile: "Менің профилім", hr: "Қызметкерлер", reports: "Есептілік", admin: "Басқару",
    hrmod: "HR-модуль", sign: "Қол қоюға", journal: "Бұйрықтар журналы",
    role_admin: "Әкімші", role_hr: "HR-менеджер", role_employee: "Қызметкер", role_director: "Директор",
    logout: "Шығу", theme: "Безендіру", lang: "Тіл",
    th_a: "Өнеркәсіптік", th_b: "Ашық", th_c: "Қараңғы",
    pick_acc: "Аккаунтты таңдаңыз", demo: "Жылдам кіру үшін демо-режим", register: "+ Тіркелу",
    tagline: "Қызметкерлердің HR-порталы",
    s_home_admin: "Басқару панелі", s_home_hr: "HR кабинеті", s_home_dir: "Директор кабинеті", s_home_emp: "Сіздің HR-порталыңыз",
    s_news: "Маңызды оқиғалар, ауысулар және хабарландырулар", s_adaptation: "Сынақ мерзімі бағдарламасы", s_annual: "2026 жылғы тиімділікті бағалау",
    s_development: "Құзыреттер тесті", s_learning: "Компанияның нормативтік құжаттары", s_profile: "Жеке деректер мен баптаулар",
    s_tickets_hr: "Қызметкерлердің кіріс өтініштері", s_tickets: "HR-ға менің өтініштерім", s_surveys: "Қызметкерлерге арналған сауалнамалар",
    s_reports: "Барлық HR-модульдер бойынша талдау", s_hr: "Бейімделуді тағайындау және профильдер", s_admin: "Пайдаланушылар мен жүйені басқару",
    s_orders_hr: "4 журнал бойынша жасау, қол қою, танысу және есеп", s_orders_dir: "Компания бұйрықтарының журналы", s_orders: "Танысуға арналған бұйрықтар",
    s_sign: "Қол қоюыңызды күтетін бұйрықтар", s_time_hr: "QR белгілері, табель және өтінімдер", s_time: "Менің белгілерім, табель және өтінімдер",
    s_policies_hr: "Ішкі HR-құжаттар: нұсқалар және танысу", s_policies: "Танысуға арналған компания құжаттары",
    vacancies: "Бос орындар", enbek: "Enbek · ЕСУТД", s_vacancies: "Бос орындарға өтінімдер және Enbek.kz-ке жариялау", s_enbek: "ЕСУТД-дағы еңбек шарттары, салыстыру және алмасу журналы",
  },
};


/* ── Иконки меню (линейные, единый стиль) ── */
const NAV_PATHS = {
  home: ["M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  news: ["M4 5h12a1 1 0 0 1 1 1v12a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z", "M17 9h3v9a2 2 0 0 1-2 2", "M8 9h5M8 13h5M8 17h3"],
  hr: ["M9 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z", "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6", "M16 4.6a3.5 3.5 0 0 1 0 6.8", "M21 20c0-2.5-1.5-4.6-3.8-5.5"],
  orders: ["M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z", "M14 3v5h5", "M8.5 13h7M8.5 17h4"],
  orders_sign: ["M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z", "M14.5 7.5l3 3", "M13 20h7"],
  vacancies: ["M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z", "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M3 13h18"],
  enbek: ["M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1", "M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"],
  time: ["M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z", "M12 7v5l3.2 2"],
  policies: ["M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z", "M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3", "M9 7.5h6"],
  reports: ["M3 21h18", "M6.5 17v-5M11.5 17V7M16.5 17v-8"],
  tickets: ["M3 13h5l1.5 3h5L16 13h5", "M5.5 5h13L21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z"],
  surveys: ["M7 4h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M9 2.5h6v3H9z", "m9 13 2 2 4-4"],
  profile: ["M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", "M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"],
  adaptation: ["M12 21v-9", "M12 12C12 7.6 8.4 5 4 5c0 4.4 3.6 7 8 7z", "M12 14c0-4 3.2-6.5 8-6.5 0 4-3.2 6.5-8 6.5z"],
  annual: ["M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.4l-5.2 2.8 1-5.9L3.5 9.2l5.9-.8z"],
  development: ["M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z", "M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z", "M12 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"],
  learning: ["M2 9l10-5 10 5-10 5z", "M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5", "M22 9v6"],
  admin: ["M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z", "M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"],
  logout: ["M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3", "m10 16-4-4 4-4", "M6 12h10"],
  theme: ["M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z", "M12 3v18"],
};
function NavIcon({ k, size = 18 }) {
  const ps = NAV_PATHS[k] || NAV_PATHS.home;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
      {ps.map((d, i) => <path key={i} d={d} />)}
      {k === "theme" && <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />}
    </svg>
  );
}

/* ── Оформление ── */
const THEMES = [
  { id: "a", sw: ["#0F2A44", "#F3F6F9", "#C2410C"] },
  { id: "b", sw: ["#FFFFFF", "#FAFAF9", "#C2410C"] },
  { id: "c", sw: ["#111315", "#1D2126", "#FF7A1A"] },
];

function ThemePicker({ theme, setTheme, lang, title, note }) {
  const t = I18N[lang];
  return (
    <div className="card">
      <div className="ct">🎨 {title || t.theme}</div>
      {note && <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: -6, marginBottom: 12 }}>{note}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 10 }}>
        {THEMES.map(th => {
          const on = theme === th.id;
          return (
            <button key={th.id} onClick={() => setTheme(th.id)} aria-pressed={on}
              style={{ textAlign: "left", cursor: "pointer", borderRadius: 12, padding: 10, background: "var(--sf2)", border: on ? "2px solid var(--ac)" : "1px solid var(--bd)", color: "var(--tx)", fontFamily: "Inter,sans-serif" }}>
              <div style={{ display: "flex", height: 54, borderRadius: 8, overflow: "hidden", border: "1px solid var(--bd)", marginBottom: 8 }}>
                <div style={{ width: "30%", background: th.sw[0] }} />
                <div style={{ flex: 1, background: th.sw[1], display: "flex", alignItems: "flex-end", padding: 6 }}>
                  <div style={{ width: 34, height: 10, borderRadius: 4, background: th.sw[2] }} />
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, display: "flex", justifyContent: "space-between" }}>{t["th_" + th.id]}{on && <span style={{ color: "var(--ac)" }}>✓</span>}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Защищённый просмотр (сотрудник): без копирования, печати, сохранения ── */
function ProtectedView({ user, children }) {
  const stamp = `${user.name} · ${ruDT(new Date().toISOString())} · только для ознакомления`;
  useEffect(() => {
    const onKey = e => {
      const k = (e.key || "").toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "p", "s", "a", "x"].includes(k)) { e.preventDefault(); }
      if (k === "printscreen") { try { navigator.clipboard && navigator.clipboard.writeText(""); } catch (er) {} }
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("noprint");
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("noprint"); };
  }, []);
  return (
    <div onContextMenu={e => e.preventDefault()} onCopy={e => e.preventDefault()} onDragStart={e => e.preventDefault()}
      style={{ position: "relative", userSelect: "none", WebkitUserSelect: "none" }}>
      {children}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ transform: "rotate(-24deg)", whiteSpace: "nowrap", fontSize: 15, fontWeight: 700, color: "rgba(194,65,12,.14)", fontFamily: "Inter,sans-serif" }}>{stamp} &nbsp;&nbsp; {stamp}</div>
        ))}
      </div>
    </div>
  );
}

/* ── Шапка документа на бланке ── */
function Letterhead() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 10, borderBottom: "1px solid #111" }}>
      <img src={MKA_LOGO} alt="" style={{ width: 46, height: 46, objectFit: "contain" }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{COMPANY.name}</span>
        <span style={{ fontSize: 11 }}>{COMPANY.city}</span>
      </div>
    </div>
  );
}

const Pill = ({ tone = "gr", children, style }) => {
  const m = { ok: ["var(--okbg)", "var(--ok)"], warn: ["var(--wnbg)", "var(--wn)"], err: ["var(--erbg)", "var(--er)"], info: ["var(--inbg)", "var(--in)"], gr: ["var(--sf2)", "var(--tx2)"], ac: ["var(--acbg)", "var(--ac2)"] }[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 7, background: m[0], color: m[1], whiteSpace: "nowrap", border: tone === "gr" ? "1px solid var(--bd)" : "none", ...style }}>{children}</span>;
};

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="mlov" onClick={onClose}>
      <div className="ml" style={{ maxWidth: wide ? 980 : 560 }} onClick={e => e.stopPropagation()} role="dialog" aria-label={title}>
        <div className="mlh">
          <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 16, fontWeight: 800, color: "var(--tx)" }}>{title}</div>
          <button className="mlclose" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const Field = ({ label, children, style }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", letterSpacing: ".4px", ...style }}>
    {label}{children}
  </label>
);

/* ═════════════════════ ПРИКАЗЫ ═════════════════════ */
const ORDER_TYPES = [
  { id: "OD", code: "ОД", name: "По основной деятельности", desc: "Назначение ответственных, утверждение положений, организация производственной деятельности" },
  { id: "LS", code: "Л/С", name: "По личному составу", desc: "Приём на работу, увольнение, перемещение работников" },
  { id: "K", code: "К", name: "По кадровым и оперативным вопросам", desc: "Отпуска, командировки, премирование, дисциплинарные взыскания" },
  { id: "AH", code: "АХ", name: "По административно-хозяйственным вопросам", desc: "Эксплуатация помещений, транспорт, материально-техническое обеспечение" },
];
const OT = Object.fromEntries(ORDER_TYPES.map(t => [t.id, t]));
const ORDER_STATUS = {
  draft: { label: "Черновик", tone: "gr" },
  sign: { label: "На подписи", tone: "warn" },
  returned: { label: "Возвращён", tone: "err" },
  ack: { label: "На ознакомлении", tone: "info" },
  done: { label: "Исполнен", tone: "ok" },
};
const ORDER_TEMPLATES = {
  OD: [
    { t: "Об утверждении внутреннего документа", b: "1. Утвердить [наименование документа] (приложение 1).\n2. Руководителям подразделений обеспечить ознакомление работников и соблюдение документа с [дата].\n3. Контроль за исполнением приказа оставляю за собой." },
    { t: "О назначении ответственного лица", b: "1. Назначить [ФИО, должность] ответственным за [участок работы] с [дата].\n2. [ФИО] обеспечить [перечень обязанностей].\n3. Контроль за исполнением приказа оставляю за собой." },
  ],
  LS: [
    { t: "О приёме на работу", b: "1. Принять [ФИО] на должность [должность] в [подразделение] с [дата] с испытательным сроком [срок] месяца.\n2. Установить должностной оклад согласно штатному расписанию.\n3. Основание: трудовой договор от [дата] № [номер]." },
    { t: "О переводе работника", b: "1. Перевести [ФИО] с должности [должность] на должность [должность] в [подразделение] с [дата].\n2. Основание: заявление работника, дополнительное соглашение к трудовому договору." },
    { t: "О расторжении трудового договора", b: "1. Расторгнуть трудовой договор с [ФИО], [должность], [дата] по [основание, статья ТК РК].\n2. Бухгалтерии произвести окончательный расчёт.\n3. Основание: [документ]." },
  ],
  K: [
    { t: "О предоставлении ежегодного трудового отпуска", b: "1. Предоставить [ФИО], [должность], ежегодный оплачиваемый трудовой отпуск продолжительностью [N] календарных дней с [дата] по [дата].\n2. Бухгалтерии произвести оплату отпускных.\n3. Основание: заявление работника." },
    { t: "О направлении в командировку", b: "1. Направить [ФИО], [должность], в служебную командировку в [город] с [дата] по [дата] с целью [цель].\n2. Бухгалтерии выдать аванс на командировочные расходы.\n3. Основание: служебная записка." },
    { t: "О премировании", b: "1. За [основание] выплатить премию работникам согласно приложению 1.\n2. Бухгалтерии произвести выплату с заработной платой за [месяц].\n3. Основание: Положение о премировании." },
    { t: "О дисциплинарном взыскании", b: "1. За [нарушение] объявить [ФИО], [должность], [замечание / выговор].\n2. Основание: объяснительная работника от [дата], акт от [дата]." },
  ],
  AH: [
    { t: "О закреплении служебного транспорта", b: "1. Закрепить автомобиль [марка, гос. номер] за [ФИО, должность] с [дата].\n2. [ФИО] обеспечить сохранность и техническое состояние транспортного средства." },
    { t: "О проведении инвентаризации", b: "1. Провести инвентаризацию [объект] по состоянию на [дата].\n2. Утвердить состав инвентаризационной комиссии: [ФИО].\n3. Результаты представить до [дата]." },
  ],
};
const orderNo = o => (o.num ? `${o.num}-${OT[o.type].code}` : "—");
const orderStatus = o => (o.status === "ack" && o.recipients.length && o.recipients.every(r => o.acks[r]) ? "done" : o.status);
const ackDeadline = o => (o.signedAt ? addWorkDays(o.signedAt, o.deadlineDays || 3) : null);
const overdueCount = o => { const dl = ackDeadline(o); if (!dl || orderStatus(o) !== "ack" || new Date() < new Date(dl)) return 0; return o.recipients.filter(r => !o.acks[r]).length; };
const nextNum = (orders, type, year) => 1 + orders.filter(o => o.type === type && o.year === year && o.num).reduce((m, o) => Math.max(m, o.num), 0);

const INIT_ORDERS = () => {
  const y = new Date().getFullYear();
  const d = k => { const x = new Date(); x.setDate(x.getDate() - k); return x.toISOString(); };
  const base = { year: y, deadlineDays: 3, attachments: [], acks: {}, createdBy: "hr1", returnComment: "" };
  return [
    { ...base, id: "o1", type: "OD", num: 1, date: d(30).slice(0, 10), title: "Об утверждении Правил внутреннего трудового распорядка", body: "1. Утвердить Правила внутреннего трудового распорядка ТОО «МКА Инжиниринг» (приложение 1).\n2. Руководителям подразделений обеспечить ознакомление работников с Правилами.\n3. Контроль за исполнением приказа оставляю за собой.", recipients: ["e1", "e2", "e3", "e4", "e5"], status: "ack", signedBy: "dir1", signedAt: d(29), acks: { e1: d(28), e2: d(28), e3: d(27), e4: d(27), e5: d(26) } },
    { ...base, id: "o2", type: "LS", num: 1, date: d(12).slice(0, 10), title: "О приёме на работу (Сарсенова Д. Б.)", body: "1. Принять Сарсенову Динару Болатовну на должность менеджера по продажам в отдел продаж с испытательным сроком 3 месяца.\n2. Установить должностной оклад согласно штатному расписанию.\n3. Основание: трудовой договор.", recipients: ["e4"], status: "ack", signedBy: "dir1", signedAt: d(12), acks: { e4: d(11) } },
    { ...base, id: "o3", type: "K", num: 1, date: d(6).slice(0, 10), title: "О предоставлении ежегодного трудового отпуска (Нурланов Е. А.)", body: "1. Предоставить Нурланову Ерлану Асхатовичу ежегодный оплачиваемый трудовой отпуск продолжительностью 14 календарных дней.\n2. Бухгалтерии произвести оплату отпускных.\n3. Основание: заявление работника.", recipients: ["e2"], status: "ack", signedBy: "dir1", signedAt: d(6), acks: {} },
    { ...base, id: "o4", type: "OD", num: 2, date: d(1).slice(0, 10), title: "Об утверждении регламента хранения химических реагентов", body: "1. Утвердить Регламент хранения химических реагентов (приложение 1).\n2. Заведующему складом обеспечить соблюдение Регламента.\n3. Контроль за исполнением приказа оставляю за собой.", recipients: ["e2", "e3", "e5"], status: "sign", signedBy: null, signedAt: null },
    { ...base, id: "o5", type: "AH", num: 1, date: d(3).slice(0, 10), title: "О закреплении служебного транспорта за отделом логистики", body: "1. Закрепить служебный автомобиль за отделом логистики и склада.\n2. Руководителю отдела обеспечить сохранность транспортного средства.", recipients: ["e2"], status: "returned", signedBy: null, signedAt: null, returnComment: "Укажите марку и гос. номер автомобиля." },
    { ...base, id: "o6", type: "K", num: null, date: todayISO(), title: "О направлении в командировку (г. Шымкент)", body: "1. Направить [ФИО] в служебную командировку в г. Шымкент.\n2. Бухгалтерии выдать аванс на командировочные расходы.", recipients: [], status: "draft", signedBy: null, signedAt: null },
  ];
};

/* Лист документа приказа */
function OrderPaper({ order, people, compact }) {
  const dir = order.signedBy ? personOf(people, order.signedBy) : DEMO_ACCOUNTS.find(a => a.role === "director");
  return (
    <div style={{ background: "#FFFFFF", color: "#111111", borderRadius: 4, padding: compact ? "24px 26px" : "34px 40px", fontFamily: "'PT Serif',Georgia,serif", fontSize: 13, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 1px 4px rgba(15,23,42,.18)", minHeight: compact ? 0 : 560 }}>
      <Letterhead />
      <div style={{ textAlign: "center", fontWeight: 700, fontSize: 16, letterSpacing: 2, paddingTop: 6 }}>ПРИКАЗ</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>{ruDate(order.date)}</span><span>№ {orderNo(order)}</span><span>{COMPANY.city}</span></div>
      <div style={{ fontWeight: 700 }}>{order.title || "[Заголовок приказа]"}</div>
      <div style={{ whiteSpace: "pre-wrap" }}>{order.body || "[Текст приказа]"}</div>
      {order.attachments?.length > 0 && <div style={{ fontSize: 12 }}>Приложения: {order.attachments.map(a => a.name).join(", ")}</div>}
      <div style={{ marginTop: "auto", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <span style={{ fontWeight: 700 }}>Директор</span>
        {order.signedAt
          ? <span style={{ border: "1.5px solid #11643F", color: "#11643F", borderRadius: 6, padding: "5px 10px", fontFamily: "Inter,sans-serif", fontSize: 10.5, lineHeight: 1.35, display: "flex", flexDirection: "column" }}><b>ПОДПИСАНО ДИРЕКТОРОМ</b><span>{ruDT(order.signedAt)}</span></span>
          : <span style={{ border: "1.5px dashed #C2410C", color: "#B23A0A", padding: "5px 10px", borderRadius: 6, fontFamily: "Inter,sans-serif", fontSize: 11, fontWeight: 600 }}>место для подписи</span>}
        <span>{dir ? shortName(dir.name) : "[ФИО директора]"}</span>
      </div>
    </div>
  );
}

/* PDF-файл для HR и директора: приказ + подпись + лист ознакомления (скачивается сразу) */
let _pdfMake = null;
async function getPdfMake() {
  if (_pdfMake) return _pdfMake;
  const pm = await import("pdfmake/build/pdfmake");
  const vf = await import("pdfmake/build/vfs_fonts");
  const pdfMake = pm.default || pm;
  const vfs = vf.default || vf;
  pdfMake.vfs = vfs.pdfMake ? vfs.pdfMake.vfs : vfs;
  pdfMake.fonts = { Roboto: { normal: "Roboto-Regular.ttf", bold: "Roboto-Medium.ttf", italics: "Roboto-Italic.ttf", bolditalics: "Roboto-MediumItalic.ttf" } };
  _pdfMake = pdfMake;
  return pdfMake;
}
function orderDocDefinition(order, people) {
  const dir = personOf(people, order.signedBy);
  const head = () => ({
    columns: [{ image: MKA_LOGO, width: 46 }, { stack: [{ text: COMPANY.name, bold: true, fontSize: 12 }, { text: COMPANY.city, fontSize: 9, color: "#444444" }], margin: [10, 8, 0, 0] }],
    margin: [0, 0, 0, 0],
  });
  const headBlock = () => ({ table: { widths: ["*"], body: [[head()]] }, layout: { hLineWidth: i => (i === 1 ? 1 : 0), vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingBottom: () => 6 }, margin: [0, 0, 0, 14] });
  const rows = order.recipients.map((r, i) => { const p = personOf(people, r); const a = order.acks[r]; return [String(i + 1), p.name, p.pos || "", a ? ruDT(a) : "—", a ? "Ознакомлен(а) в HR-портале" : "Не ознакомлен(а)"]; });
  return {
    pageSize: "A4", pageMargins: [40, 40, 40, 40],
    info: { title: `Приказ № ${orderNo(order)}`, author: COMPANY.name },
    defaultStyle: { font: "Roboto", fontSize: 11 },
    content: [
      headBlock(),
      { text: "ПРИКАЗ", alignment: "center", bold: true, fontSize: 15, characterSpacing: 2, margin: [0, 4, 0, 10] },
      { columns: [{ text: ruDate(order.date) }, { text: `№ ${orderNo(order)}`, alignment: "center" }, { text: COMPANY.city, alignment: "right" }], margin: [0, 0, 0, 14] },
      { text: order.title, bold: true, margin: [0, 0, 0, 10] },
      { text: order.body, lineHeight: 1.3, margin: [0, 0, 0, 10] },
      order.attachments && order.attachments.length ? { text: "Приложения: " + order.attachments.map(a => a.name).join(", "), fontSize: 9, color: "#444444", margin: [0, 0, 0, 10] } : "",
      { columns: [{ text: "Директор", bold: true }, { text: shortName(dir.name), alignment: "right" }], margin: [0, 26, 0, 12] },
      {
        table: { widths: ["*"], body: [[{ stack: [
          { text: `ДОКУМЕНТ ПОДПИСАН В HR-ПОРТАЛЕ ${COMPANY.short.toUpperCase()}`, bold: true, fontSize: 10 },
          { text: `Подписант: ${dir.name}, Директор, ${COMPANY.name}`, fontSize: 9.5 },
          { text: `Дата и время подписи: ${ruDT(order.signedAt)} (UTC+5)`, fontSize: 9.5 },
          { text: `Код проверки: ${order.sigId || order.id}`, fontSize: 9.5 },
        ], color: "#0F3D26", margin: [8, 6, 8, 6] }]] },
        layout: { hLineColor: () => "#11643F", vLineColor: () => "#11643F", hLineWidth: () => 1.2, vLineWidth: () => 1.2 },
      },
      { text: "", pageBreak: "after" },
      headBlock(),
      { text: "ЛИСТ ОЗНАКОМЛЕНИЯ", alignment: "center", bold: true, fontSize: 13, characterSpacing: 1.5, margin: [0, 4, 0, 4] },
      { text: `с приказом № ${orderNo(order)} от ${ruDate(order.date)} «${order.title}»`, alignment: "center", fontSize: 9.5, color: "#444444", margin: [0, 0, 0, 12] },
      {
        table: { headerRows: 1, widths: [20, "*", 110, 85, 95], body: [
          ["№", "ФИО", "Должность", "Дата и время", "Отметка"].map(t => ({ text: t, bold: true, fillColor: "#EEEEEE" })),
          ...(rows.length ? rows : [[{ text: "Список ознакомления пуст", colSpan: 5 }, "", "", "", ""]]),
        ] },
        fontSize: 9.5,
      },
      { text: `Ознакомление подтверждено каждым сотрудником в личном кабинете HR-портала ${COMPANY.short}. Дата и время фиксируются автоматически и не редактируются. Сформировано: ${ruDT(new Date().toISOString())}.`, fontSize: 8.5, color: "#444444", margin: [0, 12, 0, 0] },
    ],
  };
}
async function printOrderPDF(order, people) {
  try {
    const pdfMake = await getPdfMake();
    const name = `Приказ_${orderNo(order).replace(/\//g, "")}_${ruDate(order.date)}.pdf`;
    pdfMake.createPdf(orderDocDefinition(order, people)).download(name);
  } catch (e) {
    console.error(e);
    alert("Не удалось сформировать PDF. Обновите страницу и попробуйте ещё раз.");
  }
}

function exportJournal(orders, people, typeFilter) {
  const list = orders.filter(o => o.num && (typeFilter === "all" || o.type === typeFilter)).sort((a, b) => a.type.localeCompare(b.type) || a.num - b.num);
  const rows = [["Журнал", "Рег. №", "Дата", "Заголовок", "Статус", "Подписан", "Ознакомлено", "Всего к ознакомлению"]];
  list.forEach(o => rows.push([OT[o.type].name + " (" + OT[o.type].code + ")", orderNo(o), ruDate(o.date), o.title, ORDER_STATUS[orderStatus(o)].label, o.signedAt ? ruDT(o.signedAt) : "", o.recipients.filter(r => o.acks[r]).length, o.recipients.length]));
  downloadCSV(`Журнал_приказов_${typeFilter === "all" ? "все" : OT[typeFilter].code.replace("/", "")}_${todayISO()}.csv`, rows);
}

/* Карточка приказа (HR/директор) */
function OrderDetail({ order, people, user, onClose, onEdit, onDelete }) {
  const st = orderStatus(order);
  const canDownload = (isStaffRole(user.role) || user.role === "director") && order.signedAt;
  const acked = order.recipients.filter(r => order.acks[r]).length;
  return (
    <Modal title={`Приказ № ${orderNo(order)}`} onClose={onClose} wide>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 16 }} className="ord-grid">
        <OrderPaper order={order} people={people} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><Pill tone={ORDER_STATUS[st].tone}>{ORDER_STATUS[st].label}</Pill><Pill tone="ac">{OT[order.type].code}</Pill></div>
          <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>{OT[order.type].name}</div>
          {order.returnComment && st === "returned" && <div style={{ fontSize: 12.5, padding: 10, borderRadius: 9, background: "var(--erbg)", color: "var(--er)" }}>Замечание директора: {order.returnComment}</div>}
          <div style={{ fontSize: 12.5, color: "var(--tx)" }}>Подпись: {order.signedAt ? ruDT(order.signedAt) : "—"}</div>
          {order.signedAt && <div style={{ fontSize: 12.5, color: "var(--tx)" }}>Срок ознакомления: до {ruDate(ackDeadline(order))}</div>}
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", marginTop: 4 }}>Ознакомление · {acked}/{order.recipients.length}</div>
          <div style={{ maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5 }}>
            {order.recipients.length === 0 && <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Список не задан</div>}
            {order.recipients.map(r => { const p = personOf(people, r); const a = order.acks[r]; return (
              <div key={r} style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12.5, padding: "6px 8px", borderRadius: 8, background: "var(--sf2)", color: "var(--tx)" }}>
                <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shortName(p.name)}</span>
                <span style={{ color: a ? "var(--ok)" : "var(--tx2)", whiteSpace: "nowrap" }}>{a ? ruDT(a) : "ожидается"}</span>
              </div>); })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: "auto" }}>
            {canDownload && <button className="btn bp" onClick={() => printOrderPDF(order, people)}>⬇ Скачать PDF с подписью и листом ознакомления</button>}
            {isStaffRole(user.role) && (st === "draft" || st === "returned") && <button className="btn bo" onClick={onEdit}>✏️ Редактировать</button>}
            {isStaffRole(user.role) && st === "draft" && <button className="btn bd" onClick={onDelete}>Удалить черновик</button>}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* Форма создания / редактирования */
function OrderForm({ orders, setOrders, employees, user, editing, onDone }) {
  const people = allPeople(employees);
  const year = new Date().getFullYear();
  const [f, setF] = useState(() => editing ? { ...editing } : { id: uid(), type: "OD", num: null, year, date: todayISO(), title: "", body: "", recipients: [], deadlineDays: 3, attachments: [], status: "draft", acks: {}, createdBy: user.id, signedBy: null, signedAt: null, returnComment: "" });
  const [err, setErr] = useState("");
  const set = (k, v) => setF(x => ({ ...x, [k]: v }));
  const preview = { ...f, num: f.num || nextNum(orders, f.type, f.year) };
  const depts = [...new Set(employees.map(e => e.dept))];
  const toggleDept = d => { const ids = employees.filter(e => e.dept === d).map(e => e.id); const all = ids.every(i => f.recipients.includes(i)); set("recipients", all ? f.recipients.filter(r => !ids.includes(r)) : [...new Set([...f.recipients, ...ids])]); };
  const toggleEmp = id => set("recipients", f.recipients.includes(id) ? f.recipients.filter(r => r !== id) : [...f.recipients, id]);
  const onFiles = e => {
    const files = Array.from(e.target.files || []);
    setF(x => ({ ...x, attachments: [...(x.attachments || []), ...files.map(fl => ({ name: fl.name, size: fl.size }))] }));
    e.target.value = "";
  };
  const save = send => {
    if (!f.title.trim() || !f.body.trim()) { setErr("Заполните заголовок и текст приказа"); return; }
    if (send && !f.recipients.length) { setErr("Выберите, кого ознакомить с приказом"); return; }
    let o = { ...f, attachments: f.attachments || [] };
    if (send) {
      if (!o.num) o.num = nextNum(orders.filter(x => x.id !== o.id), o.type, o.year);
      o.status = "sign"; o.returnComment = "";
    }
    setOrders(os => os.some(x => x.id === o.id) ? os.map(x => x.id === o.id ? o : x) : [o, ...os]);
    onDone(send ? `Приказ № ${orderNo(o)} отправлен директору на подпись` : "Черновик сохранён");
  };
  const tpls = ORDER_TEMPLATES[f.type] || [];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,440px)", gap: 16 }} className="ord-grid">
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 10 }} className="ord-3">
          <Field label="Вид приказа">
            <select className="inp" value={f.type} onChange={e => set("type", e.target.value)} disabled={!!(editing && editing.num)}>
              {ORDER_TYPES.map(t => <option key={t.id} value={t.id}>{t.name} ({t.code})</option>)}
            </select>
          </Field>
          <Field label="Рег. номер"><input className="inp" readOnly value={`${preview.num}-${OT[f.type].code}${f.num ? "" : " · авто"}`} /></Field>
          <Field label="Дата"><input className="inp" type="date" value={f.date} onChange={e => set("date", e.target.value)} /></Field>
        </div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: -4 }}>{OT[f.type].desc}</div>
        <Field label="Шаблон">
          <select className="inp" value="" onChange={e => { const t = tpls[+e.target.value]; if (t) setF(x => ({ ...x, title: t.t, body: t.b })); }}>
            <option value="">— выбрать шаблон —</option>
            {tpls.map((t, i) => <option key={i} value={i}>{t.t}</option>)}
          </select>
        </Field>
        <Field label="Заголовок"><input className="inp" value={f.title} onChange={e => set("title", e.target.value)} placeholder="О ..." /></Field>
        <Field label="Текст приказа"><textarea className="ta" style={{ minHeight: 140, textTransform: "none" }} value={f.body} onChange={e => set("body", e.target.value)} /></Field>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 6 }}>Ознакомить · {f.recipients.length}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {depts.map(d => { const ids = employees.filter(e => e.dept === d).map(e => e.id); const on = ids.length && ids.every(i => f.recipients.includes(i)); return (
              <button key={d} type="button" onClick={() => toggleDept(d)} style={{ cursor: "pointer", fontSize: 12, fontWeight: 600, padding: "5px 10px", borderRadius: 8, border: on ? "1px solid var(--ac)" : "1px dashed var(--bd)", background: on ? "var(--acbg)" : "transparent", color: on ? "var(--ac2)" : "var(--tx2)" }}>{d} · {ids.length}</button>); })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, maxHeight: 110, overflowY: "auto" }}>
            {employees.map(e => { const on = f.recipients.includes(e.id); return (
              <button key={e.id} type="button" onClick={() => toggleEmp(e.id)} style={{ cursor: "pointer", fontSize: 11.5, padding: "4px 8px", borderRadius: 7, border: "1px solid " + (on ? "var(--ac)" : "var(--bd)"), background: on ? "var(--acbg)" : "var(--sf2)", color: on ? "var(--ac2)" : "var(--tx)" }}>{on ? "✓ " : ""}{shortName(e.name)}</button>); })}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Срок ознакомления">
            <select className="inp" value={f.deadlineDays} onChange={e => set("deadlineDays", +e.target.value)}>
              {[1, 2, 3, 5, 10].map(n => <option key={n} value={n}>{n} раб. дн. после подписи</option>)}
            </select>
          </Field>
          <Field label="Приложения">
            <input className="inp" type="file" multiple onChange={onFiles} style={{ padding: 7 }} />
          </Field>
        </div>
        {(f.attachments || []).length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{f.attachments.map((a, i) => <Pill key={i}>📎 {a.name} <span style={{ cursor: "pointer" }} onClick={() => set("attachments", f.attachments.filter((_, j) => j !== i))}>×</span></Pill>)}</div>}
        {err && <div style={{ fontSize: 12.5, color: "var(--er)" }}>⚠ {err}</div>}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button className="btn bo" onClick={() => onDone(null)}>Отмена</button>
          <button className="btn bo" onClick={() => save(false)}>Сохранить черновик</button>
          <button className="btn bp" onClick={() => save(true)}>Отправить директору на подпись</button>
        </div>
      </div>
      <div style={{ background: "var(--sf2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", marginBottom: 8 }}>Предпросмотр</div>
        <OrderPaper order={preview} people={people} compact />
      </div>
    </div>
  );
}

/* Журнал (HR / директор) */
function OrdersJournal({ orders, setOrders, employees, user }) {
  const people = allPeople(employees);
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState(null);
  const [toast, setToast] = useState("");
  const year = new Date().getFullYear();
  const staff = isStaffRole(user.role);
  const visible = orders.filter(o => staff || o.status !== "draft");
  const list = visible.filter(o => (type === "all" || o.type === type) && (status === "all" || orderStatus(o) === status) && (!q || (orderNo(o) + " " + o.title).toLowerCase().includes(q.toLowerCase())))
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.num || 0) - (a.num || 0));
  const flash = m => { if (m) { setToast(m); setTimeout(() => setToast(""), 3500); } };
  if (form) return <OrderForm orders={orders} setOrders={setOrders} employees={employees} user={user} editing={form === "new" ? null : form} onDone={m => { setForm(null); flash(m); }} />;
  const cur = open && orders.find(o => o.id === open);
  return (
    <div>
      {toast && <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: "var(--okbg)", color: "var(--ok)", fontSize: 13, fontWeight: 600 }}>✓ {toast}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: "var(--tx2)" }}>Журнал учёта приказов · {year}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn bo" onClick={() => exportJournal(orders, people, type)}>⬇ Экспорт журнала (Excel)</button>
          {staff && <button className="btn bp" onClick={() => setForm("new")}>+ Создать приказ</button>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10, marginBottom: 12 }}>
        {ORDER_TYPES.map(t => {
          const os = visible.filter(o => o.type === t.id && o.year === year && o.num);
          const last = os.reduce((m, o) => Math.max(m, o.num), 0);
          const on = type === t.id;
          return (
            <button key={t.id} onClick={() => setType(on ? "all" : t.id)} style={{ textAlign: "left", cursor: "pointer", background: "var(--sf)", border: on ? "2px solid var(--ac)" : "1px solid var(--bd)", borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6, color: "var(--tx)", fontFamily: "Inter,sans-serif" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><span style={{ fontSize: 12.5, fontWeight: 700 }}>{t.name}</span><Pill tone="ac">{t.code}</Pill></div>
              <span style={{ fontSize: 11, color: "var(--tx2)", lineHeight: 1.35 }}>{t.desc}</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}><span style={{ fontFamily: "Manrope,sans-serif", fontSize: 22, fontWeight: 800 }}>{os.length}</span><span style={{ fontSize: 11.5, color: "var(--tx2)" }}>за {year} · посл. № {last ? `${last}-${t.code}` : "—"}</span></div>
              <div style={{ display: "flex", gap: 10, fontSize: 11.5, fontWeight: 600, flexWrap: "wrap" }}>
                <span style={{ color: "var(--wn)" }}>На подписи: {os.filter(o => orderStatus(o) === "sign").length}</span>
                <span style={{ color: "var(--in)" }}>Ознакомление: {os.filter(o => orderStatus(o) === "ack").length}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button className={`tb ${type === "all" ? "act" : ""}`} onClick={() => setType("all")}>Все · {visible.filter(o => o.num).length}</button>
          {ORDER_TYPES.map(t => <button key={t.id} className={`tb ${type === t.id ? "act" : ""}`} onClick={() => setType(t.id)}>{t.code} · {visible.filter(o => o.type === t.id && o.num).length}</button>)}
        </div>
        <select className="inp" style={{ width: 190 }} value={status} onChange={e => setStatus(e.target.value)} aria-label="Статус">
          <option value="all">Все статусы</option>
          {Object.entries(ORDER_STATUS).filter(([k]) => staff || k !== "draft").map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <input className="inp" style={{ flex: 1, minWidth: 180 }} placeholder="Поиск по номеру или заголовку" value={q} onChange={e => setQ(e.target.value)} aria-label="Поиск" />
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="ord-row ord-head"><span>Рег. №</span><span>Дата</span><span>Заголовок</span><span>Статус</span><span>Ознакомление</span><span>Файл</span></div>
        {list.length === 0 && <div className="emp"><div className="ei">📄</div>Приказов не найдено</div>}
        {list.map(o => {
          const st = orderStatus(o); const ac = o.recipients.filter(r => o.acks[r]).length; const od = overdueCount(o);
          return (
            <div key={o.id} className="ord-row" onClick={() => setOpen(o.id)}>
              <span style={{ fontWeight: 700 }}>{o.num ? orderNo(o) : `${OT[o.type].code} · черновик`}</span>
              <span style={{ color: "var(--tx2)" }}>{ruDate(o.date)}</span>
              <span style={{ fontWeight: 500, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.title}</span>
              <span><Pill tone={ORDER_STATUS[st].tone}>{ORDER_STATUS[st].label}</Pill></span>
              <span style={{ fontSize: 12.5, color: od ? "var(--er)" : "var(--tx2)" }}>{o.signedAt ? `${ac}/${o.recipients.length}${od ? ` · срок истёк` : ""}` : "—"}</span>
              <span onClick={e => e.stopPropagation()}>{o.signedAt ? <button className="btn bo bsm" onClick={() => printOrderPDF(o, people)}>PDF</button> : (staff && (st === "draft" || st === "returned") ? <button className="btn bo bsm" onClick={() => setForm(o)}>Изменить</button> : <span style={{ color: "var(--tx2)" }}>—</span>)}</span>
            </div>
          );
        })}
      </div>
      {cur && <OrderDetail order={cur} people={people} user={user} onClose={() => setOpen(null)} onEdit={() => { setOpen(null); setForm(cur); }} onDelete={() => { setOrders(os => os.filter(x => x.id !== cur.id)); setOpen(null); flash("Черновик удалён"); }} />}
    </div>
  );
}

/* Директор: подписание */
function OrdersSign({ orders, setOrders, employees, user }) {
  const people = allPeople(employees);
  const queue = orders.filter(o => o.status === "sign").sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  const [sel, setSel] = useState(null);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState("");
  const cur = queue.find(o => o.id === sel) || queue[0];
  const flash = m => { setToast(m); setTimeout(() => setToast(""), 3500); };
  const sign = () => {
    const now = new Date().toISOString();
    setOrders(os => os.map(o => o.id === cur.id ? { ...o, status: "ack", signedBy: user.id, signedAt: now, sigId: "MKA-" + Math.random().toString(36).slice(2, 10).toUpperCase() } : o));
    flash(`Приказ № ${orderNo(cur)} подписан и отправлен сотрудникам на ознакомление`); setSel(null);
  };
  const ret = () => {
    if (!comment.trim()) return;
    setOrders(os => os.map(o => o.id === cur.id ? { ...o, status: "returned", returnComment: comment.trim() } : o));
    flash(`Приказ № ${orderNo(cur)} возвращён HR на доработку`); setComment(""); setSel(null);
  };
  return (
    <div>
      {toast && <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: "var(--okbg)", color: "var(--ok)", fontSize: 13, fontWeight: 600 }}>✓ {toast}</div>}
      {!cur ? <div className="card"><div className="emp"><div className="ei">✅</div>Нет приказов, ожидающих подписи</div></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "240px minmax(0,1fr) 280px", gap: 14 }} className="ord-grid3">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {queue.map(o => (
              <button key={o.id} onClick={() => setSel(o.id)} style={{ textAlign: "left", cursor: "pointer", background: "var(--sf)", border: o.id === cur.id ? "2px solid var(--ac)" : "1px solid var(--bd)", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 5, color: "var(--tx)", fontFamily: "Inter,sans-serif" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: o.id === cur.id ? "var(--ac2)" : "var(--tx2)" }}>{orderNo(o)} · {ruDate(o.date)}</span>
                <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{o.title}</span>
                <span style={{ fontSize: 11.5, color: "var(--tx2)" }}>От {shortName(personOf(people, o.createdBy).name)}</span>
              </button>
            ))}
          </div>
          <OrderPaper order={cur} people={[...people, user]} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="ct">Сведения</div>
              {[["Журнал", OT[cur.type].name], ["Инициатор", personOf(people, cur.createdBy).name], ["Ознакомить", `${cur.recipients.length} сотр.`], ["Срок", `${cur.deadlineDays} раб. дн.`], ["Приложения", cur.attachments.length ? cur.attachments.map(a => a.name).join(", ") : "—"]].map(([k, v]) => (
                <div key={k} className="ir"><span style={{ fontSize: 12.5, color: "var(--tx2)" }}>{k}</span><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx)", textAlign: "right", marginLeft: 8 }}>{v}</span></div>
              ))}
            </div>
            <div className="card" style={{ marginBottom: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              <button className="btn bp" style={{ height: 46, fontSize: 14 }} onClick={sign}>Подписать</button>
              <span style={{ fontSize: 11.5, color: "var(--tx2)", textAlign: "center" }}>Подпись под учётной записью директора · ЭЦП (NCALayer) — следующий этап</span>
              <div className="div" style={{ margin: "4px 0" }} />
              <Field label="Замечание для HR"><textarea className="ta" style={{ minHeight: 70, textTransform: "none" }} value={comment} onChange={e => setComment(e.target.value)} placeholder="Что исправить в приказе" /></Field>
              <button className="btn bd" onClick={ret} disabled={!comment.trim()}>Вернуть на доработку</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Сотрудник: ознакомление (только просмотр) */
function OrdersEmployee({ orders, setOrders, employees, user }) {
  const people = allPeople(employees);
  const mine = orders.filter(o => o.signedAt && o.recipients.includes(user.id)).sort((a, b) => (b.signedAt || "").localeCompare(a.signedAt || ""));
  const pending = mine.filter(o => !o.acks[user.id]);
  const [sel, setSel] = useState(null);
  const [chk, setChk] = useState(false);
  const cur = mine.find(o => o.id === sel) || pending[0] || mine[0] || null;
  const ack = () => { const now = new Date().toISOString(); setOrders(os => os.map(o => o.id === cur.id ? { ...o, acks: { ...o.acks, [user.id]: now } } : o)); setChk(false); setSel(null); };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 14 }} className="ord-grid">
      <div>
        {cur ? (
          <div>
            <ProtectedView user={user}><OrderPaper order={cur} people={people} /></ProtectedView>
            {!cur.acks[user.id] ? (
              <div className="card" style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, fontWeight: 600, color: "var(--tx)" }}>
                  <input type="checkbox" checked={chk} onChange={e => setChk(e.target.checked)} style={{ width: 20, height: 20, accentColor: "var(--ac)" }} />
                  Я ознакомлен(а) с приказом и приложением <span style={{ fontSize: 11.5, fontWeight: 500, color: "var(--tx2)" }}>· позже — через ЭЦП</span>
                </label>
                <button className="btn bp" disabled={!chk} onClick={ack}>Ознакомлен(а)</button>
              </div>
            ) : <div style={{ marginTop: 12 }}><Pill tone="ok">✓ Ознакомлен(а) {ruDT(cur.acks[user.id])}</Pill></div>}
          </div>
        ) : <div className="card"><div className="emp"><div className="ei">📄</div>Приказов для ознакомления нет</div></div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="card" style={{ marginBottom: 0, background: "var(--acbg)", borderColor: "transparent" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ac2)", marginBottom: 4 }}>🔒 Только просмотр</div>
          <div style={{ fontSize: 12, color: "var(--tx)", lineHeight: 1.5 }}>Приказ нельзя скачать, распечатать или скопировать. На документе — водяной знак с вашим ФИО, датой и временем.</div>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="ct">Мои приказы {pending.length > 0 && <Pill tone="warn">{pending.length} ждут</Pill>}</div>
          {mine.length === 0 && <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Пока нет</div>}
          {mine.map(o => (
            <div key={o.id} className="ir" style={{ cursor: "pointer", gap: 8 }} onClick={() => setSel(o.id)}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: cur && cur.id === o.id ? "var(--ac2)" : "var(--tx)" }}>{orderNo(o)} · {o.title}</div>
                <div style={{ fontSize: 11, color: o.acks[user.id] ? "var(--ok)" : "var(--wn)" }}>{o.acks[user.id] ? `Ознакомлен(а) ${ruDate(o.acks[user.id])}` : `Ознакомиться до ${ruDate(ackDeadline(o))}`}</div>
              </div>
              <span style={{ fontSize: 12, color: "var(--ac2)", fontWeight: 700 }}>Открыть</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersModule(props) {
  const r = props.user.role;
  if (r === "employee") return <OrdersEmployee {...props} />;
  if (r === "director" && props.view === "sign") return <OrdersSign {...props} />;
  return <OrdersJournal {...props} />;
}

/* ═════════════════════ УЧЁТ РАБОЧЕГО ВРЕМЕНИ (из timekeeper) ═════════════════════ */
const TIME_CODES = [
  { c: "Я", n: "Явка", auto: true, tone: "ok" },
  { c: "РВ", n: "Работа в выходной", auto: true, tone: "ok" },
  { c: "В", n: "Выходной / праздник", auto: true, tone: "gr" },
  { c: "НН", n: "Неявка (не выяснено)", auto: true, tone: "err" },
  { c: "ОТ", n: "Ежегодный отпуск", tone: "info" },
  { c: "БС", n: "Отпуск без сохранения з/п", tone: "info" },
  { c: "У", n: "Учебный отпуск", tone: "info" },
  { c: "ОЖ", n: "Отпуск по уходу за ребёнком", tone: "info" },
  { c: "Б", n: "Больничный", tone: "warn" },
  { c: "К", n: "Командировка", tone: "ac" },
  { c: "Г", n: "Гос. обязанности", tone: "gr" },
  { c: "ПК", n: "Повышение квалификации", tone: "ac" },
  { c: "ПР", n: "Прогул", tone: "err" },
];
const TC = Object.fromEntries(TIME_CODES.map(x => [x.c, x]));
const REQ_TYPES = [{ c: "ОТ", n: "Отпуск" }, { c: "БС", n: "Отпуск без сохранения з/п" }, { c: "Б", n: "Больничный" }, { c: "К", n: "Командировка" }, { c: "ПК", n: "Обучение / ПК" }, { c: "КОРР", n: "Корректировка отметки" }];
const GRACE_MIN = 5;           // опоздание засчитывается после 5 минут
const AUTO_BREAK_H = 5;        // ст. 81 ТК РК: при смене > 5 ч вычитается перерыв
const BREAK_H = 1;
const KZ_HOLIDAYS_2026 = [
  ["2026-01-01", "Новый год"], ["2026-01-02", "Новый год"], ["2026-01-07", "Рождество (не выходной)", true], ["2026-03-08", "Международный женский день"], ["2026-03-09", "Перенос с 8 марта"],
  ["2026-03-21", "Наурыз мейрамы"], ["2026-03-22", "Наурыз мейрамы"], ["2026-03-23", "Наурыз мейрамы"], ["2026-03-24", "Перенос (Наурыз)"], ["2026-03-25", "Перенос (Наурыз)"], ["2026-05-01", "Праздник единства народа Казахстана"],
  ["2026-05-07", "День защитника Отечества"], ["2026-05-09", "День Победы"], ["2026-05-11", "Перенос (День Победы)"], ["2026-05-27", "Курбан айт"], ["2026-07-06", "День Столицы"], ["2026-08-30", "День Конституции"], ["2026-08-31", "Перенос (День Конституции)"],
  ["2026-10-25", "День Республики"], ["2026-10-26", "Перенос (День Республики)"], ["2026-12-16", "День Независимости"],
];
const toMin = s => { const [h, m] = (s || "0:0").split(":").map(Number); return h * 60 + m; };
const fmtH = m => `${Math.floor(m / 60)}:${pad2(Math.round(m % 60))}`;
const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

/* код отметки киоска: меняется каждые 30 секунд */
const kioskCode = (slot, kioskId) => { let h = 2166136261; const s = `${kioskId}|${slot}|mka`; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return String(Math.abs(h) % 1000000).padStart(6, "0"); };
const curSlot = () => Math.floor(Date.now() / 30000);

const INIT_TIME = () => {
  const now = new Date(); const y = now.getFullYear(), mo = now.getMonth();
  const emps = ["e1", "e2", "e3", "e4", "e5"];
  const marks = [];
  const hol = new Set(KZ_HOLIDAYS_2026.filter(h => !h[2]).map(h => h[0]));
  for (let d = 1; d < now.getDate(); d++) {
    const dt = new Date(y, mo, d); const iso = isoDay(dt); const w = dt.getDay();
    if (w === 0 || w === 6 || hol.has(iso)) continue;
    emps.forEach((e, i) => {
      const seed = (d * 7 + i * 13) % 17;
      if (e === "e2" && d >= now.getDate() - 6 && d <= now.getDate() - 2) return; // отпуск
      if (seed === 3 && e === "e3") return; // неявка
      const inM = 8 * 60 + 48 + (seed % 9) + (seed === 11 ? 14 : 0);
      const outM = 18 * 60 + (seed % 12);
      marks.push({ id: uid(), empId: e, date: iso, in: `${pad2(Math.floor(inM / 60))}:${pad2(inM % 60)}`, out: `${pad2(Math.floor(outM / 60))}:${pad2(outM % 60)}`, src: "qr", kiosk: "k1" });
    });
  }
  const codes = {};
  for (let d = Math.max(1, now.getDate() - 6); d <= Math.max(1, now.getDate() - 2); d++) { const dt = new Date(y, mo, d); const w = dt.getDay(); if (w !== 0 && w !== 6) codes[`e2|${isoDay(dt)}`] = "ОТ"; }
  const ti = todayISO();
  marks.push({ id: uid(), empId: "e1", date: ti, in: "08:52", out: null, src: "qr", kiosk: "k1" });
  marks.push({ id: uid(), empId: "e4", date: ti, in: "09:11", out: null, src: "qr", kiosk: "k1" });
  return {
    marks, codes,
    requests: [
      { id: "r1", empId: "e5", type: "Б", from: ti, to: ti, comment: "Температура, справка будет", status: "new", createdAt: new Date().toISOString() },
      { id: "r2", empId: "e3", type: "КОРР", from: ti, to: ti, comment: "Забыл отметиться на выходе вчера, ушёл в 18:05", status: "new", createdAt: new Date().toISOString() },
    ],
    schedule: {},
    kiosks: [{ id: "k1", name: "Вход · главный офис", place: COMPANY.city, active: true }, { id: "k2", name: "Склад", place: "Складской комплекс", active: true }],
    holidays: KZ_HOLIDAYS_2026.filter(h => !h[2]).map(h => ({ date: h[0], name: h[1] })),
  };
};

const schedOf = (td, empId) => td.schedule[empId] || { start: "09:00", end: "18:00", tracked: true };
const dayMarks = (td, empId, iso) => td.marks.filter(m => m.empId === empId && m.date === iso);
const workedMin = ms => { let t = 0; ms.forEach(m => { if (!m.out) return; let d = toMin(m.out) - toMin(m.in); if (d < 0) d += 1440; if (d > AUTO_BREAK_H * 60) d -= BREAK_H * 60; t += Math.max(0, d); }); return t; };
const isHoliday = (td, iso) => td.holidays.some(h => h.date === iso);
const isOff = (td, iso) => { const w = new Date(iso + "T00:00:00").getDay(); return w === 0 || w === 6 || isHoliday(td, iso); };
function cellCode(td, empId, iso) {
  const ov = td.codes[`${empId}|${iso}`]; if (ov) return { code: ov };
  const ms = dayMarks(td, empId, iso);
  const off = isOff(td, iso);
  if (ms.length) {
    const s = schedOf(td, empId); const first = ms.map(m => toMin(m.in)).sort((a, b) => a - b)[0];
    return { code: off ? "РВ" : "Я", min: workedMin(ms), late: !off && first > toMin(s.start) + GRACE_MIN, open: ms.some(m => !m.out) };
  }
  if (off) return { code: "В" };
  if (iso >= todayISO()) return { code: "" };
  return { code: "НН" };
}
const codeTone = c => (TC[c] ? TC[c].tone : "gr");

const QR_PREFIX = "MKAHR";
const qrPayload = (kioskId, slot) => `${QR_PREFIX}:${kioskId}:${slot}:${kioskCode(slot, kioskId)}`;
/* Проверка отметки: QR-содержимое или 6-значный код. Действителен текущий и предыдущий 30-секундный интервал. */
function verifyMark(input, kiosks) {
  const s = curSlot(); const txt = String(input || "").trim();
  if (txt.startsWith(QR_PREFIX + ":")) {
    const [, kid, slot, code] = txt.split(":"); const sl = +slot;
    if (!(sl === s || sl === s - 1) || kioskCode(sl, kid) !== code) return { err: "QR-код устарел. Отсканируйте код с экрана ещё раз." };
    const k = kiosks.find(x => x.id === kid);
    if (k && !k.active) return { err: "Этот планшет отключён в настройках HR." };
    return { kiosk: k || { id: kid, name: "Планшет на входе" } };
  }
  if (txt.length && !/^\d[\d\s]*$/.test(txt)) return { err: "Это не QR-код отметки МКА HR." };
  const c = txt.replace(/\D/g, "");
  const k = kiosks.filter(x => x.active).find(x => [s, s - 1].some(sl => kioskCode(sl, x.id) === c));
  return k ? { kiosk: k } : { err: "Код неверный или устарел. Введите код с экрана планшета." };
}

function KioskScreen({ td, kiosk, people, onClose }) {
  const [, tick] = useState(0);
  const [qr, setQr] = useState("");
  const slot = curSlot();
  useEffect(() => { const t = setInterval(() => tick(x => x + 1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(qrPayload(kiosk.id, slot), { width: 360, margin: 1, errorCorrectionLevel: "M", color: { dark: "#0F172A", light: "#FFFFFF" } })
      .then(u => { if (alive) setQr(u); }).catch(() => {});
    return () => { alive = false; };
  }, [kiosk.id, slot]);
  const now = new Date(); const left = 30 - Math.floor((Date.now() / 1000) % 30);
  const code = kioskCode(slot, kiosk.id);
  const recent = td.marks.filter(m => m.kiosk === kiosk.id && m.date === todayISO()).slice(-6).reverse();
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "#0F2A44", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 36, padding: 24, fontFamily: "Inter,sans-serif", flexWrap: "wrap", overflowY: "auto" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#1B4470", border: 0, color: "#fff", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>Закрыть режим планшета</button>
      <div style={{ background: "#fff", color: "#0F172A", borderRadius: 22, padding: 22, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {qr ? <img src={qr} alt="QR-код для отметки" data-kiosk-qr="1" style={{ width: "min(360px,70vw)", height: "min(360px,70vw)", imageRendering: "pixelated" }} /> : <div style={{ width: 360, height: 360 }} />}
        <div style={{ fontSize: 13, color: "#5B6B7E" }}>Отсканируйте в разделе «Учёт времени» → «Отметиться»</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 140, height: 6, borderRadius: 99, background: "#E2E8F0", overflow: "hidden" }}><div style={{ width: `${(left / 30) * 100}%`, height: "100%", background: "#C2410C", transition: "width 1s linear" }} /></div>
          <span style={{ fontSize: 12.5, color: "#5B6B7E" }}>{left} с</span>
        </div>
        <div style={{ fontSize: 12, color: "#5B6B7E" }}>Нет камеры? Код: <b style={{ color: "#C2410C", fontSize: 16, letterSpacing: 3 }} data-kiosk-code="1">{code.slice(0, 3)} {code.slice(3)}</b></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, minWidth: 280 }}>
        <img src={MKA_LOGO} alt="МКА Инжиниринг" style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff" }} />
        <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 22, fontWeight: 800, textAlign: "center" }}>{kiosk.name}</div>
        <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 64, fontWeight: 800, letterSpacing: 2 }}>{hhmm(now)}<span style={{ fontSize: 28, opacity: .6 }}>:{pad2(now.getSeconds())}</span></div>
        <div style={{ fontSize: 14, color: "#C9D6E4" }}>{now.getDate()} {MONTHS_RU_GEN[now.getMonth()]} · {DOW_RU[now.getDay()]}</div>
        <div style={{ width: "min(420px,90vw)", display: "flex", flexDirection: "column", gap: 6 }}>
          {recent.map(m => <div key={m.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, background: "#1B4470", borderRadius: 10, padding: "8px 12px" }}><span>{shortName(personOf(people, m.empId).name)}</span><span>{m.out ? `уход ${m.out}` : `приход ${m.in}`}</span></div>)}
        </div>
      </div>
    </div>
  );
}

/* Сканер QR через камеру телефона (jsQR) */
function QRScanner({ onResult, onError }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cbRef = useRef(onResult); cbRef.current = onResult;
  useEffect(() => {
    let stream = null, timer = null, stopped = false;
    if (typeof window !== "undefined" && !window.isSecureContext) { onError("Камера работает только по защищённому адресу (https://)."); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { onError("Браузер не даёт доступ к камере. Введите код вручную."); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
      .then(st => {
        if (stopped) { st.getTracks().forEach(t => t.stop()); return; }
        stream = st; const v = videoRef.current; v.srcObject = st; v.setAttribute("playsinline", "true"); v.play().catch(() => {});
        const scan = () => {
          if (stopped) return;
          if (v.readyState >= 2 && v.videoWidth) {
            const w = Math.min(640, v.videoWidth), h = Math.round(v.videoHeight * (w / v.videoWidth));
            const c = canvasRef.current; c.width = w; c.height = h;
            const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.drawImage(v, 0, 0, w, h);
            const img = ctx.getImageData(0, 0, w, h);
            const r = jsQR(img.data, w, h, { inversionAttempts: "dontInvert" });
            if (r && r.data) cbRef.current(r.data);
          }
          timer = setTimeout(scan, 160);
        };
        scan();
      })
      .catch(e => onError(e && e.name === "NotAllowedError" ? "Нет доступа к камере. Разрешите камеру для сайта в настройках браузера или введите код вручную." : "Камера недоступна. Введите код вручную."));
    return () => { stopped = true; clearTimeout(timer); if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, []);
  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", background: "#000", aspectRatio: "1 / 1", width: "100%" }}>
      <video ref={videoRef} muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: "14%", border: "3px solid rgba(255,255,255,.9)", borderRadius: 16, boxShadow: "0 0 0 999px rgba(0,0,0,.35)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center", color: "#fff", fontSize: 12.5, fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>Наведите камеру на QR-код планшета</div>
    </div>
  );
}

function MarkDialog({ td, setTd, user, onClose }) {
  const [mode, setMode] = useState("scan");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  const lastErr = useRef(0);
  const today = todayISO();
  const [open] = useState(() => td.marks.find(m => m.empId === user.id && m.date === today && !m.out));
  const apply = (input, src) => {
    if (done) return;
    const r = verifyMark(input, td.kiosks);
    if (r.err) { if (Date.now() - lastErr.current > 1500) { lastErr.current = Date.now(); setMsg({ err: true, t: r.err }); } return; }
    const k = r.kiosk; const t = hhmm(new Date());
    if (open) setTd(x => ({ ...x, marks: x.marks.map(m => m.id === open.id ? { ...m, out: t } : m) }));
    else setTd(x => ({ ...x, marks: [...x.marks, { id: uid(), empId: user.id, date: today, in: t, out: null, src, kiosk: k.id }] }));
    setDone(true);
    try { navigator.vibrate && navigator.vibrate(120); } catch (e) {}
    setMsg({ err: false, t: `${open ? "Уход" : "Приход"} отмечен в ${t} · ${k.name}` });
    setTimeout(onClose, 1600);
  };
  return (
    <Modal title={open ? "Отметить уход" : "Отметить приход"} onClose={onClose}>
      {!done && mode === "scan" && <QRScanner onResult={txt => apply(txt, "qr")} onError={e => { setMsg({ err: true, t: e }); setMode("code"); }} />}
      {!done && mode === "code" && (
        <div>
          <div style={{ fontSize: 13, color: "var(--tx2)", marginBottom: 10, lineHeight: 1.5 }}>Введите 6-значный код под QR-кодом на планшете. Код меняется каждые 30 секунд.</div>
          <input className="inp" inputMode="numeric" autoFocus maxLength={7} value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && apply(code, "code")} placeholder="000 000" style={{ fontSize: 26, letterSpacing: 6, textAlign: "center", fontFamily: "Manrope,sans-serif", fontWeight: 800 }} aria-label="Код отметки" />
          <button className="btn bp" style={{ width: "100%", marginTop: 12, height: 44 }} onClick={() => apply(code, "code")} disabled={code.replace(/\D/g, "").length !== 6}>Отметиться</button>
        </div>
      )}
      {msg && <div role="status" style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: msg.err ? "var(--er)" : "var(--ok)" }}>{msg.err ? "⚠ " : "✓ "}{msg.t}</div>}
      {!done && <button className="btn bo" style={{ width: "100%", marginTop: 10 }} onClick={() => { setMsg(null); setMode(mode === "scan" ? "code" : "scan"); }}>{mode === "scan" ? "Ввести код вручную" : "📷 Сканировать QR камерой"}</button>}
    </Modal>
  );
}

function TimeEmployee({ td, setTd, user }) {
  const [mark, setMark] = useState(false);
  const [req, setReq] = useState(null);
  const now = new Date(); const y = now.getFullYear(), mo = now.getMonth();
  const today = todayISO();
  const tdy = cellCode(td, user.id, today);
  const tms = dayMarks(td, user.id, today);
  const s = schedOf(td, user.id);
  let days = 0, mins = 0, late = 0, nn = 0;
  for (let d = 1; d <= daysInMonth(y, mo); d++) { const iso = isoDay(new Date(y, mo, d)); const c = cellCode(td, user.id, iso); if (c.code === "Я" || c.code === "РВ") { days++; mins += c.min || 0; if (c.late) late++; } if (c.code === "НН") nn++; }
  const my = td.marks.filter(m => m.empId === user.id).sort((a, b) => b.date.localeCompare(a.date) || b.in.localeCompare(a.in)).slice(0, 12);
  const myReq = td.requests.filter(r => r.empId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const sendReq = () => { if (!req.from || !req.to) return; setTd(x => ({ ...x, requests: [{ id: uid(), empId: user.id, status: "new", createdAt: new Date().toISOString(), ...req }, ...x.requests] })); setReq(null); };
  const openMark = tms.find(m => !m.out);
  return (
    <div>
      <div className="wb" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, color: "#E5E7EB" }}>Сегодня, {now.getDate()} {MONTHS_RU_GEN[mo]} · график {s.start}–{s.end}</div>
          <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 19, fontWeight: 800, color: "#fff", marginTop: 3 }}>
            {openMark ? `На работе с ${openMark.in}` : tms.length ? `Смена завершена · ${fmtH(workedMin(tms))} ч` : isOff(td, today) ? "Сегодня выходной" : "Вы ещё не отметились"}
          </div>
          {tdy.late && <div style={{ fontSize: 12, color: "#FCD34D", marginTop: 3 }}>Опоздание (допуск {GRACE_MIN} мин)</div>}
        </div>
        <button className="btn bp" style={{ height: 46, fontSize: 14, position: "relative", zIndex: 1 }} onClick={() => setMark(true)}>📷 {openMark ? "Отметить уход" : "Отметиться по QR-коду"}</button>
      </div>
      <div className="g3" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 14 }}>
        {[[days, "Явок в месяце", "var(--ok)"], [fmtH(mins), "Отработано, ч", "var(--tx)"], [late, "Опозданий", "var(--wn)"], [nn, "Неявок", "var(--er)"]].map(([v, l, c]) => (
          <div key={l} className="sc" style={{ cursor: "default" }}><div className="sv" style={{ color: c }}>{v}</div><div className="sl">{l}</div></div>
        ))}
      </div>
      <div className="g2">
        <div className="card">
          <div className="ct">Мои отметки</div>
          {my.length === 0 && <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Отметок пока нет</div>}
          {my.map(m => { const c = cellCode(td, user.id, m.date); return (
            <div key={m.id} className="ir"><span style={{ fontSize: 12.5, color: "var(--tx)" }}>{ruDate(m.date)}</span><span style={{ fontSize: 12.5, color: "var(--tx2)" }}>{m.in} — {m.out || "…"}</span>{c.late ? <Pill tone="warn">опоздание</Pill> : <Pill tone="ok">{m.src === "qr" ? "QR" : m.src === "code" ? "код" : "вручную"}</Pill>}</div>); })}
        </div>
        <div className="card">
          <div className="ct" style={{ justifyContent: "space-between" }}>Мои заявки <button className="btn bo bsm" onClick={() => setReq({ type: "ОТ", from: today, to: today, comment: "" })}>+ Подать заявку</button></div>
          {myReq.length === 0 && <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Заявок нет</div>}
          {myReq.map(r => (
            <div key={r.id} className="ir" style={{ gap: 8 }}>
              <div><div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx)" }}>{(REQ_TYPES.find(t => t.c === r.type) || {}).n}</div><div style={{ fontSize: 11, color: "var(--tx2)" }}>{ruDate(r.from)} — {ruDate(r.to)}</div></div>
              <Pill tone={r.status === "ok" ? "ok" : r.status === "rej" ? "err" : "warn"}>{r.status === "ok" ? "Одобрена" : r.status === "rej" ? "Отклонена" : "На рассмотрении"}</Pill>
            </div>
          ))}
        </div>
      </div>
      {mark && <MarkDialog td={td} setTd={setTd} user={user} onClose={() => setMark(false)} />}
      {req && (
        <Modal title="Заявка в HR" onClose={() => setReq(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Field label="Тип"><select className="inp" value={req.type} onChange={e => setReq({ ...req, type: e.target.value })}>{REQ_TYPES.map(t => <option key={t.c} value={t.c}>{t.n}</option>)}</select></Field>
            <div className="g2"><Field label="С"><input className="inp" type="date" value={req.from} onChange={e => setReq({ ...req, from: e.target.value })} /></Field><Field label="По"><input className="inp" type="date" value={req.to} onChange={e => setReq({ ...req, to: e.target.value })} /></Field></div>
            <Field label="Комментарий"><textarea className="ta" style={{ textTransform: "none" }} value={req.comment} onChange={e => setReq({ ...req, comment: e.target.value })} /></Field>
            <button className="btn bp" onClick={sendReq}>Отправить</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TimeHR({ td, setTd, employees }) {
  const people = allPeople(employees);
  const [tab, setTab] = useState("today");
  const [ym, setYm] = useState(() => { const n = new Date(); return [n.getFullYear(), n.getMonth()]; });
  const [edit, setEdit] = useState(null);
  const [kiosk, setKiosk] = useState(null);
  const [nk, setNk] = useState("");
  const today = todayISO();
  const tracked = employees.filter(e => schedOf(td, e.id).tracked);
  const [y, mo] = ym; const nd = daysInMonth(y, mo);
  const days = Array.from({ length: nd }, (_, i) => isoDay(new Date(y, mo, i + 1)));
  const newReq = td.requests.filter(r => r.status === "new").length;
  const shiftMonth = k => setYm(([yy, mm]) => { const d = new Date(yy, mm + k, 1); return [d.getFullYear(), d.getMonth()]; });
  const monthStats = e => { const st = { Я: 0, min: 0, late: 0, НН: 0, ОТ: 0, Б: 0, К: 0, other: 0 }; days.forEach(iso => { const c = cellCode(td, e.id, iso); if (c.code === "Я" || c.code === "РВ") { st.Я++; st.min += c.min || 0; if (c.late) st.late++; } else if (st[c.code] !== undefined) st[c.code]++; else if (c.code && c.code !== "В") st.other++; }); return st; };
  const decide = (r, ok) => setTd(x => {
    const codes = { ...x.codes };
    if (ok && r.type !== "КОРР") { const d = new Date(r.from + "T00:00:00"); const end = new Date(r.to + "T00:00:00"); while (d <= end) { const iso = isoDay(d); if (!isOff(x, iso)) codes[`${r.empId}|${iso}`] = r.type; d.setDate(d.getDate() + 1); } }
    return { ...x, codes, requests: x.requests.map(q => q.id === r.id ? { ...q, status: ok ? "ok" : "rej" } : q) };
  });
  const exportSheet = () => {
    const rows = [[`Табель учёта рабочего времени · ${COMPANY.name} · ${MONTHS_RU[mo]} ${y}`], ["ФИО", "Должность", ...days.map(d => +d.slice(8)), "Явок", "Часов", "Опозданий"]];
    tracked.forEach(e => { const st = monthStats(e); rows.push([e.name, e.pos, ...days.map(iso => cellCode(td, e.id, iso).code), st.Я, fmtH(st.min), st.late]); });
    rows.push([]); rows.push(["Обозначения: " + TIME_CODES.map(c => `${c.c} — ${c.n}`).join("; ")]);
    downloadCSV(`Табель_${y}-${pad2(mo + 1)}.csv`, rows);
  };
  const exportReport = () => {
    const rows = [["ФИО", "Отдел", "Явок", "Часов", "Опозданий", "Неявок", "Отпуск", "Больничный", "Командировка"]];
    tracked.forEach(e => { const st = monthStats(e); rows.push([e.name, e.dept, st.Я, fmtH(st.min), st.late, st.НН, st.ОТ, st.Б, st.К]); });
    downloadCSV(`Отчёт_время_${y}-${pad2(mo + 1)}.csv`, rows);
  };
  const MonthNav = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button className="btn bo bsm" onClick={() => shiftMonth(-1)} aria-label="Предыдущий месяц">◀</button>
      <span style={{ fontWeight: 700, color: "var(--tx)", minWidth: 120, textAlign: "center" }}>{MONTHS_RU[mo]} {y}</span>
      <button className="btn bo bsm" onClick={() => shiftMonth(1)} aria-label="Следующий месяц">▶</button>
    </div>
  );
  const tabs = [["today", "Сегодня"], ["sheet", "Табель"], ["req", "Заявки", newReq], ["workers", "Работники"], ["reports", "Отчёты"], ["kiosks", "Киоски"], ["cal", "Календарь"]];
  return (
    <div>
      <div className="tabs" style={{ flexWrap: "wrap" }}>
        {tabs.map(([id, l, b]) => <button key={id} className={`tb ${tab === id ? "act" : ""}`} onClick={() => setTab(id)}>{l}{b ? <span style={{ marginLeft: 6, background: "#EF4444", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 99 }}>{b}</span> : null}</button>)}
      </div>

      {tab === "today" && (() => {
        const rows = tracked.map(e => ({ e, c: cellCode(td, e.id, today), ms: dayMarks(td, e.id, today) }));
        const onSite = rows.filter(r => r.ms.some(m => !m.out)).length;
        const late = rows.filter(r => r.c.late).length;
        const away = rows.filter(r => ["ОТ", "Б", "К", "БС", "У", "ОЖ", "ПК", "Г"].includes(r.c.code)).length;
        const absent = rows.filter(r => !r.ms.length && !["ОТ", "Б", "К", "БС", "У", "ОЖ", "ПК", "Г"].includes(r.c.code)).length;
        return (
          <div>
            <div className="g3" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 14 }}>
              {[[onSite, "На месте", "var(--ok)"], [late, "Опоздали", "var(--wn)"], [isOff(td, today) ? 0 : absent, "Не отметились", "var(--er)"], [away, "Отпуск / больничный / команд.", "var(--in)"]].map(([v, l, c]) => <div key={l} className="sc" style={{ cursor: "default" }}><div className="sv" style={{ color: c }}>{v}</div><div className="sl">{l}</div></div>)}
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="tm-row tm-head"><span>Сотрудник</span><span>Отдел</span><span>Приход</span><span>Уход</span><span>Часы</span><span>Статус</span></div>
              {rows.map(({ e, c, ms }) => (
                <div key={e.id} className="tm-row">
                  <span style={{ fontWeight: 600 }}>{e.name}</span><span style={{ color: "var(--tx2)" }}>{e.dept}</span>
                  <span>{ms[0] ? ms[0].in : "—"}</span><span>{ms.length && ms[ms.length - 1].out ? ms[ms.length - 1].out : "—"}</span><span>{ms.length ? fmtH(workedMin(ms)) : "—"}</span>
                  <span>{ms.some(m => !m.out) ? <Pill tone={c.late ? "warn" : "ok"}>{c.late ? "Опоздал(а)" : "На месте"}</Pill> : c.code && TC[c.code] && !["Я", "РВ"].includes(c.code) ? <Pill tone={codeTone(c.code)}>{TC[c.code].n}</Pill> : ms.length ? <Pill>Ушёл(ла)</Pill> : <Pill tone="err">Нет отметки</Pill>}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {tab === "sheet" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <MonthNav />
            <button className="btn bp" onClick={exportSheet}>⬇ Скачать табель (Excel)</button>
          </div>
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table className="tsheet">
              <thead><tr><th className="nm">Сотрудник</th>{days.map(iso => { const w = new Date(iso + "T00:00:00").getDay(); return <th key={iso} className={isOff(td, iso) ? "off" : ""} title={(td.holidays.find(h => h.date === iso) || {}).name || ""}>{+iso.slice(8)}<br /><span>{DOW_RU[w]}</span></th>; })}<th>Явок</th><th>Часов</th></tr></thead>
              <tbody>
                {tracked.map(e => { const st = monthStats(e); return (
                  <tr key={e.id}><td className="nm">{shortName(e.name)}</td>
                    {days.map(iso => { const c = cellCode(td, e.id, iso); return (
                      <td key={iso} className={`c-${codeTone(c.code)}${isOff(td, iso) ? " off" : ""}${iso === today ? " now" : ""}`} onClick={() => setEdit({ e, iso, c })} title={c.min ? `${fmtH(c.min)} ч${c.late ? " · опоздание" : ""}` : (TC[c.code] || {}).n || ""}>
                        {c.code}{c.late ? <i>•</i> : null}
                      </td>); })}
                    <td className="tot">{st.Я}</td><td className="tot">{fmtH(st.min)}</td></tr>); })}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>{TIME_CODES.map(c => <Pill key={c.c} tone={c.tone}><b>{c.c}</b> {c.n}</Pill>)}<Pill tone="warn">• опоздание</Pill></div>
          <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 8 }}>Я, РВ, В, НН ставятся автоматически по отметкам. Остальные коды — вручную (нажмите на ячейку) или через одобренную заявку. При смене дольше {AUTO_BREAK_H} ч вычитается {BREAK_H} ч перерыва (ст. 81 ТК РК).</div>
        </div>
      )}

      {tab === "req" && (
        <div className="card">
          <div className="ct">Заявки сотрудников</div>
          {td.requests.length === 0 && <div className="emp">Заявок нет</div>}
          {td.requests.map(r => { const p = personOf(people, r.empId); return (
            <div key={r.id} className="ir" style={{ gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--tx)" }}>{p.name} · {(REQ_TYPES.find(t => t.c === r.type) || {}).n}</div>
                <div style={{ fontSize: 11.5, color: "var(--tx2)" }}>{ruDate(r.from)} — {ruDate(r.to)}{r.comment ? ` · ${r.comment}` : ""}</div>
              </div>
              {r.status === "new" ? <div style={{ display: "flex", gap: 6 }}><button className="btn bg2 bsm" onClick={() => decide(r, true)}>Одобрить</button><button className="btn bd bsm" onClick={() => decide(r, false)}>Отклонить</button></div>
                : <Pill tone={r.status === "ok" ? "ok" : "err"}>{r.status === "ok" ? "Одобрена" : "Отклонена"}</Pill>}
            </div>); })}
          <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 8 }}>Одобренная заявка проставляет код в табель за указанные рабочие дни. Корректировку отметки внесите вручную во вкладке «Табель».</div>
        </div>
      )}

      {tab === "workers" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="tm-row tm-head"><span>Сотрудник</span><span>Отдел</span><span>Начало</span><span>Конец</span><span>Учёт</span><span></span></div>
          {employees.map(e => { const s = schedOf(td, e.id); const setS = patch => setTd(x => ({ ...x, schedule: { ...x.schedule, [e.id]: { ...s, ...patch } } })); return (
            <div key={e.id} className="tm-row">
              <span style={{ fontWeight: 600 }}>{e.name}</span><span style={{ color: "var(--tx2)" }}>{e.dept}</span>
              <span><input className="inp" type="time" value={s.start} onChange={ev => setS({ start: ev.target.value })} style={{ padding: 5 }} aria-label="Начало смены" /></span>
              <span><input className="inp" type="time" value={s.end} onChange={ev => setS({ end: ev.target.value })} style={{ padding: 5 }} aria-label="Конец смены" /></span>
              <span><label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12.5, color: "var(--tx)" }}><input type="checkbox" checked={s.tracked} onChange={ev => setS({ tracked: ev.target.checked })} /> в табеле</label></span><span></span>
            </div>); })}
        </div>
      )}

      {tab === "reports" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}><MonthNav /><button className="btn bp" onClick={exportReport}>⬇ Скачать отчёт (Excel)</button></div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="tm-row tm-head tm8"><span>Сотрудник</span><span>Явок</span><span>Часов</span><span>Опозд.</span><span>НН</span><span>ОТ</span><span>Б</span><span>К</span></div>
            {tracked.map(e => { const st = monthStats(e); return <div key={e.id} className="tm-row tm8"><span style={{ fontWeight: 600 }}>{e.name}</span><span>{st.Я}</span><span>{fmtH(st.min)}</span><span style={{ color: st.late ? "var(--wn)" : "inherit" }}>{st.late}</span><span style={{ color: st.НН ? "var(--er)" : "inherit" }}>{st.НН}</span><span>{st.ОТ}</span><span>{st.Б}</span><span>{st.К}</span></div>; })}
          </div>
        </div>
      )}

      {tab === "kiosks" && (
        <div className="card">
          <div className="ct">Планшеты для отметки на входе</div>
          {td.kiosks.map(k => (
            <div key={k.id} className="ir" style={{ gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "var(--tx)" }}>{k.name}</div><div style={{ fontSize: 11.5, color: "var(--tx2)" }}>{k.place} · отметок сегодня: {td.marks.filter(m => m.kiosk === k.id && m.date === today).length}</div></div>
              <Pill tone={k.active ? "ok" : "gr"}>{k.active ? "Активен" : "Отключён"}</Pill>
              <button className="btn bo bsm" onClick={() => setTd(x => ({ ...x, kiosks: x.kiosks.map(q => q.id === k.id ? { ...q, active: !q.active } : q) }))}>{k.active ? "Отключить" : "Включить"}</button>
              <button className="btn bp bsm" disabled={!k.active} onClick={() => setKiosk(k)}>Открыть режим планшета</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input className="inp" placeholder="Название нового киоска, напр. «Вход · склад»" value={nk} onChange={e => setNk(e.target.value)} />
            <button className="btn bo" onClick={() => { if (!nk.trim()) return; setTd(x => ({ ...x, kiosks: [...x.kiosks, { id: uid(), name: nk.trim(), place: COMPANY.city, active: true }] })); setNk(""); }}>Добавить</button>
          </div>
          <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 10, lineHeight: 1.5 }}>Откройте режим планшета на устройстве у входа. QR-код и запасной цифровой код меняются каждые 30 секунд — сотрудник сканирует QR камерой телефона в своём портале, поэтому отметиться удалённо нельзя.</div>
        </div>
      )}

      {tab === "cal" && (
        <div>
          <div style={{ marginBottom: 10 }}><MonthNav /></div>
          <div className="card">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => <div key={d} style={{ fontSize: 11, fontWeight: 700, color: "var(--tx2)", textAlign: "center" }}>{d}</div>)}
              {Array.from({ length: (new Date(y, mo, 1).getDay() + 6) % 7 }).map((_, i) => <div key={"x" + i} />)}
              {days.map(iso => { const h = td.holidays.find(q => q.date === iso); const off = isOff(td, iso); return (
                <button key={iso} onClick={() => setTd(x => ({ ...x, holidays: h ? x.holidays.filter(q => q.date !== iso) : [...x.holidays, { date: iso, name: "Выходной (приказ)" }] }))}
                  title={h ? h.name + " · нажмите, чтобы сделать рабочим" : "Нажмите, чтобы сделать выходным"}
                  style={{ cursor: "pointer", minHeight: 54, borderRadius: 9, border: "1px solid var(--bd)", background: h ? "var(--acbg)" : off ? "var(--sf2)" : "var(--sf)", color: h ? "var(--ac2)" : off ? "var(--tx2)" : "var(--tx)", textAlign: "left", padding: 6, fontFamily: "Inter,sans-serif" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{+iso.slice(8)}</div>
                  {h && <div style={{ fontSize: 9.5, lineHeight: 1.2 }}>{h.name}</div>}
                </button>); })}
            </div>
            <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 10 }}>Праздники РК 2026 и переносы по ТК РК внесены заранее — сверьте с постановлением Правительства о переносе дней. Нажмите на день, чтобы отметить дополнительный выходной или вернуть рабочий день.</div>
          </div>
        </div>
      )}

      {edit && (
        <Modal title={`${shortName(edit.e.name)} · ${ruDate(edit.iso)}`} onClose={() => setEdit(null)}>
          <div style={{ fontSize: 12.5, color: "var(--tx2)", marginBottom: 10 }}>
            {dayMarks(td, edit.e.id, edit.iso).map(m => `${m.in}–${m.out || "…"}`).join(", ") || "Отметок нет"}{edit.c.min ? ` · ${fmtH(edit.c.min)} ч` : ""}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button className="btn bo bsm" onClick={() => { setTd(x => { const c = { ...x.codes }; delete c[`${edit.e.id}|${edit.iso}`]; return { ...x, codes: c }; }); setEdit(null); }}>Авто (по отметкам)</button>
            {TIME_CODES.filter(c => !c.auto || c.c === "Я").map(c => <button key={c.c} className="btn bo bsm" onClick={() => { setTd(x => ({ ...x, codes: { ...x.codes, [`${edit.e.id}|${edit.iso}`]: c.c } })); setEdit(null); }}><b>{c.c}</b> · {c.n}</button>)}
          </div>
        </Modal>
      )}
      {kiosk && <KioskScreen td={td} kiosk={kiosk} people={people} onClose={() => setKiosk(null)} />}
    </div>
  );
}

function TimeModule({ user, td, setTd, employees }) {
  if (isStaffRole(user.role)) return <TimeHR td={td} setTd={setTd} employees={employees} />;
  return <TimeEmployee td={td} setTd={setTd} user={user} />;
}

/* ═════════════════════ ПОЛОЖЕНИЯ И ПРАВИЛА ═════════════════════ */
const POLICY_CATS = ["Трудовой распорядок", "Оплата и премии", "Отпуска и командировки", "Этика"];
const INIT_POLICIES = () => {
  const all = ["e1", "e2", "e3", "e4", "e5"];
  const acks = n => Object.fromEntries(all.slice(0, n).map((e, i) => [e, `2026-02-0${3 + (i % 3)}T10:${pad2(10 + i * 7)}:00.000Z`]));
  const mk = (id, title, cat, order, version, eff, n, body, versions) => ({ id, title, cat, order, version, effective: eff, acks: acks(n), body, versions: versions || [{ v: version, date: eff, order, note: "Первая редакция" }], file: "" });
  return [
    mk("p1", "Правила внутреннего трудового распорядка", "Трудовой распорядок", "1-ОД", "v1", "2026-02-01", 5,
      "1. Общие положения\nНастоящие Правила разработаны в соответствии с Трудовым кодексом Республики Казахстан и определяют порядок приёма и увольнения работников, режим рабочего времени и времени отдыха, права и обязанности сторон.\n\n2. Режим рабочего времени\nДля работников устанавливается пятидневная рабочая неделя продолжительностью 40 часов. Начало работы — 09:00, окончание — 18:00, перерыв для отдыха и приёма пищи — 1 час.\n\n3. Учёт рабочего времени\nПриход и уход фиксируются отметкой по коду на планшете у входа в разделе «Учёт времени». Опоздание засчитывается при отметке позднее 5 минут от начала смены.\n\n4. Время отдыха\nРаботникам предоставляются ежегодные оплачиваемые трудовые отпуска продолжительностью не менее 24 календарных дней в соответствии с графиком отпусков."),
    mk("p2", "Положение об оплате труда", "Оплата и премии", "[№]-ОД", "v1", "2026-02-01", 5,
      "1. Общие положения\nПоложение устанавливает систему оплаты труда работников ТОО «МКА Инжиниринг» в соответствии с главой 13 Трудового кодекса РК.\n\n2. Должностные оклады\nРазмер оклада определяется штатным расписанием, утверждённым приказом директора.\n\n3. Сроки выплаты\nЗаработная плата выплачивается не реже одного раза в месяц, не позднее первой декады следующего месяца, путём перечисления на банковский счёт работника."),
    mk("p3", "Положение о премировании", "Оплата и премии", "[№]-ОД", "v2", "2026-10-01", 3,
      "1. Виды премий\nПредусматриваются ежемесячные, квартальные и разовые премии за выполнение плановых показателей, а также за особый вклад в результаты компании.\n\n2. Основания\nПремирование производится на основании приказа директора по представлению руководителя подразделения.\n\n3. Лишение премии\nПремия может быть снижена при наличии дисциплинарного взыскания в отчётном периоде.",
      [{ v: "v2", date: "2026-10-01", order: "[№]-ОД", note: "Добавлены квартальные премии отдела продаж" }, { v: "v1", date: "2026-02-01", order: "[№]-ОД", note: "Первая редакция" }]),
    mk("p4", "Положение о ежегодных трудовых отпусках", "Отпуска и командировки", "[№]-ОД", "v1", "2026-02-01", 5,
      "1. Продолжительность\nЕжегодный оплачиваемый трудовой отпуск — не менее 24 календарных дней (ст. 88 ТК РК).\n\n2. График отпусков\nГрафик утверждается до конца текущего года на следующий год. Перенос отпуска оформляется приказом по кадровым вопросам (К).\n\n3. Оформление\nЗаявление на отпуск подаётся не позднее чем за 14 дней через раздел «Учёт времени → Подать заявку»."),
    mk("p5", "Положение о служебных командировках", "Отпуска и командировки", "[№]-ОД", "v1", "2026-02-01", 4,
      "1. Направление в командировку\nРаботник направляется в командировку приказом по кадровым и оперативным вопросам (К).\n\n2. Расходы\nВозмещаются расходы на проезд, наём жилья и суточные в размерах, установленных приказом директора.\n\n3. Отчёт\nПо возвращении работник в течение 3 рабочих дней представляет авансовый отчёт в бухгалтерию."),
    mk("p6", "Кодекс деловой этики", "Этика", "[№]-ОД", "v1", "2026-02-01", 5,
      "1. Принципы\nУважение, честность, ответственность и безопасность — основа отношений с коллегами, клиентами и поставщиками.\n\n2. Конфликт интересов\nРаботник обязан сообщать руководителю о ситуациях, в которых его личные интересы могут повлиять на исполнение обязанностей.\n\n3. Безопасность\nСоблюдение требований охраны труда и правил обращения с химическими реагентами обязательно для всех работников."),
  ];
};

function PolicyForm({ init, onSave, onClose, newVersion }) {
  const [f, setF] = useState(() => ({ ...init, note: "" }));
  const set = (k, v) => setF(x => ({ ...x, [k]: v }));
  return (
    <Modal title={newVersion ? `Новая редакция · ${init.title}` : init.title ? "Редактировать документ" : "Новый документ"} onClose={onClose} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="g2">
          <Field label="Название"><input className="inp" value={f.title} onChange={e => set("title", e.target.value)} /></Field>
          <Field label="Раздел"><select className="inp" value={f.cat} onChange={e => set("cat", e.target.value)}>{POLICY_CATS.map(c => <option key={c}>{c}</option>)}</select></Field>
        </div>
        <div className="g3">
          <Field label="Утверждён приказом"><input className="inp" value={f.order} onChange={e => set("order", e.target.value)} placeholder="№-ОД" /></Field>
          <Field label="Вступает в силу"><input className="inp" type="date" value={f.effective} onChange={e => set("effective", e.target.value)} /></Field>
          <Field label="Файл (PDF/DOCX)"><input className="inp" type="file" style={{ padding: 7 }} onChange={e => { const fl = e.target.files && e.target.files[0]; if (fl) set("file", fl.name); }} /></Field>
        </div>
        {newVersion && <Field label="Что изменилось"><input className="inp" value={f.note} onChange={e => set("note", e.target.value)} placeholder="Кратко: изменения в редакции" /></Field>}
        <Field label="Текст документа"><textarea className="ta" style={{ minHeight: 220, textTransform: "none" }} value={f.body} onChange={e => set("body", e.target.value)} /></Field>
        {newVersion && <div style={{ fontSize: 12, color: "var(--wn)" }}>После сохранения новой редакции все сотрудники должны ознакомиться с ней заново.</div>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn bo" onClick={onClose}>Отмена</button>
          <button className="btn bp" disabled={!f.title.trim() || !f.body.trim()} onClick={() => onSave(f)}>Сохранить</button>
        </div>
      </div>
    </Modal>
  );
}

function PolicyText({ body }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.7, color: "#1F2937", whiteSpace: "pre-wrap" }}>{body}</div>;
}

function PoliciesHR({ policies, setPolicies, employees }) {
  const people = allPeople(employees);
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(policies[0] && policies[0].id);
  const [form, setForm] = useState(null);
  const total = employees.length;
  const list = policies.filter(p => (cat === "all" || p.cat === cat) && (!q || p.title.toLowerCase().includes(q.toLowerCase())));
  const cur = policies.find(p => p.id === sel);
  const save = f => {
    const { note, ...doc } = f;
    if (form.mode === "new") setPolicies(ps => [...ps, { ...doc, id: uid(), version: "v1", acks: {}, versions: [{ v: "v1", date: doc.effective, order: doc.order, note: "Первая редакция" }] }]);
    else if (form.mode === "ver") setPolicies(ps => ps.map(p => { if (p.id !== doc.id) return p; const v = "v" + (parseInt(p.version.slice(1)) + 1); return { ...doc, version: v, acks: {}, versions: [{ v, date: doc.effective, order: doc.order, note: note || "Новая редакция" }, ...p.versions] }; }));
    else setPolicies(ps => ps.map(p => p.id === doc.id ? { ...p, ...doc } : p));
    setForm(null);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 14 }} className="ord-grid">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: "var(--tx2)" }}>Внутренние HR-документы {COMPANY.name} · {policies.length} действующих</div>
          <button className="btn bp" onClick={() => setForm({ mode: "new", init: { title: "", cat: POLICY_CATS[0], order: "", effective: todayISO(), body: "", file: "" } })}>+ Добавить документ</button>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {["all", ...POLICY_CATS].map(c => <button key={c} className={`nf-btn ${cat === c ? "sel" : ""}`} onClick={() => setCat(c)}>{c === "all" ? "Все" : c}</button>)}
          <input className="inp" style={{ flex: 1, minWidth: 160 }} placeholder="Поиск" value={q} onChange={e => setQ(e.target.value)} aria-label="Поиск документа" />
        </div>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="pol-row ord-head"><span>Документ</span><span>Утверждён</span><span>Редакция</span><span>Действует с</span><span>Ознакомлены</span></div>
          {list.map(p => { const n = Object.keys(p.acks).length; return (
            <div key={p.id} className="pol-row" onClick={() => setSel(p.id)} style={p.id === sel ? { background: "var(--acbg)" } : null}>
              <span><div style={{ fontWeight: 600 }}>{p.title}</div><div style={{ fontSize: 11.5, color: "var(--tx2)" }}>{p.cat}</div></span>
              <span style={{ color: "var(--tx2)" }}>приказ {p.order}</span><span>{p.version}</span><span style={{ color: "var(--tx2)" }}>{ruDate(p.effective)}</span>
              <span><Pill tone={n >= total ? "ok" : "warn"}>{n}/{total}</Pill></span>
            </div>); })}
          {list.length === 0 && <div className="emp">Ничего не найдено</div>}
        </div>
      </div>
      {cur && (
        <div className="card" style={{ marginBottom: 0, display: "flex", flexDirection: "column", gap: 10, alignSelf: "start" }}>
          <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 15, fontWeight: 800, color: "var(--tx)" }}>{cur.title}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><Pill tone="ac">{cur.version}</Pill><Pill>{cur.cat}</Pill>{cur.file && <Pill>📎 {cur.file}</Pill>}</div>
          <div className="ir"><span style={{ fontSize: 12.5, color: "var(--tx2)" }}>Утверждён</span><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx)" }}>приказ {cur.order}</span></div>
          <div className="ir"><span style={{ fontSize: 12.5, color: "var(--tx2)" }}>Действует с</span><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx)" }}>{ruDate(cur.effective)}</span></div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase" }}>Редакции</div>
          {cur.versions.map(v => <div key={v.v + v.date} style={{ fontSize: 12.5, color: "var(--tx)", padding: "6px 8px", borderRadius: 8, background: "var(--sf2)" }}><b>{v.v}</b> · {ruDate(v.date)} · {v.note}</div>)}
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase" }}>Не ознакомлены</div>
          {employees.filter(e => !cur.acks[e.id]).map(e => <div key={e.id} style={{ fontSize: 12.5, color: "var(--wn)" }}>• {e.name}</div>)}
          {employees.every(e => cur.acks[e.id]) && <div style={{ fontSize: 12.5, color: "var(--ok)" }}>Все сотрудники ознакомлены</div>}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
            <button className="btn bp bsm" onClick={() => setForm({ mode: "ver", init: cur })}>Новая редакция</button>
            <button className="btn bo bsm" onClick={() => setForm({ mode: "edit", init: cur })}>Редактировать</button>
            <button className="btn bo bsm" onClick={() => downloadCSV(`Ознакомление_${cur.title.slice(0, 30)}.csv`, [["Документ", cur.title, cur.version], ["ФИО", "Должность", "Ознакомлен(а)"], ...employees.map(e => [e.name, e.pos, cur.acks[e.id] ? ruDT(cur.acks[e.id]) : "нет"])])}>⬇ Лист ознакомления</button>
          </div>
        </div>
      )}
      {form && <PolicyForm init={form.init} newVersion={form.mode === "ver"} onClose={() => setForm(null)} onSave={save} />}
    </div>
  );
}

function PoliciesEmployee({ policies, setPolicies, user }) {
  const [q, setQ] = useState("");
  const pending = policies.filter(p => !p.acks[user.id]);
  const [sel, setSel] = useState((pending[0] || policies[0] || {}).id);
  const cur = policies.find(p => p.id === sel);
  const list = policies.filter(p => !q || (p.title + p.body).toLowerCase().includes(q.toLowerCase()));
  const ack = () => setPolicies(ps => ps.map(p => p.id === cur.id ? { ...p, acks: { ...p.acks, [user.id]: new Date().toISOString() } } : p));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0,1fr)", gap: 14 }} className="ord-grid">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input className="inp" placeholder="Поиск: отпуск, премия, график…" value={q} onChange={e => setQ(e.target.value)} aria-label="Поиск по документам" />
        {pending.length > 0 && <Pill tone="warn" style={{ alignSelf: "flex-start" }}>Ожидают ознакомления: {pending.length}</Pill>}
        {list.map(p => (
          <button key={p.id} onClick={() => setSel(p.id)} style={{ textAlign: "left", cursor: "pointer", background: p.id === sel ? "var(--acbg)" : "var(--sf)", border: "1px solid " + (p.id === sel ? "var(--ac)" : "var(--bd)"), borderRadius: 11, padding: "10px 12px", color: "var(--tx)", fontFamily: "Inter,sans-serif" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 11.5, color: p.acks[user.id] ? "var(--ok)" : "var(--wn)", marginTop: 2 }}>{p.acks[user.id] ? `Ознакомлен(а) ${ruDate(p.acks[user.id])}` : `Новая редакция ${p.version} · ознакомьтесь`}</div>
          </button>
        ))}
      </div>
      {cur && (
        <div>
          <ProtectedView user={user}>
            <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "26px 30px", border: "1px solid #E2E8F0", minHeight: 420 }}>
              <Letterhead />
              <div style={{ fontFamily: "'PT Serif',Georgia,serif", fontSize: 18, fontWeight: 700, color: "#111", margin: "14px 0 4px" }}>{cur.title}</div>
              <div style={{ fontSize: 12, color: "#5B6B7E", marginBottom: 14 }}>Редакция {cur.version} · утверждена приказом {cur.order} · действует с {ruDate(cur.effective)}</div>
              <PolicyText body={cur.body} />
            </div>
          </ProtectedView>
          {!cur.acks[user.id] ? (
            <div className="card" style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: "var(--tx)" }}>Прочитайте документ полностью и подтвердите ознакомление.</span>
              <button className="btn bp" onClick={ack}>Ознакомлен(а)</button>
            </div>
          ) : <div style={{ marginTop: 12 }}><Pill tone="ok">✓ Ознакомлен(а) {ruDT(cur.acks[user.id])}</Pill></div>}
        </div>
      )}
    </div>
  );
}

function PoliciesModule({ user, policies, setPolicies, employees }) {
  if (isStaffRole(user.role)) return <PoliciesHR policies={policies} setPolicies={setPolicies} employees={employees} />;
  if (user.role === "director") return <PoliciesHR policies={policies} setPolicies={setPolicies} employees={employees} />;
  return <PoliciesEmployee policies={policies} setPolicies={setPolicies} user={user} />;
}

/* ═════════════════════ ИНТЕГРАЦИЯ С ENBEK.KZ (ЕСУТД / ЭБТ) ═════════════════════
   Сервисы SmartBridge:
     MINTRUD-S-0356 — регистрация учётных данных трудовых договоров, допсоглашений, расторжений (ВШЭП)
     MINTRUD-S-3023 — синхронизация данных о трудовых договорах ИС клиента с ЕСУТД (ВШЭП)
     MINTRUD-S-6167 — приём данных по предприятиям, вакансиям и соискателям, ENBEK_RT_8085 (вне ЕТС ГО)
   Сейчас работает ЭМУЛЯТОР (enbekCall). После подключения заменить тело enbekCall на запрос к серверу портала:
     fetch(`${API}/enbek/${service}/${op}`, { method: "POST", body: JSON.stringify(payload) })
   Сервер подписывает SOAP-запрос ЭЦП компании и отправляет через ВШЭП. */
const ENBEK_SERVICES = [
  { code: "MINTRUD-S-0356", name: "Регистрация трудовых договоров, допсоглашений и расторжений в ЕСУТД", contour: "ВШЭП", sys: "ЕСУТД" },
  { code: "MINTRUD-S-3023", name: "Синхронизация данных о трудовых договорах с ЕСУТД", contour: "ВШЭП", sys: "ЕСУТД" },
  { code: "MINTRUD-S-6167", name: "Приём данных по предприятиям, вакансиям и соискателям (ENBEK_RT_8085)", contour: "Вне ЕТС ГО", sys: "Электронная биржа труда" },
];
const EV_TYPES = {
  conclusion: { label: "Заключение договора", due: { work: 5 }, op: "registerContract" },
  amendment: { label: "Допсоглашение", due: { cal: 15 }, op: "registerAmendment" },
  termination: { label: "Расторжение", due: { work: 3 }, op: "registerTermination" },
};
const EV_STATUS = { queued: { l: "В очереди", t: "gr" }, sending: { l: "Отправляется…", t: "info" }, registered: { l: "Зарегистрировано", t: "ok" }, error: { l: "Ошибка", t: "err" } };
const TERM_BASIS = ["Соглашение сторон (ст. 50 ТК РК)", "Истечение срока договора (ст. 51 ТК РК)", "Инициатива работодателя (ст. 52 ТК РК)", "Инициатива работника (ст. 56 ТК РК)", "Обстоятельства вне воли сторон (ст. 58 ТК РК)"];
const PROF_AREAS = ["Продажи", "Закупки, снабжение", "Логистика, склад", "Бухгалтерия, финансы", "ВЭД", "Административный персонал", "Транспорт", "Производство", "Юриспруденция", "IT"];
const EDU_LEVELS = ["Не важно", "Среднее", "Среднее специальное", "Высшее"];
const EXP_LEVELS = ["Без опыта", "От 1 года", "От 3 лет", "От 5 лет"];
const LANGS = ["Казахский", "Русский", "Английский", "Китайский"];
const SCHEDULES = ["Полный день", "Сменный график", "Вахтовый метод", "Гибкий график"];
const EMPLOYMENT = ["Полная занятость", "Частичная занятость", "Временная работа"];
const VAC_STATUS = {
  draft: { l: "Черновик", t: "gr" }, review: { l: "У HR", t: "info" }, approval: { l: "На согласовании", t: "warn" }, returned: { l: "Возвращена", t: "err" },
  publishing: { l: "Публикуется…", t: "info" }, published: { l: "Опубликована на Enbek", t: "ok" }, error: { l: "Ошибка Enbek", t: "err" }, closed: { l: "Закрыта", t: "gr" },
};
const FINE_ESUTD = "до 100 МРП (432 500 ₸) для среднего бизнеса, ст. 98 КоАП";

const addCalDays = (iso, n) => { const d = new Date(iso); d.setDate(d.getDate() + n); return d.toISOString(); };
const evDue = ev => { const r = EV_TYPES[ev.type].due; const base = (ev.date || todayISO()) + "T09:00:00"; return r.work ? addWorkDays(base, r.work) : addCalDays(base, r.cal); };
const daysLeft = iso => Math.ceil((new Date(iso) - new Date()) / 86400000);
const rid = p => `${p}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

function soapXml(service, op, payload) {
  const body = Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== "").map(([k, v]) => `      <${k}>${escHTML(Array.isArray(v) ? v.join(", ") : v)}</${k}>`).join("\n");
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header>
    <serviceId>${service}</serviceId>
    <messageId>${uid()}-${Date.now()}</messageId>
    <messageDate>${new Date().toISOString()}</messageDate>
    <sender>MKA_HR_PORTAL</sender>
    <!-- подпись ЭЦП ИС (транспортный сертификат НУЦ РК) добавляется на сервере -->
  </soapenv:Header>
  <soapenv:Body>
    <${op}>
${body}
    </${op}>
  </soapenv:Body>
</soapenv:Envelope>`;
}

/* ── ЭМУЛЯТОР сервисов (детерминированная проверка обязательных полей) ── */
async function enbekCall(service, op, payload) {
  await new Promise(r => setTimeout(r, 700));
  const err = (code, message) => ({ ok: false, code, message });
  if (service === "MINTRUD-S-0356") {
    if (!/^\d{12}$/.test(payload.iin || "")) return err("ESUTD-101", "ИИН работника должен содержать 12 цифр");
    if (op !== "registerTermination") {
      if (!payload.position) return err("ESUTD-102", "Не указана должность (трудовая функция)");
      if (!payload.workplace) return err("ESUTD-103", "Не указано место выполнения работы");
    }
    if (!payload.contractNumber) return err("ESUTD-104", "Не указан номер трудового договора");
    if (op === "registerTermination" && !payload.terminationBasis) return err("ESUTD-105", "Не указано основание расторжения");
    return { ok: true, id: (op === "registerContract" ? "ЕСУТД-" : op === "registerAmendment" ? "ДС-" : "РТ-") + String(Math.floor(1e7 + Math.random() * 9e7)), message: "Сведения зарегистрированы в ЕСУТД" };
  }
  if (service === "MINTRUD-S-6167") {
    if (op === "closeVacancy") return { ok: true, id: payload.enbekId, message: "Вакансия снята с публикации" };
    if (!payload.positionName) return err("EBT-201", "Не указано наименование должности");
    if (!payload.region) return err("EBT-202", "Не указан город / район");
    if (!payload.duties || payload.duties.length < 20) return err("EBT-203", "Должностные обязанности: не менее 20 символов");
    if (!(payload.vacantCount >= 1)) return err("EBT-204", "Количество вакантных мест должно быть не меньше 1");
    return { ok: true, id: "ЭБТ-" + String(Math.floor(1e6 + Math.random() * 9e6)), message: "Вакансия принята и опубликована на Электронной бирже труда" };
  }
  if (service === "MINTRUD-S-3023") return { ok: true, message: "Данные ЕСУТД получены" };
  return err("SB-404", "Сервис не найден");
}

const INIT_ENBEK = () => {
  const ago = k => { const d = new Date(); d.setDate(d.getDate() - k); return isoDay(d); };
  const reg = (date, id) => ({ id: uid(), type: "conclusion", date, status: "registered", esutdId: id, sentAt: date + "T10:00:00.000Z" });
  const c = (id, empId, iin, number, date, position, dept, salary, evs) => ({ id, empId, iin, number, date, start: date, kind: "indefinite", end: "", position, dept, workplace: `${COMPANY.city}`, salary, mode: "Полный рабочий день", events: evs || [reg(date, "ЕСУТД-" + iin.slice(-8))] });
  const contracts = [
    c("c1", "e1", "000000000101", "ТД-2026/014", "2026-09-21", "Менеджер по продажам", "Продажи", 350000),
    c("c2", "e2", "000000000102", "ТД-2025/006", "2025-03-10", "Заведующий складом", "Логистика и склад", 420000),
    c("c3", "e3", "000000000103", "ТД-2024/021", "2024-11-04", "Специалист по ВЭД", "Закупки и ВЭД", 400000),
    c("c4", "e4", "000000000104", "ТД-2026/019", ago(11), "Менеджер по продажам", "Продажи", 330000, [{ id: uid(), type: "conclusion", date: ago(11), status: "error", error: "ESUTD-101: ИИН работника должен содержать 12 цифр", sentAt: new Date().toISOString() }]),
    c("c5", "e5", "000000000105", "ТД-2023/008", "2023-06-01", "Бухгалтер", "Бухгалтерия", 380000),
  ];
  contracts[3].iin = "00000000104";
  const esutd = {};
  contracts.forEach(k => { if (k.events.some(e => e.status === "registered")) esutd[k.id] = { iin: k.iin, number: k.number, position: k.position, dept: k.dept, salary: k.salary, status: "active" }; });
  esutd.c3.position = "Специалист по закупкам"; // расхождение для сверки
  esutd.x1 = { iin: "000000000199", number: "ТД-2022/011", name: "Работник (уволен в портале, не расторгнут в ЕСУТД)", position: "Водитель-экспедитор", dept: "Логистика и склад", salary: 300000, status: "active" };
  return {
    contracts, esutd,
    vacancies: [
      { id: "v1", positionName: "Водитель-экспедитор", spec: "категория C, перевозка опасных грузов (ДОПОГ)", profArea: "Транспорт", region: COMPANY.city, locality: "Алматы", address: "", count: 2, salaryFrom: 350000, salaryTo: 450000, schedule: "Полный день", employment: "Полная занятость", experience: "От 3 лет", education: "Среднее специальное", languages: ["Казахский", "Русский"], qualities: "Ответственность, пунктуальность", duties: "Доставка химических реагентов клиентам, оформление ТТН, контроль сохранности груза в пути.", pubDays: 30, dept: "Логистика и склад", authorId: "e2", status: "approval", history: [{ at: ago(1) + "T09:10:00.000Z", by: "e2", t: "Заявка создана" }, { at: ago(1) + "T11:00:00.000Z", by: "hr1", t: "Проверено HR, отправлено директору" }] },
      { id: "v2", positionName: "Менеджер по продажам", spec: "B2B, горнодобывающие предприятия", profArea: "Продажи", region: COMPANY.city, locality: "Алматы", address: "", count: 1, salaryFrom: 300000, salaryTo: 500000, schedule: "Полный день", employment: "Полная занятость", experience: "От 1 года", education: "Высшее", languages: ["Казахский", "Русский"], qualities: "Коммуникабельность", duties: "Работа с клиентами, участие в тендерах на tizilim.gov.kz, подготовка коммерческих предложений.", pubDays: 30, dept: "Продажи", authorId: "hr1", status: "published", enbekId: "ЭБТ-4821937", approvedAt: ago(9) + "T10:00:00.000Z", publishedAt: ago(9) + "T10:01:00.000Z", history: [{ at: ago(9) + "T10:01:00.000Z", by: "dir1", t: "Согласовано, опубликовано на Enbek" }] },
    ],
    log: [],
    settings: { autoSend: true, autoOrder: true, bin: "", lastSync: null },
  };
};

/* ── общий хук отправки ── */
function useEnbekSender(setEnbek) {
  const logIt = (service, op, object, res, payload) => setEnbek(x => ({ ...x, log: [{ id: uid(), at: new Date().toISOString(), service, op, object, ok: res.ok, code: res.code || "OK", message: res.message, reqId: rid("REQ"), xml: soapXml(service, op, payload) }, ...x.log].slice(0, 300) }));
  const sendContractEvent = async (contract, evId) => {
    const ev = contract.events.find(e => e.id === evId); if (!ev) return;
    const cur = applyAmend(contract);
    const payload = { iin: contract.iin, contractNumber: contract.number, contractDate: contract.date, startDate: contract.start, contractType: contract.kind === "fixed" ? "срочный" : "бессрочный", endDate: contract.end, position: ev.changes?.position || cur.position, department: ev.changes?.dept || cur.dept, workplace: contract.workplace, workMode: contract.mode, eventDate: ev.date, docNumber: ev.doc, terminationBasis: ev.basis };
    setEnbek(x => ({ ...x, contracts: x.contracts.map(c => c.id !== contract.id ? c : { ...c, events: c.events.map(e => e.id === evId ? { ...e, status: "sending", error: "" } : e) }) }));
    const res = await enbekCall("MINTRUD-S-0356", EV_TYPES[ev.type].op, payload);
    logIt("MINTRUD-S-0356", EV_TYPES[ev.type].op, `${contract.number} · ИИН ${contract.iin}`, res, payload);
    setEnbek(x => {
      const contracts = x.contracts.map(c => c.id !== contract.id ? c : { ...c, events: c.events.map(e => e.id === evId ? { ...e, status: res.ok ? "registered" : "error", esutdId: res.id || "", error: res.ok ? "" : `${res.code}: ${res.message}`, sentAt: new Date().toISOString() } : e) });
      const esutd = { ...x.esutd };
      if (res.ok) {
        const c = contracts.find(k => k.id === contract.id); const now = applyAmend(c);
        esutd[c.id] = { iin: c.iin, number: c.number, position: now.position, dept: now.dept, salary: now.salary, status: ev.type === "termination" ? "terminated" : "active" };
      }
      return { ...x, contracts, esutd };
    });
    return res;
  };
  const sendVacancy = async (vac, op = "publishVacancy") => {
    const payload = { enterpriseBin: "", positionName: vac.positionName, positionSpec: vac.spec, profArea: vac.profArea, region: vac.region, locality: vac.locality, address: vac.address, vacantCount: +vac.count, salaryFrom: vac.salaryFrom, salaryTo: vac.salaryTo, schedule: vac.schedule, employment: vac.employment, experience: vac.experience, education: vac.education, languages: vac.languages, personalQualities: vac.qualities, duties: vac.duties, publicationDays: vac.pubDays, enbekId: vac.enbekId };
    if (op === "publishVacancy") setEnbek(x => ({ ...x, vacancies: x.vacancies.map(v => v.id === vac.id ? { ...v, status: "publishing", error: "" } : v) }));
    const res = await enbekCall("MINTRUD-S-6167", op, payload);
    logIt("MINTRUD-S-6167", op, vac.positionName, res, payload);
    setEnbek(x => ({ ...x, vacancies: x.vacancies.map(v => {
      if (v.id !== vac.id) return v;
      const h = [...(v.history || []), { at: new Date().toISOString(), by: "enbek", t: res.ok ? res.message + (res.id ? ` · ${res.id}` : "") : `Ошибка ${res.code}: ${res.message}` }];
      if (op === "closeVacancy") return { ...v, status: res.ok ? "closed" : v.status, closedAt: new Date().toISOString(), history: h };
      return { ...v, status: res.ok ? "published" : "error", enbekId: res.id || "", publishedAt: res.ok ? new Date().toISOString() : null, error: res.ok ? "" : `${res.code}: ${res.message}`, history: h };
    }) }));
    return res;
  };
  return { sendContractEvent, sendVacancy, logIt };
}

const applyAmend = c => {
  const cur = { position: c.position, dept: c.dept, salary: c.salary };
  c.events.filter(e => e.type === "amendment").forEach(e => Object.assign(cur, Object.fromEntries(Object.entries(e.changes || {}).filter(([, v]) => v !== "" && v !== undefined))));
  return cur;
};
const contractState = c => {
  const term = c.events.find(e => e.type === "termination");
  const last = c.events[c.events.length - 1];
  return { terminated: !!term, last, pending: c.events.filter(e => e.status !== "registered") };
};
const DueTag = ({ ev }) => {
  if (ev.status === "registered") return <span style={{ fontSize: 12, color: "var(--tx2)" }}>✓ {ruDate(ev.sentAt)}</span>;
  const d = daysLeft(evDue(ev));
  return <Pill tone={d < 0 ? "err" : d <= 1 ? "warn" : "gr"}>{d < 0 ? `просрочено ${-d} дн.` : d === 0 ? "срок сегодня" : `осталось ${d} дн.`}</Pill>;
};

/* ── Формы договора ── */
function ContractForm({ init, employees, onSave, onClose, title }) {
  const [f, setF] = useState(init);
  const [err, setErr] = useState("");
  const set = (k, v) => setF(x => ({ ...x, [k]: v }));
  const save = () => {
    if (f.empMode === "new" && !f.newName.trim()) return setErr("Укажите ФИО нового работника");
    if (f.empMode === "existing" && !f.empId) return setErr("Выберите работника");
    if (!f.number.trim() || !f.position.trim()) return setErr("Заполните номер договора и должность");
    onSave(f);
  };
  return (
    <Modal title={title} onClose={onClose} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button className={`tb ${f.empMode === "existing" ? "act" : ""}`} onClick={() => set("empMode", "existing")}>Работник из портала</button>
          <button className={`tb ${f.empMode === "new" ? "act" : ""}`} onClick={() => set("empMode", "new")}>Новый работник</button>
        </div>
        {f.empMode === "existing" ? (
          <Field label="Работник"><select className="inp" value={f.empId} onChange={e => set("empId", e.target.value)}><option value="">— выбрать —</option>{employees.map(e => <option key={e.id} value={e.id}>{e.name} · {e.pos}</option>)}</select></Field>
        ) : (
          <div className="g2"><Field label="ФИО"><input className="inp" value={f.newName} onChange={e => set("newName", e.target.value)} /></Field><Field label="Телефон"><input className="inp" value={f.newPhone} onChange={e => set("newPhone", e.target.value)} placeholder="+7" /></Field></div>
        )}
        <div className="g3">
          <Field label="ИИН"><input className="inp" inputMode="numeric" maxLength={12} value={f.iin} onChange={e => set("iin", e.target.value.replace(/\D/g, ""))} placeholder="12 цифр" /></Field>
          <Field label="№ договора"><input className="inp" value={f.number} onChange={e => set("number", e.target.value)} /></Field>
          <Field label="Дата договора"><input className="inp" type="date" value={f.date} onChange={e => set("date", e.target.value)} /></Field>
        </div>
        <div className="g3">
          <Field label="Должность"><input className="inp" value={f.position} onChange={e => set("position", e.target.value)} /></Field>
          <Field label="Отдел"><select className="inp" value={f.dept} onChange={e => set("dept", e.target.value)}>{DEPTS.map(d => <option key={d}>{d}</option>)}</select></Field>
          <Field label="Оклад, ₸"><input className="inp" type="number" value={f.salary} onChange={e => set("salary", +e.target.value)} /></Field>
        </div>
        <div className="g3">
          <Field label="Дата начала работы"><input className="inp" type="date" value={f.start} onChange={e => set("start", e.target.value)} /></Field>
          <Field label="Срок договора"><select className="inp" value={f.kind} onChange={e => set("kind", e.target.value)}><option value="indefinite">Бессрочный</option><option value="fixed">Срочный</option></select></Field>
          {f.kind === "fixed" ? <Field label="Дата окончания"><input className="inp" type="date" value={f.end} onChange={e => set("end", e.target.value)} /></Field> : <Field label="Режим"><input className="inp" value={f.mode} onChange={e => set("mode", e.target.value)} /></Field>}
        </div>
        <Field label="Место выполнения работы"><input className="inp" value={f.workplace} onChange={e => set("workplace", e.target.value)} /></Field>
        <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--tx)" }}><input type="checkbox" checked={f.makeOrder} onChange={e => set("makeOrder", e.target.checked)} /> Создать приказ Л/С о приёме и отправить директору на подпись</label>
        {err && <div style={{ fontSize: 12.5, color: "var(--er)" }}>⚠ {err}</div>}
        <div style={{ fontSize: 12, color: "var(--tx2)" }}>После сохранения сведения сразу уходят в ЕСУТД через MINTRUD-S-0356. Срок по закону — 5 рабочих дней с даты договора.</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}><button className="btn bo" onClick={onClose}>Отмена</button><button className="btn bp" onClick={save}>Сохранить и отправить в ЕСУТД</button></div>
      </div>
    </Modal>
  );
}

function EventForm({ contract, type, onSave, onClose }) {
  const cur = applyAmend(contract);
  const [f, setF] = useState({ date: todayISO(), doc: "", position: cur.position, dept: cur.dept, salary: cur.salary, basis: TERM_BASIS[0], makeOrder: true });
  const set = (k, v) => setF(x => ({ ...x, [k]: v }));
  const isT = type === "termination";
  return (
    <Modal title={`${EV_TYPES[type].label} · ${contract.number}`} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="g2"><Field label={isT ? "Дата расторжения" : "Дата допсоглашения"}><input className="inp" type="date" value={f.date} onChange={e => set("date", e.target.value)} /></Field><Field label={isT ? "№ приказа / соглашения" : "№ допсоглашения"}><input className="inp" value={f.doc} onChange={e => set("doc", e.target.value)} /></Field></div>
        {isT ? (
          <Field label="Основание"><select className="inp" value={f.basis} onChange={e => set("basis", e.target.value)}>{TERM_BASIS.map(b => <option key={b}>{b}</option>)}</select></Field>
        ) : (
          <div className="g3"><Field label="Должность"><input className="inp" value={f.position} onChange={e => set("position", e.target.value)} /></Field><Field label="Отдел"><select className="inp" value={f.dept} onChange={e => set("dept", e.target.value)}>{DEPTS.map(d => <option key={d}>{d}</option>)}</select></Field><Field label="Оклад, ₸"><input className="inp" type="number" value={f.salary} onChange={e => set("salary", +e.target.value)} /></Field></div>
        )}
        <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--tx)" }}><input type="checkbox" checked={f.makeOrder} onChange={e => set("makeOrder", e.target.checked)} /> Создать приказ Л/С и отправить директору на подпись</label>
        <div style={{ fontSize: 12, color: "var(--tx2)" }}>Срок внесения в ЕСУТД: {isT ? "3 рабочих дня" : "15 календарных дней"}.</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}><button className="btn bo" onClick={onClose}>Отмена</button><button className={`btn ${isT ? "bd" : "bp"}`} onClick={() => onSave(f)}>Сохранить и отправить в ЕСУТД</button></div>
      </div>
    </Modal>
  );
}

function EnbekModule({ user, employees, setEmployees, enbek, setEnbek, orders, setOrders }) {
  const people = allPeople(employees);
  const [tab, setTab] = useState("contracts");
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState(null);
  const [evForm, setEvForm] = useState(null);
  const [xml, setXml] = useState(null);
  const [q, setQ] = useState("");
  const [syncRes, setSyncRes] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");
  const { sendContractEvent, logIt } = useEnbekSender(setEnbek);
  const flash = m => { setToast(m); setTimeout(() => setToast(""), 4000); };
  const makeOrder = (title, body, empId) => setOrders(os => [{ id: uid(), type: "LS", num: nextNum(os, "LS", new Date().getFullYear()), year: new Date().getFullYear(), date: todayISO(), title, body, recipients: [empId], deadlineDays: 3, attachments: [], status: "sign", acks: {}, createdBy: user.id, signedBy: null, signedAt: null, returnComment: "" }, ...os]);

  const contracts = enbek.contracts;
  const allEv = contracts.flatMap(c => c.events.map(e => ({ c, e })));
  const pend = allEv.filter(x => x.e.status !== "registered");
  const overdue = pend.filter(x => daysLeft(evDue(x.e)) < 0).length;
  const errors = pend.filter(x => x.e.status === "error").length;

  const saveContract = async f => {
    let empId = f.empId;
    if (f.empMode === "new") { empId = uid(); setEmployees(es => [...es, { id: empId, role: "employee", name: f.newName.trim(), pos: f.position, dept: f.dept, phone: f.newPhone, joinDate: f.start, adaptTasks: [], adaptDone: false }]); }
    const ev = { id: uid(), type: "conclusion", date: f.date, status: "queued" };
    const c = { id: uid(), empId, iin: f.iin, number: f.number.trim(), date: f.date, start: f.start, kind: f.kind, end: f.end, position: f.position, dept: f.dept, workplace: f.workplace, salary: f.salary, mode: f.mode, events: [ev], vacancyId: f.vacancyId };
    setEnbek(x => ({ ...x, contracts: [c, ...x.contracts] }));
    if (f.makeOrder) makeOrder(`О приёме на работу (${shortName(f.empMode === "new" ? f.newName : personOf(people, empId).name)})`, `1. Принять ${f.empMode === "new" ? f.newName : personOf(people, empId).name} на должность «${f.position}» в подразделение «${f.dept}» с ${ruDate(f.start)}.\n2. Установить должностной оклад ${Number(f.salary || 0).toLocaleString("ru-RU")} ₸.\n3. Основание: трудовой договор № ${f.number} от ${ruDate(f.date)}.`, empId);
    if (f.vacancyId) setEnbek(x => ({ ...x, vacancies: x.vacancies.map(v => v.id === f.vacancyId ? { ...v, hired: (v.hired || 0) + 1, history: [...(v.history || []), { at: new Date().toISOString(), by: user.id, t: `Принят работник по договору ${f.number}` }] } : v) }));
    setForm(null);
    if (enbek.settings.autoSend) { const r = await sendContractEvent(c, ev.id); flash(r && r.ok ? `Договор ${c.number} зарегистрирован в ЕСУТД · ${r.id}` : `ЕСУТД вернула ошибку: ${r ? r.message : ""}`); }
  };
  const saveEvent = async (c, type, f) => {
    const ev = { id: uid(), type, date: f.date, doc: f.doc, status: "queued", basis: type === "termination" ? f.basis : undefined, changes: type === "amendment" ? { position: f.position, dept: f.dept, salary: f.salary } : undefined };
    const nc = { ...c, events: [...c.events, ev] };
    setEnbek(x => ({ ...x, contracts: x.contracts.map(k => k.id === c.id ? nc : k) }));
    const name = personOf(people, c.empId).name;
    if (f.makeOrder) {
      if (type === "termination") makeOrder(`О расторжении трудового договора (${shortName(name)})`, `1. Расторгнуть трудовой договор № ${c.number} от ${ruDate(c.date)} с ${name} ${ruDate(f.date)}.\n2. Основание: ${f.basis}.\n3. Бухгалтерии произвести окончательный расчёт.`, c.empId);
      else makeOrder(`О переводе / изменении условий труда (${shortName(name)})`, `1. Установить ${name} с ${ruDate(f.date)}: должность «${f.position}», подразделение «${f.dept}», оклад ${Number(f.salary || 0).toLocaleString("ru-RU")} ₸.\n2. Основание: дополнительное соглашение${f.doc ? " № " + f.doc : ""} к трудовому договору № ${c.number}.`, c.empId);
    }
    if (type === "amendment") setEmployees(es => es.map(e => e.id === c.empId ? { ...e, pos: f.position, dept: f.dept } : e));
    setEvForm(null);
    if (enbek.settings.autoSend) { const r = await sendContractEvent(nc, ev.id); flash(r && r.ok ? `${EV_TYPES[type].label} зарегистрировано в ЕСУТД · ${r.id}` : `ЕСУТД вернула ошибку: ${r ? r.message : ""}`); }
  };
  const runSync = async () => {
    setSyncing(true);
    const res = await enbekCall("MINTRUD-S-3023", "syncContracts", { bin: enbek.settings.bin || "", date: todayISO() });
    logIt("MINTRUD-S-3023", "syncContracts", `Все договоры (${contracts.length})`, res, { bin: enbek.settings.bin || "", date: todayISO() });
    const rows = [];
    contracts.forEach(c => {
      const s = enbek.esutd[c.id]; const cur = applyAmend(c); const st = contractState(c);
      if (!s) { rows.push({ kind: "missing", c, text: "Нет в ЕСУТД" }); return; }
      const diffs = [];
      [["position", "Должность"], ["dept", "Отдел"], ["salary", "Оклад"]].forEach(([k, l]) => { if (String(s[k]) !== String(cur[k])) diffs.push({ k, l, portal: cur[k], esutd: s[k] }); });
      if (s.status === "active" && st.terminated && st.last.status === "registered") diffs.push({ k: "status", l: "Статус", portal: "расторгнут", esutd: "действует" });
      rows.push(diffs.length ? { kind: "diff", c, diffs } : { kind: "ok", c });
    });
    Object.entries(enbek.esutd).filter(([k]) => !contracts.some(c => c.id === k)).forEach(([k, s]) => rows.push({ kind: "extra", key: k, s }));
    setSyncRes({ at: new Date().toISOString(), rows });
    setEnbek(x => ({ ...x, settings: { ...x.settings, lastSync: new Date().toISOString() } }));
    setSyncing(false);
  };
  const acceptEsutd = r => { setEnbek(x => ({ ...x, contracts: x.contracts.map(c => c.id !== r.c.id ? c : { ...c, ...Object.fromEntries(r.diffs.filter(d => d.k !== "status").map(d => [d.k, d.esutd])), events: c.events.filter(e => e.type !== "amendment") }) })); setSyncRes(s => ({ ...s, rows: s.rows.map(x => x === r ? { kind: "ok", c: r.c } : x) })); };
  const pushFix = async r => {
    const ev = { id: uid(), type: "amendment", date: todayISO(), doc: "исправление", status: "queued", changes: Object.fromEntries(r.diffs.filter(d => d.k !== "status").map(d => [d.k, d.portal])) };
    const nc = { ...r.c, events: [...r.c.events, ev] };
    setEnbek(x => ({ ...x, contracts: x.contracts.map(k => k.id === nc.id ? nc : k) }));
    const res = await sendContractEvent(nc, ev.id);
    if (res && res.ok) setSyncRes(s => ({ ...s, rows: s.rows.map(x => x === r ? { kind: "ok", c: nc } : x) }));
  };
  const importExtra = r => {
    const empId = uid(); const c = { id: r.key, empId, iin: r.s.iin, number: r.s.number, date: todayISO(), start: todayISO(), kind: "indefinite", end: "", position: r.s.position, dept: r.s.dept, workplace: COMPANY.city, salary: r.s.salary, mode: "Полный рабочий день", events: [{ id: uid(), type: "conclusion", date: todayISO(), status: "registered", esutdId: "из ЕСУТД", sentAt: new Date().toISOString() }] };
    setEmployees(es => [...es, { id: empId, role: "employee", name: r.s.name || `Работник ИИН ${r.s.iin}`, pos: r.s.position, dept: r.s.dept, phone: "", joinDate: todayISO(), adaptTasks: [], adaptDone: false }]);
    setEnbek(x => ({ ...x, contracts: [...x.contracts, c] }));
    setSyncRes(s => ({ ...s, rows: s.rows.map(x => x === r ? { kind: "ok", c } : x) }));
  };

  const cur = open && contracts.find(c => c.id === open);
  const list = contracts.filter(c => !q || (personOf(people, c.empId).name + c.number + c.iin).toLowerCase().includes(q.toLowerCase()));
  const tabs = [["contracts", "Договоры ЕСУТД", errors + overdue], ["sync", "Сверка с ЕСУТД"], ["log", "Журнал обмена"], ["conn", "Подключение"]];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12, padding: "9px 14px", borderRadius: 10, background: "var(--inbg)", color: "var(--in)", fontSize: 12.5, fontWeight: 600 }}>
        🔗 Сервисы Enbek подключены в тестовом режиме (эмуляция). Обмен, статусы и журнал работают как при реальном подключении через SmartBridge.
      </div>
      {toast && <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: toast.includes("ошибк") ? "var(--erbg)" : "var(--okbg)", color: toast.includes("ошибк") ? "var(--er)" : "var(--ok)", fontSize: 13, fontWeight: 600 }}>{toast}</div>}
      <div className="tabs" style={{ flexWrap: "wrap" }}>
        {tabs.map(([id, l, b]) => <button key={id} className={`tb ${tab === id ? "act" : ""}`} onClick={() => setTab(id)}>{l}{b ? <span style={{ marginLeft: 6, background: "#EF4444", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 99 }}>{b}</span> : null}</button>)}
      </div>

      {tab === "contracts" && (
        <div>
          <div className="g3" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 12 }}>
            {[[allEv.filter(x => x.e.status === "registered").length, "Зарегистрировано", "var(--ok)"], [pend.filter(x => x.e.status === "queued" || x.e.status === "sending").length, "В очереди", "var(--in)"], [errors, "Ошибки ЕСУТД", "var(--er)"], [overdue, "Просрочен срок", "var(--er)"]].map(([v, l, c]) => <div key={l} className="sc" style={{ cursor: "default" }}><div className="sv" style={{ color: c }}>{v}</div><div className="sl">{l}</div></div>)}
          </div>
          {overdue > 0 && <div style={{ marginBottom: 12, padding: "9px 14px", borderRadius: 10, background: "var(--erbg)", color: "var(--er)", fontSize: 12.5, fontWeight: 600 }}>⚠ Есть просроченные сведения. Штраф за несвоевременное внесение — {FINE_ESUTD}.</div>}
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <input className="inp" style={{ flex: 1, minWidth: 200 }} placeholder="Поиск: ФИО, № договора, ИИН" value={q} onChange={e => setQ(e.target.value)} aria-label="Поиск договора" />
            <button className="btn bp" onClick={() => setForm({ empMode: "existing", empId: "", newName: "", newPhone: "", iin: "", number: `ТД-${new Date().getFullYear()}/${pad2(contracts.length + 1)}`, date: todayISO(), start: todayISO(), kind: "indefinite", end: "", position: "", dept: DEPTS[1], salary: 0, workplace: COMPANY.city, mode: "Полный рабочий день", makeOrder: enbek.settings.autoOrder })}>+ Новый трудовой договор</button>
          </div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="en-row ord-head"><span>Работник</span><span>Договор</span><span>Должность</span><span>Последнее событие</span><span>Статус ЕСУТД</span><span>Срок</span></div>
            {list.map(c => { const st = contractState(c); const p = personOf(people, c.empId); const now = applyAmend(c); return (
              <div key={c.id} className="en-row" onClick={() => setOpen(c.id)}>
                <span><div style={{ fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 11.5, color: "var(--tx2)" }}>ИИН {c.iin || "—"}</div></span>
                <span>{c.number}<div style={{ fontSize: 11.5, color: "var(--tx2)" }}>от {ruDate(c.date)}</div></span>
                <span>{now.position}</span>
                <span>{EV_TYPES[st.last.type].label}{st.terminated && <div style={{ fontSize: 11.5, color: "var(--tx2)" }}>расторгнут</div>}</span>
                <span><Pill tone={EV_STATUS[st.last.status].t}>{EV_STATUS[st.last.status].l}</Pill></span>
                <span><DueTag ev={st.last} /></span>
              </div>); })}
          </div>
        </div>
      )}

      {tab === "sync" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--tx2)" }}>MINTRUD-S-3023 · последняя сверка: {enbek.settings.lastSync ? ruDT(enbek.settings.lastSync) : "не проводилась"}</div>
            <button className="btn bp" onClick={runSync} disabled={syncing}>{syncing ? "Сверяем…" : "⟳ Сверить с ЕСУТД"}</button>
          </div>
          {!syncRes ? <div className="card"><div className="emp"><div className="ei">⟳</div>Нажмите «Сверить с ЕСУТД», чтобы сравнить договоры портала с данными ЕСУТД</div></div> : (
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", fontSize: 12.5, color: "var(--tx2)", borderBottom: "1px solid var(--bd)" }}>
                Совпадает: <b style={{ color: "var(--ok)" }}>{syncRes.rows.filter(r => r.kind === "ok").length}</b> · Расхождения: <b style={{ color: "var(--wn)" }}>{syncRes.rows.filter(r => r.kind === "diff").length}</b> · Нет в ЕСУТД: <b style={{ color: "var(--er)" }}>{syncRes.rows.filter(r => r.kind === "missing").length}</b> · Есть только в ЕСУТД: <b style={{ color: "var(--er)" }}>{syncRes.rows.filter(r => r.kind === "extra").length}</b>
              </div>
              {syncRes.rows.map((r, i) => (
                <div key={i} style={{ padding: "11px 16px", borderBottom: "1px solid var(--bd)", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", color: "var(--tx)", fontSize: 13 }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ fontWeight: 600 }}>{r.kind === "extra" ? (r.s.name || "Работник") : personOf(people, r.c.empId).name} <span style={{ fontWeight: 400, color: "var(--tx2)" }}>· {r.kind === "extra" ? r.s.number : r.c.number} · ИИН {r.kind === "extra" ? r.s.iin : r.c.iin}</span></div>
                    {r.kind === "diff" && r.diffs.map(d => <div key={d.k} style={{ fontSize: 12, color: "var(--tx2)" }}>{d.l}: в портале <b style={{ color: "var(--tx)" }}>{String(d.portal)}</b>, в ЕСУТД <b style={{ color: "var(--wn)" }}>{String(d.esutd)}</b></div>)}
                    {r.kind === "missing" && <div style={{ fontSize: 12, color: "var(--tx2)" }}>Договор не зарегистрирован в ЕСУТД</div>}
                    {r.kind === "extra" && <div style={{ fontSize: 12, color: "var(--tx2)" }}>В ЕСУТД договор действует, в портале его нет: {r.s.position}</div>}
                  </div>
                  {r.kind === "ok" && <Pill tone="ok">✓ Совпадает</Pill>}
                  {r.kind === "diff" && <div style={{ display: "flex", gap: 6 }}><button className="btn bp bsm" onClick={() => pushFix(r)}>Отправить данные портала</button><button className="btn bo bsm" onClick={() => acceptEsutd(r)}>Принять из ЕСУТД</button></div>}
                  {r.kind === "missing" && <button className="btn bp bsm" onClick={() => { setTab("contracts"); setOpen(r.c.id); }}>Открыть договор</button>}
                  {r.kind === "extra" && <button className="btn bo bsm" onClick={() => importExtra(r)}>Загрузить в портал</button>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "log" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="lg-row ord-head"><span>Время</span><span>Сервис</span><span>Операция</span><span>Объект</span><span>Результат</span><span></span></div>
          {enbek.log.length === 0 && <div className="emp">Обменов пока не было</div>}
          {enbek.log.map(l => (
            <div key={l.id} className="lg-row">
              <span style={{ color: "var(--tx2)" }}>{ruDT(l.at)}</span><span style={{ fontWeight: 600 }}>{l.service}</span><span>{l.op}</span>
              <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.object}</span>
              <span><Pill tone={l.ok ? "ok" : "err"}>{l.ok ? "OK" : l.code}</Pill> <span style={{ fontSize: 11.5, color: "var(--tx2)" }}>{l.message}</span></span>
              <span><button className="btn bo bsm" onClick={() => setXml(l)}>XML</button></span>
            </div>
          ))}
        </div>
      )}

      {tab === "conn" && (
        <div>
          <div className="card">
            <div className="ct">Сервисы SmartBridge</div>
            {ENBEK_SERVICES.map(s => (
              <div key={s.code} className="ir" style={{ gap: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 220 }}><div style={{ fontSize: 13, fontWeight: 700, color: "var(--tx)" }}>{s.code}</div><div style={{ fontSize: 12, color: "var(--tx2)" }}>{s.name} · {s.sys} · {s.contour}</div></div>
                <span style={{ fontSize: 11.5, color: "var(--tx2)" }}>последний вызов: {(enbek.log.find(l => l.service === s.code) || {}).at ? ruDT(enbek.log.find(l => l.service === s.code).at) : "—"}</span>
                <Pill tone="info">● Подключено · эмуляция</Pill>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ct">Настройки обмена</div>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--tx)", marginBottom: 8 }}><input type="checkbox" checked={enbek.settings.autoSend} onChange={e => setEnbek(x => ({ ...x, settings: { ...x.settings, autoSend: e.target.checked } }))} /> Отправлять в ЕСУТД сразу после сохранения договора / допсоглашения / расторжения</label>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--tx)", marginBottom: 10 }}><input type="checkbox" checked={enbek.settings.autoOrder} onChange={e => setEnbek(x => ({ ...x, settings: { ...x.settings, autoOrder: e.target.checked } }))} /> Создавать приказ Л/С автоматически</label>
            <Field label="БИН работодателя" style={{ maxWidth: 260 }}><input className="inp" inputMode="numeric" maxLength={12} value={enbek.settings.bin} onChange={e => setEnbek(x => ({ ...x, settings: { ...x.settings, bin: e.target.value.replace(/\D/g, "") } }))} /></Field>
          </div>
          <div className="card">
            <div className="ct">Переход на реальное подключение</div>
            {["Сервер портала в РК (промышленная эксплуатация)", "Акт испытаний на соответствие требованиям ИБ", "Транспортный сертификат НУЦ РК для ИС", "Заявки «Подключение вне ЕТС» на SmartBridge по трём сервисам", "Договор с оператором и совместное тестирование", "ЭЦП компании через NCALayer для подписи сведений"].map((t, i) => <div key={i} className="ir"><span style={{ fontSize: 13, color: "var(--tx)" }}>{i + 1}. {t}</span><Pill>ожидает</Pill></div>)}
          </div>
        </div>
      )}

      {cur && (() => { const p = personOf(people, cur.empId); const now = applyAmend(cur); const st = contractState(cur); return (
        <Modal title={`${cur.number} · ${p.name}`} onClose={() => setOpen(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)", gap: 16 }} className="ord-grid">
            <div>
              {[["ИИН", cur.iin || "—"], ["Дата договора", ruDate(cur.date)], ["Начало работы", ruDate(cur.start)], ["Срок", cur.kind === "fixed" ? `срочный до ${ruDate(cur.end)}` : "бессрочный"], ["Должность", now.position], ["Отдел", now.dept], ["Оклад", `${Number(now.salary || 0).toLocaleString("ru-RU")} ₸`], ["Место работы", cur.workplace], ["Режим", cur.mode]].map(([k, v]) => <div key={k} className="ir"><span style={{ fontSize: 12.5, color: "var(--tx2)" }}>{k}</span><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx)", textAlign: "right" }}>{v}</span></div>)}
              {!st.terminated && <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}><button className="btn bo" onClick={() => setEvForm({ c: cur, type: "amendment" })}>+ Допсоглашение</button><button className="btn bd" onClick={() => setEvForm({ c: cur, type: "termination" })}>Расторгнуть</button></div>}
            </div>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", marginBottom: 8 }}>События в ЕСУТД</div>
              {[...cur.events].reverse().map(e => (
                <div key={e.id} style={{ padding: 10, borderRadius: 10, background: "var(--sf2)", border: "1px solid var(--bd)", marginBottom: 8, color: "var(--tx)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <b style={{ fontSize: 13 }}>{EV_TYPES[e.type].label} · {ruDate(e.date)}</b>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Pill tone={EV_STATUS[e.status].t}>{EV_STATUS[e.status].l}</Pill><DueTag ev={e} /></div>
                  </div>
                  {e.changes && <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 4 }}>{[e.changes.position, e.changes.dept, e.changes.salary ? Number(e.changes.salary).toLocaleString("ru-RU") + " ₸" : ""].filter(Boolean).join(" · ")}</div>}
                  {e.basis && <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 4 }}>{e.basis}</div>}
                  {e.esutdId && <div style={{ fontSize: 12, color: "var(--ok)", marginTop: 4 }}>Рег. № {e.esutdId}</div>}
                  {e.error && <div style={{ fontSize: 12, color: "var(--er)", marginTop: 4 }}>{e.error}</div>}
                  {(e.status === "error" || e.status === "queued") && <button className="btn bp bsm" style={{ marginTop: 8 }} onClick={async () => { const r = await sendContractEvent(enbek.contracts.find(k => k.id === cur.id), e.id); flash(r && r.ok ? `Зарегистрировано в ЕСУТД · ${r.id}` : `ЕСУТД вернула ошибку: ${r ? r.message : ""}`); }}>Отправить {e.status === "error" ? "повторно" : ""}</button>}
                </div>
              ))}
              {st.last.status === "error" && st.last.error && st.last.error.includes("ИИН") && (
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
                  <Field label="Исправить ИИН" style={{ flex: 1 }}><input className="inp" inputMode="numeric" maxLength={12} defaultValue={cur.iin} id="fixiin" /></Field>
                  <button className="btn bo" onClick={() => { const v = document.getElementById("fixiin").value.replace(/\D/g, ""); setEnbek(x => ({ ...x, contracts: x.contracts.map(k => k.id === cur.id ? { ...k, iin: v } : k) })); }}>Сохранить</button>
                </div>
              )}
            </div>
          </div>
        </Modal>); })()}
      {form && <ContractForm title="Новый трудовой договор" init={form} employees={employees} onClose={() => setForm(null)} onSave={saveContract} />}
      {evForm && <EventForm contract={evForm.c} type={evForm.type} onClose={() => setEvForm(null)} onSave={f => saveEvent(evForm.c, evForm.type, f)} />}
      {xml && <Modal title={`${xml.service} · ${xml.op}`} onClose={() => setXml(null)} wide><div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 8 }}>{ruDT(xml.at)} · {xml.reqId} · {xml.ok ? "OK" : xml.code} — {xml.message}</div><pre style={{ fontSize: 11.5, background: "var(--sf2)", color: "var(--tx)", border: "1px solid var(--bd)", borderRadius: 10, padding: 12, overflow: "auto", maxHeight: 420, whiteSpace: "pre" }}>{xml.xml}</pre></Modal>}
    </div>
  );
}

/* ═════════════════════ ВАКАНСИИ ═════════════════════ */
function VacancyForm({ init, onSave, onClose, submitLabel }) {
  const [f, setF] = useState(init);
  const set = (k, v) => setF(x => ({ ...x, [k]: v }));
  const tl = l => set("languages", f.languages.includes(l) ? f.languages.filter(x => x !== l) : [...f.languages, l]);
  const ok = f.positionName.trim() && f.duties.trim().length >= 20 && +f.count >= 1;
  return (
    <Modal title={init.id ? "Заявка на вакансию" : "Новая заявка на вакансию"} onClose={onClose} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="g3">
          <Field label="Наименование должности *"><input className="inp" value={f.positionName} onChange={e => set("positionName", e.target.value)} /></Field>
          <Field label="Уточнение должности"><input className="inp" value={f.spec} onChange={e => set("spec", e.target.value)} /></Field>
          <Field label="Профессиональная область"><select className="inp" value={f.profArea} onChange={e => set("profArea", e.target.value)}>{PROF_AREAS.map(x => <option key={x}>{x}</option>)}</select></Field>
        </div>
        <div className="g3">
          <Field label="Отдел"><select className="inp" value={f.dept} onChange={e => set("dept", e.target.value)}>{DEPTS.map(x => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Кол-во мест *"><input className="inp" type="number" min={1} value={f.count} onChange={e => set("count", +e.target.value)} /></Field>
          <Field label="Срок публикации, дней"><input className="inp" type="number" value={f.pubDays} onChange={e => set("pubDays", +e.target.value)} /></Field>
        </div>
        <div className="g3">
          <Field label="Город / район *"><input className="inp" value={f.region} onChange={e => set("region", e.target.value)} /></Field>
          <Field label="Населённый пункт"><input className="inp" value={f.locality} onChange={e => set("locality", e.target.value)} /></Field>
          <Field label="Адрес"><input className="inp" value={f.address} onChange={e => set("address", e.target.value)} /></Field>
        </div>
        <div className="g3">
          <Field label="Зарплата от, ₸"><input className="inp" type="number" value={f.salaryFrom} onChange={e => set("salaryFrom", +e.target.value)} /></Field>
          <Field label="Зарплата до, ₸"><input className="inp" type="number" value={f.salaryTo} onChange={e => set("salaryTo", +e.target.value)} /></Field>
          <Field label="График"><select className="inp" value={f.schedule} onChange={e => set("schedule", e.target.value)}>{SCHEDULES.map(x => <option key={x}>{x}</option>)}</select></Field>
        </div>
        <div className="g3">
          <Field label="Занятость"><select className="inp" value={f.employment} onChange={e => set("employment", e.target.value)}>{EMPLOYMENT.map(x => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Опыт"><select className="inp" value={f.experience} onChange={e => set("experience", e.target.value)}>{EXP_LEVELS.map(x => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Образование"><select className="inp" value={f.education} onChange={e => set("education", e.target.value)}>{EDU_LEVELS.map(x => <option key={x}>{x}</option>)}</select></Field>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", marginBottom: 6 }}>Владение языками</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{LANGS.map(l => <button key={l} type="button" className={`nf-btn ${f.languages.includes(l) ? "sel" : ""}`} onClick={() => tl(l)}>{f.languages.includes(l) ? "✓ " : ""}{l}</button>)}</div>
        </div>
        <Field label="Должностные обязанности * (не менее 20 символов)"><textarea className="ta" style={{ textTransform: "none" }} value={f.duties} onChange={e => set("duties", e.target.value)} /></Field>
        <Field label="Личные качества"><input className="inp" value={f.qualities} onChange={e => set("qualities", e.target.value)} /></Field>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}><button className="btn bo" onClick={onClose}>Отмена</button><button className="btn bp" disabled={!ok} onClick={() => onSave(f)}>{submitLabel}</button></div>
      </div>
    </Modal>
  );
}

function VacanciesModule({ user, employees, setEmployees, enbek, setEnbek, setOrders }) {
  const people = allPeople(employees);
  const staff = isStaffRole(user.role); const dir = user.role === "director";
  const [filter, setFilter] = useState(dir ? "approval" : "all");
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState(null);
  const [hire, setHire] = useState(null);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState("");
  const { sendVacancy, sendContractEvent } = useEnbekSender(setEnbek);
  const flash = m => { setToast(m); setTimeout(() => setToast(""), 4000); };
  const hist = (v, t) => [...(v.history || []), { at: new Date().toISOString(), by: user.id, t }];
  const upd = (id, patch) => setEnbek(x => ({ ...x, vacancies: x.vacancies.map(v => v.id === id ? (typeof patch === "function" ? patch(v) : { ...v, ...patch }) : v) }));
  const all = enbek.vacancies.filter(v => staff || dir || v.authorId === user.id);
  const list = all.filter(v => filter === "all" || v.status === filter).sort((a, b) => (b.history?.slice(-1)[0]?.at || "").localeCompare(a.history?.slice(-1)[0]?.at || ""));
  const blank = { positionName: "", spec: "", profArea: PROF_AREAS[0], dept: user.dept && DEPTS.includes(user.dept) ? user.dept : DEPTS[1], count: 1, pubDays: 30, region: COMPANY.city, locality: "Алматы", address: "", salaryFrom: 0, salaryTo: 0, schedule: SCHEDULES[0], employment: EMPLOYMENT[0], experience: EXP_LEVELS[0], education: EDU_LEVELS[0], languages: ["Казахский", "Русский"], duties: "", qualities: "" };
  const saveNew = f => {
    const status = staff ? "approval" : "review";
    const v = { ...f, id: uid(), authorId: user.id, status, history: [{ at: new Date().toISOString(), by: user.id, t: staff ? "Создано HR, отправлено директору" : "Заявка создана и отправлена в HR" }] };
    setEnbek(x => ({ ...x, vacancies: [v, ...x.vacancies] })); setForm(null); flash(staff ? "Вакансия отправлена директору на согласование" : "Заявка отправлена в HR");
  };
  const approve = async v => {
    const nv = { ...v, status: "publishing", approvedAt: new Date().toISOString(), history: hist(v, "Согласовано директором") };
    upd(v.id, nv); setOpen(null);
    const r = await sendVacancy(nv);
    flash(r.ok ? `Вакансия опубликована на Enbek · ${r.id}` : `Enbek вернул ошибку: ${r.message}`);
  };
  const cur = open && enbek.vacancies.find(v => v.id === open);
  const due = v => v.approvedAt ? addWorkDays(v.approvedAt, 5) : null;
  const counts = s => all.filter(v => v.status === s).length;
  const hireSave = async f => {
    let empId = f.empId;
    if (f.empMode === "new") { empId = uid(); setEmployees(es => [...es, { id: empId, role: "employee", name: f.newName.trim(), pos: f.position, dept: f.dept, phone: f.newPhone, joinDate: f.start, adaptTasks: [], adaptDone: false }]); }
    const ev = { id: uid(), type: "conclusion", date: f.date, status: "queued" };
    const c = { id: uid(), empId, iin: f.iin, number: f.number, date: f.date, start: f.start, kind: f.kind, end: f.end, position: f.position, dept: f.dept, workplace: f.workplace, salary: f.salary, mode: f.mode, events: [ev], vacancyId: hire.id };
    const name = f.empMode === "new" ? f.newName : personOf(people, empId).name;
    setEnbek(x => ({ ...x, contracts: [c, ...x.contracts], vacancies: x.vacancies.map(v => v.id === hire.id ? { ...v, hired: (v.hired || 0) + 1, history: [...(v.history || []), { at: new Date().toISOString(), by: user.id, t: `Принят(а) ${name} · договор ${f.number}` }] } : v) }));
    if (f.makeOrder) setOrders(os => [{ id: uid(), type: "LS", num: nextNum(os, "LS", new Date().getFullYear()), year: new Date().getFullYear(), date: todayISO(), title: `О приёме на работу (${shortName(name)})`, body: `1. Принять ${name} на должность «${f.position}» в подразделение «${f.dept}» с ${ruDate(f.start)}.\n2. Установить должностной оклад ${Number(f.salary || 0).toLocaleString("ru-RU")} ₸.\n3. Основание: трудовой договор № ${f.number} от ${ruDate(f.date)}.`, recipients: [empId], deadlineDays: 3, attachments: [], status: "sign", acks: {}, createdBy: user.id, signedBy: null, signedAt: null, returnComment: "" }, ...os]);
    const hv = hire; setHire(null);
    const r = await sendContractEvent(c, ev.id);
    flash(r && r.ok ? `Договор ${f.number} зарегистрирован в ЕСУТД · ${r.id}` : `ЕСУТД вернула ошибку: ${r ? r.message : ""}`);
    if ((hv.hired || 0) + 1 >= hv.count) { const rr = await sendVacancy(hv, "closeVacancy"); if (rr.ok) flash(`Все места заняты — вакансия снята с Enbek`); }
  };
  return (
    <div>
      <div style={{ marginBottom: 12, padding: "9px 14px", borderRadius: 10, background: "var(--inbg)", color: "var(--in)", fontSize: 12.5, fontWeight: 600 }}>🔗 Публикация на Электронной бирже труда через MINTRUD-S-6167 · тестовый режим (эмуляция). Срок размещения — 5 рабочих дней с появления вакансии.</div>
      {toast && <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: toast.includes("ошибк") ? "var(--erbg)" : "var(--okbg)", color: toast.includes("ошибк") ? "var(--er)" : "var(--ok)", fontSize: 13, fontWeight: 600 }}>{toast}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["all", "Все", all.length], ["review", "У HR", counts("review")], ["approval", "На согласовании", counts("approval")], ["published", "На Enbek", counts("published")], ["error", "Ошибки", counts("error")], ["closed", "Закрытые", counts("closed")]].map(([k, l, n]) => <button key={k} className={`nf-btn ${filter === k ? "sel" : ""}`} onClick={() => setFilter(k)}>{l} · {n}</button>)}
        </div>
        {!dir && <button className="btn bp" onClick={() => setForm(blank)}>+ {staff ? "Новая вакансия" : "Заявка на вакансию"}</button>}
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="vac-row ord-head"><span>Должность</span><span>Отдел</span><span>Мест</span><span>Статус</span><span>Enbek</span><span>Срок</span></div>
        {list.length === 0 && <div className="emp">Вакансий нет</div>}
        {list.map(v => { const d = due(v); const late = d && !["published", "closed"].includes(v.status) && new Date() > new Date(d); return (
          <div key={v.id} className="vac-row" onClick={() => setOpen(v.id)}>
            <span><div style={{ fontWeight: 600 }}>{v.positionName}</div><div style={{ fontSize: 11.5, color: "var(--tx2)" }}>{v.spec || v.profArea} · от {shortName(personOf(people, v.authorId).name)}</div></span>
            <span style={{ color: "var(--tx2)" }}>{v.dept}</span><span>{v.hired ? `${v.hired}/` : ""}{v.count}</span>
            <span><Pill tone={VAC_STATUS[v.status].t}>{VAC_STATUS[v.status].l}</Pill></span>
            <span style={{ fontSize: 12.5 }}>{v.enbekId || "—"}</span>
            <span style={{ fontSize: 12.5, color: late ? "var(--er)" : "var(--tx2)" }}>{v.status === "published" ? `с ${ruDate(v.publishedAt)}` : d ? `до ${ruDate(d)}${late ? " · просрочено" : ""}` : "—"}</span>
          </div>); })}
      </div>
      {cur && (
        <Modal title={cur.positionName} onClose={() => setOpen(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: 16 }} className="ord-grid">
            <div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}><Pill tone={VAC_STATUS[cur.status].t}>{VAC_STATUS[cur.status].l}</Pill>{cur.enbekId && <Pill tone="ok">{cur.enbekId}</Pill>}<Pill>{cur.dept}</Pill></div>
              {[["Уточнение", cur.spec], ["Проф. область", cur.profArea], ["Мест", cur.count], ["Город / район", cur.region], ["Населённый пункт", cur.locality], ["Адрес", cur.address], ["Зарплата", cur.salaryFrom || cur.salaryTo ? `${Number(cur.salaryFrom || 0).toLocaleString("ru-RU")} – ${Number(cur.salaryTo || 0).toLocaleString("ru-RU")} ₸` : "—"], ["График / занятость", `${cur.schedule} · ${cur.employment}`], ["Опыт / образование", `${cur.experience} · ${cur.education}`], ["Языки", (cur.languages || []).join(", ")], ["Личные качества", cur.qualities], ["Публикация", `${cur.pubDays} дней`]].map(([k, v]) => <div key={k} className="ir"><span style={{ fontSize: 12.5, color: "var(--tx2)" }}>{k}</span><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx)", textAlign: "right", marginLeft: 10 }}>{v || "—"}</span></div>)}
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase", margin: "10px 0 4px" }}>Обязанности</div>
              <div style={{ fontSize: 13, color: "var(--tx)", lineHeight: 1.5 }}>{cur.duties}</div>
              {cur.error && <div style={{ marginTop: 10, fontSize: 12.5, padding: 10, borderRadius: 9, background: "var(--erbg)", color: "var(--er)" }}>Enbek: {cur.error}</div>}
              {cur.comment && cur.status === "returned" && <div style={{ marginTop: 10, fontSize: 12.5, padding: 10, borderRadius: 9, background: "var(--erbg)", color: "var(--er)" }}>Замечание: {cur.comment}</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx2)", textTransform: "uppercase" }}>История</div>
              {(cur.history || []).map((h, i) => <div key={i} style={{ fontSize: 12, color: "var(--tx)", padding: "6px 8px", borderRadius: 8, background: "var(--sf2)" }}><span style={{ color: "var(--tx2)" }}>{ruDT(h.at)} · {h.by === "enbek" ? "Enbek" : shortName(personOf(people, h.by).name)}</span><br />{h.t}</div>)}
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: "auto" }}>
                {staff && ["review", "returned", "error", "draft"].includes(cur.status) && <button className="btn bo" onClick={() => { setForm(cur); setOpen(null); }}>✏️ Редактировать</button>}
                {staff && ["review", "returned"].includes(cur.status) && <button className="btn bp" onClick={() => { upd(cur.id, v => ({ ...v, status: "approval", history: hist(v, "Проверено HR, отправлено директору") })); setOpen(null); }}>Отправить директору на согласование</button>}
                {staff && cur.status === "error" && <button className="btn bp" onClick={async () => { setOpen(null); const r = await sendVacancy(cur); flash(r.ok ? `Вакансия опубликована на Enbek · ${r.id}` : `Enbek вернул ошибку: ${r.message}`); }}>Отправить на Enbek повторно</button>}
                {dir && cur.status === "approval" && <>
                  <button className="btn bp" style={{ height: 44 }} onClick={() => approve(cur)}>Согласовать и опубликовать на Enbek</button>
                  <textarea className="ta" placeholder="Замечание (при возврате)" value={comment} onChange={e => setComment(e.target.value)} style={{ minHeight: 60 }} />
                  <button className="btn bd" disabled={!comment.trim()} onClick={() => { upd(cur.id, v => ({ ...v, status: "returned", comment, history: hist(v, "Возвращено: " + comment) })); setComment(""); setOpen(null); }}>Вернуть на доработку</button>
                </>}
                {staff && cur.status === "published" && <>
                  <button className="btn bp" onClick={() => { setHire(cur); setOpen(null); }}>Принять кандидата → трудовой договор</button>
                  <button className="btn bo" onClick={async () => { setOpen(null); const r = await sendVacancy(cur, "closeVacancy"); flash(r.ok ? "Вакансия снята с публикации на Enbek" : `Enbek вернул ошибку: ${r.message}`); }}>Снять с публикации</button>
                </>}
              </div>
            </div>
          </div>
        </Modal>
      )}
      {form && <VacancyForm init={form} onClose={() => setForm(null)} submitLabel={form.id ? "Сохранить" : staff ? "Отправить директору" : "Отправить в HR"} onSave={f => { if (f.id) { upd(f.id, v => ({ ...f, status: v.status === "error" ? "error" : v.status, history: hist(v, "Изменено HR") })); setForm(null); } else saveNew(f); }} />}
      {hire && <ContractForm title={`Приём по вакансии: ${hire.positionName}`} employees={employees} onClose={() => setHire(null)} onSave={hireSave}
        init={{ empMode: "new", empId: "", newName: "", newPhone: "", iin: "", number: `ТД-${new Date().getFullYear()}/${pad2(enbek.contracts.length + 1)}`, date: todayISO(), start: todayISO(), kind: "indefinite", end: "", position: hire.positionName, dept: hire.dept, salary: hire.salaryFrom || 0, workplace: [hire.region, hire.address].filter(Boolean).join(", "), mode: hire.schedule, makeOrder: enbek.settings.autoOrder, vacancyId: hire.id }} />}
    </div>
  );
}

function Login({ onLogin, employees, lang, setLang }) {
  const t = I18N[lang];
  const [mode, setMode] = useState("demo");
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [pos, setPos] = useState("");
  const [dept, setDept] = useState("");
  const [errs, setErrs] = useState({});
  const allAcc = [...DEMO_ACCOUNTS, ...employees];
  const fmtPh = v => { const d = v.replace(/\D/g, ""); if (!d.length) return ""; let r = "+7"; if (d.length > 1) r += " (" + d.slice(1, 4); if (d.length > 4) r += ") " + d.slice(4, 7); if (d.length > 7) r += "-" + d.slice(7, 9); if (d.length > 9) r += "-" + d.slice(9, 11); return r; };
  const onPh = e => { setPhone(fmtPh(e.target.value.replace(/\D/g, "").slice(0, 11))); if (errs.phone) setErrs(x => ({ ...x, phone: "" })); };
  const valPh = () => { if (phone.replace(/\D/g, "").length < 11) { setErrs(x => ({ ...x, phone: "Введите корректный номер" })); return false; } return true; };
  const valProf = () => { const e = {}; if (!name.trim()) e.name = "Введите ФИО"; if (!pos.trim()) e.pos = "Введите должность"; if (!dept) e.dept = "Выберите отдел"; setErrs(e); return !Object.keys(e).length; };
  const submit = () => { if (valProf()) onLogin({ id: uid(), role: "employee", name: name.trim(), pos: pos.trim(), dept, phone, joinDate: new Date().toISOString().slice(0, 10), adaptTasks: [], adaptDone: false }, true); };
  const roleTone = { admin: "err", hr: "info", employee: "ok", director: "ac" };
  return (
    <div className="lw">
      <div className="lcard">
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, marginBottom: 6 }}>
          {[["kz", "ҚАЗ"], ["ru", "РУС"]].map(([k, l]) => <button key={k} onClick={() => setLang(k)} className={`nf-btn ${lang === k ? "sel" : ""}`} aria-pressed={lang === k}>{l}</button>)}
        </div>
        <div className="llogo">
          <img src={MKA_LOGO} alt="МКА Инжиниринг" style={{ width: 84, height: 84, borderRadius: "50%", background: "#fff", objectFit: "contain", boxShadow: "0 0 0 1px var(--bd)" }} />
          <h1 style={{ marginTop: 10 }}>МКА HR</h1>
          <p>{COMPANY.name} · {t.tagline}</p>
        </div>
        {mode === "demo" ? (
          <div>
            <div className="ltitle" style={{ marginBottom: 4 }}>{t.pick_acc}</div>
            <div className="lsub">{t.demo}</div>
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              {allAcc.map(a => (
                <button key={a.id} className="demo-btn" onClick={() => onLogin(a, false)}>
                  <div className="demo-ava" style={{ background: avatarGrad(a.name) }}>{getInitials(a.name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="demo-name">{a.name}</div>
                    <div className="demo-pos">{a.pos} · {a.dept}</div>
                  </div>
                  <Pill tone={roleTone[a.role]}>{t["role_" + a.role]}</Pill>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12 }}><button className="btn bo" style={{ width: "100%" }} onClick={() => setMode("new")}>{t.register}</button></div>
          </div>
        ) : (
          <div>
            <div className="dots">{[0, 1].map(i => <div key={i} className={`dot ${step === i ? "act" : ""}`} />)}</div>
            {step === 0 ? (
              <div>
                <div className="lstep">Шаг 1 из 2</div>
                <div className="ltitle">Вход в систему</div>
                <div className="lsub">Введите ваш рабочий номер телефона</div>
                <div className="lg">
                  <label className="ll">Номер телефона</label>
                  <input className={`linput ${errs.phone ? "err" : ""}`} type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={onPh} onKeyDown={e => e.key === "Enter" && valPh() && setStep(1)} />
                  {errs.phone && <div className="lerr">⚠ {errs.phone}</div>}
                </div>
                <button className="lbtn" onClick={() => valPh() && setStep(1)} disabled={!phone}>Продолжить →</button>
                <button className="btn bo" style={{ width: "100%", marginTop: 9 }} onClick={() => setMode("demo")}>← К выбору аккаунта</button>
              </div>
            ) : (
              <div>
                <div className="lstep">Шаг 2 из 2</div>
                <div className="ltitle">Ваш профиль</div>
                <div className="lsub">Заполните информацию о себе</div>
                {[{ k: "name", ph: "Иванов Иван Иванович", lb: "ФИО", val: name, set: setName }, { k: "pos", ph: "Должность", lb: "Должность", val: pos, set: setPos }].map(f => (
                  <div className="lg" key={f.k}>
                    <label className="ll">{f.lb}</label>
                    <input className={`linput ${errs[f.k] ? "err" : ""}`} placeholder={f.ph} value={f.val} onChange={e => { f.set(e.target.value); if (errs[f.k]) setErrs(x => ({ ...x, [f.k]: "" })); }} onKeyDown={e => e.key === "Enter" && submit()} />
                    {errs[f.k] && <div className="lerr">⚠ {errs[f.k]}</div>}
                  </div>
                ))}
                <div className="lg">
                  <label className="ll">Отдел</label>
                  <select className={`linput ${errs.dept ? "err" : ""}`} value={dept} onChange={e => { setDept(e.target.value); if (errs.dept) setErrs(x => ({ ...x, dept: "" })); }}>
                    <option value="" disabled>Выберите отдел</option>
                    {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errs.dept && <div className="lerr">⚠ {errs.dept}</div>}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 7 }}>
                  <button className="btn bo" style={{ flex: 1, padding: 11 }} onClick={() => setStep(0)}>← Назад</button>
                  <button className="lbtn" style={{ flex: 2, marginTop: 0 }} onClick={submit} disabled={!name || !pos || !dept}>Войти →</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DirectorHome({ user, go, orders, employees, policies, news }) {
  const firstName = user.name.split(" ")[1] || user.name;
  const y = new Date().getFullYear();
  const waiting = orders.filter(o => o.status === "sign");
  const ackOpen = orders.filter(o => orderStatus(o) === "ack");
  const overdue = orders.reduce((s, o) => s + overdueCount(o), 0);
  return (
    <div>
      <div className="wb" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: avatarGrad(user.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", position: "relative", zIndex: 1 }}>{getInitials(user.name)}</div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 17, fontWeight: 800, color: "#fff" }}>Добрый день, {firstName}!</div>
          <div style={{ fontSize: 12, color: "#E5E7EB", marginTop: 2 }}>{user.pos} · {COMPANY.name}</div>
        </div>
      </div>
      <div className="g3" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 14 }}>
        {[[waiting.length, "Ждут подписи", "var(--wn)", "orders_sign"], [orders.filter(o => o.num && o.year === y).length, `Приказов за ${y}`, "var(--tx)", "orders"], [ackOpen.length, "На ознакомлении", "var(--in)", "orders"], [overdue, "Просрочено ознакомлений", "var(--er)", "orders"]].map(([v, l, c, m]) => (
          <div key={l} className="sc" onClick={() => go(m)}><div className="sv" style={{ color: c }}>{v}</div><div className="sl">{l}</div></div>
        ))}
      </div>
      <div className="g2">
        <div className="card">
          <div className="ct" style={{ justifyContent: "space-between" }}>На подпись {waiting.length > 0 && <button className="btn bp bsm" onClick={() => go("orders_sign")}>Открыть</button>}</div>
          {waiting.length === 0 && <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Всё подписано</div>}
          {waiting.map(o => <div key={o.id} className="ir" style={{ cursor: "pointer" }} onClick={() => go("orders_sign")}><span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ac2)", marginRight: 8 }}>{orderNo(o)}</span><span style={{ fontSize: 12.5, color: "var(--tx)", flex: 1 }}>{o.title}</span></div>)}
        </div>
        <div className="card">
          <div className="ct">Журналы приказов · {y}</div>
          {ORDER_TYPES.map(t => <div key={t.id} className="ir"><span style={{ fontSize: 12.5, color: "var(--tx)" }}>{t.code} · {t.name}</span><b style={{ color: "var(--tx)" }}>{orders.filter(o => o.type === t.id && o.num && o.year === y).length}</b></div>)}
        </div>
      </div>
      <div className="card">
        <div className="ct">Последние новости</div>
        {news.slice(0, 3).map(n => <div key={n.id} className="ir" style={{ cursor: "pointer" }} onClick={() => go("news")}><span style={{ fontSize: 12.5, color: "var(--tx)" }}>{n.title}</span><span style={{ fontSize: 11.5, color: "var(--tx2)" }}>{ruDate(n.date)}</span></div>)}
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setThemeRaw] = useState(() => loadLS("mka_theme", null) || loadLS("mka_theme_default", "a"));
  const setTheme = th => { setThemeRaw(th); try { localStorage.setItem("mka_theme", JSON.stringify(th)); } catch (e) {} };
  const [defTheme, setDefTheme] = useStored("mka_theme_default", "a");
  const [lang, setLang] = useStored("mka_lang", "ru");
  const t = I18N[lang] || I18N.ru;
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useStored("mka_employees", INIT_EMPLOYEES);
  const [news, setNews] = useStored("mka_news", INIT_NEWS);
  const [tickets, setTickets] = useStored("mka_tickets", INIT_TICKETS);
  const [orders, setOrders] = useStored("mka_orders", INIT_ORDERS);
  const [td, setTd] = useStored("mka_time", INIT_TIME);
  const [policies, setPolicies] = useStored("mka_policies", INIT_POLICIES);
  const [enbek, setEnbek] = useStored("mka_enbek", INIT_ENBEK);
  const [mod, setMod] = useState("home");
  const [open, setOpen] = useState(true);
  const [mob, setMob] = useState(false);
  const isMob = () => typeof window !== "undefined" && window.innerWidth <= 900;
  const toggle = () => isMob() ? setMob(o => !o) : setOpen(o => !o);
  const nav = id => { setMod(id); setMob(false); };
  const login = (acc, isNew) => { setUser(acc); if (isNew) setEmployees(es => [...es, acc]); };
  const cycleTheme = () => setTheme(theme === "a" ? "b" : theme === "b" ? "c" : "a");

  if (!user) return (<><style>{getCSS(theme)}</style><Login onLogin={login} employees={employees} lang={lang} setLang={setLang} /></>);

  const initials = getInitials(user.name);
  const pinned = news.filter(n => n.pinned).length;
  const empNoAdapt = employees.filter(e => !e.adaptTasks.length).length;
  const myOrders = orders.filter(o => o.signedAt && o.recipients.includes(user.id) && !o.acks[user.id]).length;
  const myPolicies = policies.filter(p => !p.acks[user.id]).length;
  const toSign = orders.filter(o => o.status === "sign").length;
  const newReq = td.requests.filter(r => r.status === "new").length;
  const enbekAlerts = enbek.contracts.flatMap(c => c.events).filter(e => e.status === "error" || (e.status !== "registered" && daysLeft(evDue(e)) < 0)).length;
  const vacReview = enbek.vacancies.filter(v => v.status === "review" || v.status === "error").length;
  const vacApproval = enbek.vacancies.filter(v => v.status === "approval").length;

  const empNav = [
    { id: "home", icon: "🏠" }, { id: "news", icon: "📰", badge: pinned }, { id: "adaptation", icon: "🌱" }, { id: "annual", icon: "📊" },
    { id: "development", icon: "🎯" }, { id: "learning", icon: "📚" }, { id: "orders", icon: "📜", badge: myOrders }, { id: "time", icon: "⏱️" },
    { id: "policies", icon: "📘", badge: myPolicies }, { id: "vacancies", icon: "💼" },
    { id: "tickets", icon: "📨", badge: tickets.filter(x => x.authorId === user.id && x.status === "in_progress").length || 0 },
    { id: "surveys", icon: "📝" }, { id: "profile", icon: "👤" },
  ];
  const hrNav = [
    { id: "home", icon: "🏠" }, { id: "news", icon: "📰", badge: pinned }, { id: "hr", icon: "👥", badge: empNoAdapt },
    { id: "orders", icon: "📜", badge: orders.filter(o => o.status === "returned").length }, { id: "vacancies", icon: "💼", badge: vacReview }, { id: "enbek", icon: "🔗", badge: enbekAlerts },
    { id: "time", icon: "⏱️", badge: newReq }, { id: "policies", icon: "📘" },
    { id: "reports", icon: "📈" }, { id: "tickets", icon: "📨", badge: tickets.filter(x => x.status === "new" && x.messages.length === 0).length || 0 },
    { id: "surveys", icon: "📝" }, { id: "profile", icon: "👤" },
  ];
  const adminNav = [
    { id: "home", icon: "🏠" }, { id: "news", icon: "📰" }, { id: "admin", icon: "⚙️" }, { id: "hr", icon: "👥", label: t.hrmod },
    { id: "orders", icon: "📜" }, { id: "vacancies", icon: "💼", badge: vacReview }, { id: "enbek", icon: "🔗", badge: enbekAlerts }, { id: "time", icon: "⏱️", badge: newReq }, { id: "policies", icon: "📘" }, { id: "reports", icon: "📈" },
    { id: "tickets", icon: "📨", badge: tickets.filter(x => x.status === "new" && x.messages.length === 0).length || 0 },
    { id: "surveys", icon: "📝" }, { id: "profile", icon: "👤" },
  ];
  const dirNav = [
    { id: "home", icon: "🏠" }, { id: "orders_sign", icon: "✍️", label: t.sign, badge: toSign }, { id: "orders", icon: "📜", label: t.journal }, { id: "vacancies", icon: "💼", badge: vacApproval },
    { id: "policies", icon: "📘" }, { id: "reports", icon: "📈" }, { id: "news", icon: "📰" }, { id: "profile", icon: "👤" },
  ];
  const navItems = user.role === "admin" ? adminNav : user.role === "hr" ? hrNav : user.role === "director" ? dirNav : empNav;
  const staff = isStaffRole(user.role);
  const sub = {
    home: user.role === "admin" ? t.s_home_admin : user.role === "hr" ? t.s_home_hr : user.role === "director" ? t.s_home_dir : t.s_home_emp,
    news: t.s_news, adaptation: t.s_adaptation, annual: t.s_annual, development: t.s_development, learning: t.s_learning, profile: t.s_profile,
    tickets: staff ? t.s_tickets_hr : t.s_tickets, surveys: t.s_surveys, reports: t.s_reports, hr: t.s_hr, admin: t.s_admin,
    orders: staff ? t.s_orders_hr : user.role === "director" ? t.s_orders_dir : t.s_orders, orders_sign: t.s_sign,
    vacancies: t.s_vacancies, enbek: t.s_enbek,
    time: staff ? t.s_time_hr : t.s_time, policies: staff || user.role === "director" ? t.s_policies_hr : t.s_policies,
  };
  const head = { orders_sign: t.sign, orders: user.role === "director" ? t.journal : t.orders, hr: user.role === "admin" ? t.hrmod : t.hr };
  const roleBg = { admin: "linear-gradient(135deg,#EF4444,#F97316)", hr: "linear-gradient(135deg,#6366F1,#8B5CF6)", employee: "linear-gradient(135deg,#10B981,#0EA5E9)", director: "linear-gradient(135deg,#C2410C,#F59E0B)" };
  const sbCls = `sidebar ${!open && !isMob() ? "coll" : ""} ${mob ? "mob-open" : ""}`;
  const mainCls = `main ${!open && !isMob() ? "coll" : ""}`;
  const shared = { user, employees, orders, setOrders };
  const LangSw = () => (
    <div style={{ display: "flex", gap: 3 }}>
      {[["kz", "ҚАЗ"], ["ru", "РУС"]].map(([k, l]) => <button key={k} onClick={() => setLang(k)} className={`langbtn ${lang === k ? "on" : ""}`} aria-pressed={lang === k}>{l}</button>)}
    </div>
  );

  return (
    <>
      <style>{getCSS(theme)}</style>
      <div className="app">
        <div className={`ov ${mob ? "show" : ""}`} onClick={() => setMob(false)} />
        <aside className={sbCls}>
          <div className="sbh">
            <div className="sbbrand">
              <img src={MKA_LOGO} alt="МКА Инжиниринг" style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", objectFit: "contain", flexShrink: 0 }} />
              <div className="sbtext"><h2>МКА HR</h2><span>{COMPANY.short}</span></div>
            </div>
            <button className="sbtog" onClick={toggle} aria-label="Свернуть меню">{open && !isMob() ? "◀" : "▶"}</button>
          </div>
          <nav className="sbnav">
            {navItems.map(item => (
              <div key={item.id} className={`ni ${mod === item.id ? "active" : ""}`} onClick={() => nav(item.id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && nav(item.id)}>
                <span className="ni-icon"><NavIcon k={item.id} /></span>
                <span className="ni-label">{item.label || t[item.id]}</span>
                {item.badge > 0 && <span className="nibadge">{item.badge}</span>}
              </div>
            ))}
          </nav>
          <div className="sbuser">
            <div className="ava" style={{ background: roleBg[user.role] }}>{initials}</div>
            <div className="uinfo" style={{ cursor: "pointer" }} onClick={() => nav("profile")}>
              <div className="uname">{user.name.split(" ").slice(0, 2).join(" ")}</div>
              <div className="urole">{t["role_" + user.role]}</div>
            </div>
            <button className="themebtn" onClick={cycleTheme} title={t.theme} aria-label={t.theme}><NavIcon k="theme" size={17} /></button>
            <button className="logoutbtn" onClick={() => { setUser(null); setMod("home"); }} title={t.logout} aria-label={t.logout}><NavIcon k="logout" size={17} /></button>
          </div>
        </aside>
        <main className={mainCls}>
          <div className="mobbar">
            <button className="hbg" onClick={() => setMob(o => !o)} aria-label="Меню">☰</button>
            <img src={MKA_LOGO} alt="МКА Инжиниринг" style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff" }} />
            <b style={{ fontFamily: "Manrope,sans-serif", color: "var(--tx)" }}>МКА HR</b>
            <div style={{ marginLeft: "auto" }}><LangSw /></div>
          </div>
          <div className="ph" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div><h1>{head[mod] || t[mod]}</h1><p>{sub[mod]}</p></div>
            <div className="ph-lang"><LangSw /></div>
          </div>
          {mod === "home" && (user.role === "director" ? <DirectorHome user={user} go={nav} orders={orders} employees={employees} policies={policies} news={news} /> : <Dashboard user={user} go={nav} employees={employees} news={news} />)}
          {mod === "news" && <NewsModule user={user} news={news} setNews={setNews} />}
          {mod === "adaptation" && <AdaptModule user={user} employees={employees} setEmployees={setEmployees} />}
          {mod === "annual" && <AnnualModule />}
          {mod === "development" && <DevModule />}
          {mod === "learning" && <LearnModule user={user} />}
          {mod === "tickets" && <TicketsModule user={user} tickets={tickets} setTickets={setTickets} />}
          {mod === "surveys" && <SurveysModule user={user} />}
          {mod === "orders" && <OrdersModule {...shared} view="journal" />}
          {mod === "orders_sign" && <OrdersModule {...shared} view="sign" />}
          {mod === "time" && <TimeModule user={user} td={td} setTd={setTd} employees={employees} />}
          {mod === "vacancies" && <VacanciesModule user={user} employees={employees} setEmployees={setEmployees} enbek={enbek} setEnbek={setEnbek} setOrders={setOrders} />}
          {mod === "enbek" && <EnbekModule user={user} employees={employees} setEmployees={setEmployees} enbek={enbek} setEnbek={setEnbek} orders={orders} setOrders={setOrders} />}
          {mod === "policies" && <PoliciesModule user={user} policies={policies} setPolicies={setPolicies} employees={employees} />}
          {mod === "profile" && (
            <div>
              <ThemePicker theme={theme} setTheme={setTheme} lang={lang} />
              <ProfileModule user={user} setUser={setUser} employees={employees} setEmployees={setEmployees} />
            </div>
          )}
          {mod === "hr" && <HRModule user={user} employees={employees} setEmployees={setEmployees} setNews={setNews} />}
          {mod === "admin" && (
            <div>
              <ThemePicker theme={defTheme} setTheme={setDefTheme} lang={lang} title="Оформление по умолчанию для новых пользователей" note="Каждый сотрудник может сменить оформление у себя в профиле." />
              <AdminModule employees={employees} setEmployees={setEmployees} news={news} setNews={setNews} />
            </div>
          )}
          {mod === "reports" && <ReportsModule user={user} employees={employees} />}
        </main>
      </div>
    </>
  );
}


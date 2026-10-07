(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const P=DATA.person;
document.documentElement.classList.add("js");

/* theme: follow the system unless the visitor picks one */
try{const t=localStorage.getItem("as-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}
$("#theme").addEventListener("click",()=>{
  const root=document.documentElement;
  const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme=dark?"light":"dark";
  try{localStorage.setItem("as-theme",root.dataset.theme)}catch(e){}
});

/* content */
$("#tagline").textContent="“"+P.tagline+"”";
$("#about1").textContent=P.about[0];
$("#about2").textContent=P.about[1];
$("#focus").innerHTML=P.focus.map(f=>`<span class="chip">${esc(f)}</span>`).join("");
$("#facts").innerHTML=[["Degree",P.degree],["University",P.school],["Years",P.years],["CGPA",P.cgpa],["Hackathons","Top 10 four times"]]
  .map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");

const arrow=`<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.6"/></svg>`;
$("#grid").innerHTML=DATA.projects.map((p,i)=>{
  const t=p.theme, wide=i===0;
  const site=p.links.find(l=>l.label!=="GitHub");
  return `<article class="proj rv${wide?" wide":""}" style="--cb:${t.bg};--cf:${t.fg};--c:${t.accent}">
    <div class="cover">
      <div class="top"><span class="num">${String(i+1).padStart(2,"0")}</span><span>${esc(p.context.split(" · ")[0])}</span></div>
      <div><h3>${esc(p.name)}<small>${esc(p.kicker)}</small></h3>${wide&&site?`<p style="margin-top:14px"><a class="site" href="${site.href}" target="_blank" rel="noopener">${esc(site.href.replace("https://",""))} ↗</a></p>`:""}</div>
    </div>
    <div class="pbody">
      <p class="blurb">${esc(p.blurb)}</p>
      <ul>${p.highlights.map(h=>`<li>${esc(h)}</li>`).join("")}</ul>
      <div class="pfoot">
        <div class="chips">${p.stack.slice(0,6).map(s=>`<span class="chip">${esc(s)}</span>`).join("")}</div>
        <span class="meta">${esc(p.context)} · ${esc(p.status)}</span>
        <div class="plinks">${p.links.map(l=>`<a class="btn sm${l.label==="GitHub"?"":" primary"}" href="${l.href}" target="_blank" rel="noopener">${esc(l.label)} ${arrow}</a>`).join("")}</div>
      </div>
    </div>
  </article>`}).join("");

$("#morelist").innerHTML=DATA.more.map(m=>m.href
  ?`<a class="mitem rv" href="${m.href}" target="_blank" rel="noopener"><span class="t">${esc(m.tag)}</span><h4>${esc(m.name)}</h4><p>${esc(m.d)}</p><span class="go">View on GitHub ↗</span></a>`
  :`<div class="mitem rv"><span class="t">${esc(m.tag)}</span><h4>${esc(m.name)}</h4><p>${esc(m.d)}</p></div>`).join("");
$("#skilllist").innerHTML=DATA.skills.map(g=>`<div><h4>${esc(g.group)}</h4><div class="chips">${g.items.map(i=>`<span class="chip">${esc(i)}</span>`).join("")}</div></div>`).join("");
$("#soft").innerHTML=DATA.soft.map(s=>`<span class="chip">${esc(s)}</span>`).join("");
$("#ach").innerHTML=DATA.achievements.map(a=>`<div><b>${esc(a.t)}</b><span>${esc(a.d)}</span></div>`).join("");
$("#certs").innerHTML=DATA.certifications.map(c=>`<div><b>${esc(c.t)}</b><em>${esc(c.y)}</em><span>${esc(c.by)}</span></div>`).join("");
$("#clubs").innerHTML=DATA.clubs.map(c=>`<div><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div>`).join("");
$("#courses").innerHTML=DATA.courses.map(c=>`<span class="chip">${esc(c)}</span>`).join("");
$("#mail").textContent=P.email;
$("#li").href=P.linkedin;$("#li").textContent=P.linkedinLabel;
$("#gh").href=P.github;$("#gh").textContent=P.githubLabel;
$("#copy").addEventListener("click",async e=>{
  const b=e.currentTarget;
  try{await navigator.clipboard.writeText(P.email);b.textContent="Copied"}
  catch(err){const r=document.createRange();r.selectNodeContents($("#mail"));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selected"}
  setTimeout(()=>b.textContent="Copy",1600);
});

/* load-in */
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add("ready")));

/* reveals, staggered within each row */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{rootMargin:"0px 0px -6% 0px"});
$$(".rv").forEach(el=>{const sib=[...el.parentElement.children].filter(c=>c.classList.contains("rv"));el.style.transitionDelay=Math.min(sib.indexOf(el)%3,2)*90+"ms";io.observe(el)});

/* nav state, progress bar and active section */
const nav=$("#nav"),bar=$("#progress"),secs=$$("main section[id]"),links=$$(".links a");
let tick=false;
const onScroll=()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${h>0?scrollY/h:0})`;
  nav.classList.toggle("scrolled",scrollY>8);
  let cur="";for(const s of secs){if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id}
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
  tick=false;
};
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();
})();

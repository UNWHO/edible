const Y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}};Y();function j(){}function V(e){return e()}function U(){return Object.create(null)}function M(e){e.forEach(V)}function Z(e){return typeof e=="function"}function ee(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function te(e){return Object.keys(e).length===0}function H(e){return e==null?"":e}function h(e,t){e.appendChild(t)}function w(e,t,n){e.insertBefore(t,n||null)}function k(e){e.parentNode.removeChild(e)}function ne(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function b(e){return document.createElement(e)}function I(e){return document.createTextNode(e)}function C(){return I(" ")}function x(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function $(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function le(e){return Array.from(e.childNodes)}function W(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function J(e,t){e.value=t==null?"":t}function K(e,t){for(let n=0;n<e.options.length;n+=1){const o=e.options[n];if(o.__value===t){o.selected=!0;return}}e.selectedIndex=-1}function oe(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let q;function O(e){q=e}const A=[],z=[],P=[],D=[],re=Promise.resolve();let R=!1;function ie(){R||(R=!0,re.then(X))}function T(e){P.push(e)}const F=new Set;let N=0;function X(){const e=q;do{for(;N<A.length;){const t=A[N];N++,O(t),se(t.$$)}for(O(null),A.length=0,N=0;z.length;)z.pop()();for(let t=0;t<P.length;t+=1){const n=P[t];F.has(n)||(F.add(n),n())}P.length=0}while(A.length);for(;D.length;)D.pop()();R=!1,F.clear(),O(e)}function se(e){if(e.fragment!==null){e.update(),M(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(T)}}const ue=new Set;function ce(e,t){e&&e.i&&(ue.delete(e),e.i(t))}function fe(e,t,n,o){const{fragment:l,on_mount:s,on_destroy:u,after_update:i}=e.$$;l&&l.m(t,n),o||T(()=>{const c=s.map(V).filter(Z);u?u.push(...c):M(c),e.$$.on_mount=[]}),i.forEach(T)}function ae(e,t){const n=e.$$;n.fragment!==null&&(M(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function de(e,t){e.$$.dirty[0]===-1&&(A.push(e),ie(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function _e(e,t,n,o,l,s,u,i=[-1]){const c=q;O(e);const f=e.$$={fragment:null,ctx:null,props:s,update:j,not_equal:l,bound:U(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:U(),dirty:i,skip_bound:!1,root:t.target||c.$$.root};u&&u(f.root);let _=!1;if(f.ctx=n?n(e,t.props||{},(d,a,...g)=>{const y=g.length?g[0]:a;return f.ctx&&l(f.ctx[d],f.ctx[d]=y)&&(!f.skip_bound&&f.bound[d]&&f.bound[d](y),_&&de(e,d)),a}):[],f.update(),_=!0,M(f.before_update),f.fragment=o?o(f.ctx):!1,t.target){if(t.hydrate){const d=le(t.target);f.fragment&&f.fragment.l(d),d.forEach(k)}else f.fragment&&f.fragment.c();t.intro&&ce(e.$$.fragment),fe(e,t.target,t.anchor,t.customElement),X()}O(c)}class pe{$destroy(){ae(this,1),this.$destroy=j}$on(t,n){const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const l=o.indexOf(n);l!==-1&&o.splice(l,1)}}$set(t){this.$$set&&!te(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function G(e,t,n){const o=e.slice();return o[8]=t[n],o[9]=t,o[10]=n,o}function he(e){let t,n,o,l,s,u,i=e[1].name+"",c,f,_,d,a,g,y,L,S,E=e[2],m=[];for(let r=0;r<E.length;r+=1)m[r]=Q(G(e,E,r));return{c(){t=b("div"),n=b("input"),o=C(),l=b("button"),l.textContent="Check",s=C(),u=b("h2"),c=I(i),f=C(),_=b("button"),_.textContent="Save",d=C(),a=b("table"),g=b("tr"),g.innerHTML=`<th>Raw Element</th> 
        <th>Edible</th>`,y=C();for(let r=0;r<m.length;r+=1)m[r].c();$(n,"type","text"),$(n,"name",""),$(n,"id","")},m(r,p){w(r,t,p),h(t,n),J(n,e[0]),h(t,o),h(t,l),w(r,s,p),w(r,u,p),h(u,c),w(r,f,p),w(r,_,p),w(r,d,p),w(r,a,p),h(a,g),h(a,y);for(let v=0;v<m.length;v+=1)m[v].m(a,null);L||(S=[x(n,"input",e[6]),x(l,"click",e[4]),x(_,"click",e[5])],L=!0)},p(r,p){if(p&1&&n.value!==r[0]&&J(n,r[0]),p&2&&i!==(i=r[1].name+"")&&W(c,i),p&4){E=r[2];let v;for(v=0;v<E.length;v+=1){const B=G(r,E,v);m[v]?m[v].p(B,p):(m[v]=Q(B),m[v].c(),m[v].m(a,null))}for(;v<m.length;v+=1)m[v].d(1);m.length=E.length}},d(r){r&&k(t),r&&k(s),r&&k(u),r&&k(f),r&&k(_),r&&k(d),r&&k(a),ne(m,r),L=!1,M(S)}}}function me(e){let t;return{c(){t=b("div"),t.textContent="Fetching..."},m(n,o){w(n,t,o)},p:j,d(n){n&&k(t)}}}function Q(e){let t,n,o=e[8].name+"",l,s,u,i,c,f,_,d,a,g,y,L,S,E;function m(){e[7].call(i,e[9],e[10])}return{c(){t=b("tr"),n=b("td"),l=I(o),s=C(),u=b("td"),i=b("select"),c=b("option"),c.textContent="Edible",_=b("option"),_.textContent="Inedible",a=b("option"),g=I("Unknown"),L=C(),c.__value=f=!0,c.value=c.__value,$(c,"class","true svelte-244n4v"),_.__value=d=!1,_.value=_.__value,$(_,"class","false svelte-244n4v"),a.__value=void 0,a.value=a.__value,$(a,"class","unknown svelte-244n4v"),$(i,"name",""),$(i,"id",""),$(i,"class",y=H(e[8].edible+"")+" svelte-244n4v"),e[8].edible===void 0&&T(m)},m(r,p){w(r,t,p),h(t,n),h(n,l),h(t,s),h(t,u),h(u,i),h(i,c),h(i,_),h(i,a),h(a,g),K(i,e[8].edible),h(t,L),S||(E=x(i,"change",m),S=!0)},p(r,p){e=r,p&4&&o!==(o=e[8].name+"")&&W(l,o),p&4&&y!==(y=H(e[8].edible+"")+" svelte-244n4v")&&$(i,"class",y),p&4&&K(i,e[8].edible)},d(r){r&&k(t),S=!1,E()}}}function be(e){let t,n,o;function l(i,c){return i[3]?me:he}let s=l(e),u=s(e);return{c(){t=b("main"),n=b("h1"),n.textContent="Edible",o=C(),u.c()},m(i,c){w(i,t,c),h(t,n),h(t,o),u.m(t,null)},p(i,[c]){s===(s=l(i))&&u?u.p(i,c):(u.d(1),u=s(i),u&&(u.c(),u.m(t,null)))},i:j,o:j,d(i){i&&k(t),u.d()}}}const ve="http://54.67.97.150:3030";function ge(e,t,n){let o="8801043036078",l={barcode:"",name:"",rawMaterials:[]},s=[],u=!1;const i=async()=>{n(3,u=!0);try{const a=await(await fetch(`${ve}/raw-materials?barcode=${o}`)).json();console.log(a),n(1,l=a),n(2,s=[]),l.rawMaterials.forEach(g=>n(2,s=[...s,{name:g.name,edible:g.edible}]))}catch{alert("\uBC14\uCF54\uB4DC \uBC88\uD638\uB97C \uD655\uC778\uD574\uC8FC\uC2ED\uC2DC\uC624")}n(3,u=!1)},c=async()=>{const d=s.filter((g,y)=>g.edible!==l.rawMaterials[y].edible);(await fetch("http://localhost:3030/update",{method:"Post",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(d)})).ok?(alert("Success to save"),i()):alert("Failed to save")};function f(){o=this.value,n(0,o)}function _(d,a){d[a].edible=oe(this),n(2,s)}return[o,l,s,u,i,c,f,_]}class ye extends pe{constructor(t){super(),_e(this,t,ge,be,ee,{})}}new ye({target:document.getElementById("app")});

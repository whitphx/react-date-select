var v=Object.defineProperty,b=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var p=(e,a,t)=>a in e?v(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,Y=(e,a)=>{for(var t in a||(a={}))N.call(a,t)&&p(e,t,a[t]);if(C)for(var t of C(a))A.call(a,t)&&p(e,t,a[t]);return e},S=(e,a)=>b(e,M(a));import{r as i,b as k}from"./vendor.770f496a.js";function d(e,a){if(e>a)return d(a,e).reverse();const t=[];for(let r=e;r<=a;r++)t.push(r);return t}function h(e,a){return("0".repeat(a-1)+e.toString()).slice(-a)}function E(e,a,t){if(a<1||12<a||t<1||31<t)return null;const r=h(e,4)+"-"+h(a,2)+"-"+h(t,2),s=new Date(r);return s.getFullYear()!==e||s.getMonth()!==a-1||s.getDate()!==t?null:r}function x(e){const a=new Date(e),t=a.getFullYear(),r=a.getMonth()+1,s=a.getDate();return isNaN(t)||isNaN(r)||isNaN(s)?{year:"",month:"",day:""}:{year:t.toString(),month:r.toString(),day:s.toString()}}const w=1960,F=new Date().getFullYear();function m(e){return parseInt(e)}function g(e){return e.toString()}function V(e){return{value:e,label:e}}const O=d(1,12).map(e=>V(g(e))),R=d(1,31).map(e=>V(g(e))),_=e=>{const[a,t]=i.exports.useState({yearValue:e.defaultYear?g(e.defaultYear):"",monthValue:e.defaultMonth?g(e.defaultMonth):"",dayValue:e.defaultDay?g(e.defaultDay):"",dateString:null,changeCount:0}),r=i.exports.useCallback(({year:n,month:u,day:c})=>{t(o=>{const l=n||o.yearValue,f=u||o.monthValue,y=c||o.dayValue,D=E(m(l),m(f),m(y));return{yearValue:l,monthValue:f,dayValue:y,dateString:D,changeCount:o.changeCount+1}})},[e.onChange]);i.exports.useEffect(()=>{e.onChange(a.dateString||"")},[a.changeCount,e.onChange]);const s=i.exports.useMemo(()=>{const n=e.minYear!=null?e.minYear:w,u=e.maxYear!=null?e.maxYear:F,c=d(n,u).map(o=>{const l=g(o);return{value:l,label:l}});return c.some(o=>o.value===a.yearValue)?c:c.concat(V(a.yearValue))},[e.minYear,e.maxYear,a.yearValue]);return{yearValue:a.yearValue,monthValue:a.monthValue,dayValue:a.dayValue,yearOptions:s,monthOptions:O,dayOptions:R,onYearChange:i.exports.useCallback(n=>{const u=typeof n=="string"?n:n.target.value;r({year:u})},[r]),onMonthChange:i.exports.useCallback(n=>{const u=typeof n=="string"?n:n.target.value;r({month:u})},[r]),onDayChange:i.exports.useCallback(n=>{const u=typeof n=="string"?n:n.target.value;r({day:u})},[r]),dateValue:a.dateString,onDateChange:i.exports.useCallback(n=>{const u=typeof n=="string"?n:n.target.value,{year:c,month:o,day:l}=x(u);r({year:c,month:o,day:l})},[r]),setDate:i.exports.useCallback(n=>{const{year:u,month:c,day:o}=x(n);t(l=>({yearValue:u,monthValue:c,dayValue:o,dateString:n,changeCount:l.changeCount}))},[])}},T=k.forwardRef((e,a)=>{const{onChange:t,value:r,maxYear:s,minYear:n,defaultYear:u,defaultMonth:c,defaultDay:o}=e,l=_({minYear:n,maxYear:s,onChange:t,defaultYear:u,defaultMonth:c,defaultDay:o}),{setDate:f,dateValue:y}=l;return i.exports.useEffect(()=>{if(typeof r!="string")return;(y||"")!==r&&f(r)},[f,y,r]),e.render(S(Y({},l),{ref:a}))});T.displayName="DateSelect";export{T as D};

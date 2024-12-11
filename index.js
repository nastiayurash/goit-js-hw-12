import{a as B,i as s,S as I}from"./assets/vendor-D0cagnvz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const S="47411339-89ac2619070d550af30415c00",H="https://pixabay.com/api/";async function y(t,r=1,n=15){const i=`${H}?key=${S}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${n}`;try{return(await B.get(i)).data}catch(e){throw console.error("Error fetching images:",e),s.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"top-center"}),e}}function p(t,r){const n=t.map(({webformatURL:e,largeImageURL:o,tags:a,likes:w,views:v,comments:$,downloads:P})=>`
        <li class="gallery-item">
          <a href="${o}">
            <img src="${e}" alt="${a}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${w}
            </p>
            <p class="info-item">
              <b>Views:</b> ${v}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${$}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${P}
            </p>
          </div>
        </li>
      `).join("");r.insertAdjacentHTML("beforeend",n),new I(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const m=document.getElementById("search-form"),d=document.querySelector(".gallery"),b=document.getElementById("load-more"),L=document.getElementById("loading-indicator");let f=1,c="",h=0,l=0;function E(){L.style.display="block"}function u(){L.style.display="none"}function g(t){b.style.display=t?"block":"none"}function O(){const{height:t}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}m.addEventListener("submit",async t=>{if(t.preventDefault(),c=m.querySelector("input").value.trim(),!c){s.error({message:"Please enter a search term."});return}f=1,l=0,d.innerHTML="",g(!1),E();try{const r=await y(c,f);u(),!r.hits||r.hits.length===0?s.error({message:"Sorry, no images found. Please try again!"}):(h=r.totalHits,l+=r.hits.length,p(r.hits,d),l<h?g(!0):s.info({message:"We're sorry, but you've reached the end of search results."}))}catch{u(),s.error({message:"Error fetching images. Please try again!"})}});b.addEventListener("click",async()=>{f+=1,E();try{const t=await y(c,f);u(),!t.hits||t.hits.length===0?(g(!1),s.info({message:"We're sorry, but you've reached the end of search results."})):(l+=t.hits.length,p(t.hits,d),O(),l>=h&&(g(!1),s.info({message:"We're sorry, but you've reached the end of search results."})))}catch{u(),s.error({message:"Error fetching images. Please try again!"})}});
//# sourceMappingURL=index.js.map

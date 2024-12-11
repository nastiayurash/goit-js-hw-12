import{i as a,S as h}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="47411339-89ac2619070d550af30415c00";async function L(i,r=1,o=9){const e=`https://pixabay.com/api/?key=${b}&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${o}`;try{const t=await fetch(e);if(!t.ok)throw new Error("Failed to fetch images.");return await t.json()}catch(t){throw console.error("Error fetching images:",t),a.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"top-center"}),t}}function w(i,r){const o=i.map(({webformatURL:e,largeImageURL:t,tags:n,likes:u,views:p,comments:g,downloads:y})=>`
        <li class="gallery-item">
          <a href="${t}">
            <img src="${e}" alt="${n}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${u}
            </p>
            <p class="info-item">
              <b>Views:</b> ${p}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${g}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${y}
            </p>
          </div>
        </li>
      `).join("");r.insertAdjacentHTML("beforeend",o),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const c=document.getElementById("search-form"),l=document.querySelector(".gallery"),m=document.getElementById("loading-indicator");let d=1;function E(){m.style.display="block"}function f(){m.style.display="none"}c.addEventListener("submit",async i=>{i.preventDefault();const r=c.querySelector("input").value.trim();if(!r){a.error({message:"Please enter a search term."});return}d=1,l.innerHTML="",E();try{const o=await L(r,d);f(),!o.hits||o.hits.length===0?a.error({message:"Sorry, no images found. Please try again!"}):w(o.hits,l,!0)}catch{f(),a.error({message:"Error fetching images. Please try again!"})}});
//# sourceMappingURL=index.js.map

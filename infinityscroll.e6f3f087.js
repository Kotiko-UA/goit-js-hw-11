function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequired7c6=a);var r=a("2shzp"),i=a("iQIUW"),s=a("fZKcF");const l={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")};l.form.addEventListener("submit",(function(e){e.preventDefault(),f=!0,c=1,l.gallery.innerHTML="",u=e.currentTarget.elements.searchQuery.value.trim(),g(u)})),l.gallery.addEventListener("click",(function(e){e.preventDefault(),e.target.classList.contains("gallery-image")&&m.on("show .simplelightbox")}));let c=1,d=40,u="",f=!0;const p=new IntersectionObserver((function(e){e.forEach((e=>{e.isIntersecting&&(!function(){if(c+=1,d+=40,d>500)return void i.Notify.failure("We're sorry, but you've reached the end of search results.");g(u)}(),d>500&&p.unobserve(e.target))}))}),{root:null,rootMargin:"1000px",threshold:0});async function g(t){try{const n=await r.default.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true&key=38382365-2ce894cbac0e5297650bdbdb4&q=${t}&per_page=40&page=${c}`);if(200!==n.status)throw new Error(n.status);if(0===n.data.hits.length)return void i.Notify.failure("enter a valid value to search for");!function(t){const n=t.data.hits.map((({webformatURL:e,largeImageURL:t,tags:n,likes:o,views:a,comments:r,downloads:i}={})=>`<div class="photo-card">\n        <a class="img-link" href="${t}">\n        <img width="320" class="gallery-image" src="${e}" alt="${n}" loading="lazy"/>\n        </a>\n        <div class="info">\n        <p class="info-item"><b>Likes</b>${o}</p>\n        <p class="info-item"><b>Views</b>${a}</p>\n        <p class="info-item"><b>Comments</b>${r}</p>\n        <p class="info-item"><b>Downloads</b>${i}</p>\n        </div>\n        </div>`)).join("");l.gallery.insertAdjacentHTML("beforeend",n),p.observe(l.guard),m=new(e(s))(".gallery .photo-card .img-link",y)}(n),f&&(i.Notify.success(`Hooray! We found ${n.data.totalHits} images.`),f=!1)}catch(e){console.log(e.message)}}let m=null;const y={captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250};
//# sourceMappingURL=infinityscroll.e6f3f087.js.map

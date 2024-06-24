(function(){var p=function(n){this.element=n,this.delta=[!1,!1],this.dragging=!1,this.intervalId=!1,S(this)};function S(n){n.element.addEventListener("mousedown",l.bind(n)),n.element.addEventListener("touchstart",l.bind(n),{passive:!0})}function _(n){n.element.addEventListener("mousemove",l.bind(n)),n.element.addEventListener("touchmove",l.bind(n),{passive:!0}),n.element.addEventListener("mouseup",l.bind(n)),n.element.addEventListener("mouseleave",l.bind(n)),n.element.addEventListener("touchend",l.bind(n))}function W(n){n.intervalId&&(window.requestAnimationFrame?window.cancelAnimationFrame(n.intervalId):clearInterval(n.intervalId),n.intervalId=!1),n.element.removeEventListener("mousemove",l.bind(n)),n.element.removeEventListener("touchmove",l.bind(n)),n.element.removeEventListener("mouseup",l.bind(n)),n.element.removeEventListener("mouseleave",l.bind(n)),n.element.removeEventListener("touchend",l.bind(n))}function l(n){switch(n.type){case"mousedown":case"touchstart":L(this,n);break;case"mousemove":case"touchmove":j(this,n);break;case"mouseup":case"mouseleave":case"touchend":w(this,n);break}}function L(n,f){n.dragging=!0,_(n),n.delta=[parseInt(I(f).clientX),parseInt(I(f).clientY)],h(n,"dragStart",n.delta,f.target)}function w(n,f){W(n);var v=parseInt(I(f).clientX),g=parseInt(I(f).clientY);if(n.delta&&(n.delta[0]||n.delta[0]===0)){var y=x(v-n.delta[0]);Math.abs(v-n.delta[0])>30&&(y<0?h(n,"swipeLeft",[v,g]):h(n,"swipeRight",[v,g])),n.delta[0]=!1}if(n.delta&&(n.delta[1]||n.delta[1]===0)){var b=x(g-n.delta[1]);Math.abs(g-n.delta[1])>30&&(b<0?h(n,"swipeUp",[v,g]):h(n,"swipeDown",[v,g])),n.delta[1]=!1}h(n,"dragEnd",[v,g]),n.dragging=!1}function j(n,f){n.dragging&&(window.requestAnimationFrame?n.intervalId=window.requestAnimationFrame(C.bind(n,f)):n.intervalId=setTimeout(function(){C.bind(n,f)},250))}function C(n){h(this,"dragging",[parseInt(I(n).clientX),parseInt(I(n).clientY)])}function I(n){return n.changedTouches?n.changedTouches[0]:n}function h(n,f,v,g){var y=!1;g&&(y=g);var b=new CustomEvent(f,{detail:{x:v[0],y:v[1],origin:y}});n.element.dispatchEvent(b)}function x(n){return Math.sign?Math.sign(n):(n>0)-(n<0)||+n}window.SwipeContent=p;var N=document.getElementsByClassName("js-swipe-content");if(N.length>0)for(var A=0;A<N.length;A++)(function(n){new p(N[n])})(A)})();(function(){var p=function(t){this.options=tt(p.defaults,t),this.element=this.options.element,this.listWrapper=this.element.getElementsByClassName("carousel__wrapper")[0],this.list=this.element.getElementsByClassName("carousel__list")[0],this.items=this.element.getElementsByClassName("carousel__item"),this.initItems=[],this.itemsNb=this.items.length,this.visibItemsNb=1,this.itemsWidth=1,this.itemOriginalWidth=!1,this.selectedItem=0,this.translateContainer=0,this.containerWidth=0,this.ariaLive=!1,this.controls=this.element.getElementsByClassName("js-carousel__control"),this.animating=!1,this.autoplayId=!1,this.autoplayPaused=!1,this.dragStart=!1,this.resizeId=!1,this.cloneList=[],this.itemAutoSize=!1,this.totTranslate=0,this.options.nav&&(this.options.loop=!1),this.counter=this.element.getElementsByClassName("js-carousel__counter"),this.counterTor=this.element.getElementsByClassName("js-carousel__counter-tot"),S(this),_(this,!0),N(this,this.visibItemsNb),W(this),y(this),G(this),l(this),$(this),this.element.classList.add("carousel--loaded")};p.prototype.showNext=function(){w(this)},p.prototype.showPrev=function(){L(this)},p.prototype.startAutoplay=function(){b(this)},p.prototype.pauseAutoplay=function(){E(this)};function S(t){var e=window.getComputedStyle(t.items[0]),i=window.getComputedStyle(t.listWrapper),a=parseFloat(e.getPropertyValue("width")),r=parseFloat(e.getPropertyValue("margin-right")),o=parseFloat(i.getPropertyValue("padding-left")),m=parseFloat(i.getPropertyValue("width"));t.itemAutoSize||(t.itemAutoSize=a),m=J(t,m),t.itemOriginalWidth?a=t.itemOriginalWidth:t.itemOriginalWidth=a,t.itemAutoSize&&(t.itemOriginalWidth=parseInt(t.itemAutoSize),a=t.itemOriginalWidth),m<a&&(t.itemOriginalWidth=m,a=t.itemOriginalWidth),t.visibItemsNb=parseInt((m-2*o+r)/(a+r)),t.itemsWidth=parseFloat(((m-2*o+r)/t.visibItemsNb-r).toFixed(1)),t.containerWidth=(t.itemsWidth+r)*t.items.length,t.translateContainer=0-(t.itemsWidth+r)*t.visibItemsNb,et||(t.list.style.width=(t.itemsWidth+r)*t.visibItemsNb*3+"px"),t.totTranslate=0-t.selectedItem*(t.itemsWidth+r),t.items.length<=t.visibItemsNb&&(t.totTranslate=0),R(t),Y(t)}function _(t,e){for(var i=0;i<t.items.length;i++)t.items[i].style.width=t.itemsWidth+"px",e&&t.initItems.push(t.items[i])}function W(t){t.options.loop&&(t.items.length<t.visibItemsNb*3?A(t,t.visibItemsNb*3-t.items.length,t.items.length-t.visibItemsNb*2):t.items.length>t.visibItemsNb*3&&n(t,t.visibItemsNb*3,t.items.length-t.visibItemsNb*3),u(t,"translateX("+t.translateContainer+"px)"))}function l(t){t.options.nav&&(V(t),X(t)),t.controls.length>0&&(t.controls[0].addEventListener("click",function(e){e.preventDefault(),L(t),F(t)}),t.controls[1].addEventListener("click",function(e){e.preventDefault(),w(t),F(t)}),O(t),k(t)),t.options.autoplay&&(b(t),t.options.autoplayOnHover||(t.element.addEventListener("mouseenter",function(e){E(t),t.autoplayPaused=!0}),t.element.addEventListener("mouseleave",function(e){t.autoplayPaused=!1,b(t)})),t.options.autoplayOnFocus||(t.element.addEventListener("focusin",function(e){E(t),t.autoplayPaused=!0}),t.element.addEventListener("focusout",function(e){t.autoplayPaused=!1,b(t)}))),t.options.drag&&window.requestAnimationFrame&&(new SwipeContent(t.element),t.element.addEventListener("dragStart",function(e){e.detail.origin&&e.detail.origin.closest(".js-carousel__control")||e.detail.origin&&e.detail.origin.closest(".js-carousel__navigation")||e.detail.origin&&!e.detail.origin.closest(".carousel__wrapper")||(t.element.classList.add("carousel--is-dragging"),E(t),t.dragStart=e.detail.x,j(t))}),t.element.addEventListener("dragging",function(e){if(t.dragStart&&!(t.animating||Math.abs(e.detail.x-t.dragStart)<10)){var i=e.detail.x-t.dragStart+t.translateContainer;t.options.loop||(i=e.detail.x-t.dragStart+t.totTranslate),u(t,"translateX("+i+"px)")}})),window.addEventListener("resize",function(e){E(t),clearTimeout(t.resizeId),t.resizeId=setTimeout(function(){f(t),Q(t),O(t),P(t),b(t),R(t),Y(t),k(t)},250)}),t.element.addEventListener("keydown",function(e){e.keyCode&&e.keyCode==39||e.key&&e.key.toLowerCase()=="arrowright"?t.showNext():(e.keyCode&&e.keyCode==37||e.key&&e.key.toLowerCase()=="arrowleft")&&t.showPrev()})}function L(t){t.animating||(t.animating=!0,t.selectedItem=T(t,t.selectedItem-t.visibItemsNb),C(t,"0","prev"))}function w(t){t.animating||(t.animating=!0,t.selectedItem=T(t,t.selectedItem+t.visibItemsNb),C(t,t.translateContainer*2+"px","next"))}function j(t){t.element.addEventListener("dragEnd",function e(i){if(t.element.removeEventListener("dragEnd",e),t.element.classList.remove("carousel--is-dragging"),i.detail.x-t.dragStart<-40)t.animating=!1,w(t);else if(i.detail.x-t.dragStart>40)t.animating=!1,L(t);else{if(i.detail.x-t.dragStart==0)return;t.animating=!0,C(t,t.translateContainer+"px",!1)}t.dragStart=!1})}function C(t,e,i){E(t),t.list.classList.add("carousel__list--animating");var a=t.totTranslate;t.options.loop||(e=I(t,i)),setTimeout(function(){u(t,"translateX("+e+")")}),it?t.list.addEventListener("transitionend",function r(o){o.propertyName&&o.propertyName!="transform"||(t.list.classList.remove("carousel__list--animating"),t.list.removeEventListener("transitionend",r),h(t,i))}):h(t,i),!t.options.loop&&a==t.totTranslate&&t.list.dispatchEvent(new CustomEvent("transitionend")),O(t),P(t),k(t)}function I(t,e){var i=t.totTranslate;return e=="next"?i=t.totTranslate+t.translateContainer:e=="prev"?i=t.totTranslate-t.translateContainer:e=="click"&&(i=t.selectedDotIndex*t.translateContainer),i>0&&(i=0,t.selectedItem=0),i<-t.translateContainer-t.containerWidth&&(i=-t.translateContainer-t.containerWidth,t.selectedItem=t.items.length-t.visibItemsNb),t.visibItemsNb>t.items.length&&(i=0),t.totTranslate=i,i+"px"}function h(t,e){e&&x(t,e),t.animating=!1,b(t),y(t)}function x(t,e){if(t.options.loop){var i=e=="next"?0:t.items.length-t.visibItemsNb;n(t,i,!1),e=="next"?A(t,t.visibItemsNb,0):N(t,t.visibItemsNb),u(t,"translateX("+t.translateContainer+"px)")}}function N(t,e,i){if(t.options.loop){var a=document.createDocumentFragment(),r=0;i&&(r=i);for(var o=r;o<e;o++){var m=T(t,t.selectedItem-o-1),d=t.initItems[m].cloneNode(!0);d.classList.add("js-clone"),a.insertBefore(d,a.firstChild)}t.list.insertBefore(a,t.list.firstChild),H(t)}}function A(t,e,i){if(t.options.loop){for(var a=document.createDocumentFragment(),r=i;r<e+i;r++){var o=T(t,t.selectedItem+t.visibItemsNb+r),m=t.initItems[o].cloneNode(!0);m.classList.add("js-clone"),a.appendChild(m)}t.list.appendChild(a),H(t)}}function n(t,e,i){if(t.options.loop){i||(i=t.visibItemsNb);for(var a=0;a<i;a++)t.items[e]&&t.list.removeChild(t.items[e])}}function f(t){var e=t.visibItemsNb;if(v(t),S(t),_(t,!1),g(t),t.options.loop)e>t.visibItemsNb?n(t,0,e-t.visibItemsNb):e<t.visibItemsNb&&N(t,t.visibItemsNb,e),W(t);else{var i=I(t);u(t,"translateX("+i+")")}y(t)}function v(t){nt&&(t.items[0].removeAttribute("style"),t.itemAutoSize=getComputedStyle(t.items[0]).getPropertyValue("width"))}function g(t){for(var e=0;e<t.initItems.length;e++)t.initItems[e].style.width=t.itemsWidth+"px"}function y(t){for(var e=t.items.length>t.visibItemsNb,i=t.items.length,a=0;a<t.items.length;a++)t.options.loop?a<t.visibItemsNb||a>=2*t.visibItemsNb?t.items[a].setAttribute("tabindex","-1"):(a<i&&(i=a),t.items[a].removeAttribute("tabindex")):(a<t.selectedItem||a>=t.selectedItem+t.visibItemsNb)&&e?t.items[a].setAttribute("tabindex","-1"):(a<i&&(i=a),t.items[a].removeAttribute("tabindex"));c(t,i)}function b(t){t.options.autoplay&&!t.autoplayId&&!t.autoplayPaused&&(t.autoplayId=setInterval(function(){w(t)},t.options.autoplayInterval))}function E(t){t.options.autoplay&&(clearInterval(t.autoplayId),t.autoplayId=!1)}function G(t){if(t.options.ariaLive){var e=document.createElement("div");e.setAttribute("class","lst-sr-only js-carousel__aria-live"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-atomic","true"),t.element.appendChild(e),t.ariaLive=e}}function F(t){t.options.ariaLive&&(t.ariaLive.innerHTML="Item "+(t.selectedItem+1)+" selected. "+t.visibItemsNb+" items of "+t.initItems.length+" visible")}function T(t,e){return e<0&&(e=z(e,t.itemsNb)),e>=t.itemsNb&&(e=e%t.itemsNb),e}function z(t,e){return t=t+e,t>0?t:z(t,e)}function u(t,e){t.list.style.transform=e,t.list.style.msTransform=e}function J(t,e){var i=t.listWrapper.closest(".sr-only");return i?(i.classList.remove("sr-only"),e=t.listWrapper.offsetWidth,i.classList.add("sr-only")):isNaN(e)&&(e=M(t.element,t)),e}function M(t,e){var i=t.parentElement;if(i.tagName.toLowerCase()=="html")return 0;var a=window.getComputedStyle(i);if(a.display=="none"||a.visibility=="hidden"){i.setAttribute("style","display: block!important; visibility: visible!important;");var r=e.listWrapper.offsetWidth;return i.style.display="",i.style.visibility="",r}else return M(i,e)}function O(t){if(!t.options.loop){if(t.controls.length>0&&(t.totTranslate==0?t.controls[0].setAttribute("disabled",!0):t.controls[0].removeAttribute("disabled"),t.totTranslate==-t.translateContainer-t.containerWidth||t.items.length<=t.visibItemsNb?t.controls[1].setAttribute("disabled",!0):t.controls[1].removeAttribute("disabled")),t.options.nav){var e=t.navigation.getElementsByClassName(t.options.navigationItemClass+"--selected");e.length>0&&e[0].classList.remove(t.options.navigationItemClass+"--selected");var i=q(t);t.totTranslate==-t.translateContainer-t.containerWidth&&(i=t.navDots.length-1),t.navDots[i].classList.add(t.options.navigationItemClass+"--selected")}t.totTranslate==0&&(t.totTranslate==-t.translateContainer-t.containerWidth||t.items.length<=t.visibItemsNb)?t.element.classList.add("carousel--hide-controls"):t.element.classList.remove("carousel--hide-controls")}}function H(t){t.cloneList=[];for(var e=t.element.querySelectorAll(".js-clone"),i=0;i<e.length;i++)e[i].classList.remove("js-clone"),t.cloneList.push(e[i]);U(t,"carousel-updated",t.cloneList)}function V(t){if(!(t.element.getElementsByClassName("js-carousel__navigation").length>0)){var e=document.createElement("ol"),i="",a=t.options.navigationClass+" js-carousel__navigation";t.items.length<=t.visibItemsNb&&(a=a+" hidden"),e.setAttribute("class",a);for(var r=Math.ceil(t.items.length/t.visibItemsNb),o=q(t),m=t.options.navigationPagination?"":"sr-only",d=0;d<r;d++){var B=d==o?'class="'+t.options.navigationItemClass+" "+t.options.navigationItemClass+'--selected js-carousel__nav-item"':'class="'+t.options.navigationItemClass+' js-carousel__nav-item"';i=i+"<li "+B+'><button class="reset js-tab-focus" style="outline: none;"><span class="'+m+'">'+(d+1)+"</span></button></li>"}e.innerHTML=i,t.element.appendChild(e)}}function X(t){t.navigation=t.element.getElementsByClassName("js-carousel__navigation")[0],t.navDots=t.element.getElementsByClassName("js-carousel__nav-item"),t.navIdEvent=Z.bind(t),t.navigation.addEventListener("click",t.navIdEvent)}function K(t){t.navigation&&t.element.removeChild(t.navigation),t.navIdEvent&&t.navigation.removeEventListener("click",t.navIdEvent)}function Q(t){t.options.nav&&(K(t),V(t),X(t))}function Z(t){var e=t.target.closest(".js-carousel__nav-item");if(e&&!this.animating){this.animating=!0;var i=Array.prototype.indexOf.call(this.navDots,e);this.selectedDotIndex=i,this.selectedItem=i*this.visibItemsNb,C(this,!1,"click")}}function q(t){return Math.ceil(t.selectedItem/t.visibItemsNb)}function $(t){t.counterTor.length>0&&(t.counterTor[0].textContent=t.itemsNb),P(t)}function P(t){if(t.counter.length!=0){var e=t.selectedItem+t.visibItemsNb;e>t.items.length&&(e=t.items.length),t.counter[0].textContent=e}}function R(t){t.options.justifyContent&&t.list.classList.toggle("justify-center",t.items.length<t.visibItemsNb)}function Y(t){if(!(t.controls.length<1||!t.options.alignControls)&&(t.controlsAlignEl||(t.controlsAlignEl=t.element.querySelector(t.options.alignControls)),!!t.controlsAlignEl))for(var e=t.element.offsetHeight-t.controlsAlignEl.offsetHeight,i=0;i<t.controls.length;i++)t.controls[i].style.marginBottom=e+"px"}function k(t){U(t,"carousel-active-items",{firstSelectedItem:t.selectedItem,visibleItemsNb:t.visibItemsNb})}function U(t,e,i){var a=new CustomEvent(e,{detail:i});t.element.dispatchEvent(a)}function c(t,e){if(t.options.overflowItems)for(var i=t.containerWidth/t.items.length,a=(window.innerWidth-i*t.visibItemsNb)/2,r=Math.ceil(a/i),o=0;o<r;o++){var m=e-1-o;m>=0&&t.items[m].removeAttribute("tabindex");var d=e+t.visibItemsNb+o;d<t.items.length&&t.items[d].removeAttribute("tabindex")}}var tt=function(){var t={},e=!1,i=0,a=arguments.length;Object.prototype.toString.call(arguments[0])==="[object Boolean]"&&(e=arguments[0],i++);for(var r=function(m){for(var d in m)Object.prototype.hasOwnProperty.call(m,d)&&(e&&Object.prototype.toString.call(m[d])==="[object Object]"?t[d]=extend(!0,t[d],m[d]):t[d]=m[d])};i<a;i++){var o=arguments[i];r(o)}return t};p.defaults={element:"",autoplay:!1,autoplayOnHover:!1,autoplayOnFocus:!1,autoplayInterval:5e3,loop:!0,nav:!1,navigationItemClass:"carousel__nav-item",navigationClass:"carousel__navigation",navigationPagination:!1,drag:!1,justifyContent:!1,alignControls:!1,overflowItems:!1},window.Carousel=p;var s=document.getElementsByClassName("js-carousel"),et=CSS.supports("align-items","stretch"),it=CSS.supports("transition","transform"),nt="CSS"in window&&CSS.supports("color","var(--color-var)");if(s.length>0)for(var D=0;D<s.length;D++)(function(t){var e=!!(s[t].getAttribute("data-autoplay")&&s[t].getAttribute("data-autoplay")=="on"),i=s[t].getAttribute("data-autoplay-interval")?s[t].getAttribute("data-autoplay-interval"):5e3,a=!!(s[t].getAttribute("data-autoplay-hover")&&s[t].getAttribute("data-autoplay-hover")=="on"),r=!!(s[t].getAttribute("data-autoplay-focus")&&s[t].getAttribute("data-autoplay-focus")=="on"),o=!!(s[t].getAttribute("data-drag")&&s[t].getAttribute("data-drag")=="on"),m=!(s[t].getAttribute("data-loop")&&s[t].getAttribute("data-loop")=="off"),d=!!(s[t].getAttribute("data-navigation")&&s[t].getAttribute("data-navigation")=="on"),B=s[t].getAttribute("data-navigation-item-class")?s[t].getAttribute("data-navigation-item-class"):"carousel__nav-item",at=s[t].getAttribute("data-navigation-class")?s[t].getAttribute("data-navigation-class"):"carousel__navigation",st=!!(s[t].getAttribute("data-navigation-pagination")&&s[t].getAttribute("data-navigation-pagination")=="on"),rt=!!(s[t].getAttribute("data-overflow-items")&&s[t].getAttribute("data-overflow-items")=="on"),mt=s[t].getAttribute("data-align-controls")?s[t].getAttribute("data-align-controls"):!1,ot=!!(s[t].getAttribute("data-justify-content")&&s[t].getAttribute("data-justify-content")=="on");new p({element:s[t],autoplay:e,autoplayOnHover:a,autoplayOnFocus:r,autoplayInterval:i,drag:o,ariaLive:!0,loop:m,nav:d,navigationItemClass:B,navigationPagination:st,navigationClass:at,overflowItems:rt,justifyContent:ot,alignControls:mt})})(D)})();
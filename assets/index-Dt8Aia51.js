(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};var i=class{constructor(){this.state={},this.observers={}}subscribe(e,t){let n=Array.isArray(e)?e:[e];return n.forEach(e=>{this.observers[e]||(this.observers[e]=[]),this.observers[e].push(t)}),()=>{n.forEach(e=>{if(this.observers[e]){let n=this.observers[e].indexOf(t);n>-1&&this.observers[e].splice(n,1)}})}}notify(e,t){this.observers[e]&&this.observers[e].forEach(n=>n(t,e,this.state))}setState(e){Object.keys(e).forEach(t=>{this.state[t]!==e[t]&&(this.state[t]=e[t],this.notify(t,e[t]))})}getState(e=null){return e?this.state[e]:this.state}unsubscribeAll(){this.observers={}}reset(){this.unsubscribeAll(),this.state={}}},a=i;async function o(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function s(e){let t=await fetch(`/api/products/${e}`);return await t.json()}const c=[{value:`price_asc`,label:`가격 낮은순`},{value:`price_desc`,label:`가격 높은순`},{value:`name_asc`,label:`이름순`},{value:`name_desc`,label:`이름 역순`}],l=[{value:`10`,label:`10개`},{value:`20`,label:`20개`},{value:`50`,label:`50개`},{value:`100`,label:`100개`}],u=`price_asc`,d=20;var f=class extends a{constructor(){super(),this.state={products:[],totalProducts:0,loading:!0,error:null,searchQuery:``,category:``,sort:u,pageSize:d,currentPage:1,isLoadingMore:!1,hasMore:!0}}setProducts(e,t){this.setState({products:e,...t!==void 0&&{totalProducts:t}}),this.updateHasMore()}setError(e){this.setState({error:e})}setLoading(e){this.setState({loading:e})}setIsLoadingMore(e){console.log(`setIsLoadingMore`,e),this.setState({isLoadingMore:e})}updateHasMore(){let e=this.state.products.length<this.state.totalProducts;this.setState({hasMore:e})}appendProducts(e,t){let n=this.state.products,r=[...n,...e];this.setState({products:r,...t!==void 0&&{totalProducts:t}}),this.updateHasMore()}setFilters(e={},t=!0){let n=Object.keys(e).some(t=>e[t]!==void 0&&this.state[t]!==e[t]);if(!n&&t)return!1;let r={...e};return this.setState(r),!0}async applyFilters(e={},t=!0){let n=this.setFilters(e,t);!n&&t||(await this.loadProducts(),this.updateUrl())}async loadProducts(e=!0){this.setLoading(!0),e&&this.setState({currentPage:1});try{let t={limit:this.state.pageSize,search:this.state.searchQuery,category1:this.state.category.split(`>`)[0]?.trim()||``,category2:this.state.category.split(`>`)[1]?.trim()||``,sort:this.state.sort,page:e?1:this.state.currentPage},n=await o(t);this.setProducts(n.products,n.pagination.total),this.setError(null)}catch(e){this.setError(e.message)}finally{this.setLoading(!1)}}async loadMoreProducts(){if(this.state.loading||this.state.isLoadingMore||!this.state.hasMore)return;this.setIsLoadingMore(!0);let e=this.state.currentPage+1;try{let t={limit:this.state.pageSize,search:this.state.searchQuery,category1:this.state.category.split(`>`)[0]?.trim()||``,category2:this.state.category.split(`>`)[1]?.trim()||``,sort:this.state.sort,page:e},n=await o(t);this.appendProducts(n.products,n.pagination.total),this.setState({currentPage:e}),this.setError(null)}catch(e){this.setError(e.message)}finally{this.setIsLoadingMore(!1)}}updateUrl(){let e=new URLSearchParams;if(this.state.searchQuery&&e.set(`search`,this.state.searchQuery),this.state.category){let[t,n]=this.state.category.split(`>`).map(e=>e.trim());t&&e.set(`category1`,t),n&&e.set(`category2`,n)}this.state.sort!==u&&e.set(`sort`,this.state.sort),e.set(`limit`,this.state.pageSize);let t=e.toString(),n=t?`/?${t}`:`/`;window.history.replaceState({},``,n)}parseFiltersFromUrl(){let e=new URLSearchParams(window.location.search),t={},n=e.get(`search`);n&&(t.searchQuery=n);let r=e.get(`category1`),i=e.get(`category2`);r&&(t.category=i?`${r} > ${i}`:r);let a=e.get(`sort`);a&&(t.sort=a);let o=e.get(`limit`);return o&&!isNaN(parseInt(o))&&(t.pageSize=parseInt(o)),t}syncFromUrl(){let e=this.parseFiltersFromUrl(),t={searchQuery:e.searchQuery||``,category:e.category||``,sort:e.sort||u,pageSize:e.pageSize||d},n=Object.keys(t).some(e=>this.state[e]!==t[e]);return n?(this.setState({...t,currentPage:1}),!0):!1}reset(){this.state={products:[],totalProducts:0,loading:!0,error:null,searchQuery:``,category:``,sort:u,pageSize:d,currentPage:1,isLoadingMore:!1,hasMore:!0}}},p=f;const m={productId:``,title:``,price:0,image:``,description:``,rating:0,reviewCount:0,stock:0,images:[],category1:``,category2:``,brand:``};var h=class extends a{constructor(){super(),this.state={product:m,loading:!1,error:null,categories:[],relatedProducts:[],relatedProductsLoading:!1,relatedProductsError:null}}setProduct(e){let t=this.extractCategories(e);this.setState({product:e,categories:t})}extractCategories(e){let t=[];return e.category1&&t.push({name:e.category,type:`category1`}),e.category2&&t.push({name:e.subcategory,type:`category2`,parent:e.category}),t}setLoading(e){this.setState({loading:e})}setError(e){this.setState({error:e})}async loadProduct(e){this.setLoading(!0);try{let t=await s(e);this.setProduct(t),this.setError(null)}catch(e){this.setError(e.message)}finally{this.setLoading(!1)}}reset(){this.state={product:m,loading:!1,error:null,categories:[],relatedProducts:[],relatedProductsLoading:!1,relatedProductsError:null}}},g=h,_=class extends a{constructor(){super(),this.state={cart:[],isCartModalOpen:!1}}addToCart(e,t=1){let n=[...this.state.cart],r=n.find(t=>t.id===e.id);r?r.quantity+=t:n.push({...e,quantity:t}),this.setState({cart:n}),this.saveToStorage()}removeFromCart(e){let t=this.state.cart.filter(t=>t.id!==e);this.setState({cart:t}),this.saveToStorage()}updateQuantity(e,t){if(t<=0)return this.removeFromCart(e);let n=this.state.cart.map(n=>n.id===e?{...n,quantity:t}:n);this.setState({cart:n}),this.saveToStorage()}clearCart(){this.setState({cart:[]}),this.saveToStorage()}toggleModal(){this.setState({isCartModalOpen:!this.state.isCartModalOpen})}openModal(){this.setState({isCartModalOpen:!0})}closeModal(){this.setState({isCartModalOpen:!1})}getTotalPrice(){return this.state.cart.reduce((e,t)=>e+t.price*t.quantity,0)}getTotalQuantity(){return this.state.cart.reduce((e,t)=>e+t.quantity,0)}saveToStorage(){localStorage.setItem(`cart`,JSON.stringify(this.state.cart))}loadFromStorage(){try{let e=JSON.parse(localStorage.getItem(`cart`)||`[]`);this.setState({cart:e})}catch{this.setState({cart:[]})}}reset(){this.state={cart:[],isCartModalOpen:!1}}},v=_,y=class extends a{constructor(){super(),this.state={toast:null}}showToast(e,t=`info`,n=3e3){let r={message:e,type:t,id:Date.now()};this.setState({toast:r}),setTimeout(()=>{this.state.toast?.id===r.id&&this.setState({toast:null})},n)}hideToast(){this.setState({toast:null})}reset(){this.state={toasts:[]}}},b=y,x=class{constructor(){this.productList=new p,this.productDetail=new g,this.cart=new v,this.ui=new b}initialize(){this.cart.loadFromStorage()}addProductToCart(e,t=1){this.cart.addToCart(e,t),this.ui.showToast(`장바구니에 추가되었습니다`,`success`)}loadProductListError(e){this.productList.setError(e),this.ui.showToast(`상품을 불러오는데 실패했습니다.`,`error`)}};const S=new x;S.initialize();var C=S,w=class{constructor(e){this.product=e}handleImageClick=e=>{let t=e.currentTarget.dataset.productId;window.history.pushState({},``,`/product/${t}`),window.dispatchEvent(new Event(`popstate`))};handleAddToCart=e=>{e.stopPropagation();let t=this.createProductData();C.addProductToCart(t)};createProductData(){return{id:this.product.productId,title:this.product.title,name:this.product.title,price:parseInt(this.product.lprice),image:this.product.image,quantity:1}}mounted(){let e=document.querySelector(`.product-card[data-product-id="${this.product.productId}"]`);if(!e)return;let t=e.querySelector(`.product-image`);t&&(t.addEventListener(`click`,this.handleImageClick),t.dataset.productId=this.product.productId);let n=e.querySelector(`.product-info`);n&&(n.addEventListener(`click`,this.handleImageClick),n.dataset.productId=this.product.productId);let r=e.querySelector(`.add-to-cart-btn`);r&&r.addEventListener(`click`,this.handleAddToCart)}render(){let e=parseInt(this.product.lprice).toLocaleString();return`
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
           data-product-id="${this.product.productId}">
        <!-- 상품 이미지 -->
        <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
          <img src="${this.product.image}"
               alt="${this.product.title}"
               class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
               loading="lazy">
        </div>
        <!-- 상품 정보 -->
        <div class="p-3">
          <div class="cursor-pointer product-info mb-3">
            <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
              ${this.product.title}
            </h3>
            <p class="text-xs text-gray-500 mb-2">${this.product.brand||``}</p>
            <p class="text-lg font-bold text-gray-900">
              ${e}원
            </p>
          </div>
          <!-- 장바구니 버튼 -->
          <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                  hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${this.product.productId}">
            장바구니 담기
          </button>
        </div>
      </div>
    `}},T=w,E=class{constructor(){this.currentSearchQuery=C.productList.state.searchQuery||``,this.setupSubscriptions()}setupSubscriptions(){C.productList.subscribe([`searchQuery`],()=>{this.updateInputValue()})}updateInputValue(){let e=document.getElementById(`search-input`);e&&(this.currentSearchQuery=C.productList.state.searchQuery||``,e.value=this.currentSearchQuery)}handleKeyPress=e=>{if(e.key===`Enter`){let t=e.target.value.trim();C.productList.applyFilters({searchQuery:t})}};attachEvents(){let e=document.getElementById(`search-input`);e&&e.addEventListener(`keypress`,this.handleKeyPress)}mounted(){this.updateInputValue(),this.attachEvents()}render(){return`
      <div class="mb-4">
        <div class="relative">
          <input type="text" id="search-input" 
                 placeholder="상품명을 검색해보세요..." 
                 value="${this.currentSearchQuery}" 
                 class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    `}},D=E,O=class{constructor(){this.categories=[],this.currentCategory1=``,this.currentCategory2=``,this.loadingCategories=!0,this.syncCategoryFromState(),this.setupSubscriptions()}setupSubscriptions(){C.productList.subscribe(`category`,()=>{this.syncCategoryFromState()})}syncCategoryFromState(){let e=C.productList.state.category;if(e){let[t,n]=e.split(`>`).map(e=>e.trim());this.currentCategory1=t||``,this.currentCategory2=n||``}else this.currentCategory1=``,this.currentCategory2=``;document.getElementById(`category-list`)&&(this.updateCategoryListDOM(),this.updateBreadcrumbDOM())}async loadCategories(){try{this.loadingCategories=!0;let e=await fetch(`/api/categories`),t=await e.json();this.categories=this.transformCategoriesData(t),this.loadingCategories=!1}catch(e){console.error(`카테고리 로드 실패:`,e),this.loadingCategories=!1}}transformCategoriesData(e){let t=[];return Object.keys(e).forEach(n=>{let r=e[n],i=Object.keys(r).map(e=>({name:e}));t.push({name:n,subCategories:i})}),t}handleBreadcrumbClick=e=>{let t=e.target.getAttribute(`data-action`);t===`reset`?C.productList.applyFilters({category:``}):t===`category1`&&C.productList.applyFilters({category:this.currentCategory1})};handleCategoryClick=e=>{let t=e.target.getAttribute(`data-category1`),n=e.target.getAttribute(`data-category2`);if(n){let e=`${t} > ${n}`;C.productList.applyFilters({category:e})}else C.productList.applyFilters({category:t})};async mounted(){await this.loadCategories(),this.updateDOM(),this.attachEvents()}updateDOM(){this.updateCategoryListDOM(),this.updateBreadcrumbDOM()}attachEvents(){let e=document.getElementById(`category-breadcrumb`);e&&e.addEventListener(`click`,this.handleBreadcrumbClick);let t=document.querySelectorAll(`.category-btn`);t.forEach(e=>{e.addEventListener(`click`,this.handleCategoryClick)})}renderBreadcrumb(){let e=[`전체`];return this.currentCategory1&&e.push(this.currentCategory1),this.currentCategory2&&e.push(this.currentCategory2),e.map((t,n)=>{let r=n===e.length-1,i=!r,a=``;return t===`전체`?a=`reset`:n===1&&(a=`category1`),`
        <span class="${i?`cursor-pointer hover:text-blue-600`:`text-gray-500`}"
              ${i?`data-action="${a}"`:``}>
          ${t}
        </span>
      `}).join(` <span class="text-gray-400">></span> `)}renderCategories(){if(this.loadingCategories)return`<div class="text-center py-4 text-gray-500">카테고리 로딩 중...</div>`;if(this.currentCategory1){let e=this.categories.find(e=>e.name===this.currentCategory1);return e?.subCategories?e.subCategories.map(e=>`
          <button class="category-btn px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors ${e.name===this.currentCategory2?`bg-blue-100 border-blue-300`:``}"
                  data-category1="${this.currentCategory1}"
                  data-category2="${e.name}">
            ${e.name}
          </button>
        `).join(``):`<div class="text-center py-4 text-gray-500">하위 카테고리가 없습니다.</div>`}else return this.categories.map(e=>`
        <button class="category-btn px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                data-category1="${e.name}">
          ${e.name}
        </button>
      `).join(``)}updateCategoryListDOM(){let e=document.getElementById(`category-list`);if(e){e.innerHTML=this.renderCategories();let t=document.querySelectorAll(`.category-btn`);t.forEach(e=>{e.addEventListener(`click`,this.handleCategoryClick)})}}updateBreadcrumbDOM(){let e=document.getElementById(`category-breadcrumb`);e&&(e.innerHTML=this.renderBreadcrumb())}render(){return`
      <div class="mb-4">
        <!-- 브레드크럼 -->
        <div class="text-sm text-gray-600 mb-2">
          카테고리: <span id="category-breadcrumb">${this.renderBreadcrumb()}</span>
        </div>
        
        <!-- 카테고리 목록 -->
        <div class="flex flex-wrap gap-2" id="category-list">
          ${this.renderCategories()}
        </div>
      </div>
    `}},k=O,A=class{constructor(){this.currentSort=C.productList.state.sort||u,this.setupSubscriptions()}setupSubscriptions(){C.productList.subscribe([`sort`],()=>{this.updateSelectValue()})}updateSelectValue(){let e=document.getElementById(`sort-select`);e&&(this.currentSort=C.productList.state.sort||u,e.value=this.currentSort)}handleSortChange=e=>{let t=e.target.value;C.productList.applyFilters({sort:t})};attachEvents(){let e=document.getElementById(`sort-select`);e&&e.addEventListener(`change`,this.handleSortChange)}mounted(){this.updateSelectValue(),this.attachEvents()}render(){return`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">정렬:</label>
        <select id="sort-select"
                class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          ${c.map(e=>`
            <option value="${e.value}" ${e.value===this.currentSort?`selected`:``}>${e.label}</option>
          `).join(``)}
        </select>
      </div>
    `}},j=A,M=class{constructor(){this.currentPageSize=(C.productList.state.pageSize||d).toString(),this.setupSubscriptions()}setupSubscriptions(){C.productList.subscribe([`pageSize`],()=>{this.updateSelectValue()})}updateSelectValue(){let e=document.getElementById(`limit-select`);e&&(this.currentPageSize=(C.productList.state.pageSize||d).toString(),e.value=this.currentPageSize)}handlePageSizeChange=e=>{let t=parseInt(e.target.value);C.productList.applyFilters({pageSize:t})};attachEvents(){let e=document.getElementById(`limit-select`);e&&e.addEventListener(`change`,this.handlePageSizeChange)}mounted(){this.updateSelectValue(),this.attachEvents()}render(){return`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">개수:</label>
        <select id="limit-select"
                class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          ${l.map(e=>`
            <option value="${e.value}" ${e.value===this.currentPageSize?`selected`:``}>${e.label}</option>
          `).join(``)}
        </select>
      </div>
    `}},N=M,P=class{constructor(){this.searchInput=new D,this.categoryFilter=new k,this.sortFilter=new j,this.pageCountFilter=new N}mounted(){this.searchInput.mounted(),this.categoryFilter.mounted(),this.sortFilter.mounted(),this.pageCountFilter.mounted()}render(){return`
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        ${this.searchInput.render()}
        ${this.categoryFilter.render()}
        
        <div class="flex justify-between items-center mt-4">
          ${this.sortFilter.render()}
          ${this.pageCountFilter.render()}
        </div>
      </div>
    `}},F=P,I=class{constructor(){this.productItems=[],this.searchBox=new F}mounted(){this.setupSubscriptions(),this.searchBox.mounted(),this.attachScrollListener(),this.initializeFromUrl()}unmounted(){this.detachScrollListener(),this.searchBox&&this.searchBox.unmounted&&this.searchBox.unmounted(),this.resetState()}setupSubscriptions(){C.productList.subscribe([`loading`],()=>{this.renderLoading()}),C.productList.subscribe([`isLoadingMore`],()=>{this.renderInfiniteScrollLoading()}),C.productList.subscribe([`products`],()=>{this.renderProducts()}),C.productList.subscribe([`totalProducts`],()=>{this.updateProductCount()}),C.productList.subscribe([`error`],()=>{this.renderError()}),C.productList.subscribe([`sort`,`category`,`searchQuery`,`pageSize`],()=>{C.productList.loadProducts()})}resetState(){this.productItems=[]}initializeFromUrl(){let e=C.productList.syncFromUrl();e||C.productList.loadProducts()}getLoadingIndicatorHtml(){return`
      <div class="col-span-2 text-center py-8">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" 
                  d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
        </div>
      </div>
    `}getSkeletonProductItemsHtml(e){return Array.from({length:e},()=>`
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
        <div class="aspect-square bg-gray-200"></div>
        <div class="p-3">
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div class="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    `).join(``)}getEmptyStateHtml(){return`
      <div class="col-span-2 text-center py-8 text-gray-500">
        검색 결과가 없습니다.
      </div>
    `}attachScrollListener(){this.handleScroll=this.handleScroll.bind(this),window.addEventListener(`scroll`,this.handleScroll)}detachScrollListener(){this.handleScroll&&window.removeEventListener(`scroll`,this.handleScroll)}handleScroll(){let{loading:e,isLoadingMore:t,hasMore:n}=C.productList.state;if(e||t||!n)return;let{scrollTop:r,scrollHeight:i,clientHeight:a}=document.documentElement,o=r+a>=i-200,s=i===0||a===0;(o||s)&&C.productList.loadMoreProducts()}renderLoading(){let e=document.getElementById(`products-grid`);if(e){let{loading:t,products:n}=C.productList.state,r=t&&n.length===0;r&&(e.style.display=`grid`,e.innerHTML=this.getSkeletonProductItemsHtml(8))}}renderProducts(){let e=document.getElementById(`products-grid`);if(!e)return;let{products:t}=C.productList.state;if(this.productItems=[],t.length===0){e.style.display=`none`,this.showEmptyState(!0);return}e.style.display=`grid`,this.showEmptyState(!1);let n=t.map(e=>{let t=new T(e);return this.productItems.push(t),t.render()}).join(``);e.innerHTML=n,this.productItems.forEach(e=>e.mounted())}renderProductCount(){let{totalProducts:e}=C.productList.state;return e==null?`총 0개의 상품`:`총 ${e}개의 상품`}updateProductCount(){let e=document.querySelector(`.product-count`);e&&(e.textContent=this.renderProductCount())}renderInfiniteScrollLoading(){let e=document.getElementById(`products-grid`),t=document.querySelector(`.scroll-loading-indicator`),{isLoadingMore:n}=C.productList.state;n&&(e.innerHTML+=this.getSkeletonProductItemsHtml(8),t.style.display=n?`block`:`none`)}renderError(){let{error:e}=C.productList.state;e&&console.error(`상품 로딩 에러:`,e)}showEmptyState(e){let t=document.querySelector(`.empty-state`);t&&(t.style.display=e?`block`:`none`)}render(){let e=this.searchBox.render(),t=this.renderProductCount(),n=this.getLoadingIndicatorHtml(),r=this.getSkeletonProductItemsHtml(8),i=this.getEmptyStateHtml(),a=document.getElementById(`header-title`);return a.textContent=`쇼핑몰`,`
      <!-- 검색 및 필터 -->
      ${e}

      <!-- 상품 목록 영역 -->
      <div class="mb-6">
        <div>
          <!-- 상품 개수 정보 -->
          <div class="product-count mb-4 text-sm text-gray-600">
            ${t}            
          </div>

          <!-- 빈 상태 (검색 결과 없음) -->
          <div class="empty-state mb-6" style="display: none;">
            ${i}
          </div>

          <!-- 상품 그리드 -->
          <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
            ${r}
          </div>

          <!-- 하단 로딩 인디케이터 (무한 스크롤용) -->
          <div class="scroll-loading-indicator text-center py-4" style="display: none;">
            ${n}
          </div>
        </div>
      </div>
    `}},L=I,R=class{constructor(e={}){this.options={initialValue:1,min:1,max:999,onChange:null,...e},this.currentValue=this.options.initialValue,this.elementId=`quantity`}setValue(e,t=!0){let n=parseInt(e)||this.options.min,r=Math.max(this.options.min,Math.min(this.options.max,n));this.currentValue!==r&&(this.currentValue=r,this.updateInputValue(),t&&this.options.onChange&&this.options.onChange(this.currentValue))}getValue(){return this.currentValue}increaseQuantity(){this.currentValue>=this.options.max||this.setValue(this.currentValue+1)}decreaseQuantity(){this.currentValue<=this.options.min||this.setValue(this.currentValue-1)}updateInputValue(){let e=document.getElementById(`${this.elementId}-input`);e&&e.value!==this.currentValue.toString()&&(e.value=this.currentValue)}handleIncreaseClick=()=>{this.increaseQuantity()};handleDecreaseClick=()=>{this.decreaseQuantity()};handleInputChange=e=>{let t=e.target.value;this.setValue(t)};handleInputBlur=e=>{(!e.target.value||isNaN(e.target.value))&&this.updateInputValue()};attachEvents(){let e=document.getElementById(`${this.elementId}-decrease`),t=document.getElementById(`${this.elementId}-increase`),n=document.getElementById(`${this.elementId}-input`);e&&e.addEventListener(`click`,this.handleDecreaseClick),t&&t.addEventListener(`click`,this.handleIncreaseClick),n&&(n.addEventListener(`input`,this.handleInputChange),n.addEventListener(`blur`,this.handleInputBlur))}detachEvents(){let e=document.getElementById(`${this.elementId}-decrease`),t=document.getElementById(`${this.elementId}-increase`),n=document.getElementById(`${this.elementId}-input`);e&&e.removeEventListener(`click`,this.handleDecreaseClick),t&&t.removeEventListener(`click`,this.handleIncreaseClick),n&&(n.removeEventListener(`input`,this.handleInputChange),n.removeEventListener(`blur`,this.handleInputBlur))}mounted(){this.attachEvents(),this.updateInputValue()}unmounted(){this.detachEvents()}render(){return`
      <div class="flex items-center">
        <button id="${this.elementId}-decrease" 
                class="w-8 h-8 flex items-center justify-center border border-gray-300 
                rounded-l-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <input type="number" 
               id="${this.elementId}-input" 
               value="${this.currentValue}" 
               min="${this.options.min}" 
               max="${this.options.max}" 
               class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
               focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        <button id="${this.elementId}-increase" 
                class="w-8 h-8 flex items-center justify-center border border-gray-300 
                rounded-r-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    `}},ee=R,z=class{constructor(e){this.product=e,this.maxSize=19}mounted(){this.setupSubscriptions(),this.loadRelatedProducts()}unmounted(){this.detachEvents()}setupSubscriptions(){C.productDetail.subscribe([`relatedProductsLoading`],()=>{this.renderLoading()}),C.productDetail.subscribe([`relatedProducts`],()=>{this.renderRelatedProducts()}),C.productDetail.subscribe([`relatedProductsError`],()=>{this.renderError()})}setRelatedProductsLoading(e){C.productDetail.setState({relatedProductsLoading:e})}setRelatedProducts(e){C.productDetail.setState({relatedProducts:e})}setRelatedProductsError(e){C.productDetail.setState({relatedProductsError:e})}async loadRelatedProducts(){this.setRelatedProductsLoading(!0);try{let e=this.product,t=e.category1,n=e.category2,r={limit:this.maxSize+5,...t&&{category1:t},...n&&{category2:n},sort:`price_asc`},i=await o(r);this.setRelatedProducts(i.products.filter(t=>t.productId!==e.productId).slice(0,this.maxSize))}catch(e){console.error(`관련 상품 로드 실패:`,e),this.setRelatedProductsError(e.message)}finally{this.setRelatedProductsLoading(!1)}}handleProductClick=()=>{let e=document.querySelectorAll(`[data-product-id]`);e&&e.forEach(e=>{e.addEventListener(`click`,()=>{window.history.pushState({},``,`/product/${e.dataset.productId}`),window.dispatchEvent(new Event(`popstate`))})})};attachEvents(){}detachEvents(){}renderLoading(){let e=document.getElementById(`related-products-grid`),t=C.productDetail.state.relatedProductsLoading;!e||!t||(e.innerHTML=`
      <div class="p-4">
        <div class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p class="text-sm text-gray-600">관련 상품을 불러오는 중...</p>
        </div>
      </div>
    `)}renderRelatedProducts(){let e=document.getElementById(`related-products-grid`),t=C.productDetail.state.relatedProducts;!e||!t||(e.innerHTML=`
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
        <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-2 gap-3 responsive-grid">
          ${t.map(e=>{let t=parseInt(e.lprice).toLocaleString();return`
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" 
                    data-product-id="${e.productId}">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="${e.image}" 
                        alt="${e.title}" 
                        class="w-full h-full object-cover" 
                        loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  ${e.title}
                </h3>
                <p class="text-sm font-bold text-blue-600">
                  ${t}원
                </p>
              </div>
            `}).join(``)}
        </div>
      </div>
    `,this.handleProductClick())}renderError(){let e=document.getElementById(`related-products-grid`),t=C.productDetail.state.relatedProductsError;!e||!t||(e.innerHTML=`
      <div class="p-4">
        <div class="text-center py-8">
          <p class="text-sm text-gray-500">관련 상품을 불러올 수 없습니다.</p>
        </div>
      </div>
    `)}render(){return`
      <div id="related-products-grid" class="bg-white rounded-lg shadow-sm">
        <div class="p-4">
          <div class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p class="text-sm text-gray-600">관련 상품을 불러오는 중...</p>
          </div>
        </div>
      </div>
    `}},B=z,V=class{constructor(e){this.productId=e,this.quantitySelector=null,this.relatedProducts=null,this.unsubscribe=null}mounted(){this.setupSubscriptions(),C.productDetail.loadProduct(this.productId)}unmounted(){this.quantitySelector&&(this.quantitySelector.unmounted(),this.quantitySelector=null),this.relatedProducts&&(this.relatedProducts.unmounted(),this.relatedProducts=null),C.productDetail.reset(),this.unsubscribe&&this.unsubscribe()}setupSubscriptions(){C.productDetail.subscribe([`loading`],()=>{this.renderLoading()}),C.productDetail.subscribe([`product`],()=>{this.renderProduct()}),C.productDetail.subscribe([`error`],()=>{this.renderError()})}handleAddToCart=()=>{let{product:e}=C.productDetail.state;if(!e||!this.quantitySelector)return;let t=this.quantitySelector.getValue(),n=this.createProductData(e,t);C.addProductToCart(n)};createProductData(e,t){return{id:e.productId,title:e.title,name:e.title,price:parseInt(e.lprice),image:e.image,quantity:t,category1:e.category1,category2:e.category2}}goToList(e=``,t=``){let n=C.productList.state,r=new URLSearchParams;e&&r.set(`category1`,e),t&&r.set(`category2`,t),n.sort&&r.set(`sort`,n.sort),n.search&&r.set(`search`,n.search),n.page>1&&r.set(`page`,n.page);let i=r.toString();window.location.href=i?`/?${i}`:`/`}attachEvents(){this.quantitySelector&&this.quantitySelector.mounted(),this.relatedProducts&&this.relatedProducts.mounted();let e=document.getElementById(`add-to-cart-btn`);e&&e.addEventListener(`click`,this.handleAddToCart);let t=document.querySelectorAll(`.back-to-list-btn`);t.forEach(e=>{e.addEventListener(`click`,()=>this.goToList())});let n=document.querySelectorAll(`.breadcrumb-link`);n.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.category,n=e.target.dataset.subcategory;this.goToList(t,n)})})}getLoadingIndicatorHtml(){return`
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    `}renderLoading(){let{loading:e}=C.productDetail.state;if(!e)return;let t=document.getElementById(`page-content`);t&&(t.innerHTML=this.getLoadingIndicatorHtml())}renderError(){let{error:e}=C.productDetail.state;if(!e)return;let t=document.getElementById(`page-content`);t&&(t.innerHTML=`
      <div class="container mx-auto px-4 py-8">
        <div class="text-center py-16">
          <div class="mb-4">
            <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">상품을 찾을 수 없습니다</h2>
          <p class="text-gray-600 mb-6">${e||`상품 정보를 불러오는데 실패했습니다.`}</p>
          <button 
            class="back-to-list-btn bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    `)}renderProduct(){let{product:e}=C.productDetail.state;if(!e)return;let t=document.getElementById(`page-content`);if(!t)return;let n=parseInt(e.lprice).toLocaleString();this.quantitySelector=new ee({initialValue:1,min:1,max:999,onChange:()=>{}}),this.relatedProducts=new B(e),t.innerHTML=`
      <!-- 브레드크럼 -->
      ${this.renderBreadcrumb(e)}

      <!-- 상품 상세 정보 -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="p-4">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img src="${e.image}" 
                  alt="${e.title}" 
                  class="w-full h-full object-cover">
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">${e.brand||``}</p>
            <h1 class="text-xl font-bold text-gray-900 mb-3">${e.title}</h1>
            <div class="mb-4">
              <span class="text-2xl font-bold text-blue-600">${n}원</span>
            </div>
            <div class="text-sm text-gray-700 leading-relaxed mb-6">
              ${e.description||``}
            </div>
          </div>
        </div>

        <!-- 수량 선택 및 액션 -->
        <div class="border-t border-gray-200 p-4">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-gray-900">수량</span>
            <div id="quantity-selector-container">
              ${this.quantitySelector.render()}
            </div>
          </div>
          <button 
            id="add-to-cart-btn" 
            data-product-id="${e.productId}" 
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            장바구니 담기
          </button>
        </div>
      </div>

      <!-- 상품 목록으로 이동 -->
      <div class="mb-6">
        <button 
          class="back-to-list-btn block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors"
        >
          상품 목록으로 돌아가기
        </button>
      </div>

      <!-- 관련 상품 -->
      ${this.relatedProducts.render()}
    `,this.attachEvents()}renderBreadcrumb(e){let{category1:t,category2:n}=e,r=`
      <nav class="mb-4">
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            data-category="" 
            class="breadcrumb-link hover:text-blue-600 transition-colors"
          >홈</button>
    `;return t&&(r+=`
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button 
          data-category="${t}"
          class="breadcrumb-link hover:text-blue-600 transition-colors"
        >${t}</button>
      `),n&&(r+=`
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button 
          data-category="${t}" 
          data-subcategory="${n}"
          class="breadcrumb-link hover:text-blue-600 transition-colors"
        >${n}</button>
      `),r+=`
      </div></nav>
    `,r}render(){let e=this.getLoadingIndicatorHtml(),t=document.getElementById(`header-title`);return t.textContent=`상품 상세`,`
      ${e}
    `}},H=V,U=class{constructor(){}render(){return`
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
          </defs>
          
          <!-- 404 Numbers -->
          <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
          
          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          
          <!-- Message -->
          <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
          
          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
        </svg>
        
        <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
      </div>
    `}},W=U,G=class{constructor(){this.cartCount=0}updateCartCount(){let{cart:e}=C.cart.getState();this.cartCount=e.length;let t=document.getElementById(`cart-badge`);t&&(this.cartCount>0?(t.textContent=this.cartCount>99?`99+`:this.cartCount.toString(),t.style.display=`block`):t.style.display=`none`)}handleCartClick=()=>{C.cart.toggleModal()};setupSubscriptions(){C.cart.subscribe(`cart`,e=>{this.updateCartCount(e)})}attachEvents(){let e=document.getElementById(`cart-icon-btn`);e&&e.addEventListener(`click`,this.handleCartClick)}mounted(){this.setupSubscriptions(),this.attachEvents(),this.updateCartCount(C.cart.getState(`cart`))}unmounted(){C.cart.unsubscribeAll()}render(){return`
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900">
              <a id="header-title" href="/" data-link="">쇼핑몰</a>
            </h1>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <!-- 장바구니 개수 배지 -->
                <span id="cart-badge" 
                      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                      style="display: none;">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    `}},K=G,q=class{constructor(){}unmounted(){}render(){return`
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    `}},J=q;const Y=`/front_6th_chapter1-1`,X=(e=window.location.pathname)=>e.startsWith(Y)?e.slice(21)||`/`:e,Z=e=>Y+e;var Q=class{constructor(){this.routes={},this.currentPage=null,this.header=null,this.footer=null}addRoute(e,t){this.routes[e]=t}init(){this.createAppStructure(),this.handleRoute(),window.addEventListener(`popstate`,()=>{history.replaceState({isPopState:!0},``),this.handleRoute()})}createAppStructure(){let e=document.getElementById(`root`);e&&(this.header&&this.header.unmounted(),this.footer&&this.footer.unmounted(),this.header=new K,this.footer=new J,e.innerHTML=`
      <div class="min-h-screen bg-gray-50">
        ${this.header.render()}
        <main id="page-content" class="max-w-md mx-auto px-4 py-4"></main>
        <div id="toast-container"></div>
        ${this.footer.render()}
      </div>
    `,this.header.mounted&&this.header.mounted(),this.footer.mounted&&this.footer.mounted())}navigate(e){let t=Z(e);history.pushState({isPopState:!1},``,t),this.handleRoute()}async cleanupCurrentPage(){if(this.currentPage){typeof this.currentPage.cleanup==`function`&&await this.currentPage.cleanup(),typeof this.currentPage.unmounted==`function`&&await this.currentPage.unmounted();let e=document.getElementById(`page-content`);e&&(e.innerHTML=``),this.currentPage=null}}async handleRoute(){await this.cleanupCurrentPage();let e=X(),t=new URLSearchParams(window.location.search),n=null,r={};for(let i in this.routes){let a=[],o=i.replace(/:([^/]+)/g,(e,t)=>(a.push(t),`([^/]+)`)),s=null;try{s=e.match(RegExp(`^${o}$`))}catch{continue}if(s){if(a.some((e,t)=>!s[t+1]))continue;n=this.routes[i],a.forEach((e,t)=>{r[e]=s[t+1]});for(let[e,n]of t.entries())r[e]=n;break}}n?await n(r):this.routes[`*`]&&await this.routes[`*`]()}async renderPage(e){let t=document.getElementById(`page-content`);t||(this.createAppStructure(),t=document.getElementById(`page-content`)),t&&(t.innerHTML=`
        <div class="flex justify-center items-center min-h-screen">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      `,t.innerHTML=e.render(),this.currentPage=e,e.mounted&&await e.mounted())}};const $=new Q;$.addRoute(`/`,async()=>{let e=new L;await $.renderPage(e)}),$.addRoute(`/product/:productId`,async e=>{if(!e.productId){let e=new W;await $.renderPage(e);return}let t=new H(e.productId);await $.renderPage(t)}),$.addRoute(`*`,async()=>{let e=new W;await $.renderPage(e)});var te=$,ne=class{constructor(){this.unsubscribe=null}mounted(){this.unsubscribe=C.ui.subscribe([`toast`],e=>{this.render(e)})}unmounted(){this.unsubscribe&&this.unsubscribe()}getToastIcon(e){switch(e){case`success`:return`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`;case`error`:return`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;case`info`:default:return`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`}}getToastColor(e){switch(e){case`success`:return`bg-green-600`;case`error`:return`bg-red-600`;case`info`:default:return`bg-blue-600`}}render(e){let t=document.getElementById(`toast-container`);if(!t)return;if(!e){t.innerHTML=``;return}let{message:n,type:r=`info`}=e,i=this.getToastColor(r),a=this.getToastIcon(r);t.innerHTML=`
      <div class="fixed top-4 right-4 flex flex-col gap-2 items-end z-50">
        <div class="${i} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${a}
            </svg>
          </div>
          <p class="text-sm font-medium">${n}</p>
          <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    `;let o=document.getElementById(`toast-close-btn`);o&&o.addEventListener(`click`,()=>{C.ui.hideToast()})}},re=ne;function ie(){te.init();let e=new re;e.mounted()}const ae=()=>r(async()=>{let{worker:e}=await import(`./browser-CsBWiKON.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`}));ae().then(()=>{ie()});
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[605],{357:function(t,e,i){"use strict";var s,n;t.exports=(null==(s=i.g.process)?void 0:s.env)&&"object"==typeof(null==(n=i.g.process)?void 0:n.env)?i.g.process:i(8081)},8081:function(t){!function(){var e={229:function(t){var e,i,s,n=t.exports={};function r(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function o(t){if(e===setTimeout)return setTimeout(t,0);if((e===r||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(i){try{return e.call(null,t,0)}catch(i){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:r}catch(t){e=r}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(t){i=a}}();var u=[],h=!1,c=-1;function l(){h&&s&&(h=!1,s.length?u=s.concat(u):c=-1,u.length&&f())}function f(){if(!h){var t=o(l);h=!0;for(var e=u.length;e;){for(s=u,u=[];++c<e;)s&&s[c].run();c=-1,e=u.length}s=null,h=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];u.push(new d(t,e)),1!==u.length||h||o(f)},d.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw Error("process.chdir is not supported")},n.umask=function(){return 0}}},i={};function s(t){var n=i[t];if(void 0!==n)return n.exports;var r=i[t]={exports:{}},a=!0;try{e[t](r,r.exports,s),a=!1}finally{a&&delete i[t]}return r.exports}s.ab="//";var n=s(229);t.exports=n}()},4939:function(t,e,i){"use strict";i.d(e,{j:function(){return r}});var s=i(9010),n=i(6298),r=new class extends s.l{#t;#e;#i;constructor(){super(),this.#i=t=>{if(!n.sk&&window.addEventListener){let e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#e||this.setEventListener(this.#i)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#i=t,this.#e?.(),this.#e=t(t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()})}setFocused(t){this.#t!==t&&(this.#t=t,this.onFocus())}onFocus(){let t=this.isFocused();this.listeners.forEach(e=>{e(t)})}isFocused(){return"boolean"==typeof this.#t?this.#t:globalThis.document?.visibilityState!=="hidden"}}},2812:function(t,e,i){"use strict";i.d(e,{R:function(){return o},m:function(){return a}});var s=i(9948),n=i(3494),r=i(924),a=class extends n.F{#s;#n;#r;constructor(t){super(),this.mutationId=t.mutationId,this.#n=t.mutationCache,this.#s=[],this.state=t.state||o(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#s.includes(t)||(this.#s.push(t),this.clearGcTimeout(),this.#n.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#s=this.#s.filter(e=>e!==t),this.scheduleGc(),this.#n.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#s.length||("pending"===this.state.status?this.scheduleGc():this.#n.remove(this))}continue(){return this.#r?.continue()??this.execute(this.state.variables)}async execute(t){this.#r=(0,r.Mz)({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{this.#a({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#a({type:"pause"})},onContinue:()=>{this.#a({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#n.canRun(this)});let e="pending"===this.state.status,i=!this.#r.canStart();try{if(!e){this.#a({type:"pending",variables:t,isPaused:i}),await this.#n.config.onMutate?.(t,this);let e=await this.options.onMutate?.(t);e!==this.state.context&&this.#a({type:"pending",context:e,variables:t,isPaused:i})}let s=await this.#r.start();return await this.#n.config.onSuccess?.(s,t,this.state.context,this),await this.options.onSuccess?.(s,t,this.state.context),await this.#n.config.onSettled?.(s,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(s,null,t,this.state.context),this.#a({type:"success",data:s}),s}catch(e){try{throw await this.#n.config.onError?.(e,t,this.state.context,this),await this.options.onError?.(e,t,this.state.context),await this.#n.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,e,t,this.state.context),e}finally{this.#a({type:"error",error:e})}}finally{this.#n.runNext(this)}}#a(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),s.V.batch(()=>{this.#s.forEach(e=>{e.onMutationUpdate(t)}),this.#n.notify({mutation:this,type:"updated",action:t})})}};function o(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}},9948:function(t,e,i){"use strict";i.d(e,{V:function(){return s}});var s=function(){let t=[],e=0,i=t=>{t()},s=t=>{t()},n=t=>setTimeout(t,0),r=s=>{e?t.push(s):n(()=>{i(s)})},a=()=>{let e=t;t=[],e.length&&n(()=>{s(()=>{e.forEach(t=>{i(t)})})})};return{batch:t=>{let i;e++;try{i=t()}finally{--e||a()}return i},batchCalls:t=>(...e)=>{r(()=>{t(...e)})},schedule:r,setNotifyFunction:t=>{i=t},setBatchNotifyFunction:t=>{s=t},setScheduler:t=>{n=t}}}()},9937:function(t,e,i){"use strict";i.d(e,{N:function(){return r}});var s=i(9010),n=i(6298),r=new class extends s.l{#o=!0;#e;#i;constructor(){super(),this.#i=t=>{if(!n.sk&&window.addEventListener){let e=()=>t(!0),i=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",i,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",i)}}}}onSubscribe(){this.#e||this.setEventListener(this.#i)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#i=t,this.#e?.(),this.#e=t(this.setOnline.bind(this))}setOnline(t){this.#o!==t&&(this.#o=t,this.listeners.forEach(e=>{e(t)}))}isOnline(){return this.#o}}},2459:function(t,e,i){"use strict";i.d(e,{A:function(){return o},z:function(){return u}});var s=i(6298),n=i(9948),r=i(924),a=i(3494),o=class extends a.F{#u;#h;#c;#r;#l;#f;constructor(t){super(),this.#f=!1,this.#l=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.#c=t.cache,this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.#u=t.state||function(t){let e="function"==typeof t.initialData?t.initialData():t.initialData,i=void 0!==e,s=i?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:i?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:i?"success":"pending",fetchStatus:"idle"}}(this.options),this.state=this.#u,this.scheduleGc()}get meta(){return this.options.meta}setOptions(t){this.options={...this.#l,...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#c.remove(this)}setData(t,e){let i=(0,s.oE)(this.state.data,t,this.options);return this.#a({data:i,type:"success",dataUpdatedAt:e?.updatedAt,manual:e?.manual}),i}setState(t,e){this.#a({type:"setState",state:t,setStateOptions:e})}cancel(t){let e=this.#r?.promise;return this.#r?.cancel(t),e?e.then(s.ZT).catch(s.ZT):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#u)}isActive(){return this.observers.some(t=>!1!==t.options.enabled)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return!!this.state.isInvalidated||(this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):void 0===this.state.data)}isStaleByTime(t=0){return this.state.isInvalidated||void 0===this.state.data||!(0,s.Kp)(this.state.dataUpdatedAt,t)}onFocus(){let t=this.observers.find(t=>t.shouldFetchOnWindowFocus());t?.refetch({cancelRefetch:!1}),this.#r?.continue()}onOnline(){let t=this.observers.find(t=>t.shouldFetchOnReconnect());t?.refetch({cancelRefetch:!1}),this.#r?.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.#c.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(this.#r&&(this.#f?this.#r.cancel({revert:!0}):this.#r.cancelRetry()),this.scheduleGc()),this.#c.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#a({type:"invalidate"})}fetch(t,e){if("idle"!==this.state.fetchStatus){if(void 0!==this.state.data&&e?.cancelRefetch)this.cancel({silent:!0});else if(this.#r)return this.#r.continueRetry(),this.#r.promise}if(t&&this.setOptions(t),!this.options.queryFn){let t=this.observers.find(t=>t.options.queryFn);t&&this.setOptions(t.options)}let i=new AbortController,n={queryKey:this.queryKey,meta:this.meta},a=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(this.#f=!0,i.signal)})};a(n);let o={fetchOptions:e,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>this.options.queryFn&&this.options.queryFn!==s.CN?(this.#f=!1,this.options.persister)?this.options.persister(this.options.queryFn,n,this):this.options.queryFn(n):Promise.reject(Error(`Missing queryFn: '${this.options.queryHash}'`))};a(o),this.options.behavior?.onFetch(o,this),this.#h=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==o.fetchOptions?.meta)&&this.#a({type:"fetch",meta:o.fetchOptions?.meta});let u=t=>{(0,r.DV)(t)&&t.silent||this.#a({type:"error",error:t}),(0,r.DV)(t)||(this.#c.config.onError?.(t,this),this.#c.config.onSettled?.(this.state.data,t,this)),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.#r=(0,r.Mz)({fn:o.fetchFn,abort:i.abort.bind(i),onSuccess:t=>{if(void 0===t){u(Error(`${this.queryHash} data is undefined`));return}this.setData(t),this.#c.config.onSuccess?.(t,this),this.#c.config.onSettled?.(t,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:u,onFail:(t,e)=>{this.#a({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#a({type:"pause"})},onContinue:()=>{this.#a({type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0}),this.#r.start()}#a(t){this.state=(e=>{switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,...u(e.data,this.options),fetchMeta:t.meta??null};case"success":return{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let i=t.error;if((0,r.DV)(i)&&i.revert&&this.#h)return{...this.#h,fetchStatus:"idle"};return{...e,error:i,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:i,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),n.V.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate()}),this.#c.notify({query:this,type:"updated",action:t})})}};function u(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:(0,r.Kw)(e.networkMode)?"fetching":"paused",...void 0===t&&{error:null,status:"pending"}}}},2443:function(t,e,i){"use strict";i.d(e,{S:function(){return p}});var s=i(6298),n=i(2459),r=i(9948),a=i(9010),o=class extends a.l{constructor(t={}){super(),this.config=t,this.#d=new Map}#d;build(t,e,i){let r=e.queryKey,a=e.queryHash??(0,s.Rm)(r,e),o=this.get(a);return o||(o=new n.A({cache:this,queryKey:r,queryHash:a,options:t.defaultQueryOptions(e),state:i,defaultOptions:t.getQueryDefaults(r)}),this.add(o)),o}add(t){this.#d.has(t.queryHash)||(this.#d.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){let e=this.#d.get(t.queryHash);e&&(t.destroy(),e===t&&this.#d.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){r.V.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return this.#d.get(t)}getAll(){return[...this.#d.values()]}find(t){let e={exact:!0,...t};return this.getAll().find(t=>(0,s._x)(e,t))}findAll(t={}){let e=this.getAll();return Object.keys(t).length>0?e.filter(e=>(0,s._x)(t,e)):e}notify(t){r.V.batch(()=>{this.listeners.forEach(e=>{e(t)})})}onFocus(){r.V.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){r.V.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},u=i(2812),h=class extends a.l{constructor(t={}){super(),this.config=t,this.#p=new Map,this.#y=Date.now()}#p;#y;build(t,e,i){let s=new u.m({mutationCache:this,mutationId:++this.#y,options:t.defaultMutationOptions(e),state:i});return this.add(s),s}add(t){let e=c(t),i=this.#p.get(e)??[];i.push(t),this.#p.set(e,i),this.notify({type:"added",mutation:t})}remove(t){let e=c(t);if(this.#p.has(e)){let i=this.#p.get(e)?.filter(e=>e!==t);i&&(0===i.length?this.#p.delete(e):this.#p.set(e,i))}this.notify({type:"removed",mutation:t})}canRun(t){let e=this.#p.get(c(t))?.find(t=>"pending"===t.state.status);return!e||e===t}runNext(t){let e=this.#p.get(c(t))?.find(e=>e!==t&&e.state.isPaused);return e?.continue()??Promise.resolve()}clear(){r.V.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}getAll(){return[...this.#p.values()].flat()}find(t){let e={exact:!0,...t};return this.getAll().find(t=>(0,s.X7)(e,t))}findAll(t={}){return this.getAll().filter(e=>(0,s.X7)(t,e))}notify(t){r.V.batch(()=>{this.listeners.forEach(e=>{e(t)})})}resumePausedMutations(){let t=this.getAll().filter(t=>t.state.isPaused);return r.V.batch(()=>Promise.all(t.map(t=>t.continue().catch(s.ZT))))}};function c(t){return t.options.scope?.id??String(t.mutationId)}var l=i(4939),f=i(9937);function d(t,{pages:e,pageParams:i}){let s=e.length-1;return t.getNextPageParam(e[s],e,i[s],i)}var p=class{#m;#n;#l;#v;#b;#g;#w;#C;constructor(t={}){this.#m=t.queryCache||new o,this.#n=t.mutationCache||new h,this.#l=t.defaultOptions||{},this.#v=new Map,this.#b=new Map,this.#g=0}mount(){this.#g++,1===this.#g&&(this.#w=l.j.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#m.onFocus())}),this.#C=f.N.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#m.onOnline())}))}unmount(){this.#g--,0===this.#g&&(this.#w?.(),this.#w=void 0,this.#C?.(),this.#C=void 0)}isFetching(t){return this.#m.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#n.findAll({...t,status:"pending"}).length}getQueryData(t){let e=this.defaultQueryOptions({queryKey:t});return this.#m.get(e.queryHash)?.state.data}ensureQueryData(t){let e=this.getQueryData(t.queryKey);if(void 0===e)return this.fetchQuery(t);{let i=this.defaultQueryOptions(t),s=this.#m.build(this,i);return t.revalidateIfStale&&s.isStaleByTime(i.staleTime)&&this.prefetchQuery(i),Promise.resolve(e)}}getQueriesData(t){return this.#m.findAll(t).map(({queryKey:t,state:e})=>[t,e.data])}setQueryData(t,e,i){let n=this.defaultQueryOptions({queryKey:t}),r=this.#m.get(n.queryHash),a=r?.state.data,o=(0,s.SE)(e,a);if(void 0!==o)return this.#m.build(this,n).setData(o,{...i,manual:!0})}setQueriesData(t,e,i){return r.V.batch(()=>this.#m.findAll(t).map(({queryKey:t})=>[t,this.setQueryData(t,e,i)]))}getQueryState(t){let e=this.defaultQueryOptions({queryKey:t});return this.#m.get(e.queryHash)?.state}removeQueries(t){let e=this.#m;r.V.batch(()=>{e.findAll(t).forEach(t=>{e.remove(t)})})}resetQueries(t,e){let i=this.#m,s={type:"active",...t};return r.V.batch(()=>(i.findAll(t).forEach(t=>{t.reset()}),this.refetchQueries(s,e)))}cancelQueries(t={},e={}){let i={revert:!0,...e};return Promise.all(r.V.batch(()=>this.#m.findAll(t).map(t=>t.cancel(i)))).then(s.ZT).catch(s.ZT)}invalidateQueries(t={},e={}){return r.V.batch(()=>{if(this.#m.findAll(t).forEach(t=>{t.invalidate()}),"none"===t.refetchType)return Promise.resolve();let i={...t,type:t.refetchType??t.type??"active"};return this.refetchQueries(i,e)})}refetchQueries(t={},e){let i={...e,cancelRefetch:e?.cancelRefetch??!0};return Promise.all(r.V.batch(()=>this.#m.findAll(t).filter(t=>!t.isDisabled()).map(t=>{let e=t.fetch(void 0,i);return i.throwOnError||(e=e.catch(s.ZT)),"paused"===t.state.fetchStatus?Promise.resolve():e}))).then(s.ZT)}fetchQuery(t){let e=this.defaultQueryOptions(t);void 0===e.retry&&(e.retry=!1);let i=this.#m.build(this,e);return i.isStaleByTime(e.staleTime)?i.fetch(e):Promise.resolve(i.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(s.ZT).catch(s.ZT)}fetchInfiniteQuery(t){var e;return t.behavior=(e=t.pages,{onFetch:(t,i)=>{let n=async()=>{let i;let n=t.options,r=t.fetchOptions?.meta?.fetchMore?.direction,a=t.state.data?.pages||[],o=t.state.data?.pageParams||[],u=!1,h=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(t.signal.aborted?u=!0:t.signal.addEventListener("abort",()=>{u=!0}),t.signal)})},c=t.options.queryFn&&t.options.queryFn!==s.CN?t.options.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${t.options.queryHash}'`)),l=async(e,i,n)=>{if(u)return Promise.reject();if(null==i&&e.pages.length)return Promise.resolve(e);let r={queryKey:t.queryKey,pageParam:i,direction:n?"backward":"forward",meta:t.options.meta};h(r);let a=await c(r),{maxPages:o}=t.options,l=n?s.Ht:s.VX;return{pages:l(e.pages,a,o),pageParams:l(e.pageParams,i,o)}};if(r&&a.length){let t="backward"===r,e={pages:a,pageParams:o},s=(t?function(t,{pages:e,pageParams:i}){return t.getPreviousPageParam?.(e[0],e,i[0],i)}:d)(n,e);i=await l(e,s,t)}else{i=await l({pages:[],pageParams:[]},o[0]??n.initialPageParam);let t=e??a.length;for(let e=1;e<t;e++){let t=d(n,i);i=await l(i,t)}}return i};t.options.persister?t.fetchFn=()=>t.options.persister?.(n,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},i):t.fetchFn=n}}),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(s.ZT).catch(s.ZT)}resumePausedMutations(){return f.N.isOnline()?this.#n.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#m}getMutationCache(){return this.#n}getDefaultOptions(){return this.#l}setDefaultOptions(t){this.#l=t}setQueryDefaults(t,e){this.#v.set((0,s.Ym)(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){let e=[...this.#v.values()],i={};return e.forEach(e=>{(0,s.to)(t,e.queryKey)&&(i={...i,...e.defaultOptions})}),i}setMutationDefaults(t,e){this.#b.set((0,s.Ym)(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){let e=[...this.#b.values()],i={};return e.forEach(e=>{(0,s.to)(t,e.mutationKey)&&(i={...i,...e.defaultOptions})}),i}defaultQueryOptions(t){if(t._defaulted)return t;let e={...this.#l.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=(0,s.Rm)(e.queryKey,e)),void 0===e.refetchOnReconnect&&(e.refetchOnReconnect="always"!==e.networkMode),void 0===e.throwOnError&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),!0!==e.enabled&&e.queryFn===s.CN&&(e.enabled=!1),e}defaultMutationOptions(t){return t?._defaulted?t:{...this.#l.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#m.clear(),this.#n.clear()}}},3494:function(t,e,i){"use strict";i.d(e,{F:function(){return n}});var s=i(6298),n=class{#O;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,s.PN)(this.gcTime)&&(this.#O=setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(s.sk?1/0:3e5))}clearGcTimeout(){this.#O&&(clearTimeout(this.#O),this.#O=void 0)}}},924:function(t,e,i){"use strict";i.d(e,{DV:function(){return h},Kw:function(){return o},Mz:function(){return c}});var s=i(4939),n=i(9937),r=i(6298);function a(t){return Math.min(1e3*2**t,3e4)}function o(t){return(t??"online")!=="online"||n.N.isOnline()}var u=class{constructor(t){this.revert=t?.revert,this.silent=t?.silent}};function h(t){return t instanceof u}function c(t){let e,i,h,c=!1,l=0,f=!1,d=new Promise((t,e)=>{i=t,h=e}),p=()=>s.j.isFocused()&&("always"===t.networkMode||n.N.isOnline())&&t.canRun(),y=()=>o(t.networkMode)&&t.canRun(),m=s=>{f||(f=!0,t.onSuccess?.(s),e?.(),i(s))},v=i=>{f||(f=!0,t.onError?.(i),e?.(),h(i))},b=()=>new Promise(i=>{e=t=>{(f||p())&&i(t)},t.onPause?.()}).then(()=>{e=void 0,f||t.onContinue?.()}),g=()=>{let e;if(!f){try{e=t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(m).catch(e=>{if(f)return;let i=t.retry??(r.sk?0:3),s=t.retryDelay??a,n="function"==typeof s?s(l,e):s,o=!0===i||"number"==typeof i&&l<i||"function"==typeof i&&i(l,e);if(c||!o){v(e);return}l++,t.onFail?.(l,e),(0,r._v)(n).then(()=>p()?void 0:b()).then(()=>{c?v(e):g()})})}};return{promise:d,cancel:e=>{f||(v(new u(e)),t.abort?.())},continue:()=>(e?.(),d),cancelRetry:()=>{c=!0},continueRetry:()=>{c=!1},canStart:y,start:()=>(y()?g():b().then(g),d)}}},9010:function(t,e,i){"use strict";i.d(e,{l:function(){return s}});var s=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},6298:function(t,e,i){"use strict";i.d(e,{CN:function(){return C},Ht:function(){return w},Kp:function(){return o},PN:function(){return a},Rm:function(){return c},SE:function(){return r},VS:function(){return d},VX:function(){return g},X7:function(){return h},Ym:function(){return l},ZT:function(){return n},_v:function(){return v},_x:function(){return u},oE:function(){return b},sk:function(){return s},to:function(){return f}});var s="undefined"==typeof window||"Deno"in globalThis;function n(){}function r(t,e){return"function"==typeof t?t(e):t}function a(t){return"number"==typeof t&&t>=0&&t!==1/0}function o(t,e){return Math.max(t+(e||0)-Date.now(),0)}function u(t,e){let{type:i="all",exact:s,fetchStatus:n,predicate:r,queryKey:a,stale:o}=t;if(a){if(s){if(e.queryHash!==c(a,e.options))return!1}else if(!f(e.queryKey,a))return!1}if("all"!==i){let t=e.isActive();if("active"===i&&!t||"inactive"===i&&t)return!1}return("boolean"!=typeof o||e.isStale()===o)&&(!n||n===e.state.fetchStatus)&&(!r||!!r(e))}function h(t,e){let{exact:i,status:s,predicate:n,mutationKey:r}=t;if(r){if(!e.options.mutationKey)return!1;if(i){if(l(e.options.mutationKey)!==l(r))return!1}else if(!f(e.options.mutationKey,r))return!1}return(!s||e.state.status===s)&&(!n||!!n(e))}function c(t,e){return(e?.queryKeyHashFn||l)(t)}function l(t){return JSON.stringify(t,(t,e)=>y(e)?Object.keys(e).sort().reduce((t,i)=>(t[i]=e[i],t),{}):e)}function f(t,e){return t===e||typeof t==typeof e&&!!t&&!!e&&"object"==typeof t&&"object"==typeof e&&!Object.keys(e).some(i=>!f(t[i],e[i]))}function d(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(let i in t)if(t[i]!==e[i])return!1;return!0}function p(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function y(t){if(!m(t))return!1;let e=t.constructor;if(void 0===e)return!0;let i=e.prototype;return!!(m(i)&&i.hasOwnProperty("isPrototypeOf"))}function m(t){return"[object Object]"===Object.prototype.toString.call(t)}function v(t){return new Promise(e=>{setTimeout(e,t)})}function b(t,e,i){return"function"==typeof i.structuralSharing?i.structuralSharing(t,e):!1!==i.structuralSharing?function t(e,i){if(e===i)return e;let s=p(e)&&p(i);if(s||y(e)&&y(i)){let n=s?e:Object.keys(e),r=n.length,a=s?i:Object.keys(i),o=a.length,u=s?[]:{},h=0;for(let r=0;r<o;r++){let o=s?r:a[r];!s&&void 0===e[o]&&void 0===i[o]&&n.includes(o)?(u[o]=void 0,h++):(u[o]=t(e[o],i[o]),u[o]===e[o]&&void 0!==e[o]&&h++)}return r===o&&h===r?e:u}return i}(t,e):e}function g(t,e,i=0){let s=[...t,e];return i&&s.length>i?s.slice(1):s}function w(t,e,i=0){let s=[e,...t];return i&&s.length>i?s.slice(0,-1):s}var C=Symbol()},3191:function(t,e,i){"use strict";i.d(e,{NL:function(){return a},aH:function(){return o}});var s=i(2265),n=i(7437),r=s.createContext(void 0),a=t=>{let e=s.useContext(r);if(t)return t;if(!e)throw Error("No QueryClient set, use QueryClientProvider to set one");return e},o=t=>{let{client:e,children:i}=t;return s.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),(0,n.jsx)(r.Provider,{value:e,children:i})}}}]);
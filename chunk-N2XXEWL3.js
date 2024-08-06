import{a as b}from"./chunk-7ITMQ6SW.js";import{L as w,f as m,g as C,h as y,i as g,j as S,l as u}from"./chunk-VG74EQIO.js";var k={url:"",deserializer:a=>JSON.parse(a.data),serializer:a=>JSON.stringify(a)},L="WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }",p=class a extends S{constructor(t,s){if(super(),this._socket=null,t instanceof y)this.destination=s,this.source=t;else{let n=this._config=Object.assign({},k);if(this._output=new g,typeof t=="string")n.url=t;else for(let c in t)t.hasOwnProperty(c)&&(n[c]=t[c]);if(!n.WebSocketCtor&&WebSocket)n.WebSocketCtor=WebSocket;else if(!n.WebSocketCtor)throw new Error("no WebSocket constructor can be found");this.destination=new u}}lift(t){let s=new a(this._config,this.destination);return s.operator=t,s.source=this,s}_resetState(){this._socket=null,this.source||(this.destination=new u),this._output=new g}multiplex(t,s,n){let c=this;return new y(o=>{try{c.next(t())}catch(r){o.error(r)}let e=c.subscribe({next:r=>{try{n(r)&&o.next(r)}catch(i){o.error(i)}},error:r=>o.error(r),complete:()=>o.complete()});return()=>{try{c.next(s())}catch(r){o.error(r)}e.unsubscribe()}})}_connectSocket(){let{WebSocketCtor:t,protocol:s,url:n,binaryType:c}=this._config,o=this._output,e=null;try{e=s?new t(n,s):new t(n),this._socket=e,c&&(this._socket.binaryType=c)}catch(i){o.error(i);return}let r=new m(()=>{this._socket=null,e&&e.readyState===1&&e.close()});e.onopen=i=>{let{_socket:h}=this;if(!h){e.close(),this._resetState();return}let{openObserver:_}=this._config;_&&_.next(i);let d=this.destination;this.destination=C.create(l=>{if(e.readyState===1)try{let{serializer:f}=this._config;e.send(f(l))}catch(f){this.destination.error(f)}},l=>{let{closingObserver:f}=this._config;f&&f.next(void 0),l&&l.code?e.close(l.code,l.reason):o.error(new TypeError(L)),this._resetState()},()=>{let{closingObserver:l}=this._config;l&&l.next(void 0),e.close(),this._resetState()}),d&&d instanceof u&&r.add(d.subscribe(this.destination))},e.onerror=i=>{this._resetState(),o.error(i)},e.onclose=i=>{e===this._socket&&this._resetState();let{closeObserver:h}=this._config;h&&h.next(i),i.wasClean?o.complete():o.error(i)},e.onmessage=i=>{try{let{deserializer:h}=this._config;o.next(h(i))}catch(h){o.error(h)}}}_subscribe(t){let{source:s}=this;return s?s.subscribe(t):(this._socket||this._connectSocket(),this._output.subscribe(t),t.add(()=>{let{_socket:n}=this;this._output.observers.length===0&&(n&&(n.readyState===1||n.readyState===0)&&n.close(),this._resetState())}),t)}unsubscribe(){let{_socket:t}=this;t&&(t.readyState===1||t.readyState===0)&&t.close(),this._resetState(),super.unsubscribe()}};var j=(()=>{let t=class t{constructor(){this.personalID=crypto.randomUUID(),this.connectingNotificationChannel=!1,this.connectingAnalysisLogChannel=!1,this.protocol=window.location.protocol,this.baseURL=b.baseURL.replace("http://","https://").replace("http","ws"),this.protocol==="http:"?this.baseURL=b.baseURL.replace("https://","http://").replace("http","ws"):this.baseURL=b.baseURL.replace("http://","https://").replace("http","ws")}connectNotification(){return this.connectingNotificationChannel=!0,this.notificationConnection?(this.connectingNotificationChannel=!1,this.notificationConnection):(this.notificationConnection=new p({url:`${this.baseURL}/ws/notification/alert/${this.personalID}/`,openObserver:{next:()=>{console.log("Connected to notification channel")}},closeObserver:{next:()=>{console.log("Closed connection to notification channel")}}}),this.connectingNotificationChannel=!1,this.notificationConnection)}connectAnalysisLog(){return this.connectingAnalysisLogChannel=!0,this.analysisLogConnection?(this.connectingAnalysisLogChannel=!1,this.analysisLogConnection):(this.analysisLogConnection=new p({url:`${this.baseURL}/ws/log/analysis_log/`,openObserver:{next:()=>{console.log("Connected to analysis log channel")}},closeObserver:{next:()=>{console.log("Closed connection to analysis log channel")}}}),this.connectingAnalysisLogChannel=!1,this.analysisLogConnection)}disconnectNotification(){this.notificationConnection?.complete(),this.notificationConnection=void 0}disconnectAnalysisLog(){this.analysisLogConnection?.complete(),this.analysisLogConnection=void 0}};t.\u0275fac=function(c){return new(c||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac,providedIn:"root"});let a=t;return a})();export{j as a};

import{a as I}from"./chunk-MK7P4XXY.js";import"./chunk-OV7F5RRE.js";import{$a as M,Hb as D,Ka as y,La as v,M as m,Ma as C,Oa as w,Q as p,R as d,Ra as b,Wa as x,ab as S,da as a,ea as f,qb as k,sa as g,sb as A,ta as u,ua as h,va as r,wa as l}from"./chunk-VG74EQIO.js";var F=["logContainer"];function Q(i,e){if(i&1&&(r(0,"p"),w(1),M(2,"date"),l()),i&2){let n=e.$implicit;a(),b(" [",S(2,3,n.timestamp,"short"),"] ",n.hostname,": ",n.log," ")}}var j=(()=>{let e=class e{constructor(o){this.websocketService=o,this.logMessages=[],this.websocketService.connectAnalysisLog().asObservable().subscribe(t=>{t.timestamp=new Date(t.timestamp*1e3),this.logMessages.push(t),this.logMessages.length>100&&(this.logMessages=this.logMessages.slice(1)),this.logContainer&&(this.logContainer.nativeElement.scrollTop=this.logContainer.nativeElement.scrollHeight)})}ngAfterViewInit(){}ngOnDestroy(){this.websocketService.disconnectAnalysisLog()}};e.\u0275fac=function(t){return new(t||e)(f(I))},e.\u0275cmp=p({type:e,selectors:[["app-analysis-log"]],viewQuery:function(t,s){if(t&1&&y(F,5),t&2){let c;v(c=C())&&(s.logContainer=c.first)}},standalone:!0,features:[x],decls:7,vars:0,consts:[["logContainer",""],[1,"analysis-log-main","container-fluid","bg-dark","text-light"],[1,"container","rounded-4","h-100"],[1,"container-fluid","p-5",2,"overflow-y","auto","max-height","90vh"],[1,"d-flex","flex-column","justify-content-between"]],template:function(t,s){t&1&&(r(0,"div",1)(1,"div",2)(2,"div",3,0)(4,"div",4),u(5,Q,3,6,"p",null,g),l()()()()),t&2&&(a(5),h(s.logMessages))},dependencies:[k],styles:[".analysis-log-main[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:calc(100vh - 56px);overflow:auto}"]});let i=e;return i})();var T=[{path:"analysis-log",component:j,data:{breadcrumbs:["analysis-log"]}}],V=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d({type:e}),e.\u0275inj=m({imports:[A,D.forChild(T)]});let i=e;return i})();export{V as LogModule};

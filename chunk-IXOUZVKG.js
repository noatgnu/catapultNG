import{a as I}from"./chunk-4INFQNMB.js";import{a as ae}from"./chunk-AQOP4WXO.js";import{a as re,b as se,c as me}from"./chunk-EWNG6GOD.js";import{e as oe}from"./chunk-EQB5EGJF.js";import{c as Y,e as z,f as H,g as v,i as K,j as L,k as W,l as X,m as Z,n as ee,o as te,p as ie,r as ne}from"./chunk-URRA4EOY.js";import{a as M}from"./chunk-J6EH74H5.js";import"./chunk-OV7F5RRE.js";import{$a as F,Aa as w,Da as p,Ea as d,Hb as N,M as D,Oa as a,Pa as B,Q as R,Qa as h,R as P,Va as O,W as f,Wa as G,X as b,Ya as $,ab as V,da as l,ea as g,la as E,na as x,nb as U,qa as C,qb as Q,r as j,sa as S,sb as q,ta as k,ua as y,va as r,wa as n,xa as u,zb as J}from"./chunk-VG74EQIO.js";var pe=(o,m)=>({"list-group-item list-group-item-action d-flex flex-row align-item-center g-2":!0,"bg-primary":o,"text-light":m});function ce(o,m){if(o&1){let s=w();r(0,"div",18)(1,"input",20),p("change",function(t){f(s);let i=d().$implicit,c=d();return b(c.toggleExperimentSelect(i.id,t))}),n()()}}function de(o,m){if(o&1){let s=w();r(0,"div",17),p("click",function(){let t=f(s).$implicit,i=d();return b(i.selectExperiment(t.id))}),E(1,ce,2,0,"div",18),r(2,"div",19)(3,"p")(4,"b"),a(5,"ID:"),n(),a(6),u(7,"br"),r(8,"b"),a(9,"Experiment:"),n(),a(10),n()()()}if(o&2){let s=m.$implicit,e=d();x("ngClass",$(4,pe,s.id===e.clickedExperiment,s.id===e.clickedExperiment)),l(),C(e.showSelect?1:-1),l(5),h(" ",s.id,""),l(4),h(" ",s.experiment_name," ")}}function xe(o,m){o&1&&(r(0,"div",15)(1,"div",21)(2,"div",15)(3,"p"),a(4," No experiment selected yet. "),n()()()())}function ue(o,m){if(o&1&&(r(0,"div",22)(1,"div",40),u(2,"app-bar-chart-result-summary",41),n()()),o&2){let s=d(2);l(2),x("plotType","precursor")("data",s.resultSummaries)}}function he(o,m){if(o&1&&(r(0,"option",30),a(1),n()),o&2){let s=m.$implicit;x("value",s.value),l(),B(s.vendor)}}function ve(o,m){if(o&1&&(r(0,"tr")(1,"td"),a(2),n(),r(3,"td"),a(4),n()()),o&2){let s=m.$implicit;l(2),h(" ",s.file_path," "),l(2),h(" ",s.ready_for_processing?"Yes":"No"," ")}}function _e(o,m){if(o&1){let s=w();r(0,"div",16),E(1,ue,3,2,"div",22),r(2,"form",23)(3,"div",24)(4,"label",25),a(5,"Experiment"),n(),u(6,"input",26),n(),r(7,"div",27)(8,"div",24)(9,"label",28),a(10,"Vendor"),n(),r(11,"select",29),k(12,he,2,2,"option",30,S),n()(),r(14,"div",24)(15,"label",31),a(16,"Expected Sample Number"),n(),u(17,"input",32),n(),r(18,"div",24)(19,"label",33),a(20,"Unique ID"),n(),u(21,"input",34),n()(),r(22,"div",27)(23,"div",24)(24,"b"),a(25,"Created At"),n(),a(26),F(27,"date"),n(),r(28,"div",24)(29,"b"),a(30,"Updated At"),n(),a(31),F(32,"date"),n()(),r(33,"div",35)(34,"table",36)(35,"thead")(36,"tr")(37,"th",37),a(38," File "),n(),r(39,"th",37),a(40," Ready For Processing "),n()()(),r(41,"tbody"),k(42,ve,5,2,"tr",null,S),n()()(),r(44,"div",27)(45,"button",38),p("click",function(){f(s);let t=d();return b(t.updateExperiment())}),a(46,"Update"),n(),r(47,"button",38),p("click",function(){f(s);let t=d();return b(t.openCreateAnalysisModal())}),a(48,"Create Analysis"),n(),r(49,"button",39),p("click",function(){f(s);let t=d();return b(t.deleteExperiment(t.clickedExperiment))}),a(50,"Delete"),n()()()()}if(o&2){let s=d();l(),C(s.resultSummaries.length>0?1:-1),l(),x("formGroup",s.form),l(10),y(s.vendorChoices),l(14),h(" ",V(27,4,s.form.value.created_at,"short")," "),l(5),h(" ",V(32,7,s.form.value.updated_at,"short")," "),l(11),y(s.associatedFiles)}}var A=(()=>{let m=class m{set experimentId(e){this.selectExperiment(e),this._experimentId=e}get experimentId(){return this._experimentId}constructor(e,t,i,c,T){this.activatedRoute=e,this.generalService=t,this.experimentService=i,this.fb=c,this.modal=T,this.experiments=[],this.next="",this.previous="",this.n_experiment=0,this.showSelect=!1,this.selectedExperiments=[],this.clickedExperiment=-1,this.vendorChoices=[],this.form=this.fb.group({experiment_name:new v(""),sample_count:new v,vendor:new v,created_at:new v,updated_at:new v,id:new v}),this.associatedFiles=[],this._experimentId=-1,this.resultSummaries=[],this.experimentService.getExperiments().subscribe(_=>{this.experiments=_.results,this.next=_.next,this.previous=_.previous,this.n_experiment=_.count}),this.experimentService.getVendorChoices().subscribe(_=>{this.vendorChoices=_})}ngOnInit(){this.activatedRoute.data.subscribe(e=>{this.generalService.setBreadcrumbs(e.breadcrumbs,e.breadcrumbs.join("/"))})}toggleExperimentSelect(e,t){if(t.target){let i=t.target;"checked"in i&&(i.checked?this.selectedExperiments.push(e):this.selectedExperiments=this.selectedExperiments.filter(c=>c!==e))}}selectExperiment(e){this.clickedExperiment===e?this.clickedExperiment=-1:(this.clickedExperiment=e,this.experimentService.getExperiment(e).subscribe(t=>{this.form.patchValue({experiment_name:t.experiment_name,sample_count:t.sample_count,vendor:t.vendor,created_at:new Date(t.created_at).toISOString().slice(0,10),updated_at:new Date(t.updated_at).toISOString().slice(0,10),id:t.id}),this.experimentService.getAssociatedFiles(t.id).subscribe(i=>{this.associatedFiles=i,console.log(i)})}),this.experimentService.getResultSummaries(e).subscribe(t=>{this.resultSummaries=t}))}updateExperiment(){this.form.valid&&this.experimentService.updateExperiment(this.form.value.id,this.form.value).subscribe(e=>{this.experimentService.getExperiments().subscribe(t=>{this.experiments=t.results,this.next=t.next,this.previous=t.previous,this.n_experiment=t.count})})}deleteExperiment(e){e&&e>0&&this.experimentService.deleteExperiment(e).subscribe(t=>{this.clickedExperiment=-1,this.experimentService.getExperiments().subscribe(i=>{this.experiments=i.results,this.next=i.next,this.previous=i.previous,this.n_experiment=i.count})})}openCreateExperimentModal(){this.modal.open(I).closed.subscribe(t=>{this.experimentService.getExperiments().subscribe(i=>{this.experiments=i.results,this.next=i.next,this.previous=i.previous,this.n_experiment=i.count})})}deleteAllSelected(){let e=[];for(let t of this.selectedExperiments)e.push(this.experimentService.deleteExperiment(t));j(e).subscribe(t=>{this.experimentService.getExperiments().subscribe(i=>{this.experiments=i.results,this.next=i.next,this.previous=i.previous,this.n_experiment=i.count})})}handleSearchQueryResult(e){this.experiments=e.results,this.next=e.next,this.previous=e.previous,this.n_experiment=e.count}nextPage(){this.next&&this.experimentService.getExperiments(this.next).subscribe(e=>{this.experiments=e.results,this.next=e.next,this.previous=e.previous,this.n_experiment=e.count})}previousPage(){this.previous&&this.experimentService.getExperiments(this.previous).subscribe(e=>{this.experiments=e.results,this.next=e.next,this.previous=e.previous,this.n_experiment=e.count})}openCreateAnalysisModal(){let e=this.modal.open(me);e.componentInstance.mode="fromExp",this.experimentService.getExperiment(this.clickedExperiment).subscribe(t=>{e.componentInstance.selectedExperiment=t})}};m.\u0275fac=function(t){return new(t||m)(g(J),g(re),g(M),g(ie),g(oe))},m.\u0275cmp=R({type:m,selectors:[["app-experiment-manage"]],inputs:{experimentId:"experimentId"},standalone:!0,features:[O([M]),G],decls:26,vars:4,consts:[[1,"d-flex","g-1"],[1,"border-end","border-1","border-black","d-flex","flex-column",2,"height","100%","width","300px","min-width","300px"],[1,"navbar","navbar-expand-lg","navbar-dark","bg-dark","d-flex","flex-wrap","text-light"],[1,"container-fluid"],[1,"navbar-brand"],[1,"navbar","navbar-expand-lg","navbar-dark","bg-dark","d-flex","justify-content-start","g-2","flex-wrap","text-light"],[1,"btn","btn-sm","btn-dark",3,"click"],[1,"bi","bi-folder-check"],[1,"bi","bi-trash"],[1,"btn","btn-sm","btn-dark",3,"click","disabled"],[3,"searchQuery","mode"],[1,"experiment-side-nav"],[1,"list-group","d-flex","flex-column","rounded-0","overflow-auto"],[3,"ngClass"],[1,"experiment-main-content"],[1,"p-5"],[1,"experiment-main-content","p-5"],[3,"click","ngClass"],[1,"form-check","flex-grow-0"],[1,"flex-grow-1"],["type","checkbox",1,"form-check-input",3,"change"],[1,"border-dark","border-opacity-25","rounded-3","d-flex","justify-content-center","align-items-center",2,"border-style","dashed"],[1,"d-flex","justify-content-center"],[1,"d-flex","flex-column","gap-2",3,"formGroup"],[1,"form-group"],["for","experiment_name"],["type","text","id","experiment_name","formControlName","experiment_name",1,"form-control"],[1,"d-flex","gap-2"],["for","vendor"],["id","vendor","formControlName","vendor",1,"form-select"],[3,"value"],["for","sample_count"],["type","number","id","sample_count","formControlName","sample_count",1,"form-control"],["for","id"],["type","number","id","id","formControlName","id","readonly","",1,"form-control"],[1,"d-flex","flex-column"],[1,"table","table-striped"],["scope","col"],[1,"btn","btn-primary",3,"click"],[1,"btn","btn-danger",3,"click"],[2,"max-width","1000px","overflow","auto"],[3,"plotType","data"]],template:function(t,i){t&1&&(r(0,"div")(1,"div",0)(2,"div",1)(3,"nav",2)(4,"div",3)(5,"div",4),a(6,"Experiment Management"),n()()(),r(7,"nav",5)(8,"button",6),p("click",function(){return i.openCreateExperimentModal()}),a(9,"+"),n(),r(10,"button",6),p("click",function(){return i.showSelect=!i.showSelect}),u(11,"i",7),n(),r(12,"button",6),p("click",function(){return i.deleteAllSelected()}),u(13,"i",8),n(),r(14,"button",9),p("click",function(){return i.previousPage()}),a(15,"<"),n(),r(16,"button",9),p("click",function(){return i.nextPage()}),a(17,">"),n()(),r(18,"app-experiment-search",10),p("searchQuery",function(T){return i.handleSearchQueryResult(T)}),n(),r(19,"div",11)(20,"div",12),k(21,de,11,7,"div",13,S),n()()(),r(23,"div",14),E(24,xe,5,0,"div",15)(25,_e,51,10,"div",16),n()()()),t&2&&(l(14),x("disabled",!i.previous),l(2),x("disabled",!i.next),l(2),x("mode","emit"),l(3),y(i.experiments),l(3),C(i.clickedExperiment===-1?24:25))},dependencies:[U,ne,K,ee,te,Y,L,Z,z,H,W,X,se,Q,ae],styles:[".experiment-side-nav[_ngcontent-%COMP%]{width:300px;border-right:1px solid #000000;display:flex;flex-direction:column;height:calc(100vh - 226px);overflow:auto}.experiment-main-content[_ngcontent-%COMP%]{height:calc(100vh - 64px);width:calc(100vw - 350px)}"]});let o=m;return o})();var fe=[{path:"create",component:I,data:{breadcrumbs:["experiment","create"]}},{path:"manage",component:A,data:{breadcrumbs:["experiment","manage"]}},{path:"manage/:experimentId",component:A,data:{breadcrumbs:["experiment","manage"]}}],Pe=(()=>{let m=class m{};m.\u0275fac=function(t){return new(t||m)},m.\u0275mod=P({type:m}),m.\u0275inj=D({imports:[q,N.forChild(fe),N]});let o=m;return o})();export{Pe as ExperimentModule};
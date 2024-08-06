import{d as pe,n as de,o as he}from"./chunk-EQB5EGJF.js";import{c as T,d as F,e as w,f as N,g as d,h as oe,i as I,k as A,l as M,m as se,n as le,o as me,p as V,q as ce,r as j}from"./chunk-URRA4EOY.js";import{a as R,b as ue}from"./chunk-D5HGWBZ6.js";import{a as L}from"./chunk-7ITMQ6SW.js";import{Aa as g,B as D,Da as x,Ea as p,F as q,H as b,Ha as Y,L as W,Na as Z,O as z,Oa as l,Pa as $,Q as E,Qa as ee,Sa as te,Ta as ie,Ua as re,W as y,Wa as S,X as v,ba as G,bb as ne,da as m,ea as c,k as H,la as C,na as h,o as O,oa as U,p as P,qa as f,sa as J,ta as K,ua as X,va as s,vb as ae,wa as a,x as Q,xa as u,y as B}from"./chunk-VG74EQIO.js";function be(t,i){t&1&&(s(0,"small",5),l(1,"Searching..."),a())}function Ee(t,i){t&1&&(s(0,"small",6),l(1,"No experiments found"),a())}function ge(t,i){if(t&1){let o=g();s(0,"div",1)(1,"label",3),l(2,"Experiment"),a(),s(3,"input",4),x("selectItem",function(r){y(o);let n=p();return v(n.selectionHandler(r))}),re("ngModelChange",function(r){y(o);let n=p();return ie(n.searchTerm,r)||(n.searchTerm=r),v(r)}),a(),C(4,be,2,0,"small",5)(5,Ee,2,0,"small",6),a()}if(t&2){let o=p(),e=Z(3);m(3),U("is-invalid",o.searchFailed),h("resultTemplate",e)("inputFormatter",o.formatter),te("ngModel",o.searchTerm),h("ngbTypeahead",o.search),m(),f(o.searching?4:-1),m(),f(o.searchFailed?5:-1)}}function Se(t,i){if(t&1&&(s(0,"form",2)(1,"div",7),u(2,"input",8),s(3,"label",9),l(4,"Experiment search"),a()()()),t&2){let o=p();h("formGroup",o.form),m(2),U("is-invalid",o.searchFailed)}}function Te(t,i){if(t&1&&u(0,"ngb-highlight",10),t&2){let o=i.result,e=i.term;h("result",o.experiment_name)("term",e)}}var xe=(()=>{let i=class i{set experiment(e){console.log(e),this._experiment=e,this.searchTerm=e.experiment_name}get experiment(){return this._experiment}constructor(e,r){this.experimentService=e,this.fb=r,this.mode="typeahead",this.searchTerm="",this.searching=!1,this.searchFailed=!1,this.search=n=>n.pipe(B(300),D(),b(()=>this.searching=!0),q(_=>this.experimentService.searchExperiments(_).pipe(b(()=>this.searchFailed=!1),P(k=>k.results),Q(()=>(this.searchFailed=!0,O([]))))),b(()=>this.searching=!1)),this.formatter=n=>n.experiment_name,this.searchQuery=new G,this.selectedExperiment=new G,this.form=this.fb.group({searchTerm:new d("")}),this.form.controls.searchTerm.valueChanges.pipe(B(300),D()).subscribe(n=>{n&&n.length>2&&this.searchExperimentName()})}searchExperimentName(){this.form.value.searchTerm&&this.experimentService.searchExperiments(this.form.value.searchTerm).subscribe(e=>{this.searchQuery.emit(e)})}selectionHandler(e){this.selectedExperiment.emit(e.item)}};i.\u0275fac=function(r){return new(r||i)(c(R),c(V))},i.\u0275cmp=E({type:i,selectors:[["app-experiment-search"]],inputs:{mode:"mode",experiment:"experiment"},outputs:{searchQuery:"searchQuery",selectedExperiment:"selectedExperiment"},standalone:!0,features:[S],decls:4,vars:1,consts:[["resultTemplate",""],[1,"form-group"],[3,"formGroup"],["for","searchExperiment"],["id","searchExperiment","type","search","placeholder","Experiment search",1,"form-control",3,"selectItem","ngModelChange","resultTemplate","inputFormatter","ngModel","ngbTypeahead"],[1,"form-text","text-muted"],[1,"invalid-feedback"],[1,"form-floating"],["id","searchExperimentEmit","type","search","formControlName","searchTerm",1,"form-control"],["for","searchExperimentEmit"],[3,"result","term"]],template:function(r,n){r&1&&C(0,ge,6,8,"div",1)(1,Se,5,3,"form",2)(2,Te,1,2,"ng-template",null,0,ne),r&2&&f(n.mode==="typeahead"?0:1)},dependencies:[ce,I,T,w,N,oe,he,de,j,A,M]});let t=i;return t})();var _e=(()=>{let i=class i{constructor(e){this.http=e,this.protocol=window.location.protocol,this.baseURL=L.baseURL.replace("http",this.protocol.slice(0,-1)),this.currentBreadcrumbs={paths:[],active:""},this.breadCrumbsSubject=new H({paths:[],active:""}),this.protocol==="http:"?this.baseURL=L.baseURL.replace("https://","http://"):this.baseURL=L.baseURL.replace("http://","https://")}setBreadcrumbs(e,r){this.currentBreadcrumbs.paths=e,this.currentBreadcrumbs.active=r,this.breadCrumbsSubject.next({paths:e,active:r}),console.log(r)}postFileLocation(e){return this.http.post(this.baseURL+"/api/file-browser/",{file_path:e})}};i.\u0275fac=function(r){return new(r||i)(z(ae))},i.\u0275prov=W({token:i,factory:i.\u0275fac,providedIn:"root"});let t=i;return t})();function we(t,i){if(t&1){let o=g();s(0,"app-experiment-search",17),x("selectedExperiment",function(r){y(o);let n=p();return v(n.handleExperimentSelect(r))}),a()}}function Ne(t,i){if(t&1&&(s(0,"div",4)(1,"b"),l(2,"Experiment: "),a(),l(3),a()),t&2){let o=p();m(3),ee(" ",o.selectedExperiment==null?null:o.selectedExperiment.experiment_name," ")}}function Ie(t,i){if(t&1&&(s(0,"option",9),l(1),a()),t&2){let o=i.$implicit;Y("value",o.value),m(),$(o.analysis_type)}}var qe=(()=>{let i=class i{set selectedExperiment(e){this._selectedExperiment=e,this.form.controls.experiment.setValue(e.id)}get selectedExperiment(){return this._selectedExperiment}constructor(e,r,n,_,k){this.generalService=e,this.fb=r,this.modal=n,this.experimentService=_,this.analysisService=k,this.mode="searchExp",this.form=this.fb.group({analysis_path:new d(null,F.required),experiment:new d(0,F.required),analysis_type:new d("diann-spectral",F.required),fasta_file:new d(null),spectral_library:new d(null)}),this.analysisTypeChoices=[],this.analysisService.getAnalysisType().subscribe(ye=>{this.analysisTypeChoices=ye})}ngOnInit(){}handleExperimentSelect(e){this.selectedExperiment=e}submit(){this.form.valid&&this.form.value.analysis_path&&this.selectedExperiment&&this.form.value.analysis_type&&this.form.value.fasta_file&&this.form.value.spectral_library&&this.analysisService.createAnalysis(this.form.value.analysis_path,this.selectedExperiment.id,this.form.value.analysis_type,this.form.value.fasta_file,this.form.value.spectral_library).subscribe(e=>{this.modal.close(e)})}close(){this.modal.dismiss()}};i.\u0275fac=function(r){return new(r||i)(c(_e),c(V),c(pe),c(R),c(ue))},i.\u0275cmp=E({type:i,selectors:[["app-analysis-create"]],inputs:{mode:"mode"},standalone:!0,features:[S],decls:30,vars:2,consts:[[1,"modal-header"],[1,"modal-title"],[1,"modal-body"],[3,"formGroup"],[1,"form-group"],["for","analysis_path"],["type","text","id","analysis_path","formControlName","analysis_path",1,"form-control"],["for","analysis_type"],["id","analysis_type","formControlName","analysis_type",1,"form-select"],[3,"value"],["for","fasta_file"],["type","text","id","fasta_file","formControlName","fasta_file",1,"form-control"],["for","spectral_library"],["type","text","id","spectral_library","formControlName","spectral_library",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click"],[3,"selectedExperiment"]],template:function(r,n){r&1&&(s(0,"div",0)(1,"h5",1),l(2,"Create Analysis"),a()(),s(3,"div",2)(4,"form",3)(5,"div",4)(6,"label",5),l(7,"Analysis Path"),a(),u(8,"input",6),a(),C(9,we,1,0,"app-experiment-search")(10,Ne,4,1,"div",4),s(11,"div",4)(12,"label",7),l(13,"Analysis Type"),a(),s(14,"select",8),K(15,Ie,2,2,"option",9,J),a()(),s(17,"div",4)(18,"label",10),l(19,"Fasta File"),a(),u(20,"input",11),a(),s(21,"div",4)(22,"label",12),l(23,"Spectral Library"),a(),u(24,"input",13),a()()(),s(25,"div",14)(26,"button",15),x("click",function(){return n.close()}),l(27,"Close"),a(),s(28,"button",16),x("click",function(){return n.submit()}),l(29,"Submit"),a()()),r&2&&(m(4),h("formGroup",n.form),m(5),f(n.mode==="searchExp"?9:10),m(6),X(n.analysisTypeChoices))},dependencies:[j,I,le,me,T,se,w,N,A,M,xe]});let t=i;return t})();export{_e as a,xe as b,qe as c};
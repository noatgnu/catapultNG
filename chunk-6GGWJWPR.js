import{L as l}from"./chunk-VG74EQIO.js";var _={cat_file_auto:"boolean",cat_ready:"boolean",cat_total_files:"number",channel_run_norm:"boolean",channel_spec_norm:"boolean",channels:"list",clear_mods:"boolean",compact_report:"boolean",cont_quant_exclude:"boolean",convert:"boolean",cut:"str",decoy_channel:"str",decoys_preserve_spectrum:"boolean",diann_path:"str",dir:"str",direct_quant:"boolean",dl_no_im:"boolean",dl_no_rt:"boolean",duplicate_proteins:"boolean",exact_fdr:"boolean",export_quant:"boolean",ext:"str",f:"list",fasta:"list",fasta_filter:"str",fasta_search:"boolean",fixed_mod:"list",force_swissprot:"boolean",foreign_decoys:"boolean",full_unimod:"boolean",gen_fr_restriction:"boolean",gen_spec_lib:"boolean",global_mass_cal:"boolean",global_norm:"boolean",high_acc:"boolean",ids_to_names:"boolean",il_eq:"boolean",im_window:"str",im_window_factor:"str",individual_mass_acc:"boolean",individual_reports:"boolean",individual_windows:"boolean",int_removal:"str",lib:"list",lib_fixed_mod:"list",library_headers:"list",mass_acc:"number",mass_acc_cal:"str",mass_acc_ms1:"number",matrices:"boolean",matrix_ch_qvalue:"str",matrix_qvalue:"str",matrix_spec_q:"boolean",matrix_tr_qvalue:"str",max_fr:"str",max_fr_mz:"number",max_pep_len:"number",max_pr_charge:"number",max_pr_mz:"number",mbr_fix_settings:"boolean",met_excision:"boolean",min_fr:"str",min_fr_mz:"number",min_peak:"str",min_pep_len:"number",min_pr_charge:"number",min_pr_mz:"number",missed_cleavages:"number",mod:"list",mod_no_scoring:"str",mod_only:"boolean",no_calibration:"boolean",no_cut_after_mod:"str",no_decoy_channel:"boolean",no_fr_selection:"boolean",no_im_window:"boolean",no_isotopes:"boolean",no_lib_filter:"boolean",no_main_report:"boolean",no_maxlfq:"boolean",no_norm:"boolean",no_peptidoforms:"boolean",no_prot_inf:"boolean",no_quant_files:"boolean",no_rt_window:"boolean",no_stats:"boolean",no_swissprot:"boolean",original_mods:"boolean",out:"str",out_lib:"str",out_lib_copy:"boolean",out_measured_rt:"boolean",peak_translation:"boolean",peptidoforms:"boolean",pg_level:"str",pr_filter:"str",predict_n_frag:"str",predictor:"boolean",prefix:"str",ptm_qvalues:"boolean",quant_acc:"str",quant_fr:"str",quant_no_ms1:"boolean",quant_sel_runs:"str",quant_train_runs:"str",quick_mass_acc:"boolean",qvalue:"number",reanalyse:"boolean",reannotate:"boolean",ref:"str",regular_swath:"boolean",relaxed_prot_inf:"boolean",report_lib_info:"boolean",restrict_fr:"boolean",scanning_swath:"boolean",semi:"boolean",skip_unknown_mods:"boolean",smart_profiling:"boolean",species_genes:"boolean",species_ids:"boolean",sptxt_acc:"str",tag_to_ids:"str",temp:"str",threads:"number",tims_min_int:"str",tims_ms1_cycle:"str",tims_scan:"boolean",tims_skip_errors:"boolean",unimod:"list",use_quant:"boolean",var_mod:"list",var_mods:"number",verbose:"number",window:"str",xic:"str",xic_theoretical_fr:"boolean"},o=class{constructor(){this.cat_file_auto=!1,this.cat_ready=!1,this.cat_total_files=3,this.channel_run_norm=!1,this.channel_spec_norm=!1,this.channels=[],this.clear_mods=!1,this.compact_report=!1,this.cont_quant_exclude=!1,this.convert=!1,this.cut="K*,R*",this.decoy_channel=null,this.decoys_preserve_spectrum=!1,this.diann_path="",this.dir=null,this.direct_quant=!1,this.dl_no_im=!1,this.dl_no_rt=!1,this.duplicate_proteins=!1,this.exact_fdr=!1,this.export_quant=!1,this.ext=null,this.f=[],this.fasta=[],this.fasta_filter=null,this.fasta_search=!0,this.fixed_mod=[],this.force_swissprot=!1,this.foreign_decoys=!1,this.full_unimod=!1,this.gen_fr_restriction=!1,this.gen_spec_lib=!0,this.global_mass_cal=!1,this.global_norm=!1,this.high_acc=!1,this.ids_to_names=!1,this.il_eq=!1,this.im_window=null,this.im_window_factor=null,this.individual_mass_acc=!0,this.individual_reports=!1,this.individual_windows=!0,this.int_removal=null,this.lib=[],this.lib_fixed_mod=[],this.library_headers=[],this.mass_acc=20,this.mass_acc_cal=null,this.mass_acc_ms1=20,this.matrices=!0,this.matrix_ch_qvalue=null,this.matrix_qvalue=null,this.matrix_spec_q=!1,this.matrix_tr_qvalue=null,this.max_fr=null,this.max_fr_mz=1800,this.max_pep_len=30,this.max_pr_charge=4,this.max_pr_mz=1800,this.mbr_fix_settings=!1,this.met_excision=!1,this.min_fr=null,this.min_fr_mz=200,this.min_peak=null,this.min_pep_len=7,this.min_pr_charge=1,this.min_pr_mz=300,this.missed_cleavages=2,this.mod=[],this.mod_no_scoring=null,this.mod_only=!1,this.no_calibration=!1,this.no_cut_after_mod=null,this.no_decoy_channel=!1,this.no_fr_selection=!1,this.no_im_window=!1,this.no_isotopes=!1,this.no_lib_filter=!1,this.no_main_report=!1,this.no_maxlfq=!1,this.no_norm=!1,this.no_peptidoforms=!1,this.no_prot_inf=!1,this.no_quant_files=!1,this.no_rt_window=!1,this.no_stats=!1,this.no_swissprot=!1,this.original_mods=!1,this.out="",this.out_lib="",this.out_lib_copy=!0,this.out_measured_rt=!1,this.peak_translation=!1,this.peptidoforms=!1,this.pg_level=null,this.pr_filter=null,this.predict_n_frag=null,this.predictor=!0,this.prefix=null,this.ptm_qvalues=!1,this.quant_acc=null,this.quant_fr=null,this.quant_no_ms1=!1,this.quant_sel_runs=null,this.quant_train_runs=null,this.quick_mass_acc=!1,this.qvalue=.01,this.reanalyse=!0,this.reannotate=!1,this.ref=null,this.regular_swath=!1,this.relaxed_prot_inf=!1,this.report_lib_info=!1,this.restrict_fr=!1,this.scanning_swath=!1,this.semi=!1,this.skip_unknown_mods=!1,this.smart_profiling=!0,this.species_genes=!0,this.species_ids=!0,this.sptxt_acc=null,this.tag_to_ids=null,this.temp="",this.threads=8,this.tims_min_int=null,this.tims_ms1_cycle=null,this.tims_scan=!1,this.tims_skip_errors=!1,this.unimod=[],this.use_quant=!0,this.var_mod=[],this.var_mods=1,this.verbose=4,this.window=null,this.xic=null,this.xic_theoretical_fr=!1}reset(){for(let s in this)this.hasOwnProperty(s)&&(typeof this[s]=="boolean"?this[s]=null:typeof this[s]=="number"?this[s]=null:typeof this[s]=="string"?this[s]=null:Array.isArray(this[s])?this[s]=[]:this[s]=null)}};function r(n){let s=[n.diann_path];for(let[a,e]of Object.entries(n))if(a!=="diann_path"&&a!=="ready"){let i=a.replace(/_/g,"-");if(e!==null)if(i==="channels")if(Array.isArray(e)){s.push(`--${i}`);let t=e.join("; ");t.includes(" ")?s.push(`"${t}"`):s.push(t)}else typeof e=="string"&&(s.push(`--${i}`),e.includes(" ")?s.push(`"${e}"`):s.push(e));else if(typeof e=="boolean")e&&s.push(`--${i}`);else if(Array.isArray(e))if(i==="unimod")for(let t of e)s.push(`--unimod${String(t)}`);else if(i==="temp"){s.push("--temp");let t=String(e);t.includes(" ")?s.push(`"${t}"`):s.push(t)}else if(i==="f")for(let t of e)s.push(`--${i}`),t.includes(" ")?s.push(`"${t}"`):s.push(t);else if(i==="out")s.push("--out"),e.includes(" ")?s.push(`"${e}"`):s.push(String(e));else for(let t of e)s.push(`--${i}`),t.includes(" ")?s.push(`"${t}"`):s.push(String(t));else s.push(`--${i}`),String(e).includes(" ")?s.push(`"${e}"`):s.push(String(e))}return s.join(" ")}var c=(()=>{let s=class s{constructor(){this.proteinIdentified={min:null,max:null},this.precursorIdentified={min:null,max:null},this.diannConfig=new o,this.diannConfigEnableMap={},this.resetDiannConfig()}resetDiannConfig(){this.diannConfig.reset()}};s.\u0275fac=function(i){return new(i||s)},s.\u0275prov=l({token:s,factory:s.\u0275fac,providedIn:"root"});let n=s;return n})();export{_ as a,o as b,r as c,c as d};
export interface CatapultRunConfig {
  id: number;
  created_at: Date;
  updated_at: Date;
  config_file_path: string;
  content: any;
  fasta_ready: boolean;
  fasta_required: boolean;
  spectral_library_ready: boolean;
  spectral_library_required: boolean;
}

export interface CatapultRunConfigQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: CatapultRunConfig[];
}

export class CatapultRunConfigContent {
  cat_file_auto: boolean;
  cat_ready: boolean;
  cat_total_files: number;
  channel_run_norm: boolean;
  channel_spec_norm: boolean;
  channels: any[];
  clear_mods: boolean;
  compact_report: boolean;
  cont_quant_exclude: boolean;
  convert: boolean;
  cut: string;
  decoy_channel: any;
  decoys_preserve_spectrum: boolean;
  diann_path: string;
  dir: any;
  direct_quant: boolean;
  dl_no_im: boolean;
  dl_no_rt: boolean;
  duplicate_proteins: boolean;
  exact_fdr: boolean;
  export_quant: boolean;
  ext: any;
  f: string[];
  fasta: string[];
  fasta_filter: any;
  fasta_search: boolean;
  fixed_mod: any[];
  force_swissprot: boolean;
  foreign_decoys: boolean;
  full_unimod: boolean;
  gen_fr_restriction: boolean;
  gen_spec_lib: boolean;
  global_mass_cal: boolean;
  global_norm: boolean;
  high_acc: boolean;
  ids_to_names: boolean;
  il_eq: boolean;
  im_window: any;
  im_window_factor: any;
  individual_mass_acc: boolean;
  individual_reports: boolean;
  individual_windows: boolean;
  int_removal: any;
  lib: any[];
  lib_fixed_mod: any[];
  library_headers: any[];
  mass_acc: number;
  mass_acc_cal: any;
  mass_acc_ms1: number;
  matrices: boolean;
  matrix_ch_qvalue: any;
  matrix_qvalue: any;
  matrix_spec_q: boolean;
  matrix_tr_qvalue: any;
  max_fr: any;
  max_fr_mz: number;
  max_pep_len: number;
  max_pr_charge: number;
  max_pr_mz: number;
  mbr_fix_settings: boolean;
  met_excision: boolean;
  min_fr: any;
  min_fr_mz: number;
  min_peak: any;
  min_pep_len: number;
  min_pr_charge: number;
  min_pr_mz: number;
  missed_cleavages: number;
  mod: any[];
  mod_no_scoring: any;
  mod_only: boolean;
  no_calibration: boolean;
  no_cut_after_mod: any;
  no_decoy_channel: boolean;
  no_fr_selection: boolean;
  no_im_window: boolean;
  no_isotopes: boolean;
  no_lib_filter: boolean;
  no_main_report: boolean;
  no_maxlfq: boolean;
  no_norm: boolean;
  no_peptidoforms: boolean;
  no_prot_inf: boolean;
  no_quant_files: boolean;
  no_rt_window: boolean;
  no_stats: boolean;
  no_swissprot: boolean;
  original_mods: boolean;
  out: string;
  out_lib: string;
  out_lib_copy: boolean;
  out_measured_rt: boolean;
  peak_translation: boolean;
  peptidoforms: boolean;
  pg_level: any;
  pr_filter: any;
  predict_n_frag: any;
  predictor: boolean;
  prefix: any;
  ptm_qvalues: boolean;
  quant_acc: any;
  quant_fr: any;
  quant_no_ms1: boolean;
  quant_sel_runs: any;
  quant_train_runs: any;
  quick_mass_acc: boolean;
  qvalue: number;
  reanalyse: boolean;
  reannotate: boolean;
  ref: any;
  regular_swath: boolean;
  relaxed_prot_inf: boolean;
  report_lib_info: boolean;
  restrict_fr: boolean;
  scanning_swath: boolean;
  semi: boolean;
  skip_unknown_mods: boolean;
  smart_profiling: boolean;
  species_genes: boolean;
  species_ids: boolean;
  sptxt_acc: any;
  tag_to_ids: any;
  temp: string;
  threads: number;
  tims_min_int: any;
  tims_ms1_cycle: any;
  tims_scan: boolean;
  tims_skip_errors: boolean;
  unimod: number[];
  use_quant: boolean;
  var_mod: string[];
  var_mods: number;
  verbose: number;
  window: any;
  xic: any;
  xic_theoretical_fr: boolean;

  constructor() {
    this.cat_file_auto = false;
    this.cat_ready = false;
    this.cat_total_files = 3;
    this.channel_run_norm = false;
    this.channel_spec_norm = false;
    this.channels = [];
    this.clear_mods = false;
    this.compact_report = false;
    this.cont_quant_exclude = false;
    this.convert = false;
    this.cut = "K*,R*";
    this.decoy_channel = null;
    this.decoys_preserve_spectrum = false;
    this.diann_path = "";
    this.dir = null;
    this.direct_quant = false;
    this.dl_no_im = false;
    this.dl_no_rt = false;
    this.duplicate_proteins = false;
    this.exact_fdr = false;
    this.export_quant = false;
    this.ext = null;
    this.f = [];
    this.fasta = [];
    this.fasta_filter = null;
    this.fasta_search = true;
    this.fixed_mod = [];
    this.force_swissprot = false;
    this.foreign_decoys = false;
    this.full_unimod = false;
    this.gen_fr_restriction = false;
    this.gen_spec_lib = true;
    this.global_mass_cal = false;
    this.global_norm = false;
    this.high_acc = false;
    this.ids_to_names = false;
    this.il_eq = false;
    this.im_window = null;
    this.im_window_factor = null;
    this.individual_mass_acc = true;
    this.individual_reports = false;
    this.individual_windows = true;
    this.int_removal = null;
    this.lib = [];
    this.lib_fixed_mod = [];
    this.library_headers = [];
    this.mass_acc = 20;
    this.mass_acc_cal = null;
    this.mass_acc_ms1 = 20;
    this.matrices = true;
    this.matrix_ch_qvalue = null;
    this.matrix_qvalue = null;
    this.matrix_spec_q = false;
    this.matrix_tr_qvalue = null;
    this.max_fr = null;
    this.max_fr_mz = 1800;
    this.max_pep_len = 30;
    this.max_pr_charge = 4;
    this.max_pr_mz = 1800;
    this.mbr_fix_settings = false;
    this.met_excision = false;
    this.min_fr = null;
    this.min_fr_mz = 200;
    this.min_peak = null;
    this.min_pep_len = 7;
    this.min_pr_charge = 1;
    this.min_pr_mz = 300;
    this.missed_cleavages = 2;
    this.mod = [];
    this.mod_no_scoring = null;
    this.mod_only = false;
    this.no_calibration = false;
    this.no_cut_after_mod = null;
    this.no_decoy_channel = false;
    this.no_fr_selection = false;
    this.no_im_window = false;
    this.no_isotopes = false;
    this.no_lib_filter = false;
    this.no_main_report = false;
    this.no_maxlfq = false;
    this.no_norm = false;
    this.no_peptidoforms = false;
    this.no_prot_inf = false;
    this.no_quant_files = false;
    this.no_rt_window = false;
    this.no_stats = false;
    this.no_swissprot = false;
    this.original_mods = false;
    this.out = "";
    this.out_lib = "";
    this.out_lib_copy = true;
    this.out_measured_rt = false;
    this.peak_translation = false;
    this.peptidoforms = false;
    this.pg_level = null;
    this.pr_filter = null;
    this.predict_n_frag = null;
    this.predictor = true;
    this.prefix = null;
    this.ptm_qvalues = false;
    this.quant_acc = null;
    this.quant_fr = null;
    this.quant_no_ms1 = false;
    this.quant_sel_runs = null;
    this.quant_train_runs = null;
    this.quick_mass_acc = false;
    this.qvalue = 0.01;
    this.reanalyse = true;
    this.reannotate = false;
    this.ref = null;
    this.regular_swath = false;
    this.relaxed_prot_inf = false;
    this.report_lib_info = false;
    this.restrict_fr = false;
    this.scanning_swath = false;
    this.semi = false;
    this.skip_unknown_mods = false;
    this.smart_profiling = true;
    this.species_genes = true;
    this.species_ids = true;
    this.sptxt_acc = null;
    this.tag_to_ids = null;
    this.temp = "";
    this.threads = 8;
    this.tims_min_int = null;
    this.tims_ms1_cycle = null;
    this.tims_scan = false;
    this.tims_skip_errors = false;
    this.unimod = [];
    this.use_quant = true;
    this.var_mod = [];
    this.var_mods = 1;
    this.verbose = 4;
    this.window = null;
    this.xic = null;
    this.xic_theoretical_fr = false;
  }

  reset() {
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        if (typeof this[key] === "boolean") {
          // @ts-ignore
          this[key] = null
        } else if (typeof this[key] === "number") {
          // @ts-ignore
          this[key] = null
        } else if (typeof this[key] === "string") {
          // @ts-ignore
          this[key] = null
        } else if (Array.isArray(this[key])) {
          // @ts-ignore
          this[key] = []
        } else {
          // @ts-ignore
          this[key] = null
        }
      }
    }
  }
}

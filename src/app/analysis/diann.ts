export class Diann {
  channels?: MultiplexChannel[] = [];
  "clear-mods"?: boolean;
  "compact-report"?: boolean;
  convert?: boolean;
  cut: string = "K*,R*,!*P";
  "decoy-channel"?: MultiplexChannel[] = [];
  dir?: string;
  "dl-no-im"?: boolean;
  "dl-no-rt"?: boolean;
  "duplicate-proteins"?: boolean;
  "exact-fdr"?: boolean;
  ext?: string;
  f?: string[] = [];
  fasta?: string;
  "fasta-filter"?: string;
  "fasta-search"?: string;
  "fixed-mod"?: Modifications[] = [];
  "force-swissprot"?: boolean;
  "full-unimod"?: boolean;
  "gen-spec-lib"?: boolean;
  "gen-fr-restriction"?: boolean;
  "global-mass-cal"?: boolean;
  "global-norm"?: boolean;
  "il-eq"?: boolean;
  "im-window"?: number;
  "im-window-factor"?: number = 2.0;
  "individual-mass-acc"?: boolean;
  "individual-reports"?: boolean;
  "individual-windows"?: boolean = true;
  "int-removal"?: number = 0;
  "learn-lib"?: string;
  lib?: string;
  "lib-fixed-mod"?: string;
  "library-headers"?: string[] = [];
  "mass-acc"?: number;
  "mass-acc-cal"?: number;
  "mass-acc-ms1"?: number;
  matrices?: boolean = true;
  "matrix-ch-qvalue"?: number;
  "matrix-qvalue"?: number;
  "matrix-tr-qvalue"?: number;
  "matrix-spec-q"?: boolean;
  "max-fr"?: number;
  "max-pep-len"?: number = 30;
  "max-pr-charge"?: number = 4;
  "max-pr-mz"?: number = 1800;
  "mbr-fix-settings"?: boolean;
  "met-excision"?: boolean;
  "min-fr"?: number;
  "min-peak"?: number;
  "min-pep-len"?: number = 7;
  "min-pr-charge"?: number = 1;
  "min-pr-mz"?: number = 300;
  "missed-cleavages"?: number = 2;
  mod?: Modifications[] = [];
  "mod-only"?: boolean;
  "monitor-mod"?: string[] = [];
  "nn-single-seq"?: boolean;
  "no-calibration"?: boolean;
  "no-cut-after-mod"?: boolean;
  "no-decoy-channel"?: boolean;
  "no-fr-selection"?: boolean;
  "no-ifs-removal"?: boolean;
  "no-im-window"?: boolean;
  "no-isotopes"?: boolean;
  "no-lib-filter"?: boolean;
  "no-main-report"?: boolean;
  "no-maxlfq"?: boolean;
  "no-norm"?: boolean;
  "no-prot-inf"?: boolean;
  "no-quant-files"?: boolean;
  "no-rt-window"?: boolean;
  "no-stats"?: boolean;
  "no-stratification"?: boolean;
  "no-swissprot"?: boolean;
  "original-mods"?: boolean;
  out?: string;
  "out-lib"?: string;
  "out-lib-copy"?: boolean;
  "out-measured-rt"?: boolean;
  "peak-center"?: boolean = true;
  "peak-height"?: boolean;
  "peak-translation"?: boolean;
  "pg-level"?: number;
  predictor?: boolean;
  prefix?: string;
  "quant-fr"?: number;
  "quick-mass-acc"?: boolean;
  "reanalyse"?: boolean = true;
  reannotate?: boolean;
  ref?: string;
  "regular-swath"?: boolean;
  "relaxed-prot-inf"?: boolean;
  "report-lib-info"?: boolean;
  "restrict-fr"?: boolean;
  "scanning-swath"?: boolean;
  semi?: boolean;
  "smart-profiling"?: boolean;
  "species-genes"?: boolean;
  "sptxt-acc"?: number;
  "strip-unknown-mods"?: boolean;
  "target-fr"?: number;
  temp?: string;
  threads?: number;
  "tims-skip-errors"?: boolean;
  "use-quant"?: boolean;
  verbose?: number = 1;
  "var-mod"?: Modifications[] = [];
  "var-mods"?: number;
  vis?: string;
  window?: number;
  qvalue?: number = 0.01;
  unimod?: number[] = [];

  constructor() {
  }

  convertAttributesToCommandParams(): string[] {
    let commandParams: string[] = []
    for (let [key, value] of Object.entries(this)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          switch (key) {
            case "unimod":
              for (let v of value) {
                commandParams.push(`--unimod${v}`)
              }
              break
            default:
              value.forEach((v: any) => {
                if (typeof v === "string") {
                  commandParams.push(`--${key} ${v}`)
                } else {

                  commandParams.push(`--${key} ${Object.values(v).join(",")}`)
                }
              })
          }

        } else if (typeof value === "boolean") {
          if (value) {
            commandParams.push(`--${key}`)
          }
        } else {
          commandParams.push(`--${key} ${value}`)
        }
      }
    }
    return commandParams
  }

  addOxidationM() {
    this["var-mod"]?.push({
      name: "UniMod:35",
      mass: 15.994915,
      sites: "M"
    })
  }

  addAcetylN() {
    this["var-mod"]?.push({
      name: "UniMod:1",
      mass: 42.010565,
      sites: "*n"
    })
    this["monitor-mod"]?.push("UniMod:1")
  }

  addPhosphoSTY() {
    this["var-mod"]?.push({
      name: "UniMod:21",
      mass: 79.966331,
      sites: "STY"
    })
    this["monitor-mod"]?.push("UniMod:21")
  }

  addKGG() {
    this["var-mod"]?.push({
      name: "UniMod:121",
      mass: 114.042927,
      sites: "K"
    })
    this["monitor-mod"]?.push("UniMod:121")
  }

  addNTermMethionineExcision() {
    this["fixed-mod"]?.push({
      name: "UniMod:28",
      mass: -131.040485,
      sites: "M"
    })
  }

  addCCarbamidomethyl() {
    this["fixed-mod"]?.push({
      name: "UniMod:4",
      mass: 57.021464,
      sites: "C"
    })

  }

}

export interface MultiplexChannel {
  labelGroup: string;
  channelName: string;
  sites: string;
  mass: number[];
}

export interface Modifications {
  name: string;
  mass: number;
  sites: string;
  label?: string;
}

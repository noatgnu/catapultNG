import {Component, Input} from '@angular/core';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import {ResultSummary} from "../result-summary";
import {DataFrame, IDataFrame} from "data-forge";

PlotlyModule.plotlyjs = PlotlyJS;
@Component({
  selector: 'app-bar-chart-result-summary',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './bar-chart-result-summary.component.html',
  styleUrl: './bar-chart-result-summary.component.scss'
})
export class BarChartResultSummaryComponent {
  private _data: IDataFrame<ResultSummary> = new DataFrame()
  @Input() set data(value: ResultSummary[]) {
    this._data = new DataFrame(value)
    this.draw()
  }

  get data(): IDataFrame<ResultSummary> {
    return this._data
  }

  @Input() plotType = "precursor"

  @Input() minPrecursor: number|null = null
  @Input() maxPrecursor: number|null = null
  @Input() minProtein: number|null = null
  @Input() maxProtein: number|null = null

  barWidth = 50

  graphData: any[] = []
  graphLayout: any = {
    font: {
      family: 'Arial, sans-serif', // A clean, legible font
      size: 12, // Base font size for consistency
      color: '#333' // A dark, readable color
    },
    title: {
      text: 'Your Graph Title Here',
      font: {
        size: 16 // Slightly larger font size for the title
      }
    },
    xaxis: {
      title: {
        text: 'Sample',
        font: {
          size: 14 // Clear, legible font size for axis titles
        }
      },
      tickfont: {
        size: 12 // Consistent with the base font size
      },
      showgrid: true, // Show grid lines for better readability
      gridcolor: '#efefef', // Subtle grid line color
      tickmode: "array"

    },
    yaxis: {
      title: {
        text: 'Count',
        font: {
          size: 14 // Consistent with x-axis styling
        }
      },
      tickfont: {
        size: 12 // Consistent with the base font size
      },
      showgrid: true, // Show grid lines for better readability
      gridcolor: '#efefef' // Subtle grid line color
    },
    legend: {
      orientation: 'h', // Horizontal legend for better space utilization
      x: 0.5, // Center the legend
      xanchor: 'center',
      y: -0.2, // Position below the graph
      yanchor: 'top',
    },
    plot_bgcolor: '#fff', // White background for clarity
    margin: { // Adjust margins to ensure no clipping
      l: 50,
      r: 50,
      b: 200,
      t: 50,
      pad: 4
    },
    showlegend: false
  }

  revision = 0

  constructor() {
  }

  draw() {
    const graphData: any[] = []
    this.data.groupBy((g) => g.analysis.id).forEach((d) => {
      const graph: any = {
        type: 'bar',
        x: [],
        y: [],
        name: d.first().analysis.analysis_path,
        marker: {
          line: {
            color: 'rgb(0,0,0)',
            width: 2
          }
        },
      }
      if (this.plotType === "precursor") {
        graph.y = d.getSeries("precursor_identified").toArray()
      } else {
        graph.y = d.getSeries("protein_identified").toArray()
      }
      const x: string[] = []

      d.forEach((r: ResultSummary) => {
        let title = ""
        if (r.analysis.analysis_name) {
          title  = `${r.created_at} - ${r.file.file_path}`
        } else {
          title = `${r.created_at} - ${r.file.file_path}`
        }
        x.push(title)
      })
      graph.x = x
      graphData.push(graph)
    })

    if (this.plotType === "precursor") {
      this.graphLayout.title = "Precursor Identified"
    } else {
      this.graphLayout.title = "Protein Identified"
    }

    this.graphLayout.width = this.barWidth *this.data.count() + this.graphLayout.margin.l + this.graphLayout.margin.r
    this.graphData = graphData

    this.revision += 1
  }

}

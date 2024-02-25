import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbModal,
  NgbNav,
  NgbNavItem
} from "@ng-bootstrap/ng-bootstrap";
import {GeneralService} from "./general.service";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AccountsService} from "./accounts/accounts.service";
import {read} from "@popperjs/core";
import {ExperimentCreateComponent} from "./experiment/create/experiment-create.component";
import {AnalysisCreateComponent} from "./analysis/create/analysis-create.component";
import {WebsocketService} from "./websocket.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNavItem, NgbNav, RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{
  title = 'catapultNG';
  active = "home"
  breadcrumbsSub: Subscription|undefined
  breadcrumbs: string[] = []
  ready: boolean = false


  constructor(private websocketService: WebsocketService, private generalService: GeneralService, private changes: ChangeDetectorRef, public accounts: AccountsService, private modal: NgbModal) {
    this.accounts.loadToken()
    this.ready = true
    this.websocketService.connectNotification().asObservable().subscribe((data: any) => {
      console.log(data)
    })

  }

  ngOnInit(): void {
    this.breadcrumbsSub = this.generalService.breadCrumbsSubject.asObservable().subscribe((data: any) => {
      this.breadcrumbs = data.paths
      this.changes.detectChanges()
    })
  }

  ngOnDestroy(): void {
    this.breadcrumbsSub?.unsubscribe()
  }

  ngAfterViewInit() {
  }

  openCreateExperimentModal() {
    this.modal.open(ExperimentCreateComponent)
  }

  openCreateAnalysisModal() {
    this.modal.open(AnalysisCreateComponent)
  }
}

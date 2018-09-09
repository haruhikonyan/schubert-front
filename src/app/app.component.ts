import { Component, OnInit } from '@angular/core';
import { Type, Instrument, InstrumentCategory } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isCollapsed: boolean = true;

  constructor(private appServise: AppService) { }

  ngOnInit() {
    // TODO　フォーム以外では使わないのでここで取得はやめる
    // そもそもフォームの時に都度取得でいいのでは？
    // master-store.service 的なものを作って必要なところ取得済みかどうかを判断してなければという形にする
    this.appServise.getTypes();
    this.appServise.getInstruments();
    this.appServise.getInstrumentCategories();
    this.appServise.getRegions();
    this.appServise.getHoles();
    this.appServise.getConductors();
    this.appServise.getTunes();
    this.appServise.getSolists();
  }
}

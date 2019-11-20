import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnChanges {
  @Input() usuarios:any;
  public apelsB:any;
  constructor() { }

  ngOnChanges(changes:SimpleChanges){
    console.log(this.usuarios)
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { CircularService } from '../circular.service';
import { Circular } from '../circular.model';

@Component({
  selector: 'app-circular-listview',
  templateUrl: './circular-listview.component.html',
  styleUrls: ['./circular-listview.component.css']
})
export class CircularListviewComponent implements OnInit {

  @Input() includeInactive: boolean;
  circulars: Circular[];

  constructor(private circularService: CircularService) {}

  ngOnInit() {
    this.circularService.subCirculars().subscribe(circulars => {
      this.circulars = circulars;
    });
  }

}

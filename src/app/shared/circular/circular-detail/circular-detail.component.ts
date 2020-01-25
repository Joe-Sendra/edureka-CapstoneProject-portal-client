import { Component, OnInit } from '@angular/core';
import { Circular } from '../circular.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CircularService } from '../circular.service';

@Component({
  selector: 'app-circular-detail',
  templateUrl: './circular-detail.component.html',
  styleUrls: ['./circular-detail.component.css']
})
export class CircularDetailComponent implements OnInit {

  circularID: string;
  selectedCircular: Circular;

  constructor(private route: ActivatedRoute, private circularService: CircularService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.circularID = params['id'];
      this.circularService.getCircular(this.circularID).then(circular => {
        this.selectedCircular = circular;
      });
    });
  }
}

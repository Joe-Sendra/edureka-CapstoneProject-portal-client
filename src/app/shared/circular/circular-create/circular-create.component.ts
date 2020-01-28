import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CircularService } from '../circular.service';

@Component({
  selector: 'app-circular-create',
  templateUrl: './circular-create.component.html',
  styleUrls: ['./circular-create.component.css']
})
export class CircularCreateComponent implements OnInit {

  circularCreateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private circularService: CircularService) {}

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.circularCreateForm.controls; }
  get paragraphData() { return this.circularCreateForm.get('paragraphs') as FormArray; }

  initForm() {
    this.circularCreateForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      paragraphs: this.formBuilder.array([
        this.addParagraphFormGroup()
      ]),
      imgUrl: ['', [Validators.required]]
    });
  }

  onCreateCircular() {
    let paragraphs = new Array();
    paragraphs = this.circularCreateForm.controls.paragraphs.value.map(paragraph => paragraph.paragraph);

    const circular = this.circularCreateForm.value;
    circular.paragraphs = paragraphs;

    this.circularService.addCircular(this.circularCreateForm.value).then(isSuccess => {
      if (isSuccess) {
        this.circularCreateForm.reset();
      } else {
        console.log('error, TODO add alert');
      }
    });
  }

  addParagraphFormGroup(): FormGroup {
    return this.formBuilder.group({
      paragraph: ['', [Validators.required]]
    });
  }

  addParagraphButtonClick(): void {
    (this.circularCreateForm.get('paragraphs') as FormArray).push(this.addParagraphFormGroup());
  }

}

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsViewModel } from 'app/@core/models/form9s/form/forms.viewmodel';

@Component({
  selector: 'ngx-form9s',
  templateUrl: './form9s.component.html',
  styleUrls: ['./form9s.component.scss']
})
export class Form9sComponent implements OnInit {


  list: FormsViewModel[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.list = this.route.snapshot.data['list'];

  }

}

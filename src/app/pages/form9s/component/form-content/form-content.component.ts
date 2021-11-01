import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { FormClassMapping } from 'app/@core/models/form9s/form-class-mapping';
import { FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-form-content',
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.scss']
})
export class FormContentComponent implements OnInit {

  formClass: string;

  componentOutlet;

  baseData: FormBaseDataModel;
  formData: FormListModel;

  routeSub: Subscription;

  fileCount: string = '0';
  signCount: string = '0';


  // show_deleteDraftBtn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private form9sService: Form9sService,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {


    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];

    this.formClass = this.formData.formClass;
    this.setForm(this.formClass);
  }


  /**
 * 設定表單元件
 * @param formClass
 */
  setForm(formClass: string) {

    if (FormClassMapping.has(formClass)) {

      this.componentOutlet = FormClassMapping.get(formClass);

    } else {
      // this.router.navigate(['/form']);
    }

  }

  setFileCount(count: number) {
    this.fileCount = count.toString();
  }

  setSignCount(count: number) {
    this.signCount = count.toString();
  }


}

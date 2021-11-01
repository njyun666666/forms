import { OrgNode } from './../../@core/models/organization/org-node';
import { ResponseCode } from './../../@core/Enum/response-code.enum';
import { takeUntil } from 'rxjs/operators';
import { OrganizationService } from './../../@core/services/organization.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Subject } from 'rxjs';
import { OrgDeptLevel } from '../../@core/models/organization/org-dept-level';

import { OrgDeptInfo } from '../../@core/models/organization/org-dept-info';
import { MatDialog } from '@angular/material/dialog';
import { OrgAddDeptComponent } from './org-add-dept/org-add-dept.component';
import { OrgAccountInfo, OrgAccountStruct } from '../../@core/models/organization/org-account-info';
import { OrgEditUserStructComponent } from './org-add-user/org-edit-user-struct/org-edit-user-struct.component';
import { OrgAddUserComponent } from './org-add-user/org-add-user.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  id: string;
  expandable: boolean;
  name: string;
  level: number;
}



@Component({
  selector: 'ngx-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit, OnDestroy, AfterViewInit {

  dataChange = new BehaviorSubject<OrgNode[]>([]);

  @ViewChild('tree') tree;


  private _transformer = (node: OrgNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      manager: node.manager,
      deptID: node.deptID,
      type: node.type,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  expandedNodes;


  private ngUnsubscribe = new Subject();


  nodeActive: OrgNode;


  deptLevelList: OrgDeptLevel[];

  deptActive: OrgDeptInfo;




  userForm: FormGroup;
  userActive: OrgAccountInfo;
  userFormIsSubmit: boolean = false;
  userStruct: OrgAccountStruct[];



  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    public dialog: MatDialog
  ) {
    // this.dataSource.data = TREE_DATA;

  }



  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit(): void {


    // this.dataSource.data = TREE_DATA;


    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    this.getOrgTree();



  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    // this.tree.treeControl.expandAll();
    // console.log(this.tree.treeControl.dataNodes);
    // this.treeControl.expand(this.treeControl.dataNodes[0]);
    // this.treeControl.expand(this.treeControl.dataNodes[5]);
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(this.tree);
    // console.log(event);
    // console.log(event.previousIndex, event.currentIndex);
    // console.log(event.item.data);


    // moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
  }


  /**
   *取得組織樹
   *
   * @memberof OrganizationComponent
   */
  getOrgTree() {

    this.saveExpandedNodes();

    this.orgService.getOrgTree()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.dataChange.next(data.data);
        this.restoreExpandedNodes();
      });
  }

  /**
   * 儲存已展開
   *
   * @memberof OrganizationComponent
   */
  saveExpandedNodes() {
    this.expandedNodes = new Array<OrgNode>();
    this.treeControl.dataNodes.forEach(node => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.expandedNodes.push(node);
      }
    });
  }
  /**
   * 還原展開
   *
   * @memberof OrganizationComponent
   */
  restoreExpandedNodes() {
    this.expandedNodes.forEach(node => {
      this.treeControl.expand(this.treeControl.dataNodes.find(n => n.id === node.id));
    });
  }


  openAddDept(parentDept?) {
    const dialogRef = this.dialog.open(OrgAddDeptComponent, {
      width: '500px',
      data: { parentDept }
    });


    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {

        if (result !== undefined && result.code === ResponseCode.success) {
          this.getOrgTree();
        }

      });

  }


  openUserDept(dept?: OrgDeptInfo) {
    const dialogRef = this.dialog.open(OrgAddUserComponent, {
      width: '700px',
      data: { dept }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {

        if (result !== undefined && result.code === ResponseCode.success) {
          this.getOrgTree();
        }

      });

  }


  showEditArea(item: OrgNode) {
    this.nodeActive = item;

    if (item.type === 'dept') {

      this.deptActive = {
        deptID: item.id,
        deptName: item.name
      };

    } else {

      this.userActive = {
        uid: item.id,
        name: item.name
      };


    }

    // console.log(item);
  }



  orgPickerCallBack(result) {
    // console.log(result);
  }


}

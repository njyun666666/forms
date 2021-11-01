import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';
import { StepTypeEnum } from 'app/@core/Enum/step-type.enum';
import { FlowchartModel, FlowchartViewModel } from 'app/@core/models/flowchart/flowchart.model';
import { FlowchartService } from 'app/@core/services/flowchart/flowchart.service';
import { FlowchartNodeTypes } from 'app/@core/types/flowchart-node-types';
import * as flowchart from 'flowchart.js';

@Component({
  selector: 'ngx-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit, AfterViewInit {


  //  https://github.com/adrai/flowchart.js




  @Input() in_flowcharData: FlowchartModel;

  @ViewChild('diagram') diagramDOM: ElementRef;



  constructor(
    private flowchartService: FlowchartService
  ) { }


  ngOnInit(): void {

    // console.log(this.in_flowcharData);

  }

  ngAfterViewInit(): void {
    // console.log(this.diagramDOM.nativeElement);

    this.flowchartService.getFlowchart(this.in_flowcharData).toPromise().then((data) => {
      this.drawChart(data);
    });

  }

  drawChart(data: FlowchartViewModel) {

    let flowText = '';


    // 步驟
    data.step.forEach(step => {

      // let nodeType: FlowchartNodeTypes = 'parallel';

      switch (step.stepType) {
        case StepTypeEnum.Start:
          step.nodeType = 'start';
          break;

        case StepTypeEnum.EndAgree:
        case StepTypeEnum.EndReject:
        case StepTypeEnum.EndNotEstablished:
        case StepTypeEnum.EndInvalidate:
        case StepTypeEnum.EndCaseCompleted:
          step.nodeType = 'end';
          break;

        case StepTypeEnum.Decision:
          step.nodeType = 'condition';
          break;

        default:

          const thisLineCount = data.line.filter(x => x.startStepID === step.stepID).length;

          if (thisLineCount === 0) {
            step.nodeType = 'end';
          } else if (thisLineCount === 1) {
            step.nodeType = 'parallel';
          } else {
            step.nodeType = 'condition';
          }

          break;
      }



      let flowstate = '';
      if (step.stepID === this.in_flowcharData.stepID) {
        flowstate = '|nowStep';
      }

      flowText += `${step.stepID}=>${step.nodeType}: ${step.stepName}${flowstate}\n`;

    });




    flowText += `\n`;


    // 路線
    data.line.forEach(line => {

      const step = data.step.find(x => x.stepID === line.startStepID);


      switch (step.nodeType) {
        case 'start':
          flowText += `${line.startStepID}->${line.endStepID}\n`;
          break;

        case 'end':
          break;

        case 'condition':
          flowText += `${line.startStepID}(${line.flowchartPath})->${line.endStepID}\n`;
          break;

        default:
          flowText += `${line.startStepID}(${line.flowchartPath}, ${line.flowchartDirections})->${line.endStepID}\n`;
          break;
      }

    });




    flowText += `\n`;

    // 路線樣式
    data.line.forEach(line => {

      if (line.resultID === SignResultType.reject) {
        flowText += `${line.startStepID}@>${line.endStepID}({"stroke":"Red","stroke-width":"2"})@\n`;
      } else {
        flowText += `${line.startStepID}@>${line.endStepID}({"stroke-width":"2"})@\n`;
      }

    });


    // console.log(flowText);



    const diagram = flowchart.parse(flowText);

    diagram.drawSVG(this.diagramDOM.nativeElement, {
      'line-width': 1,
      'flowstate': {
        'nowStep': { 'fill': 'yellow', 'font-color': 'red' }
      }
    });


  }




}

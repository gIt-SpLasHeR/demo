import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { UniverseService } from '../common/universe.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  registerForm: FormGroup;
  eid: '';
  projectList = [];
  //   resourceList: new FormControl(),
  //   projectDetail: new FormGroup({
  //     projectName: new FormControl(),
  //     projectIntro: new FormControl()
  //   }),
  //   techSelection: new FormControl()
  //   // address: new FormGroup({
  //   //   street: new FormControl(),
  //   //   zip: new FormControl(),
  //   //   city: new FormControl()
  //   // })
  // });
  constructor(private formBuilder: FormBuilder,
              private universeService: UniverseService) {
    this.registerForm = this.formBuilder.group({
      resourceList: '',
      techSelection: '',
      projectName: '',
      projectIntro: '',
      resource: [],
      tech: [],
      nodes: [],
      edges: [],
      rootId: ''
    });
  }

  ngOnInit() {
      if ( !this.universeService.getParams('projectList')) {
        this.universeService.setParams('projectList', []);
        this.projectList = [];
      } else {
        this.projectList = JSON.parse(JSON.stringify(this.universeService.getParams('projectList')));
      }
  }
  addResource() {
    console.log(this.eid);
     // this.registerForm.value.resourceList.push(this.eid);
  }
  submit() {
    let rFromValue = this.registerForm.value;
    rFromValue.tech = rFromValue.techSelection.split(',');
    rFromValue.resource = rFromValue.resourceList.split(',');
    let graph = this.getGraph(rFromValue);
    rFromValue.nodes = graph.nodes;
    rFromValue.edges = graph.edges;
    rFromValue.rootId = graph.rootId;
    console.log(rFromValue, this.registerForm.value);
    this.universeService.getParams('projectList').push(this.registerForm.value);
    this.projectList.push(this.registerForm.value);
    console.log(this.universeService.getParams('projectList'));
    console.log('why twice:', this.projectList);
    this.registerForm.reset();
    graph = null;
    rFromValue = null;
  }
  getGraph (param: any) {
    const nodesArray = [];
    const nodesEdge = [];
    let parentId = this.uuid();
    const rootId = parentId;
    let childId = this.uuid();
    nodesArray.push({id: rootId , label: param.projectName});

    // tech selection
    nodesArray.push({id: childId, label: 'Tech Selection'});
    nodesEdge.push({from: parentId, to: childId});
    parentId = childId;
    for (const tech of param.tech) {
      childId = this.uuid();
      nodesArray.push({id: childId, label: tech});
      nodesEdge.push({from: parentId, to: childId});
    }

    parentId = rootId;
    childId = this.uuid();
    nodesArray.push({id: childId, label: 'Resource'});
    nodesEdge.push({from: parentId, to: childId});
    parentId = childId;
    for (const re of param.resource) {
      childId = this.uuid();
      nodesArray.push({id: childId, label: re});
      nodesEdge.push({from: parentId, to: childId});
    }

    parentId = rootId;
    childId = this.uuid();
    nodesArray.push({id: childId, label: 'Project Intro'});
    nodesEdge.push({from: parentId, to: childId});
    parentId = childId;
    childId = this.uuid();
    nodesArray.push({id: childId, label: param.projectIntro});
    nodesEdge.push({from: parentId, to: childId});
    return { nodes: nodesArray, edges: nodesEdge, rootId: rootId };
  }

  uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}

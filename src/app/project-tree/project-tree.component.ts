import { Component, OnInit } from '@angular/core';
import {UniverseService} from '../common/universe.service';
import * as vis from 'vis';
@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css']
})
export class ProjectTreeComponent implements OnInit {
  projectList = [];
  searchKey = '';
  constructor(private universeService: UniverseService) { }

  ngOnInit() {
   this.projectList = this.universeService.getParams('projectList');
   console.log(this.projectList);
  }
  showVis(param: string) {
    const filter = this.generateNode(param);
    const arrayNode = [{id: 0, label: param}]; // search param as root node
    const nodes = new vis.DataSet(filter.nodesArray);
    const edges = new vis.DataSet(filter.edgeArray);
    // create a network
    const container = document.getElementById('visContainer');
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {
      groups: {
        root: { color: { background: 'red',      highlight: {
              border: 'red',
              background: 'red'
            },
            hover: {
              border: 'red',
              background: 'red'
            }}}
      }
    };
    const network = new vis.Network(container, data, options);
  }
  private generateNode(param: string) {
    console.log(param);
    let nodesArray = [{id: 0, label: param, group: 'root'}];
    let edgeArray = [];
    for (const project of this.projectList) {
      for (const prop in project ) {
        if (! Array.isArray(project[prop]) && project[prop].indexOf(param) > -1 ) {
          nodesArray = nodesArray.concat(project.nodes);
          edgeArray = edgeArray.concat(project.edges);
          edgeArray.push({from: 0, to: project.rootId});
          break;
        }
      }
    }
    return {nodesArray: nodesArray, edgeArray: edgeArray};
  }
}

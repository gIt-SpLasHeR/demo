import { Injectable } from '@angular/core';

@Injectable()
export class UniverseService {
  private resources: Map<string, any>;
  constructor() {  this.resources = new Map(); }
  setParams (key: string, value: any) {
    this.resources.set(key, value);
  }

  getParams (key: string): any {
    return this.resources.get(key);
  }
}

  import { Injectable } from "@angular/core";
  import { BrowserXhr } from "@angular/http";
  @Injectable()
  export class EnableCors extends BrowserXhr {
    constructor() {
      super();
    }
    build(): any {
      let xhr = super.build();
      console.log("xhrxhrxhrxhrxhrxhr", xhr);
      xhr.withCredentials = true; // this is all the magic we need for now
      // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://*');
      return <any > (xhr);
    }
  }

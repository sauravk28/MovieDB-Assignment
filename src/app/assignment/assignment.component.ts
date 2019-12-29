import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  matchedMedia: any=[{}];
  matchedDescription:any;
  noTitle:number=0;

  constructor(private http:HttpClient) { }
  ngOnInit() {

  }

  private getResults(res){
    if(res.valid)
    { 
      this.noTitle = 0;
      this.http.get(`http://www.omdbapi.com/?apikey=f9aadea2&s=${res.value.mediaName}&type=${res.value.mediaType}
      &y=${res.value.mediaYear}`).subscribe(data=>{
        
         var searchResultObj:any = data;
          console.log(data);
          if(searchResultObj.Search){
          console.log(searchResultObj.Search);
          this.matchedMedia = searchResultObj.Search;
          }
      });
    }
    else this.noTitle = 1;
  }

  
  

}

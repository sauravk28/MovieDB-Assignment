import { FormsModule, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{FormGroup,FormControl} from '@angular/forms';

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

  newForm:FormGroup;

  ngOnInit() {

    this.newForm= new FormGroup({
        name: new FormControl('',[Validators.required,Validators.pattern('/^[a-zA-Z]*$/')]),
        num: new FormControl('',Validators.required),
        rad: new FormControl('yes')

    });
    

  }

  sendData(form){
    console.log(form.value.name);
    console.log(form.value.num);
    console.log(form.value.rad);
    
  }

   getResults(res){
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

   getDescription(mediaTitle){
    this.http.get(`http://www.omdbapi.com/?apikey=f9aadea2&t=${mediaTitle}`).subscribe(data=>{
        var descriptionObj:any= data;
        console.log(descriptionObj);
        this.matchedDescription = descriptionObj;
    });
  }

}

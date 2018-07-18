 import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  search =new FormControl('', [Validators.minLength(3)])

  @Output() searchEvent=new EventEmitter<string>()

  constructor(){ }

  ngOnInit(){
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe(
      (searchInput:string)=>{
        if(!this.search.invalid){
        this.searchEvent.emit(searchInput)
        
        }

    })

  }

  getErrorMessage(){
    return this.search.hasError('minLength')?'Type more than 2 characters for search to work':''
  }
  
}  

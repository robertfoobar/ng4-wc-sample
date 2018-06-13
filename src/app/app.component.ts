import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ModuleLoaderService} from './module-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private webComponentLoader: ModuleLoaderService) {}

  @ViewChild('data')
  form: NgForm;

  handleSubmission() {
    alert('form submitted');
  }

  ngOnInit(): void {
    this.webComponentLoader.load('https://localhost:8000/custom-polymer-element.js');
  }
}

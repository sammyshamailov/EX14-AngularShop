import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.css']
})
export class SocialLinkComponent implements OnInit, AfterContentInit {

  @ContentChildren ('link') links : QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.links.forEach(linkInstance => linkInstance.nativeElement.target = '_blank');
  }

}

import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserById } from 'src/app/users/store/users.selector';

@Component({
  selector: 'app-parent-tab',
  templateUrl: './parent-tab.component.html',
  styleUrls: ['./parent-tab.component.scss']
})
export class ParentTabComponent implements OnInit {
  userDetails: any;

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.getDetails(Number(id));

  }

  public getDetails(id: number) {
    let data$ = this.store.pipe(select(selectUserById(id)));
    data$.subscribe((response) => {
      if (response) {
        this.userDetails = response;
      }
    });
  }
}

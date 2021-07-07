import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { IdentificationWindowModalComponent } from '../identification-window-modal/identification-window-modal.component';

@Component({
  selector: 'app-error-block',
  templateUrl: './error-block.component.html',
  styleUrls: ['./error-block.component.css']
})
export class ErrorBlockComponent implements OnInit {

  @Input() error: any = null;
  @Input() withImage: boolean = false;
  @Output() onTryAgainClick = new EventEmitter();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    switch(this.error.status) {
      case 403: {
        const recipeId = this.getRecipeIdOrNullFromQuery();
        if (this.isEditRecipePage() && recipeId !== null) {
          this.router.navigate(['/recipe', recipeId]);
        }
        break;
      }
    }
  }

  public clickTryAgain(): void {
    this.onTryAgainClick.emit();
  }

  public openIdentificationModal(): void {
    this.dialog.open(IdentificationWindowModalComponent, {
      autoFocus: false,
      data: '',
    });
  }

  private isEditRecipePage(): boolean {
    return this.activatedRoute.snapshot.routeConfig.path === 'edit';
  }

  private getRecipeIdOrNullFromQuery(): number {
    const recipeId = (this.activatedRoute.firstChild)
        ? Number(this.activatedRoute.firstChild.snapshot.paramMap.get('id'))
        : null;
    return recipeId;
  }
}

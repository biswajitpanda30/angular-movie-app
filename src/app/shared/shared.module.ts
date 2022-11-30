import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './custom-material.module';
import { ImgMissingDirective } from './directives/img-missing.directive';

@NgModule({
  imports: [CommonModule, CustomMaterialModule, RouterModule],
  exports: [
    CommonModule,
    CustomMaterialModule,
    ImgMissingDirective
  ],
  declarations: [ImgMissingDirective],
})
export class SharedModule {}

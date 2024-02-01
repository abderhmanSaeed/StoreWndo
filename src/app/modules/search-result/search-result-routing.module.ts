import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { SectionsSectionComponent } from './components/sections-section/sections-section.component';
import { StoresSectionComponent } from './components/stores-section/stores-section.component';
import { SearchResultComponent } from './search-result.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResultComponent,
    children: [
      {
        path: 'sections',
        component: SectionsSectionComponent
      },
      {
        path: 'categories',
        component: CategoriesSectionComponent
      },
      {
        path: 'products',
        component: SearchProductsComponent
      },
      {
        path: 'stores',
        component: StoresSectionComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultRoutingModule { }

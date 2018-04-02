import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header';
import { AppFooterComponent } from './app-footer/app-footer';
@NgModule({
	declarations: [AppHeaderComponent,
    AppFooterComponent],
	imports: [],
	exports: [AppHeaderComponent,
    AppFooterComponent]
})
export class ComponentsModule {}

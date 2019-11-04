import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowComponent } from './views/show/show.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FeaturedEntryComponent } from './components/featured-entry/featured-entry.component';
import { EpisodeComponent } from './views/episode/episode.component';
import { NgxAudioplayerModule } from '@podnoms/ngx-audioplayer';
import { PodcastDataService } from './services/podcast-data.service';
import { PodcastEntryDataService } from './services/podcast-entry-data.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TopMenuComponent,
        ShowComponent,
        NotFoundComponent,
        FeaturedEntryComponent,
        EpisodeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgxAudioplayerModule
    ],
    providers: [PodcastDataService, PodcastEntryDataService],
    bootstrap: [AppComponent]
})
export class AppModule {}

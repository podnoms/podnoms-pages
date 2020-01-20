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
import { EpisodeListItemComponent } from './components/episode-list-item/episode-list-item.component';
import { DebugComponent } from './views/debug/debug.component';
import { DomainResolverService } from './services/domain-resolver.service';
import { DomainResolver } from './services/domain-resolver';
import { SubscribeComponent } from './views/subscribe/subscribe.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TopMenuComponent,
        ShowComponent,
        NotFoundComponent,
        FeaturedEntryComponent,
        EpisodeListItemComponent,
        EpisodeComponent,
        DebugComponent,
        SubscribeComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutingModule,
        NgxAudioplayerModule,
        LoggerModule.forRoot({ level: NgxLoggerLevel.OFF }),
    ],
    providers: [PodcastDataService, PodcastEntryDataService, DomainResolver, DomainResolverService],
    bootstrap: [AppComponent],
})
export class AppModule {}

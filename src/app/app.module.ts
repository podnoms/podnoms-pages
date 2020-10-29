import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowComponent } from './views/show/show.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderEntryComponent } from './components/header-entry/header-entry.component';
import { EpisodeComponent } from './views/episode/episode.component';
import { NgxAudioplayerModule } from '@podnoms/ngx-audioplayer';
import { PodcastDataService } from './services/podcast-data.service';
import { PodcastEntryDataService } from './services/podcast-entry-data.service';
import { EpisodeListItemComponent } from './components/episode-list-item/episode-list-item.component';
import { DebugComponent } from './views/debug/debug.component';
import { DomainResolverService } from './services/domain-resolver.service';
import { DomainResolver } from './services/domain-resolver';
import { SubscribeComponent } from './views/subscribe/subscribe.component';
import { CommentBoxComponent } from './shared/comment-box/comment-box.component';
import { CommentsService } from './services/comments.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment.prod';
import { NgxLoggerLevel } from '../../node_modules/ngx-logger/lib/types/logger-level.enum';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TopMenuComponent,
        ShowComponent,
        NotFoundComponent,
        HeaderEntryComponent,
        EpisodeListItemComponent,
        EpisodeComponent,
        DebugComponent,
        SubscribeComponent,
        CommentBoxComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgxAudioplayerModule,
        MomentModule,
        LoggerModule.forRoot(environment.logConfig),
    ],
    providers: [
        PodcastDataService,
        PodcastEntryDataService,
        DomainResolver,
        DomainResolverService,
        CommentsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShowComponent } from './views/show/show.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EpisodeComponent } from './views/episode/episode.component';
import { DebugComponent } from './views/debug/debug.component';
import { DomainResolver } from './services/domain-resolver';
import { DomainResolverService } from './services/domain-resolver.service';
import { SubscribeComponent } from './views/subscribe/subscribe.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: { domain: DomainResolver },
    },
    { path: ':episode', component: EpisodeComponent, resolve: { domain: DomainResolver } },
    { path: ':user/:podcast', component: ShowComponent, resolve: { domain: DomainResolver } },
    { path: ':user/:podcast/subscribe', component: SubscribeComponent },
    {
        path: ':user/:podcast/:episode',
        component: EpisodeComponent,
        resolve: { domain: DomainResolver },
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

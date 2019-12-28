import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShowComponent } from './views/show/show.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EpisodeComponent } from './views/episode/episode.component';
import { DebugComponent } from './views/debug/debug.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'arglebarglefooferra', component: DebugComponent },
    { path: ':user/:podcast', component: ShowComponent },
    { path: ':user/:podcast/:episode', component: EpisodeComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

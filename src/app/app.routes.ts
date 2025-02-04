import { Routes } from '@angular/router';

export const routes: Routes = [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path: 'home', component: HomeComponent},
    // {path: 'about/:id', component : AboutComponent}
    {
        path: '',
        loadComponent:() =>  import('./components/home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent:() =>  import('./components/about/about.component').then((m) => m.AboutComponent)
    },
    {
        path: 'admin',
        loadComponent:() =>  import('./components/admin/admin.component').then((m) => m.AdminComponent),
    }
];

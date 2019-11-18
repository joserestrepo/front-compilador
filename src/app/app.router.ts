import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { ListaArchivosComponent } from './components/lista-archivos/lista-archivos.component';


const ROUTES: Routes = [
    { path: 'editor', component: EditorComponent },
    { path: 'listaArchivos', component: ListaArchivosComponent},

    { path: '', pathMatch:'full', redirectTo:"editor"},
    { path: '**', pathMatch:'full', redirectTo:"editor"}

];

export const APP_ROUTING= RouterModule.forRoot(ROUTES)
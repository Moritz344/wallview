import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Local } from './home/local/local';
import { Browse } from './home/browse/browse';

export const routes: Routes = [
  { path: "",component: Home},
  { path: "local",component: Local},
  { path: "browse",component: Browse},
];

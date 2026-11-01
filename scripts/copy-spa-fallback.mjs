// GitHub Pages has no server-side rewrites. Serving index.html as 404.html
// lets any deep link (e.g. /products/tilt-indicator) load the SPA, which then
// resolves the route client-side with React Router.
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));

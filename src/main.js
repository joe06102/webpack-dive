import B from './b';
import C from './c';

B('b');
C('c');
const d = import('./d').then(module => { console.log(module) })
console.log('done');
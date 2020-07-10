import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const a = of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc

a.subscribe((val) => {
  console.log(val);
});
console.log(a);

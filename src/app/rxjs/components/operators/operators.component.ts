import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, ObservedValueOf, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-operators',
	templateUrl: './operators.component.html',
	styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
	number$: Observable<number> = interval(1000);
	myArray = [10, 20, 30];

	private myArrayOf$!: Observable<number[]>;
	private myArrayFrom$!: Observable<ObservedValueOf<number[]>>;
	private myArray$!: Observable<ObservedValueOf<number[]>>;

	private subject = new Subject<number>();

	ngOnInit(): void {
		this.myArrayOf$ = of(this.myArray);
		this.myArrayOf$.subscribe((data) => console.log('Data of =>', data));

		this.myArrayFrom$ = from(this.myArray);
		this.myArrayFrom$.subscribe((data) =>
			console.log('Data from => ', data)
		);

		this.myArray$ = from(this.myArray);
		this.myArray$
			.pipe(tap((data) => data * 2))
			.subscribe((data) => console.log('DataTap', data));

		this.subject
			.pipe(tap((data) => console.log('DataTap', data)))
			.subscribe();
		this.subject.next(Math.random());
		this.subject.next(Math.random());

		this.myArray$
			.pipe(map((data) => data * 2))
			.subscribe((dataRes) => console.log('DataMap => ', dataRes));
	}
}

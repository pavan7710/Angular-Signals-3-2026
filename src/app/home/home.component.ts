import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';

type Counter = {
  value: number;
};

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //   counter = signal<number>(10).asReadonly();
  //   counter = signal('Value');

  counter = signal<Counter>({
    value: 100,
  });

  values = signal<number[]>([1, 2, 3, 4, 5, 6]);

  increment() {
    // this.counter.set(this.counter() + 1);
    // this.counter.update((counter) => counter + 1);
    // this.counter().value++; // worng way ( it will not work signal base change setection)

    this.counter.update((counter) => ({
      ...counter,
      value: counter.value + 1,
    }));
  }

  append() {
    const values = this.values();
    // dont mutate the array or objects diretly always use the spread array.
    this.values.update((values) => [...values, values[values.length - 1] + 1]);
  }
}

// A computed signal is an angular read only signal that is automaticaaly
// recalculated depending on the values of other source signals

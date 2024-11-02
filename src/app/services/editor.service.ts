import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EditorService {

    public clear$ = new Subject<void>();
    public paste$ = new Subject<void>();
    public copy$ = new Subject<void>();

}

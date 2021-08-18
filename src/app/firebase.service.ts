import { Injectable } from '@angular/core';
import { Book } from '../app/book.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, delay, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    _book = new BehaviorSubject<Book[]>([])
    rowName: string;

    constructor(private http: HttpClient) { }

    getAllBookUser() {
        return this._book.asObservable();
    }
    
    addUser(book: Book) {
        let newId: string;
        return this.http.post('https://project-uas-mobile.firebaseio.com/data.json',
            { ...book, id: null }).pipe(
                switchMap(
                    (data) => {
                        newId = data['name'];
                        this.rowName = data['name'];
                        return this.getAllBookUser()
                    }),
                take(1),
                tap((allBook) => {
                    book['id'] = newId;
                    this._book.next(allBook.concat(book))
                })
            )
    }

    getName(){
        return this.http.get('https://project-uas-mobile.firebaseio.com/data/' + this.rowName +'.json');
    }
    
}

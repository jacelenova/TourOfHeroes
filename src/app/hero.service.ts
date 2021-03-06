import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:2000/api/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {

    }
    getHeroes() : Promise<Hero[]> {
        // return Promise.resolve(HEROES);
        return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(response => {
                        return response.json() as Hero[];
                    })
                    .catch(this.handleError);
    }
    getHeroesSlowly(): Promise<Hero[]> {
            return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        })
    }
    getHero(id: Number): Promise<Hero> {
        // return this.getHeroes().then(
        //     (heroes) => heroes.find((hero) => hero.id === id)
        // );
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response.json() as Hero)
                        .catch(this.handleError);
    }
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, { name: name })
            // .post(this.heroesUrl, JSON.stringify({ name: name}))
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }
    delete(id: Number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
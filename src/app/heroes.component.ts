import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService, private router: Router) { }

  ewan = '';
  myFood = '';
  name = 'Angular';
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes;
    });
  }
  getHeroesSlowly(): void {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        if (this.selectedHero === hero) this.selectedHero = null;
      });
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  ngOnInit(): void {
    this.getHeroes();
    // this.getHeroesSlowly();
  }
  trackByHeroes(index: number, hero: Hero): number {
    return hero.id;
  }
  test(): boolean {
    return !!this.selectedHero;
  }
 }

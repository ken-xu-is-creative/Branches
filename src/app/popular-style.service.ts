import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase';

const { Storage } = Plugins;

const favouriteKey = 'favorites';
const initializedKey = 'favoritesInitialized';

@Injectable({
  providedIn: 'root'
})
export class PopularStyleService {

  constructor(
    private httpClient: HttpClient,
  ) {
    console.log('FavoriteStylesService.constructor()');
    this.didInitialize().then(initialized => {
      if (!initialized) {
        this.httpClient.get<FavoriteStyle[]>('assets/data/default-favorites.json').subscribe(favorites => {
          this.addAllPopularStyles(favorites);
          this.setInitialize(true);
        });
      }
    });
  }

  public async getAllPopularStyles(): Promise<any> {


    var data;

    const fileRef = firebase.firestore().collection("Style")

    const fileSearch = fileRef.where("privacy","==",false);

    await fileSearch.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          data = doc.data();
          
      });
    });

    return data;


  }

  public async addAllPopularStyles(favorites: FavoriteStyle[]): Promise<void> {
    await Storage.set({ key: favouriteKey, value: JSON.stringify(favorites) });
  }

  public async moveItem(from: number, to: number): Promise<void> {
    const favorites = await this.getAllPopularStyles();
    favorites.splice(to, 0, favorites.splice(from, 1)[0]);
    await this.addAllPopularStyles(favorites);
  }

  public async removeFavorite(index: number): Promise<void> {
    let favorites = await this.getAllPopularStyles();
    favorites.splice(index, 1);
    await this.addAllPopularStyles(favorites);
  }

  public async hasFavorite(url: string): Promise<boolean> {
    const favorites = await this.getAllPopularStyles();
    const found = favorites.find(favorite => favorite.slug === this.getSlug(url));
    return found !== undefined;
  }

  private async didInitialize(): Promise<boolean> {
    const data = await Storage.get({ key: initializedKey });
    return JSON.parse(data.value);
  }

  public async setInitialize(flag: boolean): Promise<void> {
    await Storage.set({ key: initializedKey, value: JSON.stringify(flag) });
  }

  private getSlug(url: string): string {
    let slug: string = url;
    slug = slug.substr(slug.lastIndexOf('/'));
    slug = slug.substring(0, slug.indexOf('.'));
    return slug;
  }
}

export interface FavoriteStyle {
  slug?: string;
  title?: string;
  image: string;
  description?: string;
  isPublic: boolean;
  date: string;
  author?: {
    name: string;
    bio?: string;
  };
}
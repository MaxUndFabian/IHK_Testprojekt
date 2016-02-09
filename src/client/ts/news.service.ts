import {News} from './news-interface';
import {NEWS} from './mock-news';
import {Component} from 'angular2/core';

@Component()
export class NewsService {
  getNews() {
    return Promise.resolve(NEWS);
  }
}
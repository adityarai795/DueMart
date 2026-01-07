import { Component, signal } from '@angular/core';
import { isStringTextContainingNode } from 'typescript';
import {  OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  total: number = 0;
  ngOnInit() {
localStorage.setItem('total', this.total.toString());
  }
}

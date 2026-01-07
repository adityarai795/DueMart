import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = [
    {
      name: 'Fashion',
      image:
        'https://static.fibre2fashion.com//articleresources/images/102/10114/ss228372_Small.jpg',
    },
    {
      name: 'Electronics',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSyG5pltRD3oh2ziX5aoZnlBgEE0N1F1EIA&s',
    },
    {
      name: 'Grocery',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzl2vgSWWkJOVkLbEeXaMstSuSz3dMRi_KsQ&s',
    },
    {
      name: 'Beauty',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSsus0IWbwLq0EG0W39fJUUDCstEtyWLfaw&s',
    },
    {
      name: 'Medical',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kCs5k4n592zSD3mjxGpX2w6H9HYeQDcHcA&s',
    },
  ];
}

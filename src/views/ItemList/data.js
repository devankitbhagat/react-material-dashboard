import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    title: '1 BHK',
    categoryId: 1,
    category: {
      title: 'House'
    }, 
    length: null,
    breadth: null,
    height: null,
    status: 'active',
    createdAt: '2020-07-18 23:12:00'
  },
  {
    id: uuid(),
    title: 'Carton',
    categoryId: 2,
    category: {
      title: 'Carton'
    }, 
    length: 4,
    breadth: 4,
    height: 4,
    status: 'active',
    createdAt: '2020-07-18 23:12:00'
  },
  {
    id: uuid(),
    title: 'Carton',
    categoryId: 2,
    category: {
      title: 'Carton'
    }, 
    length: 8,
    breadth: 8,
    height: 8,
    status: 'active',
    createdAt: '2020-07-18 23:12:00'
  },
  {
    id: uuid(),
    title: 'Bike',
    categoryId: 3,
    category: {
      title: 'Automobile'
    }, 
    length: null,
    breadth: null,
    height: null,
    status: 'deleted',
    createdAt: '2020-07-18 23:12:00'
  },
  {
    id: uuid(),
    title: 'Car',
    categoryId: 1,
    category: {
      title: 'Automobile'
    }, 
    length: null,
    breadth: null,
    height: null,
    status: 'active',
    createdAt: '2020-07-18 23:12:00'
  },
  {
    id: uuid(),
    title: '2 BHK',
    categoryId: 1,
    category: {
      title: 'House'
    }, 
    length: null,
    breadth: null,
    height: null,
    status: 'active',
    createdAt: '2020-07-18 23:12:00'
  },
];

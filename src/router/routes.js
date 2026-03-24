const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'create-order', component: () => import('components/CreateOrder.vue') },
      { path: 'order-list', component: () => import('components/OrderList.vue') },
      { path: 'product-list', component: () => import('components/ProductList.vue') },
      { path: 'new-product', component: () => import('components/NewProduct.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

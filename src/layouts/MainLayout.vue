<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> CRUD Quasar app + Firebase </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Lista de productos',
    caption: 'Ver lista de productos',
    icon: 'list',
    link: '/product-list',
  },
  {
    title: 'Ordenes',
    caption: 'Ver ordenes creadas',
    icon: 'receipt_long',
    link: '/order-list',
  },
  {
    title: 'Crear una orden',
    caption: 'Crear una nueva orden',
    icon: 'add_shopping_cart',
    link: '/create-order',
  },
  {
    title: 'Nuevo producto',
    caption: 'Crear un nuevo producto',
    icon: 'add',
    link: '/new-product',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

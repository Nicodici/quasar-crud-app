<template>
  <q-item clickable :tag="isExternalLink ? 'a' : 'div'"
  :target="isExternalLink ? '_blank' : '_self'"
  :to="isExternalLink ? props.link : undefined"
  :href="props.link">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
})

//Funcion que verifica si el link es externo o interno, para abrirlo en una nueva pestaña o no
const isExternalLink = computed(() => {
  return props.link.startsWith('http://') || props.link.startsWith('https://')
})
</script>

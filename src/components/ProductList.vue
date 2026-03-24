<template>
  <div class="q-pa-md form-shell">
    <div class="text-h5 q-mb-md text-center form-title">Lista de productos</div>
    <div class="container-table">
      <q-table bordered title="Productos" :rows="rows" :columns="columns" row-key="name">
        <template #body-cell-actions="{ row }">
          <q-td class="text-center">
            <q-btn icon="edit" color="primary" flat round dense @click="editProduct(row)" />
            <q-btn icon="delete" color="negative" flat round dense @click="deleteProduct(row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { firebaseService } from '../services/firebase'

onMounted(async () => {
  const products = await firebaseService.getAllProducts()
  rows.splice(0, rows.length, ...products)
})

const columns = reactive([
  {
    name: 'name',
    label: 'Nombre',
    required: true,
    align: 'left',
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: 'price',
    label: 'Precio',
    required: true,
    align: 'left',
    field: (row) => row.price,
    sortable: true,
  },
  {
    name: 'description',
    label: 'Descripción',
    required: true,
    align: 'left',
    field: (row) => row.description,
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center',
    field: 'actions',
    sortable: false,
  },
])

const rows = reactive([])

const editProduct = (row) => {
  console.log('Editar producto:', row)
}

const deleteProduct = async (row) => {
  await firebaseService.deleteProduct(row.id)
  const index = rows.findIndex((r) => r.id === row.id)
  if (index !== -1) rows.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.q-table {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 14px 42px rgba(199, 205, 218, 0.12);
}

.form-shell {
  min-height: calc(100vh - 140px);
  display: grid;
  align-content: center;
  background:
    radial-gradient(circle at 15% 10%, rgba(47, 128, 237, 0.14), transparent 45%),
    radial-gradient(circle at 85% 90%, rgba(56, 239, 125, 0.14), transparent 40%),
    linear-gradient(180deg, #f5f8ff 0%, #eef3f7 100%);
}

.form-title {
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #1f2937;
}

.container-table {
  --table-top-bg: #0f172a;
  --table-top-text: #f8fafc;
  --table-head-bg: #1e3a5f;
  --table-head-text: #e2e8f0;
  --table-head-border: #2f4b73;

  width: min(100%, 800px);
  margin: 0 auto;
}

:deep(.q-table__top) {
  background-color: var(--table-top-bg);
  color: var(--table-top-text);
  font-weight: 700;
}

:deep(.q-table thead tr th) {
  background-color: var(--table-head-bg);
  color: var(--table-head-text);
  border-color: var(--table-head-border);
  font-weight: 700;
}

:deep(.q-table thead tr th .q-table__sort-icon),
:deep(.q-table thead tr th .q-icon) {
  color: var(--table-head-text);
}
</style>

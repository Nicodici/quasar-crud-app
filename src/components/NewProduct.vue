<template>
  <section class="form-shell q-pa-md q-pa-lg-md">
    <div class="text-h4 text-center form-title q-mb-md">Nuevo producto</div>

    <q-form
      ref="productForm"
      class="product-form q-gutter-md"
      @submit.prevent="submitForm"
      @reset="onReset"
    >
      <q-input v-model="productName" label="Nombre del producto" :rules="[required]" />
      <q-input
        v-model="productPrice"
        label="Precio del producto"
        type="number"
        :rules="[required, positivePrice]"
      />
      <q-input
        v-model="productDescription"
        label="Descripción del producto"
        type="textarea"
        :rules="[required, minDescriptionLength]"
      />

      <div class="row q-gutter-sm q-mt-md actions-row">
        <q-btn label="Crear" type="submit" color="primary" class="action-btn" unelevated />
        <q-btn label="Limpiar" type="reset" color="secondary" class="action-btn" outline />
      </div>
    </q-form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { firebaseService } from '../services/firebase'

const productForm = ref(null)
const productName = ref('')
const productPrice = ref(null)
const productDescription = ref('')

const submitForm = () => {
  const newProduct = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
  }
  try {
    firebaseService.addProduct(newProduct)
    console.log('Producto agregado con éxito', newProduct)
  } catch (error) {
    console.error('Error al agregar producto:', error)
  }
}

const onReset = () => {
  productName.value = ''
  productPrice.value = null
  productDescription.value = ''
  productForm.value?.resetValidation()
}

// Validación simple para campos requeridos
const required = (val) => !!val || 'Este campo es requerido'
//Validacion para precio positivo
const positivePrice = (val) => val > 0 || 'El precio debe ser un valor positivo'
//Validacion, descripcion debe tener al menos 10 caracteres
const minDescriptionLength = (val) =>
  val.length >= 10 || 'La descripción debe tener al menos 10 caracteres'
</script>

<style scoped>
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

.product-form {
  width: min(100%, 500px);
  margin: 0 auto;
  padding: 1.25rem;
  border-radius: 5px;
  border: 2px solid #344b69;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 14px 42px rgba(17, 24, 39, 0.12);
  backdrop-filter: blur(8px);
}

.product-form :deep(.q-field--filled:hover .q-field__control) {
  background: #818181;
  border-color: #acacac;
}

.actions-row {
  justify-content: flex-end;
}

.action-btn {
  min-width: 120px;
  border-radius: 12px;
}

:deep(.q-field--filled .q-field__control) {
  border-radius: 12px;
  background: rgba(241, 241, 241, 0.9);
}

:deep(.q-field--filled .q-field__native) {
  color: #888c96;
}

:deep(.q-field__label) {
  color: #475569;
}

@media (max-width: 600px) {
  .product-form {
    padding: 1rem;
    border-radius: 5px;
  }

  .actions-row {
    justify-content: stretch;
  }

  .action-btn {
    flex: 1 1 100%;
  }
}
</style>

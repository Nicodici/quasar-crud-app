<template>
  <section class="form-shell q-pa-md q-pa-lg-md">
    <q-form class="login-form q-gutter-md">
      <div class="text-h4 q-mb-md text-center form-title">Login</div>

      <q-input v-model="email" label="Email" type="email" />
      <q-input v-model="password" label="Password" type="password" />

      <div class="row q-gutter-sm q-mt-md actions-row">
        <q-btn
          label="Login"
          color="primary"
          class="action-btn"
          @click.prevent="authUser"
          unelevated
        />
      </div>

      <div v-if="loginOk === true" class="text-positive q-mt-md">Login successful!</div>
      <div v-else-if="loginOk === false" class="text-negative q-mt-md">
        Login failed. Please check your credentials.
      </div>
    </q-form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

//Importamos las funciones necesarias de Firebase para la autenticación
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
let email = ref('')
let password = ref('')
let loginOk = ref(null)
//Creamos una funcion para autenticar al usuario con Firebase, utilizando las variables reactivas email y password que se actualizan con el v-model de los inputs del formulario. Esta función se ejecutará al hacer click en el botón de enviar, y evitará el comportamiento por defecto del formulario con @click.prevent.
const router = useRouter()
const authUser = () => {
  const auth = getAuth()
  console.log('Intentando autenticar con email:', email.value, 'y password:', password.value)
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Usuario autenticado correctamente')
      loginOk.value = true
      router.push('/product-list') // Redirige a la lista de productos después del login exitoso
    })
    .catch((error) => {
      console.log('Error al autenticar al usuario:', error)
      loginOk.value = false

    })


}
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

.login-form {
  width: min(100%, 500px);
  margin: 0 auto;
  padding: 1.25rem;
  border-radius: 20px;
  border: 2px solid #bad8ff;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 14px 42px rgba(17, 24, 39, 0.12);
  backdrop-filter: blur(8px);
}

.login-form :deep(.q-field--filled:hover .q-field__control) {
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
  .login-form {
    padding: 1rem;
    border-radius: 16px;
  }

  .actions-row {
    justify-content: stretch;
  }

  .action-btn {
    flex: 1 1 100%;
  }
}
</style>

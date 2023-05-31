<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <formulario-cliente />
      </q-card-section>
      <q-card-section>
        <lista-clientes />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const formularioCliente = defineAsyncComponent(() =>
  import("src/components/FormularioCliente.vue")
);
const ListaClientes = defineAsyncComponent(() =>
  import("src/components/ListaClientes.vue")
);
</script>
<script></script>

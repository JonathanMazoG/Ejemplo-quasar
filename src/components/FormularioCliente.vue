<template>
  <q-card flat>
    <q-card-section>
      <div style="width: 100%" class="bg-transparent">
        <q-form class="row q-col-gutter-sm" @submit.prevent="actualizarTabla">
          <!-- parametro del nombre del cliente -->
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input filled v-model="nombreCliente" label="Nombre Cliente *">
              <template v-slot: append>
                <div class="flex flex-center">
                  <q-icon name="badge" size="1.2vmax" />
                </div>
              </template>
            </q-input>
          </div>
          <!-- parametro del nombre del cliente -->
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <q-select
              filled
              v-model="tipoidentificacion"
              label="tipo de documento*"
              :options="listaTipoidentificacion"
            >
              <template v-slot: append>
                <div class="flex flex-center">
                  <q-icon name="assignment_turned_in" size="1.2vmax" />
                </div>
              </template>
            </q-select>
          </div>
          <!-- parametro de identificacion -->

          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input filled v-model="identificacionCliente" label="documento *">
              <template v-slot: append>
                <div class="flex flex-center">
                  <q-icon name="assignment_ind" size="1.2vmax" />
                </div>
              </template>
            </q-input>
          </div>

          <div>
            <q-btn
              label="Buscar"
              icon="search"
              type="submit"
              color="secondary"
            />
          </div>
          <div>
            <q-btn
              label="Crear"
              icon="create"
              @click="agregarCliente()"
              color="secondary"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useClientesStore } from "stores/clientes-store.js";

const $q = useQuasar();
const clientesStore = useClientesStore();

const nombreCliente = ref("");

const identificacionCliente = ref("");
const tipoidentificacion = ref("");
const listaTipoidentificacion = ref([
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PA", label: "Pasaporte" },
]);
async function agregarCliente() {
  try {
    if (
      tipoidentificacion.value.value !== null &&
      identificacionCliente.value !== null &&
      nombreCliente.value !== null
    ) {
      const cliente = {
        nombre: nombreCliente.value,
        identificacion: identificacionCliente.value,
        tipoidentificacion: tipoidentificacion.value.value,
      };

      await clientesStore.agregarCliente(cliente);

      $q.notify({
        progress: true,
        message: "El cliente se agrego satisfactoriamente. ",
        icon: "save",
        color: "white",
        textColor: "primary",
      });

      router.back();
    } else {
      $q.notify({
        progress: true,
        message: "Error en los datos del cliente. ",
        icon: "warning",
        color: "secondary",
        textColor: "white",
      });
    }
  } catch (error) {
    if (error.message.includes("Network Error")) {
      $q.notify({
        progress: true,
        message:
          "Error de conexión con el servidor. Por favor, revisa tu conexión a internet.",
        icon: "error",
        color: "red",
        textColor: "white",
      });
    } else if (!error.response) {
      $q.notify({
        progress: true,
        message: "Error al momento de cargar los registros. ",
        icon: "error",
        color: "red",
        textColor: "white",
      });
    } else {
      $q.notify({
        progress: true,
        message: error.response.data.split("\n")[0],
        icon: "warning",
        color: "red",
        textColor: "white",
      });
    }
  } finally {
  }
}

async function actualizarTabla() {
  const filtroBusqueda = {
    nombreCliente: nombreCliente.value,
    identificacionCliente: identificacionCliente.value,
    tipoidentificacion: tipoidentificacion.value.value,
  };

  try {
    clientesStore.filter = filtroBusqueda;
    clientesStore.pagination = clientesStore.paginationOriginal;
    await clientesStore.cargarClientes(true);
  } catch (error) {
    if (error.message.includes("Network Error")) {
      $q.notify({
        progress: true,
        message:
          "Error de conexión con el servidor. Por favor, revisa tu conexión a internet.",
        icon: "error",
        color: "red",
        textColor: "white",
      });
    } else if (!error.response) {
      $q.notify({
        progress: true,
        message: "Error al momento de cargar la tabla. ",
        icon: "error",
        color: "red",
        textColor: "white",
      });
    } else {
      $q.notify({
        progress: true,
        message: error.response.data.split("\n")[0],
        icon: "warning",
        color: "red",
        textColor: "white",
      });
    }
  } finally {
  }
}
</script>

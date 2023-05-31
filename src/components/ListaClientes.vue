<template>
  <q-table
    :rows="rows"
    :hide-header="mode === 'grid'"
    :columns="columns"
    row-key="id"
    :grid="mode == 'grid'"
    :loading="loading"
    binary-state-sort
    :rows-per-page-options="[0]"
    hide-pagination
    v-model:pagination="initialPagination"
    no-data-label="No se encontraron datos"
    no-results-label="El filtro no encontró ningún resultado"
  >
  </q-table>
</template>

<script setup>
import { useClientesStore } from "stores/clientes-store.js";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { ref, computed, onMounted } from "vue";

const columns = [
  {
    name: "tipoidentificacion",
    required: true,
    label: "T.Identificación",
    align: "center",
    field: "tipoidentificacion",
  },
  {
    name: "identificacion",
    align: "center",
    label: "Identificación",
    field: "identificacion",
  },
  { name: "nombre", align: "center", label: "Nombre", field: "nombre" },
];

const clientesStore = useClientesStore();
const $q = useQuasar();

const rows = computed({
  get() {
    return clientesStore.records.data;
  },
});

const mode = ref("list"); // Modo de vista de la tabla
const loading = ref(false);
const isLoading = ref(false);

const initialPagination = ref({
  sortBy: "primernombre",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});

onMounted(async () => {
  onInitialRequest({
    pagination: initialPagination.value,
    filter: undefined,
  });
  try {
    isLoading.value = true;
    $q.loading.show({
      message: "Cargando Clientes ...",
    });

    await clientesStore.obtenerClientes(true);
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
        icon: "error",
        color: "red",
        textColor: "white",
      });
    }
  } finally {
    isLoading.value = false;
    $q.loading.hide();
  }
});

async function onInitialRequest() {
  if (rows.value.length === 0) {
    clientesStore.pagination = clientesStore.paginationOriginal;
  }
}
</script>

<style lang="sass" scoped>
.bg
  background-color: transparent
</style>

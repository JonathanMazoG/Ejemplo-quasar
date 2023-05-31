import { defineStore } from "pinia";
import { axiosInstance } from "../boot/axios";
import { date } from "quasar";
import { ref } from "vue";

const RUTA_CLIENTES = "/clientes";
const RUTA_CLIENTE_AGREGAR = "/clientes/agregar";

export const useClientesStore = defineStore("clientesStore", () => {
  const filter = ref({
    identificacionCliente: "",
  });

  const paginationOriginal = ref({
    sortBy: "nombre",
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });

  const pagination = ref({
    sortBy: "nombre",
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });

  const records = ref({
    data: [],
  });

  async function cargarClientes(original) {
    const params = {
      params: {
        filter: filter.value,
        pagination: original ? paginationOriginal.value : pagination.value,
      },
    };
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .get(RUTA_CLIENTES, params)
            .then((response) => {
              if (response.data.ejecucion.respuesta.estado === "OK") {
                records.value = response.data.ejecucion.datos.records;
                pagination.value = response.data.ejecucion.datos.pagination;
                resolve();
              } else {
                reject(new Error(response.data.ejecucion.respuesta.mensaje));
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }
  async function agregarCliente(datosCliente) {
    const params = {
      datosCliente,
    };

    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .post(RUTA_CLIENTE_AGREGAR, params)
            .then((response) => {
              if (response.data.ejecucion.respuesta.estado === "OK") {
                resolve(response.data.ejecucion.datos);
              } else {
                reject(new Error(response.data.ejecucion.respuesta.mensaje));
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  return {
    cargarClientes,
    agregarCliente,
    records,
    filter,
    paginationOriginal,
    pagination,
  };
});

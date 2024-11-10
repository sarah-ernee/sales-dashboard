import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import api from "@/services/api";

export const useSalesStore = defineStore("sales", () => {
  const records = ref([]);

  const filterState = reactive({
    dateFrom: null,
    dateTo: null,
    customers: [],
    countries: [],
    status: [],
    category: [],
  });

  const fetchRecords = async () => {
    records.value = [];

    try {
      const response = await api.get("/records");
      records.value = response.data.data;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFilteredRecords = async (filters) => {
    records.value = [];

    try {
      const response = await api.post("/records", filters);
      records.value = response.data.records;
    } catch (err) {
      console.error(err);
    }
  };

  const setFilters = (filters) => {
    Object.assign(filterState, filters);
  };

  return {
    records,
    filterState,
    fetchRecords,
    fetchFilteredRecords,
    setFilters,
  };
});

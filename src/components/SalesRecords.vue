<template>
  <div>
    <div class="sales-dashboard">
      <h2>Sales Records</h2>
      <v-btn variant="flat" color="#01579b" @click="showFilterPopup = true">
        Set Filter
      </v-btn>
    </div>

    <div v-if="showFilterPopup" class="sales-filter">
      <FilterModal
        :customers="customerNames"
        :countries="countries"
        @close="showFilterModal = false"
        @apply-filters="onApplyFilters"
        class="sales-filter__card"
      />
    </div>

    <v-data-table :headers="headers" :items="filteredData" :items-per-page="10">
      <template v-slot:bottom></template>
    </v-data-table>
  </div>
</template>

<script>
import FilterModal from "@/components/FilterModal.vue";
import { ref, reactive, computed } from "vue";

export default {
  components: {
    FilterModal,
  },

  setup() {
    const headers = [
      {
        title: "Order No",
        key: "orderNo",
        align: "start",
        sortable: true,
      },
      {
        title: "Customer Name",
        key: "customerName",
        align: "start",
        sortable: true,
      },
      {
        title: "Status",
        key: "status",
        align: "start",
        sortable: true,
      },
      {
        title: "Category",
        key: "category",
        align: "start",
        sortable: true,
      },
      {
        title: "Country",
        key: "country",
        align: "start",
        sortable: true,
      },
      {
        title: "Created Date",
        key: "createdDate",
        align: "start",
        sortable: true,
      },
    ];

    const records = ref([
      {
        orderNo: 1,
        customerName: "Kivell",
        status: "Accepted",
        category: "Electronics",
        country: "United Kingdom",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 2,
        customerName: "Jardine",
        status: "Processing",
        category: "Furniture",
        country: "Russia",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 3,
        customerName: "Gill",
        status: "Rejected",
        category: "Stationery",
        country: "German",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 4,
        customerName: "Sor’vino",
        status: "Open",
        category: "Furniture",
        country: "Singapore",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 5,
        customerName: "Jones",
        status: "Rejected",
        category: "Sports",
        country: "German",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 6,
        customerName: "Andrews",
        status: "Processing",
        category: "Electronics",
        country: "Malaysia",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 7,
        customerName: "Jardine",
        status: "Processing",
        category: "Sports",
        country: "German",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 8,
        customerName: "Thompson",
        status: "Accepted",
        category: "Hardware",
        country: "Malaysia",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 9,
        customerName: "Jones",
        status: "Open",
        category: "Furniture",
        country: "Taiwan",
        createdDate: "1/23/2019",
      },
      {
        orderNo: 10,
        customerName: "Morgan",
        status: "Processing",
        category: "Sports",
        country: "China",
        createdDate: "1/23/2019",
      },
    ]);

    const showFilterPopup = ref(false);

    // Filter state
    const filterState = reactive({
      dateFrom: null,
      dateTo: null,
      customers: [],
      countries: [],
      status: {
        open: false,
        processing: false,
        accepted: false,
        rejected: false,
      },
      category: {
        electronics: false,
        furniture: false,
        others: false,
      },
    });

    // Derived data
    const customerNames = computed(() =>
      Array.from(new Set(records.value.map((order) => order.customerName)))
    );
    const countries = computed(() =>
      Array.from(new Set(records.value.map((order) => order.country)))
    );

    const filteredData = computed(() =>
      records.value.filter((item) => {
        // Date range filter
        if (
          filterState.dateFrom &&
          new Date(item.createdDate) < new Date(filterState.dateFrom)
        ) {
          return false;
        }
        if (
          filterState.dateTo &&
          new Date(item.createdDate) > new Date(filterState.dateTo)
        ) {
          return false;
        }

        // Customer name filter
        if (
          filterState.customers.length &&
          !filterState.customers.includes(item.customerName)
        ) {
          return false;
        }

        // Country filter
        if (
          filterState.countries.length &&
          !filterState.countries.includes(item.country)
        ) {
          return false;
        }

        // Status filter
        if (
          Object.values(filterState.status).some((status) => status) &&
          !filterState.status[item.status.toLowerCase()]
        ) {
          return false;
        }

        // Category filter
        if (
          Object.values(filterState.category).some((category) => category) &&
          !filterState.category[item.category.toLowerCase().replace(" ", "")]
        ) {
          return false;
        }

        return true;
      })
    );

    const onApplyFilters = (filters) => {
      Object.assign(filterState, filters);
      showFilterPopup.value = false;
    };

    return {
      showFilterPopup,
      headers,
      filteredData,
      customerNames,
      countries,
      onApplyFilters,
    };
  },
};
</script>

<style lang="scss">
.sales-dashboard {
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.5rem 0;
}

.sales-filter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__card {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    width: 900px;
  }
}

.sales-records {
  margin: 1rem 0 0 0;
}
</style>

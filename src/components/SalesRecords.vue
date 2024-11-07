<template>
  <div class="sales-dashboard">
    <h2>Sales Records</h2>

    <v-btn
      class="sales-dashboard__filter"
      variant="flat"
      @click="showFilterPopup = true"
    >
      Set Filter
    </v-btn>
  </div>

  <FilterModal
    v-if="showFilterPopup"
    :customers="customerNames"
    :countries="countries"
    @close="showFilterPopup = false"
  />

  <v-data-table
    :headers="headers"
    :items="orders"
    :items-per-page="10"
    color="sales-records"
  >
    <template v-slot:bottom></template>
  </v-data-table>
</template>

<script>
import FilterModal from "@/components/FilterModal.vue";
import { ref } from "vue";

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

    const orders = [
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
    ];

    // Filter options based on data available
    const customerNames = Array.from(
      new Set(orders.map((order) => order.customerName))
    );
    const countries = Array.from(new Set(orders.map((order) => order.country)));
    const showFilterPopup = ref(false);

    return {
      headers,
      orders,
      customerNames,
      countries,
      showFilterPopup,
    };
  },
};
</script>

<style lang="scss">
.sales-dashboard {
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.5rem 0;

  &__filter {
    text-transform: capitalize;
    background-color: #8bbce3;
    font-weight: 600;
  }
}

.sales-records {
  margin: 1rem 0 0 0;
}
</style>

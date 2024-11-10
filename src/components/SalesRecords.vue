<template>
  <div>
    <div class="sales-dashboard">
      <h2>Sales Records</h2>
      <v-btn
        variant="flat"
        class="sales-dashboard__button"
        @click="showFilterPopup = true"
      >
        Set Filter
      </v-btn>
    </div>
    <p class="sales-dashboard__timestamp">Last updated: {{ lastUpdated }}</p>
  </div>

  <div v-if="showFilterPopup" class="sales-filter">
    <FilterModal
      :customers="nameSelections"
      :countries="countrySelections"
      @close="showFilterPopup = false"
      class="sales-filter__card"
    />
  </div>

  <v-data-table :headers="headers" :items="records" class="sales-records">
    <template #headers>
      <tr>
        <th
          v-for="header in headers"
          :key="header.title"
          class="sales-records__header"
        >
          <div class="sales-records__header-text">{{ header.title }}</div>
        </th>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import FilterModal from "@/components/FilterModal.vue";
import { useSalesStore } from "@/store/salesStore";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount, watch, onUnmounted } from "vue";

export default {
  components: {
    FilterModal,
  },

  setup() {
    const store = useSalesStore();
    const { fetchRecords } = store;
    const { records } = storeToRefs(store);

    const lastUpdated = ref(new Date().toLocaleString());
    const updateLastUpdated = () => {
      lastUpdated.value = new Date().toLocaleString();
    };

    const headers = [
      {
        title: "Order No",
        key: "order_no",
        align: "start",
        sortable: true,
      },
      {
        title: "Customer Name",
        key: "customer_name",
        align: "start",
        sortable: true,
      },
      { title: "Status", key: "status", align: "start", sortable: true },
      { title: "Category", key: "category", align: "start", sortable: true },
      { title: "Country", key: "country", align: "start", sortable: true },
      {
        title: "Created Date",
        key: "created_date",
        align: "start",
        sortable: true,
      },
    ];

    const nameSelections = ref([]);
    const countrySelections = ref([]);
    const showFilterPopup = ref(false);

    onBeforeMount(() => {
      fetchRecords();
      updateLastUpdated();

      const intervalId = setInterval(() => {
        fetchRecords();
        updateLastUpdated();
      }, 60000);

      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    watch(records, (newRecords) => {
      updateLastUpdated();

      if (newRecords?.length) {
        nameSelections.value = [
          ...new Set(newRecords.map((order) => order.customer_name)),
        ];
        countrySelections.value = [
          ...new Set(newRecords.map((order) => order.country)),
        ];
      }
    });

    return {
      lastUpdated,
      showFilterPopup,
      headers,
      records,
      nameSelections,
      countrySelections,
    };
  },
};
</script>

<style lang="scss">
.sales-dashboard {
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px 0;

  &__button {
    background-color: #006064;
    color: white !important;
    text-transform: capitalize;
    border-radius: 5px;
    width: 120px;
  }

  &__timestamp {
    font-size: 10px;
    color: #006064;
    font-style: italic;
    margin: 0 0 30px 0;
  }
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
  text-align: center;

  &__header {
    background-color: #01787c;
    font-size: 14px;
    font-weight: 500;
    color: white;

    &-text {
      text-align: center;
      padding: 10px;
    }
  }
}
</style>

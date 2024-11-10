<template>
  <v-card variant="outlined" class="filter-card">
    <div class="filter-card__title">Filter</div>
    <div class="filter-card__subtitle">Select criteria filter in listing</div>

    <v-container class="filter-card__fields">
      <v-row align="center" no-gutters :style="{ margin: '12px 4px' }">
        <v-col cols="4">Created Date</v-col>
        <v-col cols="7">
          <div :style="{ display: 'flex', alignItems: 'center' }">
            <div>Display from</div>
            <v-text-field
              v-model="dateFrom"
              placeholder="MM/DD/YYYY"
              :rules="[dateValidation]"
              type="text"
              variant="outlined"
              density="compact"
              hide-details
              class="filter-card__date"
            ></v-text-field>

            <div>to</div>

            <v-text-field
              v-model="dateTo"
              :rules="[dateValidation]"
              placeholder="MM/DD/YYYY"
              type="text"
              variant="outlined"
              density="compact"
              hide-details
              class="filter-card__date"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>

      <v-row align="center" no-gutters :style="{ padding: '4px' }">
        <v-col cols="4">Customer Name</v-col>
        <v-col cols="7">
          <v-select
            v-model="selectedCustomers"
            :items="customers"
            multiple
            variant="outlined"
            density="compact"
            hide-details
            class="filter-card__dropdown"
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center" no-gutters :style="{ padding: '4px' }">
        <v-col cols="4">Status</v-col>
        <v-col cols="2">
          <v-checkbox
            hide-details
            v-model="allStatus"
            @change="toggleStatus('all')"
          >
            <template #label>All</template>
          </v-checkbox>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-checkbox
              hide-details
              v-model="status.open"
              @change="toggleStatus()"
            >
              <template #label>Open</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.processing"
              @change="toggleStatus()"
            >
              <template #label>Processing</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.accepted"
              @change="toggleStatus()"
            >
              <template #label>Accepted</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.rejected"
              @change="toggleStatus()"
            >
              <template #label>Rejected</template>
            </v-checkbox>
          </v-row>
        </v-col>
      </v-row>

      <v-row align="center" no-gutters :style="{ padding: '4px' }">
        <v-col cols="4">Category</v-col>
        <v-col cols="2">
          <v-checkbox
            hide-details
            v-model="allCategories"
            @change="toggleCategory('all')"
          >
            <template #label>All</template>
          </v-checkbox>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-checkbox
              hide-details
              v-model="category.electronics"
              @change="toggleCategory()"
            >
              <template #label>Electronics</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="category.furniture"
              @change="toggleCategory()"
            >
              <template #label>Furniture</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="category.others"
              @change="toggleCategory()"
            >
              <template #label>Others</template>
            </v-checkbox>
          </v-row>
        </v-col>
      </v-row>

      <v-row align="center" no-gutters :style="{ padding: '4px' }">
        <v-col cols="4">Country</v-col>
        <v-col cols="7">
          <v-select
            v-model="selectedCountries"
            :items="countries"
            multiple
            variant="outlined"
            density="compact"
            hide-details
            class="filter-card__dropdown"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn @click="resetFilters" variant="flat" color="orange">
            Reset
          </v-btn>
        </v-col>

        <v-col class="d-flex justify-end">
          <v-btn
            @click="applyFilters"
            variant="flat"
            color="#01579b"
            :disabled="isApplyDisabled"
          >
            Apply
          </v-btn>
          <v-btn @click="closeCard" variant="flat" color="grey">Close</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useSalesStore } from "@/store/salesStore";
import { validateDate, formatDate, toggleAll } from "@/utils/filterUtils";

export default {
  props: {
    customers: {
      type: Array,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
  },

  setup(_, { emit }) {
    const store = useSalesStore();
    const { fetchFilteredRecords } = store;

    const dateTo = ref("");
    const dateFrom = ref("");

    const selectedCustomers = ref([]);
    const selectedCountries = ref([]);
    const allStatus = ref(true);
    const allCategories = ref(true);

    const status = reactive({
      open: false,
      processing: false,
      accepted: false,
      rejected: false,
    });

    const category = reactive({
      electronics: false,
      furniture: false,
      others: false,
    });

    const dateValidation = (value) => validateDate(value);

    // Checkbox logic for All or Specifics
    const toggleStatus = (statusType = null) =>
      toggleAll(statusType, allStatus, status);

    const toggleCategory = (categoryType = null) =>
      toggleAll(categoryType, allCategories, category);

    // Card actions
    const closeCard = () => {
      const hasFilters = [
        dateTo.value,
        dateFrom.value,
        selectedCustomers.value.length,
        selectedCountries.value.length,
        Object.values(status).includes(true),
        Object.values(category).includes(true),
      ].some(Boolean);

      if (
        !hasFilters ||
        confirm(
          "Some filter settings detected. Are you sure you want to close?"
        )
      ) {
        emit("close");
      }
    };

    // Disable Apply button based on date validation
    const isApplyDisabled = computed(() => {
      return (
        (dateFrom.value && !dateTo.value) ||
        (!dateFrom.value && dateTo.value) ||
        dateValidation(dateFrom.value) !== true ||
        dateValidation(dateTo.value) !== true
      );
    });

    // Filter setting functions
    const saveFilters = () => {
      const filters = {
        dateFrom: dateFrom.value,
        dateTo: dateTo.value,
        selectedCustomers: selectedCustomers.value,
        selectedCountries: selectedCountries.value,
        status: { ...status },
        category: { ...category },
      };
      sessionStorage.setItem("filterSelections", JSON.stringify(filters));
    };

    const resetFilters = () => {
      dateTo.value = "";
      dateFrom.value = "";
      selectedCustomers.value = [];
      selectedCountries.value = [];
      allStatus.value = true;
      allCategories.value = true;

      Object.keys(status).forEach((key) => (status[key] = false));
      Object.keys(category).forEach((key) => (category[key] = false));

      saveFilters();
    };

    const loadFilters = () => {
      const filters = JSON.parse(sessionStorage.getItem("filterSelections"));
      if (filters) {
        dateFrom.value = filters.dateFrom || "";
        dateTo.value = filters.dateTo || "";
        selectedCustomers.value = filters.selectedCustomers || [];
        selectedCountries.value = filters.selectedCountries || [];

        Object.assign(status, filters.status || {});
        allStatus.value = !Object.values(status).includes(true);

        Object.assign(category, filters.category || {});
        allCategories.value = !Object.values(category).includes(true);
      }
    };

    const prepareFilterData = () => {
      return {
        date_from: formatDate(dateFrom.value),
        date_to: formatDate(dateTo.value),
        customers: selectedCustomers.value.length
          ? selectedCustomers.value
          : [],
        countries: selectedCountries.value.length
          ? selectedCountries.value
          : [],
        status: allStatus.value
          ? []
          : Object.keys(status).filter((s) => status[s]),
        category: allCategories.value
          ? []
          : Object.keys(category).filter((c) => category[c]),
      };
    };

    const applyFilters = () => {
      const filters = prepareFilterData();
      fetchFilteredRecords(filters)
        .then(() => {
          emit("close");
        })
        .catch((err) => {
          console.error("Failed to retrieve filtered records: ", err);
          throw new Error("Failed to retrieve filtered records");
        });
    };

    onMounted(() => {
      loadFilters();
    });

    watch(
      [
        dateFrom,
        dateTo,
        selectedCustomers,
        selectedCountries,
        status,
        category,
      ],
      saveFilters,
      { deep: true }
    );

    return {
      dateTo,
      dateFrom,
      selectedCustomers,
      selectedCountries,
      allStatus,
      allCategories,
      status,
      category,
      dateValidation,
      toggleStatus,
      toggleCategory,
      closeCard,
      isApplyDisabled,
      saveFilters,
      resetFilters,
      loadFilters,
      applyFilters,
    };
  },
};
</script>

<style lang="scss">
.filter-card {
  padding: 1.5rem;

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 500;
  }

  &__fields {
    margin: 10px 0 30px 12px;
  }

  &__date {
    max-width: 140px;
    margin: 0 6px 0 6px;
  }

  &__dropdown {
    width: auto;
  }
}
</style>

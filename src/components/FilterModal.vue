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
              label="From"
              v-model="createdDateFrom"
              :rules="[dateRule]"
              mask="##/##/####"
              placeholder="MM/DD/YYYY"
              type="text"
              variant="outlined"
              density="compact"
              hide-details
              class="filter-card__date"
            ></v-text-field>

            <div>to</div>

            <v-text-field
              label="To"
              v-model="createdDateTo"
              :rules="[dateRule]"
              mask="##/##/####"
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
          <v-checkbox hide-details v-model="allStatus" @change="toggleStatus">
            <template #label>All</template>
          </v-checkbox>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-checkbox
              hide-details
              v-model="status.open"
              @change="toggleStatus"
            >
              <template #label>Open</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.processing"
              @change="toggleStatus"
            >
              <template #label>Processing</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.accepted"
              @change="toggleStatus"
            >
              <template #label>Accepted</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.rejected"
              @change="toggleStatus"
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
            @change="toggleCategory"
          >
            <template #label>All</template>
          </v-checkbox>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-checkbox
              hide-details
              v-model="status.electronics"
              @change="toggleCategory"
            >
              <template #label>Electronics</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.furniture"
              @change="toggleCategory"
            >
              <template #label>Furniture</template>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="status.others"
              @change="toggleCategory"
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
          <v-btn>Reset</v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn>Apply</v-btn>
          <v-btn @click="$emit('close')">Close</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, reactive } from "vue";

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

  setup() {
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

    // Methods that says if any Status or Category selected then auto uncheck 'All'
    const toggleStatus = () => {
      allStatus.value = !Object.values(status).includes(true);
    };

    const toggleCategory = () => {
      allCategories.value = !Object.values(category).includes(true);
    };

    return {
      selectedCustomers,
      selectedCountries,
      allStatus,
      allCategories,
      status,
      category,
      toggleStatus,
      toggleCategory,
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
    margin: 10px 0 10px 12px;
  }

  &__date {
    max-width: 120px;
    margin: 0 6px 0 6px;
  }

  &__dropdown {
    width: auto;
  }
}
</style>

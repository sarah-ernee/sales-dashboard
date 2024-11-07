<template>
  <v-app>
    <v-main>
      <SalesRecords />
    </v-main>
  </v-app>
</template>

<script>
import SalesRecords from "./components/SalesRecords.vue";

export default {
  name: "App",

  components: {
    SalesRecords,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.v-main {
  padding: 2rem;
}
</style>

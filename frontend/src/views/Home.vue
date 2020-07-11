<template>
  <div class="home">
    <v-app-bar color="primary" dark app >
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4" xl="4">
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                full-width
                dense
                class="shrink mx-4"
                prepend-icon="mdi-arrow-left-drop-circle"
                append-outer-icon="mdi-arrow-right-drop-circle"
                @click:prepend="previousDay"
                @click:append-outer="nextDay"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu = false" no-title scrollable>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
    <DataListProgrammes :programmes="programmes"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DataListProgrammes from '@/components/DataListProgrammes.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    DataListProgrammes,
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
  }),
  computed: {
    ...mapState({
      programmes: (state) => state.programmes.all,
    }),
  },
  created() {
    this.getProgrammes(this.date);
  },
  methods: {
    nextDay() {
      const newDate = new Date(this.date);
      newDate.setDate(newDate.getDate() + 1);
      this.date = newDate.toISOString().substr(0, 10);
      this.getProgrammes(this.date);
    },
    previousDay() {
      const newDate = new Date(this.date);
      newDate.setDate(newDate.getDate() - 1);
      this.date = newDate.toISOString().substr(0, 10);
      this.getProgrammes(this.date);
    },
    ...mapActions('programmes', {
      getProgrammes: 'get',
    }),
  },
};
</script>

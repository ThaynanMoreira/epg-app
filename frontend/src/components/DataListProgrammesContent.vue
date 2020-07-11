<template>
  <v-expansion-panel-content>
    <v-row
      align="center"
      justify="start"
      class="spacer"
      >
      <v-col
        cols="4"
        class="ma-0"
        align-self="start"
      >
        <v-img
          alt="Avatar"
          aspect-ratio="1.7778"
          contain
          :src="imagemURL"
          lazy-src="https://s3.glbimg.com/v1/AUTH_947d0a0390ad47fbba7a4b93423e1004/Logo/76.jpg"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate size="25" color="grey lighten-5">
              </v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>

      <v-col
        align-self="start"
        cols="8"
      >
        <!-- {{item}} -->
        <v-card-text
          v-text="sinopse">
        </v-card-text>
      </v-col>
    </v-row>
  </v-expansion-panel-content>
</template>

<script >

export default {
  name: 'DataListProgrammesContent',
  props: {
    item: {
      default: {},
      required: true,
    },
    sinopse: {
      default: '',
      type: String,
    },
    imagemURL: {
      default: '',
      type: String,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

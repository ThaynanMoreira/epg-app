<template>
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-expansion-panels popout hover>
          <v-expansion-panel v-for="(item,i) in this.programmes.items" :key="i">
            <data-list-programmes-header
                :item="item"
                :title="item.title"
                :logoURL="item.custom_info.Graficos.LogoURL"
            ></data-list-programmes-header>
            <data-list-programmes-content
                :item="item"
                :sinopse="item
                            && item.custom_info
                            && item.custom_info.Resumos
                            && item.custom_info.Resumos.Sinopse"
                :imagemURL="item.custom_info.Graficos.ImagemURL"
            ></data-list-programmes-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
</template>

<script >
import DataListProgrammesHeader from '@/components/DataListProgrammesHeader.vue';
import DataListProgrammesContent from '@/components/DataListProgrammesContent.vue';

export default {
  name: 'DataListProgrammes',
  components: {
    DataListProgrammesHeader,
    DataListProgrammesContent,
  },
  props: {
    programmes: {
      default: [],
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

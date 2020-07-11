<template>
  <v-expansion-panel-header v-slot="{}">
    <v-row
      align="center"
      class="spacer"
      no-gutters
    >
      <v-col
        cols="4"
        sm="2"
        md="1"
      >
        <v-avatar
          max-height="60px"
          max-width="60px"
          rounded
        >
          <v-img
            alt="Avatar"
            aspect-ratio="1"
            :src="logoURL"
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
        </v-avatar>
      </v-col>

      <v-col
        class="text-no-wrap"
        cols="5"
        sm="3"
      >
        <v-chip
          v-if="isCurrent"
          :color="`red`"
          class="ml-0 mr-2 white--text"
          label
          small
        >
          <strong >NO AR</strong >
        </v-chip>
        <nobr v-else> {{formatedHours}} </nobr>
        <strong >{{title}}</strong>
      </v-col>
    </v-row>
    <v-progress-linear
      v-if="isCurrent"
      v-model="bar"
      color="red accent-4"
      absolute
      bottom
      :active="true"
    ></v-progress-linear>
  </v-expansion-panel-header>
</template>

<script >
import goTo from 'vuetify/es5/services/goto';

export default {
  name: 'DataListProgrammesHeader',
  props: {
    item: {
      default: {},
      required: true,
    },
    title: {
      default: '',
      type: String,
    },
    logoURL: {
      default: '',
      type: String,
    },
  },
  mounted() {
    if (this.isCurrent) {
      goTo(this, {
        offset: 150, duration: 3000, easing: 'easeOutQuart',
      });
    }
    // console.log('dfsfdsfsdf');
    // console.log((60 - (new Date()).getSeconds()) * 1000);
    // setInterval((ctx = this) => {
    //   if (ctx.getCurrentWithCache()) {
    //     ctx.getProgressWithCache();
    //   }
    // }, 1000 * 60);
    setTimeout((ctx = this) => {
      setInterval(() => {
        if (ctx.getCurrentWithCache()) {
          ctx.getProgressWithCache();
        }
      }, 1000 * 60);
    }, (60 - (new Date()).getSeconds()) * 1000);
  },
  data: () => ({
    cacheValueBar: 0,
    cacheTimeBar: 0,
    cacheValueCurrent: false,
    cacheTimeCurrent: 0,
  }),
  computed: {
    isCurrent: (ctx = this) => ctx.getCurrentWithCache(),
    bar: (ctx = this) => ctx.getProgressWithCache(),
    formatedHours: (ctx = this) => {
      const newDate = new Date(ctx.item.start_time * 1000);
      const utcOffset = Number(ctx.item.custom_info.BaseUTCOffset.split(':')[0]);
      newDate.setHours(newDate.getHours() + utcOffset);
      return newDate.toISOString().substr(11, 5);
    },
  },
  methods: {
    getTimeInSecNow() {
      return Math.floor(this.getTimestampNow() / 1000);
    },
    getTimestampNow() {
      return Date.now();
    },
    cacheValues(lastGetTime, secondsAwait = 60) {
      return (this.getTimeInSecNow() - lastGetTime) > secondsAwait;
    },
    getCurrentWithCache(secondsAwait = 60) {
      if (this.cacheValues(this.cacheTimeCurrent, secondsAwait)) {
        this.cacheValueCurrent = this.getCurrent();
        this.cacheTimeCurrent = this.getTimeInSecNow();
      }
      return this.cacheValueCurrent;
    },
    getCurrent() {
      return (this.item.start_time < this.getTimeInSecNow())
      && (this.getTimeInSecNow() < this.item.end_time);
    },
    getProgressWithCache(secondsAwait = 60) {
      if (this.isCurrent && this.cacheValues(this.cacheTimeBar, secondsAwait)) {
        this.cacheValueBar = this.getProgress();
        this.cacheTimeBar = this.getTimeInSecNow();
      }
      return this.cacheValueBar;
    },
    getProgress() {
      const v1 = this.item.start_time - this.item.end_time;
      const v2 = this.item.start_time - this.getTimeInSecNow();
      return (v2 / v1) * 100;
    },
  },
};
</script>

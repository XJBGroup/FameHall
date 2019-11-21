
<template>
  <v-col >
    <v-img :src="src" height="150px" width="150px">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate :color="get_color()"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-text class="text-left">
      <div>
        <b>Handle: {{handle}}</b>
      </div>
      <div>
        <b>Name: {{name}}</b>
      </div>
      <div :style="'color:'+get_color2(rating)">
        <b>Rating: {{rating}}</b>
      </div>
    </v-card-text>
  </v-col>
</template>
<script>
export default {
  props: {
    src: {
      type: String
    },
    handle: {
      type: String
    },
    name: {
      type: String
    },
    rating: {
      type: Number
    }
  },
  data: () => ({
    color: [
      "red",
      "pink",
      "purple",
      "indigo",
      "blue",
      "cyan",
      "teal",
      "green",
      "lime",
      "yellow darken-4",
      "amber",
      "orange"
    ]
  }),
  methods: {
    get_color() {
      var idx = Math.round(Math.random() * 11);
      return this.color[idx];
    },
    get_color2(rating) {
      if (rating >= 2100) {
        return "orange";
      } else if (rating >= 1900) {
        return "purple";
      } else if (rating >= 1600) {
        return "blue";
      } else if (rating >= 1400) {
        return "#42a89e";
      } else if (rating >= 1200) {
        return "green";
      } else {
        return "grey";
      }
    }
  }
};
</script>
<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img src="@/assets/logo.png" transition="scale-transition" />
      </div>

      <v-spacer></v-spacer>
      <v-btn color="primary">Author:9646516</v-btn>
    </v-app-bar>
    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
</script>

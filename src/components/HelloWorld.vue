<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          <a href="https://codeforces.com/" target="_blank" style="color:black">CodeForce</a> FameHall of BUPT
        </h1>
        <p
          class="subheading font-weight-regular"
        >Now We Enabled Proxy Pass,You can view this page without Internet</p>
        <p>
          Data are Dynamically Collected from
          <a
            href="https://codeforces.com/ratings/organization/130"
            target="_blank"
            style="color:black"
          >Here</a>
        </p>
      </v-flex>

      <v-flex xs12>
        <v-card class="mt-4">
          <v-card-title>Master</v-card-title>
          <v-divider />
          <v-progress-circular indeterminate :color="get_color()" v-if="waiting"></v-progress-circular>
          <v-row>
            <UserCard
              v-for="i in master"
              v-bind:key="i[0]"
              :handle="i[0]"
              :rating="i[1]"
              :name="i[2]"
              :src="i[3]"
              style="margin-left:4em"
            ></UserCard>
          </v-row>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="mt-4">
          <v-card-title>Candidate Mater</v-card-title>
          <v-divider />
          <v-progress-circular indeterminate :color="get_color()" v-if="waiting"></v-progress-circular>
          <v-row>
            <UserCard
              v-for="i in candidate_master"
              v-bind:key="i[0]"
              :handle="i[0]"
              :rating="i[1]"
              :name="i[2]"
              :src="i[3]"
              style="margin-left:4em"
            ></UserCard>
          </v-row>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="mt-4">
          <v-card-title>Expert</v-card-title>
          <v-divider />
          <v-progress-circular indeterminate :color="get_color()" v-if="waiting"></v-progress-circular>
          <v-row>
            <UserCard
              v-for="i in expert"
              v-bind:key="i[0]"
              :handle="i[0]"
              :rating="i[1]"
              :name="i[2]"
              :src="i[3]"
              style="margin-left:4em"
            ></UserCard>
          </v-row>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="mt-4">
          <v-card-title>Specialist</v-card-title>
          <v-divider />
          <v-progress-circular indeterminate :color="get_color()" v-if="waiting"></v-progress-circular>
          <v-row>
            <UserCard
              v-for="i in specialist"
              v-bind:key="i[0]"
              :handle="i[0]"
              :rating="i[1]"
              :name="i[2]"
              :src="i[3]"
              style="margin-left:4em"
            ></UserCard>
          </v-row>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="mt-4">
          <v-card-title>Pupil</v-card-title>
          <v-divider />
          <v-progress-circular indeterminate :color="get_color()" v-if="waiting"></v-progress-circular>
          <v-row>
            <UserCard
              v-for="i in pupil"
              v-bind:key="i[0]"
              :handle="i[0]"
              :rating="i[1]"
              :name="i[2]"
              :src="i[3]"
              style="margin-left:4em"
            ></UserCard>
          </v-row>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="mt-4">
          <v-card-title>Newbie</v-card-title>
          <v-divider />
          <v-progress-circular indeterminate :color="get_color()" v-if="waiting"></v-progress-circular>
          <v-row>
            <UserCard
              v-for="i in newbie"
              v-bind:key="i[0]"
              :handle="i[0]"
              :rating="i[1]"
              :name="i[2]"
              :src="i[3]"
            ></UserCard>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserCard from "@/components/user";
export default {
  components: { UserCard },
  name: "HelloWorld",
  mounted() {
    var ss = this;
    this.axios.request("/rng/ratings/organization/130").then(res => {
      var cheerio = require("cheerio");
      var $ = cheerio.load(res.data);
      var arr = Array.from($(".datatable.ratingsDatatable div table tr"));
      arr = arr.slice(1, arr.length);
      var has = [];
      var gao = function(x) {
        var res = Array.from($(x).find("td"));
        var name = $(res[1])
          .text()
          .trim();
        has.push(name);
      };
      arr.forEach(res => {
        gao(res);
      });
      var Q = has[0];
      for (var i = 1; i < has.length; i++) {
        Q += ";" + has[i];
      } 
      for (var i = 0; i < ss.others; i++) {
        Q += ";" + ss.others[i];
      }
      ss.axios.get("/rng/api/user.info?lang=en&handles=" + Q).then(res => {
        if (res.data["status"] === "OK") {
          for (var da of res.data.result) {
            var series = [
              da.handle,
              da.rating,
              da.firstName + " " + da.lastName,
              da.titlePhoto
            ];
            if (series[2] == "undefined undefined") {
              series[2] = "Unknown";
            }
            if (da.rating >= 2100) {
              ss.master.push(series);
            } else if (da.rating >= 1900) {
              ss.candidate_master.push(series);
            } else if (da.rating >= 1600) {
              ss.expert.push(series);
            } else if (da.rating >= 1400) {
              ss.specialist.push(series);
            } else if (da.rating >= 1200) {
              ss.pupil.push(series);
            } else {
              ss.newbie.push(series);
            }
          }
          var cmp = function compareFunction(a, b) {
            if (a[1] > b[1]) return -1;
            else if (a[1] < b[1]) return 1;
            else return 0;
          };
          this.newbie.sort(cmp);
          this.pupil.sort(cmp);
          this.specialist.sort(cmp);
          this.expert.sort(cmp);
          this.candidate_master.sort(cmp);
          this.master.sort(cmp);
          ss.waiting = 0;
        }
      });
    });
  },
  data: () => ({
    others:['LucidaLu','freefood'],
    newbie: [],
    pupil: [],
    specialist: [],
    expert: [],
    candidate_master: [],
    master: [],
    waiting: 1,
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
    }
  }
};
</script>

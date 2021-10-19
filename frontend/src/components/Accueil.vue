<template>
  <v-app id="homePage">
    <top-header />
    <router-view></router-view>
    <div id="headTitle">
      <v-img src="../assets/icon-left-font.png" id="logo"></v-img>
      <h1>Bienvenue sur l'intranet de Groupomania !</h1>
    </div>
    <v-carousel
      id="carousel"
      cycle
      height="auto"
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </v-app>
</template>

<script>
import Header from "./Header";

export default {
  name: "Accueil",
  data() {
    return {
      items: [
        {
          src: require("../assets/images/Autourrs.jpg"),
        },
        {
          src: require("../assets/images/teletravail.png"),
        },
        {
          src: require("../assets/images/vacances.jpg"),
        },
      ],
    };
  },
  components: {
    "top-header": Header,
  },
};
</script>
<style lang="scss">
#homePage {
  background-image: url("../assets/images/openspace.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
#carousel {
  width: 60%;
  margin-bottom: 5%;
  margin-left: 20%;
}

h1 {
  padding-top: 10%;
}
#logo {
  width: 20%;
  position: relative;
  margin-left: 80%;
  padding-bottom: 0;
}

@media screen and (min-width: 200px) and (max-width: 640px) {
  #carousel {
    padding-right: 15%;
    width: 80%;
  }
  #headTitle {
    width: 60%;
    margin-left: 20%;
  }
  h1 {
    font-size: 1.2em;
  }
}
</style>
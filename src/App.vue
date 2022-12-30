<template>
  <LoadSpinner :loading="loading" />

  <div class="container">
    <header>
      <nav>
        <router-link to="/">
          <img src="@/assets/logo.svg" id="desktop_logo" width="200" alt="What is today logo">
        </router-link>
      </nav>
    </header>
    <router-view/>
  </div>
  <footer>
    <div class="container">
      <h2>Months</h2>
      <div class="row row4">
        <div class="col">
          <router-link class="months" to="/month/january">january</router-link>
          <router-link class="months" to="/month/february">february</router-link>
          <router-link class="months" to="/month/march">march</router-link>
        </div>
        <div class="col">
          <router-link class="months" to="/month/april">april</router-link>
          <router-link class="months" to="/month/may">may</router-link>
          <router-link class="months" to="/month/june">june</router-link>
        </div>
        <div class="col">
          <router-link class="months" to="/month/july">july</router-link>
          <router-link class="months" to="/month/august">august</router-link>
          <router-link class="months" to="/month/september">september</router-link>
        </div>
        <div class="col">
          <router-link class="months" to="/month/october">october</router-link>
          <router-link class="months" to="/month/november">november</router-link>
          <router-link class="months" to="/month/december">december</router-link>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="container row row3">
        <div class="col">
          <p>Copyright &copy; {{ (new Date()).getFullYear() }}</p>
        </div>
        <div class="col">
          <p>Developed By <router-link to="https://bit01.rf.gd">Bit</router-link></p>
        </div>
        <div class="col">
          <div style="margin: 8px 0;text-align:center">
            <router-link to="privacy">Privacy Policy</router-link>
            <router-link to="terms">Terms of Service</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// import {ref} from 'vue'
import LoadSpinner from '@/components/LoadSpinner.vue'
import { ref, provide } from 'vue';

  export default {
    name: "App",
    components: {
      LoadSpinner
    },
    setup() {
      const loading = ref('true')
      provide('loading', loading)

      return {loading}
    }


  }
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');

:root {
  --wit-white: #fff;
  --wit-red: #ca3433;
  --wit-gray-dark: #3f4348;
  --wit-orange: #f9b31c;
}
body{
  padding: 0;
  margin: 0;
  background: linear-gradient(0deg, var(--wit-orange) 50%, var(--wit-white) 50%);
}
#app {
  font-family: 'Alegreya Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--wit-gray-dark);
}
.container {
  max-width: 992px;
  margin: auto;
  padding: .2rem;
}
h1,h2,h3 {
  color: var(--wit-orange);
  text-transform: capitalize;
}
footer {
  background: var(--wit-red);
  padding-top: .5rem;
}
footer h2 {
  margin-bottom: 0;
  text-align: center;
}
footer h2, footer, footer a {
  color: var(--wit-white);
}
.row {
  display: grid;
 
}
.row4 {
  grid-template-columns: auto;
  padding: 0 .8rem .8rem .8rem;
  text-align: center;
}
.row3 {
  grid-template-columns: auto;
  margin-top: 1em;
}
.col > p {
  margin: 7px 0;
  text-align: center;
}
.col a {
  margin: .8rem .4rem;
  text-decoration: underline #fff dotted 0.001rem

}
.months {
  display: block;
  text-transform: capitalize;
}
.bottom {
	background: #a62a29;
}
@media  (min-width: 640px) {
  .row4 {
    grid-template-columns: repeat(4, auto);
    text-align: start;
  }
  .row3 {
    grid-template-columns: repeat(3, auto);
  }
  footer h2 {
    text-align: start;
  }
}

</style>

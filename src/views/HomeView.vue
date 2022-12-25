<template>
  <div class="home">
    <h1>what holiday is today ?</h1>

    <div class="date">
      <div>
        <label id="date_label" for="h_date">Date</label>
        <Datepicker v-model="h_date" name="h_date" id="h_date" aria-labelledby="date_label" :enable-time-picker="false" format="MMMM dd, yyyy"></Datepicker>
      </div>

      
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'HomeView',
  components: {
    Datepicker
  },
  setup() {
    const h_date = ref(new Date())

    return {h_date}
  }
  
}
</script>

<style>
.date {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  padding: 1em;
  text-align: center;
  column-gap: .5em;
}
.date > div {
  font-weight: 500;
  color: var(--wit-white);
  background-color: var(--wit-red);
  font-size: 1.5em;
  border-radius: 7px;
  padding: .3em;
  margin: 0;
}

.dp__theme_light {
   --dp-text-color: var(--wit-gray-dark);
   --dp-primary-color: var(--wit-orange);
   --dp-primary-text-color: var(--wit-white);
   --dp-success-color: var(--wit-orange);
   --dp-danger-color: var(--wit-red);
   --dp-icon-color: var(--wit-red);
}
</style>
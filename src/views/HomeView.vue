<template>
  <div class="home">
    <h1>what holiday is today ?</h1>

    <div class="date">
      <div>
        <label id="date_label" for="h_date">Date</label>
        <Datepicker v-model="h_date" name="h_date" id="h_date" aria-labelledby="date_label" :enable-time-picker="false" format="MMMM dd, yyyy"></Datepicker>
      </div>
      <div>
        <label id="country_label" for="h_country">Country</label>
        <select :value="h_country" name="h_country" id="h_country" >
          <option v-for="ac in a_countries" :key="ac['iso-3166']" :value="ac['iso-3166']">
            {{ ac.fData.flag }} {{ ac.country_name }} ({{ ac["iso-3166"] }})
          </option>
        </select>
      </div>

      
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import clapi from '@/calendarific'
import getIP from '@/ip'

export default {
  name: 'HomeView',
  components: {
    Datepicker,
  },
  setup() {
    const h_date = ref(new Date())
    const h_country = ref('')
    const a_countries = ref([])
    const _clapi =  clapi()

    onMounted(() => {
      // _clapi.getHolidays({h_date: h_date.value, country: "US"})
      _clapi.getAllCountries().then(() => {
        a_countries.value = _clapi.allCountries.value
        getIP().then((data) => {  
          h_country.value = data.country
        })
       

      })
      
      
    })

    
    return {
      h_date, 
      h_country, 
      a_countries,
      
    }
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

select {
  display: block;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: .7em;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 6px 12px;
  background: var(--wit-white);
  color: var(--wit-gray-dark);
}
</style>
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
      <div>
        <label id="type_label" for="h_label">Type</label>
        <select :value="h_type" name="h_type" id="h_type" >
          <option value="">All</option>
          <option v-for="ty,k in a_types" :value="ty" :key="k">
            {{ capitalizeWord(ty) }}
          </option>
        </select>
      </div>

      
    </div>

    <div class="main">
      <div class="h_container" v-for="s in 6" :key="s">
        <img src="https://www.openconsultingcm.com/wp-content/themes/consultix/images/no-image-found-360x250.png" class="h_img" :alt="s" />
        <div class="h_content">
          <h2 class="h_title">Holiday Title</h2>
          <h3 class="h_type">Type</h3>
          <h3 class="h_country">Country</h3>
          <p class="h_description">Some Description about the holiday will go right in here blah blah blah Some Description about the holiday will go right in here blah blah blah</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// import clapi from '@/calendarific'
// import getIP from '@/ip'

export default {
  name: 'HomeView',
  components: {
    Datepicker,
  },
  setup() {
    const h_date = ref(new Date())
    const h_country = ref('')
    const h_type = ref('')
    const a_countries = ref([])
    const a_types = ref([ 'national', 'local', 'religious', 'observance'])
    // const _clapi =  clapi()


    onMounted(() => {
      // _clapi.getHolidays({h_date: h_date.value, country: "US"})
      // _clapi.getAllCountries().then(() => {
      //   a_countries.value = _clapi.allCountries.value
      //   getIP().then((data) => {  
      //     h_country.value = data.country
      //   })
      // })
    })

    const capitalizeWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    return {
      h_date, 
      h_country, 
      h_type,
      a_countries,
      a_types,
      capitalizeWord
    }
  }

  
}
</script>

<style>
.date {
  width: 100%;
  display: grid;
  text-align: center;
  column-gap: .5em;
  row-gap: .5em;
  margin-bottom: 1.5em;
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

.home .main {
  display: grid;
  padding: .5em;
  gap: 1rem;
  text-align: left;
}

.main .h_container {
  box-shadow: rgba(0,0,0,.1) 0 0 20px 1px;
  border-radius: 7px;
}
.h_content {
  padding: 1rem;
}
.h_title, .h_country, .h_type {
  margin: 0;
}
.h_type, .h_country {
  color: var(--wit-red);
  font-size: 12px;
}
.h_img {
  width: 100%;
  border-radius: 7px 7px 0 0;
}

@media (min-width: 992px) {
  .date {
    grid-template-columns: repeat(3, auto);

  }
  .home .main {
    grid-template-columns: repeat(4, auto);
  }

}

@media (min-width: 640px) and (max-width:991px) {
  .home .main {
    grid-template-columns: repeat(2, auto);
  }
}
</style>
<template>
  <div class="home">
    <h1>what holiday is today ?</h1>

    <form method="GET" action="/what_is_today" class="date">
      <div>
        <label id="date_label" for="h_date">Date</label>
        <Datepicker v-model="h_date" name="h_date" id="h_date" aria-labelledby="date_label" :enable-time-picker="false" format="MMMM dd, yyyy" :min-date="new Date('1/1/1777')" :max-date="new Date('1/12/2049')"></Datepicker>
      </div>
      <div >
        <label>Date Options</label>
        <div class="date_opt">
          <label for="year">
            <input type="checkbox" id="year" :checked="h_d_opt.year" name="h_d_opt"  disabled /> Year 
          </label>
          <label for="month" title="Would you like to include the month in the search ?">
            <input type="checkbox" value="month" id="month" title="Would you like to include the month in the search ?" :checked="h_d_opt.month"  name="h_d_opt" /> Month 
          </label>
          <label for="day" title="Would you like to include the day in the search ?">
            <input type="checkbox" value="day" id="day" title="Would you like to include the day in the search ?" :checked="h_d_opt.day"  name="h_d_opt" /> Day 
          </label>
        </div>
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
      <button type="submit" name="btn_submit" value="submit">Submit</button>
    </form>

    <div class="main" v-if="holidays.length > 0">
      <div class="h_container" v-for="holy in holidays" :key="holy.urlid">
        <img src="https://www.openconsultingcm.com/wp-content/themes/consultix/images/no-image-found-360x250.png" class="h_img" :alt="holy.name" />
        <div class="h_content">
          <h2 class="h_title">{{holy.name}}</h2>
          <h3 class="h_title" >{{holy.date.datetime.day+"-"+holy.date.datetime.month+"-"+holy.date.datetime.year}}</h3>
          <h3 class="h_type" v-for="(ty,ind) in holy.type" :key="ty">{{ty}}{{holy.type.length > 1 && ind % 2==0 ? ", " : ""}}</h3>
          <h3 class="h_country">{{findCountry(holy.country.id)}}</h3>
          <p class="h_description">{{holy.description}}</p>
        </div>
      </div>
    </div>
    <div class="msg" v-else>
      <div class="h_container">
        <p>No Holidays were found !</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import clapi from '@/calendarific'
import getIP from '@/ip'
import {useRoute} from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    Datepicker,
  },
  setup() {
    const h_d_opt = ref({
      'year': true, 
      'month': true, 
      'day': true
    })
    const h_date = ref(new Date())
    const h_country = ref('')
    const h_type = ref('')
    const a_countries = ref([])
    const a_types = ref([ 'national', 'local', 'religious', 'observance'])
    const _clapi =  clapi()
    const holidays = ref([])
    const route = useRoute()
    const loading_spinner = inject('loading')

    onMounted(() => {
      loading_spinner.value = true
      _clapi.getAllCountries().then(() => {
        a_countries.value = _clapi.allCountries.value
        getIP().then((data) => {  
          h_country.value = data.country
          
          if (route.query.btn_submit == 'submit') {
            h_d_opt.value.month = route.query.h_d_opt.indexOf('month') == -1 ? false : true
            h_d_opt.value.day = route.query.h_d_opt.indexOf('day') == -1 ? false : true
            h_date.value = route.query.h_date ? new Date(route.query.h_date) : h_date.value
            h_country.value = route.query.h_country ? route.query.h_country : h_country.value
            h_type.value = route.query.h_type ? route.query.h_type : h_type.value
          }

          _clapi.getHolidays({
            h_date: h_date.value, 
            country: h_country.value, 
            type: h_type.value, 
            date_opt: h_d_opt.value
          }).then(() => {
            holidays.value = _clapi.holidays.value
            loading_spinner.value = false
          })
        })
      })
    })

    const capitalizeWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const findCountry = (code) => {
      
      let co = a_countries.value.find((elm) => {
        return elm["iso-3166"].toLowerCase() == code
      })
      
      return `${co.fData.flag} ${co.country_name} (${co["iso-3166"]})`
    }
    
    return {
      h_date, 
      h_country, 
      h_type,
      a_countries,
      a_types,
      capitalizeWord,
      h_d_opt,
      holidays,
      findCountry
    }
  }

  
}
</script>

<style>
.date_opt {
  display: grid;
  grid-template-columns: auto auto auto;
}

.date {
  width: 100%;
  display: grid;
  text-align: center;
  column-gap: .5em;
  row-gap: .5em;
  margin-bottom: 1.5em;
  align-items: center;
}
.date > div, .date > button {
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

.h_container {
  box-shadow: rgba(0,0,0,.1) 0 0 20px 1px;
  border-radius: 7px;
  background-color: var(--wit-white);
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
.h_type {
  display: inline-block;
  margin: 0 .1rem;
}
.h_img {
  width: 100%;
  border-radius: 7px 7px 0 0;
}
.msg .h_container {
  padding: 1em;
  font-weight: bold;
  text-align: center;
  color: var(--wit-red);
  margin: 1em;
}
.date > button {
  border: var(--wit-red) 2px solid;
  background: var(--wit-white);
  color: var(--wit-red);
  font-family: inherit;
  transition: .5s all;
}
.date > button:hover {
  border: none;
  background: var(--wit-red);
  color: var(--wit-white);
  cursor: pointer;
}

@media (min-width: 992px) {
  .date {
    grid-template-columns: repeat(5, auto);
  }
  .home .main {
    grid-template-columns: repeat(4, 1fr);
  }

}

@media (min-width: 640px) and (max-width:991px) {
  .home .main {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
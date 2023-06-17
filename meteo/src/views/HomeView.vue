
<template>
  <main>
    <div id="title">
      <h1>Recherche la météo de ta ville</h1>
      <img src="@/assets/images/search.gif" alt="" />
    </div>

    <div id="container">
      <h2>
        <textarea ref="textareaRef" type="text" v-model="city" @input="autoComplete" placeholder="Ville..."></textarea>
        <div class="autocomplete" v-if="autoCompleteCities?.length">
          <div class="autocomplete-item" v-for="city of autoCompleteCities" :key="city" @click="chooseCity(city)">
            {{ city.label }}
          </div>
        </div>
      </h2>

      <div id="temperature">
        <span> {{ temperature }} </span> °C
      </div>
    </div>
  </main>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import debounce from 'debounce'

const temperature = ref('xx.x')
const city = ref("Paris")
/** @type {import('vue').Ref<{name: string, label: string}[]>} */
const autoCompleteCities = ref([
])

onMounted(() => {
  rerenderTextarea()
  refresh()
})

async function refresh() {
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.value +
      "&appid=df2fe288c24ad27ca426caafdfb045f0&units=metric";
    const {data} = await axios.get(url)
    temperature.value = data.main.temp
  } catch (error) {
    temperature.value = '???'    
  }
}
const autoCompleteDebounce = debounce(async () => {
  autoCompleteCities.value = []
  try {
    if(!city.value) return
    const serverUrl = process.env.VITE_APP_SERVER_URL
      ? process.env.VITE_APP_SERVER_URL
      : ''
    const {data} = await axios.get(
      serverUrl + '/api/reverse-geocoding',
      {params: {city: city.value}}
    )
    autoCompleteCities.value = data.features?.map(feature => ({
      label: feature?.properties?.label,
      name: feature?.properties?.name
    }))
  } catch (error) {
    console.error(error)
  }
}, 500, false)
function autoComplete() {
  rerenderTextarea()
  autoCompleteDebounce()
}

function chooseCity(_city) {
  autoCompleteCities.value = []
  city.value = _city.name
  refresh()
  setTimeout(() => {
    rerenderTextarea()
  }, 100);
}

const textareaRef = ref()
function rerenderTextarea() {
  textareaRef.value.style.height = 'calc(15px)';
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
}
</script>

<style scoped lang="scss">
main {
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 6%;
  height: 100vh;
}

#title {
  display: flex;
  justify-content: center;
  width: 60%;
  align-items: center;
  flex-direction: column-reverse;
  img {
    max-width: 200px;
  }
}

h1 {
  color: #fff;
  font-size: 3em;
  position: relative;
  width: fit-content;
  z-index: 1;
  text-align: center;
}

h2 {
  position: relative;
  margin: 0;
  textarea {
    border: none;
    width: 100%;
    text-align: center;
    color: #9c9cf8;
    text-transform: uppercase;
    font-size: 2em;
    outline: none;
    font-family: "Times New Roman";
    margin: 0;
  }
}


#container {
  background-color: #f8f8ff;
  display: flex;
  border: 2px #ff96da solid;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  max-width: 600px;
  padding: 20px 5%;
  margin-bottom: 20px;
  box-sizing: border-box;
}

#temparature_label,
#temperature {
  font-size: 2em;
  color: #dbbe50;
  font-weight: 7000;
}

button {
  width: fit-content;
  font-size: 1em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: 300ms;
  background-color: #ff96da;
  padding: 10px 30px;
  border: none;
  text-transform: uppercase;
  margin-bottom: 50px;
  border-radius: 50px;
}
button:hover {
  background-color: #ffea99;
  transition: 300ms;
}
.autocomplete {
  display: flex;
  flex-direction: column;
  text-align: left;
  border: 1px solid #aaa;
  box-shadow: 0 0 10px 0 #aaa;
  border-radius: 10px;
  position: absolute;
  background-color: white;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 1;
  font-weight: normal;
  font-size: 0.7em;


  .autocomplete-item {
    padding: 5px 10px;
    box-sizing: border-box;
    transition: 300ms;
    cursor: pointer;
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
  }
}
</style>
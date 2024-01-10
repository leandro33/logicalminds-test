<template>
  <div id="editUserModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Player
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="editUserModal" @click="$emit('closeModal')">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                Name</label>
              <input type="text" name="first-name" id="first-name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="firstName" :value="firstName"
                @input="$emit('update:firstName', ($event.target as HTMLInputElement).value)">
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                Name</label>
              <input type="text" name="last-name" id="last-name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="lastName" :value="lastName"
                @input="$emit('update:lastName', ($event.target as HTMLInputElement).value)">
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="teams" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team</label>
              <select name="teams" id="teams" @change="$emit('update:team', ($event.target as HTMLInputElement).value)"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(_team, index) in teams" :key="index" :value="_team.full_name"
                  :selected="_team.full_name == team">
                  {{ _team.full_name }}
                </option>
              </select>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="positions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
              <select name="positions" id="positions"
                @change="$emit('update:position', ($event.target as HTMLInputElement).value)"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="_position in positions" :key="_position" :value="_position"
                  :selected="_position == position">
                  {{ _position }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
          <button type="button" @click="$emit('save'), $emit('closeModal')"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save
            all</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataService from "./../services/DataService";
import ResponseData from "./../types/ResponseData";
import Team from "./../types/Team";

export default defineComponent({
  name: 'PlayerModal',
  emits: [
    'save',
    'closeModal',
    'update:firstName',
    'update:lastName',
    'update:team',
    'update:position',
    'HTMLInputElement["value"]'
  ],
  props: [
    'firstName',
    'lastName',
    'team',
    'position'
  ],
  data() {
    return {
      teams: [] as Team[],
      positions: ['F', 'G', 'C', 'F-G', 'F-C', 'G-F', 'G-C', 'C-F', 'C-G']
    };
  },
  methods: {
    retrieveTeams() {
      DataService.getTeams()
        .then((response: ResponseData) => {
          this.teams = response.data.data;
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.retrieveTeams();
  }
})
</script>

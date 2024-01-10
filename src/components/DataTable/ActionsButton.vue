<template>
	<div>
		<button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
			class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
			type="button" @click="actionsList = !actionsList">
			<span class="sr-only">Action button</span>
			Action
			<svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
				viewBox="0 0 10 6">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
			</svg>
		</button>
		<div id="dropdownAction" :class="actionsList ? '' : 'hidden'"
			class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
			<ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
				<li>
					<a href="javascript:void(0)"
						class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						@click="$emit('sort', 'asc'), actionsList = false">Order ASC</a>
				</li>
				<li>
					<a href="javascript:void(0)"
						class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						@click="$emit('sort', 'desc'), actionsList = false">Order Desc</a>
				</li>
			</ul>
			<div class="py-1">
				<a href="javascript:void(0)" @click="$emit('delete'), actionsList = false"
					class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
					Player</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
	name: 'ActionsButton',
	emits: ['sort', 'delete'],
	setup() {
		const actionsList = ref(false)
		return { actionsList }
	}
})
</script>

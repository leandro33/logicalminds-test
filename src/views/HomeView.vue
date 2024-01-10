<template>
	<section id="intro" data-aos="fade-up"
		class="relative pt-44 pb-24 text-white bg-neutral-950 md:bg-[url('/banner-lg.jpg')] bg-[url('/banner-xs.jpg')] xs:bg-auto bg-cover bg-top-center">
		<div class="container mx-auto px-3 flex flex-wrap flex-col md:flex-row items-center">
			<div class="absolute container-full w-full h-full top-0 left-0 bg-neutral-950/[.90] z-10"></div>
			<div class="flex flex-wrap mx-auto items-center text-center z-20">
				<p class="uppercase tracking-loose w-full">NBA JAM TEST CASE</p>
				<p class="uppercase tracking-loose w-full">...</p>
				<h1
					class="my-4 text-5xl font-bold leading-tight w-full bg-neutral-950 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent">
					Vue 3 TypeScript App
				</h1>
				<p class="leading-normal text-2xl mb-8 w-full">
					Edit players loaded from <span class="text-pink-500">Alldontlie API</span>
				</p>
				<button
					class="hidden mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
					Subscribe
				</button>
			</div>
		</div>
	</section>
	<section id="players" class="bg-[url('/body.png')] bg-cover bg-center border-b py-8">
		<div class="container mx-auto pt-4 pb-12">
			<h2 data-aos="fade-up" class="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
				Players				
			</h2>
			<div class="relative overflow-x-hidden shadow-md sm:rounded-lg">
				<DataTable></DataTable>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from "./../components/DataTable/DataTable.vue"

export default defineComponent({
	name: 'HomeView',
	components: { DataTable },
	setup() {
		return {}
	}
})
</script>

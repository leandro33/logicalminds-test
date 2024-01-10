<template>	
	<div
		class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-4 bg-white dark:bg-gray-900">
		<ActionsButton @sort="orderBy" @delete="deletePlayers"></ActionsButton>
		<SearchInput v-model:inputSearch="inputSearch" @filter="search"></SearchInput>
	</div>
	<div class="overflow-x-auto">
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="p-4">
						<div class="flex items-center hidden">
							<input id="checkbox-all-search" type="checkbox"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
							<label for="checkbox-all-search" class="sr-only">checkbox</label>
						</div>
					</th>
					<th scope="col" class="px-6 py-3 hidden">
						Id
					</th>
					<th scope="col" class="px-6 py-3">
						Name
					</th>
					<th scope="col" class="px-6 py-3">
						Team
					</th>
					<th scope="col" class="px-6 py-3">
						Position
					</th>
					<th scope="col" class="px-6 py-3">
						Status
					</th>
					<th scope="col" class="px-6 py-3">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(player, index) in players" :key="index"
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="w-4 p-4">
						<div class="flex items-center">
							<input id="checkbox-table-search-1" type="checkbox" :value="player.id" @click="selectToAction(player.id)"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
							<label for="checkbox-table-search-1" class="sr-only">checkbox</label>
						</div>
					</td>
					<td class="px-6 py-4 hidden">
						{{ player.id }}
					</td>
					<th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
						<img class="w-10 h-10 rounded-full" src="/mock-player.jpg" alt="Jese image">
						<div class="ps-3">
							<div class="text-base font-semibold">{{ player.first_name }}</div>
							<div class="font-normal text-gray-500">{{ player.last_name }}</div>
						</div>
					</th>
					<td class="px-6 py-4">
						{{ player.team['full_name'] }}
					</td>
					<td class="px-6 py-4">
						{{ player.position }}
					</td>
					<td class="px-6 py-4">
						<div class="flex items-center">
							<div v-for="n in player.status" :key="n" class="h-2.5 w-2.5 rounded-full bg-green-500 me-2">
							</div>
						</div>
					</td>
					<td class="px-6 py-4">
						<a href="javascript:void(0)" type="button"
							class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="selectPlayer(player)">Edit</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<PlayerModal v-show="itemModal" v-model:firstName="firstName" v-model:lastName="lastName" v-model:team="team"
		v-model:position="position" @closeModal="itemModal = false" @save="updatePlayer">
	</PlayerModal>
	<AlertModal @closeModal="alertModal = false" v-show="alertModal" :message="alertMessage" @accept="acceptDelete"
		@decline="declineDelete"></AlertModal>
</template> 

<script lang="ts">
import { defineComponent } from 'vue'
import ActionsButton from "./../../components/DataTable/ActionsButton.vue"
import SearchInput from "./../../components/DataTable/SearchInput.vue"
import PlayerModal from "./../../components/PlayerModal.vue"
import AlertModal from "./../../components/AlertModal.vue"
import DataService from "./../../services/DataService";
import ResponseData from "./../../types/ResponseData";
import Player from "./../../types/Player";

export default defineComponent({
	name: 'DataTable',
	components: { ActionsButton, SearchInput, PlayerModal, AlertModal },
	data() {
		return {
			players: [] as Player[],
			store: [] as Player[],
			itemModal: false,
			alertModal: false,
			selectedPlayerId: 0,
			selectedIndex: -1,
			searchParam: "",
			firstName: '',
			lastName: '',
			team: '',
			position: '',
			inputSearch: '',
			checkPlayer: '',
			playersToAction: [],
			alertMessage: {
				title: '',
				content: ''
			},
			status: [],
			loading: false
		};
	},
	methods: {
		retrievePlayers() {
			DataService.getPlayers()
				.then((response: ResponseData) => {
					this.loading = false;
					this.players = response.data.data;
					this.store = response.data.data;
					this.orderBy('asc');
					this.generateStatus();
				})
				.catch((e: Error) => {
					console.error(e);					
				});
		},
		selectPlayer(player: Player) {
			this.selectedPlayerId = player.id;
			this.firstName = player.first_name;
			this.lastName = player.last_name;
			this.team = player.team.full_name;
			this.position = player.position;
			this.itemModal = true;
		},
		refreshTable() {
			this.retrievePlayers();
		},
		updatePlayer() {
			let updateItem = this.players.find((player: Player) => player.id === this.selectedPlayerId);
			if (updateItem !== undefined) {
				updateItem.first_name = this.firstName;
				updateItem.last_name = this.lastName;
				updateItem.team.full_name = this.team;
				updateItem.position = this.position;
			}
			this.store = this.players;
		},
		deletePlayers() {
			if (this.playersToAction.length > 0) {
				this.alertMessage.title = `Delete Players`;
				this.alertMessage.content = `<p>Id's to delete: ${this.playersToAction.toString()}</p><p>Confirm delete this players ?</p>`;
				this.alertModal = true;
			}
		},
		acceptDelete() {
			this.playersToAction.forEach((id: any) => {
				let deletedItems = this.players.filter((player: Player) => player.id !== id);
				this.players = deletedItems;
			});

			this.playersToAction = [];
			this.store = this.players;
			this.hackCheckboxClear();
		},
		declineDelete() {
			this.playersToAction = [];
			this.hackCheckboxClear();
		},
		search() {
			let searchItems = this.players.filter((player: Player) =>
				player.first_name.concat(' ', player.last_name).toLowerCase().includes(this.inputSearch.toLowerCase())
			);
			this.players = searchItems.length > 0 && this.inputSearch !== '' ? searchItems : this.store;
		},
		orderBy(order) {
			let index = 0;
			let orderItems = this.players.sort((a, b) => {
				let fa = a.first_name.concat(' ', a.last_name).toLowerCase(), fb = b.first_name.concat(' ', b.last_name).toLowerCase();
				if (order === 'asc') {
					index = fa < fb ? -1 : 1;
				} else {
					index = fa > fb ? -1 : 1;
				}
				return index;
			});
			this.players = orderItems;
		},
		generateStatus() {			
			this.players.forEach((player:Player) => {
				player.status = Math.floor(Math.random() * 5);
			});
		},
		selectToAction(id) {
			this.playersToAction.push(id);
		},
		hackCheckboxClear() {
			document.querySelectorAll("#checkbox-table-search-1").forEach(element => {
				element['checked'] = false;
			})
		}
	},
	mounted() {					
		this.retrievePlayers();
	}
})
</script>



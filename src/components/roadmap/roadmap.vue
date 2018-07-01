<template>
	<div>
		<div id="roadmap" class="container-fluid  padding-bottom">
			<div class="row">
				<div class="col-md-2">
				</div>
				<div class="col-md-10">
				<div class="row action-bar">
					<div class="col-4">
					<button class="btn btn-info" @click="left"><</button>
					</div>
					<div class="col-4">
					<center><small>Możesz również przeciągać plan myszką/palcem</small></center>
					</div>
					<div class="col-4">
					<button class="btn btn-info float-right" @click="right">></button>
					</div>
				</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-2">
				<h5>Ukryj/pokaż dni imprezy: </h5>
				<button class="btn btn-full" :class="{'btn-success': hours[1].show }" @click="toggleShow(1)">Dzień 1</button>
				<button class="btn btn-full" :class="{'btn-success': hours[2].show }" @click="toggleShow(2)">Dzień 2</button>
				<button class="btn btn-full" :class="{'btn-success': hours[3].show }" @click="toggleShow(3)">Dzień 3</button>
				</div>
				<div class="col-md-10">
				<div class="row">
					<div class="col-4 col-sm-2">
					<div class="rooms">
						<div class="room short">
						<div class="room-title short">
							Sala
						</div>
						<div v-for="time in hours">
							<div v-if="time.show" v-for="hour in time.hours" class="room-hour border short" :class="{'d-1': time.day == 1, 'd-2': time.day == 2, 'd-3': time.day == 3, 'now': ( hour == currentHour && time.day == currentDay ) }">
							{{ hour }}
							</div>
						</div>
						</div>
					</div>
					</div> 
					<div class="col-8 col-sm-10">
					<div class="rooms" v-dragscroll id="scroll">
						<div v-for="room in calendar" class="room margin" id="room">
						<div class="room-title">
							{{ room.name }}
						</div>

						<div v-if="room.events.full" v-for="(one, key) in room.events.full" class="roomw">
							<event v-if="!days[key]" :event="one" :day="key" :events="events" :types="types" :room="room.name" v-model="modal"></event>
						</div>
						</div>
					</div>
					</div> 
				</div>
				</div>
			</div>
			<div class="modal-parent" v-if="modal && events[modal]" :class="{active: (modal && events[modal])}" @click="toggleModal">
				<div class="modalv" v-on:click.stop>
					<h2><center>{{events[modal].name}}</center></h2>
					<div class="description">
						Rodzaj: <b> {{types[events[modal].type].name}} </b>
					</div>
					<h4 v-if="events[modal].authors"><center>Organizatorzy: <b>{{events[modal].authors}}</b></center></h4>
					<div v-html="events[modal].description" class="description"></div>
					<span>Od {{events[modal].begin.hour}} do {{events[modal].end.hour}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Loader from '$components/Loader';
import Event from './event';
import VueDragscroll from 'vue-dragscroll';

export default {
	name: 'Roadmap',
	components: {
	  	Loader,
		Event
  	},
	directives: {
    	'dragscroll': VueDragscroll
  	},
	data: function() {
    	return {
			message: 'Hello Vue!',
			modal: false,
			modalData: 0,
			calendar: {},
			currentHour: 0,
			currentDay: 0,
			events: {},
			days: {},
			types: {},
			hours: {
				1: {
					show: true,
					hours: [],
					day: 1
				},
				2: {
					show: true,
					hours: [],
					day: 2
				},
				3: {
					show: true,
					hours: [],
					day: 3
				}
			}
		}
	},
	mounted: function () {
		this.$api.fetchEvents().then((data) => {
			this.calendar = data.rooms;
			this.events = data.events;
			this.types = data.types;
		});

		var begin = 18;
		var end = 12;
		var days = 3;
		var current = 1;
		var finish = false;
		var day = 1;
		while(finish==false){
			if (begin<10)
				this.hours[day].hours.push('0'+begin+':00');
			else
				this.hours[day].hours.push(begin+':00');
			begin++;
			if (begin>=24) {
				day++;
				begin = 0;
			}
			if (day>=3 && begin>=12) {
				finish = true
			}
		}

		var d = new Date();
		var n = d.getHours();
		switch(d.getDate()){
			case 23:
				this.currentDay=1;
				break;
			case 24:
				this.currentDay=2;
				break;
			case 25:
				this.currentDay=2;
				break;
		}
		this.currentHour = n +':00';
	},
	methods: {
		toggleShow: function (day) {
			this.hours[day].show = !this.hours[day].show;
			this.days[day] = !this.days[day];
		},
		toggleModal: function() {
			this.modal = false;
		},
		left: function () {
			var topPos = document.getElementById('scroll').scrollLeft;
			var how =  window.innerWidth * 0.6;
			document.getElementById('scroll').scrollLeft = topPos-how;
		},
		right: function () {
			var topPos = document.getElementById('scroll').scrollLeft;
			var how =  window.innerWidth * 0.6;
			document.getElementById('scroll').scrollLeft = topPos+how;
		}
	}
}
</script>
<style lang="scss">
@import './roadmap';
</style>

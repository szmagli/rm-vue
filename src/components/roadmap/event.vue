<template>
	<div class="roomw">
	<div v-for="(evt, id) in info" class="roomw" >
		<div v-if="!evt.e && day == 1 && id == '18:00' && room == 'MAIN ROOM'" class="room-hour border-gray main-event">
			<div v-for="n in 6">
				OTWARCIE AKREDYTACJI
			</div>
		</div>
		<div v-else-if="!evt.e && day == 1 && id == '18:00'" class="room-hour border-gray"></div>
		<div v-else-if="!evt.e" class="room-hour border-gray">
			{{ id }}
		</div>
		<div v-else  class="room-hour has-color clickable" :class="{'no-color': !types[events[evt.id].type].color}" :style="{height: evt.h*80 + 'px', background: types[events[evt.id].type].color, color: types[events[evt.id].type].text }" @click="showDetails(evt.id)" >
			<small v-if="events[evt.id].name.length > 45">
				<small>{{ events[evt.id].name }}</small>
			</small>
			<small v-else-if="events[evt.id].name.length > 25">
				{{ events[evt.id].name }}
			</small>
			<span v-else> 
				{{ events[evt.id].name }}
			</span>
		</div>
	</div>
	</div>
</template>

<script>
export default {
	name: 'Event',
	props: ['event','day','events','types', 'room'],
	data: function() {
		return {
		info: {},
		}
	},
	mounted: function () {
		var inf = {};
		var ineVT = false;
		for (var id in this.event){
			var one = this.event[id];
			if (!inf[one]){
				if (one) {
				inf[one] = {}
				inf[one].e = true;
				ineVT = true;
				inf[one].h = 1;
				inf[one].hr = id;
				inf[one].id = one;
				} else {
				inf[id] = {}
				inf[id].e = false;
				inf[id].h = 1;
				}
			}
			else if (inf[one]) {
				inf[one].h ++;
			}
		}

		for (var id in inf){
			if (inf[id].hr) {
				inf[inf[id].hr] = inf[id]
				delete inf[id];
			}
		}

		var inff = {};

		Object.keys(inf)
			.sort()
			.forEach(function(v, i) {
				inff[v] = inf[v];
			});

		this.info = inff;
	},
	methods: {
		showDetails: function (id) {
		this.$emit('input', id);
		}
	}
}
</script>
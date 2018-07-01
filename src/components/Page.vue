<template>
	<div>
		<div class="page"  v-if="page.length > 0">
			<section v-for="section in page">
				<div v-if="section.banner" class="banner" v-bind:style="{'backgroundImage': 'url(' + section.banner.sizes.large + ')' }">
					<div class="overlay">
						<h1 class="entry-title" v-html="section.title"></h1>    
					</div>
				</div>
				<div class="entry-content">
					<div class="content" v-html="section.description"></div>
				</div>
				
				<gmap-map
				v-if="section.map"
				:center="map.center"
				:zoom="16"
				v-bind:options="{ styles: map.styles }"
				style="width:100%;  height: 400px;"
				>
					<gmap-marker
						:key="index"
						v-for="(m, index) in map.markers"
						:position="m.position"
						@click="center=m.position"
					></gmap-marker>
				</gmap-map>
				<div v-if="section.emails" class="emails">
					<a v-for="email in section.emails" :href="'mailto:'+email.email" class="email"><i class="material-icons">email</i>{{email.title}}</a>
				</div>
				<div v-if="section.wystawca"  class="entry-content">
					<div class="content">
						<div class="box" v-for="one in section.wystawca">
							<div class="box-logo">
								<img v-if="one.logo" class="img img-responsive" :src="one.logo.url">
							</div>
							<div class="box-content">
								<a v-if="one.link" :href="one.link"><h4>{{one.name}}</h4></a>
								<h4 v-else>{{one.name}}</h4>
								<div v-html="one.description"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<Loader v-else />
	</div>
</template>

<script>
import Loader from '$components/Loader';

export default {
	props: ['id'],
	name: 'Page',
	components: {
	  	Loader
  	},
	data () {
		return {
			page: [],
			map: {
				center: { 
					lat: 54.54802120000001, 
					lng: 18.446712100000013 
					},
				markers: [
					{ 
						position: {
							lat: 54.54802120000001, 
							lng: 18.446712100000013
						}
					}
				],
				styles: [
					{
						elementType: 'geometry', 
						stylers: [{color: '#1B365D'}]
						},
					{
						elementType: 'labels.text.stroke', 
						stylers: [{color: '#242f3e'}]
						},
					{
						elementType: 'labels.text.fill', 
						stylers: [{color: '#746855'}]
					},
					{
						featureType: 'administrative.locality',
						elementType: 'labels.text.fill',
						stylers: [{color: '#D0D0CE'}]
					},
					{
						featureType: 'poi',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [{color: '#702F8A'}]
					},
					{
						featureType: 'poi.park',
						elementType: 'labels.text.fill',
						stylers: [{color: '#702F8A'}]
					},
					{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [{color: '#92C1E9'}]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [{color: '#92C1E9'}]
					},
					{
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [{color: '#92C1E9'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry',
						stylers: [{color: '#9bcaf2'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [{color: '#9bcaf2'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'labels.text.fill',
						stylers: [{color: '#9bcaf2'}]
					},
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [{color: '#EB6FBD'}]
					},
					{
						featureType: 'transit.station',
						elementType: 'labels.text.fill',
						stylers: [{color: '#EB6FBD'}]
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [{color: '#F66F92'}]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.fill',
						stylers: [{color: '#F66F92'}]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.stroke',
						stylers: [{color: '#F66F92'}]
					}
				]
			}
		}
	},
	created: function () {
		this.fetchPage(this.$route.meta.id);
		this.$router.afterEach((to, from) => {
			if(to.meta.id) {
				this.fetchPage(to.meta.id);
			}
		});
	},
	methods: {
		fetchPage(id) {
			this.page = [];
			this.$api.fetchPage(id).then((data)=>{
				if(data.acf.sections)
					this.page = data.acf.sections;
				else if(data.acf){
					this.page = [];
					data.acf.description = data.content.rendered;
					this.page.push(data.acf);
				}
			});
		}
	}
}
</script>
<style lang="scss" scoped>
@import '~$scss/page';
</style>

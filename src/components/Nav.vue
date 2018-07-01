<template>
		<div class="nav">
			<transition name="slide">
				<div class="nav-content"  v-bind:key="toggled" :class="{'nav-mobile-hidden': toggled}">
					<div class="nav-brand">
					<router-link class="nav-item" to="/"><img class="nav-logo" src="~$assets/logo.png"></router-link>
					</div>
					<router-link class="nav-item" to="/">Strona główna</router-link>
					<router-link class="nav-item" to="/informacje">Informacje</router-link>
					<router-link class="nav-item" to="/plan">Plan imprezy</router-link>
					<router-link class="nav-item" to="/wystawcy">Wystawcy</router-link>
					<router-link class="nav-item" to="/kontakt">Kontakt</router-link>
				</div>
			</transition>
			<div class="nav-toggle" @click="toggle"><i class="material-icons">menu</i></div>
		</div>
</template>

<script>
export default {
	name: 'Navigation',
	data () {
		return {
			toggled: true
		}
	},
	methods: {
		toggle() {
			this.toggled = !this.toggled;
		}
	}
}
</script>
<style lang="scss" scoped>
@import '~$scss/nav';
</style>

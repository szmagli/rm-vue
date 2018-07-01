<template>
	<div id="app">
		<vue-progress-bar></vue-progress-bar>
		<Nav/>
		<router-view></router-view>
		<footer>
			<img src="http://remcon.pl/wp-content/themes/vr/images/logobt.png" class="img img-fluid">
			<div class="copyright">© 2018 Fundacja BT. Wszelkie prawa zastrzeżone.</div>
		</footer>
	</div>
</template>

<script>
import Nav from '$components/Nav';
export default {
	name: 'app',
	components: {
		Nav
	},
	data () {
		return {
		}
	},
	mounted () {
    	this.$Progress.finish()
	},
	created () {
		this.$Progress.start()
		this.$router.beforeEach((to, from, next) => {
			if (to.meta.progress !== undefined) {
				let meta = to.meta.progress;
				this.$Progress.parseMeta(meta);
			}
			this.$Progress.start();
			next();
		});

		this.$router.afterEach((to, from) => {
			this.$Progress.finish();
		});
	}
}
</script>

<style lang="scss">
@import '~$scss/main';
</style>

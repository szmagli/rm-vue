<template>
	<div>
		<article v-if="Object.keys(article).length > 0">
			<div class="banner" v-bind:style="{'backgroundImage': 'url(' + article.acf.banner.sizes.large + ')' }">
				<div class="overlay">
					<h1 class="entry-title" v-html="article.title.rendered"></h1>    
				</div>
			</div>
			<div class="article-content" v-html="article.content.rendered"></div>
		</article>
		<Loader v-else />
	</div>
</template>

<script>
import Loader from '$components/Loader';
export default {
	name: 'Article',
	components: {
	  	Loader
  	},
	data () {
		return {
			article: {}
		}
	},
	mounted: function () {
		this.fetchArticle(this.$route.params.id);
	},
	methods: {
		fetchArticle(id) {
			this.$api.fetchPosts(id).then((data)=>{
				this.article = data;
			});
		}
	}
}
</script>
<style lang="scss" scoped>
@import './article';
</style>

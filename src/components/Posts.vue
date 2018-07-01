<template>
	<div>
  	<div class="articles" v-if="posts.length > 0">
		<h2 class="articles-title">Aktualności</h2>
    	<article v-for="(post, key) in posts" 
			:key="key" 
			:class="{'bg-w': key%2==0}" 
			@click="article(post.id)">
			<div class="article-box" v-if="media[post.featured_media]">
				<div class="article-image" v-bind:style="{'backgroundImage': 'url(' + media[post.featured_media] + ')' }">
				</div>
				<div class="article-content">
					<div class="article-description">
						<h3>{{post.title.rendered}}</h3>
						<span v-html="post.excerpt.rendered"></span>
					</div>
					<button class="btn btn-info">Czytaj Więcej</button>
				</div>
			</div>
			<Loader v-else />
    	</article>
	</div>
	<Loader v-else />
	</div>
</template>
<script>
import Loader from '$components/Loader';
export default {
  name: 'Posts',
  components: {
	  Loader
  },
  data () {
    return {
		posts: [],
		media: [],
    }
  },
  mounted: function () {
	this.$api.fetchPosts('').then((data)=>{
		for(let pid in data) {
			this.fetchMedia(data[pid].featured_media);
		}
		this.posts = data;
	});
  },
  methods: {
	fetchMedia(id) {
		this.$api.fetchMedia(id,'medium_large').then((data)=>{
			if(data) {
				this.media[id] = data.source_url;
			} else {
				this.media[id] == false;
			}
			this.$forceUpdate();
		});
	},
	article(id){
		this.$router.push(`/article/${id}`);
	}
  }
};
</script>
<style lang="scss" scoped>
@import '~$scss/articles';
</style>

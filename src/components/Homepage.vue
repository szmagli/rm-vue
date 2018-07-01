<template>
  <div>
      <carousel ref="carousel" :per-page="1" :pagination-enabled="false" :loop="true" class="carousel">
        <slide
			class="item"
			v-for="(slide, key) in Slides"
			:key="key"
            data-name="MySlideName">
			<div class="slider-background" v-bind:style="{'backgroundImage': 'url(' + slide.background_image.url + ')' }">
				<div class="slider-bar">
					<div class="bar-content">
						<h1>{{slide.title}}</h1>
						<h5  v-html="slide.description"></h5>
					</div>
				</div>
			</div>
        </slide>
    </carousel>
	<Posts />
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Posts from '$components/Posts';
export default {
  name: 'Homepage',
  components: {
    Carousel,
    Slide,
	Posts
  },
  data () {
    return {
		Slides: [],
    }
  },
  mounted: function () {
	this.$api.fetchPage(2).then((data)=>{
		this.$storage.homepage.commit(data);
		console.log(this.$storage.homepage)
		this.Slides = data.acf.slider;
	});
  }
};
</script>
# Stride Documentation

<template>
	<div>
		<div class="columns">
			<div class="column" v-for="item in links">
				<div class="box">
					<a :href="item.link" class="is-justify-content-center">
						<h2 class="title is-2 has-text-centered">{{item.name}}</h2>
						<figure class="image">
							<img :src="item.image" />
						</figure>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      links: [
				{
					link: 'manual/index.html',
					name: 'Manual',
					image: '/assets/media/stride-icon-manual.png'
				},
				{
					link: 'api/index.html',
					name: 'API',
					image: '/assets/media/stride-icon-api.png'
				},
				{
					link: 'ReleaseNotes/index.html',
					name: 'Release Notes',
					image: '/assets/media/stride-icon-release-notes.png'
				},
				{
					link: 'tutorials/index.html',
					name: 'Tutorials',
					image: '/assets/media/stride-icon-tutorials.png'
				}
			]
    }
  }
}
</script>

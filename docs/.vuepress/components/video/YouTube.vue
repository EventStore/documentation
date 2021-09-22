<template>
  <div class="video-container">
    <iframe
            width="100%"
            :src="link"
            title="YouTube video player"
            frameborder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
    >
    </iframe>
  </div>
</template>

<script>
export default {
    name:     "YouTube",
    props:    {
        id: {
            type:     String,
            required: true
        }
    },
    computed: {
        link() {
            return `https://www.youtube.com/embed/${this.id}`;
        }
    }
}
</script>

<style lang="stylus" scoped>
.video-container
  overflow: hidden
  position: relative
  width: 100%

.video-container::after
  padding-top: 56.25%
  display: block
  content: ''

.video-container iframe
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
</style>

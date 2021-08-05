<template>
  <image-detail :is-edit="false" />
</template>

<script>
import ImageDetail from './components/ImageDetail'

export default {
  name: 'CreateImage',
  components: { ImageDetail }
}
</script>


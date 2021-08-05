<template>
  <image-detail :is-edit="true" />
</template>

<script>
import ImageDetail from './components/ImageDetail'

export default {
  name: 'EditImage',
  components: { ImageDetail }
}
</script>


<template>
  <div style="margin-top: 6px">
    <Input placeholder="Enter text" clearable  style="width: 200px;margin: 15px;">
      <Icon type="ios-search" slot="suffix" />
    </Input>
  </div>
</template>

<script>
import {Input, Icon} from 'view-design'
export default {
  name: 'InputSlot',
  components: {Input, Icon}
}
</script>

<style scoped>

</style>

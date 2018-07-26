<template>
<div>
  <table v-if="value && value.times">
    <thead>
      <tr>
        <th>Day:</th>
        <th>From:</th>
        <th>To:</th>
        <th>Closed:</th>
        <th>Override:</th>
      </tr>
    </thead>
    <tbody v-for="time in value.times" :id="'day_'+time.day.from.id" :class="'day_'+time.day.from.name">
      <tr>
        <td><span>{{ time.day.from.name }}</span></td>
        <td><input type="text" class="time_from_hour" v-model="time.time.from.hour" />
          <span>:</span>
          <input type="text" class="time_from_minute" v-model="time.time.from.minute" />
          <select v-model="time.time.from.ampm" class="time_from_ampm" style="display: block;">
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
        </td>
        <td><input type="text" class="time_to_hour" v-model="time.time.to.hour" />
          <span>:</span>
          <input type="text" class="time_to_minute" v-model="time.time.to.minute" />
          <select v-model="time.time.to.ampm" class="time_to_ampm" style="display: block;">
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
        </td>
        <td><input type="checkbox" value="1" v-model="time.isclosed" /></td>
        <td><input type="text" value="" v-model="time.override" /></td>
      </tr>
    </tbody>
  </table>
  <span v-if="value">Note: <input type="text"
         v-model="value.note" /></span>
  <span v-if="value">Everyday Override: <input type="text"
         v-model="value.override" /></span>
</div>
</template>

<script>
const emptyModel = {
  times: [
    { day: { from: { id: 1, name: 'Monday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
    { day: { from: { id: 2, name: 'Tuesday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
    { day: { from: { id: 3, name: 'Wednesday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
    { day: { from: { id: 4, name: 'Thursday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
    { day: { from: { id: 5, name: 'Friday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
    { day: { from: { id: 6, name: 'Saturday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
    { day: { from: { id: 0, name: 'Sunday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' }
  ],
  note: '',
  override: ''
};

export default {
  name: 'whppt-schedule-open-hours',
  props: ['value'],
  mounted: function() {
    console.log('THIS.VALUE', !this.value)
    if (!this.value) this.$emit('input', emptyModel);
  }
};
</script>

<!-- Add "scoped" att to limit CSS to this component only -->
<style lang="scss" scoped>
table {
    width: auto !important;
}
input,
select {
    display: inline-block !important;
    width: auto !important;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
    position: static;
    opacity: 1;
    pointer-events: auto;
}
</style>

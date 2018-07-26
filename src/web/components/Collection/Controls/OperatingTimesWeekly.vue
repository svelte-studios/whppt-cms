<template>
  <div>
      <div>{{ att.label}}: </div>
      Days:
      <ul>
        <li v-for="time in val.times">
          {{ time.day.from.name }}
          From:
          <input type="text" v-model="time.time.from.hour" />:
          <input type="text" v-model="time.time.from.minute" />
          <select v-model="time.time.from.ampm">
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>

          TO:
          <input type="text" v-model="time.time.to.hour" />:
          <input type="text" v-model="time.time.to.minute" />
          <select v-model="time.time.to.ampm">
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>

          Closed:
          <input type="checkbox" value="1" v-model="time.isclosed" />
          Override:
          <input type="text" value="" v-model="time.override" />
        </li>
      </ul>
      {{ att.label}} Note: <input type="text" v-model="data[att.name].note" />
      {{ att.label}} Everyday Override: <input type="text" v-model="data[att.name].override" />
  </div>
</template>

<script>
export default {
  name: 'core-input-operating-times-weekly',
  props: ['data', 'att'],
  computed: {
    val() {
      this.data[this.att.name] = this.data[this.att.name] || {
        times:  [
          { day: { from: { id: 1, name: 'Monday' } }, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
          { day: { from: { id: 2, name: 'Tuesday' }}, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
          { day: { from: { id: 3, name: 'Wednesday' }}, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
          { day: { from: { id: 4, name: 'Thursday' }}, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
          { day: { from: { id: 5, name: 'Friday' }}, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
          { day: { from: { id: 6, name: 'Saturday' }}, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' },
          { day: { from: { id: 0, name: 'Sunday' }}, time: { from: { hour: '09', minute: '00', ampm: 'am' }, to: { hour: '05', minute: '00', ampm: 'pm' } }, override: '' }
        ],
        note: '',
        override: ''
      };
      return this.data[this.att.name];
    }
  }
};
</script>

<!-- Add "scoped" att to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

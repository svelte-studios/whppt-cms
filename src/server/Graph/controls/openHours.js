const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

let OpenHoursTimeType = new GraphQLObjectType({
  name: 'openHours_time',
  description: 'Opening hours time of day',
  fields: {
    hour: { type: GraphQLString },
    minute: { type: GraphQLString }
  }
});

let OpenHoursDayType = new GraphQLObjectType({
  name: 'openHours_day',
  description: 'Opening hours for a day',
  fields: {
    from: { type: OpenHoursTimeType, resolve(value) { return value.time.from } },
    to: { type: OpenHoursTimeType, resolve(value) { return value.time.to } },
    isClosed: { type: GraphQLBoolean },
    override: { type: GraphQLString }
  }
});

let OpenHoursType = new GraphQLObjectType({
  name: `openHours`,
  description: 'Open hours',
  fields: {
    note: { type: GraphQLString },
    override: { type: GraphQLString },
    monday: { type: OpenHoursDayType, resolve(value) { return value.times[0] } },
    tuesday: { type: OpenHoursDayType, resolve(value) { return value.times[1] } },
    wednesday: { type: OpenHoursDayType, resolve(value) { return value.times[2] } },
    thursday: { type: OpenHoursDayType, resolve(value) { return value.times[3] } },
    friday: { type: OpenHoursDayType, resolve(value) { return value.times[4] } },
    saturday: { type: OpenHoursDayType, resolve(value) { return value.times[5] } },
    sunday: { type: OpenHoursDayType, resolve(value) { return value.times[6] } },
  }
})

module.exports = {
  result: ({ att }) => {
    return {
      type: OpenHoursType,
      resolve(parent, args, context) {
        return parent[att.name];
      }
    }
  }
};

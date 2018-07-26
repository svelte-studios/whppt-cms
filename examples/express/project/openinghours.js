module.exports = {
  id: 'openinghours',
  slug: { singular: 'openinghours' },
  label: { singular: 'Opening Hours' },
  single: true,
  attributes: [{
    component: 'core-operating-times-weekly',
    name: 'openinghours',
    label: 'Opening Hours'
  }]
};

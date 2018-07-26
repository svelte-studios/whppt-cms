module.exports = {
  id: 'setting',
  slug: { singular: 'setting' },
  label: { singular: 'Setting' },
  single: true,
  attributes: [{
      control: 'whppt-text',
      name: 'title',
      label: 'Title'
    },
    {
      control: 'whppt-markdown-preview',
      name: 'description',
      label: 'Description'
    },
    {
      control: 'whppt-image',
      name: 'banner',
      label: 'Banner',
      dimensions: { width: 800, height: 600 }
    },
    {
      control: 'whppt-schedule-open-hours',
      name: 'times',
      label: 'Open Times'
    }
  ]
};

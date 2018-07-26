module.exports = {
  id: 'page',
  slug: { singular: 'page', plural: 'pages' },
  label: { singular: 'Page', plural: 'Pages' },
  attributes: [{
      control: 'whppt-text',
      name: 'title',
      label: 'Title',
      id: true,
      tab: 'general'
    },
    {
      control: 'whppt-markdown-preview',
      name: 'description',
      label: 'Description',
      tab: 'general'
    },
    {
      control: 'whppt-image',
      name: 'banner',
      label: 'Banner',
      dimensions: { width: 800, height: 600 },
      tab: 'general'
    },
    {
      control: 'whppt-content',
      name: 'content',
      label: 'Content',
      tab: 'content'
    }
  ]
};
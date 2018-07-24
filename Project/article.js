module.exports = {
  id: 'article',
  slug: { singular: 'article', plural: 'articles' },
  label: { singular: 'Article', plural: 'Articles' },
  attributes: [{
      control: 'whppt-text',
      name: 'title',
      label: 'Title',
      id: true,
    },
    {
      control: 'whppt-markdown-preview',
      name: 'description',
      label: 'Description',
    },
    {
      control: 'whppt-markdown-preview-2',
      name: 'custom_description',
      label: 'Custom Description',
    },
    {
      control: 'whppt-date',
      name: 'published',
      label: 'Published Date'
    },
    {
      control: 'whppt-tags',
      name: 'tags',
      label: 'Tags'
    },
    {
      control: 'whppt-image',
      name: 'banner',
      label: 'Banner',
      dimensions: { width: 800, height: 600 },
    },
    {
      control: 'whppt-cta',
      name: 'cta',
      label: 'CTA',
    },
    {
      control: 'whppt-image-set',
      name: 'gallery',
      label: 'Gallery',
      dimensions: { width: 800, height: 600 },
    },
    {
      control: 'whppt-links',
      name: 'links',
      label: 'Links',
    },
    {
      control: 'whppt-content',
      name: 'content',
      label: 'Content',
    },
    {
      control: 'whppt-cards',
      name: 'cards',
      label: 'Cards',
      tab: 'Cards'
    },
    {
      control: 'whppt-checkbox',
      name: 'active2',
      label: 'Active2'
    },
    {
      control: 'whppt-lookup',
      name: 'lookup',
      label: 'lookup',
      lookup: {
        type: 'article',
        value: 'id',
        label: 'title'
      }
    },
    {
      control: 'whppt-select',
      name: 'select',
      label: 'select',
      select: {
        values: [
          { value: '1', label: 'Test1' },
          { value: '2', label: 'Test2' },
        ]
      }
    }
  ]
};

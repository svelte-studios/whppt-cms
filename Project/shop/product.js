module.exports = {
  id: "product",
  slug: { singular: "product", plural: "pruducts" },
  label: { singular: "Product", plural: "Products" },
  group: "Manage Products",
  attributes: [
    {
      control: "whppt-text",
      name: "title",
      label: "Title",
      id: true
    },
    {
      control: "whppt-markdown-preview",
      name: "description",
      label: "Description"
    },
    {
      control: "whppt-content",
      name: "content",
      label: "Content",
      tab: "content"
    },
    {
      name: "variants",
      label: "Variants",
      control: "whppt-ordered-type-list",
      config: {
        addLabel: "Add Variant",
        type: "variant",
        value: "id",
        attributes: ["title"]
      }
    }
  ]
};

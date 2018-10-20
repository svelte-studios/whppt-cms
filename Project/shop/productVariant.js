module.exports = {
  id: "variant",
  slug: { singular: "variant", plural: "variants" },
  label: { singular: "Product Variant", plural: "Product Variants" },
  isHiddenType: true,
  attributes: [
    {
      control: "whppt-text",
      name: "title",
      label: "Title",
      id: true
    },
    {
      control: "whppt-lookup",
      name: "size",
      label: "Size",
      lookup: {
        type: "size",
        value: "id",
        label: "name"
      }
    }
  ]
};

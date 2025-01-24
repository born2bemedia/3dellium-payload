import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true, // Allows public (unauthenticated) read access
    create: ({ req }) => req.user?.role === 'admin', // Only allow admins to create
    update: ({ req }) => req.user?.role === 'admin', // Only allow admins to update
    delete: ({ req }) => req.user?.role === 'admin', // Only allow admins to delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Product Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'files',
      type: 'array',
      label: 'Files',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

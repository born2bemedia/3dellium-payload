import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  access: {
    //read: ({ req }) => !!req.user, // Allow logged-in users to read orders
    read: () => true,
    create: () => true, // Allow order creation
    update: ({ req }) => req.user?.role === 'admin', // Only admin can update orders
    delete: ({ req }) => req.user?.role === 'admin', // Only admin can delete orders
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Order Number',
      required: true,
      unique: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Ordered Items',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      label: 'Total Amount',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentMethod',
      type: 'text',
      label: 'Payment method',
      required: false,
    },
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', required: false },
        { name: 'city', type: 'text', required: false },
        { name: 'state', type: 'text', required: false },
        { name: 'zip', type: 'text', required: false },
        { name: 'country', type: 'text', required: false },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'invoice',
      type: 'upload',
      relationTo: 'media',
      label: 'Invoice file',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        console.log('Incoming data:', data) // Logs the incoming payload
      },
    ],
  },
}

export default Orders

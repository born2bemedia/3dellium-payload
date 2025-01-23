import type { CollectionConfig, PayloadRequest } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: true, // Enable email verification
    forgotPassword: {
      generateEmailHTML: (args?: { token?: string }) => {
        const token = args?.token
        if (!token) {
          return `<p>Error: No reset token provided.</p>`
        }
        return `<p>Click the link below to reset your password:</p>
                <a href="http://localhost:3000/set-password?token=${token}">Reset Password</a>`
      },
    },
  },
  access: {
    read: function (args: { req: PayloadRequest }) {
      return args.req.user?.role === 'admin'
    },
    create: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      required: false,
    },
    {
      name: 'street',
      type: 'text',
      label: 'Street',
      required: false,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      required: false,
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: false,
    },
    {
      name: 'state',
      type: 'text',
      label: 'State',
      required: false,
    },
    {
      name: 'zip',
      type: 'text',
      label: 'Zip Code',
      required: false,
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      defaultValue: 'customer',
      required: true,
    },
  ],
}

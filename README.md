This is my old [Lens Shop](https://github.com/Robert-Roszak/LensShop) project rewrittent in TypeScript with additional functionalities added.
Live demo is available [here](https://lens-shop-ts.vercel.app/)

The app features:
- products featched from MongoDB (dynamic "Sale" icon upon changing DB parameters),
- validations on quantity, data inserted in checkout form,
- order save on the DB,
- email notification sent to email address with order summary
- possibility to create account and log in to review own purchases (test user pass: test@test.com, test123)
- admin user to change orders' statuses (test admin pass: admin@admin.com, admin123 - for this demo admin user there is a limit of 3 orders fetched)

Before moving to other project, in the backlog there are:
- ~~posibility to log in/create account and review user's purchases,~~ - added
- ~~admin panel to manage states of orders,~~ - added
- email notification upon changing order status.

# performace-review

## Brief
A quick performace review app using React with TypeScript, Redux, simple SASS and MongoDB.

## Development

It uses Yarn as package manager. Please install Yarn and use Git to clone the repository, and

```
yarn
```

Start the server by:

```
yarn start
```

Lint the code by:

```
yarn lint
```

Build the files by:

```
yarn build
```

Please Install [MongoDB](https://www.mongodb.com/) and initialize 2 connections (`employees` & `feedbacks`)

By default, the app will select the first employee as the default and admin user.

It's possible that switching to /admin route to fill in the first employee, or manually insert one document to `employees` with
```
{
  surname: string,
  forename: string,
  admin: string,
  startDate: string,
  position: string,
  department: string,
}
```

This provides the default `/` index page to display employee view, allowing viewing incoming review requests and user information. the admin page `/admin` provides employee management and feedback management features. This app doesn't handle any login / logout features for now.

### Index page

![alt text](https://github.com/cchungmin/performance-review/raw/master/static/index.png "Index page")

### Admin page

![alt text](https://github.com/cchungmin/performance-review/raw/master/static/admin.png "Admin page")

## Issues
API in backend

More interactive UI & data types

Error handling

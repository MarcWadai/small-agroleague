# Agroleague test

---

## Backend 

### Setup
For a faster integration, I used a boilerplate that included most of the tools that I was going to use in my nodejs web server application :
https://github.com/antonio-lazaro/prisma-express-typescript-boilerplate/tree/main

- Authentification and authorization with passport
- Express JS
- Typescript
- Prisma
- Docker
- Dotenv for environement variables

### File structures 
You can 
### Data model

The main model here is a `Post`. We consider a post as question made by our user. 
This `Post`has :
- one-to-one relation with a `User`
- one-to-many relation with a `Category`
- one-to-one relation with a `Reco`

A `Reco`is a set of data containing the agronome answer to the `Post`
And finally a `Category`is simply a table containing information about the different sections the post is related about 


## How is it working
- When 

### TODO on backend side
- More tests

---

## Mobile
For the mobile side I decided to start with the Ignite boilerplate (one of React team recommendation). This boilerplate include multiple tools out of the box :
- State management with mobx state tree
- API request with Apisauce
- Testing with maestro and jest (I didn't have time to dig this aspect for this app)
- Navigation with react navigation

## How is it working 
There is two main component: 
- Login
- Home
You can not enter the app if you are not logged. When you are logged you arrive on a TabContainer containing two sections :
- Your posts
- All the posts of all the users

Those two tabs have their own `Stack Navigation` in order to select a post that we want to the detail of

### Run the mobile
- Make sure you started the backend server first before running the mobile
- Since I am using an old computer which had lot of trouble running simulator and working on local plateforme because of dependancy issues(ios and android), I did not want to waste time debbugin the environment so I decided to test only on the web side. That is why the `yarn start` is starting expo for the web.

### TODO on mobile side
- Tests
- Pagination on lists
- Edit a post that you created
- Add a new post (the button was added, but I did'nt have time to create the page)
- Connection with admin profile
- Multiple colors for categories on post 
- Information about the post status (answered or pending) on the list 
- Admin can make recommendation on questions

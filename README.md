# Road-map & Guide for our project:

# Install Dependencies:
npm i @reduxjs/toolkit react-redux react-router-dom appwrite@14.0.1 @tinymce/tinymce-react html-react-parser react-hook-form tailwindcss @tailwindcss/vite <br>
=> Configure the Vite plugin & Import Tailwind CSS

# Setting up environment Variables:
=> always create environment variable file (here, ".env" file) in the root of the project(here, root == "12MegaBlog" folder) <br>
=> don't forget the 'dot' in ".env" <br>
=> add ".env" file to ".gitignore" <br>
=> for open source projects you can create ".env.sample" (sample file) where you will display your env var with the same name as in ".env" file but with the empty value for simplicity for others <br>
=> whenever you change your ".env" file, restart your project <br>
=> here is the link of documentation about naming convention of env var in while using different-different technologies: <br>
For create-react-app: https://create-react-app.dev/docs/adding-custom-environment-variables/#:~:text=Note%3A%20You%20must,env.REACT_APP_NOT_SECRET_CODE. <br>
For react+vite: https://vite.dev/guide/env-and-mode#:~:text=Vite%20exposes%20env,following%20env%20variables%3A <br>
=> now got to the AppWrite (for backend services) and create an account if you don't have one, then create a new project and set value of our env var according to our requirement, here: <br>
set VITE_APPWRITE_URL to API Endpoint of our project on AppWrite <br>
set VITE_APPWRITE_PROJECT_ID to Project ID of our project on AppWrite <br>
set VITE_APPWRITE_DATABASE_ID to Database ID of our project's database on AppWrite <br>
set VITE_APPWRITE_COLLECTION_ID to Collection ID of our project's database on AppWrite <br>
set VITE_APPWRITE_BUCKET_ID to Bucket ID of our project's storage on AppWrite <br>

# Creating new project on AppWrite:
=> create a new project <br>
=> in project's databases: create database & collection <br>
=> don't forget to update the permissions in the setting of our collection (here "articles") <br>
=> create attributes & indexes according to our requirement <br>
=> in project's storage: create bucket <br>
=> don't forget to update the permissions in the setting of our bucket (here "images") <br>

# Best practices to follow:
=> create one folder named "conf" in "src" and in that folder create one file named "conf.js", write configuration of our env var there: go through that file for more information... <br>

# Documentation link of AppWrite:
https://appwrite.io/docs/products/auth <br>
(read it for building authentication services of our project) <br>
https://appwrite.io/docs/references/cloud/client-web/databases <br>
(read it for building databases services of our project) <br>
https://appwrite.io/docs/references/cloud/client-web/storage
(read it for building storage services of our project) <br>

# Build Authentication services using AppWrite:
=> now it's time to build authentication services of our website <br>
=> maintain a separate folder for all services related to AppWrite (here "appwrite") <br>
=> try to build all services in a way that if we want to change our service provider or even want to build our own backend then we can easily change from one to another <br>
=> to do that we can use class based approach to build our different services and export the instance of that class

# Redux Toolkit configuration:
=> first of all create store & slices in a separate folder (here "store"), go threw our redux-toolkit project if you need any help <br>
=> insert store into "main.jsx" by using 'Provider' <br>
=> now you can manipulate the store's data in different-different component using 'useSelector' & 'useDispatch'

# Building Components:
=> to build every component required by our website we can maintain a separate folder (here "components") in which we will store all of our components <br>
=> try to build production grade react components <br>
=> one best practice to follow here is to use "index.js" file in our folder so we can easily import our components everywhere we want by just importing and exporting our components in "index.js" file once and then directly importing the "index.js" file <br>
=> we will use "useForm" from "react-hook-form" & "Editor" from "@tinymce/tinymce-react" to build some of our components <br>
=> first read documentations of both "react-hook-form" & "@tinymce/tinymce-react" and then start to build the components <br>
=> here is the links for both documentation: <br>
React Hook Form: https://react-hook-form.com/docs <br>
RTE: https://www.tiny.cloud/docs/tinymce/latest/react-cloud/

# Building Pages:
=> to build every page required by our website we can maintain a separate folder (here "pages") in which we will store all of our pages <br>
=> all these pages are just combination of different components, and which components will be used in each page will be decided according to what we want to display to our user on that particular page <br>
=> one best practice to follow here is to use "index.js" file in our folder so we can easily import our pages everywhere we want by just importing and exporting our pages in "index.js" file once and then directly importing the "index.js" file

# Routing:
=> the last and important thing to do is setting up all of our routs <br>
=> this can be done by creating a router in our "main.jsx" file in which we will be providing all of our paths and pages related to that particular path

# Debugging:

=> first annoying bug I found was my website is crashing because of my syntax errors in: <br>
Header.jsx: I wrote "state.status" instead of "state.auth.status" <br>
store.js: I provided the reducer incorrectly: "reducer:{authReducer,}" instead of "reducer:{auth: authReducer,}" <br>
=> another bug was when I do Signup the user session get started, but the buttons on my headers do not change like ("Login","Signup" to "All Posts","Add Post","Logout") the reason was the syntax error in: <br>
Signup.jsx: I forgot to put await before performing asynchronous task (authServices.createAccount(data);) <br>
=> then I found out one bug in "Add Post" section in which the generation of the slug is going wrong and the issue was same as before the syntax error in: <br>
PostForm.jsx: in "slugTransform" function: I wrote ".replace(/^[a-zA-Z\d]+/g, '-');" instead of ".replace(/[^a-zA-Z\d]+/g, '-');" <br>
=> after that I found out that posts is not displaying in any part of the website ("Home" or "All Posts") but when I checked my database on the AppWrite there is no issue with storing the post's data, all the data was there in the database that means the issue occurs when I try to retrieve my data and then I found out that in the "listDocuments()" method I was providing my AppWrite collection-id instead of AppWrite database-id: <br>
config.js: in "getPosts" function: I wrote "conf.appwriteCollectionId," instead of "conf.appwriteDatabaseId," <br>
=> then I can see the posts on my website, but I was not getting the preview of the images in the posts, here the problem was not syntax error but the issue was that I am using that service/method of AppWrite that require the upgraded account on AppWrite but since I don't have that I have to replace that method with another one which at-least do the work: <br>
config.js: in "getFilePreview" function: I have changed "return this.bucket.getFilePreview()" to "return this.bucket.getFileView()"

# Assignments:

=> improve the UI of the website <br>
=> separate the databases & storage services from config.js by creating two separate files ✅ <br>
=> improve the loading part in "App.jsx" if you want... <br>
=> properly handle all the promises by adding appropriate ".catch()" part <br>
=> currently we are fetching and storing the information related to the posts from our databases directly in out components, which is bad because it requires proper state management to manipulate this kind of information between many components, so design a proper state management for this using redux toolkit, and for doing this create another slice named "postSlice" and also add another reducer named "post" in the store <br>
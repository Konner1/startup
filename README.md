# Lib Buddies


[My Notes](notes.md)

I will be creating a website that allows you to see when people are in the library so you can know if your friends are there to study with. This allows people who aren't close enough to share their location with each other to see when others are studying. The will push a button that will send to everyone in their "buddies" list to tell them that they are now studying at the library. When they leave they will simply just click "leaving" to notify their buddies that they are not longer there. 



> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Studying sucks. Studying alone is worse. It's hard to study at home and annoying to call 50 people to see if they also want to cry in the library. Sharing your location can be a little too personal so what can you do? Use Lib Buddies to send a signal to all of your best or passive friends so that you're never alone in the library! With the click of a button you can notify everyone you want that you are in need of some company at the library. Want a study buddy? A wingman to go talk to that special someone on the second floor? Lib Buddies can help. 

### Design

![Design image](IMG_2846.png)
![Design2](IMG_2847.png)
![Design3](IMG_2848.png)

The top image shows how the login page will look. It will be a simple design with just the app title and a username and password section. The second picture is the main page which will feature the user's profile picture and a button for if the user is in the library or not. Underneath it will have a list of people who are in the library. The last page will be the search page which will allow the user to find and remove buddies. 


### Key features

- Secure login over HTTP
- Buddy list (think friends on Facebook)
- Add/Remove buddy button
- Buddies are notified of user location when at library
- Library announcement button
- Real time notifications of buddies in the library
- Friends are stored permanatly until deleted

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses HTML structure for application. There will be a login, friends search list, and library button page.
- **CSS** - Application styleing that works with different screen sizes and uses good color choice.
- **React** - Provides login, library alert button, adding/removing "buddies", rounting and componants.
- **Service** - Backend service for: login, searching buddies and finding buddies, third party call to location services.
- **DB/Login** - Stores users, stores users in library/out of library. Credentials stored in database.
- **WebSocket** - As each user presses the library alert button- their buddies are notified. 

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://libbuddies.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I did not complete this part of the deliverable.
- [x] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [x] **Links** - I did not complete this part of the deliverable.
- [x] **Text** - I did not complete this part of the deliverable.
- [x] **3rd party API placeholder** - I did not complete this part of the deliverable.  
    The library in or out button will use location servies to verify location.
- [x] **Images** - I did not complete this part of the deliverable.
- [x] **Login placeholder** - I did not complete this part of the deliverable.
- [x] **DB data placeholder** - I did not complete this part of the deliverable.
    The friends list will be stored in a database
- [x] **WebSocket placeholder** - I did not complete this part of the deliverable.
    The updated list of people in the library will be a websocket service

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I added css styles to the header, footer, and the main body content. I used classes to identify most of these but they are all there. 
- [x] **Navigation elements** - I have my login natigate to my main page which has a navigation bar.
- [x] **Responsive to window resizing** - All of my windows shrink or change so that they are responsive. My main page shrinks down to fit everything it can with some reordering, the login and buddy pages just reorder the elements.
- [x] **Application elements** - Yea I did this. I used the names and stuff that you were supposed to so I could edit every part of the website.
- [x] **Application text content** - The text is all edited and the font has changed so this one is complete.
- [x] **Application images** - This one was a headache but I got it to look cool! I put an image in a circle and made two other images the backgrounds.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Yea I did this
- [x] **Components** - It's complete and the components are all there
- [x] **Router** - Did some funky stuff to make the routing work so that way i didn't need to have the exact same nav page as simon so it not only works- it's cool. 

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - It all works- to make sure it looks right you may need to create multiple accounts and then add friends to show that the local host stores the list
- [x] **Hooks** - Yes i used UseEffect and UseState

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - This part works and used the index.js to run it
- [x] **Static middleware for frontend** - I have calls to the index.js in my front it which is chill
- [x] **Calls to third party endpoints** - Yes! There are now random quotes for every user to enjoy
- [x] **Backend service endpoints** - That's how I connect everything to get so they're there
- [x] **Frontend calls service endpoints** - I also did this.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **User registration** - Creates users  with their own profiles
- [x] **User login and logout** - You can log in and out of the website
- [x] **Stores data in MongoDB** - The data is stored in mongoDB
- [x] **Stores credentials in MongoDB** - Credentials are also stored there
- [x] **Restricts functionality based on authentication** - Every user has their own page and personalized buddies added

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - This works- I tested for it. 
- [x] **Frontend makes WebSocket connection** - This also works becuase the website updates.
- [x] **Data sent over WebSocket connection** - Yea this one work (and yes it did give me a headache to figure out)
- [x] **WebSocket data displayed** - So you can see which of your buddies are in the library. When you click the "in library" button you'll pop up below to yourself and everyone else.
- [x] **Application is fully functional** - Yup! It works. 

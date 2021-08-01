# Puppy Love [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Puppy Love is an app designed to find man's best friend a friend. Join the community of dog lovers online and set up doggy dates. Help spread love in the world, Puppy Love.

<img width="1440" alt="Screen Shot 2021-08-01 at 9 28 58 AM" src="https://user-images.githubusercontent.com/77217156/127772671-60893eb5-42ae-421c-8f85-41eb51e911cb.png">

## Description

This is a social app for pets where the user can sign their pets up and make a pet profile with images. Those with profiles can add friends and comment on photos.
The users can also make plans for meeting up.

### User Story
`As A dog owner, I want to connect with other dog owners, so that my dog can go on dates with other dogs.`

* `Given a site where I can find my dogs a playdate`
* `When I load Puppy Love`
* `I am presented with a navigation bar with the option to login/signup.`
* `When I click login/signup, a modal appears and gives me the option to login with my email address and password, or signup with a Username, email address, city and password.`
* `When I am signed in, I can see a gallery of dogs, and the navigation bar now has the options to view my user profile, add a pet, and logout.`
* `When I click 'Your Profile' I am presented with my email address, city, username, my own pets with a link to their profile, and the options to update or delete my account.`
* `When I click my pet's profile I am presented with the pet's name, age, breed, gender, owner, the option to upload an image, update the pet, and delete the pet.`
* `When I click 'Add a Pet' I am presented with a modal that allows me to add a new dog by entering it breed, age, name, and gender.`
* `When I am on the homepage and click on a dog, I am taken to their comments where I can read comments from other users and comment if I am logged in. I will also find a link to the dog's profile.`

### Wireframe
![screencapture-app-diagrams-net-2021-07-31-17_01_19](https://user-images.githubusercontent.com/77217156/127752324-2dab15f3-49e2-4e83-857a-2b78cb15a100.png)


## Current Features

### Login/SignUp
Login or Signup to start making profiles for your dogs. You can also comment on other dogs and hopefully you'll be making friends for your pets in no time. 

<img width="1439" alt="Screen Shot 2021-07-31 at 7 14 34 PM" src="https://user-images.githubusercontent.com/77217156/127754454-7b6dbc7c-32e6-4cee-b63c-f1044b6debd7.png">

### Dog Catalogue
Once your are logged in you will find dogs on the hompage that your dog can make friends with! Click on their image to be taken to their comments. 

![screencapture-localhost-3000-2021-08-01-10_43_29](https://user-images.githubusercontent.com/77217156/127775188-e76ac1fa-fde3-4c80-830b-81093da46685.png)

### Comments
Here you can read comments that other users have written about the dog. You will also be able to add your own comments and view the dog's profile.

![screencapture-localhost-3000-dog-image-6106b07f7f52a155ab7e95f0-2021-08-01-10_51_13](https://user-images.githubusercontent.com/77217156/127775361-a320a50c-28ac-4f25-87e5-7c129679aa4e.png)

### Add a Pet
Click "Add a Pet" in the navigation bar where you can enter your dog's breed, age, name, and gender. All of your pet's and their profiles will be accesible from your user profile.

<img width="1434" alt="Screen Shot 2021-07-31 at 7 16 26 PM" src="https://user-images.githubusercontent.com/77217156/127754472-b3d964db-2f48-4bd7-a2f1-d8c49d834e7d.png">

### User Profile
On your profile you will your email address, city, username, and your pets with a link to their profile. You can also update or delete your account.

![screencapture-localhost-3000-user-profile-2021-08-01-09_28_09](https://user-images.githubusercontent.com/77217156/127772711-158db1b1-9f09-4fae-b59b-a250a4f202ae.png)

### Dog Profile
The dog profile allows you to view its gender, breed, age, and owner. For your own pets you can upload an image, update the dog, and delete the dog.
![screencapture-localhost-3000-dog-profile-610699484b6a904e7d70085f-2021-08-01-09_37_38](https://user-images.githubusercontent.com/77217156/127772945-3ccb2880-cffd-4d1a-9838-feb4cdb2829e.png)


## Future Developments

### Ability to Organize Doggy Dates and Search Nearby Dog Parks
As the wireframe shows we would like to add the ability for pups to plan meetups right on the website. When your visit a dog profile you should be able to find a middle button click it select a date to meetup. We would also like to implement a map where users can find nearby dog parks.

### Add Friends 
In the future, Puppy Love users would have the ability to add friends. When you visit a dog's profile an `Add Friend button` appears and you can click it to the dog to your dog's friend list. The dog's friend list would then be visible when you visit the dog's profile page.

## Getting Started

To get this project up and running on your local machine do the following:
- Clone repository to local machine
- Run npm install 
- Run npm start to host on local server 
- To visit the deployed version click [here](https://puppy-love-date.herokuapp.com/)


## Deployment

To deploy the app we used Heroku. The live app can we viewed [here](https://puppy-love-date.herokuapp.com/)

## Built With

* apollo-server-express
* apollo/client
* apollo/react-hooks
* bootstrap
* bcrypt 
* express
* faker
* graphql
* jsonwebtoken
* jwt-decode
* mongoose
* react
* react-bootstrap
* react-bootstrap-validation
* react-dom
* react-external-link
* react-icons
* react-router-dom
* react-scripts

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Contributors

* **Andre Moseley** - *Backend* - [DreJI95](https://github.com/DreJI95)
* **Fanxi Liao** - *Backend* - [liaof](https://github.com/liaof)
* **Marilyn Papadopoulos** - *Frontend/Backend* - []()
* **Michelle Asuamah** - *Frontend* - [MAsuamah](https://github.com/MAsuamah)
* **Syed Tirmizi** - *Frontend* - [syedmtirmizi](https://github.com/syedmtirmizi)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

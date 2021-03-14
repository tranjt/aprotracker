# Aprotracker (React native) v0.5.0

Aprotracker is a workout progress tracker made with React Native(Expo), GraphQL, NodeJS and MongoDb. 
Development of this app is merely for educational purposes a requirement to complete this course [Full Stack -web development project](https://github.com/fullstack-hy2020/misc/blob/master/project.md) (2020-2021). It's was a good choice to do via a course because you can easy get sidetracked when building this kind of project as a hobby, if no time constraint or requirements are present.

The choices of technologies used for this project was meant as continuation of what was learned from this course done earlier this year https://fullstackopen.com/en/ (2020-2021) completed 20.1.2021. To put to use what was learned from that course and a deeper dive to continue learning about the subject. 

React Native was chosen because most of my previous projects have been browser based. The app could have been a stand alone app with no server interaction and saving data locally using async storage. But a server interaction was chosen because I wanted to learn more about GraphQL, this also meant the api could have been use as an extension of this app for other purposes.

Overall this project is a success, this project was running from 20.1.2021 - 14.3.2021 total work hours 212h you can see the [work hour log](https://github.com/tranjt/aprotracker/blob/main/documentation/workHourLog.md). All the [requirements](https://github.com/tranjt/aprotracker/blob/main/documentation/aprotrackerOverview.md) set on 21.1.2021 was meet althought there was a lot more I wanted to implement and test out. Data collected from exercises and routines could have been put to use more in graphs etc. But due to time constraint this never happened.

Data management in this project is a mix of GraqhQL, local data files and async storage. GraqhQL usage was used to save data for user, completed exercises, completed routines and to display in the frontend. GraqhQL data was used both front and backend. Local data files contains premade routines and exercises which is used to build workout routines these cannot be deleted. As an extentions on these existing routines and exercises async storage was used to cover routines and exercises that does not exist. The user can created a more personalize workout routine, these can be deleted. Local and async storage data only exist on frontend side.

Data state management for frontend, GraphQL data was kept separated from local files and async storage. Accessing data from GraphQL was done via hooks with GraphQL Apollo mutations and queries. The login token from GraphQL server was stored locally with async storage and used the same data state management as local files and async storage. Initially the token was used for auth via a context hook. But later combined into the same state management as the local files and async storage, the react built-in reducer, context and hooks. 

Some notes for future use. Data modelling was crucial at the start of the project and not just start building something then throw some data into it. Building the initial app around the data models and data handling made things much easier. It was much easier to see a path to how to progressively build the app as it grows and easier to follow the requirements.


## Usage

This project frontend was bootstrapped with Expo SDK template @sdk-40
expo-cli command-line interface is needed
```
npm install --global expo-cli
```

clone this project and install dependencies
go to the main backend and frontend base directories and run npm install to install all the dependencies.
```
npm install
```

An **.env** file is required for both frontend and backend at the base directory of each side.

backend .env requires
```
MONGODB_URI //link to a mongodb
PORT //server port
TOKEN_SECRET //Jwt token used for authentication
```

frontend .env requires
```
APOLLO_URI //adress to the GrahplQL server example http://192.168.1.2:4000/graphql
```


## Available Scripts

Both frontend and backend runs via
### `npm start`


## Features

- Account creation
- Login 
- Profile 
- Calendar with all workout
- History 
- Workout (displays routines when last completed and selection of routine to do)
- Routine creation 
- Routine overview
- Routine deletions
- Exercise 
- Exercise creation 
- Exercise detail
- Exercise deletion
- Do routine screen (a dynamic generated form based on selected routine)
- Do routine form (all exercise input fields in this form can be extended and lessen. Only valid field will be saved)
- Routine automatic timer (routine screen automatically saves execution time for this workout )
- Previous done field (displays the lastest done exercise stats)
- Timer



## Features overview

More indept overview of app features. If you want to see a more active overview
check out the [user instructions](https://github.com/tranjt/aprotracker/blob/main/documentation/userInstructions.md) which includes gifs. Or watch a short 5 min [youtube video](https://www.youtube.com/watch?v=QY8OPi0G4JE)
of how a new user interaction with the app can look like.

### Account creation

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/sign_up_screen.jpg" width="270">

Used to sign up for an account. Username must be unique and both password must match.

### Login

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/login_screen.jpg" width="270">

User with an account can login here, if not user can go to account creation page.


### Profile

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/profile_screen.jpg" width="270">

Displays info about user. Total amount of workout done and a calendar which shows all days a workout have been done. You can also
scroll go back and see past month. User logs out from here.


### History

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/history_screen.jpg" width="270">

Displays completed routines. Information displayed which routines have been done which exercises have been done and how many times, date of completion and duration the routine took to complete. The list can be scrolled downwards.


### Workout

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/workout_screen.jpg" width="270">

Displays selection of routines both premade and user made. User made can be distinguished by the trash can on the top right corner of the card, a button to delete the routine. Each routine will display lastest completed dates if available. 

All routines cards are pressable and will take to Routine overview screen for more info on the routine and a button there which leads to the do routine screen for the execution of the routine. There is also a plus button on the bottom right corner which takes the user to routine creation page,
to make your own routine.


### Routine overview

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/routine_overview_screen.jpg" width="270">

Displays user chosen routine. The info text on the right will lead to a view showing information about the exercise and description. 


### Routine creation 

<table>
  <tr>
    <td>routine creation empty</td>
     <td>routine creation filled</td>
     <td>exercise selection</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/routine_creatio_empty.jpg" width=270 height=555></td>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/routine_creation_filled.jpg" width=270  height=555></td>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/routine_creation_exercise_selection.jpg" width=270  height=555></td>
  </tr>
</table>

User can create personal routines from here. Name and at least one exercise must be included for the routine to be valid. The routine name must be unique for validity. An error notice will notify if name already exist.

Selection of exercises can be done via add exercise button which takes the user to the exercise selection screen. The screen displays all available exercises both preexisting and user made exercises. Selection can be made multiple times all selection are stored. User can remove unwanted exercise selections, via the trash can button bottom left of the exercise card. Once a selection is made user can edit field on the exercises. These values are set count, rep count, exercise duration and weight. These values are meant as goal reference to achieve in a routine, it will be displayed a placeholder in the input field during a routine execution. 

When a valid routine have been made it will be added to the top of the routine list on the workout screen. 


### Exercise

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/exercise_screen.jpg" width="270">

User can view all available exercises here, both user made and premade. All exercises are pressable which will take the user to a detail view screen of the exercises. User made exercises will have a trash can on the bottom right corner for deletion. The plus button on bottom right of the exercise screen will take the user to the exercise creation screen.


### Exercise creation

<table>
  <tr>
    <td>exercise creation empty</td>
     <td>exercise creation filled</td>    
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/exercise_creation_screen.jpg" width=270 height=555></td>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/exercise_creation_screen_filled.jpg" width=270  height=555></td>  
  </tr>
</table>

User can create personal exercises from here. Name and exercise type must be included for the exercise to be valid. The exercise name must be unique for validity. An error notice will notify if name already exist.


### Routine in progress

<table>
  <tr>
    <td>do routine empty</td>
     <td>do routine filled</td>    
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/do_routine_screen.jpg" width=270 height=555></td>
    <td><img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/do_routine_screen_filled.jpg" width=270  height=555></td>  
  </tr>
</table>

User does the routine and takes notes in here. Placeholder are goal data user entered during the routine creation or if it's a premade exercise default data will be shown.
Previous field shows data from the lastest exercise done. This data is not bound to a routine, if another routine containing the same exercise it will also the shown there. Data is for the latest of this type of exercise.

User must enter valid data into a field for the check mark to be checkable. User can add more sets if required. At least one exercise set must be valid for a routine to be valid. Once the user is done he can press the finished button to complete the routine. Only marked exercise set will be stored. Exercises with only empty sets will be discarded. Routine will also automatically save the duration of the routine. 

There is also a button on the top right corner for a timer.


### Timer

<img src="https://raw.githubusercontent.com/tranjt/aprotracker/main/documentation/pictures/timer_screen.jpg" width="270">

User can measure time in this page. By default the timer is set at 00:45 seconds. There are two -+30 seconds button for quick editing of the timer value, which can be done even when the timer is in progress. User can also edit the timer by directly click in on the time value and enter a chosen time value. Close timer button will take the user back to the do routine screen.





---
#all pages
--
app page (login) (register) 
-
profile (workout history)(calendar workout days)(graph?)
-
history (some of the latest workout) 7 days?
-
workout (premade routines bwf) (new workout routines) editable
workout -> choose one routines to start exexercise 
workout (timer when enter) (timer for exexercises)( all set editble)
data for set ( set, previous, kg?, reps, mark for set finnish) 
-
exercise (all exercises available)(new exercises)
-


online only
graphql

/r/bodyweightfitness app mainly


#requirements

- when starting a workout routine if exercise have been done before show the latest stats (kg/reps/set) for all sets available. (not based on routines but exercise type, if another routine have the same exercise in it, latest stats (kg/reps/set) is shown there aswell)

- enter routine starts a timer, any set not done will not be recorded. 

- routine can be canceled, 

- routine can be finnish at anytime, only save data on exercise/set that are completed

- exercise set number can be increased each set can be edited.
(number of set in an exercise is not fixed)

- history, profile stats page shows lastest routines (how to save the data at the same time separate exercise so it can be accessed in the workout for latest stats) 

- workout routines page shows date time when was the last time it was done.

- workout page has create routine template
	choose exercise type -> determanes input type( reps only) 	(time based)or ( weight reps)
	add number set 
	optional pre add number of reps	

- exercise shows list of all available exercise types
each exercise  have (type(weighted/reps/timed), name,)
(setnr, kg, reps)weight or (setnr, reps) reps only or timebased (set time))

- default exercise are only /r/bodyweightfitness RR types


#data model

-user
userID: 
username: 
password: 

-exercise 
exerciseID:
name:
description:
type: (weighted (kg,reps), repsOnly(reps), timed(time))
createdAt: 
sets[{setNumber, kg, reps} {setNumber, reps} {setNumber, time}]
routineID:
userID:ID

-routine
routineID:
name:
description:
createdAt:
duration:
userID: 

----
used to make ui 
bodyweightfitness RR only
premade exercises (type, input placeholder data for reps)
premade routines (exercises and number of set for each)

locally
usermade exercises
usermade routines



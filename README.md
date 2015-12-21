# Reactomatic 

A simple web app built using React, Redux, and D3 to pull all of a user's trips
from the [Automatic API](https://developer.automatic.com/api-reference/) and show a
graph of how the fuel efficiency of their vehicle relates to their average speed.
Right now the app only uses sample data from Automatic, not genuine user data. 

# Usage 

You can check out the app in action [here](http://reactomatic.herokuapp.com/). 

Or, you can run it locally in one of two ways. First, you can run it without the
Node server by doing 

```
npm install 
```

Then run 
``` 
webpack-dev-server
```
And go to `localhost:8080` to check it out. You may need `webpack-dev-server` to be
installed globally for this to work. 

Alternatively, you can 
```
npm install
```
Then 

```
webpack
```
then 
```
npm start
```
And go to `localhost:3000`. 

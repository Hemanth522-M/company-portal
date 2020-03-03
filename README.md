# Knockri Full Stack (React) Coding Assessment

## Overview

I used React and material UI(CSS) to create the entire application process.

## How did you decide which technologies to use as part of your solution?
   I choose react for this application, because of the following reasons
        #1 It facilitates the overall process of writing components. ...
        #2 It boosts productivity and facilitates further maintenance. ...
        #3 It ensures faster rendering. ...
        #4 It guarantees stable code. ...
        #5 It is SEO friendly. ...
        #6 It comes with a helpful developer toolset. ...
## Are there any improvements you could make to your submission?
    No comments
## What would you do differently if you were allocated more time?
  If i have really more time, i should more focus on performance of the application with help of some modules like lazy loading, code splitting, webpack & bundlers. And also trying to reduce the size of the code.

## How should the application work?

The user of this react application should be able to view the video response(s) of job candidates applying for a job at their company. The application should have the following workflow,

1. Choose candidate from a list.
2. Depending on the selection in the first step, if the selected candidate has an application, display the video response(s) of the candidate with the relevant question displayed in text. If the selected candidate does not have an application, display appropriate message.
3. For each video response of a candidate, provide an option to enter comments.
4. Provide a "Save" button that saves the comments to the api.json file.

## Requirements

* Only step 1 should be visible when no candidate is picked. Step 1,2,3 and 4 should be visible when a candidate is picked.

* User should be able to change candidate selection at any time.

* You can use whatever libraries, task runners and build processes you like. React and plain JavaScript are the only requirements (ES6 encouraged, but no TypeScript, CoffeeScript, etc). Redux is strongly encouraged if you see a need for it.

## API Usage

API can be launched using npm start. You will need to run npm install once you starting working on the project to install dependencies.

| Endpoint                     | Result                                              |
|------------------------------|-----------------------------------------------------|
| /candidates                  | Lists all available candidates                      |
| /questions                   | Lists all available questions                       |
| /applications                | Lists all available applications                    |

## Please follow the bellow instructions to run the application on machine

  #1 First clone the project, git clone... https://github.com/Hemanth522-M/company-portal.git
  #2 After clone, enter this cd company-portal
  #3 Then, npm install
  #4 Then npm run dev
  #5 Now to run the project on port 3000
  #6 Go to http://localhost:3000/ to view the app.

## Authors
   Hemanth M


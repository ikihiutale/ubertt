<<<<<<< 438cc80a520236ebd77861130a027940e82b8781
# ubertt
Timetable
=======


# Authentication
Users are authenticated against user details stored in Mongo DB and by using 
Local Authentication Strategy of Passport.


## Usage



## Developing

### Authetication
Passport, jsonwebtoken and local passport strategy are used for authentication  



## Tools

### Heroku
creat new app: 
https://dashboard.heroku.com/apps/ubertt

Go to local project folder that is already under version control (git)
Create remote:
heroku git:remote -a ubertt
$ git remote -v


create Procfile and add:
"web: node index.js"

Save changes:
$ git add .
$ git commit -am "New Procfile"
$ git push heroku master

Add the Mongolab addon:
$ heroku addons:create mongolab:sandbox

Check confgiguration:
$ heroku config
MONGODB_URI: mongodb://..

Open the app:
$ heroku open



### GIT

echo "# ubertt" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/ikihiutale/ubertt.git
git push -u origin master



http://mislav.net/2010/07/git-tips/

# Status
git status -sb

# Show branches, tags in git log
git log --oneline --decorate

# Push a branch and automatically set tracking
# Tracking is essentially a link between a local and remote branch. 
# When working on a local branch that tracks some other branch, you can 
# git pull and git push without any extra arguments and git will know what to do.
#
# Pushes the "master" branch to "origin" remote and sets up tracking
git push -u origin master

# However, git push will by default push all branches that have the same name 
# on the remote. To limit this behavior to just the current branch, set this configuration option:
git config --global push.default tracking

# This is to prevent accidental pushes to branches which you’re not ready to push yet

# Pull with rebase instead of merge
$ git pull --rebase
# e.g. if on branch "master": performs a git fetch origin,
# then git rebase origin/master

# git fetch
# git diff ...origin
# git diff ...origin is equivalent to git diff $(git-merge-base HEAD origin) origin

# STAGE:
git add -A # stages All
git add . # stages new and modified, without deleted
git add -u # stages modified and deleted, without new

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/ikihiutale/ubertt.git
git push -u origin master
>>>>>>> Initial commit

# README #

This is the main repo and folder structure for block and text editor.


### What is this repository for? ###

* Summary  
In order for the editor to start up correctly, you must maintain a certain file folder structure and provide "links" to the folders. This repo does that. You need to pull this repo, then do some linking. A script can be run to do this or it can be done manually.
* Versions  
First version uses "standard" MakerEditor

### Setup ###

* Summary of set up  
You need 3 file folders from the code-fusionist main root folder.  All 3 subfolders are individual repos. The pxt and pxt-common-packages are Microsoft files and editor-hybrid is TinkRworks rep. If you pull the repo with a recursive flag, it will pull all the 3 folders for you.
* Configuration  
The layout of the folders must be:  
code_fusionist  
-> editor-hybrid  
-> pxt  
-> pxt-common-packages  
* Update NPM
```
npm update -g npm
```
* Pulling the repo  
Because all of the 3 repos are separate, use the recursive flag.
```
git clone --recurse-submodules git@bitbucket.org:tinkr/code_fusionist.git
```
now, to update all of the submodules (folders) run the git command
```
cd code_fusionist
git submodule update --init --recursive
git submodule update
```
* Create all of the links and do NPM installs in the individual folders
```
cd pxt
npm install
npm run build 
cd ..

cd pxt-common-packages
npm install
npm link ../pxt
```
May have to use:  
sudo npm link ../pxt   
This can cause a whole lot of other problems.  
If get a whole list of errors in red:   
- need to fix an old npm problem
- run the following command and retry the link 
otherwise skip the following and continue with the cd .. command
```
sudo npm cache clean --force
sudo chown -R 1000:1000 "/root/.npm"
sudo chown -R 1000:1000 "/home/twdev/.npm"     where 1000 is group ID and twdev is user name
sudo npm link ../pxt
```

```
cd ..

cd editor-hybrid
sudo npm install -g pxt
npm install
npm link ../pxt
npm link ../pxt-common-packages
```

### Starting up the Editor ###

* Load all of the repos and do the npm link and npm init in all of the folders
* startup the editor
```
cd editor-hybrid
pxt serve
```

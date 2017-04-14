![David](https://david-dm.org/jiayihu/react-kanban.svg)
![Love](https://img.shields.io/badge/Made%20with-%E2%99%A5-red.svg)
[![Build Status](https://travis-ci.org/jiayihu/react-kanban.svg?branch=master)](https://travis-ci.org/jiayihu/react-kanban)

# Kanban Board built with React.js & Redux

![Screenshot](https://raw.githubusercontent.com/jiayihu/react-kanban/master/screenshot.png)

## Steps to compile/run the app

Firstly, build the application

	$ npm run build
	
Secondly, start the application
	
	$ npm run start

## Required Features


1. Entering text in the 'add project' input and hitting enter will add it as an item to the 'todo' list.
2. Three columns for 'Todo', 'In Progress', and 'Done' projects.
3. Projects should be draggable and sortable within the same column.
	(note: Currently the projects are sorted according to the timestamp when it is created.)
4. Projects can also be dragged between adjacent columns.
5. The total at the top of each column reflects the number of projects.
6. The global total reflects the the global sum of projects.

## Additional Features:

1. Add new Lane.
2. Add new project in each lane.
3. Close or drag each lane.
4. Change project text in the lane.
5. Reset persisted store to clear the kanban board.

## TODO
 - [x] Draggable Lanes
 - [x] Refactor in ES6
 - [ ] Add authentication

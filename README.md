# React Todo List

This is a Todo List application built using React.js.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Documentation](#documentation)

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

- Clone the repo

```sh
git clone https://github.com/AmirhosseinOlyaei/react-todo.git
```

- Install NPM packages

```sh
npm install
```

### Usage

To run the application, execute the following command:

```sh
npm start
```

The application will open in your default web browser at http://localhost:3000. You can add new todo items, mark them as complete, and delete them.

### License

Distributed under the MIT License. See [LICENSE](https://github.com/AmirhosseinOlyaei/react-todo/blob/lesson_1_4/LICENSE) for more information.

</s>

[contributors-shield]: https://img.shields.io/github/contributors/AmirhosseinOlyaei/repo.svg?style=flat-square
[contributors-url]: https://github.com/AmirhosseinOlyaei/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AmirhosseinOlyaei/repo.svg?style=flat-square
[forks-url]: https://github.com/AmirhosseinOlyaei/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/AmirhosseinOlyaei/repo.svg?style=flat-square
[stars-url]: https://github.com/AmirhosseinOlyaei/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/AmirhosseinOlyaei/repo.svg?style=flat-square
[issues-url]: https

## Documentation

### How to add a new todo item?

1. First, click on the "Add Todo" button at the bottom right corner of the app.

- This will open a form where you can add the title of your new todo item.

2. Next, click on the "Choose a Category" dropdown menu to select a category for your todo item. This will help you organize your todos by different categories.

3. Finally, click on the "Add" button to add your new todo item to the list.

> Remember, if you don't complete a todo item within a certain time, it will automatically be moved to the "Overdue" category. You can reassign a todo item to any other category by clicking on the "Reassign" button.

### How to mark a todo item as completed?

1. Click on the todo item that you want to mark as completed.

- The todo item will now appear as crossed out, indicating that it is complete.

> Please note that you cannot manually remove a todo item from the completed list. This list automatically updates to reflect your progress.

### How to delete a todo item?

1. Find the todo item that you want to delete in the list of todos.

2. Click on the "Delete" button that is located on the right side of the todo item.

3. The todo item will now be removed from the list.

> Please note that this is a basic example of a todo list app. In a real-world scenario, the process of deleting a todo item may involve additional steps, such as confirming the action or handling potential errors. Additionally, this operation might require a different approach if the todo list is being fetched from an API, as it may require making a DELETE request to the API.

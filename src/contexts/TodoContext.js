import { createContext, useContext } from "react";

export const TodoContext = createContext({
	todos: [
		{
			id: 1,
			todo: "Learn React",
			completed: false,
		},
	],
	addTodo: (todo) => {},
	toggleComplete: (id) => {},
	removeTodo: (id) => {},
	updateTodo: (id, todo) => {},
});

export const useTodo = () => {
	return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;

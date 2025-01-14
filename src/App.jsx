import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoList } from "./components";

const App = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		setTodos((pvs) => [{ id: Date.now(), ...todo }, ...pvs]);
	};

	const updateTodo = (id, todo) => {
		setTodos((pvs) => pvs.map((t) => (t.id === id ? todo : t)));
	};

	const removeTodo = (id) => {
		setTodos((pvs) => pvs.filter((t) => t.id !== id));
	};

	const toggleComplete = (id) => {
		setTodos((pvs) =>
			pvs.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
		);
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("todos"));
		if (data && data.length > 0) {
			setTodos(data);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<>
			<TodoProvider
				value={{ todos, addTodo, updateTodo, removeTodo, toggleComplete }}
			>
				<div className="bg-[#172842] min-h-screen py-8">
					<div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
						<h1 className="text-2xl font-bold text-center mb-8 mt-2">
							Manage Your Todos
						</h1>
						<div className="mb-4">
							{/* Todo form goes here */}
							<TodoForm />
						</div>
						<div className="flex flex-wrap gap-y-3">
							{/*Loop and Add TodoItem here */}
							{todos.map((todo) => (
								<div
									key={todo.id}
									className="w-full"
								>
									<TodoList todo={todo} />
								</div>
							))}
						</div>
					</div>
				</div>
			</TodoProvider>
		</>
	);
};

export default App;

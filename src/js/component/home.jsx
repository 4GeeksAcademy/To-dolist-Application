import React , {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue , setInputValue] = useState("")
	const [todos , setTodos] = useState([]);


	const addTask = async () => {
		var requestOptions ={
			method: "Put",
			body: JSON.stringify(todos),
			headers: {"Content-type": "application/json"},			
		};
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/bobo305",
				requestOptions
			);
			const data = await response.json();
			console.log("Data:" , data );
		} catch(error) {
			console.log("Error:", error);
		}
	};
      // UPDATING THE LIST
	const submitValue = () => {
		const newTodo ={label: inputValue, done: false};
		setTodos([newTodo, ...todos]);
		setInputValue("");
	};
	  // ENTERING VALUE TO THE LIST
	const eventHandlerOnDown =(event) => {
		if (event.key === "Enter" && inputValue != "") submitValue();
	};
    // SETTING THE VALUE
	const saveInput = (e) => {
		setInputValue(e.target.value);
	};
	// DELETTING TASKS
	const deletTask = (i) => {
		let newTodoList = todos.filter((value , index ) => {
			return i != index;
		});
		console.log(newTodoList)
		setTodos(newTodoList);
		updateList()
	};
	//CLEARING THE LIST
	const updateList = () => {
		let requestOptions = {
			method:"Put",
			headers:{ "Content-Type": "application/json"},
			body: JSON.stringify(todos)			
		};
		try {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/bobo305",
				requestOptions
			)
				.then((response) => response.json())
				.then((data) => console.log(data, "this is the data"));
		} catch (error) {
			console.error("Error: ", error);
		}
	};


	// USE EFFECT TO UPDATE THE LIST
	useEffect(() => {
		addTask();
		console.log("Current array value:", todos);
	  }, [todos]);
	// FETCHING THE DATA
	const fetchTodolist = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/bobo305")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			setTodos([...data]);
		});
	};
	
	
	return(
		<div className="cointainer">
			<h1>My To-DO</h1>
			<ul>
				<li>
					<input
          			 type="text"
            		 value={inputValue}
           			 onChange={saveInput}
           		     onKeyDown={eventHandlerOnDown}
            		 placeholder="What do you need to do">

					</input>
				</li>
				{todos.map((item , index ) => (
					<li key = {index}>
						{item.label}{""}
						<span onClick={() => deletTask(index)}>
						

							<FontAwesomeIcon icon={faTrash} />
							
						</span>
					</li>
				))}
				
				
			</ul>
			{/* <div> 25 task</div> */}
			<span
            	className="clearButton"
            	type="button"
           		 onClick={() => {
					updateList(setArrayValue([]));
            	}}>
            	Delete list
          </span>

		 	
		</div>

	);
};

export default Home;


// no change to list after deleting and updating 


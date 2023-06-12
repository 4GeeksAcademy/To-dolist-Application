import React , {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue , setInputValue] = useState("")
	const [todos , setTodos] = useState([]);
	return(
		<div className="cointainer">
			<h1>My To-DO</h1>
			<ul>
				<li>
					<input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyPress={(e) =>{
						if(e.key === "Enter"){
							setTodos(todos.concat([inputValue ]));
							setInputValue("")
						}
					}}
					placeholder="What do you need to do ?"></input>

				</li>
				{todos.map((item , index ) => (
					<li>
						{item}{""}
						<span onClick={() =>
							setTodos(
								todos.filter(
									(t , currentIndex) =>
									index != currentIndex
								)
							)}>
							<FontAwesomeIcon icon={faTrash} />
							
						</span>
					</li>
				))}
				
				
			</ul>
			<div> 25 task</div>

		 	
		</div>

	)
}

export default Home;


{/* <FontAwesomeIcon icon={faTrash} /> */}

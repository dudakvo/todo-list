import React, {useState} from "react";

type handleFn = (evt:React.ChangeEvent)=>void;

interface IFormValue{
    body: string;
    value: string;
}
type submitFn = (value:IFormValue)=>void;
interface IProps {
    handleFn:(value:IFormValue)=>void;
}

export default function TodoAddForm({onSubmit}:any){  // дописать определения типа пропсов !!!!!!
    const [todoName, setTodoName] = useState('');
    const [todoBody, setTodoBody] = useState('');

    const handleChange:handleFn = e=>{
        const target= e.target as HTMLInputElement
        switch (target.name) {
            case 'todo-name':
                setTodoName(target.value); 
                break;
            case 'todo-body':
                setTodoBody(target.value);
                break;
            default:
                break;
        }
    }
    const handleFormSubmit = (evt:React.FormEvent)=>{
        evt.preventDefault();
        onSubmit(todoName,todoBody);
        setTodoBody('');
        setTodoName('');
    }
    
    return (<>
        <p></p>
        <form onSubmit={handleFormSubmit}>
            <label>
                ToDo name
                <input name='todo-name' 
                type='text' 
                value={todoName} 
                onChange={(e)=>handleChange(e)}/>
            </label>            
            <label>
                ToDo body
                <input name='todo-body' 
                type='text' 
                value={todoBody} 
                onChange={(e)=>handleChange(e)}/>
            </label>
            <button>Submit</button>
        </form></>)
} 
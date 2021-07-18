import TodoAddForm from '../components/TodoAddForm';

export default function Home() {
  function onAdd(name:string, value:string) {
    console.log(`name=${name} value=${value}`);
}

  return (
    <>
       <TodoAddForm onSubmit={onAdd}/>
    </>
  )
}

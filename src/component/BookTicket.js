import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import './bookticket.css'

// get data from localStorage

const getData = () =>{
  let list = localStorage.getItem('Data')
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem('Data'))
  } else{
    return []
  }
}

 const Todo=() =>{
    
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summ, setsumm] = useState();
  const [load, setload] = useState(true);
  let { id } = useParams();
  const key = { id };
  useEffect(() => {
    setLoading(true)
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then(response => response.json())
      .then(json => setUsers(json))
      .finally(() => {
        setLoading(false)
      })

  }, []);

  useEffect(() => {
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].show.id, parseInt(key.id));
      if (users[i].show.id === parseInt(key.id)) {
        console.log(users[i].show.image.medium);
        setsumm(users[i]);
        if (users[i].show !== null) {
          setload(false);
          console.log(load);
        }
      }
    }
  }, [users]);
    const[inputData,setInputData] = useState('')
    const[items,setItems] = useState(getData())
    const[toggleSubmit,setToggleSubmit] = useState(true)
    const[isEditItem,setIsEditItem] = useState(null)

    // Adding data to localStorage
    
    useEffect(()=>{
        localStorage.setItem('Data',JSON.stringify(items))
    },[items])


    const addItems = ()=>{
        if (!inputData) {
            
        } else if(inputData && !toggleSubmit){
            setItems(
                items.map((value)=>{
                    if(value.id === isEditItem){
                        return {...value,name:inputData}
                    }
                    return value;
                })
            )
             setToggleSubmit(true)
             setInputData('')
             setIsEditItem(null)
        } 
        else{
            const allInputData = { id: new Date().getTime().toString(), name: inputData}
            setItems([...items,allInputData])
        setInputData('')
        }
        
    }

    const deleteItem =(index)=>{
        console.log(index);
            const updateDeleteItem = items.filter((value)=>{
                return index !== value.id
            })
            setItems(updateDeleteItem)  
    }

    const removeAll = ()=>{
        setItems([])
    }

    const editItem = (id)=>{
        let newEditItem = items.find((value)=>{
            return value.id === id;
        })
        console.log(newEditItem);
        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setIsEditItem(id)
    }
       
    
  return (
    <div className='detail'>
     <div className="main-div">
        <div className="child-div">
            <figure>     
                <figcaption>Book Your Tickets ✌</figcaption>
            </figure>
            <div className="App">
      {load ? (
        <div>Loading...</div>
      ) : (<div> <h3 className='p-3'>{`${summ.show.name}`}</h3></div>)
      }
            <div className='addItems' >
                <input type="text" placeholder='✍ Add your Name here'  
                  value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                  {
                    toggleSubmit?<i className="fa fa-plus add-btn" title='Add Items' onClick={addItems}></i>: <i className="far fa-edit add-btn" title='Update Items' onClick={ addItems}></i>
                  }    
            </div>
            <div className="showItems">
            {console.log(items)}
            {items.length===0 ? (
                (<div> <h3 className='ite'>Number of Tickets booked - 0</h3></div>)
      ) : <div className='ite' >{`Number of Tickets booked - ${items.length}`}</div>
      }
                {
                    items.map((value)=>{
                        return(   
                            <div className="eachItem" key={value.id}>
                            <h3>{value.name}</h3>
                            <div className="todo-btn">
                                <i className="far fa-edit add-btn" title='Edit Items' onClick={ () =>editItem(value.id)}></i>
                                <i className="far fa-trash-alt add-btn" title='Delete Items' onClick={ () =>deleteItem(value.id)}></i>
                            </div>
                        </div>
                        )
                    })
                }   
            </div>
            <div className="showItems">
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>

     </div>
</div>
</div>
  )
}

export default Todo;
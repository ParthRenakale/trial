import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {toast,Toaster} from 'react-hot-toast';


function App() {
  const [text, setText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try {
      if (text === '') {
        toast.error("Cannot have a blank task!");
        return;
      }
      const res = await axios.post('https://trial-rnjz.onrender.com/api/item', { item: text });
      setListItems((prev) => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('https://trial-rnjz.onrender.com/api/items');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://trial-rnjz.onrender.com/api/item/${id}`);
      const newList = listItems.filter((i) => i._id !== id);
      setListItems(newList);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (id) => {
    try {
      const res = await axios.put(`https://trial-rnjz.onrender.com/api/item/${id}`, { item: updatedText });
      const updatedList = listItems.map((item) =>
        item._id === id ? { ...item, item: updatedText } : item
      );
      setListItems(updatedList);
      setIsUpdating(null);
      setUpdatedText('');
      toast.success('Successfully updated!')
    } catch (err) {
      console.log(err);
    }
  };

  const renderUpdateForm = (item) => {
    return (
      <div className="update-form">
        <input
          type="text"
          placeholder="New Item"
          className="update-input"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
        <button className="update-btn" onClick={() => updateItem(item._id)}>
          Update
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <div><Toaster/></div>
      <p className='head'>Task -  Manager</p>
      
      <form className="form" onSubmit={(e)=>addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button type="submit">Add</button>
      </form>

      <div className="todo-listItems">
        {listItems.length===0 &&
      <div className="no-item">
  <span role="img" aria-label="grinning face" style={{ fontSize: '50px' }}>
    😁
  </span>
  No Tasks Pending!
</div>}

        {listItems.map((item) => (
          <>
          
          

          <div className="todo-item" key={item._id}>
            {isUpdating === item._id ? (
              renderUpdateForm(item)
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                    setUpdatedText(item.item);
                  }}
                >
                  Update
                </button>
                <button className="delete-item" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;


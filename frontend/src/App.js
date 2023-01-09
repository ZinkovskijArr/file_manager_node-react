import React,{useEffect, useState} from 'react';
import './App.css';

function App() {
  const [parent,setParent] = useState('');
  const [data, setData] = useState({
    path: "",
    files: []
  });
  useEffect(() => {
    fetch("http://localhost:8000/")
    .then(res => res.json())
    .then(
      result => {
        setParent('');
        setData(result)},
      error => console.log(error)
    );
  }, []);

  function clickHendler(e)
  {
    e.preventDefault();
    console.log(e.target.attributes.href.value);
    fetch("http://localhost:8000/?path=" + e.target.attributes.href.value)
    .then(res => res.json())
    .then(
      result => {
        let linkArr = result.path.split('/');
        console.log(linkArr);
        linkArr.pop();
        setParent(linkArr.join('/'));
        setData(result);

      },
      error => console.log(error)
    );
  }

  return (
    <div className="App">
      <div>  <a href={parent} onClick={clickHendler}>level up</a></div>
      <div>current: {data.path === '' ? '/' : data.path}</div>
      <ul className='filder-list'>
        {data.files.map(item => {
          if(item.dir) {
            return <li className='folder' key={item.name}><a href={data.path+'/'+item.name} onClick={clickHendler} >{item.name.toUpperCase()}</a></li>
          }else {
            return <li className='file' key={item.name}>{item.name}</li>
          }
        })}
      </ul>
    </div>
  );
}

export default App;

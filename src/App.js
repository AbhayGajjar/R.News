
import './App.css';
import React, { useState } from 'react';
import Navbar from './COMPONENTS/Navbar';
import News from './COMPONENTS/News.js';
// import News apikey={apikey} from './COMPONENTS/News apikey={apikey}';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App=(props)=> {
 let pageSize = 10;
 let apikey = "af8231ac9a8b4fa0a5d095a3c4c8245e"

  // for the loading progress
  const [progress, setprogress] = useState(0)
  // state={
  //   progress:0
  // }

 const setProgress=(progress)=>{
   setprogress(progress)
 }
  // setProgress = (progress)=>{
  //     this.setState({progress:progress})
  // }

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path='/' element={<News apikey={apikey} setProgress={setProgress} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
            <Route exact path='/business' element={<News apikey={apikey} setProgress={setProgress} key='business' pageSize={pageSize} country='in' category='business' />}></Route>
            <Route exact path='/scienc' element={<News apikey={apikey} setProgress={setProgress} key='science' pageSize={pageSize} country='in' category='science' />}></Route>
            <Route exact path='/sports' element={<News apikey={apikey} setProgress={setProgress} key='sports' pageSize={pageSize} country='in' category='sports' />}></Route>
            <Route exact path='/technology' element={<News apikey={apikey} setProgress={setProgress} key='technology' pageSize={pageSize} country='in' category='technology' />}></Route>
            <Route exact path='/entertainment' element={<News apikey={apikey} setProgress={setProgress} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />}></Route>
            <Route exact path='/health' element={<News apikey={apikey} setProgress={setProgress} key='health' pageSize={pageSize} country='in' category='health' />}></Route>
          </Routes>
        </Router>


      </div>
    )
  }

export default App


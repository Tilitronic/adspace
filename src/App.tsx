import React from 'react';
import './App.css';
import { useRef, useState, useEffect } from 'react';

function getSystem(items: number, columns: number, start: [number, number] | null = null):number [][] {
  const x: number = items%columns ? 1 : 0
  const rows: number = Math.floor(items/columns)+x
 	let map: number [][] = Array(rows).fill(0).map(()=>Array(columns).fill(0))
  if(!start){return map}
 	map[start[0]][start[1]]=1
  return map
}

function scrollTo(xy: [number, number]): void{
  const xw = window.innerWidth
  const yh = window.innerHeight
  window.scrollTo(xw*xy[0], yh*xy[1])
  // window.scrollTo({behavior: 'smooth', left: xw*xy[0], top: yh*xy[1]})
}



function App() {
  const [activeCell, setActiveCell] = useState<[number, number]>([1, 0])
  const corSystemLen = getSystem(7, 9, [0, 1])
  const xw = window.innerWidth
  const yh = window.innerHeight
  useEffect(()=>{
    window.scrollTo(xw*activeCell[0], yh*activeCell[1])
  }, [activeCell, xw, yh])

  const scrollElement = useRef<HTMLDivElement>(null)
  const scrollLeft =()=>{
    if(scrollElement.current){
      // scrollElement.current.scrollLeft = 500;
      setActiveCell([activeCell[0]-1, activeCell[1]])
      scrollTo(activeCell)
    }
  }

  const handleScroll = (direction: 'up' | 'down' | 'left' | 'right')=>{
    let addition = [0, 0]
    switch (direction) {
      case 'up':
        addition = [0 , -1]
        break;
      case 'down':
        addition = [0 , 1]
        break;  
      case 'left':
        addition = [-1 , 0]
        break;
      case 'right':
        addition = [1 , 0]
        break; 
      default:
        break;
    }
    setActiveCell([activeCell[0]+addition[0], activeCell[1]+addition[1]])
    scrollTo(activeCell)
  }

  return (
    <div className="App">
      <div className='appWrapper'>

        <div className='header'>
          <p>it is a header</p>
          <button onClick={()=>handleScroll('right')}>right</button>
          <button onClick={()=>handleScroll('left')}>left</button>
          <button onClick={()=>handleScroll('up')}>up</button>
          <button onClick={()=>handleScroll('down')}>down</button>
        </div>

        <div className='screenWrapper' ref={scrollElement}>
          <div className='screen red'></div>
          <div className='screen green'></div>
          <div className='screen blue'></div>
          <div className='screen green'></div>
          <div className='screen blue'></div>
          <div className='screen red'></div>
          <div className='screen blue'></div>
          <div className='screen red'></div>
          <div className='screen green'></div>
        </div>

      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import './App.css';

const App = () => {
  const [nums, setNums] = useState([]);
  const [active, setActive] = useState([]);
  const [display, setDisplay] = useState([]);
  const [delay, setDelay] = useState(10);
  const [loading, setLoading] = useState(false);

  const timer = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const initialize = async () => {
    if (!loading) {
      setNums([]);
      setLoading(true);
      await timer(delay);
      for (let i = 1; i <= 75; i++) {
        setNums((prev) => prev.concat(i));
        await timer(delay);
      }
      setLoading(false);
      await timer(delay);
    }
  };

  const shuffle = async() => {
    if (!loading) {
      setLoading(true);
      await timer(delay);
      for (let i = 0; i < nums.length; i++) {
        let rand = Math.floor(Math.random() * nums.length);
        setActive([i, rand]);
        setNums((arr) => {
          let temp  = [...arr];
          [temp[i], temp[rand]] = [temp[rand], temp[i]];
          return temp;
        });
        await timer(delay);
      }
      setLoading(false);
      setActive([]);
    }
  }

  const insertionSort = async() => {
    if (!loading) {
      let numsArr = [...nums];
      setLoading(true);
      await timer(delay);
      for (let i = 1; i < numsArr.length; i++) {
        let j = i - 1;
        let temp = numsArr[i];
        while (j >= 0 && numsArr[j] > temp) {
          setActive([j, j + 1]);
          setNums((arr) => {
            let prev = [...arr];
            prev[j + 1] = prev[j];
            return prev;
          });
          await timer(delay);
          numsArr[j + 1] = numsArr[j];
          j--;
        }
        setActive([j + 1, i]);
        setNums((arr) => {
          let prev = [...arr];
          prev[j + 1] = temp;
          return prev;
        });
        await timer(delay);
        numsArr[j + 1] = temp;
      }
      setLoading(false);
      setActive([]);
    }
  }

  const bubbleSort = async() => {
    if (!loading) {
      let numsArr = [...nums];
      let len = numsArr.length;
      setLoading(true);
      await timer(delay);
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (numsArr[j] > numsArr[j + 1]) {
            setActive([j, j + 1]);
            setNums((arr) => {
              let prev = [...arr];
              [prev[j], prev[j + 1]] = [prev[j + 1], prev[j]];
              return prev;
            });
            await timer(delay);
            [numsArr[j], numsArr[j + 1]] = [numsArr[j + 1], numsArr[j]];
          }
        }
      }
      setLoading(false);
      setActive([]);
    }
  }

  const selectionSort = async() => {
    if (!loading) {
      let min;
      let numsArr = [...nums];
      setLoading(true);
      await timer(delay);
      for (let i = 0; i < numsArr.length; i++) {
        min = i;
        for (let j = i + 1; j < numsArr.length; j++) {
          setActive([i, j]);
          await timer(delay);
          if (numsArr[j] < numsArr[min]) {
            min = j;
          }
        }
        if (min !== i) {
          setActive([i, min]);
          setNums((arr) => {
            let prev = [...arr];
            [prev[i], prev[min]] = [prev[min], prev[i]];
            return prev;
          });
          await timer(delay);
          [numsArr[i], numsArr[min]] = [numsArr[min], numsArr[i]];
        }
      }
      setLoading(false);
      setActive([]);
    }
  }

  const quickSort = () => {
    if (!loading) {
      async function partition(arr, start, end) {
        let pivotVal = arr[end];
        let pivotIndex = start;
        setActive([pivotIndex, pivotVal]);
        await timer(delay);
        for (let i = start; i < end; i++) {
          setActive([i]);
          await timer(delay);
          if (arr[i] < pivotVal) {
            setActive([i, pivotIndex]);
            setNums((arr) => {
              let prev = [...arr];
              [prev[i], prev[pivotIndex]] = [prev[pivotIndex], prev[i]];
              return prev;
            });
            await timer(delay);
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
          }
        }
        setActive([pivotIndex, end]);
        setNums((arr) => {
          let prev = [...arr];
          [prev[pivotIndex], prev[end]] = [prev[end], prev[pivotIndex]];
          return prev;
        });
        await timer(delay);
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        return pivotIndex;
      }

      async function sort(arr) {
        let stack = [];
        stack.push(0);
        stack.push(arr.length - 1);
        setLoading(true);
        await timer(delay);

        while (stack[stack.length - 1] >= 0) {
          let end = stack.pop();
          let start = stack.pop();
          let pivotIndex = await partition(arr, start, end);
          setActive([]);
          await timer(delay);
          if (pivotIndex - 1 > start) {
            stack.push(start);
            stack.push(pivotIndex - 1);
          }
          if (pivotIndex + 1 < end) {
            stack.push(pivotIndex + 1);
            stack.push(end);
          }
        }
        setLoading(false);
      }
      let temp = [...nums];
      sort(temp);
    }
  }

  const handleChange = (e) => {
    setDelay(e.target.value);
  }

  useEffect(() => {
    let render = nums.map((num, index) => {
      if (index === active[0] || index === active[1]) {
        return <div className='bar-active' style={{height: `${num / 1}%`, width: `${80 / nums.length}%`}}></div>;
      } else {
        return <div className='bar' style={{height: `${num / 1}%`, width: `${80 / nums.length}%`}}></div>;
      }
    });
    setDisplay(render);
  }, [nums, active, delay]);

  return (
    <div style={{height: '770px'}} className="app">
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: '20px', backgroundImage: 'linear-gradient(180deg, black, #1C1352, rgb(29, 60, 122))', height: '125px'}}>
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: '5px'}}>
          <button className="button" onClick={initialize}>Initialize</button>
          <button className="button" onClick={shuffle}>Shuffle</button>
        </div>
        <div className="slide-container">
          <span style={{paddingBottom: '10px', fontWeight: '400'}}>Animation Speed</span>
          <input onChange={handleChange} type="range" min="1" max="250" value={delay} className="slider" id="myRange"></input>
          <span style={{paddingTop: '10px'}}>{delay + 'ms'}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15px'}}>
          <button className="button-sort" onClick={insertionSort}>Insertion Sort</button>
          <button className="button-sort" onClick={selectionSort}>Selection Sort</button>
          <button className="button-sort" onClick={quickSort}>Quick Sort</button>
          <button className="button-sort" onClick={bubbleSort}>Bubble Sort</button>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '0px', paddingRight: '50px', paddingLeft: '50px', height: '80%'}}>
        { display }
      </div>
      <div style={{width: '100%', height: '100%', backgroundImage: 'linear-gradient(180deg, #1C1352, black', maxHeight: '185px'}}></div>
    </div>
  );
}

export default App;
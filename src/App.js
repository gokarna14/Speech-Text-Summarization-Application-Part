// import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import AnimatedText from 'react-animated-text-content';
import 'bootstrap/dist/css/bootstrap.min.css';






function App() {
  return (
    <header classNameName="App-header">
      <div className="container p-3">
        <div className="row text-center">
          <hr />
          <h1>
            <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
              }}
              animationType="wave"
              interval={0.06}
              duration={1}
              tag="p"
              className="animated-paragraph"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              Welcome to Speech Text Summarization !
            </AnimatedText>
          </h1>
          <hr />

        </div>
        <div className="row">
          <div className="col-1 border border-1 border-danger">
          </div>
          <div className="col">
            <Home></Home>
          </div>
          <div className="col-1 border border-1 border-danger">
          </div>
        </div>
              <hr />
        <div className="row text-center">
          <AnimatedText
            type="words" // animate words or chars
            animation={{
              x: '200px',
              y: '-20px',
              scale: 1.1,
              ease: 'ease-in-out',
            }}
            animationType="wave"
            interval={0.06}
            duration={1}
            tag="p"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >
               © Speech Text Summarization, 2023
          </AnimatedText> 
        </div>
      </div>
    </header>
  );
}

export default App;

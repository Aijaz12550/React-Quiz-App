import React, {Component} from 'react'

class Create extends Component{
    constructor(){
        super();
        this.state={
             index:0,catIndex:0,
            optSelected:'',
            result:0,sawal:false,quiz:false,listDekhao:false,
            categories:[],
            tryAgain:false,
        }
        
    }
    static getDerivedStateFromProps(props, state){
        if(props.categories){

            return{
                categories:props.categories
            }
        }
    }
    
  



inpvalue(){
    
    let { categories, index,optSelected,result,catIndex } = this.state;
    if(optSelected){
        if(optSelected == 3){
                this.setState({result:result+1})
            }
             }
        if(index < 10){

            this.setState({index:index+1})
        }

    }



    //Quiz
    inp(e){
        
console.log('inp>>>',e.target.value);
this.setState({optSelected:e.target.value})
    }




    render(){
        let { categories,createquiz,sawal,quiz,listDekhao,index,catIndex,result, tryAgain } = this.state;
        if(this.state.tryAgain){
            this.setState({tryAgain:false})
          }
        
        // let { categories, index,result, catIndex,quiz,sec } = this.state;
            console.log('cat>>>', categories.results);
          
        
       
        return(
       
            <div className='CreateQuiz'>
       
          
       {<button onClick={()=>{this.setState({listDekhao:true})}} >Quizes</button> }
       
           

            {/* {this.renderQuiz()} */}
            {/* {this.renderQuizForm()} */}
            
      
        {listDekhao
        &&
            <div>
<div className='modal' >
<h2>

{index >= 10 &&  'Reasult = '+ (result/10)*100 +'%' }
</h2>
<Timer listDekhao={listDekhao} index={index} tryAgain={tryAgain} />
         {
             
             (categories.results) 
             &&
             (index < 10)
             &&
            <div onChange={(e)=>{this.inp(e)}}>
            <h3>

                {
                    'Q.No :'+ ((index) + 1) + ' ' +
                    categories.results[index].question
                }
                </h3>
                <br/><br/>
                <div className='radio'>
                <input type='radio' name='ab' value={0} />
                <div className='op'>
                 {
                     categories.results[index].incorrect_answers[0]
                    }
                    </div>
                    </div>
                    <br/><br/>
                <div className='radio'>
                <input type='radio' name='ab' value={1} />
                <div className='op'>
                 {
                     categories.results[index].incorrect_answers[1]
                    }
                    </div>
                    </div>
                    <br/>
                <div className='radio'>
                <input type='radio' name='ab' value={2} />
                <div className='op'>
                 {
                     categories.results[index].incorrect_answers[2]
                    }
                    </div>
                    </div> <br/>
                <div className='radio'>
                <input type='radio' name='ab' value={3} />
                <div className='op'>
                 {
                     categories.results[index].correct_answer
                    }
                    </div>
                    </div>
                
                
                <button style={{marginLeft:'90%'}} onClick={(e)=>{this.inpvalue(e)}}>
                {
                    index < 10
                    ?
                    <div>
                      Next >
                    </div>
                    :
                    'result'
                }
                </button><br/>
            </div>

}
<br/>
            {index >= 10
            &&
            
                <button onClick={()=>{this.setState({index:0,tryAgain:true,result:0,})}} >Start Again</button>
            }
            </div>
            </div>
        
        
    

           
    }
            </div>
        )
    }
}


class Timer extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
    time: {}, 
    timer:0,
    index:0,
    breakRemainingSeconds: 0,
    };
    
    
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  static getDerivedStateFromProps(props, state){
if(props.index >= 10){
    return{
        index:props.index
    }
}
        if(props.tryAgain){
            return{
                breakRemainingSeconds: 0,
                index:1,
               
            }
        }
  }
componentWillMount(props, state){
    if(''){}
}
// Let's make some sense of JS date and time It can get a little bit tricky sometimes.
// So, what we're doing here is taking the values and converting it in hours minutes, seconds. 
// In the example below we are using minutes and seconds, but just in case we got hours in there too :)

    createTime(secs){
      let hours = Math.floor(secs / (60 * 60));
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

    let timeObject = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return timeObject;
  }

  componentDidMount() {
 // Taking the starting point  -> breakRemainingSeconds <-
// Passing it as the parameter and setting the state's time object to it.
    let timeLeft = this.createTime(this.state.breakRemainingSeconds);
    this.setState({ time: timeLeft });
  }

// Check the current state and potentially (if != 0) start our main function 
  startTimer() {
    let index = this.state;
    if(index.index < 10 ){

        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
  }

countDown() {
    // Remove one second, set state so a re-render happens.
    let index = this.state;
    if(index.index < 10){
    // console.log('index in timer', index.index);
    
    let seconds = this.state.breakRemainingSeconds + 1;

        this.setState({
            time: this.createTime(seconds),
            breakRemainingSeconds: seconds
        });
        
        // Check if we're at zero, and if so, clear the Interval
        if (seconds == 0) { 
            clearInterval(this.timer);
        }
    }
  }

  render() {
    return(
      <div>
          {
              this.props.listDekhao && this.startTimer()
          }
        {/* <button 
                onClick={this.startTimer} style={{marginRight:'12px'}}>Let's Go</button> */}
        <h3> Time = {this.state.time.m} : {this.state.time.s}</h3>
      </div>
    );
  }
}


export {Create, Timer};

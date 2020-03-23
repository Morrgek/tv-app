import React, {Component} from 'react';
import axios from 'axios';

import Program from "../Program/Program";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Scrollbar from "react-scrollbars-custom";
import Moment from "moment";
class Chanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            programs: {},
            toggleTitle:'Развернуть',
            showPrograms: false,
            showProgramClass:'Chanel_program-list__show',
            arrow: faAngleDown,
            url:'http://epg.domru.ru/program/list',

        };
    }





    componentDidMount() {
        let url = this.state.url+'?date_from='+this.props.dateFrom+'&date_to='+this.props.dateTo+'&xvid[0]='+this.props.xvid+'&domain='+this.props.domain
        this.setState(
            {
                url:url
            }
        )
    }


    toggleProgramListHandler = () => {
        const  ShowTitle = 'Развернуть';
        const hideTitle = 'Свернуть';
       if(this.state.isLoaded===false){
           if(this.props.xvid.length>0) {
               axios.get(this.state.url)
                   .then(res => {
                       const resProgramsList = res.data;
                       this.setState({
                           programs: resProgramsList[this.props.xvid.toString()],
                           isLoaded:true
                       })
                   })
                   .catch((error) => {
                       // Error 😨
                       console.log('Error', error.message);
                       if (error.response) {
                           /*
                            * The request was made and the server responded with a
                            * status code that falls out of the range of 2xx
                            */
                           /*console.log(error.response.data);
                           console.log(error.response.status);
                           console.log(error.response.headers);*/
                       } else if (error.request) {
                           /*
                            * The request was made but no response was received, `error.request`
                            * is an instance of XMLHttpRequest in the browser and an instance
                            * of http.ClientRequest in Node.js
                            */
                           // console.log(error.request);
                       } else {
                           // Something happened in setting up the request and triggered an Error
                           // console.log('Error', error.message);
                       }
                       //  console.log(error.config);
                   })
           }
       }

        (this.state.showPrograms)
         ?      this.setState({
                toggleTitle:ShowTitle,
                showPrograms:!this.state.showPrograms,
                showProgramClass:'Chanel_program-list__hide',
                arrow:faAngleDown
         })
         :      this.setState({
                toggleTitle:hideTitle,
                showPrograms:!this.state.showPrograms,
                showProgramClass:'Chanel_program-list__show',
                arrow:faAngleUp
         })
    }


    render() {
        let programs = null
        let listOpened=['Program-list']



       if(this.state.showPrograms && this.state.programs!==undefined){

           if(this.state.programs.length>0)
           {
               listOpened.push('opened-programm');
               let programsList=this.state.programs;
               programs=programsList.map((program, index)=>{

                    if(index<programsList.length-1){
                        let now = new Date();
                        let dateTime=Moment(programsList[index+1].start);
                        let nowDateTime=Moment(now.toISOString());
                        let diffTime=dateTime.diff(nowDateTime);
                        let diffTimePrev=Moment(program.start).diff(nowDateTime)

                        if(diffTime<0 && diffTimePrev<0){
                            programsList[index]['isPrev']=true

                        }
                        if(diffTime>0 && diffTimePrev<0){
                            programsList[index]['isCurrent']=true
                            programsList[index+1]['isNext']=true
                        }

                    }
                    else{
                        program['isTomorrow']=true
                    }

                   return(
                       <Program key={index}
                                name={program.title}
                                time={program.start }
                                isCurrent={program.isCurrent}
                                isPrev={program.isPrev}
                                isNext={program.isNext}
                                isTomorrow={program.isTomorrow}
                       />
                   )
               })
           }
           else{
               listOpened.push('opened-no-programm');
               programs= <div className="Program__warning"> Не удалось загрузить программу</div>
           }
        }

        return (
            <div className="Chanel">
                <div className="Chanel-info" >
                    <div className="Chanel-info__img">
                        <img src={this.props.logo} alt={this.props.name}/>
                    </div>
                    <div className="Chanel-info__name">
                        {this.props.name}
                    </div>
                </div>
                <div className={listOpened.join(' ')}>
                        <Scrollbar>
                            {
                                programs
                            }
                        </Scrollbar>
                </div>
                    <div className={this.state.showProgramClass} onClick={this.toggleProgramListHandler} >
                        <div className='show-hide'>
                            <div className="show-hide__item">
                                {this.state.toggleTitle}
                                <FontAwesomeIcon icon={this.state.arrow} />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Chanel;
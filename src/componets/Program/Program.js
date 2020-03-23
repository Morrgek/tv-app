import React, {Component} from 'react';
import Moment from 'moment';
class Program extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToday:false,
            isCurrent:false,
            classNames:['Program']
        }
    }

    componentDidMount(){
        if(this.props.isPrev){
            this.setState({
                classNames:['Program' , 'prev']
            })
        }
        if(this.props.isCurrent){
            this.setState({
                classNames:['Program' , 'current']
            })
        }
        if(this.props.isNext){
            this.setState({
                classNames:['Program' , 'next']
            })
        }
        if(this.props.isTomorrow){
            this.setState({
                classNames:['Program' , 'tomorrow']
            })
        }


    }
    render() {
        return (
            <div className={this.state.classNames.join(' ')}>
                <div className="Program__time">{Moment(this.props.time).format('H:mm') }</div>
                <div className="Program__name">{this.props.name}</div>
            </div>
        )
    }
}

export default Program
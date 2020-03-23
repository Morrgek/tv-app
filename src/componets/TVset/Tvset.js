import React, {Component} from 'react';
import Chanel from "../Chanel/Chanel";
import axios from "axios";
import Moment from 'moment';

class Tvset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            chanels: {},
            mainDomain:'http://epg.domru.ru',
            domain:'ekat',
            dateFrom: null,
            dateTo:null

        };
    }
    componentDidMount() {
        const url ='http://epg.domru.ru/channel/list?domain=ekat&digit=1'
        axios.get(url)
            .then(res => {
                const resChanelsList = res.data;
                this.setState({
                    chanels:resChanelsList,
                    isLoaded: true
                })
            })
        let today = new Date();
        const dateForm=Moment(today.toISOString()).format('YYYY-MM-D+00:00:00')
        const dateTo=Moment(today.toISOString()).add(1,'days').format('YYYY-MM-D+00:00:00')
        this.setState(
            {
                dateFrom:dateForm,
                dateTo:dateTo
            }
        )
    }

    render() {
        let chanels_ = null

        if(this.state.chanels.length>0){
            chanels_=this.state.chanels.map((chanel, index)=>{
                return(
                    <Chanel
                        key={index}
                        name={chanel.title}
                        xvid={chanel.xvid}
                        logo={this.state.mainDomain+chanel.logo}
                        domain={this.state.domain}
                        dateFrom={this.state.dateFrom}
                        dateTo={this.state.dateTo}
                        />
                )
            })
        }

        return (
            <div className="TVset">
                <div className="TVset__header">Программа на Сегодня </div>
               {chanels_}
            </div>
        )
    }
}

export default Tvset;
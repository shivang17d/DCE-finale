import React, { Component } from 'react'
import axios from 'axios';
import '../styles/home.css'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectdone: '',
            yearsofexperience: '',
            totalemployes: '',
            value: false,
            id: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.updateHome = this.updateHome.bind(this);
        this.changeTotalEmp = this.changeTotalEmp.bind(this);
        this.changeYearsExp = this.changeYearsExp.bind(this);
        this.changeProjectDone = this.changeProjectDone.bind(this);

    };
    changeProjectDone(event) {
        this.setState({ projectdone: event.target.value })
    }
    changeTotalEmp(event) {
        this.setState({ totalemployes: event.target.value })
    }
    changeYearsExp(event) {
        this.setState({ yearsofexperience: event.target.value })
    }
    fetchData() {
        // const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_URL}/homecontent/homedata`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.length > 0) {
                    this.setState({
                        totalemployes: response.data[0].totalemployes,
                        yearsofexperience: response.data[0].yearsofexperience,
                        projectdone: response.data[0].projectdone,
                        id: response.data[0]._id,
                        value: true
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleSubmit(event) {
        var body = {
            projectdone: this.state.projectdone,
            yearsofexperience: this.state.yearsofexperience,
            totalemployes: this.state.totalemployes
        };
        axios.defaults.headers.common = {
            "Content-Type": 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        axios.post(`${process.env.REACT_APP_URL}/homecontent/admin/addhomedata`, body)
            .then(function (response) {
                console.log(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.fetchData();
        event.preventDefault();
        this.setState({
            projectdone: '',
            yearsofexperience: '',
            totalemployes: ''
        });
    }
    componentDidMount() {
        this.fetchData();
    }
    updateHome(event) {
        event.preventDefault();
        var id = this.state.id;
        var body = {
            projectdone: this.state.projectdone,
            yearsofexperience: this.state.yearsofexperience,
            totalemployes: this.state.totalemployes
        }
        axios.defaults.headers.common = {
            "Content-Type": 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        axios.put(`${process.env.REACT_APP_URL}/homecontent/admin/changehome/${id}`, body)
            .then((result) => {
                console.log('success');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <div className='Page'>
                    <h2>Project done = {this.state.projectdone}</h2>
                    <h2>Years of experience = {this.state.yearsofexperience}</h2>
                    <h2>Total employees = {this.state.totalemployes}</h2>
                    <br /><br />
                    <form onSubmit={this.handleSubmit}>
                        <label>Project Done :- <input type="text" name="projectdone" id="" value={this.state.projectdone} onChange={this.changeProjectDone} /></label>
                        <br />
                        <label>Years Of Experience :- <input type="text" name="yearsofexperience" id="" value={this.state.yearsofexperience} onChange={this.changeYearsExp} /></label>
                        <br />
                        <label>Total employees :- <input type="text" name="totalemployes" id="" value={this.state.totalemployes} onChange={this.changeTotalEmp} /></label>
                        {!this.state.value ? <input type="submit" value="Submit" className="btn btn-success" disabled={this.state.value} /> :
                            <input className="btn btn-success" type="button" value="Update" onClick={(event) => this.updateHome(event)} disabled={!this.state.value} />
                        }
                        {/* <input type="submit" value="submit" className="btn btn-success" disabled={this.state.value}/>
            <input className="btn btn-success" type="button" value="Update" onClick={(event) =>this.updateHome(event)} disabled={!this.state.value}/> */}
                    </form>
                </div>
            </>
        )
    };
}
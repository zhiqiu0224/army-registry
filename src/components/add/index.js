import React from 'react';
import { connect } from 'react-redux';
import { getAllSoldiers, addSoldier } from '../../redux/action-creators';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rank: "",
            sex: "",
            startDate: "",
            phone: "",
            email: "",
            superior: "",
            avatar: "",
            preview: "",
        };
    }

    componentDidMount() {
        this.props.getAllSoldiers();
    }

    handleName = (e) => {
        this.setState({name: e.target.value});
    }

    handleRank = (e) => {
        this.setState({rank: e.target.value});
    }

    handleSex = (e) => {
        this.setState({sex: e.target.value});
    }

    handleStartDate = (e) => {
        this.setState({startDate: e.target.value});
    }

    handlePhone = (e) => {
        this.setState({phone: e.target.value});
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value});
    }

    handleSuperior = (e) => {
        this.setState({superior: e.target.value});
    }

    handleAvatar = (e) => {
        this.setState({avatar: e.target.files[0], preview: URL.createObjectURL(e.target.files[0])});
    }

    handleAddSoldier = () => {
        let formData = new FormData();
        for (let key in this.state) {
            if (key !== "preview") {
                if (this.state[key] !== ""){
                    formData.append(key, this.state[key]);
                }
            }
            
        }
        this.props.addSoldier(formData, this.props.history);
        
    }

    render() {
        return(
            <Grid container direction="column" justify="space-evenly" alignItems="center">
                <h2>New Soldier</h2>
                <TextField
                    id="standard-name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleName}
                    margin="normal"
                />

                <InputLabel>Rank</InputLabel>
                <Select
                    native
                    value={this.state.rank}
                    onChange={this.handleRank}
                >
                    <option value=""></option>
                    <option value="General">General</option>
                    <option value="Colonel">Colonel</option>
                    <option value="Major">Major</option>

                </Select>
                <br/>
                <FormLabel>Sex</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    value={this.state.sex}
                    onChange={this.handleSex}
                >
                    <span>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </span>
                </RadioGroup>

                <TextField
                    id="standard-name"
                    label="Start Date"
                    value={this.state.startDate}
                    onChange={this.handleStartDate}
                    margin="normal"
                />

                <TextField
                    id="standard-name"
                    label="Office Phone"
                    value={this.state.phone}
                    onChange={this.handlePhone}
                    margin="normal"
                />

                <TextField
                    id="standard-name"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                    margin="normal"
                />

                <InputLabel>Superior</InputLabel>
                <Select
                    native
                    value={this.state.superior}
                    onChange={this.handleSuperior}
                >  
                    <option value=""></option>
                    {
                        this.props.allSoldiers.all.map((ele, index) => {
                            return(
                                <option value={ele._id} key={ele._id}>{ele.name}</option>
                            );
                        })
                    }
                </Select>

                <br></br>
                <input type="file" onChange={this.handleAvatar} />
                {
                    this.state.preview === "" ? "" : <img src={this.state.preview} width="120px" height="120px"/>
                }
                    
                

                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddSoldier}
                >
                    Add Soldier
                </Button>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allSoldiers: state.allSoldiers,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSoldiers: () => {
            dispatch(getAllSoldiers());
        },
        addSoldier: (soldier, history) => {
            dispatch(addSoldier(soldier, history));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
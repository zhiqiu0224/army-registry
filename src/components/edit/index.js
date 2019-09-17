import React from 'react';
import { connect } from 'react-redux';
import { updateSoldier, getValidSuperiors } from '../../redux/action-creators';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { isArray } from 'util';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.location.state,
            preview: "",
            superior: this.props.location.state.superior ? this.props.location.state.superior._id : "",
            prevSuperior: this.props.location.state.superior ? this.props.location.state.superior._id : "",
        };
    }

    componentDidMount() {
        this.props.getValidSuperiors(this.props.location.state._id);
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

    handleSaveSoldier = () => {
        let formData = new FormData();
        for (let key in this.state) {
            if (key !== "preview") {
                if (this.state[key] !== "" && this.state[key] !== undefined){
                    if (isArray(this.state[key])) {
                        formData.append(key, JSON.stringify(this.state[key]));
                    } else {
                        formData.append(key, this.state[key]);
                    }
                }
            }          
        }
        console.log(...formData);
        this.props.updateSoldier(this.state._id, formData, this.props.history);
    }

    // getValidSuperiors = (list) => {
    //     let invalid = [];
    //     let queue = [];
    //     queue.push(this.getNode(this.props.location.state._id, list));
        
    //     while (queue.length > 0) {
    //         let node = queue.shift();
    //         invalid.push(node._id);
    //         //console.log(node.ds);
    //         for (let i = 0; i < node.ds.length; i++) {
    //             queue.push(this.getNode(node.ds[i], list));
    //         }
    //     }
        
    //     let result = [];
    //     for (let i = 0; i < list.length; i++) {
    //         if (!invalid.includes(list[i]._id)) {
    //             result.push(list[i]);
    //         }
    //     }
    //     return result;
    // }

    // getNode = (id, list) => {
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i]._id === id) {
    //             return list[i];
    //         }
    //     }
    // }

    render() {
        // let validSuperiors = [];
        // if (this.props.soldierList.list.length > 0) {
        //     validSuperiors = this.getValidSuperiors(this.props.soldierList.list);
        // }
        // console.log(this.state);
        
        return(
            <Grid container direction="column" justify="space-evenly" alignItems="center">
                <h2>Edit Soldier</h2>
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

                <br></br>
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
                    value={this.state.superior.name}
                    onChange={this.handleSuperior}
                >  
                    <option value=""></option>
                    {
                        this.props.validSuperiors.list.map((ele, index) => {
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
                    onClick={this.handleSaveSoldier}
                >
                    Save
                </Button>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        validSuperiors: state.validSuperiors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSoldier: (id, data, history) => {
            dispatch(updateSoldier(id, data, history));
        },
        // getAllSoldiers: (data) => {
        //     dispatch(getAllSoldiers(data));
        // }
        getValidSuperiors: (id) => {
            dispatch(getValidSuperiors(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
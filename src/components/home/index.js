import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { connect } from 'react-redux';
import { getAllSoldiers, getPage, showAll } from '../../redux/action-creators';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';



import DataRow from '../dataRow';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
          
        };
    }

    componentDidMount() {
        console.log(this.state.pageNo);
        if (this.state.pageNo === this.props.soldierList.page) {
            this.props.getPage(this.state.pageNo + 1);
            this.setState({pageNo: this.state.pageNo + 1});
        }
        
        const tableBodyNode = ReactDOM.findDOMNode(this.container).parentNode.parentNode;
        tableBodyNode.addEventListener('scroll', (e) => {
            const CONTAINER_HEIGHT = 540;
            const { top: bottomLineOffsetTop } = this.bottomLine.getBoundingClientRect();
            if (bottomLineOffsetTop <= CONTAINER_HEIGHT) {
                if (this.state.pageNo === this.props.soldierList.page) {
                    console.log('load more data');
                    this.handleNextPage();
                }
                
            }
        });
    }

    componentDidUpdate() {
        //this.props.getPage(1);
    }

    handleAddSoldier = () => {
        this.props.history.push('/add');
    }

    handleNextPage = () => {
        this.setState({pageNo: this.props.soldierList.page + 1});
        this.props.getPage(this.props.soldierList.page + 1);
        
    }

    loadFun = () => {
        console.log("loading more");
    }

    handleReset = () => {
        this.props.showAll();
    }

    render() {
        let { isLoading, list, errr } = this.props.soldierList; 
        //console.log("render: state.pageno" + this.state.pageNo);
        //console.log("render: redux.page" + this.props.soldierList.page);

        // if (this.props.location.state) {
        //     if (this.props.location.state.type === "superior") {
        //         list = this.props.location.state.superior;
        //     } else {
        //         list = this.props.location.state.ds;
        //     } 
        // }

        // if (this.props.linkSuperior.list.length > 0) {
        //     list = this.props.linkSuperior.list;
        // }

        // if (this.props.linkDs.list.length > 0) {
        //     list = this.props.linkDs.list;
        // }
        if (this.props.soldierList.display === "ds") {
            list = this.props.linkDs.list;
        } else if (this.props.soldierList.display === "sup") {
            list = this.props.linkSuperior.list;
        }

        return(
            <div>
                <h2>US Army Personnel Registry</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddSoldier}
                >
                    New Soldier
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                >
                    Reset
                </Button>
                
                <div style={{overflow: "auto", height: "400px"}}>
                <Table style={{tableLayout: "fixed"}}>               
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>Rank</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Superior</TableCell>
                            <TableCell># of D.S.</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{overflow: "scroll", height: "400px"}} ref={ref => this.container = ref}>
                        {
                            list.map((ele, index) => {
                                return(
                                    <DataRow key={ele._id} data={ele} his={this.props.history}/>
                                );
                            })
                        }
                        <TableRow ref={ref => this.bottomLine = ref}></TableRow>
                    </TableBody>              
                </Table>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        soldierList: state.soldierList,
        linkSuperior: state.linkSuperior,
        linkDs: state.linkDs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getAllSoldiers: (data) => {
        //     dispatch(getAllSoldiers(data));
        // },
        getPage: (pageNo) => {
            dispatch(getPage(pageNo))
        },
        showAll: () => {
            dispatch(showAll());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
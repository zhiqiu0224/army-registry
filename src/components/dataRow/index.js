import React from 'react';
import { connect } from 'react-redux';
import { deleteSoldier, getLinkSup, getLinkDs, showSup, showDS} from '../../redux/action-creators';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';


class DataRow extends React.Component {
    constructor(props) {
        super(props);
    }

    

    handleEdit = () => {
        this.props.his.push('/edit', this.props.data);
    }

    handleDelete = (id) => {
        this.props.deleteSoldier(id, this.props.his);
        
        //this.props.his.push('/');
    }

    handleSuperiorLink = () => {
        this.props.showSup();
        this.props.getLinkSup(this.props.data.superior._id, this.props.his);
        
        // console.log(this.props.linkSuperior.list);
        // const linkSuperior = {
        //     superior: [this.props.linkSuperior.list],
        //     type: "superior"
        // };
        // this.props.his.push('/', linkSuperior);
    }

    handleDsLink = () => {
        this.props.showDS();
        this.props.getLinkDs({ds: this.props.data.ds}, this.props.his);
        
    }

    render() { 
        
        return(
            <TableRow>
                <TableCell>
                    <img src={`http://localhost:8888/api/avatar/${this.props.data.avatar}`} alt="avatar" width="20px" height="20px"></img>
                </TableCell>
                <TableCell>
                    {this.props.data.name}
                </TableCell>
                <TableCell>
                    {this.props.data.sex}
                </TableCell>
                <TableCell>
                    {this.props.data.rank}
                </TableCell>
                <TableCell>
                    {this.props.data.startDate}
                </TableCell>
                <TableCell> 
                    <a href={`facetime://${this.props.data.phone}`}>{this.props.data.phone}</a>
                </TableCell>
                <TableCell>
                    <a href={`mailto:${this.props.data.email}`}>{this.props.data.email}</a>
                </TableCell>
                <TableCell>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={this.handleSuperiorLink}
                    >
                        {
                            this.props.data.superior ? this.props.data.superior.name : ""
                        }
                    </Link>
                    
                </TableCell>
                <TableCell>
                    {
                        this.props.data.ds.length > 0 ? <Link component="button" variant="body2" onClick={this.handleDsLink}>{this.props.data.ds.length}</Link> : 0
                    }

                </TableCell>
                <TableCell>
                    <IconButton size="small" variant="contained" color="secondary" onClick={this.handleEdit}>
                        <EditIcon />                                  
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton size="small" aria-label="Delete" onClick={() => {this.handleDelete(this.props.data._id)}}>
                        <DeleteIcon />                                
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        soldierList: state.soldierList,
        linkSuperior: state.linkSuperior
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSoldier: (id, history) => {
            dispatch(deleteSoldier(id, history));
        },
        getLinkSup: (id, history) => {
            dispatch(getLinkSup(id, history));
        },
        getLinkDs: (ds, history) => {
            dispatch(getLinkDs(ds, history));
        },
        showSup: () => {
            dispatch(showSup());
        },
        showDS: () => {
            dispatch(showDS());
        }
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRow);
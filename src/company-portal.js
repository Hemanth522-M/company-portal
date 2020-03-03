import React from "react";

import './App.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactPlayer from 'react-player'

class CompanyPortal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            candidates: [],
            candidateAppid: '',
            applications: [],
            open: false,
            questions: [],
            noapplicantsMessage: '',
            comments: '',
            indexComments: '',
            saveButton: false,
            applicationIds: '',
            dialogOpen: false,
        }
    }

    componentDidMount() {
        fetch("http://localhost:3010/candidates")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    candidates: result
                })
        });
    }

    handleChange=(e)=>{
        this.setState({
            candidateAppid: e.target.value,
        })

        if(isNaN(e.target.value) !== true) {
            fetch("http://localhost:3010/applications").
            then(res => res.json()).
            then(result => {
                {result.filter(result => result.id === e.target.value).map(videos => {
                    let x  = videos.videos.map(quest => quest.questionId);
                    fetch("http://localhost:3010/questions").
                    then(res => res.json()).
                    then(questions => {
                        var matches = [];
                        for(var i=0;i<x.length;i++) {
                            for(var j=0;j<questions.length;j++) {
                                if(x[i] === questions[j].id) {
                                    matches.push(questions[j].question);
                                    this.setState({
                                        questions: matches
                                    })
                                }
                            }
                        }
                    })
                    this.setState({
                        applications: videos,
                        applicationIds: videos.id,
                        open: true,
                        noapplicantsMessage: '',
                    })
                })}
            })
        }
        else {
            this.setState({
                open: false,
                noapplicantsMessage: "You are not apply Yet...,Please Kindly apply for this job."
            })
        }
    }

    handleComments = (event, index) => {
        this.setState({
            indexComments: index,
            comments: event.target.value,
            saveButton: true
        })
    }

    saveCommit = () => {
        if(this.state.comments !== "") {
            var t = this.state.applications.videos;
            console.log(t[this.state.indexComments].comments = this.state.comments);
            fetch(`http://localhost:3010/applications/${this.state.applicationIds}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.applications)
          })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    applications: result,
                    dialogOpen: true,
                })
            });

        }
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false,
        });
    }

    render() {
        return (
            <div>
                <Paper className="outer-paper" elevation={0}>
                    <h1 className="headings">Candidates List</h1>
                    <h4 style={{color: '#f50057'}}>{this.state.noapplicantsMessage}</h4>
                    <div>
                        <TextField
                            select
                            required
                            name="candidatesList"
                            label="Candidates"
                            margin="dense"
                            variant="outlined"
                            className="textField"
                            onChange={this.handleChange}
                        >
                            {this.state.candidates.map(candidates => (
                                <MenuItem key={candidates.id} value={candidates.applicationId? candidates.applicationId: candidates.name}>
                                    {candidates.name}
                                </MenuItem>
                            ))}

                        </TextField>
                    </div>
                    {this.state.open &&
                        <Paper className="inside-paper">
                            <h2 className="videos-heading">Video's of the candidate</h2>
                            {this.state.applications.videos.map((items, index) => (
                                <div className="videos" key={index}>
                                    <ReactPlayer
                                        url={items.src}
                                        //playing
                                        controls
                                        width="300px"
                                        height="300px"
                                    />
                                </div>
                            ))}
                            <div className="videos">
                                {this.state.questions.map((data, index) => (
                                    <div key={index}>
                                        <div className="videos">
                                            <h3 style={{width: '300px'}}>{data}</h3>
                                        </div>
                                        <div className="">
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                rowsMin={3}
                                                placeholder="Enter comments"
                                                onChange={(event)=>this.handleComments(event, index )}
                                            />
                                        </div>
                                        {this.state.indexComments === index &&
                                            <div>
                                                {this.state.saveButton === true &&
                                                    <Button variant="contained" 
                                                        color="primary" 
                                                        onClick={this.saveCommit}
                                                        style={{textTransform: 'capitalize'}}
                                                    >
                                                        Save
                                                    </Button>
                                                }
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    }
                </Paper>
                {this.state.dialogOpen === true &&
                    <Dialog
                        //fullWidth={fullWidth}
                        //maxWidth={maxWidth}
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="max-width-dialog-title"
                  >
                    <DialogTitle id="max-width-dialog-title">Updated Api json file</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Your comments are successfully updated...
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                }
            </div>
        );
    }


}
export default CompanyPortal;
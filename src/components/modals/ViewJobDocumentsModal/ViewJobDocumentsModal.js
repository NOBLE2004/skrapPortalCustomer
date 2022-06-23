import React, { useState, useEffect } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Card, CardContent, CardMedia, CardActions } from "@material-ui/core";
import JobService from "../../../services/job.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { downloadSite } from "../../../assets/images";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const ViewJobDocumentsModal = (props) => {
  
  const { handleClose, jobId } = props;

  const isImage = (document) => {
    if(document.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return true;
    } else {
      return false;
    }
  }

  const [isLoading, setLoading] = useState(true);

  const [isUploading, setUploading] = useState(false);
  
  const [jobDocuments, setJobDocuments] = useState([]);
  
  const [state, setState] = useState({
    newJobDocuments: [],
    notice: null,
  });

  useEffect(() => {
    JobService.getOrderFiles({ job_id : jobId})
      .then((response) => {
        setLoading(false);
        setJobDocuments(response.data.result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFileUpload = (event) => {
    state.newJobDocuments = Array.from(event.target.files);   
  }

  const uploadJobDocuments = (e) => {

    setUploading(true);
    
    let files = state.newJobDocuments;
    let fd = new FormData()
    files.forEach((image_file) => {
      fd.append('files[]', image_file);
    });
    fd.append("job_id", jobId);

    JobService.updateOrderFiles(fd)
          .then((response) => {
            setUploading(false);
            setState({
              ...state,
              notice: {
                type: "success",
                text: "Successfully Uploaded Files!",
              },
            });
            setTimeout(() => {
              handleClose();
            },2000)
            
          })
          .catch((err) => {
            console.log(err);
    });
    
  }


  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        className="booksitemodal"
        maxWidth="xs"
      >
        <DialogTitle onClose={handleClose}> View Job Documents </DialogTitle>
        <DialogContent dividers>
          {isLoading && <CircularProgress />}
          {!isLoading && <Grid container spacing={3}>
            {jobDocuments.map(doc => (
              <Grid item xs={12}>
               <Card>
                {isImage(doc.image_url) && <CardMedia
                  component="img"
                  height="100%"
                  image={doc.image_url}
                  alt="Paella dish"
                /> }
                {!isImage(doc.image_url) && <CardContent> <span style={{ display: "flex" }}>Download File <a href={doc.image_url} download><img
              src={downloadSite}
              alt="download-icon"
              style={{ marginLeft: "5px" }}
            /></a></span></CardContent> }
               </Card>
              </Grid>
            ))
          }

          {jobDocuments.length == 0 && <p> </p> &&
          <Card>
            <CardContent> 
            <p>No files uploaded yet.</p>
            <input name="job_documents" multiple type="file"  onChange={handleFileUpload} />
            </CardContent>
            <CardActions>
              <Button className="confirmJob" onClick={uploadJobDocuments}>
                Upload
              </Button>
              {isUploading && <CircularProgress />}
              {state.notice && (
              <Alert severity={state.notice.type}>
                {state.notice.text}
              </Alert>
              )}
            </CardActions>
            </Card>
          }
          
            
          </Grid>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewJobDocumentsModal;

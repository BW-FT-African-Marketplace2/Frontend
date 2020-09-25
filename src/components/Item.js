import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

import { savedList } from '../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginTop: 25,
      marginBottom: 25
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    textArea: {
      marginTop: '10px',
      marginBottom: '10px'
    }
  }));

const Item = props => {
    const { saved, item, savedList } = props;
    const classes = useStyles();
    const [canDeleteItem, setCanDeleteItem] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
      if(location.pathname === '/saved') {
        setCanDeleteItem(true);
      }
    }, [location])

    const saveToList = e => {
      e.preventDefault()
      savedList('add', item.id)
    }

    const deleteFromList = e => {
      savedList('del', 0, saved, item);
      history.push('/saved')
    }

    return(
      <Card className={classes.root}>
          <CardHeader
              avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                   </Avatar>
              }
              action={
                  <IconButton aria-label="settings">
                    <Link to={`/list-item/${item.id}`}>
                      <MoreVertIcon />
                    </Link>
                  </IconButton>
               }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
          />
          <CardMedia
              className={classes.media}
              image={item.image}
              title="Paella dish"
          />
          <CardContent>
            <Link to={`/forSale/${item.id}`}>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.textArea}>
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </Link>
          </CardContent>
          <CardActions>
            <IconButton aria-label='Save to list'>
              <FavoriteIcon />
            </IconButton>
            <Button variant="outlined" color={ canDeleteItem ? 'secondary' : 'primary' } onClick={canDeleteItem ? deleteFromList : saveToList}>
              {
                canDeleteItem ? 'Remove from List' : 'Save to List'
              }
            </Button>
          </CardActions>
      </Card>
    )
};

const mapStateToProps = state => {
  return {
    saved: state.savedList.saved
  }
}

export default connect(mapStateToProps, { savedList })(Item);